"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const leaderboard = require("./leaderboard");
const db = require("./db");
process.on('uncaughtException', (e) => {
    console.error('uncaughtException: ' + e);
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('docs'));
app.get('/api/score', (req, res) => {
    res.json(leaderboard.getScores(req.query));
});
app.post('/api/score', (req, res) => {
    leaderboard.setScore(req.body);
    res.send('');
    setDbSavingTimeout();
});
app.get('/api/nextPlayerId', (req, res) => {
    res.json(leaderboard.getNextPlayerId());
});
app.get('/api/key', (req, res) => {
    res.json(leaderboard.getKey(req.query));
});
let dbSavingTimeout;
function setDbSavingTimeout() {
    if (dbSavingTimeout != null) {
        clearTimeout(dbSavingTimeout);
    }
    dbSavingTimeout = setTimeout(saveToDb, 60 * 1000);
}
function saveToDb() {
    leaderboard.saveToDb();
    clearTimeout(dbSavingTimeout);
    dbSavingTimeout = null;
}
const listener = app.listen(process.env.PORT, () => {
    db.init().then(() => {
        console.log(`darumatron server ready. port: ${listener.address().port}`);
    });
});
