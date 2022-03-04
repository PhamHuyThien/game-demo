const { isAuth } = require("../authenticates/socket.auth");

const router = require("express").Router();

router.ws("/", async (ws, req) => {
    const user = await isAuth(ws, req);
    if (user === false)
        return ws.close();
    ws.json = (j) => ws.send(JSON.stringify(j));
    ws.error = (j) => ws.send(JSON.stringify({ error: j }));
    ws.success = (j) => ws.send(JSON.stringify({ success: j }));
    global.online++;
    ws.user = user;
    wssRouter(ws);
});

const wssRouter = (ws) => {
    ws.on("message", (data) => {
        const command = JSON.parse(data);
        //game
        if (command.talent)
            require("../controllers/talent.controller")(ws, command.talent);
        if (command.goAhead)
            require("../controllers/go_ahead.controller")(ws, command.goAhead);
        if (command.highLow)
            require("../controllers/high_low.controller")(ws, command.highLow);
        //portal
        if (command.user)
            require("../controllers/user.controller")(ws, command.user);
    });
    ws.on("close", () => {
        global.online--;
    });
}

module.exports = router;