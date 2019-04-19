const randomString = require('randomstring');

module.exports = (database, app) => {
    
    app.post('/login', (req, res) => {
        const {email, pass} = req.body.user;
        const users = database.collection("users");

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
};   