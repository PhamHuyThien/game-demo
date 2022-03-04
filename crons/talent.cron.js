const { randInt } = require("../utils/number.util");
const Talent = require("../models/talent.model");

const TIME_BET = Number(process.env.TIME_BET);
const TIME_DOOR_SCALE = Number(process.env.TIME_DOOR_SCALE);
const TIME_WAIT_SESSION = Number(process.env.TIME_WAIT_SESSION);

const talent = async () => {
    setInterval(async () => {
        let totalTime = TIME_BET + TIME_DOOR_SCALE + TIME_WAIT_SESSION;
        let currentTime = new Date().getTime();
        let talentSession = await Talent.findOne().sort({ createAt: -1 });
        if (talentSession === null || currentTime - talentSession.createAt > totalTime)
            return await createNewTalentSession();
    }, 1000);
}

const createNewTalentSession = async () => {
    const result = discShock();
    return await Talent.create({ result, createAt: new Date().getTime() });
}

const discShock = () => {
    let dice1 = randInt(1, 6);
    let dice2 = randInt(1, 6);
    let dice3 = randInt(1, 6);
    return dice1 + dice2 + dice3;
}


module.exports = talent;