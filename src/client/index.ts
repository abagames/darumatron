import * as pag from 'pag';
import * as ppe from 'ppe';
import * as g from './g/index';

let context: CanvasRenderingContext2D;

window.onload = () => {
  //initDb().then(() => {
  g.init();
  const game = new g.Game(160, 160, init, update);
  const canvas = game.screen.canvas;
  context = game.screen.context;
  canvas.setAttribute('style', null);
  canvas.setAttribute('id', 'main');
  ppe.options.canvas = canvas;
  g.beginGames();
  //});
};

/*function initDb() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return window.fetch('/api/score', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      playerId: 1,
      name: 'foo',
      score: Math.floor(Math.random() * 120 + 900)
    })
  }).
    then(() => {
      return window.fetch('/api/score');
    }).
    then(result => result.json()).
    then(json => {
      console.log(json);
    });
}*/

let pa;

function init() {
  pa = new g.Player();
  new g.MoveWasd(pa, 2, 0.1);
}

function update() {
}
