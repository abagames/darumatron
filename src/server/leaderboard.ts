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

export function getScores(isIncludingCurrent: boolean, query: any) {
  let _scores = scores;
  if (isIncludingCurrent) {
    _scores = _scores.concat(currentScores);
    _scores = _.sortBy(_scores, s => -s.score);
  }
  let count = 10;
  if (query.count != null) {
    count = Number(query.count);
  }
  let startIndex = 0;
  if (query.score != null) {
    const scoreIndex = _.sortedIndexBy
      (_scores, { score: Number(query.score) }, s => -s.score);
    startIndex = scoreIndex - Math.floor(count / 2);
    if (startIndex < 0) {
      startIndex = 0;
    }
  }
  if (count + startIndex >= _scores.length) {
    startIndex -= count + startIndex - scores.length - 1;
    if (startIndex < 0) {
      startIndex = 0;
    }
  }
  if (count + startIndex >= _scores.length) {
    count = _scores.length - startIndex;
  }
  return _.times(count, i => _scores[i + startIndex]);
}

export function addScore(data) {
  const best = _.find(scores, s => s.playerId === data.playerId);
  if (best == null || data.score > best.score) {
    currentScores = _.filter(currentScores, s => s.playerId !== data.playerId);
    data.time = new Date().getTime();
    scores = insertScore(scores, data);
    scores = _.map(scores, (s, i) => {
      s.rank = i;
      return s;
    });
  } else {
    addCurrentScore(data);
  }
}

export function addCurrentScore(data) {
  data.time = new Date().getTime();
  currentScores = insertScore(currentScores, data);
}

function insertScore(_scores, data) {
  _scores = _.filter(_scores, s => s.playerId !== data.playerId);
  const insertIndex = _.sortedIndexBy
    (_scores, { score: data.score }, s => -s.score);
  _scores.splice(insertIndex, 0, data);
  return _scores;
}

export function getNextPlayerId() {
  return nextPlayerId;
}

export function clearCurrentScores() {
  const now = new Date().getTime();
  currentScores = _.filter(currentScores, cs => cs.time + 60 * 1000 < now);
}
