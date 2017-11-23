import * as _ from 'lodash';
import * as pag from 'pag';
import * as ppe from 'ppe';
import * as g from './g/index';
import { beginGames } from './g/index';

let screen: g.Screen;
let context: CanvasRenderingContext2D;

window.onload = () => {
  //initDb();
  g.init(() => {
    g.ui.useStickKeyAsButton();
    const game = new g.Game(160, 160, begin, update);
    const canvas = game.screen.canvas;
    screen = game.screen;
    context = screen.context;
    canvas.setAttribute('style', null);
    canvas.setAttribute('id', 'main');
    ppe.options.canvas = canvas;
    createSounds();
    g.enableDebug(() => {
      bgmSound.stop();
      createSounds();
    });
  }, 110);
};

function initDb() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const playerId = 1;
  const name = 'foo';
  let score = Math.floor(Math.random() * 120 + 900);
  return window.fetch('/api/currentScore', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      playerId,
      name,
      score
    })
  }).
    then(() => {
      score += Math.floor(Math.random() * 100);
      return window.fetch('/api/score', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          playerId,
          name,
          score
        })
      })
    }).
    then(() => {
      setTimeout(() => {
        window.fetch('/api/currentScore').
          then(result => result.json()).
          then(json => {
            console.log(json);
          });
      }, 20 * 1000);
      return window.fetch('/api/currentScore?count=10&score=500');
    }).
    then(result => result.json()).
    then(json => {
      console.log(json);
    });
}

let startSound: g.Sound;
let bgmSound: g.Sound;
let shotSound: g.Sound;
let itemSound: g.Sound;
let endSound: g.Sound;

function createSounds() {
  startSound = new g.Sound(false, false, 4, 1, 65);
  startSound.createPartsBase()
  startSound.createPart();
  startSound.createPart(-1, 1);
  startSound.createPartsBase(0, 0, 1);
  startSound.createPart(-3, 0, 2);
  startSound.createPartsBase(0.25, 0, 1);
  startSound.createPart(-4);
  bgmSound = new g.Sound(false, true, 16, 1, 50, -8);
  bgmSound.createPartsBase(0.25, 0, 1);
  bgmSound.createPart();
  bgmSound.createPart(-2);
  shotSound = createSe(50, 1, -8);
  itemSound = createSe(70, 3, -3);
  endSound = createSe(60, 8);
}

function createSe(bn, cl, vl = 0) {
  const se = new g.Sound(true, false, cl, 8, bn, vl);
  se.createPartsBase();
  se.createPart();
  se.createPart(-2, 2);
  se.createPartsBase();
  se.createPart(-4, 4);
  return se;
}

let player, floor;

function begin() {
  player = new Player();
  player.pos.set(screen.size.x * 0.25, screen.size.y * 0.75);
  player.angle = -g.p.HALF_PI;
  _.times(7, i => {
    const dr = new Daruma(true);
  });
  floor = new Floor
    (g.p.createVector(screen.size.x / 2, screen.size.y - 20), 100, 10);
  floor.priority = -1;
  startSound.play();
}

function update() {
  if (g.game.ticks % 17 === 0) {
    g.game.addScoreMultiplier(-Math.floor(1 + g.game.scoreMultiplier * 0.05));
    if (g.game.scoreMultiplier < 1) {
      g.game.setScoreMultiplier(1);
    }
  }
  if (g.game.scene === g.Scene.title && g.game.random.get() < 0.02) {
    new Daruma()
  }
  if (g.game.scene === g.Scene.started && g.game.ticks === 120) {
    bgmSound.play();
  }
}

class Player extends g.Player {
  constructor() {
    super();
    this.collision.set(20, 20);
  }

  update() {
    super.update();
    this.options.hasTrail = false;
    if (g.ui.isJustPressed && g.ui.stickAngle > 0) {
      shotSound.play();
      let a;
      if (g.ui.stickAngle > 4) {
        this.pos.x = screen.size.x / 4;
        a = 0;
      } else {
        this.pos.x = screen.size.x / 4 * 3;
        a = g.p.PI;
      }
      const s = new g.Shot(this, 10, a);
      s.collision.set(3, 3);
    }
    this.pos.y = floor.pos.y - 15;
    if (this.pos.y > 152) {
      this.destroy();
    }
  }

  destroy() {
    endSound.play('@0:0:1');
    bgmSound.stop();
    super.destroy();
    floor.destroy();
    g.game.setScoreMultiplier(1);
  }
}

class Daruma extends g.Enemy {
  item: g.Item;
  colors = [[0, 0.7], [0.2, 0.7], [0.2, 0.2], [0.3, 0.7], [0.6, 0.7]];

  constructor(isFirst = false) {
    super();
    this.getModule('RemoveWhenInAndOut').paddingOuter = 999;
    this.options.hasTrail = false;
    this.clearSpritePixels();
    const min = _.minBy(this.game.actorPool.get('enemy'), a => a.pos.y);
    const y = min == null ? -25 : min.pos.y - 25;
    let width = 6;
    let x = screen.size.x / 2;
    const random = this.game.random;
    if (!isFirst && random.get() < 0.5) {
      width = 10;
      x += random.get() < 0.5 ? -14 : 14;
    }
    if (!isFirst && random.get() < 0.3) {
      let ix: number;
      if (x === screen.size.x / 2) {
        ix = random.get() < 0.5 ? screen.size.x / 4 : screen.size.x / 4 * 3;
      } else if (x < screen.size.x / 2) {
        ix = screen.size.x / 4 * 3;
      } else {
        ix = screen.size.x / 4;
      }
      this.item = new Item(g.p.createVector(ix, y));
    }
    const pat = _.times(width, () => 'x').join('');
    this.collision.set(width * 7, 20);
    const color = random.select(this.colors);
    this.addSpritePixels(pag.generate([pat, pat, pat], {
      isMirrorX: true, hue: color[0], saturation: color[1]
    }));
    this.pos.set(x, y);
    new g.CollideToActor(this, { velRatio: 0, types: ['enemy', 'wall'] });
  }

  update() {
    this.vel.y += 1;
    super.update();
    if (this.item != null) {
      this.item.pos.y = this.pos.y;
    }
  }

  destroy() {
    super.destroy();
    new Daruma();
    floor.vel.y -= 0.1;
    if (this.item != null && this.item.isAlive) {
      g.game.setScoreMultiplier(1);
      this.item.remove();
    }
    g.game.addScore(1, this.pos);
  }
}

class Item extends g.Item {
  constructor(pos: p5.Vector) {
    super(pos);
    this.options.hasTrail = false;
  }

  destroy() {
    itemSound.play();
    super.destroy();
    if (g.game.scoreMultiplier < 100) {
      g.game.addScoreMultiplier(10);
    }
    if (g.game.scoreMultiplier > 100) {
      g.game.setScoreMultiplier(100);
    }
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
    this.vel.y += 0.0075 * g.getDifficulty();
  }
}
