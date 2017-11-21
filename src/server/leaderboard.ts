import * as _ from 'lodash';
import * as db from './db';

class Score {
  playerId: number;
  name: string;
  score: number;
  time: number;
  rank: number;
}

const scoresCount = 100;
let scores: Score[];
let currentScores: Score[] = [];
let nextPlayerId = 0;

export function setup() {
  const time = new Date().getTime();
  scores = _.times(scoresCount, i => {
    return {
      playerId: -1,
      name: '',
      score: (scoresCount - i) * 10,
      rank: i,
      time
    };
  });
  return db.save(scores);
}

export function init(dbScores) {
  scores = _.map(dbScores, (s: any, i) => {
    if (s.playerId > nextPlayerId - 1) {
      nextPlayerId = s.playerId + 1;
    }
    return {
      playerId: s.playerId,
      name: s.name,
      score: s.score,
      rank: s.rank,
      time: s.time
    };
  });
}

export function saveToDb() {
  return db.save(scores);
}

export function getScores() {
  let _scores = scores.concat(currentScores);
  _scores = _.sortBy(_scores, s => -s.score);
  return _.times(10, i => _scores[i]);
}

export function addScore(data) {
  const best = _.find(scores, s => s.playerId === data.playerId);
  if (data.score > best.score) {
    data.time = new Date().getTime();
    insertScore(scores, data);
    scores = _.map(scores, (s, i) => {
      s.rank = i;
      return s;
    });
  }
}

export function addCurrentScore(data) {
  data.time = new Date().getTime();
  insertScore(currentScores, data);
}

function insertScore(_scores, data) {
  _scores = _.filter(_scores, s => s.playerId !== data.playerId);
  const insertIndex = _.sortedIndexBy
    (_scores, { score: data.score }, s => -s.score);
  _scores.splice(insertIndex, 0, data);
}

export function getNextPlayerId() {
  return nextPlayerId;
}

export function clearCurrentScores() {
  const now = new Date().getTime();
  currentScores = _.filter(currentScores, cs => cs.time + 60 * 1000 < now);
}
