import * as _ from 'lodash';
import * as pag from 'pag';
import * as ppe from 'ppe';
import * as gcc from 'gcc';

import { Actor, Text, rotationNum } from './actor';
import Random from './random';
import { Sound, initSound, setSoundSeed } from './sound';
import * as ui from './ui';
import * as text from './text';
import * as debug from './debug';
import * as util from './util';
import * as leaderboard from './leaderboard';
export { Random, Sound, ui, text, debug };
export * from './util';
export * from './actor';
export * from './modules';

declare const require: any;
export const p5 = require('p5');
export let p: p5;

export enum Scene {
  title, started, paused, ended, replay
};

export let scene = Scene.started;
export let games: Game[] = [];
export let game: Game;
const title = 'DARUMATRON';
const titleCont = null;
const titleScale = 3;
const titleHue = 0;
let seedRandom: Random;
let updatingCountPerFrame = 1;
let isDebugEnabled = false;
let onSeedChangedFunc: Function;

export function init(initFunc: Function = null, tempo = 120) {
  leaderboard.init();
  pag.setDefaultOptions({
    isMirrorY: true,
    rotationNum,
    scale: 3
  });
  gcc.setOptions({
    scale: 2,
  });
  limitColors();
  new p5((_p: p5) => {
    p = _p;
    p.setup = () => {
      p.createCanvas(0, 0);
      text.init();
      initSound(tempo);
      seedRandom = new Random();
      if (initFunc != null) {
        initFunc();
      }
      if (isDebugEnabled) {
        beginGames();
      } else {
        titleGames();
      }
    };
    p.draw = update;
  });
}

function limitColors() {
  pag.setDefaultOptions({
    isLimitingColors: true
  });
  ppe.setOptions({
    isLimitingColors: true
  });
}

export function enableDebug(_onSeedChangedFunc = null) {
  onSeedChangedFunc = _onSeedChangedFunc;
  debug.initSeedUi(setGenerationSeeds);
  debug.enableShowingErrors();
  isDebugEnabled = true;
}

export function setUpdatingCountPerFrame(c: number) {
  updatingCountPerFrame = c;
}

export function beginGames(seed: number = null) {
  scene = Scene.started;
  ui.clearJustPressed();
  if (seed == null) {
    seed = seedRandom.getInt(9999999);
  }
  _.forEach(games, g => {
    g.begin(seed);
  });
}

export function pauseGames() {
  scene = Scene.paused;
  _.forEach(games, g => {
    g.pause();
  });
}

export function restartGames() {
  scene = Scene.started;
  _.forEach(games, g => {
    g.restart();
  });
}

export function titleGames() {
  scene = Scene.title;
  _.forEach(games, g => {
    g.title();
  });
}

export function setGenerationSeeds(seed: number) {
  pag.setSeed(seed);
  ppe.setSeed(seed);
  ppe.reset();
  setSoundSeed(seed);
  if (onSeedChangedFunc != null) {
    onSeedChangedFunc();
  }
}

function update() {
  handleScene();
  _.times(updatingCountPerFrame, i => {
    const hasScreen = i >= updatingCountPerFrame - 1;
    _.forEach(games, g => {
      g.hasScreen = hasScreen;
      g.update();
    });
  });
}

function handleScene() {
  if ((scene === Scene.title && ui.isJustPressed)/* ||
(scene === Scene.replay && ui._isPressedInReplay)*/) {
    beginGames();
  }
  if (scene === Scene.started) {
    if (_.every(games, g => g.scene === Scene.ended)) {
      scene = Scene.ended;
      ui.clearJustPressed();
    }
  }
  const ticks = game == null ? 0 : game.ticks;
  if (scene === Scene.ended &&
    (ticks >= 60 || (ticks >= 20 && ui.isJustPressed))) {
    titleGames();
  }
  ui.update();
}

export class Game {
  p: p5;
  actorPool = new ActorPool();
  particlePool: ppe.ParticlePool;
  screen: Screen;
  ticks = 0;
  score = 0;
  scoreMultiplier = 0;
  random: Random;
  modules = [];
  scene = Scene.started;
  initialStatus = { r: 0, s: 0 };
  replayScore: number;
  hasScreen = true;

  constructor(width: number, height: number,
    public beginFunc: Function = null, public updateFunc: Function = null) {
    this.random = new Random();
    new p5((_p: p5) => {
      this.p = _p;
      _p.setup = () => {
        this.screen = new Screen(_p, width, height);
        this.particlePool = new ppe.ParticlePool(this.screen.canvas);
      };
    });
    if (games.length <= 0) {
      game = this;
    }
    games.push(this);
  }

  addScore(v: number = 1, pos: p5.Vector = null) {
    if (this.scene === Scene.started || this.scene === Scene.replay) {
      this.score += v * this.scoreMultiplier;
      if (pos != null) {
        let s = '+';
        if (this.scoreMultiplier <= 1) {
          s += `${v}`;
        } else if (v <= 1) {
          s += `${this.scoreMultiplier}`;
        } else {
          s += `${v}X${this.scoreMultiplier}`;
        }
        const t = new Text(s, 30, null, this);
        t.pos.set(pos);
        t.vel.y = -2;
      }
    }
  }

  addScoreMultiplier(v: number = 1) {
    this.scoreMultiplier += v;
  }

  setScoreMultiplier(v: number = 1) {
    this.scoreMultiplier = v;
  }

  clearModules() {
    this.modules = [];
  }

  _addModule(module, insertIndexFromLast = 0) {
    this.modules.splice(this.modules.length - insertIndexFromLast, 0, module);
  }

  getDifficulty() {
    return util.getDifficulty(this);
  }

