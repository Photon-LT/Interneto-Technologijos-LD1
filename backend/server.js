const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
const randomString = require("randomstring");
const app = express();

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

// Middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '..', 'build', 'index.html'));
});

app.get('/test', (req, res) => {
  res.send('OK ♣');
});

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) throw error;

    database = client.db(DB_NAME);
    comments = database.collection("comments");
    users = database.collection("users");
    temp_users = database.collection("temp_users");

    console.log("Connected to `" + DB_NAME + "`!");

    app.post("/register", async(req, res) => {
      const {email, pass, cpass} = req.body.user;
      let user = await users.findOne({email: email});
      if(user !== null)return res.send({status: 'fail', message: 'This email is already in our database'});
      if(pass !== cpass)return res.send({status: 'fail', message: 'Passwords do not match'});
      
      const token = randomString.generate(100);
      user = {email, pass, token};
      temp_users.insertOne(user,(error, result) => {
        if(error)return res.status(500).send(error);

        transporter.sendMail(
          {from: 'codeforces.visualizer@gmail.com',
           to: email,
           subject: 'Email verification',
           text: `Click the link below to verify email address\n <a href='http://${req.header('host')}/verify/email?token=${token}`},
            (error, info)=>{
            if (error) return res.status(500).send(error);
        }); 

        res.send({status: 'ok', message: 'User succesfully registered. Please verify your email address to login'});
      });
    });

    app.get('/verify/email', (req, res) => {
      if(req.query.token === null)res.status(404).send('It appears that your token has expired or it already was activated');
      temp_users.findOne({token: req.query.token}, (error, temp_user) => {
        if(error)return res.status(500).send(error);
        if(temp_user === null)return res.status(404).send('It appears that your token has expired or it already was activated');

        let user = {email: temp_user.email, pass: temp_user.pass};
        temp_users.deleteMany({token: temp_user.token});
        users.insertOne(user, (error, result) => {
          if(error)return res.status(500).send(error);
        });
        res.redirect(`http://${req.header('host')}`);
      });
    });

    app.post('/login', (req, res) => {
      const {email, pass} = req.body.user;
      users.findOne({email: email}, (error, user) => {
        if(error) return res.status(500).send({status: "fail", message: error});
        if(user === null || user.pass !== pass)return res.send({status: 'fail', message: 'User does not exist or incorrect password'});
        let data = user;
        delete data.pass;
        data.token = randomString.generate(100);

        users.updateOne({email: email}, {$set: {token: data.token}}, (error, result) => {
          if(error)return res.status(500).send(error);
          res.send({status: 'ok', user: data});
        });
      });
    });
    
    app.get("/user/:handle", (req, res) => {
      users.findOne({ handle: req.params.handle }, (error, result) => {
          if(error) return res.status(500).send({status: "fail", message: error});
          if(result === null)return res.send({status: "fail", message: "User Does not exits in DB"});
          let data = result;
          delete data._id;
          delete data.pass;
          delete data.token;
          res.send({status: "ok", data: data});
      });
    });

    app.get("/comments/:handle", (req, res) => {
      comments.findMany({ handle: req.params.handle }, (error, result) => {
        if(error) return res.status(500).send({status: "fail", message: error});
        if(result === null)return res.send({status: "fail", message: "No comments exist yet"});
        res.send({status: "ok", data: result});
    });
    });

  });
});