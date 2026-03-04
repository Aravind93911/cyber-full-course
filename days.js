// days.js (example schema)
const DAYS_DATA = [
  {
    day: 1,
    title: "Day 1: Linux Shell Fundamentals",
    topic: "pwd, ls, cd, basic navigation",
    overview: "Learn core shell navigation commands and prove it by submitting output.",
    reading: [
      "Review: pwd, ls, cd and filesystem basics",
      { text: "Optional: Linux docs", href: "https://example.com" }
    ],
    vm_tasks: [
      "Open your Linux VM terminal",
      "Run: pwd",
      "Run: ls -la",
      "Create a folder and file, then list again"
    ],
    code_snippet: `pwd
ls -la
mkdir -p lab/day1
touch lab/day1/hello.txt
ls -la lab/day1`,
    points: 100,

    // This is the gate:
    check: {
      prompt: "Paste the output of `pwd` (it must start with /).",
      hint: "Absolute Linux paths start with '/'. Run pwd and paste the output.",
      validation: {
        type: "regex",
        pattern: "^/.*$",
        flags: "m",
        testNormalized: false
      }
    }
  }
];
