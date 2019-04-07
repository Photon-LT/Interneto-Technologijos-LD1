const BodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.NODE_ENV === 'production' ? 'interneto_technologijos' : 'interneto_technologijos_testing';
const EMAIL_PASS = process.env.EMAIL_PASS;

if(process.env.NODE_ENV === 'production') // <- forces usage of HTTPS when hosted on HEROKu
{
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

//Email stuff
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codeforces.visualizer@gmail.com',
    pass: EMAIL_PASS
  }
});

/* Sending email - example
transporter.sendMail(
  {from: 'codeforces.visualizer@gmail.com',
   to: 'paulius.gasiukevicius@gmail.com',
   subject: 'test',
   text: 'wait\nThat\'s it?'},
    (error, info)=>{
  if (error) console.log(error);
   else console.log('Email sent: ' + info.response);
}); 
*/


// Middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '..', 'build', 'index.html'));
});

app.get('/test', (req, res) => {
  res.send('OK ♣');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send({status: 'ok'});
});

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) throw error;

    database = client.db(DB_NAME);
    collection = database.collection("people");
    console.log("Connected to `" + DB_NAME + "`!");

    app.post("/person", (request, response) => {
      collection.insertOne(request.body, (error, result) => {
          if(error) return response.status(500).send(error);
          response.send(result.result);
      });
    });
    
    app.get("/people", (request, response) => {
      collection.find({}).toArray((error, result) => {
          if(error) return response.status(500).send(error);
          response.send(result);
      });
    });
    
    app.get("/person/:id", (request, response) => {
      collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
          if(error) return response.status(500).send(error);
          response.send(result);
      });
    });
  });
});