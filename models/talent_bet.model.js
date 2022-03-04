const mongoose = require("mongoose");

const talentBet = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    talentId: mongoose.Schema.Types.ObjectId,
    bet: { type: Number, require: true },
    even: { type: Boolean },
    odd: { type: Boolean },
    createAt: { type: String, require: true, default: null },
    disableAt: { type: String, require: true, default: null },
    deleteAt: { type: String, require: true, default: null },
}, {});

module.exports = mongoose.model("TalentBet", talentBet);
