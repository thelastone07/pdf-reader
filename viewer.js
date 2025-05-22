// Set workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc = 'build/pdf.worker.js';

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

function loadPDF(src) {
  pdfjsLib.getDocument(src).promise.then(function (pdf) {
    pdf.getPage(1).then(function (page) {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: ctx, viewport: viewport });
    });
  }).catch(function (err) {
    alert('Error loading PDF: ' + err.message);
  });
}

window.onload = function () {
  const fileUrl = getQueryParam('file');
  if (fileUrl) {
    loadPDF(decodeURIComponent(fileUrl));
  }
};
