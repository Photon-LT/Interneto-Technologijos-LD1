const https = require('https');
const fs = require('file-system');
const express = require('express');
const path = require('path');
const app = express();

const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'));
const publicKey = fs.readFileSync(path.join(__dirname , 'certificate.pem'));

const server = https.createServer({key: privateKey, cert: publicKey}, app);

server.listen(process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  '..', 'build', 'index.html'));
});

app.get('/test', function (req, res) {
  res.send('OK ♣');
});