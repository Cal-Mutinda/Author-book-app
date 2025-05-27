const { jwt } = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdmin = (req, res, next) => {
const token = req.headers['authorizatoin']?.split(' ')[1];

if (!token) {
return res.status(401).json({message: 'Access Denied'});


}

jwt.verify(token, JWT_SECRET, (err, user) =>{
    if (err) {
        return res.status(403).json({message: 'Invalid credentials'});
        
    }
    req.user = user
    next();
    
})

}

module.exports = verifyAdmin;