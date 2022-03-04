const Talent = require("../models/talent.model");
const User = require("../models/user.model");
const TalentBet = require("../models/talent_bet.model");

const TIME_BET = Number(process.env.TIME_BET);
const TIME_DOOR_SCALE = Number(process.env.TIME_DOOR_SCALE);
const TIME_WAIT_SESSION = Number(process.env.TIME_WAIT_SESSION);

const talentRealtimeSession = async () => {
    let talentSession = await Talent.findOne({}).sort({ createAt: -1 });
    if (talentSession == null)
        return { c: false, m: "Chưa có phiên nào." };
    const currentTime = new Date().getTime();
    const totalTime = TIME_BET + TIME_DOOR_SCALE + TIME_WAIT_SESSION;
    let timeRemaining = currentTime - talentSession.createAt - totalTime;
    timeRemaining = Math.abs(Math.round(timeRemaining / 1000));
    let result = timeRemaining <= 10 ? talentSession.result : null;
    return {
        session: talentSession._id,
        timeRemaining: timeRemaining,
        even: talentSession.coinEven,
        odd: talentSession.coinOdd,
        result
    };
}

const userTalentBetRealtimeSession = async (user, talentId) => {
    let isTalentBet = await TalentBet.find({ userId: user._id, talentId: talentId });
    let totalBet = 0;
    let typeBet = isTalentBet.length > 0 ? isTalentBet[0].even ? "even" : "odd" : null;
    isTalentBet.forEach(talentBet => totalBet += talentBet.bet);
    return { totalBet, typeBet };
}

module.exports = { talentRealtimeSession, userTalentBetRealtimeSession };