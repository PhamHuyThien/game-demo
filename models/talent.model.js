const mongoose = require("mongoose");

const talent = mongoose.Schema({
    result: { type: Number, require: true },
    coinEven: { type: Number, default: 0 },
    coinOdd: { type: Number, default: 0 },
    reward: { type: Boolean, default: false },
    createAt: { type: String, require: true, default: null },
    disableAt: { type: String, require: true, default: null },
    deleteAt: { type: String, require: true, default: null },
}, {});

module.exports = mongoose.model("Talent", talent);