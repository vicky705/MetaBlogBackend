const jwt = require('jsonwebtoken')
const JWT_SECRITE = "thisisvicky"

const Authanticatetoken = async(req, res, next) => {
    let status = false
    try{
        const token = req.header('auth-token');
        if(!token) return res.status(401).json({status, msg : "Invalid Authantication."})
        try{
            const data = await jwt.verify(token, JWT_SECRITE);
            req.user = data.blogerid
            next()
        }
        catch(error){
            return res.status(401).json({status, msg : "Invalid Authantication."})
        }
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
}

module.exports = Authanticatetoken