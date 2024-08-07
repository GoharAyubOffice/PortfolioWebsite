const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = 3000;

// Serve Brotli files with correct headers
app.use('/', expressStaticGzip(path.join(__dirname, 'frontend'), {
  enableBrotli: true,
  orderPreference: ['br'],
  setHeaders: (res, path) => {
    if (path.endsWith('.br')) {
      res.set('Content-Encoding', 'br');
      res.set('Content-Type', 'application/javascript'); // Set the correct MIME type
    }
  }
}));

const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
