const https = require('https');
const http = require('http');
const fs = require('file-system');
const express = require('express');
const path = require('path');
const app = express();

const privateKey = fs.readFileSync(path.join(__dirname, 'key.pem'));
const publicKey = fs.readFileSync(path.join(__dirname , 'certificate.pem'));

http.createServer(app).listen(process.env.PORT || 8080);
//https.createServer({key: privateKey, cert: publicKey}, app).listen(process.env.PORT || 8081);
//^does not work for heroku

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  '..', 'build', 'index.html'));
});

app.get('/test', function (req, res) {
  res.send('OK ♣');
});