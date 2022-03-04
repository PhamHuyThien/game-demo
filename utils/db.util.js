const mongoose = require("mongoose");

const MDB_HOST = process.env.MDB_HOST || "localhost";
const MDB_PORT = process.env.MDB_PORT || 27017;
const MDB_DB = process.env.MDB_DB || "game-demo";
const MDB_USER = process.env.MDB_USER || "";
const MDB_PASS = process.env.MDB_PASS || "";

const AUTH = MDB_USER != "" && MDB_PASS != "" ? MDB_USER + ":" + MDB_PASS + "@" : "";
const URL = `mongodb://${AUTH}${MDB_HOST}:${MDB_PORT}/${MDB_DB}`;

const db = (callback = (err) => { }) => mongoose.connect(URL, err => callback(err));

module.exports = db;
