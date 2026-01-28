const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.verifyToken = async (req ,res, next)=>{
   const authHeader = req.headers.authorization;
   const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer') ? authHeader.replace('Bearer', '').trim() : null);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
     const isBlacklisted = await blacklistTokenModel.findOne({token:token});
      if (isBlacklisted) {
        return res.status(401).json({message:'Unauthorized'})
     }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        const user = await UserModel.findById(decoded.userId)
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

}


// const jwt = require("jsonwebtoken");

// module.exports  = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };