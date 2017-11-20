import * as _ from 'lodash';
import * as pag from 'pag';
import * as ppe from 'ppe';

import { Actor, Text, rotationNum } from './actor';
import Random from './random';
import * as ui from './ui';
import * as text from './text';
import * as debug from './debug';
import * as util from './util';
export { Random, ui, text, debug };
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
let seedRandom: Random;
let updatingCountPerFrame = 1;
let isDebugEnabled = false;

export function init() {
  pag.setDefaultOptions({
    isMirrorY: true,
    rotationNum,
    scale: 3
  });
  //limitColors();
  new p5((_p: p5) => {
    p = _p;
    p.setup = () => {
      p.createCanvas(0, 0);
      text.init();
      seedRandom = new Random();
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
  //onSeedChangedFunc = _onSeedChangedFunc;
  debug.initSeedUi(this.setSeeds);
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
  setSeeds(seed);
  _.forEach(games, g => {
    g.begin(seed);
  });
}

export function endGames() {
  scene = Scene.ended;
  ui.clearJustPressed();
  _.forEach(games, g => {
    g.end();
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

export function replayGames() {
  scene = Scene.replay;
  ui.clearJustPressed();
  /*if (options.isReplayEnabled) {
  const status = ir.startReplay();
  if (status !== false) {
    _.forEach(games, g => {
      g.replay(status);
    });
  }
  }*/
}

function setSeeds(seed: number) {
  pag.setSeed(seed);
  ppe.setSeed(seed);
  ppe.reset();
}

function update() {
  if (scene === Scene.replay) {
    /*const events = ir.getEvents();
    if (events !== false) {
      ui.updateInReplay(events);
    } else {
      replayGames();
    }*/
  } else {
    ui.update();
    //ir.recordEvents(ui.getReplayEvents());
  }
  _.times(updatingCountPerFrame, i => {
    const hasScreen = i >= updatingCountPerFrame - 1;
    _.forEach(games, g => {
      g.hasScreen = hasScreen;
      g.update();
    });
    //updateFunc();
  });
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
    public initFunc: Function = null, public updateFunc: Function = null) {
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
    this.random.setSeed(seed);
    if (this.initFunc != null) {
      this.initFunc(this);
    }
  }

  end() {
    if (this.scene === Scene.ended || this.scene == Scene.title) {
      return;
    }
    let isReplay = this.scene === Scene.replay;
    this.scene = Scene.ended;
    this.ticks = 0;
    //sss.stopBgm();
    /*if (!isReplay && options.isReplayEnabled) {
      initialStatus.s = score;
      ir.recordInitialStatus(initialStatus);
      ir.saveAsUrl();
    }*/
  }

  pause() {
    this.scene = Scene.paused;
  }

  restart() {
    this.scene = Scene.started;
  }

  replay(status) {
    /*this.clearGameStatus();
    this.scene = Scene.replay;
    this.random.setSeed(status.r);
    this.replayScore = status.s;
    initGameFunc();*/
  }

  clearGameStatus() {
    this.clearModules();
    this.actorPool.clear();
    this.particlePool.clear();
    this.ticks = 0;
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
    text.draw(`${this.score}`, 1, 1, text.Align.left, this);
    this.ticks++;
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
    _.sortBy(this.actors, 'priority');
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

  getReplayStatus() {
    let status = [];
    /*_.forEach(this.actors, (a: Actor) => {
      let array = a.getReplayStatus();
      if (array != null) {
        status.push([a.type, array]);
      }
    });*/
    return status;
  }

  setReplayStatus(status: any[], actorGeneratorFunc) {
    _.forEach(status, s => {
      actorGeneratorFunc(s[0], s[1]);
    });
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
    this.p.background(0);
  }

  remove() {
    document.body.removeChild(this.canvas);
  }
}
