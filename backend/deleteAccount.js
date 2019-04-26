const bcrypt = require('bcrypt');

module.exports = (database, app) => {
    
    app.delete("/delete/account", (req, res) => {
        const users = database.collection("users");
        const {email, token, pass} = req.body.user;

        users.findOne({email: email}, (error, user) => {
            if(user === null)return res.status(500).send({status: 'fail', message: 'Error'});
            if(!bcrypt.compareSync(pass, user.pass))return res.status(401).send({status: 'fail', message: 'Incorrect password'});
        
            users.deleteOne({email: email}, (error, result) => {
                if(error)return res.status(500).send(error);
                res.send({status: 'ok', message: "Account successfully deleted"});
            });
        });
    });
};   