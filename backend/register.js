const randomString = require('randomstring');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({service: 'gmail',
auth: {user: 'codeforces.visualizer@gmail.com', pass: EMAIL_PASS}});

module.exports = (database, app) => {
    
    app.post("/register", (req, res) => {

        const {email, pass, cpass} = req.body.user;
        const temp_users = database.collection('temp_users');
        const users = database.collection('users');

        const schema = Joi.object().keys({
            pass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            cpass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: Joi.string().email({ minDomainAtoms: 2 })
        });
        
        users.findOne({email: email}, (error, user) => {
            if(error)res.status(505).send(error);
            if(user !== null)return res.send({status: 'fail', message: 'This email is already in our database'});
            if(pass !== cpass)return res.send({status: 'fail', message: 'Passwords do not match'});
            
            Joi.validate({email, pass, cpass}, schema, (err, value) => {
                if(err)return res.send({status: 'fail', message: err.details[0].message});

                const token = randomString.generate(100);
                user = {email, pass: bcrypt.hashSync(pass, 10), token};
                temp_users.insertOne(user,(error, result) => {
                    if(error)return res.status(500).send(error);
    
                    transporter.sendMail(
                        {from: 'codeforces.visualizer@gmail.com',
                        to: email,
                        subject: 'Email verification',
                        text: `Click the link below to verify email address\n http://${req.header('host')}/verify/email?token=${token}`},
                        (error, info)=>{
                            if (error) return res.status(500).send(error);
                        }); 
    
                    res.send({status: 'ok', message: 'User succesfully registered. Please verify your email address to login'});
                });
            });
        });
    });
};   