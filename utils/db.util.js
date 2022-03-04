const mongoose = require("mongoose");

const db = (callback = (err) => { }) => {
    mongoose.connect("mongodb://localhost:27017/game-demo", (err) => callback(err));
}

module.exports = db;