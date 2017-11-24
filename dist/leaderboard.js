"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const db = require("./db");
const LZString = require("lz-string");
class Score {
}
let scores = [];
let nextPlayerId = 0;
let keys = {};
function init(dbScores) {
    scores = _.map(dbScores, (s, i) => {
        return {
            playerId: s.playerId,
            score: s.score,
            rank: s.rank,
            time: s.time
        };
    });
    nextPlayerId = _.maxBy(scores, s => s.playerId).playerId + 1;
}
exports.init = init;
function saveToDb() {
    return db.save(scores);
}
exports.saveToDb = saveToDb;
function getScores(query) {
    let count = 10;
    if (query.count != null) {
        count = Number(query.count);
    }
    let startIndex = 0;
    if (query.score != null) {
        const score = Number(query.score);
        const scoreIndex = _.sortedIndexBy(scores, { score }, s => -s.score);
        startIndex = scoreIndex - Math.floor(count / 2);
    }
    if (query.playerId != null) {
        const playerId = Number(query.playerId);
        const bestIndex = _.findIndex(scores, s => s.playerId === playerId);
        if (bestIndex >= 0) {
            startIndex = bestIndex - Math.floor(count / 2);
        }
    }
    if (startIndex < 0) {
        startIndex = 0;
    }
    if (count + startIndex > scores.length) {
        startIndex -= count + startIndex - scores.length;
        if (startIndex < 0) {
            startIndex = 0;
        }
    }
    if (count + startIndex > scores.length) {
        count = scores.length - startIndex;
    }
    return _.times(count, i => scores[i + startIndex]);
}
exports.getScores = getScores;
function setScore(body) {
    const data = JSON.parse(LZString.decompressFromEncodedURIComponent(body.data));
    const key = data.key;
    const score = data.score;
    const playerId = score.playerId;
    if (key == null || playerId == null) {
        return;
    }
    const best = _.find(scores, s => s.playerId === playerId);
    if (best == null || score.score > best.score) {
        score.time = new Date().getTime();
        scores = insertScore(scores, score);
        scores = _.map(scores, (s, i) => {
            s.rank = i;
            return s;
        });
    }
}
exports.setScore = setScore;
function insertScore(_scores, score) {
    _scores = _.filter(_scores, s => s.playerId !== score.playerId);
    const insertIndex = _.sortedIndexBy(_scores, { score: score.score }, s => -s.score);
    _scores.splice(insertIndex, 0, score);
    return _scores;
}
function getNextPlayerId() {
    const result = nextPlayerId;
    nextPlayerId++;
    return { id: result };
}
exports.getNextPlayerId = getNextPlayerId;
function getKey(query) {
    if (query.playerId == null) {
        return { key: null };
    }
    const key = (Math.random() + 1).toString(36).substring(7);
    keys[query.playerId] = key;
    return { key };
}
exports.getKey = getKey;
