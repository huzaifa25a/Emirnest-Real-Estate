const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Not authorized!"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const verify = jwt.verify(token, process.env.jwt_scret);
        req.user = verify;
        next();
    }
    catch(error){
        return res.status(401).json({message: "Invalid Token"});
    }
}

module.exports = protect;