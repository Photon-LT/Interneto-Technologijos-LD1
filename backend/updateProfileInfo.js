const Joi = require('joi');

module.exports = (database, app) => {
    
    app.post("/update/about/me", (req, res) => {
        const users = database.collection("users");
        const {email, token, aboutMe} = req.body.user;
        const schema = Joi.object().keys({
            aboutMe: Joi.string().max(32768, 'utf8')
        });

        users.findOne({email: email}, (error, user) => {
            if(user === null)return res.send({status: 'fail', message: 'Error'});
            if(token !== user.token)res.send({status: 'fail', message: "session expired, please relogin to continue"});

            Joi.validate({aboutMe}, schema, (err, value) => {
                if(err)return res.send({status: 'fail', message: err.details[0].message});
                users.updateOne({email: email}, {$set: {aboutMe: aboutMe}}, (error, result) => {
                    if(error)return res.status(500).send(error);
                    res.send({status: 'ok', message: "About me section successfully updated"});
                });
            });
        });
    });
};   