chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openViewer") {
    let url = chrome.runtime.getURL("viewer.html");
    if (message.fileDataUrl) {
      // Pass data URL and filename as query parameters (URL-encoded)
      url += `?file=${encodeURIComponent(message.fileDataUrl)}&name=${encodeURIComponent(message.fileName)}`;
    } else if (message.fileUrl) {
      url += `?file=${encodeURIComponent(message.fileUrl)}`;
    }
    chrome.tabs.create({ url });
  }
});
