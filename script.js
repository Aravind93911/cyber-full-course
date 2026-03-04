"use strict";

/**
 * Requirements:
 * - days.js must define a global `DAYS_DATA` array of day objects.
 * - Each day can optionally include:
 *   day.check = {
 *     prompt: "What to paste",
 *     hint: "Optional hint",
 *     validation: { type: "...", ... }
 *   }
 */

const STORAGE_KEY = "eh_full_course_progress_v2";
const days = Array.isArray(window.DAYS_DATA) ? window.DAYS_DATA : [];

const DEFAULT_PROGRESS = Object.freeze({
  completedDays: [],
  totalPoints: 0,
  passed: {},       
  submissions: {}   // { [dayNumber]: { last: string, ok: boolean, ts: number } }
});

function safeParseJSON(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function loadProgress() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParseJSON(raw, null) : null;
  if (!parsed || typeof parsed !== "object") return structuredClone(DEFAULT_PROGRESS);

  // Merge for forward compatibility
  return {
    completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
    totalPoints: Number.isFinite(parsed.totalPoints) ? parsed.totalPoints : 0,
    passed: parsed.passed && typeof parsed.passed === "object" ? parsed.passed : {},
    submissions: parsed.submissions && typeof parsed.submissions === "object" ? parsed.submissions : {}
  };
}

