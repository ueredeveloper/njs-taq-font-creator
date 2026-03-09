const http = require('http');
const fs = require('fs');
const path = require('path');
const generateFont = require('./example.js');

const PORT = 3000;
const FONT_FILENAME = 'fonte_aeou.otf';
const FONT_ENDPOINT = '/api/font';

// Generate the font file before starting the server.
generateFont();

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Font Reader</title>
        <style>
          @font-face {
            font-family: 'FonteAEOU';
            src: url('${FONT_ENDPOINT}');
          }
          body {
            font-family: 'FonteAEOU', sans-serif;
            font-size: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }
        </style>
      </head>
      <body>
        aeou
      </body>
      </html>
    `);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
  } else if (req.url === FONT_ENDPOINT) {
    const filePath = path.join(__dirname, 'fonts', FONT_FILENAME);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Error reading font file: ${err.message}`);
        res.writeHead(404);
        res.end('Font file not found');
        return;
      }
      console.log(`Serving font: ${FONT_FILENAME}`);
      res.writeHead(200, { 'Content-Type': 'font/otf' });
      res.end(data);
    });
  } else {
    console.log(`404 Not Found: ${req.url}`);
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});