module.exports = (database, app) => {
    
    app.get("/comments/:handle", (req, res) => {
        const comments = database.collection("comments");
        
        comments.find({ handle: req.params.handle }).toArray((error, result) => {
            if(error) return res.status(500).send({status: "fail", message: error});
            if(!result)return res.send({status: "none", message: "No comments exist yet"});
            res.send({status: "ok", comments: result});
      });
    });
};   