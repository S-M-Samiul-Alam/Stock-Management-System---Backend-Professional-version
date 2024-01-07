const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //console.log(process.env.JWT_SECRET)
    //console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.decoded = decoded;
        next();
    });
}

module.exports = verifyToken;
