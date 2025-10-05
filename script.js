document.addEventListener("DOMContentLoaded", function () {
  const text = document.getElementById("text");
  const counter = document.getElementById("counter");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  // Formatting buttons
  const buttons = [
    "bold", "italic", "underline", "strikethrough",
    "justifyLeft", "justifyRight", "justifyCenter", "justifyFull",
    "unorderedList", "increaseFontSize", "decreaseFontSize",
    "copyBtn", "resetBtn"
  ];

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

  text.addEventListener("input", updateCounts);
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
});
