const { talentRealtimeSession } = require("../services/talent.service");
const Talent = require("../models/talent.model");
const TalentBet = require("../models/talent_bet.model");
const User = require("../models/user.model");

const talentReward = async () => {
    setInterval(async () => {
        let talenReal = await talentRealtimeSession();
        let talenImage = await Talent.findById(talenReal.session);
        if (talenReal.timeRemaining <= 10 && talenImage.reward == false) {
            let talentBets = await TalentBet.find({ talentId: talenImage._id });
            talentBets.forEach(async talentBet => {
                if ((talenImage.result < 10 && talentBet.odd) || (talenImage.result > 9 && talentBet.even)) {
                    await User.findByIdAndUpdate(talentBet.userId, {
                        $inc: {
                            coin: talentBet.bet * 2
                        },
                    })
                }
            });
            await Talent.findByIdAndUpdate(talenImage._id, {
                $set: {
                    reward: true
                }
            });
        }
    }, 1000);
}

module.exports = talentReward;