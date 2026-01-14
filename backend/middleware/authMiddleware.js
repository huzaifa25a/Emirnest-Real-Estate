const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Not authorized!"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const verify = jwt.verify(token, process.env.jwt_secret);
        req.user = verify;
        next();
    }
    catch(error){
        console.log(authHeader);
        console.log('error-------->',error);
        return res.status(401).json({message: "Invalid Token"});
    }
}

module.exports = protect;