const jwt = require("jsonwebtoken");

const JWT_SECRET = "4f45eb769b9_____fuck_____703329380c4fb4bc3e_______you_____5463f62fa3f467a6_____baby____5b991d7adae68133384";

const generateToken = (user = {}) => jwt.sign({ d: user }, JWT_SECRET, { expiresIn: 24 * 60 * 60 * 1000 });

const verifyTokenSync = (token = "") => new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decode) => err ? reject(err) : resolve(decode));
});


module.exports = { verifyTokenSync, generateToken };
