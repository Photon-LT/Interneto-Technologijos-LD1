module.exports = (database, app) => {
    
    app.get('/verify/email', (req, res) => {

        const temp_users = database.collection("temp_users");
        const users = database.collection("users");

        if(req.query.token === null)return res.status(404).send('It appears that your token has expired or it already was activated');

        temp_users.findOne({token: req.query.token}, (error, temp_user) => {
            if(error)return res.status(500).send(error);
            if(temp_user === null)return res.status(404).send('It appears that your token has expired or it already was activated');
    
            const user = {email: temp_user.email, pass: temp_user.pass};
            users.insertOne(user, (error, result) => {
                if(error)return res.status(500).send(error);
                return res.redirect(`http://${req.header('host')}`);
            });
            temp_users.deleteMany({token: temp_user.token});
        });
    });
};   