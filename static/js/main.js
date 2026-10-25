document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("resume");
  const fileName = document.getElementById("file-name");
  const dropzone = document.getElementById("dropzone");
  const form = document.getElementById("upload-form");
  const button = document.getElementById("analyze-button");

  if (!input) return;

  const showFile = (file) => {
    if (!file) {
      fileName.textContent = "Drop your resume here or browse files";
      return;
    }
    fileName.textContent = file.name;
    dropzone.classList.add("has-file");
  };

  input.addEventListener("change", () => showFile(input.files[0]));

  ["dragenter", "dragover"].forEach(eventName => {
    dropzone.addEventListener(eventName, event => {
      event.preventDefault();
      dropzone.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, event => {
      event.preventDefault();
      dropzone.classList.remove("dragging");
    });
  });
  dropzone.addEventListener("drop", event => {
    const files = event.dataTransfer.files;
    if (files.length) {
      const transfer = new DataTransfer();
      transfer.items.add(files[0]);
      input.files = transfer.files;
      showFile(files[0]);
    }
  });

  form.addEventListener("submit", () => {
    button.disabled = true;
    button.innerHTML = 'Analyzing resume <span class="spinner"></span>';
  });
});
