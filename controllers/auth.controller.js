const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt.util");

const login = async (req, res) => {
    let username = req.body.username || "";
    let password = req.body.password || "";

    let userImage = await User.findOne({ username, password });
    if (userImage == null)
        return res.status(400).json({ c: false, m: "tk mk sai" });

    let user = userImage._doc;
    delete user.password;
    let token = generateToken(user);

    return res.json({ c: true, m: "Thành công!", d: { token, user } });
}

const register = async (req, res) => {
    let username = req.body.username || "";
    let password = req.body.password || "";
    try {
        let userCreate = await User.create({ username, password });
        let user = userCreate._doc;
        delete user.password;
        return res.json({ c: true, m: "Thanh cong!", d: user });
    } catch (e) {
        return res.status(400).json({ c: false, m: e.toString() });
    }
}

module.exports = { login, register };