require("dotenv").config();
const express = require("express");
const app = express();

const socket = require("express-ws")(app);

const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./utils/db.util");

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index"));

app.use("/api/v1/auth", require("./routers/auth.router"));
app.use("/socket", require("./routers/socket.router"));

db((err) => {
    if (err)
        return console.log("Connect DB error!");
    global.WS = socket.getWss();
    require("./crons/talent.cron")();
    require("./crons/talent_reward.cron")();
    app.listen(8000, () => console.log("Listen on port 8000!"));
});
