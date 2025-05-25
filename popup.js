document.getElementById('file-input').onchange = function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64 = reader.result;
      chrome.runtime.sendMessage({
        action: "openViewer",
        fileDataUrl: base64,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
  }
};

document.getElementById('load-url').onclick = function () {
  const url = document.getElementById('url-input').value.trim();
  if (url) {
    chrome.runtime.sendMessage({
      action: "openViewer",
      fileUrl: url
    });
  }
};
