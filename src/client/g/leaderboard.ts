import * as _ from 'lodash';

export let scores: any[];
export let playerId: number;
const playerIdKey = 'darumatron-player-id';
let lastScore = 0;

export function init() {
  const playerIdStorage = localStorage.getItem(playerIdKey);
  if (playerIdStorage == null) {
    window.fetch('/api/nextPlayerId').
      then(result => result.text()).
      then(text => {
        playerId = Number(text);
        localStorage.setItem(playerIdKey, text);
      }).catch();
  } else {
    playerId = Number(playerIdStorage);
  }
}

export function get(isGettingLast = false, isGettingBest = false) {
  scores = null;
  if (playerId == null) {
    return;
  }
  let uri = '/api/score';
  if (isGettingLast) {
    uri += `?score=${lastScore}&count=9`;
  } else if (isGettingBest) {
    uri += `?playerId=${playerId}`;
  }
  window.fetch(uri).
    then(result => result.json()).
    then(json => {
      scores = json;
      if (isGettingLast) {
        scores.push({ score: lastScore, playerId });
        scores = _.sortBy(scores, s => -s.score);
      }
    }).
    catch();
}

export function set(score: number) {
  lastScore = score;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  window.fetch('/api/score', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      playerId,
      score
    })
  }).
    catch();
}
