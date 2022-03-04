const { verifyTokenSync } = require("../utils/jwt.util");

const isAuth = async (ws, req) => {
    const token = req.query.token || "";
    try {
        let body = await verifyTokenSync(token);
        return body.d;
    } catch (e) {
    }
    return false;
}

const isAdmin = async (ws, req) => {
    const user = await isAuth(ws, req);
    return user !== false && user.role == "ADMIN";
}

module.exports = { isAuth, isAdmin };