function saveProgress(p) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function $(id) {
  return document.getElementById(id);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function isCompleted(dayNumber, prog) {
  return prog.completedDays.includes(dayNumber);
}

function isUnlocked(index, prog) {
  // Allow access to:
  // - any completed day
  // - the next day (index === completedDays.length)
  return index <= prog.completedDays.length;
}

function currentIndexFromProgress(prog) {
  return clamp(prog.completedDays.length, 0, Math.max(0, days.length - 1));
}

function normalizeAnswer(input, mode = "trimLowerCollapse") {
  let s = String(input ?? "").replace(/\r\n/g, "\n");
  if (mode.includes("trim")) s = s.trim();
  if (mode.includes("collapse")) {
    s = s.replace(/[ \t]+/g, " ");
    s = s.replace(/\n{3,}/g, "\n\n");
  }
  if (mode.includes("lower")) s = s.toLowerCase();
  return s;
}

async function sha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function validateSubmission(day, userInput) {
  const check = day.check || {};
  const v = check.validation;

  // If no validation configured, treat as "pass" (useful for reading-only days)
  if (!v) return { ok: true, message: "No output check required for this day." };

  const mode = v.normalize || "trimLowerCollapse";
  const raw = String(userInput ?? "");
  const norm = normalizeAnswer(raw, mode);

  switch (v.type) {
    case "equals": {
      const expected = normalizeAnswer(v.value ?? "", mode);
      return expected === norm
        ? { ok: true, message: "Correct." }
        : { ok: false, message: "Not an exact match. Check spacing/case and try again." };
    }

    case "oneOf": {
      const options = Array.isArray(v.values) ? v.values : [];
      const ok = options.some(x => normalizeAnswer(x, mode) === norm);
      return ok
        ? { ok: true, message: "Correct." }
        : { ok: false, message: "Not accepted. Try again." };
    }

    case "includesAll": {
      const parts = Array.isArray(v.values) ? v.values : [];
      const ok = parts.every(part => norm.includes(normalizeAnswer(part, mode)));
      return ok
        ? { ok: true, message: "Looks good." }
        : { ok: false, message: "Your output is missing required piece(s). Try again." };
    }

    case "regex": {
      try {
        const re = new RegExp(v.pattern, v.flags || "m");
        const ok = re.test(v.testNormalized ? norm : raw);
        return ok
          ? { ok: true, message: "Accepted." }
          : { ok: false, message: "Output format does not match expected pattern." };
      } catch {
        return { ok: false, message: "Validation misconfigured (invalid regex). Fix days.js validation." };
      }
    }

    case "sha256": {
      // Store only a hash in days.js for "semi-hidden" answers
      const want = String(v.hash || "").toLowerCase();
      const got = await sha256Hex(norm);
      return got === want
        ? { ok: true, message: "Correct." }
        : { ok: false, message: "Incorrect." };
    }

    default:
      return { ok: false, message: "Unknown validation type. Fix days.js validation." };
  }
}

function renderStats(prog) {
  const current = clamp(prog.completedDays.length + 1, 1, days.length || 1);
  $("stat-day").textContent = String(current);
  $("stat-points").textContent = String(prog.totalPoints);
  $("stat-complete").textContent = String(prog.completedDays.length);
}

function renderList(listEl, items) {
  listEl.innerHTML = "";
  (items || []).forEach(item => {
    const li = document.createElement("li");

    // Support both strings and { text, href }
    if (typeof item === "string") {
      li.textContent = item;
    } else if (item && typeof item === "object") {
      const a = document.createElement("a");
      a.textContent = item.text || item.href || "Resource";
      a.href = item.href || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
    }

    listEl.appendChild(li);
  });
}

function setFeedback(kind, message) {
  const el = $("submission-feedback");
  el.className = `feedback ${kind}`;
  el.textContent = message || "";
}

function renderDay(index, prog) {
  const day = days[index];
  if (!day) return;

  const unlocked = isUnlocked(index, prog);
  const completed = isCompleted(day.day, prog);
  const passed = Boolean(prog.passed[String(day.day)]);

  // Title/overview
  $("day-title").textContent = day.title || `Day ${day.day}`;
  $("day-topic").textContent = day.topic || "";
  $("day-overview").textContent = day.overview || "";

  // Lists
  renderList($("reading-list"), day.reading);
  renderList($("vm-list"), day.vm_tasks);

  // Code block
  $("code-block").textContent = day.code_snippet || "";

  // Output check prompt/hint
  const check = day.check || {};
  $("check-prompt").textContent = check.prompt || "Paste the required output here.";

  const hintBtn = $("show-hint");
  if (check.hint) {
    hintBtn.classList.remove("hidden");
    hintBtn.textContent = "Show Hint";
    hintBtn.onclick = () => {
      const showing = hintBtn.textContent.includes("Hide");
      hintBtn.textContent = showing ? "Show Hint" : "Hide Hint";
      setFeedback("hint", showing ? "" : check.hint);
      if (showing) setFeedback("", "");
    };
  } else {
    hintBtn.classList.add("hidden");
    hintBtn.onclick = null;
  }

  // Badge
  const badge = $("day-badge");
  badge.className = "pill";
  if (!unlocked) {
    badge.classList.add("pill-locked");
    badge.textContent = "Locked";
  } else if (completed) {
    badge.classList.add("pill-done");
    badge.textContent = "Completed";
  } else if (index === prog.completedDays.length) {
    badge.classList.add("pill-current");
    badge.textContent = passed ? "Passed (ready to complete)" : "Unlocked (submit output)";
  } else {
    badge.classList.add("pill-review");
    badge.textContent = "Review";
  }

  // Submission area state
  $("submission").value = (prog.submissions[String(day.day)]?.last) || "";
  setFeedback("", "");

  // Buttons
  const completeBtn = $("complete-day");
  const lockMsg = $("lock-message");
  const checkBtn = $("check-submission");

  completeBtn.dataset.index = String(index);
  completeBtn.textContent = `Mark Day Complete (+${day.points || 100} pts)`;

  if (!unlocked) {
    lockMsg.classList.remove("hidden");
    checkBtn.disabled = true;
    completeBtn.disabled = true;
    return;
  }

  lockMsg.classList.add("hidden");
  checkBtn.disabled = completed;

  // You can only complete the NEXT day in sequence, and only after passing
  const isNext = (index === prog.completedDays.length);
  completeBtn.disabled = !isNext || completed || !passed;
}

function renderGrid(prog) {
  const container = $("days-container");
  container.innerHTML = "";
  const nextIndex = prog.completedDays.length;

  days.forEach((d, idx) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "day-card";
    card.setAttribute("aria-label", `Open Day ${d.day}`);
    card.disabled = idx > nextIndex; // hard lock for future

    const h3 = document.createElement("h3");
    h3.textContent = `Day ${d.day}`;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = d.topic || "";
    card.appendChild(p);

    const badge = document.createElement("span");
    badge.className = "badge";

    if (isCompleted(d.day, prog)) {
      card.classList.add("completed");
      badge.classList.add("completed");
      badge.textContent = "Completed";
    } else if (idx === nextIndex) {
      card.classList.add("current");
      badge.classList.add("current");
      badge.textContent = prog.passed[String(d.day)] ? "Passed" : "Next";
    } else {
      card.classList.add("locked");
      badge.classList.add("locked");
      badge.textContent = "Locked";
    }

    card.appendChild(badge);

    card.addEventListener("click", () => {
      const fresh = loadProgress();
      if (!isUnlocked(idx, fresh)) return;
      renderDay(idx, fresh);
    });

    container.appendChild(card);
  });
}

