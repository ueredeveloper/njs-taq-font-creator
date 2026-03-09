const http = require('http');
const fs = require('fs');
const path = require('path');
const { generateFont } = require('./font-generator.js');


const PORT = 3000;
const FONT_FILENAME = 'font_taq_maron.otf';
const FONT_ENDPOINT = `/api/fonts/${FONT_FILENAME}`;

// Generate the font file before starting the server.
generateFont();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // API endpoint for the font
  if (req.url === FONT_ENDPOINT) {
    const filePath = path.join(__dirname, 'fonts', FONT_FILENAME);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Error reading font file: ${err.message}`);
        res.writeHead(404);
        res.end('Font file not found');
        return;
      }
      console.log(`Serving font: ${FONT_FILENAME}`);
      res.writeHead(200, { 'Content-Type': MIME_TYPES['.otf'] });
      res.end(data);
    });
    return;
  }

  // Serve static files from the 'frontend' folder
  const url = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(url);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const filePath = path.join(__dirname, '..', 'frontend', url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});