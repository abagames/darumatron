import * as _ from 'lodash';
import * as pag from 'pag';
import * as ppe from 'ppe';
import * as g from './g/index';

let screen: g.Screen;
let context: CanvasRenderingContext2D;

window.onload = () => {
  //initDb().then(() => {
  g.init();
  g.ui.useStickKeyAsButton();
  const game = new g.Game(160, 160, init, update);
  const canvas = game.screen.canvas;
  screen = game.screen;
  context = screen.context;
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

let player, floor;

function init() {
  player = new Player();
  player.pos.set(screen.size.x * 0.25, screen.size.y * 0.75);
  player.angle = -g.p.HALF_PI;
  _.times(7, i => {
    const dr = new Daruma(i * 20 - 100, true);
  });
  floor = new Floor
    (g.p.createVector(screen.size.x / 2, screen.size.y - 20), 100, 10);
  floor.priority = -1;
}

function update() {
}

class Player extends g.Player {
  update() {
    super.update();
    this.options.hasTrail = false;
    if (g.ui.isJustPressed && g.ui.stickAngle > 0) {
      let a;
      if (g.ui.stickAngle > 4) {
        this.pos.x = screen.size.x / 4;
        a = 0;
      } else {
        this.pos.x = screen.size.x / 4 * 3;
        a = g.p.PI;
      }
      new g.Shot(this, 10, a);
    }
    this.pos.y = floor.pos.y - 15;
    if (this.pos.y > 152) {
      this.destroy();
    }
  }

  destroy() {
    super.destroy();
    floor.destroy();
  }
}

class Daruma extends g.Enemy {
  constructor(y, isFirst = false) {
    super();
    this.getModule('RemoveWhenInAndOut').paddingOuter = 200;
    this.options.hasTrail = false;
    this.clearSpritePixels();
    let width = 6;
    let x = screen.size.x / 2;
    if (!isFirst && g.game.random.get() < 0.5) {
      width = 10;
      x += g.game.random.get() < 0.5 ? -14 : 14;
    }
    const pat = _.times(width, () => 'x').join('');
    this.addSpritePixels(pag.generate([pat, pat, pat], {
      isMirrorX: true, hue: 0.2
    }));
    this.collision.set(width * 7, 20);
    new g.CollideToActor(this, { velRatio: 0, types: ['enemy', 'wall'] });
    this.pos.set(x, y);
  }

  update() {
    this.vel.y += 1;
    super.update();
  }

  destroy() {
    super.destroy();
    const min = _.minBy(g.game.actorPool.get('enemy'), a => a.pos.y);
    const dr = new Daruma(min.pos.y - 25);
    floor.vel.y -= 0.1;
  }
}

class Floor extends g.Wall {
  update() {
    super.update();
    this.vel.y *= 0.99;
    if (this.pos.y < 120) {
      this.pos.y += (120 - this.pos.y) * 0.1;
      this.vel.y *= 0.5;
    }
    this.vel.y += 0.005 * g.getDifficulty();
    //this.pos.y += 0.1 * g.getDifficulty();
  }
}