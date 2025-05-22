// Set workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc = 'build/pdf.worker.js';

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

// Load PDF from URL
document.getElementById('load-url').onclick = function () {
  const url = document.getElementById('url-input').value.trim();
  if (url) {
    loadPDF(url);
  }
};

// Load PDF from file input
document.getElementById('file-input').onchange = function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const typedarray = new Uint8Array(reader.result);
      loadPDF(typedarray);
    };
    reader.readAsArrayBuffer(file);
  }
};

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
