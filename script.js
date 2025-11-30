const days = DAYS_DATA;
const STORAGE_KEY = "eh_full_course_progress_v1";

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedDays: [], totalPoints: 0 };
    return JSON.parse(raw);
  } catch {
    return { completedDays: [], totalPoints: 0 };
  }
}

function saveProgress(p) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function init() {
  const prog = loadProgress();
  const currentIndex = Math.min(prog.completedDays.length, days.length - 1);
  renderStats(prog);
  renderDay(currentIndex, prog);
  renderGrid(prog);

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (!confirm("Reset all progress?")) return;
    const fresh = { completedDays: [], totalPoints: 0 };
    saveProgress(fresh);
    renderStats(fresh);
    renderDay(0, fresh);
    renderGrid(fresh);
  });

  document.getElementById("complete-day").addEventListener("click", () => {
    const idx = parseInt(document.getElementById("complete-day").dataset.index, 10);
    completeDay(idx);
  });
}

function renderStats(prog) {
  const current = Math.min(prog.completedDays.length + 1, days.length);
  document.getElementById("stat-day").textContent = current;
  document.getElementById("stat-points").textContent = prog.totalPoints;
  document.getElementById("stat-complete").textContent = prog.completedDays.length;
}

function renderDay(index, prog) {
  const day = days[index];
  const unlocked = index === prog.completedDays.length;
  const completeBtn = document.getElementById("complete-day");
  const lockMsg = document.getElementById("lock-message");

  document.getElementById("day-title").textContent = day.title;
  document.getElementById("day-topic").textContent = day.topic;
  document.getElementById("day-overview").textContent = day.overview;

  const readList = document.getElementById("reading-list");
  readList.innerHTML = "";
  day.reading.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    readList.appendChild(li);
  });

  const vmList = document.getElementById("vm-list");
  vmList.innerHTML = "";
  day.vm_tasks.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    vmList.appendChild(li);
  });

  document.getElementById("code-block").textContent = day.code_snippet;

  completeBtn.dataset.index = index;

  if (!unlocked && !prog.completedDays.includes(day.day)) {
    lockMsg.classList.remove("hidden");
    completeBtn.disabled = true;
  } else {
    lockMsg.classList.add("hidden");
    completeBtn.disabled = prog.completedDays.includes(day.day);
  }
}

function renderGrid(prog) {
  const container = document.getElementById("days-container");
  container.innerHTML = "";
  const nextIndex = prog.completedDays.length;

  days.forEach((d, idx) => {
    const card = document.createElement("div");
    card.classList.add("day-card");

    const title = document.createElement("h3");
    title.textContent = "Day " + d.day;
    card.appendChild(title);

    const info = document.createElement("p");
    info.textContent = d.topic;
    card.appendChild(info);

    const badge = document.createElement("span");
    badge.classList.add("badge");

    if (prog.completedDays.includes(d.day)) {
      card.classList.add("completed");
      badge.classList.add("completed");
      badge.textContent = "Completed";
    } else if (idx === nextIndex) {
      card.classList.add("current");
      badge.classList.add("current");
      badge.textContent = "Next";
    } else if (idx > nextIndex) {
      card.classList.add("locked");
      badge.classList.add("locked");
      badge.textContent = "Locked";
    }

    card.appendChild(badge);

    card.addEventListener("click", () => {
      if (idx > nextIndex) return;
      renderDay(idx, prog);
    });

    container.appendChild(card);
  });
}

function completeDay(index) {
  const prog = loadProgress();
  if (index !== prog.completedDays.length) {
    alert("You must complete days in order.");
    return;
  }
  const day = days[index];
  if (!prog.completedDays.includes(day.day)) {
    prog.completedDays.push(day.day);
    prog.totalPoints += day.points;
    saveProgress(prog);
  }
  renderStats(prog);
  const nextIndex = Math.min(index + 1, days.length - 1);
  renderDay(nextIndex, prog);
  renderGrid(prog);
}

document.addEventListener("DOMContentLoaded", init);