async function handleCheckSubmission() {
  const prog = loadProgress();
  const idx = Number($("complete-day").dataset.index || "0");
  const day = days[idx];
  if (!day) return;

  // Must be the next day in sequence to "pass" (prevents farming passed flags)
  if (idx !== prog.completedDays.length) {
    setFeedback("bad", "You can only submit for the currently unlocked day.");
    return;
  }

  const input = $("submission").value;

  const result = await validateSubmission(day, input);
  prog.submissions[String(day.day)] = { last: input, ok: result.ok, ts: Date.now() };

  if (result.ok) {
    prog.passed[String(day.day)] = true;
    saveProgress(prog);
    setFeedback("good", result.message || "Correct. You can now complete this day.");
  } else {
    prog.passed[String(day.day)] = false;
    saveProgress(prog);
    setFeedback("bad", result.message || "Incorrect. Try again.");
  }

  renderStats(prog);
  renderDay(idx, prog);
  renderGrid(prog);
}

function completeDay(index) {
  const prog = loadProgress();

  if (index !== prog.completedDays.length) {
    alert("You must complete days in order.");
    return;
  }

  const day = days[index];
  if (!day) return;

  if (!prog.passed[String(day.day)]) {
    alert("You must pass the output check before completing this day.");
    return;
  }

  if (!isCompleted(day.day, prog)) {
    prog.completedDays.push(day.day);
    prog.totalPoints += (day.points || 100);
    saveProgress(prog);
  }

  renderStats(prog);

  const nextIndex = currentIndexFromProgress(prog);
  renderDay(nextIndex, prog);
  renderGrid(prog);
}

function exportProgress() {
  const prog = loadProgress();
  const blob = new Blob([JSON.stringify(prog, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cybersecurity-course-progress.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

function init() {
  if (!days.length) {
    document.body.innerHTML = "<p style='padding:16px'>Error: DAYS_DATA not found. Check days.js.</p>";
    return;
  }

  const prog = loadProgress();
  const idx = currentIndexFromProgress(prog);

  renderStats(prog);
  renderDay(idx, prog);
  renderGrid(prog);

  $("reset-progress").addEventListener("click", () => {
    if (!confirm("Reset all progress?")) return;
    const fresh = structuredClone(DEFAULT_PROGRESS);
    saveProgress(fresh);
    renderStats(fresh);
    renderDay(0, fresh);
    renderGrid(fresh);
  });

  $("export-progress").addEventListener("click", exportProgress);

  $("check-submission").addEventListener("click", () => {
    handleCheckSubmission();
  });

  $("complete-day").addEventListener("click", () => {
    const idx = Number($("complete-day").dataset.index || "0");
    completeDay(idx);
  });
}

document.addEventListener("DOMContentLoaded", init);
