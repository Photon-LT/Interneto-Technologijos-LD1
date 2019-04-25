const bodyParser = require("body-parser");
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const sslRedirect = require('heroku-ssl-redirect');

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.NODE_ENV === 'production' ? 'interneto_technologijos' : 'interneto_technologijos_testing';

// Middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sslRedirect());

//Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(DB_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) throw error;

    database = client.db(DB_NAME);
    console.log("Connected to `" + DB_NAME + "`!");

    //POSTS
    require('./register')(database, app);
    require('./login')(database, app);
    require('./changePass')(database, app);
    require('./updateProfileInfo')(database, app);
    require('./postComment')(database, app);
    require('./verifyHandle')(database, app);

    //GETS
    require('./verifyEmail')(database, app);
    require('./getUserByHandle')(database, app);
    require('./getCommentsForHandle')(database, app);

    //DELETES
    require('./deleteAccount')(database, app);
  });
});