  begin(seed: number) {
    this.clearGameStatus();
    this.scene = Scene.started;
    this.random.setSeed(seed);
    if (this.beginFunc != null) {
      this.beginFunc(this);
    }
  }

  end() {
    if (this.scene === Scene.ended || this.scene == Scene.title) {
      return;
    }
    let isReplay = this.scene === Scene.replay;
    this.scene = Scene.ended;
    this.ticks = 0;
    leaderboard.set(this.score);
  }

  pause() {
    this.scene = Scene.paused;
  }

  restart() {
    this.scene = Scene.started;
  }

  title() {
    this.scene = Scene.title;
    this.ticks = 0;
  }

  clearGameStatus() {
    this.clearModules();
    this.actorPool.clear();
    this.particlePool.clear();
    this.ticks = 0;
    this.score = 0;
    this.scoreMultiplier = 1;
  }

  remove() {
    _.remove(games, g => g === this);
    this.p.draw = null;
    this.screen.remove();
  }

  update() {
    if (this.scene === Scene.paused) {
      return;
    }
    if (!this.hasScreen) {
      _.forEach(this.modules, m => {
        if (m.isEnabled) {
          m.update();
        }
      });
      this.actorPool.updateLowerZero();
      this.actorPool.update();
      this.ticks++;
      return;
    }
    this.screen.clear();
    _.forEach(this.modules, m => {
      if (m.isEnabled) {
        m.update();
      }
    });
    this.actorPool.updateLowerZero();
    ppe.update();
    this.actorPool.update();
    if (this.updateFunc != null) {
      this.updateFunc();
    }
    text.draw(`${this.score}`, 1, 1, text.Align.left);
    if (this.scoreMultiplier > 1) {
      text.draw
        (`X${this.scoreMultiplier}`, this.screen.size.x, 1, text.Align.right);
    }
    this.drawSceneText();
    this.ticks++;
    //gcc.capture(this.screen.canvas);
  }

  drawSceneText() {
    switch (this.scene) {
      case Scene.title:
        text.drawScaled
          (title, titleScale,
          this.screen.size.x / 2, 20, titleHue);
        this.drawLeaderboard();
        break;
      case Scene.ended:
        text.draw('GAME OVER', this.screen.size.x / 2, this.screen.size.y * 0.45);
        break;
    }
  }

  leaderboardTypes = ['LAST', 'BEST', 'TOP'];
  rankStrings = ['ST', 'ND', 'RD'];

  drawLeaderboard() {
    const tt = Math.floor(this.ticks / 300) % 3;
    const t = this.ticks % 300;
    if (t === 0) {
      switch (tt) {
        case 0:
          leaderboard.get(true);
          break;
        case 1:
          leaderboard.get(false, true);
          break;
        case 2:
          leaderboard.get();
          break;
      }
    }
    if (leaderboard.scores == null) {
      return;
    }
    text.draw(this.leaderboardTypes[tt], this.screen.size.x / 2, 40);
    _.forEach(leaderboard.scores, (s, i) => {
      const y = 50 + i * 10;
      let fillStyle = '#fff';
      if (s.playerId === leaderboard.playerId) {
        fillStyle = s.rank == null ? '#77f' : '#f77';
        text.draw
          ('YOU', this.screen.size.x * 0.1, y, text.Align.left, fillStyle);
      }
      if (s.rank != null) {
        const rs =
          `${s.rank + 1}${(s.rank < 3) ? this.rankStrings[s.rank] : 'TH'}`;
        text.draw(rs, this.screen.size.x * 0.4, y, text.Align.right, fillStyle);
      }
      text.draw(String(s.score), this.screen.size.x * 0.9, y,
        text.Align.right, fillStyle);
    });
  }

  scroll(x: number, y: number = 0) {
    _.forEach(this.actorPool.actors, a => {
      a.pos.x += x;
      a.pos.x += y;
    });
    _.forEach(this.particlePool.getParticles(), p => {
      p.pos.x += x;
      p.pos.y += y;
    });
  }
}

export class ActorPool {
  actors: Actor[] = [];

  add(actor) {
    this.actors.push(actor);
  }

  clear() {
    this.actors = [];
  }

  updateLowerZero() {
    this.actors = _.sortBy(this.actors, 'priority');
    this.updateSorted(true);
  }

  update() {
    this.updateSorted();
  }

  updateSorted(isLowerZero = false) {
    for (let i = 0; i < this.actors.length;) {
      const a = this.actors[i];
      if (isLowerZero && a.priority >= 0) {
        return;
      }
      if (!isLowerZero && a.priority < 0) {
        i++;
        continue;
      }
      if (a.isAlive !== false) {
        a.update();
      }
      if (a.isAlive === false) {
        this.actors.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  get(type: string = null) {
    return type == null ? this.actors :
      _.filter<Actor>(this.actors, a => a.type === type);
  }

  getByModuleName(moduleName: string) {
    return _.filter<Actor>(this.actors, a => _.indexOf(a.moduleNames, moduleName) >= 0);
  }

  getByCollisionType(collisionType: string) {
    return _.filter<Actor>(this.actors, a => a.collisionType == collisionType);
  }
}

export class Screen {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  size: p5.Vector;

  constructor(public p: p5,
    width: number, height: number) {
    this.size = p.createVector(width, height);
    const pCanvas = this.p.createCanvas(width, height);
    this.canvas = pCanvas.canvas;
    this.context = this.canvas.getContext('2d');
    this.p.noStroke();
    this.p.noSmooth();
    ui.init(this.canvas, this.size);
  }

  clear() {
    this.p.background('black');
  }

  remove() {
    document.body.removeChild(this.canvas);
  }
}
