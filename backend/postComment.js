const Joi = require('joi');

module.exports = (database, app) => {
    
    app.post("/post/comment", (req, res) => {
        const users = database.collection("users");
        const comments = database.collection("comments");
        const {email, handle, token, content} = req.body;
        const schema = Joi.object().keys({
            content: Joi.string().max(32768, 'utf8')
        });

        users.findOne({email: email}, (error, user) => {
            if(error)return res.send({status: 'fail', message: error});
            if(user === null)return res.send({status: 'fail', message: 'Error'});
            if(!user.hasOwnProperty('handle'))return res.send({status: 'fail', message: 'User does not have verified handle'});
            if(token !== user.token)res.send({status: 'fail', message: "session expired, please relogin to continue"});
            
            Joi.validate({content}, schema, (err, value) => {
                if(err)return res.send({status: 'fail', message: err.details[0].message});
                comments.insertOne({handle: handle, content: content, posterHandle: user.handle}, (error, result) => {
                    if(error)return res.status(500).send(error);
                    res.send({status: 'ok', message: "Comment successfully posted"});
                });
            });
        });
    });
};   