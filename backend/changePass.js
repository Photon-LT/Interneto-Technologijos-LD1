const Joi = require('joi');

module.exports = (database, app) => {
    
    app.post("/change/pass", (req, res) => {
        const users = database.collection("users");
        const {email, pass, newPass, newPass2} = req.body.user;
        const schema = Joi.object().keys({
            newPass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            newPass2: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        });

        users.findOne({email: email}, (error, user) => {
            if(user === null)return res.status(500).send({status: 'fail', message: 'Error'});
            if(pass !== user.pass)return res.status(401).send({status: 'fail', message: 'Current password is incorrect'});
            if(newPass !== newPass2)return res.status(400).send({status: 'fail', message: 'New password and confirm new password does not match'});
            
            Joi.validate({newPass, newPass2}, schema, (err, value) => {
                if(err)return res.status(400).send({status: 'fail', message: err.details[0].message});
                users.updateOne({email: email}, {$set: {pass: newPass}}, (error, result) => {
                    if(error)return res.status(500).send(error);
                    res.send({status: 'ok', message: "Password successfully changed"});
                });
            });
        });
    });
};   