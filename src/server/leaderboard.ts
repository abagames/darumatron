import * as _ from 'lodash';
import * as db from './db';

class Score {
  playerId: number;
  score: number;
  time: number;
  rank: number;
}

const scoresCount = 100;
let scores: Score[] = [];
let nextPlayerId = 0;

export function init(dbScores) {
  scores = _.map(dbScores, (s: any, i) => {
    if (s.playerId > nextPlayerId - 1) {
      nextPlayerId = s.playerId + 1;
    }
    return {
      playerId: s.playerId,
      score: s.score,
      rank: s.rank,
      time: s.time
    };
  });
}

export function saveToDb() {
  return db.save(scores);
}

export function getScores(query: any) {
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
  if (count + startIndex >= scores.length) {
    startIndex -= count + startIndex - scores.length - 1;
    if (startIndex < 0) {
      startIndex = 0;
    }
  }
  if (count + startIndex >= scores.length) {
    count = scores.length - startIndex;
  }
  return _.times(count, i => scores[i + startIndex]);
}

export function addScore(data) {
  const best = _.find(scores, s => s.playerId === data.playerId);
  if (best == null || data.score > best.score) {
    data.time = new Date().getTime();
    scores = insertScore(scores, data);
    scores = _.map(scores, (s, i) => {
      s.rank = i;
      return s;
    });
  }
}

function insertScore(_scores, data) {
  _scores = _.filter(_scores, s => s.playerId !== data.playerId);
  const insertIndex = _.sortedIndexBy
    (_scores, { score: data.score }, s => -s.score);
  _scores.splice(insertIndex, 0, data);
  return _scores;
}

export function getNextPlayerId() {
  const result = nextPlayerId;
  nextPlayerId++;
  return result;
}
