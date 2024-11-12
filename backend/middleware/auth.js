const jwt = require('jsonwebtoken')
let privatekey =  process.env.JWT_SECRET || "shhhhitsfortoken"

let fetchuser = (req , res , next)=>
{

    token = req.header("auth-token")
    if(!token)
    {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXciOnsiaWQiOiI2NzMzMjgyMmVlZTFmNDY4ZjhhMTM5YWMifSwiaWF0IjoxNzMxNDA1ODU4fQ.yertkqRlZQ5dzlwIQodzwgTEAfotKxka6XNmzWAub4A"
        res.status(401).send("there is something wrong")
    }
    console.log(token)
    let data = jwt.verify(token , privatekey)
    console.log(data.new)
    req.user = data.new;
    next();
}

module.exports = fetchuser