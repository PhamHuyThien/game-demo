const User = require("../models/user.model");
const TalentBet = require("../models/talent_bet.model");
const Talent = require("../models/talent.model");

const { talentRealtimeSession, userTalentBetRealtimeSession } = require("../services/talent.service");

const talent = async (ws, data) => {
    if (data.follow !== undefined)
        talentFollow(ws, data.follow);
    if (data.chat)
        talentChat(ws, data.chat);
    if (data.bet)
        talentBet(ws, data.bet);
}
const talentBet = async (ws, data) => {
    let even = data.even;
    let odd = data.odd;
    let bet = data.bet;

    let userReal = await User.findById(ws.user._id);

    if (bet > userReal.coin)
        return ws.error("Bạn đéo đủ tiền mà đòi cược!");

    let talentReal = await talentRealtimeSession();
    if (talentReal.timeRemaining <= 10)
        return ws.error("Hết thời gian cược.");

    let talentBetReal = await TalentBet.findOne({ userId: ws.user._id, talentId: talentReal.session });
    if (talentBetReal != null && (talentBetReal.even != even || talentBetReal.odd != odd))
        return ws.error("Đặt 1 cửa thôi, ngáo vl");


    await User.findOneAndUpdate({ _id: ws.user._id }, { $inc: { coin: -bet } });
    await TalentBet.create({ userId: ws.user._id, talentId: talentReal.session, bet, even, odd, createAt: new Date().getTime() });
    await Talent.findOneAndUpdate({ _id: talentReal.session },
        {
            $inc: {
                coinEven: even ? bet : 0,
                coinOdd: odd ? bet : 0
            }
        }
    );
    ws.json({ bet: true });
}

const talentFollow = async (ws, data) => {
    if (data) {
        return ws.talent = setInterval(async () => {
            let talentData = await talentRealtimeSession();
            let userTalentBetData = await userTalentBetRealtimeSession(ws.user, talentData.session);
            ws.json({ talent: { session: { ...talentData, ...userTalentBetData } } });
        }, 1000);
    }
    clearInterval(ws.talent);
}

const talentChat = (ws, data) => {
    global.WS.clients.forEach(client => client.json({
        talent: {
            chat: {
                username: ws.user.username,
                comment: data.message
            }
        }
    }));
}

module.exports = talent;