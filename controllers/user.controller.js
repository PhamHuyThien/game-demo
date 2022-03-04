const User = require("../models/user.model");

const user = async (ws, data) => {
    if (data.follow !== undefined)
        await followUser(ws, data.follow);
    if (data.rechargeScatchCard)
        await rechargeScatchCard(ws, data.rechargeScatchCard);
}

const followUser = async (ws, data) => {
    if (data) {
        return ws.user.follow = setInterval(async () => {
            let userInfo = await User.findById(ws.user._id);
            let user = userInfo._doc;
            delete user.password;
            ws.json({ user });
        }, 1000);
    }
    clearInterval(ws.user.follow);
}

const rechargeScatchCard = async (ws, data) => {
    let code = data.code;
    let seri = data.seri;
    let price = data.price || 10000000;
    let homeNetwork = data.homeNetwork;

    if (code != 1)
        return ws.error("mã thẻ không hợp lệ");

    await User.updateOne({ username: ws.user.username }, {
        $inc: {
            coin: price
        }
    });
    ws.success("Nạp tiền thành công!");
}

module.exports = user;
