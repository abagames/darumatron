"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const leaderboard = require("./leaderboard");
let sequelize;
let Score;
function init() {
    sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
        host: '0.0.0.0',
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        storage: '.data/database.sqlite'
    });
    return sequelize.authenticate().then(() => {
        Score = sequelize.define('score', {
            playerId: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            score: {
                type: Sequelize.INTEGER
            },
            rank: {
                type: Sequelize.INTEGER
            },
            time: {
                type: Sequelize.BIGINT
            }
        });
        return load();
    }).catch(err => {
        console.log(`sqlite init error: ${err}`);
    });
}
exports.init = init;
function load() {
    return Score.findAll({ order: [['rank']] }).then(ss => {
        leaderboard.init(ss);
    });
}
function save(scores) {
    return Score.sync({ force: true }).then(() => {
        Score.bulkCreate(scores);
    });
}
exports.save = save;
