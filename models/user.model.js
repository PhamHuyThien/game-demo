let mongoose = require("mongoose");


const User = mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    coin: { type: Number, default: 0 },
    role: { type: String, require: true, default: "USER" },
    status: { type: String, require: true, default: "ACTIVE" },
    createAt: { type: String, require: true, default: null },
    disableAt: { type: String, require: true, default: null },
    deleteAt: { type: String, require: true, default: null },
}, {});

module.exports = mongoose.model("User", User);