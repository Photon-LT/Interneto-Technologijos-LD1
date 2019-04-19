const fetch = require('node-fetch');

module.exports = (database, app) => {
    
    app.post("/verify/handle", (req, res) => {
        const users = database.collection("users");
        const {email, token, handle} = req.body.user;

        users.findOne({email: email}, (error, user) => {
            if(user === null)return res.send({status: 'fail', message: 'Error'});
            if(token !== user.token)res.send({status: 'fail', message: "session expired, please relogin to continue"});
        
            fetch('https://codeforces.com/api/problemset.problems')
            .then(resp => resp.json())
            .then(data => {
                let idx = Math.floor(Math.random()*data.result.problems.length);
                let problemId = data.result.problems[idx].contestId + '/' + data.result.problems[idx].index;
                let url = 'https://codeforces.com/problemset/problem/' + problemId;
                res.send({message: "Please follow this link and submit a compolation error in one minute to verify this handle is yours\n" + url + "\n Relogin after one minute for changes to take effect"});
                setTimeout(()=>{
                    fetch('https://codeforces.com/api/user.status?handle='+handle)
                    .then(resp => resp.json())
                    .then(data => {
                    if(data.result[0].verdict === "COMPILATION_ERROR" 
                    && data.result[0].problem.contestId + '/' + data.result[0].problem.index === problemId)
                        users.updateOne({email: email}, {$set: {handle: handle}});
                    })
                    .catch(error => console.log(error));
                }, 60000);
            })
            .catch(error => res.send({message: error}));
        });
    });
};   