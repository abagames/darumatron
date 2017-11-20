import * as _ from 'lodash';
import * as db from './db';

const scoresCount = 100;
let scores: { playerId: number, name: string, score: number }[];
let nextPlayerId = 0;

export function setup() {
  scores = _.times(scoresCount, i => {
    return { playerId: -1, name: '', score: (scoresCount - i) * 10 };
  });
  return db.save(scores);
}

export function init(dbScores) {
  scores = _.map(dbScores, (s: any, i) => {
    if (s.playerId > nextPlayerId - 1) {
      nextPlayerId = s.playerId + 1;
    }
    return {
      playerId: s.playerId, name: s.name, score: s.score
    };
  });
}

export function saveToDb() {
  return db.save(scores);
}

export function getScores() {
  return _.times(10, i => scores[i]);
}

export function addScore(data) {
  const best = _.find(scores, s => s.playerId === data.playerId);
  if (best.score >= data.score) {
    return;
  }
  scores = _.filter(scores, s => s.playerId !== data.playerId);
  const insertIndex = _.sortedIndexBy(scores, { score: data.score }, s => -s.score);
  scores.splice(insertIndex, 0, data);
}

export function getNextPlayerId() {
  return nextPlayerId;
}
