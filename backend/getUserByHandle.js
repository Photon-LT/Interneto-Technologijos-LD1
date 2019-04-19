module.exports = (database, app) => {
    
    app.get("/user/:handle", (req, res) => {
        const users = database.collection("users");

        users.findOne({ handle: req.params.handle.toLowerCase() }, (error, result) => {
            if(error) return res.status(500).send({status: "fail", message: error});
            if(req.params.handle.length < 3)res.send({status: "fail", message: "invalid handle"});
            if(result === null)return res.send({status: "fail", message: "User Does not exits in DB"});
            
            let data = result;
            delete data._id;
            delete data.pass;
            delete data.token;
            res.send({status: "ok", data: data});
        });
    });
};   