document.addEventListener("DOMContentLoaded", function () {
  const text = document.getElementById("text");
  const counter = document.getElementById("counter");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const toggleWrapBtn = document.getElementById("toggleWrapBtn");

  // Find & Replace elements
  const findInput = document.getElementById("findInput");
  const replaceInput = document.getElementById("replaceInput");
  const findBtn = document.getElementById("findBtn");
  const replaceBtn = document.getElementById("replaceBtn");
  const replaceAllBtn = document.getElementById("replaceAllBtn");

  // Formatting buttons
  const buttons = [
    "bold", "italic", "underline", "strikethrough",
    "justifyLeft", "justifyRight", "justifyCenter", "justifyFull",
    "unorderedList", "increaseFontSize", "decreaseFontSize",
    "copyBtn", "resetBtn"
  ];

  // Add event listeners for formatting buttons
  buttons.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("click", function () {
      switch (id) {
        case "bold": document.execCommand("bold"); break;
        case "italic": document.execCommand("italic"); break;
        case "underline": document.execCommand("underline"); break;
        case "strikethrough": document.execCommand("strikethrough"); break;
        case "justifyLeft": document.execCommand("justifyLeft"); break;
        case "justifyRight": document.execCommand("justifyRight"); break;
        case "justifyCenter": document.execCommand("justifyCenter"); break;
        case "justifyFull": document.execCommand("justifyFull"); break;
        case "unorderedList": document.execCommand("insertUnorderedList"); break;
        case "increaseFontSize":
          text.style.fontSize = (parseInt(getComputedStyle(text).fontSize) + 1) + "px";
          break;
        case "decreaseFontSize":
          text.style.fontSize = (parseInt(getComputedStyle(text).fontSize) - 1) + "px";
          break;
        case "copyBtn":
          navigator.clipboard.writeText(text.innerText);
          break;
        case "resetBtn":
          text.innerHTML = "";
          updateCounts();
          localStorage.removeItem("autosaveContent");
          break;
      }
    });
  });

  // 🟢 Word & Character Count
  function updateCounts() {
    const content = text.innerText.trim();
    const words = content.length ? content.split(/\s+/).length : 0;
    const chars = content.length;
    counter.textContent = `Words: ${words} | Characters: ${chars}`;
  }

  text.addEventListener("input", () => {
    updateCounts();
    autosave();
  });

  updateCounts();

  // 🌙 Dark Mode Toggle
  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });

  // 💾 Download as .txt
  downloadBtn.addEventListener("click", function () {
    const content = text.innerText;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text-editor-content.txt";
    link.click();
  });

  // 🔟 Autosave in Local Storage
  function autosave() {
    localStorage.setItem("autosaveContent", text.innerHTML);
  }

  function loadAutosave() {
    const saved = localStorage.getItem("autosaveContent");
    if (saved) {
      text.innerHTML = saved;
      updateCounts();
    }
  }

  loadAutosave();

  // 🔍 11. Find & Replace
  findBtn.addEventListener("click", function () {
    clearHighlights();
    const findText = findInput.value.trim();
    if (!findText) return;

    const content = text.innerHTML;
    const regex = new RegExp(findText, "gi");
    const highlighted = content.replace(regex, match => `<mark>${match}</mark>`);
    text.innerHTML = highlighted;
  });

  replaceBtn.addEventListener("click", function () {
    const findText = findInput.value.trim();
    const replaceText = replaceInput.value;
    if (!findText) return;

    const regex = new RegExp(findText, "");
    text.innerText = text.innerText.replace(regex, replaceText);
    autosave();
    updateCounts();
  });

  replaceAllBtn.addEventListener("click", function () {
    const findText = findInput.value.trim();
    const replaceText = replaceInput.value;
    if (!findText) return;

    const regex = new RegExp(findText, "g");
    text.innerText = text.innerText.replace(regex, replaceText);
    autosave();
    updateCounts();
  });

  // 🧹 Helper: clear previous highlights
  function clearHighlights() {
    text.innerHTML = text.innerHTML.replace(/<mark>(.*?)<\/mark>/g, "$1");
  }

  // 🔁 12. Toggle Word Wrap
  let wrapEnabled = true;
  toggleWrapBtn.addEventListener("click", function () {
    wrapEnabled = !wrapEnabled;
    if (wrapEnabled) {
      text.style.whiteSpace = "pre-wrap";
      toggleWrapBtn.textContent = "🔁 Wrap: ON";
    } else {
      text.style.whiteSpace = "pre";
      toggleWrapBtn.textContent = "🔁 Wrap: OFF";
    }
  });

  // initialize wrap label
  toggleWrapBtn.textContent = "🔁 Wrap: ON";
});
