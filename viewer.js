// Set workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc = 'build/pdf.worker.js';

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

function loadPDF(src) {
  // viewer.js (add this after rendering the first page)
pdfjsLib.getDocument(src).promise.then(function (pdf) {
  pdf.getPage(1).then(function (page) {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => {
      // Inject the script after the PDF is rendered
      if (chrome && chrome.scripting) {
        chrome.scripting.executeScript({
          target: { tabId: getTabId() }, // see note below
          files: ["content.js"]
        });
      } else {
        // Fallback: dynamically add a script tag
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('content.js');
        document.body.appendChild(s);
      }
    });
  });
});

}

window.onload = function () {
  const fileUrl = getQueryParam('file');
  if (fileUrl) {
    loadPDF(decodeURIComponent(fileUrl));
  }
};
