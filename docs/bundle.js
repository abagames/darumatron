/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var pag = __webpack_require__(2);
var ppe = __webpack_require__(3);
var gcc = __webpack_require__(8);
var actor_1 = __webpack_require__(4);
var random_1 = __webpack_require__(9);
exports.Random = random_1.default;
var sound_1 = __webpack_require__(5);
exports.Sound = sound_1.Sound;
var ui = __webpack_require__(11);
exports.ui = ui;
var text = __webpack_require__(12);
exports.text = text;
var debug = __webpack_require__(13);
exports.debug = debug;
var util = __webpack_require__(6);
var leaderboard = __webpack_require__(14);
__export(__webpack_require__(6));
__export(__webpack_require__(4));
__export(__webpack_require__(16));
exports.p5 = __webpack_require__(17);
var Scene;
(function (Scene) {
    Scene[Scene["title"] = 0] = "title";
    Scene[Scene["started"] = 1] = "started";
    Scene[Scene["paused"] = 2] = "paused";
    Scene[Scene["ended"] = 3] = "ended";
    Scene[Scene["replay"] = 4] = "replay";
})(Scene = exports.Scene || (exports.Scene = {}));
;
exports.scene = Scene.started;
exports.games = [];
var title = 'DARUMATRON';
var titleCont = null;
var titleScale = 3;
var titleHue = 0;
var seedRandom;
var updatingCountPerFrame = 1;
var isDebugEnabled = false;
var onSeedChangedFunc;
function init(initFunc, tempo) {
    if (initFunc === void 0) { initFunc = null; }
    if (tempo === void 0) { tempo = 120; }
    leaderboard.init();
    pag.setDefaultOptions({
        isMirrorY: true,
        rotationNum: actor_1.rotationNum,
        scale: 3
    });
    gcc.setOptions({
        scale: 2,
    });
    limitColors();
    new exports.p5(function (_p) {
        exports.p = _p;
        exports.p.setup = function () {
            exports.p.createCanvas(0, 0);
            text.init();
            sound_1.initSound(tempo);
            seedRandom = new random_1.default();
            if (initFunc != null) {
                initFunc();
            }
            if (isDebugEnabled) {
                beginGames();
            }
            else {
                titleGames();
            }
        };
        exports.p.draw = update;
    });
}
exports.init = init;
function limitColors() {
    pag.setDefaultOptions({
        isLimitingColors: true
    });
    ppe.setOptions({
        isLimitingColors: true
    });
}
function enableDebug(_onSeedChangedFunc) {
    if (_onSeedChangedFunc === void 0) { _onSeedChangedFunc = null; }
    onSeedChangedFunc = _onSeedChangedFunc;
    debug.initSeedUi(setGenerationSeeds);
    debug.enableShowingErrors();
    isDebugEnabled = true;
}
exports.enableDebug = enableDebug;
function setUpdatingCountPerFrame(c) {
    updatingCountPerFrame = c;
}
exports.setUpdatingCountPerFrame = setUpdatingCountPerFrame;
function beginGames(seed) {
    if (seed === void 0) { seed = null; }
    exports.scene = Scene.started;
    ui.clearJustPressed();
    if (seed == null) {
        seed = seedRandom.getInt(9999999);
    }
    _.forEach(exports.games, function (g) {
        g.begin(seed);
    });
}
exports.beginGames = beginGames;
function pauseGames() {
    exports.scene = Scene.paused;
    _.forEach(exports.games, function (g) {
        g.pause();
    });
}
exports.pauseGames = pauseGames;
function restartGames() {
    exports.scene = Scene.started;
    _.forEach(exports.games, function (g) {
        g.restart();
    });
}
exports.restartGames = restartGames;
function titleGames() {
    exports.scene = Scene.title;
    _.forEach(exports.games, function (g) {
        g.title();
    });
}
exports.titleGames = titleGames;
function setGenerationSeeds(seed) {
    pag.setSeed(seed);
    ppe.setSeed(seed);
    ppe.reset();
    sound_1.setSoundSeed(seed);
    if (onSeedChangedFunc != null) {
        onSeedChangedFunc();
    }
}
exports.setGenerationSeeds = setGenerationSeeds;
function update() {
    handleScene();
    _.times(updatingCountPerFrame, function (i) {
        var hasScreen = i >= updatingCountPerFrame - 1;
        _.forEach(exports.games, function (g) {
            g.hasScreen = hasScreen;
            g.update();
        });
    });
}
function handleScene() {
    if ((exports.scene === Scene.title && ui.isJustPressed) /* ||
  (scene === Scene.replay && ui._isPressedInReplay)*/) {
        beginGames();
    }
    if (exports.scene === Scene.started) {
        if (_.every(exports.games, function (g) { return g.scene === Scene.ended; })) {
            exports.scene = Scene.ended;
            ui.clearJustPressed();
        }
    }
    var ticks = exports.game == null ? 0 : exports.game.ticks;
    if (exports.scene === Scene.ended &&
        (ticks >= 60 || (ticks >= 20 && ui.isJustPressed))) {
        titleGames();
    }
    ui.update();
}
var Game = /** @class */ (function () {
    function Game(width, height, beginFunc, updateFunc) {
        if (beginFunc === void 0) { beginFunc = null; }
        if (updateFunc === void 0) { updateFunc = null; }
        var _this = this;
        this.beginFunc = beginFunc;
        this.updateFunc = updateFunc;
        this.actorPool = new ActorPool();
        this.ticks = 0;
        this.score = 0;
        this.scoreMultiplier = 0;
        this.modules = [];
        this.scene = Scene.started;
        this.initialStatus = { r: 0, s: 0 };
        this.hasScreen = true;
        this.leaderboardTypes = ['LAST', 'BEST', 'TOP'];
        this.rankStrings = ['ST', 'ND', 'RD'];
        this.random = new random_1.default();
        new exports.p5(function (_p) {
            _this.p = _p;
            _p.setup = function () {
                _this.screen = new Screen(_p, width, height);
                _this.particlePool = new ppe.ParticlePool(_this.screen.canvas);
            };
        });
        if (exports.games.length <= 0) {
            exports.game = this;
        }
        exports.games.push(this);
    }
    Game.prototype.addScore = function (v, pos) {
        if (v === void 0) { v = 1; }
        if (pos === void 0) { pos = null; }
        if (this.scene === Scene.started || this.scene === Scene.replay) {
            this.score += v * this.scoreMultiplier;
            if (pos != null) {
                var s = '+';
                if (this.scoreMultiplier <= 1) {
                    s += "" + v;
                }
                else if (v <= 1) {
                    s += "" + this.scoreMultiplier;
                }
                else {
                    s += v + "X" + this.scoreMultiplier;
                }
                var t = new actor_1.Text(s, 30, null, this);
                t.pos.set(pos);
                t.vel.y = -2;
            }
        }
    };
    Game.prototype.addScoreMultiplier = function (v) {
        if (v === void 0) { v = 1; }
        this.scoreMultiplier += v;
    };
    Game.prototype.setScoreMultiplier = function (v) {
        if (v === void 0) { v = 1; }
        this.scoreMultiplier = v;
    };
    Game.prototype.clearModules = function () {
        this.modules = [];
    };
    Game.prototype._addModule = function (module, insertIndexFromLast) {
        if (insertIndexFromLast === void 0) { insertIndexFromLast = 0; }
        this.modules.splice(this.modules.length - insertIndexFromLast, 0, module);
    };
    Game.prototype.getDifficulty = function () {
        return util.getDifficulty(this);
    };
    Game.prototype.begin = function (seed) {
        this.clearGameStatus();
        this.scene = Scene.started;
        this.random.setSeed(seed);
        if (this.beginFunc != null) {
            this.beginFunc(this);
        }
    };
    Game.prototype.end = function () {
        if (this.scene === Scene.ended || this.scene == Scene.title) {
            return;
        }
        var isReplay = this.scene === Scene.replay;
        this.scene = Scene.ended;
        this.ticks = 0;
        leaderboard.set(this.score);
    };
    Game.prototype.pause = function () {
        this.scene = Scene.paused;
    };
    Game.prototype.restart = function () {
        this.scene = Scene.started;
    };
    Game.prototype.title = function () {
        this.scene = Scene.title;
        this.ticks = 0;
    };
    Game.prototype.clearGameStatus = function () {
        this.clearModules();
        this.actorPool.clear();
        this.particlePool.clear();
        this.ticks = 0;
        this.score = 0;
        this.scoreMultiplier = 1;
    };
    Game.prototype.remove = function () {
        var _this = this;
        _.remove(exports.games, function (g) { return g === _this; });
        this.p.draw = null;
        this.screen.remove();
    };
    Game.prototype.update = function () {
        if (this.scene === Scene.paused) {
            return;
        }
        if (!this.hasScreen) {
            _.forEach(this.modules, function (m) {
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
        _.forEach(this.modules, function (m) {
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
        text.draw("" + this.score, 1, 1, text.Align.left);
        if (this.scoreMultiplier > 1) {
            text.draw("X" + this.scoreMultiplier, this.screen.size.x, 1, text.Align.right);
        }
        this.drawSceneText();
        this.ticks++;
        //gcc.capture(this.screen.canvas);
    };
    Game.prototype.drawSceneText = function () {
        switch (this.scene) {
            case Scene.title:
                text.drawScaled(title, titleScale, this.screen.size.x / 2, 20, titleHue);
                this.drawLeaderboard();
                break;
            case Scene.ended:
                text.draw('GAME OVER', this.screen.size.x / 2, this.screen.size.y * 0.45);
                break;
        }
    };
    Game.prototype.drawLeaderboard = function () {
        var _this = this;
        var tt = Math.floor(this.ticks / 300) % 3;
        var t = this.ticks % 300;
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
        _.forEach(leaderboard.scores, function (s, i) {
            var y = 50 + i * 10;
            var fillStyle = '#fff';
            if (s.playerId === leaderboard.playerId) {
                fillStyle = s.rank == null ? '#77f' : '#f77';
                text.draw('YOU', _this.screen.size.x * 0.1, y, text.Align.left, fillStyle);
            }
            if (s.rank != null) {
                var rs = "" + (s.rank + 1) + ((s.rank < 3) ? _this.rankStrings[s.rank] : 'TH');
                text.draw(rs, _this.screen.size.x * 0.4, y, text.Align.right, fillStyle);
            }
            text.draw(String(s.score), _this.screen.size.x * 0.9, y, text.Align.right, fillStyle);
        });
    };
    Game.prototype.scroll = function (x, y) {
        if (y === void 0) { y = 0; }
        _.forEach(this.actorPool.actors, function (a) {
            a.pos.x += x;
            a.pos.x += y;
        });
        _.forEach(this.particlePool.getParticles(), function (p) {
            p.pos.x += x;
            p.pos.y += y;
        });
    };
    return Game;
}());
exports.Game = Game;
var ActorPool = /** @class */ (function () {
    function ActorPool() {
        this.actors = [];
    }
    ActorPool.prototype.add = function (actor) {
        this.actors.push(actor);
    };
    ActorPool.prototype.clear = function () {
        this.actors = [];
    };
    ActorPool.prototype.updateLowerZero = function () {
        this.actors = _.sortBy(this.actors, 'priority');
        this.updateSorted(true);
    };
    ActorPool.prototype.update = function () {
        this.updateSorted();
    };
    ActorPool.prototype.updateSorted = function (isLowerZero) {
        if (isLowerZero === void 0) { isLowerZero = false; }
        for (var i = 0; i < this.actors.length;) {
            var a = this.actors[i];
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
            }
            else {
                i++;
            }
        }
    };
    ActorPool.prototype.get = function (type) {
        if (type === void 0) { type = null; }
        return type == null ? this.actors :
            _.filter(this.actors, function (a) { return a.type === type; });
    };
    ActorPool.prototype.getByModuleName = function (moduleName) {
        return _.filter(this.actors, function (a) { return _.indexOf(a.moduleNames, moduleName) >= 0; });
    };
    ActorPool.prototype.getByCollisionType = function (collisionType) {
        return _.filter(this.actors, function (a) { return a.collisionType == collisionType; });
    };
    return ActorPool;
}());
exports.ActorPool = ActorPool;
var Screen = /** @class */ (function () {
    function Screen(p, width, height) {
        this.p = p;
        this.size = p.createVector(width, height);
        var pCanvas = this.p.createCanvas(width, height);
        this.canvas = pCanvas.canvas;
        this.context = this.canvas.getContext('2d');
        this.p.noStroke();
        this.p.noSmooth();
        ui.init(this.canvas, this.size);
    }
    Screen.prototype.clear = function () {
        this.p.background('black');
    };
    Screen.prototype.remove = function () {
        document.body.removeChild(this.canvas);
    };
    return Screen;
}());
exports.Screen = Screen;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pag"] = factory();
	else
		root["pag"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.defaultOptions = {
	    isMirrorX: false,
	    isMirrorY: false,
	    seed: 0,
	    hue: null,
	    saturation: 0.8,
	    value: 1,
	    rotationNum: 1,
	    scale: 1,
	    scaleX: null,
	    scaleY: null,
	    colorNoise: 0.1,
	    colorLighting: 1,
	    edgeDarkness: 0.4,
	    isShowingEdge: true,
	    isShowingBody: true,
	    isLimitingColors: false,
	};
	var generatedPixels = {};
	var seed = 0;
	function generate(patterns, _options) {
	    if (_options === void 0) { _options = {}; }
	    _options.baseSeed = seed;
	    var jso = JSON.stringify({ patterns: patterns, options: _options });
	    if (generatedPixels[jso]) {
	        return generatedPixels[jso];
	    }
	    var options = {};
	    forOwn(exports.defaultOptions, function (v, k) {
	        options[k] = v;
	    });
	    forOwn(_options, function (v, k) {
	        options[k] = v;
	    });
	    var random = new Random();
	    var rndSeed = seed + getHashFromString(patterns.join());
	    if (options.seed != null) {
	        rndSeed += options.seed;
	    }
	    random.setSeed(rndSeed);
	    if (options.hue == null) {
	        options.hue = random.get01();
	    }
	    if (options.scaleX == null) {
	        options.scaleX = options.scale;
	    }
	    if (options.scaleY == null) {
	        options.scaleY = options.scale;
	    }
	    var pixels = generatePixels(patterns, options, random);
	    var result;
	    if (options.rotationNum > 1) {
	        result = map(createRotated(pixels, options.rotationNum), function (p) {
	            return createColored(p, options);
	        });
	    }
	    else {
	        result = [createColored(pixels, options)];
	    }
	    generatedPixels[jso] = result;
	    return result;
	}
	exports.generate = generate;
	function generateImages(patterns, _options) {
	    if (_options === void 0) { _options = {}; }
	    var pixels = generate(patterns, _options);
	    var width = pixels[0].length;
	    var height = pixels[0][0].length;
	    var canvas = document.createElement('canvas');
	    canvas.width = width;
	    canvas.height = height;
	    var context = canvas.getContext('2d');
	    var images = [];
	    for (var i = 0; i < pixels.length; i++) {
	        context.clearRect(0, 0, width, height);
	        draw(context, pixels, width / 2, height / 2, i);
	        var image = new Image();
	        image.src = canvas.toDataURL();
	        images.push(image);
	    }
	    return images;
	}
	exports.generateImages = generateImages;
	function setSeed(_seed) {
	    if (_seed === void 0) { _seed = 0; }
	    seed = _seed;
	}
	exports.setSeed = setSeed;
	function setDefaultOptions(_defaultOptions) {
	    forOwn(_defaultOptions, function (v, k) {
	        exports.defaultOptions[k] = v;
	    });
	}
	exports.setDefaultOptions = setDefaultOptions;
	var Pixel = (function () {
	    function Pixel() {
	        this.r = 0;
	        this.g = 0;
	        this.b = 0;
	        this.isEmpty = true;
	    }
	    Pixel.prototype.setFromHsv = function (hue, saturation, value, isLimitingColors) {
	        if (isLimitingColors === void 0) { isLimitingColors = false; }
	        this.isEmpty = false;
	        this.r = value;
	        this.g = value;
	        this.b = value;
	        var h = hue * 6;
	        var i = Math.floor(h);
	        var f = h - i;
	        switch (i) {
	            case 0:
	                this.g *= 1 - saturation * (1 - f);
	                this.b *= 1 - saturation;
	                break;
	            case 1:
	                this.b *= 1 - saturation;
	                this.r *= 1 - saturation * f;
	                break;
	            case 2:
	                this.b *= 1 - saturation * (1 - f);
	                this.r *= 1 - saturation;
	                break;
	            case 3:
	                this.r *= 1 - saturation;
	                this.g *= 1 - saturation * f;
	                break;
	            case 4:
	                this.r *= 1 - saturation * (1 - f);
	                this.g *= 1 - saturation;
	                break;
	            case 5:
	                this.g *= 1 - saturation;
	                this.b *= 1 - saturation * f;
	                break;
	        }
	        if (isLimitingColors === true) {
	            this.r = this.limitColor(this.r);
	            this.g = this.limitColor(this.g);
	            this.b = this.limitColor(this.b);
	        }
	        this.setStyle();
	    };
	    Pixel.prototype.setStyle = function () {
	        var r = Math.floor(this.r * 255);
	        var g = Math.floor(this.g * 255);
	        var b = Math.floor(this.b * 255);
	        this.style = "rgb(" + r + "," + g + "," + b + ")";
	    };
	    Pixel.prototype.limitColor = function (v) {
	        return v < 0.25 ? 0 : v < 0.75 ? 0.5 : 1;
	    };
	    return Pixel;
	}());
	exports.Pixel = Pixel;
	function draw(context, pixels, x, y, rotationIndex) {
	    if (rotationIndex === void 0) { rotationIndex = 0; }
	    var pxs = pixels[rotationIndex];
	    var pw = pxs.length;
	    var ph = pxs[0].length;
	    var sbx = Math.floor(x - pw / 2);
	    var sby = Math.floor(y - ph / 2);
	    for (var y_1 = 0, sy = sby; y_1 < ph; y_1++, sy++) {
	        for (var x_1 = 0, sx = sbx; x_1 < pw; x_1++, sx++) {
	            var px = pxs[x_1][y_1];
	            if (!px.isEmpty) {
	                context.fillStyle = px.style;
	                context.fillRect(sx, sy, 1, 1);
	            }
	        }
	    }
	}
	exports.draw = draw;
	function drawImage(context, images, x, y, rotationIndex) {
	    if (rotationIndex === void 0) { rotationIndex = 0; }
	    var img = images[rotationIndex];
	    context.drawImage(img, Math.floor(x - img.width / 2), Math.floor(y - img.height / 2));
	}
	exports.drawImage = drawImage;
	function generatePixels(patterns, options, random) {
	    var pw = reduce(patterns, function (w, p) { return Math.max(w, p.length); }, 0);
	    var ph = patterns.length;
	    var w = Math.round(pw * options.scaleX);
	    var h = Math.round(ph * options.scaleY);
	    w += options.isMirrorX ? 1 : 2;
	    h += options.isMirrorY ? 1 : 2;
	    var pixels = createPixels(patterns, pw, ph, w, h, options.scaleX, options.scaleY, random);
	    if (options.isMirrorX) {
	        pixels = mirrorX(pixels, w, h);
	        w *= 2;
	    }
	    if (options.isMirrorY) {
	        pixels = mirrorY(pixels, w, h);
	        h *= 2;
	    }
	    pixels = createEdge(pixels, w, h);
	    return pixels;
	}
	function createPixels(patterns, pw, ph, w, h, scaleX, scaleY, random) {
	    return timesMap(w, function (x) {
	        var px = Math.floor((x - 1) / scaleX);
	        return timesMap(h, function (y) {
	            var py = Math.floor((y - 1) / scaleY);
	            if (px < 0 || px >= pw || py < 0 || py >= ph) {
	                return 0;
	            }
	            var c = px < patterns[py].length ? patterns[py][px] : ' ';
	            var m = 0;
	            if (c === '-') {
	                m = random.get01() < 0.5 ? 1 : 0;
	            }
	            else if (c === 'x' || c === 'X') {
	                m = random.get01() < 0.5 ? 1 : -1;
	            }
	            else if (c === 'o' || c === 'O') {
	                m = -1;
	            }
	            else if (c === '*') {
	                m = 1;
	            }
	            return m;
	        });
	    });
	}
	function mirrorX(pixels, w, h) {
	    return timesMap(w * 2, function (x) { return timesMap(h, function (y) {
	        return x < w ? pixels[x][y] : pixels[w * 2 - x - 1][y];
	    }); });
	}
	function mirrorY(pixels, w, h) {
	    return timesMap(w, function (x) { return timesMap(h * 2, function (y) {
	        return y < h ? pixels[x][y] : pixels[x][h * 2 - y - 1];
	    }); });
	}
	function createEdge(pixels, w, h) {
	    return timesMap(w, function (x) { return timesMap(h, function (y) {
	        return ((pixels[x][y] === 0 &&
	            ((x - 1 >= 0 && pixels[x - 1][y] > 0) ||
	                (x + 1 < w && pixels[x + 1][y] > 0) ||
	                (y - 1 >= 0 && pixels[x][y - 1] > 0) ||
	                (y + 1 < h && pixels[x][y + 1] > 0))) ?
	            -1 : pixels[x][y]);
	    }); });
	}
	function createRotated(pixels, rotationNum) {
	    var pw = pixels.length;
	    var ph = pixels[0].length;
	    var pcx = pw / 2;
	    var pcy = ph / 2;
	    var s = Math.max(pw, ph);
	    var w = Math.round(s * 1.5 / 2) * 2;
	    var h = Math.round(s * 1.5 / 2) * 2;
	    var cx = w / 2;
	    var cy = h / 2;
	    var offset = { x: 0, y: 0 };
	    return timesMap(rotationNum, function (ai) {
	        var angle = -ai * Math.PI * 2 / rotationNum;
	        return timesMap(w, function (x) { return timesMap(h, function (y) {
	            offset.x = x - cx;
	            offset.y = y - cy;
	            rotateVector(offset, angle);
	            var px = Math.round(offset.x + pcx);
	            var py = Math.round(offset.y + pcy);
	            return (px < 0 || px >= pw || py < 0 || py >= ph) ?
	                0 : pixels[px][py];
	        }); });
	    });
	}
	function rotateVector(v, angle) {
	    var vx = v.x;
	    v.x = Math.cos(angle) * vx - Math.sin(angle) * v.y;
	    v.y = Math.sin(angle) * vx + Math.cos(angle) * v.y;
	}
	function createColored(pixels, options) {
	    var w = pixels.length;
	    var h = pixels[0].length;
	    var lightingStartY = 0;
	    var hasPixel = false;
	    for (var y = 0; y < h / 2; y++) {
	        for (var x = 0; x < w; x++) {
	            if (pixels[x][y] !== 0 || pixels[x][h - 1 - y] !== 0) {
	                hasPixel = true;
	                break;
	            }
	        }
	        if (hasPixel) {
	            break;
	        }
	        lightingStartY++;
	    }
	    var lightingHeight = h - lightingStartY * 2;
	    if (lightingHeight <= 0) {
	        lightingHeight = 1;
	    }
	    var random = new Random();
	    random.setSeed(options.seed);
	    return timesMap(w, function (x) { return timesMap(h, function (y) {
	        var p = pixels[x][y];
	        if ((p === 1 && !options.isShowingBody) ||
	            (p === -1 && !options.isShowingEdge)) {
	            return new Pixel();
	        }
	        if (p !== 0) {
	            var l = Math.sin((y - lightingStartY) / lightingHeight * Math.PI) *
	                options.colorLighting + (1 - options.colorLighting);
	            var v = (l * (1 - options.colorNoise) +
	                random.get01() * options.colorNoise) * options.value;
	            v = v >= 0 ? (v <= 1 ? v : 1) : 0;
	            if (p === -1) {
	                v *= (1 - options.edgeDarkness);
	            }
	            var px = new Pixel();
	            px.setFromHsv(options.hue, options.saturation, v, options.isLimitingColors);
	            return px;
	        }
	        else {
	            return new Pixel();
	        }
	    }); });
	}
	function getHashFromString(str) {
	    var hash = 0;
	    var len = str.length;
	    for (var i = 0; i < len; i++) {
	        var chr = str.charCodeAt(i);
	        hash = ((hash << 5) - hash) + chr;
	        hash |= 0;
	    }
	    return hash;
	}
	function nArray(n, v) {
	    var a = [];
	    for (var i = 0; i < n; i++) {
	        a.push(v);
	    }
	    return a;
	}
	function times(n, func) {
	    for (var i = 0; i < n; i++) {
	        func(i);
	    }
	}
	function timesMap(n, func) {
	    var result = [];
	    for (var i = 0; i < n; i++) {
	        result.push(func(i));
	    }
	    return result;
	}
	function forEach(array, func) {
	    for (var i = 0; i < array.length; i++) {
	        func(array[i]);
	    }
	}
	function forOwn(obj, func) {
	    for (var p in obj) {
	        func(obj[p], p);
	    }
	}
	function map(array, func) {
	    var result = [];
	    for (var i = 0; i < array.length; i++) {
	        result.push(func(array[i], i));
	    }
	    return result;
	}
	function reduce(array, func, initValue) {
	    var result = initValue;
	    for (var i = 0; i < array.length; i++) {
	        result = func(result, array[i], i);
	    }
	    return result;
	}
	var Random = (function () {
	    function Random() {
	        this.setSeed();
	        this.get01 = this.get01.bind(this);
	    }
	    Random.prototype.setSeed = function (v) {
	        if (v === void 0) { v = -0x7fffffff; }
	        if (v === -0x7fffffff) {
	            v = Math.floor(Math.random() * 0x7fffffff);
	        }
	        this.x = v = 1812433253 * (v ^ (v >> 30));
	        this.y = v = 1812433253 * (v ^ (v >> 30)) + 1;
	        this.z = v = 1812433253 * (v ^ (v >> 30)) + 2;
	        this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
	        return this;
	    };
	    Random.prototype.getInt = function () {
	        var t = this.x ^ (this.x << 11);
	        this.x = this.y;
	        this.y = this.z;
	        this.z = this.w;
	        this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
	        return this.w;
	    };
	    Random.prototype.get01 = function () {
	        return this.getInt() / 0x7fffffff;
	    };
	    return Random;
	}());


/***/ }
/******/ ])
});
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ppe"] = factory();
	else
		root["ppe"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.options = {
	    scaleRatio: 1,
	    canvas: null,
	    isLimitingColors: false
	};
	var emitters = {};
	var seed = 0;
	var pools = [];
	var defaultPool;
	// emit the particle.
	// specify the type with the first character of the patternName
	// (e: explosion, m: muzzle, s: spark, t: trail, j: jet)
	function emit(patternName, x, y, angle, emitOptions, pool) {
	    if (angle === void 0) { angle = 0; }
	    if (emitOptions === void 0) { emitOptions = {}; }
	    if (pool === void 0) { pool = defaultPool; }
	    if (pool == null && defaultPool == null) {
	        pool = defaultPool = new ParticlePool();
	    }
	    if (emitters[patternName] == null) {
	        var random_1 = new Random();
	        random_1.setSeed(seed + getHashFromString(patternName));
	        emitters[patternName] = new Emitter(patternName[0], emitOptions, random_1);
	    }
	    var velX = emitOptions.velX == null ? 0 : emitOptions.velX;
	    var velY = emitOptions.velY == null ? 0 : emitOptions.velY;
	    emitters[patternName].emit(x, y, angle, velX, velY, pool);
	}
	exports.emit = emit;
	function update() {
	    for (var i = 0; i < pools.length; i++) {
	        var pool = pools[i];
	        pool.update();
	    }
	}
	exports.update = update;
	function getParticles() {
	    return defaultPool.particles;
	}
	exports.getParticles = getParticles;
	function setSeed(_seed) {
	    if (_seed === void 0) { _seed = 0; }
	    seed = _seed;
	}
	exports.setSeed = setSeed;
	function reset() {
	    emitters = {};
	    clear();
	}
	exports.reset = reset;
	function clear() {
	    for (var i = 0; i < pools.length; i++) {
	        var pool = pools[i];
	        pool.clear();
	    }
	}
	exports.clear = clear;
	function clearPools() {
	    pools = [];
	    defaultPool = new ParticlePool();
	}
	exports.clearPools = clearPools;
	function setOptions(_options) {
	    for (var attr in _options) {
	        exports.options[attr] = _options[attr];
	    }
	}
	exports.setOptions = setOptions;
	var Emitter = (function () {
	    function Emitter(patternType, emitOptions, random) {
	        this.base = new Particle();
	        this.angleDeflection = 0;
	        this.speedDeflection = 0.5;
	        this.sizeDeflection = 0.5;
	        this.ticksDeflection = 0.3;
	        this.count = 1;
	        var hue = emitOptions.hue == null ? random.get01() : emitOptions.hue;
	        var sizeScale = emitOptions.sizeScale == null ? 1 : emitOptions.sizeScale;
	        var countScale = emitOptions.countScale == null ? 1 : emitOptions.countScale;
	        switch (patternType) {
	            case 'e':
	                this.base.speed = 0.7;
	                this.base.slowdownRatio = 0.05;
	                this.base.targetSize = 10;
	                this.base.beginColor = new Color(hue, 1, 0.5, 0.3);
	                this.base.middleColor = new Color(hue, 0.2, 0.9, 0.1);
	                this.base.endColor = new Color(hue, 0, 0, 0);
	                this.base.middleTicks = 20;
	                this.base.endTicks = 30;
	                this.angleDeflection = Math.PI * 2;
	                this.count = 15;
	                break;
	            case 'm':
	            case 's':
	                this.base.speed = patternType === 'm' ? 1.5 : 0.5;
	                this.base.slowdownRatio = 0.025;
	                this.base.targetSize = 5;
	                this.base.beginColor = new Color(hue, 0.5, 0.5, 0.3);
	                this.base.middleColor = new Color(hue, 1, 0.9, 0.3);
	                this.base.endColor = new Color(hue, 0.75, 0.75, 0.2);
	                this.base.middleTicks = 10;
	                this.base.endTicks = 20;
	                this.angleDeflection = patternType === 'm' ?
	                    0.3 * random.getForParam() : Math.PI * 2;
	                this.count = 10;
	                break;
	            case 't':
	            case 'j':
	                this.base.speed = patternType === 't' ? 0.1 : 1;
	                this.base.slowdownRatio = 0.03;
	                this.base.targetSize = patternType === 't' ? 3 : 7;
	                this.base.beginColor = new Color(hue, 0.7, 0.7, 0.4);
	                this.base.middleColor = new Color(hue, 1, 0.9, 0.2);
	                this.base.endColor = new Color(hue, 0.7, 0.7, 0.1);
	                this.base.middleTicks = patternType === 't' ? 30 : 15;
	                this.base.endTicks = patternType === 't' ? 40 : 20;
	                this.angleDeflection = 0.5 * random.getForParam();
	                this.speedDeflection = 0.1;
	                this.sizeDeflection = 0.1;
	                this.ticksDeflection = 0.1;
	                this.count = 0.5;
	                break;
	        }
	        if (emitOptions.speed != null) {
	            this.base.speed = emitOptions.speed;
	        }
	        if (emitOptions.slowdownRatio != null) {
	            this.base.slowdownRatio = emitOptions.slowdownRatio;
	        }
	        this.base.speed *= sizeScale * exports.options.scaleRatio;
	        this.base.targetSize *= sizeScale * exports.options.scaleRatio;
	        this.count *= countScale;
	        this.base.speed *= random.getForParam();
	        this.base.slowdownRatio *= random.getForParam();
	        this.base.targetSize *= random.getForParam();
	        var em = this.base.endTicks - this.base.middleTicks;
	        this.base.middleTicks *= random.getForParam();
	        this.base.endTicks = this.base.middleTicks + em * random.getForParam();
	        this.speedDeflection *= random.getForParam();
	        this.sizeDeflection *= random.getForParam();
	        this.ticksDeflection *= random.getForParam();
	        this.count *= random.getForParam();
	    }
	    Emitter.prototype.emit = function (x, y, angle, velX, velY, pool) {
	        if (angle === void 0) { angle = 0; }
	        if (velX === void 0) { velX = 0; }
	        if (velY === void 0) { velY = 0; }
	        if (this.count < 1 && this.count < Math.random()) {
	            return;
	        }
	        for (var i = 0; i < this.count; i++) {
	            var p = new Particle();
	            p.pos.x = x;
	            p.pos.y = y;
	            p.vel.x = velX;
	            p.vel.y = velY;
	            p.angle = angle + (Math.random() - 0.5) * this.angleDeflection;
	            p.speed = this.base.speed *
	                ((Math.random() * 2 - 1) * this.speedDeflection + 1);
	            p.slowdownRatio = this.base.slowdownRatio;
	            p.targetSize = this.base.targetSize *
	                ((Math.random() * 2 - 1) * this.sizeDeflection + 1);
	            p.middleTicks = this.base.middleTicks *
	                ((Math.random() * 2 - 1) * this.ticksDeflection + 1);
	            p.endTicks = this.base.endTicks *
	                ((Math.random() * 2 - 1) * this.ticksDeflection + 1);
	            p.beginColor = this.base.beginColor;
	            p.middleColor = this.base.middleColor;
	            p.endColor = this.base.endColor;
	            pool.particles.push(p);
	        }
	    };
	    return Emitter;
	}());
	exports.Emitter = Emitter;
	var Particle = (function () {
	    function Particle() {
	        this.pos = new Vector();
	        this.vel = new Vector();
	        this.size = 0;
	        this.angle = 0;
	        this.speed = 1;
	        this.slowdownRatio = 0.01;
	        this.targetSize = 10;
	        this.middleTicks = 20;
	        this.endTicks = 60;
	        this.ticks = 0;
	    }
	    Particle.prototype.update = function (context) {
	        this.pos.x += Math.cos(this.angle) * this.speed + this.vel.x;
	        this.pos.y += Math.sin(this.angle) * this.speed + this.vel.y;
	        this.speed *= (1 - this.slowdownRatio);
	        this.vel.x *= 0.99;
	        this.vel.y *= 0.99;
	        if (this.ticks >= this.endTicks) {
	            return false;
	        }
	        if (this.ticks < this.middleTicks) {
	            this.color = this.beginColor.getLerped(this.middleColor, this.ticks / this.middleTicks);
	            this.size += (this.targetSize - this.size) * 0.1;
	        }
	        else {
	            this.color = this.middleColor.getLerped(this.endColor, (this.ticks - this.middleTicks) / (this.endTicks - this.middleTicks));
	            this.size *= 0.95;
	        }
	        this.color = this.color.getSparkled();
	        if (context != null) {
	            context.fillStyle = this.color.getStyle();
	            context.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
	        }
	        this.ticks++;
	    };
	    return Particle;
	}());
	exports.Particle = Particle;
	var ParticlePool = (function () {
	    function ParticlePool(canvas) {
	        if (canvas === void 0) { canvas = exports.options.canvas; }
	        this.canvas = canvas;
	        this.particles = [];
	        pools.push(this);
	    }
	    ParticlePool.prototype.update = function () {
	        if (this.context == null && this.canvas != null) {
	            this.context = this.canvas.getContext('2d');
	        }
	        for (var i = 0; i < this.particles.length;) {
	            if (this.particles[i].update(this.context) === false) {
	                this.particles.splice(i, 1);
	            }
	            else {
	                i++;
	            }
	        }
	    };
	    ParticlePool.prototype.getParticles = function () {
	        return this.particles;
	    };
	    ParticlePool.prototype.clear = function () {
	        this.particles = [];
	    };
	    return ParticlePool;
	}());
	exports.ParticlePool = ParticlePool;
	var Vector = (function () {
	    function Vector(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = x;
	        this.y = y;
	    }
	    return Vector;
	}());
	exports.Vector = Vector;
	var Color = (function () {
	    function Color(hue, saturation, value, sparkleRatio) {
	        if (hue === void 0) { hue = 0; }
	        if (saturation === void 0) { saturation = 1; }
	        if (value === void 0) { value = 1; }
	        if (sparkleRatio === void 0) { sparkleRatio = 0; }
	        this.hue = hue;
	        this.saturation = saturation;
	        this.value = value;
	        this.sparkleRatio = sparkleRatio;
	        this.r = 0;
	        this.g = 0;
	        this.b = 0;
	        this.r = value;
	        this.g = value;
	        this.b = value;
	        var h = hue * 6;
	        var i = Math.floor(h);
	        var f = h - i;
	        switch (i) {
	            case 0:
	                this.g *= 1 - saturation * (1 - f);
	                this.b *= 1 - saturation;
	                break;
	            case 1:
	                this.b *= 1 - saturation;
	                this.r *= 1 - saturation * f;
	                break;
	            case 2:
	                this.b *= 1 - saturation * (1 - f);
	                this.r *= 1 - saturation;
	                break;
	            case 3:
	                this.r *= 1 - saturation;
	                this.g *= 1 - saturation * f;
	                break;
	            case 4:
	                this.r *= 1 - saturation * (1 - f);
	                this.g *= 1 - saturation;
	                break;
	            case 5:
	                this.g *= 1 - saturation;
	                this.b *= 1 - saturation * f;
	                break;
	        }
	        if (exports.options.isLimitingColors === true) {
	            this.limitRgb();
	        }
	    }
	    Color.prototype.getStyle = function () {
	        var r = Math.floor(this.r * 255);
	        var g = Math.floor(this.g * 255);
	        var b = Math.floor(this.b * 255);
	        return "rgb(" + r + "," + g + "," + b + ")";
	    };
	    Color.prototype.getSparkled = function () {
	        if (this.sparkled == null) {
	            this.sparkled = new Color();
	        }
	        this.sparkled.r = clamp(this.r + this.sparkleRatio * (Math.random() * 2 - 1));
	        this.sparkled.g = clamp(this.g + this.sparkleRatio * (Math.random() * 2 - 1));
	        this.sparkled.b = clamp(this.b + this.sparkleRatio * (Math.random() * 2 - 1));
	        if (exports.options.isLimitingColors === true) {
	            this.sparkled.limitRgb();
	        }
	        return this.sparkled;
	    };
	    Color.prototype.getLerped = function (other, ratio) {
	        if (this.lerped == null) {
	            this.lerped = new Color();
	        }
	        this.lerped.r = this.r * (1 - ratio) + other.r * ratio;
	        this.lerped.g = this.g * (1 - ratio) + other.g * ratio;
	        this.lerped.b = this.b * (1 - ratio) + other.b * ratio;
	        this.lerped.sparkleRatio =
	            this.sparkleRatio * (1 - ratio) + other.sparkleRatio * ratio;
	        if (exports.options.isLimitingColors === true) {
	            this.lerped.limitRgb();
	        }
	        return this.lerped;
	    };
	    Color.prototype.limitRgb = function () {
	        this.r = this.limitColor(this.r);
	        this.g = this.limitColor(this.g);
	        this.b = this.limitColor(this.b);
	    };
	    Color.prototype.limitColor = function (v) {
	        return v < 0.25 ? 0 : v < 0.75 ? 0.5 : 1;
	    };
	    return Color;
	}());
	exports.Color = Color;
	function getHashFromString(str) {
	    var hash = 0;
	    var len = str.length;
	    for (var i = 0; i < len; i++) {
	        var chr = str.charCodeAt(i);
	        hash = ((hash << 5) - hash) + chr;
	        hash |= 0;
	    }
	    return hash;
	}
	function clamp(v) {
	    if (v <= 0) {
	        return 0;
	    }
	    else if (v >= 1) {
	        return 1;
	    }
	    else {
	        return v;
	    }
	}
	var Random = (function () {
	    function Random() {
	        this.setSeed();
	        this.get01 = this.get01.bind(this);
	    }
	    Random.prototype.setSeed = function (v) {
	        if (v === void 0) { v = -0x7fffffff; }
	        if (v === -0x7fffffff) {
	            v = Math.floor(Math.random() * 0x7fffffff);
	        }
	        this.x = v = 1812433253 * (v ^ (v >> 30));
	        this.y = v = 1812433253 * (v ^ (v >> 30)) + 1;
	        this.z = v = 1812433253 * (v ^ (v >> 30)) + 2;
	        this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
	        return this;
	    };
	    Random.prototype.getInt = function () {
	        var t = this.x ^ (this.x << 11);
	        this.x = this.y;
	        this.y = this.z;
	        this.z = this.w;
	        this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
	        return this.w;
	    };
	    Random.prototype.get01 = function () {
	        return this.getInt() / 0x7fffffff;
	    };
	    Random.prototype.getForParam = function () {
	        return this.get01() + 0.5;
	    };
	    return Random;
	}());


/***/ }
/******/ ])
});
;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var pag = __webpack_require__(2);
var ppe = __webpack_require__(3);
var g = __webpack_require__(1);
exports.rotationNum = 16;
var Actor = /** @class */ (function () {
    function Actor(options, game) {
        if (options === void 0) { options = {}; }
        if (game === void 0) { game = g.game; }
        this.options = options;
        this.game = game;
        this.pos = g.p.createVector();
        this.vel = g.p.createVector();
        this.prevPos = g.p.createVector();
        this.angle = 0;
        this.speed = 0;
        this.isAlive = true;
        this.priority = 1;
        this.ticks = 0;
        this.sprites = [];
        this.spriteImages = [];
        this.collision = g.p.createVector(8, 8);
        this.modules = [];
        this.moduleNames = [];
        game.actorPool.add(this);
        this.context = game.screen.context;
        this.type = g.getClassName(this);
        new g.RemoveWhenInAndOut(this);
        this.init();
    }
    Actor.prototype.init = function () { };
    Actor.prototype.update = function () {
        if (this.options.hasMuzzleEffect && this.ticks === 0) {
            this.emitParticles("m_" + this.type, {}, this.game.particlePool);
        }
        if (this.options.hasTrail) {
            this.emitParticles("t_" + this.type, {}, this.game.particlePool);
        }
        this.prevPos.set(this.pos);
        this.pos.add(this.vel);
        g.Vector.addAngle(this.pos, this.angle, this.speed);
        if (this.sprites != null) {
            this.drawSprite();
        }
        _.forEach(this.modules, function (m) {
            if (m.isEnabled) {
                m.update();
            }
        });
        this.ticks++;
    };
    Actor.prototype.remove = function () {
        this.isAlive = false;
    };
    Actor.prototype.destroy = function () {
        if (this.options.destroyedEffect != null) {
            this.emitParticles(this.options.destroyedEffect + "_" + this.type + "_d", {}, this.game.particlePool);
        }
        if (this.options.isEndingGameWhenDestroyed) {
            this.game.end();
        }
        this.remove();
    };
    Actor.prototype.clearModules = function () {
        this.modules = [];
        this.moduleNames = [];
    };
    Actor.prototype.testCollision = function (type) {
        var _this = this;
        return _.filter(this.game.actorPool.getByCollisionType(type), function (a) {
            return a !== _this &&
                Math.abs(_this.pos.x - a.pos.x) < (_this.collision.x + a.collision.x) / 2 &&
                Math.abs(_this.pos.y - a.pos.y) < (_this.collision.y + a.collision.y) / 2;
        });
    };
    Actor.prototype.getCollisionInfo = function (actor) {
        var angle;
        var wa = Math.atan2(this.collision.y, this.collision.x);
        var a = g.Vector.getAngle(this.pos, actor.prevPos);
        if (a > Math.PI - wa || a <= -Math.PI + wa) {
            angle = 2;
        }
        else if (a > wa) {
            angle = 1;
        }
        else if (a > -wa) {
            angle = 0;
        }
        else {
            angle = 3;
        }
        return { wall: this, angle: angle, dist: this.pos.dist(actor.prevPos) };
    };
    Actor.prototype.adjustPos = function (actor, angle) {
        switch (angle) {
            case 0:
                actor.pos.x = this.pos.x + (this.collision.x + actor.collision.x) / 2;
                break;
            case 1:
                actor.pos.y = this.pos.y + (this.collision.y + actor.collision.y) / 2;
                break;
            case 2:
                actor.pos.x = this.pos.x - (this.collision.x + actor.collision.x) / 2;
                break;
            case 3:
                actor.pos.y = this.pos.y - (this.collision.y + actor.collision.y) / 2;
                break;
        }
        return angle;
    };
    Actor.prototype.emitParticles = function (patternName, options, pool) {
        if (options === void 0) { options = {}; }
        if (pool === void 0) { pool = null; }
        ppe.emit(patternName, this.pos.x, this.pos.y, this.angle, options, pool);
    };
    Actor.prototype.addSpritePixels = function (pixels, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this.sprites.push({ pixels: pixels, offset: g.p.createVector(offsetX, offsetY) });
    };
    Actor.prototype.addSpriteImages = function (images, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this.spriteImages.push({ images: images, offset: g.p.createVector(offsetX, offsetY) });
    };
    Actor.prototype.clearSprites = function () {
        this.sprites = [];
        this.spriteImages = [];
    };
    Actor.prototype.drawSprite = function (x, y) {
        var _this = this;
        if (x === void 0) { x = this.pos.x; }
        if (y === void 0) { y = this.pos.y; }
        _.forEach(this.sprites, function (s) {
            _this.drawSpritePixels(s.pixels, x + s.offset.x, y + s.offset.y);
        });
        _.forEach(this.spriteImages, function (s) {
            _this.drawSpriteImages(s.images, x + s.offset.x, y + s.offset.y);
        });
    };
    Actor.prototype.drawSpritePixels = function (pixels, x, y) {
        if (pixels.length <= 1) {
            pag.draw(this.context, pixels, x, y);
        }
        else {
            var a = this.angle;
            if (a < 0) {
                a = Math.PI * 2 + a % (Math.PI * 2);
            }
            var ri = Math.round(a / (Math.PI * 2 / exports.rotationNum)) % exports.rotationNum;
            pag.draw(this.context, pixels, x, y, ri);
        }
    };
    Actor.prototype.drawSpriteImages = function (images, x, y) {
        if (images.length <= 1) {
            pag.drawImage(this.context, images, x, y);
        }
        else {
            var a = this.angle;
            if (a < 0) {
                a = Math.PI * 2 + a % (Math.PI * 2);
            }
            var ri = Math.round(a / (Math.PI * 2 / exports.rotationNum)) % exports.rotationNum;
            pag.drawImage(this.context, images, x, y, ri);
        }
    };
    Actor.prototype.getModule = function (moduleName) {
        return this.modules[_.indexOf(this.moduleNames, moduleName)];
    };
    Actor.prototype._addModule = function (module, insertIndexFromLast) {
        if (insertIndexFromLast === void 0) { insertIndexFromLast = 0; }
        var i = this.modules.length - insertIndexFromLast;
        this.modules.splice(i, 0, module);
        this.moduleNames.splice(i, 0, g.getClassName(module));
    };
    return Actor;
}());
exports.Actor = Actor;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, {
            hasTrail: true, destroyedEffect: 'e', isEndingGameWhenDestroyed: true
        }, game) || this;
        _this.type = _this.collisionType = 'player';
        _this.addSpritePixels(pag.generate(['x x', ' xxx'], { hue: 0.2 }));
        _this.collision.set(5, 5);
        var s = game.screen;
        _this.pos.set(game.screen.size.x / 2, game.screen.size.y / 2);
        new g.DestroyWhenColliding(_this, 'enemy', true);
        new g.DestroyWhenColliding(_this, 'bullet', true);
        return _this;
    }
    return Player;
}(Actor));
exports.Player = Player;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game) {
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, { hasTrail: true, destroyedEffect: 'e' }, game) || this;
        _this.type = _this.collisionType = 'enemy';
        _this.addSpritePixels(pag.generate([' xx', 'xxxx'], { hue: 0 }));
        new g.DestroyWhenColliding(_this, 'shot', true);
        return _this;
    }
    return Enemy;
}(Actor));
exports.Enemy = Enemy;
var Shot = /** @class */ (function (_super) {
    __extends(Shot, _super);
    function Shot(actor, speed, angle, options) {
        if (speed === void 0) { speed = 2; }
        if (angle === void 0) { angle = null; }
        if (options === void 0) { options = { hasTrail: true, hasMuzzleEffect: true }; }
        var _this = _super.call(this, options, actor.game) || this;
        _this.type = _this.collisionType = 'shot';
        _this.addSpritePixels(pag.generate(['xxx'], { hue: 0.4 }));
        _this.pos.set(actor.pos);
        _this.angle = angle == null ? actor.angle : angle;
        _this.speed = speed;
        _this.priority = 0.3;
        new g.DestroyWhenColliding(_this, 'wall');
        return _this;
    }
    return Shot;
}(Actor));
exports.Shot = Shot;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(actor, speed, angle) {
        if (speed === void 0) { speed = 2; }
        if (angle === void 0) { angle = null; }
        var _this = _super.call(this, { hasTrail: true, hasMuzzleEffect: true }, actor.game) || this;
        _this.type = _this.collisionType = 'bullet';
        _this.addSpritePixels(pag.generate(['xxxx'], { hue: 0.1 }));
        _this.pos.set(actor.pos);
        _this.angle = angle == null ? actor.angle : angle;
        _this.speed = speed;
        new g.DestroyWhenColliding(_this, 'wall');
        return _this;
    }
    return Bullet;
}(Actor));
exports.Bullet = Bullet;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(pos, vel, gravity, game) {
        if (vel === void 0) { vel = null; }
        if (gravity === void 0) { gravity = null; }
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, { hasTrail: true, destroyedEffect: 's' }, game) || this;
        _this.gravity = gravity;
        _this.type = _this.collisionType = 'item';
        _this.addSpritePixels(pag.generate([' o', 'ox'], { isMirrorX: true, hue: 0.25 }));
        _this.pos.set(pos);
        if (vel != null) {
            _this.vel = vel;
        }
        _this.priority = 0.6;
        _this.collision.set(10, 10);
        new g.DestroyWhenColliding(_this, 'player');
        return _this;
    }
    Item.prototype.update = function () {
        _super.prototype.update.call(this);
        this.vel.add(this.gravity);
        this.vel.mult(0.99);
    };
    return Item;
}(Actor));
exports.Item = Item;
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(pos, width, height, hue, seed, game) {
        if (width === void 0) { width = 8; }
        if (height === void 0) { height = 8; }
        if (hue === void 0) { hue = 0.7; }
        if (seed === void 0) { seed = null; }
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, {}, game) || this;
        var pw = Math.round(width / 4);
        var ph = Math.round(height / 4);
        _this.pagPattern = [_.times(pw, function () { return 'o'; }).join('')].concat(_.times(ph - 1, function () { return ['o'].concat(_.times(pw - 1, function () { return 'x'; })).join(''); }));
        _this.pagOptions = { isMirrorX: true, hue: hue };
        if (seed != null) {
            _this.pagOptions.seed = seed;
        }
        _this.addSpritePixels(pag.generate(_this.pagPattern, _this.pagOptions));
        _this.type = _this.collisionType = 'wall';
        _this.pos.set(pos);
        _this.priority = 0.2;
        _this.collision.set(width, height);
        return _this;
    }
    return Wall;
}(Actor));
exports.Wall = Wall;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star(minSpeedY, maxSpeedY, minSpeedX, maxSpeedX, game) {
        if (minSpeedY === void 0) { minSpeedY = 0.5; }
        if (maxSpeedY === void 0) { maxSpeedY = 1.5; }
        if (minSpeedX === void 0) { minSpeedX = 0; }
        if (maxSpeedX === void 0) { maxSpeedX = 0; }
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, {}, game) || this;
        _this.pos.set(game.p.random(game.screen.size.x), game.p.random(game.screen.size.y));
        _this.vel.set(game.p.random(minSpeedX, maxSpeedX), game.p.random(minSpeedY, maxSpeedY));
        _this.clearModules();
        new g.WrapPos(_this);
        var colorStrings = ['00', '7f', 'ff'];
        _this.color = '#' + _.times(3, function () { return colorStrings[Math.floor(game.p.random(3))]; }).join('');
        _this.priority = -1;
        return _this;
    }
    Star.prototype.update = function () {
        _super.prototype.update.call(this);
        this.game.p.fill(this.color);
        this.game.p.rect(Math.floor(this.pos.x), Math.floor(this.pos.y), 1, 1);
    };
    return Star;
}(Actor));
exports.Star = Star;
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(x, y, game) {
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, {}, game) || this;
        var pagOptions = { isMirrorX: true, value: 0.5, rotationNum: 1 };
        pagOptions.colorLighting = 0;
        _this.addSpritePixels(pag.generate(['ooo', 'oxx', 'oxx'], pagOptions));
        _this.pos.set(x, y);
        new g.WrapPos(_this);
        _this.priority = -1;
        return _this;
    }
    return Panel;
}(Actor));
exports.Panel = Panel;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(str, duration, align, game) {
        if (duration === void 0) { duration = 30; }
        if (align === void 0) { align = null; }
        if (game === void 0) { game = g.game; }
        var _this = _super.call(this, {}, game) || this;
        _this.str = str;
        _this.duration = duration;
        _this.align = align;
        _this.priority = 1.5;
        return _this;
    }
    Text.prototype.update = function () {
        _super.prototype.update.call(this);
        this.vel.mult(0.9);
        g.text.draw(this.str, this.pos.x, this.pos.y, this.align, 'white', this.game);
        if (this.ticks >= this.duration) {
            this.remove();
        }
    };
    return Text;
}(Actor));
exports.Text = Text;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tone = __webpack_require__(10);
var g = __webpack_require__(1);
var random;
var isEmptySoundPlayed = false;
function initSound(bpm) {
    if (bpm === void 0) { bpm = 120; }
    random = new g.Random();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
}
exports.initSound = initSound;
function setSoundSeed(seed) {
    random.setSeed(seed);
}
exports.setSoundSeed = setSoundSeed;
function playEmptySound() {
    if (isEmptySoundPlayed) {
        return;
    }
    var context = Tone.context;
    var buffer = context.createBuffer(1, 1, context.sampleRate);
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    if (context.resume) {
        context.resume();
    }
    isEmptySoundPlayed = true;
}
exports.playEmptySound = playEmptySound;
var Sound = /** @class */ (function () {
    function Sound(isSe, isLooping, cordLength, speed, baseNote, volume) {
        if (isSe === void 0) { isSe = false; }
        if (isLooping === void 0) { isLooping = false; }
        if (cordLength === void 0) { cordLength = 8; }
        if (speed === void 0) { speed = 1; }
        if (baseNote === void 0) { baseNote = 60; }
        if (volume === void 0) { volume = 0; }
        this.isSe = isSe;
        this.isLooping = isLooping;
        this.cordLength = cordLength;
        this.speed = speed;
        this.baseNote = baseNote;
        this.chords = [
            [0, 4, 7],
            [0, 3, 7],
            [0, 4, 7, 10],
            [0, 4, 7, 11],
            [0, 3, 7, 10],
        ];
        // I C:0, II D:2, III E:4, IV F: 5, V G:7, VI A:9, VII B:11
        this.progressions = [
            [[0, 0], [7, 0], [9, 1], [4, 1]],
            [[5, 0], [0, 0], [5, 0], [7, 0]],
            [[5, 3], [7, 2], [4, 4], [9, 1]],
            [[9, 1], [2, 1], [7, 0], [0, 0]],
            [[9, 1], [5, 0], [7, 0], [0, 0]]
        ];
        this.volumeNode = new Tone.Volume(volume).toMaster();
        this.initParts();
    }
    Sound.prototype.initParts = function () {
        var baseProgression = random.select(this.progressions);
        this.progression = [];
        for (var i = 0; i < baseProgression.length; i++) {
            var bp = baseProgression[i];
            var p = [
                bp[0],
                random.get() < 0.7 ? bp[1] : random.getInt(this.chords.length)
            ];
            this.progression.push(p);
        }
        this.parts = [];
    };
    Sound.prototype.createPartsBase = function (restRatio, min, max) {
        if (restRatio === void 0) { restRatio = 0.5; }
        if (min === void 0) { min = -1; }
        if (max === void 0) { max = 1; }
        var velocityRatio = 1;
        var n;
        var nv = random.get(-0.5, 0.5);
        if (this.isSe) {
            min *= 2;
            max *= 2;
            velocityRatio = 2;
            n = random.get(-1, 2);
        }
        else {
            n = random.get();
        }
        this.durations = [];
        this.noteRatios = [];
        for (var i = 0; i < this.progression.length; i++) {
            for (var j = 0; j < this.cordLength; j++) {
                if (i === 2 && !this.isSe) {
                    this.durations.push(this.durations[j]);
                    this.noteRatios.push(this.noteRatios[j]);
                    n = this.noteRatios[j];
                    continue;
                }
                if (random.get() < restRatio) {
                    this.durations.push(false);
                    this.noteRatios.push(null);
                    continue;
                }
                this.durations.push(true);
                this.noteRatios.push(n);
                nv += random.get(-0.25, 0.25);
                n += nv * velocityRatio;
                if (random.get() < 0.2 || n <= min || n >= max) {
                    n -= nv * 2;
                    nv *= -1;
                }
            }
        }
        for (var i = 0; i < this.progression.length; i++) {
            for (var j = 0; j < this.cordLength; j++) {
                var idx = i * this.cordLength + j;
                if (this.durations[idx] === false) {
                    continue;
                }
                var l = 1;
                for (var k = 1; k < this.cordLength - j; k++) {
                    if (this.durations[idx + k] === false && random.get() < 0.7) {
                        l++;
                    }
                }
                this.durations[idx] = "0:0:" + l / this.speed;
            }
        }
    };
    Sound.prototype.createPart = function (offset, randomWidth, cordResolution) {
        if (offset === void 0) { offset = 0; }
        if (randomWidth === void 0) { randomWidth = 0; }
        if (cordResolution === void 0) { cordResolution = 100; }
        var notes = [];
        for (var i = 0; i < this.progression.length; i++) {
            var d = this.progression[i][0];
            var cn = this.progression[i][1];
            var chord = this.chords[cn];
            for (var j = 0; j < this.cordLength; j++) {
                var idx = i * this.cordLength + j;
                if (this.durations[idx] === false) {
                    continue;
                }
                var n = this.noteRatios[idx];
                n = Math.floor(n * cordResolution) / cordResolution;
                var b = Math.floor(n);
                var cn_1 = Math.floor((n - Math.floor(n)) * chord.length);
                cn_1 += offset + random.getInt(-randomWidth, randomWidth + 1);
                while (cn_1 >= chord.length) {
                    cn_1 -= chord.length;
                    b++;
                }
                while (cn_1 < 0) {
                    cn_1 += chord.length;
                    b--;
                }
                b *= 12;
                var dur = this.durations[idx];
                var note = this.midiNoteNumberToFrequency(this.baseNote + b + chord[cn_1]);
                if (note > 10 && note < 2000) {
                    notes.push({
                        time: "0:0:" + idx / this.speed,
                        note: note,
                        dur: dur
                    });
                }
            }
        }
        var s = new Tone.Synth({
            oscillator: {
                type: 'sawtooth'
            }
        });
        var synth = s.chain(this.volumeNode);
        var part = new Tone.Part(function (time, event) {
            synth.triggerAttackRelease(event.note, event.dur, time);
        }, notes);
        part.loop = this.isLooping;
        this.parts.push(part);
    };
    Sound.prototype.play = function (quantizeStr) {
        if (quantizeStr === void 0) { quantizeStr = '@0:0:2'; }
        for (var i = 0; i < this.parts.length; i++) {
            var p = this.parts[i];
            p.stop();
            p.start(quantizeStr);
            if (!this.isLooping) {
                p.stop(quantizeStr + "+" + (this.isSe ? 2 : 8));
            }
        }
    };
    Sound.prototype.stop = function () {
        for (var i = 0; i < this.parts.length; i++) {
            var p = this.parts[i];
            p.stop();
        }
    };
    Sound.prototype.midiNoteNumberToFrequency = function (d) {
        var a = 440;
        return a * Math.pow(2, (d - 69) / 12);
    };
    return Sound;
}());
exports.Sound = Sound;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var g = __webpack_require__(1);
function isIn(v, low, high) {
    return v >= low && v <= high;
}
exports.isIn = isIn;
function wrap(v, low, high) {
    var w = high - low;
    var o = v - low;
    if (o >= 0) {
        return o % w + low;
    }
    else {
        var wv = w + o % w + low;
        if (wv >= high) {
            wv -= w;
        }
        return wv;
    }
}
exports.wrap = wrap;
function getDifficulty(game) {
    if (game === void 0) { game = g.game; }
    return game.scene === g.Scene.title ? 1 : game.ticks * (1 / 60 / 20) + 1;
}
exports.getDifficulty = getDifficulty;
function fillStar(c, minSpeedY, maxSpeedY, minSpeedX, maxSpeedX, game) {
    if (c === void 0) { c = 64; }
    if (minSpeedY === void 0) { minSpeedY = 0.5; }
    if (maxSpeedY === void 0) { maxSpeedY = 1.5; }
    if (minSpeedX === void 0) { minSpeedX = 0; }
    if (maxSpeedX === void 0) { maxSpeedX = 0; }
    if (game === void 0) { game = g.game; }
    _.times(c, function () { return new g.Star(minSpeedY, maxSpeedY, minSpeedX, maxSpeedX, game); });
}
exports.fillStar = fillStar;
function fillPanel(game) {
    if (game === void 0) { game = g.game; }
    _.times(10, function (x) {
        _.times(10, function (y) {
            new g.Panel(x * 16 - 8, y * 16 - 8, game);
        });
    });
}
exports.fillPanel = fillPanel;
function getClassName(obj) {
    return ('' + obj.constructor).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
}
exports.getClassName = getClassName;
var Vector = /** @class */ (function () {
    function Vector() {
    }
    Vector.getAngle = function (v, to) {
        if (to === void 0) { to = null; }
        return to == null ? Math.atan2(v.y, v.x) : Math.atan2(to.y - v.y, to.x - v.x);
    };
    Vector.addAngle = function (v, angle, value) {
        v.x += Math.cos(angle) * value;
        v.y += Math.sin(angle) * value;
    };
    Vector.constrain = function (v, lowX, highX, lowY, highY) {
        v.x = g.p.constrain(v.x, lowX, highX);
        v.y = g.p.constrain(v.y, lowY, highY);
    };
    Vector.swapXy = function (v) {
        var t = v.x;
        v.x = v.y;
        v.y = t;
    };
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var pag = __webpack_require__(2);
var ppe = __webpack_require__(3);
var g = __webpack_require__(1);
var screen;
var context;
var showingInstructionCount = 300;
window.onload = function () {
    g.init(function () {
        g.ui.useStickKeyAsButton();
        var game = new g.Game(160, 160, begin, update);
        var canvas = game.screen.canvas;
        screen = game.screen;
        context = screen.context;
        canvas.setAttribute('style', null);
        canvas.setAttribute('id', 'main');
        ppe.options.canvas = canvas;
        g.setGenerationSeeds(1194484);
        createSounds();
        /*g.enableDebug(() => {
          bgmSound.stop();
          createSounds();
        });*/
    }, 110);
};
var startSound;
var bgmSound;
var shotSound;
var itemSound;
var endSound;
function createSounds() {
    startSound = new g.Sound(false, false, 4, 1, 65);
    startSound.createPartsBase();
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
function createSe(baseNote, cordLength, volume) {
    if (volume === void 0) { volume = 0; }
    var se = new g.Sound(true, false, cordLength, 8, baseNote, volume);
    se.createPartsBase();
    se.createPart();
    se.createPart(-2, 2);
    se.createPartsBase();
    se.createPart(-4, 4);
    return se;
}
var player, floor;
function begin() {
    player = new Player();
    player.pos.set(screen.size.x * 0.25, screen.size.y * 0.75);
    player.angle = -g.p.HALF_PI;
    _.times(7, function (i) {
        var dr = new Daruma(true);
    });
    floor = new Floor();
    for (var i = 0; i < 50; i++) {
        new g.Star(0.2, 3, 0, 0);
    }
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
        new Daruma();
    }
    if (g.game.scene === g.Scene.started) {
        if (g.game.ticks === 120) {
            bgmSound.play();
        }
        if (showingInstructionCount > 0 && g.game.ticks === 10) {
            new g.Text('PRESS [l][r] OR', 150).pos.
                set(screen.size.x / 2, 20);
            new g.Text('TAP LEFT/RIGHT HALF OF SCREEN', 150).pos.
                set(screen.size.x / 2, 30);
            new g.Text('TO MOVE AND SHOT', 150).pos.
                set(screen.size.x / 2, 40);
        }
        showingInstructionCount--;
    }
}
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.collision.set(20, 20);
        return _this;
    }
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
        this.options.hasTrail = false;
        if (g.ui.isJustPressed) {
            var a = void 0;
            if (g.ui.stickAngle > 4 ||
                (g.ui.isCursorDown && g.ui.cursorPos.x < screen.size.x / 2)) {
                this.pos.x = screen.size.x / 4;
                a = 0;
            }
            if (g.ui.stickAngle > 0 && g.ui.stickAngle <= 4 ||
                (g.ui.isCursorDown && g.ui.cursorPos.x >= screen.size.x / 2)) {
                this.pos.x = screen.size.x / 4 * 3;
                a = g.p.PI;
            }
            if (a != null) {
                shotSound.play();
                var s = new g.Shot(this, 10, a, { hasTrail: true });
                s.collision.set(3, 3);
            }
        }
        this.pos.y = floor.pos.y - 15;
        if (this.pos.y > 152) {
            this.destroy();
        }
    };
    Player.prototype.destroy = function () {
        endSound.play('@0:0:1');
        bgmSound.stop();
        _super.prototype.destroy.call(this);
        floor.destroy();
        g.game.setScoreMultiplier(1);
    };
    return Player;
}(g.Player));
var Daruma = /** @class */ (function (_super) {
    __extends(Daruma, _super);
    function Daruma(isFirst) {
        if (isFirst === void 0) { isFirst = false; }
        var _this = _super.call(this) || this;
        _this.colors = [[0, 0.7], [0.2, 0.7], [0.2, 0.2], [0.3, 0.7], [0.6, 0.7]];
        _this.getModule('RemoveWhenInAndOut').paddingOuter = 999;
        _this.options.hasTrail = false;
        _this.clearSprites();
        var min = _.minBy(_this.game.actorPool.get('enemy'), function (a) { return a.pos.y; });
        var y = min == null ? -25 : min.pos.y - 25;
        var width = 6;
        var x = screen.size.x / 2;
        var random = _this.game.random;
        if (!isFirst && random.get() < 0.5) {
            width = 10;
            x += random.get() < 0.5 ? -14 : 14;
        }
        if (!isFirst && random.get() < 0.3) {
            var ix = void 0;
            if (x === screen.size.x / 2) {
                ix = random.get() < 0.5 ? screen.size.x / 4 : screen.size.x / 4 * 3;
            }
            else if (x < screen.size.x / 2) {
                ix = screen.size.x / 4 * 3;
            }
            else {
                ix = screen.size.x / 4;
            }
            _this.item = new Item(g.p.createVector(ix, y));
        }
        var pat = _.times(width, function () { return 'x'; }).join('');
        _this.collision.set(width * 7, 20);
        var color = random.select(_this.colors);
        _this.addSpriteImages(pag.generateImages([pat, pat, pat], {
            isMirrorX: true, hue: color[0], saturation: color[1], rotationNum: 1
        }));
        _this.pos.set(x, y);
        new g.CollideToActor(_this, { velRatio: 0, types: ['enemy', 'wall'] });
        return _this;
    }
    Daruma.prototype.update = function () {
        this.vel.y += 1;
        _super.prototype.update.call(this);
        if (this.item != null) {
            this.item.pos.y = this.pos.y;
        }
    };
    Daruma.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        new Daruma();
        floor.vel.y -= 0.1;
        if (this.item != null && this.item.isAlive) {
            g.game.setScoreMultiplier(1);
            this.item.remove();
        }
        g.game.addScore(1, this.pos);
    };
    return Daruma;
}(g.Enemy));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(pos) {
        var _this = _super.call(this, pos) || this;
        _this.options.hasTrail = false;
        return _this;
    }
    Item.prototype.destroy = function () {
        itemSound.play();
        _super.prototype.destroy.call(this);
        if (g.game.scoreMultiplier < 100) {
            g.game.addScoreMultiplier(10);
        }
        if (g.game.scoreMultiplier > 100) {
            g.game.setScoreMultiplier(100);
        }
    };
    return Item;
}(g.Item));
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        var _this = _super.call(this, g.p.createVector(screen.size.x / 2, screen.size.y - 20), 100, 10) || this;
        _this.clearSprites();
        _this.pagOptions.rotationNum = 1;
        _this.addSpriteImages(pag.generateImages(_this.pagPattern, _this.pagOptions));
        _this.priority = -1;
        return _this;
    }
    Floor.prototype.update = function () {
        _super.prototype.update.call(this);
        this.vel.y *= 0.99;
        if (this.pos.y < 120) {
            this.pos.y += (120 - this.pos.y) * 0.1;
            this.vel.y *= 0.5;
        }
        this.vel.y += 0.005 * g.getDifficulty();
    };
    return Floor;
}(g.Wall));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gcc"] = factory();
	else
		root["gcc"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GIFEncoder = __webpack_require__(2);
	exports.options = {
	    scale: 0.5,
	    durationSec: 3,
	    keyCode: 67,
	    capturingFps: 20,
	    appFps: 60,
	    isAppendingImgElement: true,
	    quality: 10,
	    downloadFileName: null
	};
	var contextsNum;
	var contexts;
	var isCaptured;
	var index = 0;
	var frameCount = 0;
	var image = new Image();
	var isInfiniteDuration = false;
	function capture(element) {
	    frameCount++;
	    var capturePerFrame = exports.options.appFps / exports.options.capturingFps;
	    if (frameCount < capturePerFrame) {
	        return;
	    }
	    frameCount -= capturePerFrame;
	    if (!contexts) {
	        begin(element);
	    }
	    if (isInfiniteDuration) {
	        contexts.push(createContext(element));
	    }
	    contexts[index].drawImage(element, 0, 0);
	    if (!isInfiniteDuration) {
	        isCaptured[index] = true;
	    }
	    index++;
	    if (!isInfiniteDuration && index >= contextsNum) {
	        index = 0;
	    }
	}
	exports.capture = capture;
	function captureSvg(svgElm) {
	    var capturePerFrame = exports.options.appFps / exports.options.capturingFps;
	    if (frameCount + 1 < capturePerFrame) {
	        frameCount++;
	        return;
	    }
	    var svgXml = new XMLSerializer().serializeToString(svgElm);
	    image.src = "data:image/svg+xml;base64," + btoa(svgXml);
	    capture(image);
	}
	exports.captureSvg = captureSvg;
	function begin(element) {
	    if (!isInfiniteDuration) {
	        contextsNum = exports.options.durationSec * exports.options.capturingFps;
	        contexts = times(contextsNum, function () { return createContext(element); });
	    }
	    reset();
	    document.addEventListener('keydown', function (e) {
	        if (e.keyCode == exports.options.keyCode) {
	            end();
	        }
	    });
	}
	function reset() {
	    if (isInfiniteDuration) {
	        contexts = [];
	    }
	    else {
	        isCaptured = times(contextsNum, function () { return false; });
	    }
	}
	function createContext(element) {
	    var cvs = document.createElement('canvas');
	    cvs.width = element.width * exports.options.scale;
	    cvs.height = element.height * exports.options.scale;
	    var ctx = cvs.getContext('2d');
	    ctx.scale(exports.options.scale, exports.options.scale);
	    return ctx;
	}
	function end() {
	    var encoder = new GIFEncoder();
	    encoder.setRepeat(0);
	    encoder.setDelay(1000 / exports.options.capturingFps);
	    encoder.setQuality(exports.options.quality);
	    encoder.start();
	    if (isInfiniteDuration) {
	        times(index - 1, function (i) {
	            encoder.addFrame(contexts[i]);
	        });
	    }
	    else {
	        var idx_1 = index;
	        times(contextsNum, function () {
	            if (isCaptured[idx_1]) {
	                encoder.addFrame(contexts[idx_1]);
	            }
	            idx_1++;
	            if (idx_1 >= contextsNum) {
	                idx_1 = 0;
	            }
	        });
	    }
	    encoder.finish();
	    reset();
	    if (exports.options.downloadFileName != null) {
	        encoder.download(exports.options.downloadFileName);
	        return null;
	    }
	    var binaryGif = encoder.stream().getData();
	    var imgElement = document.createElement('img');
	    imgElement.src = 'data:image/gif;base64,' + encode64(binaryGif);
	    if (exports.options.isAppendingImgElement) {
	        document.getElementsByTagName('body')[0].appendChild(imgElement);
	    }
	    return imgElement;
	}
	exports.end = end;
	function times(n, func) {
	    var result = [];
	    for (var i = 0; i < n; i++) {
	        result.push(func(i));
	    }
	    return result;
	}
	function setOptions(_options) {
	    for (var attr in _options) {
	        exports.options[attr] = _options[attr];
	    }
	    isInfiniteDuration = exports.options.durationSec <= 0;
	}
	exports.setOptions = setOptions;
	// https://github.com/antimatter15/jsgif/blob/master/b64.js
	function encode64(input) {
	    var output = "", i = 0, l = input.length, key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    while (i < l) {
	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	        if (isNaN(chr2))
	            enc3 = enc4 = 64;
	        else if (isNaN(chr3))
	            enc4 = 64;
	        output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
	    }
	    return output;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * This class lets you encode animated GIF files
	 * Base class :  http://www.java2s.com/Code/Java/2D-Graphics-GUI/AnimatedGifEncoder.htm
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	GIFEncoder = function () {

	  for (var i = 0, chr = {}; i < 256; i++)
	    chr[i] = String.fromCharCode(i);

	  function ByteArray() {
	    this.bin = [];
	  }

	  ByteArray.prototype.getData = function () {
	    for (var v = '', l = this.bin.length, i = 0; i < l; i++)
	      v += chr[this.bin[i]];
	    return v;
	  };

	  ByteArray.prototype.writeByte = function (val) {
	    this.bin.push(val);
	  };

	  ByteArray.prototype.writeUTFBytes = function (string) {
	    for (var l = string.length, i = 0; i < l; i++)
	      this.writeByte(string.charCodeAt(i));
	  };

	  ByteArray.prototype.writeBytes = function (array, offset, length) {
	    for (var l = length || array.length, i = offset || 0; i < l; i++)
	      this.writeByte(array[i]);
	  };

	  var exports = {};
	  var width; // image size
	  var height;
	  var transparent = null; // transparent color if given
	  var transIndex; // transparent index in color table
	  var repeat = -1; // no repeat
	  var delay = 0; // frame delay (hundredths)
	  var started = false; // ready to output frames
	  var out;
	  var image; // current frame
	  var pixels; // BGR byte array from frame
	  var indexedPixels; // converted frame indexed to palette
	  var colorDepth; // number of bit planes
	  var colorTab; // RGB palette
	  var usedEntry = []; // active palette entries
	  var palSize = 7; // color table size (bits-1)
	  var dispose = -1; // disposal code (-1 = use default)
	  var closeStream = false; // close stream when finished
	  var firstFrame = true;
	  var sizeSet = false; // if false, get size from first frame
	  var sample = 10; // default sample interval for quantizer
	  var comment = "Generated by jsgif (https://github.com/antimatter15/jsgif/)"; // default comment for generated gif

		/**
		 * Sets the delay time between each frame, or changes it for subsequent frames
		 * (applies to last frame added)
		 * int delay time in milliseconds
		 * @param ms
		 */

	  var setDelay = exports.setDelay = function setDelay(ms) {
	    delay = Math.round(ms / 10);
	  };

		/**
		 * Sets the GIF frame disposal code for the last added frame and any
		 *
		 * subsequent frames. Default is 0 if no transparent color has been set,
		 * otherwise 2.
		 * @param code
		 * int disposal code.
		 */

	  var setDispose = exports.setDispose = function setDispose(code) {
	    if (code >= 0) dispose = code;
	  };

		/**
		 * Sets the number of times the set of GIF frames should be played. Default is
		 * 1; 0 means play indefinitely. Must be invoked before the first image is
		 * added.
		 *
		 * @param iter
		 * int number of iterations.
		 * @return
		 */

	  var setRepeat = exports.setRepeat = function setRepeat(iter) {
	    if (iter >= 0) repeat = iter;
	  };

		/**
		 * Sets the transparent color for the last added frame and any subsequent
		 * frames. Since all colors are subject to modification in the quantization
		 * process, the color in the final palette for each frame closest to the given
		 * color becomes the transparent color for that frame. May be set to null to
		 * indicate no transparent color.
		 * @param
		 * Color to be treated as transparent on display.
		 */

	  var setTransparent = exports.setTransparent = function setTransparent(c) {
	    transparent = c;
	  };


		/**
		 * Sets the comment for the block comment
		 * @param
		 * string to be insterted as comment
		 */

	  var setComment = exports.setComment = function setComment(c) {
	    comment = c;
	  };



		/**
		 * The addFrame method takes an incoming BitmapData object to create each frames
		 * @param
		 * BitmapData object to be treated as a GIF's frame
		 */

	  var addFrame = exports.addFrame = function addFrame(im, is_imageData) {

	    if ((im === null) || !started || out === null) {
	      throw new Error("Please call start method before calling addFrame");
	    }

	    var ok = true;

	    try {
	      if (!is_imageData) {
	        image = im.getImageData(0, 0, im.canvas.width, im.canvas.height).data;
	        if (!sizeSet) setSize(im.canvas.width, im.canvas.height);
	      } else {
	        if (im instanceof ImageData) {
	          image = im.data;
	          if (!sizeset || width != im.width || height != im.height) {
	            setSize(im.width, im.height);
	          } else {

	          }
	        } else if (im instanceof Uint8ClampedArray) {
	          if (im.length == (width * height * 4)) {
	            image = im;
	          } else {
	            console.log("Please set the correct size: ImageData length mismatch");
	            ok = false;
	          }
	        } else {
	          console.log("Please provide correct input");
	          ok = false;
	        }
	      }
	      getImagePixels(); // convert to correct format if necessary
	      analyzePixels(); // build color table & map pixels

	      if (firstFrame) {
	        writeLSD(); // logical screen descriptior
	        writePalette(); // global color table
	        if (repeat >= 0) {
	          // use NS app extension to indicate reps
	          writeNetscapeExt();
	        }
	      }

	      writeGraphicCtrlExt(); // write graphic control extension
	      if (comment !== '') {
	        writeCommentExt(); // write comment extension
	      }
	      writeImageDesc(); // image descriptor
	      if (!firstFrame) writePalette(); // local color table
	      writePixels(); // encode and write pixel data
	      firstFrame = false;
	    } catch (e) {
	      ok = false;
	    }

	    return ok;
	  };

		/**
		* @description: Downloads the encoded gif with the given name
		* No need of any conversion from the stream data (out) to base64
		* Solves the issue of large file sizes when there are more frames
		* and does not involve in creation of any temporary data in the process
		* so no wastage of memory, and speeds up the process of downloading
		* to just calling this function.
		* @parameter {String} filename filename used for downloading the gif
		*/

	  var download = exports.download = function download(filename) {
	    if (out === null || closeStream == false) {
	      console.log("Please call start method and add frames and call finish method before calling download");
	    } else {
	      filename = filename !== undefined ? (filename.endsWith(".gif") ? filename : filename + ".gif") : "download.gif";
	      var templink = document.createElement("a");
	      templink.download = filename;
	      templink.href = URL.createObjectURL(new Blob([new Uint8Array(out.bin)], { type: "image/gif" }));
	      templink.click();
	    }
	  }

		/**
		 * Adds final trailer to the GIF stream, if you don't call the finish method
		 * the GIF stream will not be valid.
		 */

	  var finish = exports.finish = function finish() {

	    if (!started) return false;

	    var ok = true;
	    started = false;

	    try {
	      out.writeByte(0x3b); // gif trailer
	      closeStream = true;
	    } catch (e) {
	      ok = false;
	    }

	    return ok;
	  };

		/**
		 * Resets some members so that a new stream can be started.
		 * This method is actually called by the start method
		 */

	  var reset = function reset() {

	    // reset for subsequent use
	    transIndex = 0;
	    image = null;
	    pixels = null;
	    indexedPixels = null;
	    colorTab = null;
	    closeStream = false;
	    firstFrame = true;
	  };

		/**
		 * * Sets frame rate in frames per second. Equivalent to
		 * <code>setDelay(1000/fps)</code>.
		 * @param fps
		 * float frame rate (frames per second)
		 */

	  var setFrameRate = exports.setFrameRate = function setFrameRate(fps) {
	    if (fps != 0xf) delay = Math.round(100 / fps);
	  };

		/**
		 * Sets quality of color quantization (conversion of images to the maximum 256
		 * colors allowed by the GIF specification). Lower values (minimum = 1)
		 * produce better colors, but slow processing significantly. 10 is the
		 * default, and produces good color mapping at reasonable speeds. Values
		 * greater than 20 do not yield significant improvements in speed.
		 * @param quality
		 * int greater than 0.
		 * @return
		 */

	  var setQuality = exports.setQuality = function setQuality(quality) {
	    if (quality < 1) quality = 1;
	    sample = quality;
	  };

		/**
		 * Sets the GIF frame size. The default size is the size of the first frame
		 * added if this method is not invoked.
		 * @param w
		 * int frame width.
		 * @param h
		 * int frame width.
		 */

	  var setSize = exports.setSize = function setSize(w, h) {

	    if (started && !firstFrame) return;
	    width = w;
	    height = h;
	    if (width < 1) width = 320;
	    if (height < 1) height = 240;
	    sizeSet = true;
	  };

		/**
		 * Initiates GIF file creation on the given stream.
		 * @param os
		 * OutputStream on which GIF images are written.
		 * @return false if initial write failed.
		 */

	  var start = exports.start = function start() {

	    reset();
	    var ok = true;
	    closeStream = false;
	    out = new ByteArray();
	    try {
	      out.writeUTFBytes("GIF89a"); // header
	    } catch (e) {
	      ok = false;
	    }

	    return started = ok;
	  };

	  var cont = exports.cont = function cont() {

	    reset();
	    var ok = true;
	    closeStream = false;
	    out = new ByteArray();

	    return started = ok;
	  };

		/**
		 * Analyzes image colors and creates color map.
		 */

	  var analyzePixels = function analyzePixels() {

	    var len = pixels.length;
	    var nPix = len / 3;
	    indexedPixels = [];
	    var nq = new NeuQuant(pixels, len, sample);

	    // initialize quantizer
	    colorTab = nq.process(); // create reduced palette

	    // map image pixels to new palette
	    var k = 0;
	    for (var j = 0; j < nPix; j++) {
	      var index = nq.map(pixels[k++] & 0xff, pixels[k++] & 0xff, pixels[k++] & 0xff);
	      usedEntry[index] = true;
	      indexedPixels[j] = index;
	    }

	    pixels = null;
	    colorDepth = 8;
	    palSize = 7;

	    // get closest match to transparent color if specified
	    if (transparent !== null) {
	      transIndex = findClosest(transparent);
	    }
	  };

		/**
		 * Returns index of palette color closest to c
		 */

	  var findClosest = function findClosest(c) {

	    if (colorTab === null) return -1;
	    var r = (c & 0xFF0000) >> 16;
	    var g = (c & 0x00FF00) >> 8;
	    var b = (c & 0x0000FF);
	    var minpos = 0;
	    var dmin = 256 * 256 * 256;
	    var len = colorTab.length;

	    for (var i = 0; i < len;) {
	      var dr = r - (colorTab[i++] & 0xff);
	      var dg = g - (colorTab[i++] & 0xff);
	      var db = b - (colorTab[i] & 0xff);
	      var d = dr * dr + dg * dg + db * db;
	      var index = i / 3;
	      if (usedEntry[index] && (d < dmin)) {
	        dmin = d;
	        minpos = index;
	      }
	      i++;
	    }
	    return minpos;
	  };

		/**
		 * Extracts image pixels into byte array "pixels
		 */

	  var getImagePixels = function getImagePixels() {
	    var w = width;
	    var h = height;
	    pixels = [];
	    var data = image;
	    var count = 0;

	    for (var i = 0; i < h; i++) {

	      for (var j = 0; j < w; j++) {

	        var b = (i * w * 4) + j * 4;
	        pixels[count++] = data[b];
	        pixels[count++] = data[b + 1];
	        pixels[count++] = data[b + 2];

	      }

	    }
	  };

		/**
		 * Writes Graphic Control Extension
		 */

	  var writeGraphicCtrlExt = function writeGraphicCtrlExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xf9); // GCE label
	    out.writeByte(4); // data block size
	    var transp;
	    var disp;
	    if (transparent === null) {
	      transp = 0;
	      disp = 0; // dispose = no action
	    } else {
	      transp = 1;
	      disp = 2; // force clear if using transparent color
	    }
	    if (dispose >= 0) {
	      disp = dispose & 7; // user override
	    }
	    disp <<= 2;
	    // packed fields
	    out.writeByte(0 | // 1:3 reserved
	      disp | // 4:6 disposal
	      0 | // 7 user input - 0 = none
	      transp); // 8 transparency flag

	    WriteShort(delay); // delay x 1/100 sec
	    out.writeByte(transIndex); // transparent color index
	    out.writeByte(0); // block terminator
	  };

		/**
		 * Writes Comment Extention
		 */

	  var writeCommentExt = function writeCommentExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xfe); // comment label
	    out.writeByte(comment.length); // Block Size (s)
	    out.writeUTFBytes(comment);
	    out.writeByte(0); // block terminator
	  };


		/**
		 * Writes Image Descriptor
		 */

	  var writeImageDesc = function writeImageDesc() {

	    out.writeByte(0x2c); // image separator
	    WriteShort(0); // image position x,y = 0,0
	    WriteShort(0);
	    WriteShort(width); // image size
	    WriteShort(height);

	    // packed fields
	    if (firstFrame) {
	      // no LCT - GCT is used for first (or only) frame
	      out.writeByte(0);
	    } else {
	      // specify normal LCT
	      out.writeByte(0x80 | // 1 local color table 1=yes
	        0 | // 2 interlace - 0=no
	        0 | // 3 sorted - 0=no
	        0 | // 4-5 reserved
	        palSize); // 6-8 size of color table
	    }
	  };

		/**
		 * Writes Logical Screen Descriptor
		 */

	  var writeLSD = function writeLSD() {

	    // logical screen size
	    WriteShort(width);
	    WriteShort(height);
	    // packed fields
	    out.writeByte((0x80 | // 1 : global color table flag = 1 (gct used)
	      0x70 | // 2-4 : color resolution = 7
	      0x00 | // 5 : gct sort flag = 0
	      palSize)); // 6-8 : gct size

	    out.writeByte(0); // background color index
	    out.writeByte(0); // pixel aspect ratio - assume 1:1
	  };

		/**
		 * Writes Netscape application extension to define repeat count.
		 */

	  var writeNetscapeExt = function writeNetscapeExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xff); // app extension label
	    out.writeByte(11); // block size
	    out.writeUTFBytes("NETSCAPE" + "2.0"); // app id + auth code
	    out.writeByte(3); // sub-block size
	    out.writeByte(1); // loop sub-block id
	    WriteShort(repeat); // loop count (extra iterations, 0=repeat forever)
	    out.writeByte(0); // block terminator
	  };

		/**
		 * Writes color table
		 */

	  var writePalette = function writePalette() {
	    out.writeBytes(colorTab);
	    var n = (3 * 256) - colorTab.length;
	    for (var i = 0; i < n; i++) out.writeByte(0);
	  };

	  var WriteShort = function WriteShort(pValue) {
	    out.writeByte(pValue & 0xFF);
	    out.writeByte((pValue >> 8) & 0xFF);
	  };

		/**
		 * Encodes and writes pixel data
		 */

	  var writePixels = function writePixels() {
	    var myencoder = new LZWEncoder(width, height, indexedPixels, colorDepth);
	    myencoder.encode(out);
	  };

		/**
		 * Retrieves the GIF stream
		 */

	  var stream = exports.stream = function stream() {
	    return out;
	  };

	  var setProperties = exports.setProperties = function setProperties(has_start, is_first) {
	    started = has_start;
	    firstFrame = is_first;
	  };

	  return exports;

	};

	module.exports = GIFEncoder;

	/**
	 * This class handles LZW encoding
	 * Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	LZWEncoder = function () {

	  var exports = {};
	  var EOF = -1;
	  var imgW;
	  var imgH;
	  var pixAry;
	  var initCodeSize;
	  var remaining;
	  var curPixel;

	  // GIFCOMPR.C - GIF Image compression routines
	  // Lempel-Ziv compression based on 'compress'. GIF modifications by
	  // David Rowley (mgardi@watdcsu.waterloo.edu)
	  // General DEFINEs

	  var BITS = 12;
	  var HSIZE = 5003; // 80% occupancy

	  // GIF Image compression - modified 'compress'
	  // Based on: compress.c - File compression ala IEEE Computer, June 1984.
	  // By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
	  // Jim McKie (decvax!mcvax!jim)
	  // Steve Davies (decvax!vax135!petsd!peora!srd)
	  // Ken Turkowski (decvax!decwrl!turtlevax!ken)
	  // James A. Woods (decvax!ihnp4!ames!jaw)
	  // Joe Orost (decvax!vax135!petsd!joe)

	  var n_bits; // number of bits/code
	  var maxbits = BITS; // user settable max # bits/code
	  var maxcode; // maximum code, given n_bits
	  var maxmaxcode = 1 << BITS; // should NEVER generate this code
	  var htab = [];
	  var codetab = [];
	  var hsize = HSIZE; // for dynamic table sizing
	  var free_ent = 0; // first unused entry

	  // block compression parameters -- after all codes are used up,
	  // and compression rate changes, start over.

	  var clear_flg = false;

	  // Algorithm: use open addressing double hashing (no chaining) on the
	  // prefix code / next character combination. We do a variant of Knuth's
	  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
	  // secondary probe. Here, the modular division first probe is gives way
	  // to a faster exclusive-or manipulation. Also do block compression with
	  // an adaptive reset, whereby the code table is cleared when the compression
	  // ratio decreases, but after the table fills. The variable-length output
	  // codes are re-sized at this point, and a special CLEAR code is generated
	  // for the decompressor. Late addition: construct the table according to
	  // file size for noticeable speed improvement on small files. Please direct
	  // questions about this implementation to ames!jaw.

	  var g_init_bits;
	  var ClearCode;
	  var EOFCode;

	  // output
	  // Output the given code.
	  // Inputs:
	  // code: A n_bits-bit integer. If == -1, then EOF. This assumes
	  // that n_bits =< wordsize - 1.
	  // Outputs:
	  // Outputs code to the file.
	  // Assumptions:
	  // Chars are 8 bits long.
	  // Algorithm:
	  // Maintain a BITS character long buffer (so that 8 codes will
	  // fit in it exactly). Use the VAX insv instruction to insert each
	  // code in turn. When the buffer fills up empty it and start over.

	  var cur_accum = 0;
	  var cur_bits = 0;
	  var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

	  // Number of characters so far in this 'packet'
	  var a_count;

	  // Define the storage for the packet accumulator
	  var accum = [];

	  var LZWEncoder = exports.LZWEncoder = function LZWEncoder(width, height, pixels, color_depth) {
	    imgW = width;
	    imgH = height;
	    pixAry = pixels;
	    initCodeSize = Math.max(2, color_depth);
	  };

	  // Add a character to the end of the current packet, and if it is 254
	  // characters, flush the packet to disk.
	  var char_out = function char_out(c, outs) {
	    accum[a_count++] = c;
	    if (a_count >= 254) flush_char(outs);
	  };

	  // Clear out the hash table
	  // table clear for block compress

	  var cl_block = function cl_block(outs) {
	    cl_hash(hsize);
	    free_ent = ClearCode + 2;
	    clear_flg = true;
	    output(ClearCode, outs);
	  };

	  // reset code table
	  var cl_hash = function cl_hash(hsize) {
	    for (var i = 0; i < hsize; ++i) htab[i] = -1;
	  };

	  var compress = exports.compress = function compress(init_bits, outs) {

	    var fcode;
	    var i; /* = 0 */
	    var c;
	    var ent;
	    var disp;
	    var hsize_reg;
	    var hshift;

	    // Set up the globals: g_init_bits - initial number of bits
	    g_init_bits = init_bits;

	    // Set up the necessary values
	    clear_flg = false;
	    n_bits = g_init_bits;
	    maxcode = MAXCODE(n_bits);

	    ClearCode = 1 << (init_bits - 1);
	    EOFCode = ClearCode + 1;
	    free_ent = ClearCode + 2;

	    a_count = 0; // clear packet

	    ent = nextPixel();

	    hshift = 0;
	    for (fcode = hsize; fcode < 65536; fcode *= 2)
	      ++hshift;
	    hshift = 8 - hshift; // set hash code range bound

	    hsize_reg = hsize;
	    cl_hash(hsize_reg); // clear hash table

	    output(ClearCode, outs);

	    outer_loop: while ((c = nextPixel()) != EOF) {
	      fcode = (c << maxbits) + ent;
	      i = (c << hshift) ^ ent; // xor hashing

	      if (htab[i] == fcode) {
	        ent = codetab[i];
	        continue;
	      }

	      else if (htab[i] >= 0) { // non-empty slot

	        disp = hsize_reg - i; // secondary hash (after G. Knott)
	        if (i === 0) disp = 1;

	        do {
	          if ((i -= disp) < 0)
	            i += hsize_reg;

	          if (htab[i] == fcode) {
	            ent = codetab[i];
	            continue outer_loop;
	          }
	        } while (htab[i] >= 0);
	      }

	      output(ent, outs);
	      ent = c;
	      if (free_ent < maxmaxcode) {
	        codetab[i] = free_ent++; // code -> hashtable
	        htab[i] = fcode;
	      }
	      else cl_block(outs);
	    }

	    // Put out the final code.
	    output(ent, outs);
	    output(EOFCode, outs);
	  };

	  // ----------------------------------------------------------------------------
	  var encode = exports.encode = function encode(os) {
	    os.writeByte(initCodeSize); // write "initial code size" byte
	    remaining = imgW * imgH; // reset navigation variables
	    curPixel = 0;
	    compress(initCodeSize + 1, os); // compress and write the pixel data
	    os.writeByte(0); // write block terminator
	  };

	  // Flush the packet to disk, and reset the accumulator
	  var flush_char = function flush_char(outs) {
	    if (a_count > 0) {
	      outs.writeByte(a_count);
	      outs.writeBytes(accum, 0, a_count);
	      a_count = 0;
	    }
	  };

	  var MAXCODE = function MAXCODE(n_bits) {
	    return (1 << n_bits) - 1;
	  };

	  // ----------------------------------------------------------------------------
	  // Return the next pixel from the image
	  // ----------------------------------------------------------------------------

	  var nextPixel = function nextPixel() {
	    if (remaining === 0) return EOF;
	    --remaining;
	    var pix = pixAry[curPixel++];
	    return pix & 0xff;
	  };

	  var output = function output(code, outs) {

	    cur_accum &= masks[cur_bits];

	    if (cur_bits > 0) cur_accum |= (code << cur_bits);
	    else cur_accum = code;

	    cur_bits += n_bits;

	    while (cur_bits >= 8) {
	      char_out((cur_accum & 0xff), outs);
	      cur_accum >>= 8;
	      cur_bits -= 8;
	    }

	    // If the next entry is going to be too big for the code size,
	    // then increase it, if possible.

	    if (free_ent > maxcode || clear_flg) {

	      if (clear_flg) {

	        maxcode = MAXCODE(n_bits = g_init_bits);
	        clear_flg = false;

	      } else {

	        ++n_bits;
	        if (n_bits == maxbits) maxcode = maxmaxcode;
	        else maxcode = MAXCODE(n_bits);
	      }
	    }

	    if (code == EOFCode) {

	      // At EOF, write the rest of the buffer.
	      while (cur_bits > 0) {
	        char_out((cur_accum & 0xff), outs);
	        cur_accum >>= 8;
	        cur_bits -= 8;
	      }

	      flush_char(outs);
	    }
	  };

	  LZWEncoder.apply(this, arguments);
	  return exports;
	};

	/*
	 * NeuQuant Neural-Net Quantization Algorithm
	 * ------------------------------------------
	 *
	 * Copyright (c) 1994 Anthony Dekker
	 *
	 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
	 * "Kohonen neural networks for optimal colour quantization" in "Network:
	 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
	 * the algorithm.
	 *
	 * Any party obtaining a copy of these files from the author, directly or
	 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
	 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
	 * this software and documentation files (the "Software"), including without
	 * limitation the rights to use, copy, modify, merge, publish, distribute,
	 * sublicense, and/or sell copies of the Software, and to permit persons who
	 * receive copies from any such party to do so, with the only requirement being
	 * that this copyright notice remain intact.
	 */

	/*
	 * This class handles Neural-Net quantization algorithm
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	NeuQuant = function () {

	  var exports = {};
	  var netsize = 256; /* number of colours used */

	  /* four primes near 500 - assume no image has a length so large */
	  /* that it is divisible by all four primes */

	  var prime1 = 499;
	  var prime2 = 491;
	  var prime3 = 487;
	  var prime4 = 503;
	  var minpicturebytes = (3 * prime4); /* minimum size for input image */

		/*
		 * Program Skeleton ---------------- [select samplefac in range 1..30] [read
		 * image from input file] pic = (unsigned char*) malloc(3*width*height);
		 * initnet(pic,3*width*height,samplefac); learn(); unbiasnet(); [write output
		 * image header, using writecolourmap(f)] inxbuild(); write output image using
		 * inxsearch(b,g,r)
		 */

		/*
		 * Network Definitions -------------------
		 */

	  var maxnetpos = (netsize - 1);
	  var netbiasshift = 4; /* bias for colour values */
	  var ncycles = 100; /* no. of learning cycles */

	  /* defs for freq and bias */
	  var intbiasshift = 16; /* bias for fractions */
	  var intbias = (1 << intbiasshift);
	  var gammashift = 10; /* gamma = 1024 */
	  var gamma = (1 << gammashift);
	  var betashift = 10;
	  var beta = (intbias >> betashift); /* beta = 1/1024 */
	  var betagamma = (intbias << (gammashift - betashift));

	  /* defs for decreasing radius factor */
	  var initrad = (netsize >> 3); /* for 256 cols, radius starts */
	  var radiusbiasshift = 6; /* at 32.0 biased by 6 bits */
	  var radiusbias = (1 << radiusbiasshift);
	  var initradius = (initrad * radiusbias); /* and decreases by a */
	  var radiusdec = 30; /* factor of 1/30 each cycle */

	  /* defs for decreasing alpha factor */
	  var alphabiasshift = 10; /* alpha starts at 1.0 */
	  var initalpha = (1 << alphabiasshift);
	  var alphadec; /* biased by 10 bits */

	  /* radbias and alpharadbias used for radpower calculation */
	  var radbiasshift = 8;
	  var radbias = (1 << radbiasshift);
	  var alpharadbshift = (alphabiasshift + radbiasshift);
	  var alpharadbias = (1 << alpharadbshift);

		/*
		 * Types and Global Variables --------------------------
		 */

	  var thepicture; /* the input image itself */
	  var lengthcount; /* lengthcount = H*W*3 */
	  var samplefac; /* sampling factor 1..30 */

	  // typedef int pixel[4]; /* BGRc */
	  var network; /* the network itself - [netsize][4] */
	  var netindex = [];

	  /* for network lookup - really 256 */
	  var bias = [];

	  /* bias and freq arrays for learning */
	  var freq = [];
	  var radpower = [];

	  var NeuQuant = exports.NeuQuant = function NeuQuant(thepic, len, sample) {

	    var i;
	    var p;

	    thepicture = thepic;
	    lengthcount = len;
	    samplefac = sample;

	    network = new Array(netsize);

	    for (i = 0; i < netsize; i++) {

	      network[i] = new Array(4);
	      p = network[i];
	      p[0] = p[1] = p[2] = (i << (netbiasshift + 8)) / netsize;
	      freq[i] = intbias / netsize; /* 1/netsize */
	      bias[i] = 0;
	    }
	  };

	  var colorMap = function colorMap() {

	    var map = [];
	    var index = new Array(netsize);

	    for (var i = 0; i < netsize; i++)
	      index[network[i][3]] = i;

	    var k = 0;
	    for (var l = 0; l < netsize; l++) {
	      var j = index[l];
	      map[k++] = (network[j][0]);
	      map[k++] = (network[j][1]);
	      map[k++] = (network[j][2]);
	    }

	    return map;
	  };

		/*
		 * Insertion sort of network and building of netindex[0..255] (to do after
		 * unbias)
		 * -------------------------------------------------------------------------------
		 */

	  var inxbuild = function inxbuild() {

	    var i;
	    var j;
	    var smallpos;
	    var smallval;
	    var p;
	    var q;
	    var previouscol;
	    var startpos;

	    previouscol = 0;
	    startpos = 0;
	    for (i = 0; i < netsize; i++) {

	      p = network[i];
	      smallpos = i;
	      smallval = p[1]; /* index on g */

	      /* find smallest in i..netsize-1 */
	      for (j = i + 1; j < netsize; j++) {

	        q = network[j];
	        if (q[1] < smallval) { /* index on g */
	          smallpos = j;
	          smallval = q[1]; /* index on g */
	        }
	      }
	      q = network[smallpos];

	      /* swap p (i) and q (smallpos) entries */
	      if (i != smallpos) {
	        j = q[0];
	        q[0] = p[0];
	        p[0] = j;
	        j = q[1];
	        q[1] = p[1];
	        p[1] = j;
	        j = q[2];
	        q[2] = p[2];
	        p[2] = j;
	        j = q[3];
	        q[3] = p[3];
	        p[3] = j;
	      }

	      /* smallval entry is now in position i */

	      if (smallval != previouscol) {

	        netindex[previouscol] = (startpos + i) >> 1;

	        for (j = previouscol + 1; j < smallval; j++) netindex[j] = i;

	        previouscol = smallval;
	        startpos = i;
	      }
	    }

	    netindex[previouscol] = (startpos + maxnetpos) >> 1;
	    for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos; /* really 256 */
	  };

		/*
		 * Main Learning Loop ------------------
		 */

	  var learn = function learn() {

	    var i;
	    var j;
	    var b;
	    var g;
	    var r;
	    var radius;
	    var rad;
	    var alpha;
	    var step;
	    var delta;
	    var samplepixels;
	    var p;
	    var pix;
	    var lim;

	    if (lengthcount < minpicturebytes) samplefac = 1;

	    alphadec = 30 + ((samplefac - 1) / 3);
	    p = thepicture;
	    pix = 0;
	    lim = lengthcount;
	    samplepixels = lengthcount / (3 * samplefac);
	    delta = (samplepixels / ncycles) | 0;
	    alpha = initalpha;
	    radius = initradius;

	    rad = radius >> radiusbiasshift;
	    if (rad <= 1) rad = 0;

	    for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));

	    if (lengthcount < minpicturebytes) step = 3;

	    else if ((lengthcount % prime1) !== 0) step = 3 * prime1;

	    else {

	      if ((lengthcount % prime2) !== 0) step = 3 * prime2;
	      else {
	        if ((lengthcount % prime3) !== 0) step = 3 * prime3;
	        else step = 3 * prime4;
	      }
	    }

	    i = 0;
	    while (i < samplepixels) {

	      b = (p[pix + 0] & 0xff) << netbiasshift;
	      g = (p[pix + 1] & 0xff) << netbiasshift;
	      r = (p[pix + 2] & 0xff) << netbiasshift;
	      j = contest(b, g, r);

	      altersingle(alpha, j, b, g, r);
	      if (rad !== 0) alterneigh(rad, j, b, g, r); /* alter neighbours */

	      pix += step;
	      if (pix >= lim) pix -= lengthcount;

	      i++;

	      if (delta === 0) delta = 1;

	      if (i % delta === 0) {
	        alpha -= alpha / alphadec;
	        radius -= radius / radiusdec;
	        rad = radius >> radiusbiasshift;

	        if (rad <= 1) rad = 0;

	        for (j = 0; j < rad; j++) radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
	      }
	    }
	  };

		/*
		 ** Search for BGR values 0..255 (after net is unbiased) and return colour
		 * index
		 * ----------------------------------------------------------------------------
		 */

	  var map = exports.map = function map(b, g, r) {

	    var i;
	    var j;
	    var dist;
	    var a;
	    var bestd;
	    var p;
	    var best;

	    bestd = 1000; /* biggest possible dist is 256*3 */
	    best = -1;
	    i = netindex[g]; /* index on g */
	    j = i - 1; /* start at netindex[g] and work outwards */

	    while ((i < netsize) || (j >= 0)) {

	      if (i < netsize) {
	        p = network[i];
	        dist = p[1] - g; /* inx key */

	        if (dist >= bestd) i = netsize; /* stop iter */

	        else {

	          i++;
	          if (dist < 0) dist = -dist;
	          a = p[0] - b;
	          if (a < 0) a = -a;
	          dist += a;

	          if (dist < bestd) {
	            a = p[2] - r;
	            if (a < 0) a = -a;
	            dist += a;

	            if (dist < bestd) {
	              bestd = dist;
	              best = p[3];
	            }
	          }
	        }
	      }

	      if (j >= 0) {

	        p = network[j];
	        dist = g - p[1]; /* inx key - reverse dif */

	        if (dist >= bestd) j = -1; /* stop iter */

	        else {

	          j--;
	          if (dist < 0) dist = -dist;
	          a = p[0] - b;
	          if (a < 0) a = -a;
	          dist += a;

	          if (dist < bestd) {
	            a = p[2] - r;
	            if (a < 0) a = -a;
	            dist += a;
	            if (dist < bestd) {
	              bestd = dist;
	              best = p[3];
	            }
	          }
	        }
	      }
	    }

	    return (best);
	  };

	  var process = exports.process = function process() {
	    learn();
	    unbiasnet();
	    inxbuild();
	    return colorMap();
	  };

		/*
		 * Unbias network to give byte values 0..255 and record position i to prepare
		 * for sort
		 * -----------------------------------------------------------------------------------
		 */

	  var unbiasnet = function unbiasnet() {

	    var i;
	    var j;

	    for (i = 0; i < netsize; i++) {
	      network[i][0] >>= netbiasshift;
	      network[i][1] >>= netbiasshift;
	      network[i][2] >>= netbiasshift;
	      network[i][3] = i; /* record colour no */
	    }
	  };

		/*
		 * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in
		 * radpower[|i-j|]
		 * ---------------------------------------------------------------------------------
		 */

	  var alterneigh = function alterneigh(rad, i, b, g, r) {

	    var j;
	    var k;
	    var lo;
	    var hi;
	    var a;
	    var m;
	    var p;

	    lo = i - rad;
	    if (lo < -1) lo = -1;

	    hi = i + rad;
	    if (hi > netsize) hi = netsize;

	    j = i + 1;
	    k = i - 1;
	    m = 1;

	    while ((j < hi) || (k > lo)) {
	      a = radpower[m++];

	      if (j < hi) {
	        p = network[j++];

	        try {
	          p[0] -= (a * (p[0] - b)) / alpharadbias;
	          p[1] -= (a * (p[1] - g)) / alpharadbias;
	          p[2] -= (a * (p[2] - r)) / alpharadbias;
	        } catch (e) { } // prevents 1.3 miscompilation
	      }

	      if (k > lo) {
	        p = network[k--];

	        try {
	          p[0] -= (a * (p[0] - b)) / alpharadbias;
	          p[1] -= (a * (p[1] - g)) / alpharadbias;
	          p[2] -= (a * (p[2] - r)) / alpharadbias;
	        } catch (e) { }
	      }
	    }
	  };

		/*
		 * Move neuron i towards biased (b,g,r) by factor alpha
		 * ----------------------------------------------------
		 */

	  var altersingle = function altersingle(alpha, i, b, g, r) {

	    /* alter hit neuron */
	    var n = network[i];
	    n[0] -= (alpha * (n[0] - b)) / initalpha;
	    n[1] -= (alpha * (n[1] - g)) / initalpha;
	    n[2] -= (alpha * (n[2] - r)) / initalpha;
	  };

		/*
		 * Search for biased BGR values ----------------------------
		 */

	  var contest = function contest(b, g, r) {

	    /* finds closest neuron (min dist) and updates freq */
	    /* finds best neuron (min dist-bias) and returns position */
	    /* for frequently chosen neurons, freq[i] is high and bias[i] is negative */
	    /* bias[i] = gamma*((1/netsize)-freq[i]) */

	    var i;
	    var dist;
	    var a;
	    var biasdist;
	    var betafreq;
	    var bestpos;
	    var bestbiaspos;
	    var bestd;
	    var bestbiasd;
	    var n;

	    bestd = ~(1 << 31);
	    bestbiasd = bestd;
	    bestpos = -1;
	    bestbiaspos = bestpos;

	    for (i = 0; i < netsize; i++) {
	      n = network[i];
	      dist = n[0] - b;
	      if (dist < 0) dist = -dist;
	      a = n[1] - g;
	      if (a < 0) a = -a;
	      dist += a;
	      a = n[2] - r;
	      if (a < 0) a = -a;
	      dist += a;

	      if (dist < bestd) {
	        bestd = dist;
	        bestpos = i;
	      }

	      biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));

	      if (biasdist < bestbiasd) {
	        bestbiasd = biasdist;
	        bestbiaspos = i;
	      }

	      betafreq = (freq[i] >> betashift);
	      freq[i] -= betafreq;
	      bias[i] += (betafreq << gammashift);
	    }

	    freq[bestpos] += beta;
	    bias[bestpos] -= betagamma;
	    return (bestbiaspos);
	  };

	  NeuQuant.apply(this, arguments);
	  return exports;
	};


/***/ }
/******/ ])
});
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Random = /** @class */ (function () {
    function Random() {
        this.setSeed();
    }
    Random.prototype.get = function (fromOrTo, to) {
        if (fromOrTo === void 0) { fromOrTo = 1; }
        if (to === void 0) { to = null; }
        if (to == null) {
            to = fromOrTo;
            fromOrTo = 0;
        }
        return this.getToMaxInt() / 0x7fffffff * (to - fromOrTo) + fromOrTo;
    };
    Random.prototype.getInt = function (fromOrTo, to) {
        if (fromOrTo === void 0) { fromOrTo = 1; }
        if (to === void 0) { to = null; }
        return Math.floor(this.get(fromOrTo, to));
    };
    Random.prototype.getPm = function () {
        return this.getInt(2) * 2 - 1;
    };
    Random.prototype.select = function (values) {
        return values[this.getInt(values.length)];
    };
    Random.prototype.setSeed = function (v) {
        if (v === void 0) { v = -0x7fffffff; }
        if (v === -0x7fffffff) {
            v = Math.floor(Math.random() * 0x7fffffff);
        }
        this.x = v = 1812433253 * (v ^ (v >> 30));
        this.y = v = 1812433253 * (v ^ (v >> 30)) + 1;
        this.z = v = 1812433253 * (v ^ (v >> 30)) + 2;
        this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
        return this;
    };
    Random.prototype.getToMaxInt = function () {
        var t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
        return this.w;
    };
    return Random;
}());
exports.default = Random;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = Tone;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var g = __webpack_require__(1);
var sound_1 = __webpack_require__(5);
exports.isPressed = false;
exports.isJustPressed = false;
exports.isCursorDown = false;
var canvas;
var pixelSize;
var isInitialized = false;
var isUsingStickKeysAsButton;
var isKeyPressing = _.times(256, function () { return false; });
var stickKeys = [[39, 68, 102], [40, 83, 101, 98], [37, 65, 100], [38, 87, 104]];
var stickXys = [[1, 0], [0, 1], [-1, 0], [0, -1]];
var buttonKeys = [90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 17, 16, 18, 32, 13];
function init(_canvas, _pixelSize) {
    canvas = _canvas;
    pixelSize = _pixelSize;
    document.onmousedown = function (e) {
        onCursorDown(e.pageX, e.pageY);
    };
    document.ontouchstart = function (e) {
        e.preventDefault();
        sound_1.playEmptySound();
        onCursorDown(e.touches[0].pageX, e.touches[0].pageY);
    };
    document.onmousemove = function (e) {
        onCursorMove(e.pageX, e.pageY);
    };
    document.ontouchmove = function (e) {
        e.preventDefault();
        onCursorMove(e.touches[0].pageX, e.touches[0].pageY);
    };
    document.onmouseup = function (e) {
        onCursorUp(e);
    };
    document.ontouchend = function (e) {
        e.preventDefault();
        onCursorUp(e);
    };
    document.onkeydown = function (e) {
        isKeyPressing[e.keyCode] = true;
    };
    document.onkeyup = function (e) {
        isKeyPressing[e.keyCode] = false;
    };
    exports.cursorPos = g.p.createVector();
    exports.stick = g.p.createVector();
    isInitialized = true;
}
exports.init = init;
function useStickKeyAsButton(_isUsingStickKeysAsButton) {
    if (_isUsingStickKeysAsButton === void 0) { _isUsingStickKeysAsButton = true; }
    isUsingStickKeysAsButton = _isUsingStickKeysAsButton;
}
exports.useStickKeyAsButton = useStickKeyAsButton;
function clearJustPressed() {
    exports.isJustPressed = false;
    exports.isPressed = true;
}
exports.clearJustPressed = clearJustPressed;
function update() {
    if (!isInitialized) {
        return;
    }
    var pp = exports.isPressed;
    exports.isPressed = exports.isCursorDown;
    exports.stick.set();
    _.forEach(stickKeys, function (ks, i) {
        _.forEach(ks, function (k) {
            if (isKeyPressing[k]) {
                exports.stick.x += stickXys[i][0];
                exports.stick.y += stickXys[i][1];
                if (isUsingStickKeysAsButton) {
                    exports.isPressed = true;
                }
                return false;
            }
        });
    });
    exports.stickAngle = 0;
    if (exports.stick.magSq() > 0) {
        exports.stickAngle = g.wrap(Math.round(g.Vector.getAngle(exports.stick) / g.p.HALF_PI * 2), 0, 8);
        exports.stick.set();
        g.Vector.addAngle(exports.stick, exports.stickAngle * g.p.HALF_PI / 2, 1);
        exports.stickAngle++;
    }
    _.forEach(buttonKeys, function (k) {
        if (isKeyPressing[k]) {
            exports.isPressed = true;
            return false;
        }
    });
    exports.isJustPressed = (!pp && exports.isPressed);
}
exports.update = update;
function onCursorDown(x, y) {
    calcCursorPos(x, y, exports.cursorPos);
    exports.isCursorDown = true;
}
function onCursorMove(x, y) {
    calcCursorPos(x, y, exports.cursorPos);
}
function calcCursorPos(x, y, v) {
    v.x = ((x - canvas.offsetLeft) / canvas.clientWidth + 0.5) * pixelSize.x;
    v.y = ((y - canvas.offsetTop) / canvas.clientHeight + 0.5) * pixelSize.y;
}
function onCursorUp(e) {
    exports.isCursorDown = false;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var pag = __webpack_require__(2);
var g = __webpack_require__(1);
var dotPatterns;
var charToIndex;
function init() {
    var letterCount = 66;
    var letterPatterns = [
        0x4644AAA4, 0x6F2496E4, 0xF5646949, 0x167871F4, 0x2489F697,
        0xE9669696, 0x79F99668, 0x91967979, 0x1F799976, 0x1171FF17,
        0xF99ED196, 0xEE444E99, 0x53592544, 0xF9F11119, 0x9DDB9999,
        0x79769996, 0x7ED99611, 0x861E9979, 0x994444E7, 0x46699699,
        0x6996FD99, 0xF4469999, 0x2224F248, 0x26244424, 0x64446622,
        0x84284248, 0x40F0F024, 0x0F0044E4, 0x480A4E40, 0x9A459124,
        0x000A5A16, 0x640444F0, 0x80004049, 0x40400004, 0x44444040,
        0x0AA00044, 0x6476E400, 0xFAFA61D9, 0xE44E4EAA, 0x24F42445,
        0xF244E544, 0x00000042
    ];
    var p = 0;
    var d = 32;
    var pIndex = 0;
    dotPatterns = [];
    for (var i = 0; i < letterCount; i++) {
        var dots = [];
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 4; x++) {
                if (++d >= 32) {
                    p = letterPatterns[pIndex++];
                    d = 0;
                }
                if ((p & 1) > 0) {
                    dots.push({ x: x, y: y });
                }
                p >>= 1;
            }
        }
        dotPatterns.push(dots);
    }
    var charStr = "()[]<>=+-*/%&_!?,.:|'\"$@#\\urdl";
    charToIndex = [];
    for (var c = 0; c < 128; c++) {
        var li = -2;
        if (c == 32) {
            li = -1;
        }
        else if (c >= 48 && c < 58) {
            li = c - 48;
        }
        else if (c >= 65 && c < 90) {
            li = c - 65 + 10;
        }
        else {
            var ci = charStr.indexOf(String.fromCharCode(c));
            if (ci >= 0) {
                li = ci + 36;
            }
        }
        charToIndex.push(li);
    }
}
exports.init = init;
var Align;
(function (Align) {
    Align[Align["left"] = 0] = "left";
    Align[Align["right"] = 1] = "right";
})(Align = exports.Align || (exports.Align = {}));
function draw(str, x, y, align, fillStyle, game) {
    if (align === void 0) { align = null; }
    if (fillStyle === void 0) { fillStyle = 'white'; }
    if (game === void 0) { game = g.game; }
    var context = game.screen.context;
    context.fillStyle = fillStyle;
    if (align === Align.left) {
    }
    else if (align === Align.right) {
        x -= str.length * 5;
    }
    else {
        x -= str.length * 5 / 2;
    }
    x = Math.floor(x);
    y = Math.floor(y);
    for (var i = 0; i < str.length; i++) {
        var idx = charToIndex[str.charCodeAt(i)];
        if (idx === -2) {
            console.error("invalid char: " + str.charAt(i));
        }
        else if (idx >= 0) {
            drawLetter(context, idx, x, y);
        }
        x += 5;
    }
}
exports.draw = draw;
function drawLetter(context, idx, x, y) {
    var p = dotPatterns[idx];
    for (var i = 0; i < p.length; i++) {
        var d = p[i];
        context.fillRect(d.x + x, d.y + y, 1, 1);
    }
}
var textPixels = {};
function drawScaled(str, scale, x, y, hue, game) {
    if (hue === void 0) { hue = null; }
    if (game === void 0) { game = g.game; }
    var pixels = generatePixels(str, scale, hue);
    pag.draw(game.screen.context, pixels, x, y);
}
exports.drawScaled = drawScaled;
function generatePixels(str, scale, hue) {
    if (hue === void 0) { hue = null; }
    var key = str + "_" + scale + "_" + hue;
    if (textPixels.hasOwnProperty(key)) {
        return textPixels[key];
    }
    var pixelArray = _.times(Math.ceil(5 * scale), function () {
        return _.times(Math.ceil(5 * str.length * scale), function () { return ' '; });
    });
    _.times(str.length, function (i) {
        var idx = charToIndex[str.charCodeAt(i)];
        if (idx === -2) {
            throw "invalid char: " + str.charAt(i);
        }
        else if (idx >= 0) {
            drawToPixelArray(pixelArray, idx, i * 5 * scale, scale);
        }
    });
    var paw = pixelArray[0].length;
    var pah = pixelArray.length;
    _.times(pah, function (y) {
        _.times(paw, function (x) {
            if (pixelArray[y][x] === 'x' && isEdgePixel(x, y, pixelArray, paw, pah)) {
                pixelArray[y][x] = 'o';
            }
        });
    });
    var pagOptions = {
        isMirrorY: false, scale: 1, rotationNum: 1, colorLighting: 0.33
    };
    if (hue != null) {
        pagOptions.hue = hue;
    }
    var pixels = pag.generate(_.map(pixelArray, function (line) { return line.join(''); }), pagOptions);
    textPixels[key] = pixels;
    return pixels;
}
function drawToPixelArray(pixelArray, idx, ox, scale) {
    var p = dotPatterns[idx];
    _.forEach(p, function (d) {
        for (var y = d.y * scale; y < (d.y + 1) * scale; y++) {
            for (var x = d.x * scale; x < (d.x + 1) * scale; x++) {
                pixelArray[Math.round(y)][Math.round(x + ox)] = 'x';
            }
        }
    });
}
function isEdgePixel(x, y, pixelArray, w, h) {
    if (x <= 0 || x >= w - 1 || y <= 0 || y >= h - 1) {
        return true;
    }
    var offsets = [1, 0, 1, 1, 0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1];
    for (var i = 0; i < 8; i++) {
        if (pixelArray[y + offsets[i * 2 + 1]][x + offsets[i * 2]] === ' ') {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function initSeedUi(onSeedChanged) {
    var p = document.createElement('p');
    p.innerHTML = "<button id=\"change\">change</button>\n    seed: <input type=\"number\" id=\"seed\" value=\"0\" style=\"width:80px\"></input>\n    <button id=\"set\">set</button>";
    p.style.textAlign = 'left';
    document.getElementsByTagName('body')[0].appendChild(p);
    var changeElm = document.getElementById('change');
    var seedElm = document.getElementById('seed');
    var setElm = document.getElementById('set');
    changeElm.onclick = function () {
        seedElm.value = Math.floor(Math.random() * 9999999).toString();
        onSeedChanging();
    };
    setElm.onclick = onSeedChanging;
    function onSeedChanging() {
        onSeedChanged(Number(seedElm.value));
    }
}
exports.initSeedUi = initSeedUi;
function enableShowingErrors() {
    var pre = document.createElement('pre');
    pre.style.textAlign = 'left';
    document.getElementsByTagName('body')[0].appendChild(pre);
    window.addEventListener('error', function (error) {
        var message = [error.filename, '@', error.lineno, ':\n', error.message].join('');
        pre.textContent += '\n' + message;
        return false;
    });
}
exports.enableShowingErrors = enableShowingErrors;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var LZString = __webpack_require__(15);
var playerIdKey = 'darumatron-player-id';
var lastScore = 0;
var key;
function init() {
    try {
        var playerIdStorage = localStorage.getItem(playerIdKey);
        if (playerIdStorage == null) {
            window.fetch('/api/nextPlayerId').
                then(function (result) { return result.json(); }).
                then(function (json) {
                exports.playerId = json.id;
                localStorage.setItem(playerIdKey, String(exports.playerId));
            });
        }
        else {
            exports.playerId = Number(playerIdStorage);
        }
    }
    catch (e) {
        console.error(e);
    }
}
exports.init = init;
function get(isGettingLast, isGettingBest) {
    if (isGettingLast === void 0) { isGettingLast = false; }
    if (isGettingBest === void 0) { isGettingBest = false; }
    try {
        exports.scores = null;
        if (exports.playerId == null) {
            return;
        }
        var uri = '/api/score';
        if (isGettingLast) {
            uri += "?score=" + lastScore + "&count=9";
        }
        else if (isGettingBest) {
            uri += "?playerId=" + exports.playerId;
        }
        window.fetch(uri).
            then(function (result) { return result.json(); }).
            then(function (json) {
            exports.scores = json;
            if (isGettingLast) {
                exports.scores.push({ score: lastScore, playerId: exports.playerId });
                exports.scores = _.sortBy(exports.scores, function (s) { return -s.score; });
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.get = get;
function set(score) {
    try {
        lastScore = score;
        window.fetch("/api/key?playerId={playerId}").
            then(function (result) { return result.json(); }).
            then(function (json) {
            key = json.key;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            var encDataStr = LZString.compressToEncodedURIComponent(JSON.stringify({
                key: key,
                score: {
                    playerId: exports.playerId,
                    score: score
                }
            }));
            window.fetch('/api/score', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    data: encDataStr
                })
            });
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.set = set;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = LZString;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var g = __webpack_require__(1);
var Module = /** @class */ (function () {
    function Module(actorOrGame, insertIndexFromLast) {
        if (actorOrGame === void 0) { actorOrGame = null; }
        if (insertIndexFromLast === void 0) { insertIndexFromLast = 0; }
        this.insertIndexFromLast = insertIndexFromLast;
        this.isEnabled = true;
        if (actorOrGame != null) {
            this.add(actorOrGame);
        }
    }
    Module.prototype.add = function (actorOrGame) {
        actorOrGame._addModule(this, this.insertIndexFromLast);
        if (actorOrGame instanceof g.Actor) {
            this.game = actorOrGame.game;
            this.actor = actorOrGame;
        }
        else {
            this.game = actorOrGame;
        }
    };
    return Module;
}());
var DoInterval = /** @class */ (function (_super) {
    __extends(DoInterval, _super);
    function DoInterval(actorOrGame, modulesOrFunc, interval, options) {
        if (interval === void 0) { interval = 60; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, actorOrGame, modulesOrFunc instanceof Function ? 0 : modulesOrFunc.length) || this;
        _this.modulesOrFunc = modulesOrFunc;
        _this.interval = interval;
        _this.isChangedByDifficulty = false;
        _this.isModulesOrFuncEnabled = false;
        _this.ticks = options.isStartRandomized ? _this.game.random.getInt(interval) : interval;
        _this.isChangedByDifficulty = options.isChangedByDifficulty;
        if (options.from != null) {
            _this.from = options.from;
            _this.to = options.to;
        }
        return _this;
    }
    DoInterval.prototype.update = function () {
        var _this = this;
        this.ticks--;
        this.isModulesOrFuncEnabled = false;
        var itv = this.interval;
        if (this.isChangedByDifficulty) {
            itv /= this.game.getDifficulty();
        }
        if (this.ticks <= 0) {
            if (this.from == null) {
                this.isModulesOrFuncEnabled = true;
            }
            this.ticks += itv;
        }
        else {
            if (this.from != null) {
                var tr = this.ticks / itv;
                if (tr > this.from && tr <= this.to) {
                    this.isModulesOrFuncEnabled = true;
                }
            }
        }
        if (this.modulesOrFunc instanceof Function) {
            if (this.isModulesOrFuncEnabled) {
                this.modulesOrFunc();
            }
        }
        else {
            _.forEach(this.modulesOrFunc, function (m) {
                m.isEnabled = _this.isModulesOrFuncEnabled;
            });
        }
    };
    return DoInterval;
}(Module));
exports.DoInterval = DoInterval;
var DoCond = /** @class */ (function (_super) {
    __extends(DoCond, _super);
    function DoCond(actorOrGame, modulesOrFunc, cond) {
        var _this = _super.call(this, actorOrGame, modulesOrFunc instanceof Function ? 0 : modulesOrFunc.length) || this;
        _this.modulesOrFunc = modulesOrFunc;
        _this.cond = cond;
        _this.isModulesOrFuncEnabled = false;
        return _this;
    }
    DoCond.prototype.update = function () {
        var _this = this;
        this.isModulesOrFuncEnabled = this.cond();
        if (this.modulesOrFunc instanceof Function) {
            if (this.isModulesOrFuncEnabled) {
                this.modulesOrFunc();
            }
        }
        else {
            _.forEach(this.modulesOrFunc, function (m) {
                m.isEnabled = _this.isModulesOrFuncEnabled;
            });
        }
    };
    return DoCond;
}(Module));
exports.DoCond = DoCond;
var RemoveWhenOut = /** @class */ (function (_super) {
    __extends(RemoveWhenOut, _super);
    function RemoveWhenOut(actor, padding, paddingRight, paddingBottom, paddingLeft, paddingTop) {
        if (padding === void 0) { padding = 8; }
        if (paddingRight === void 0) { paddingRight = null; }
        if (paddingBottom === void 0) { paddingBottom = null; }
        if (paddingLeft === void 0) { paddingLeft = null; }
        if (paddingTop === void 0) { paddingTop = null; }
        var _this = _super.call(this, actor) || this;
        _this.paddingRight = paddingRight;
        _this.paddingBottom = paddingBottom;
        _this.paddingLeft = paddingLeft;
        _this.paddingTop = paddingTop;
        if (_this.paddingRight == null) {
            _this.paddingRight = padding;
        }
        if (_this.paddingBottom == null) {
            _this.paddingBottom = padding;
        }
        if (_this.paddingLeft == null) {
            _this.paddingLeft = padding;
        }
        if (_this.paddingTop == null) {
            _this.paddingTop = padding;
        }
        return _this;
    }
    RemoveWhenOut.prototype.update = function () {
        if (!g.isIn(this.actor.pos.x, -this.paddingLeft, this.actor.game.screen.size.x + this.paddingRight) ||
            !g.isIn(this.actor.pos.y, -this.paddingTop, this.actor.game.screen.size.y + this.paddingBottom)) {
            this.actor.remove();
        }
    };
    return RemoveWhenOut;
}(Module));
exports.RemoveWhenOut = RemoveWhenOut;
var RemoveWhenInAndOut = /** @class */ (function (_super) {
    __extends(RemoveWhenInAndOut, _super);
    function RemoveWhenInAndOut(actor, padding, paddingRight, paddingBottom, paddingLeft, paddingTop) {
        if (padding === void 0) { padding = 8; }
        if (paddingRight === void 0) { paddingRight = null; }
        if (paddingBottom === void 0) { paddingBottom = null; }
        if (paddingLeft === void 0) { paddingLeft = null; }
        if (paddingTop === void 0) { paddingTop = null; }
        var _this = _super.call(this, actor, padding, paddingRight, paddingBottom, paddingLeft, paddingTop) || this;
        _this.isIn = false;
        _this.paddingOuter = 64;
        return _this;
    }
    RemoveWhenInAndOut.prototype.update = function () {
        if (this.isIn) {
            return _super.prototype.update.call(this);
        }
        if (g.isIn(this.actor.pos.x, -this.paddingLeft, this.actor.game.screen.size.x + this.paddingRight) &&
            g.isIn(this.actor.pos.y, -this.paddingTop, this.actor.game.screen.size.y + this.paddingBottom)) {
            this.isIn = true;
        }
        if (!g.isIn(this.actor.pos.x, -this.paddingOuter, this.actor.game.screen.size.x + this.paddingOuter) ||
            !g.isIn(this.actor.pos.y, -this.paddingOuter, this.actor.game.screen.size.y + this.paddingOuter)) {
            this.actor.remove();
        }
    };
    return RemoveWhenInAndOut;
}(RemoveWhenOut));
exports.RemoveWhenInAndOut = RemoveWhenInAndOut;
var WrapPos = /** @class */ (function (_super) {
    __extends(WrapPos, _super);
    function WrapPos(actor, padding) {
        if (padding === void 0) { padding = 8; }
        var _this = _super.call(this, actor) || this;
        _this.padding = padding;
        return _this;
    }
    WrapPos.prototype.update = function () {
        this.actor.pos.x = g.wrap(this.actor.pos.x, -this.padding, this.actor.game.screen.size.x + this.padding);
        this.actor.pos.y = g.wrap(this.actor.pos.y, -this.padding, this.actor.game.screen.size.y + this.padding);
    };
    return WrapPos;
}(Module));
exports.WrapPos = WrapPos;
var MoveWasd = /** @class */ (function (_super) {
    __extends(MoveWasd, _super);
    function MoveWasd(actor, speed, angleVel) {
        if (speed === void 0) { speed = 1; }
        if (angleVel === void 0) { angleVel = 0; }
        var _this = _super.call(this, actor) || this;
        _this.speed = speed;
        _this.angleVel = angleVel;
        return _this;
    }
    MoveWasd.prototype.update = function () {
        if (g.ui.stick.magSq() <= 0) {
            return;
        }
        this.actor.pos.x += g.ui.stick.x * this.speed;
        this.actor.pos.y += g.ui.stick.y * this.speed;
        if (this.angleVel > 0) {
            var a = g.Vector.getAngle(g.ui.stick);
            var oa = g.wrap(a - this.actor.angle, -g.p.PI, g.p.PI);
            this.actor.angle += oa * this.angleVel;
        }
    };
    return MoveWasd;
}(Module));
exports.MoveWasd = MoveWasd;
var MoveSin = /** @class */ (function (_super) {
    __extends(MoveSin, _super);
    function MoveSin(actor, prop, amplitude, speed, startAngle) {
        if (amplitude === void 0) { amplitude = 48; }
        if (speed === void 0) { speed = 0.1; }
        if (startAngle === void 0) { startAngle = 0; }
        var _this = _super.call(this, actor) || this;
        _this.amplitude = amplitude;
        _this.speed = speed;
        _this.prop = getPropValue(actor, prop);
        _this.angleProp = getPropValue(actor, "movSin.angle." + prop, true);
        _this.angleProp.value[_this.angleProp.name] = startAngle;
        return _this;
    }
    MoveSin.prototype.update = function () {
        var pa = this.angleProp.value[this.angleProp.name];
        this.angleProp.value[this.angleProp.name] += this.speed;
        this.prop.value[this.prop.name] +=
            (Math.sin(this.angleProp.value[this.angleProp.name]) - Math.sin(pa)) * this.amplitude;
    };
    return MoveSin;
}(Module));
exports.MoveSin = MoveSin;
var MoveRoundTrip = /** @class */ (function (_super) {
    __extends(MoveRoundTrip, _super);
    function MoveRoundTrip(actor, prop, width, speed, startVel) {
        if (width === void 0) { width = 48; }
        if (speed === void 0) { speed = 1; }
        if (startVel === void 0) { startVel = 1; }
        var _this = _super.call(this, actor) || this;
        _this.width = width;
        _this.speed = speed;
        _this.prop = getPropValue(actor, prop);
        _this.center = _this.prop.value[_this.prop.name];
        _this.vel = startVel;
        return _this;
    }
    MoveRoundTrip.prototype.update = function () {
        this.prop.value[this.prop.name] += this.vel * this.speed;
        if ((this.vel > 0 && this.prop.value[this.prop.name] > this.center + this.width) ||
            (this.vel < 0 && this.prop.value[this.prop.name] < this.center - this.width)) {
            this.vel *= -1;
            this.prop.value[this.prop.name] += this.vel * this.speed * 2;
        }
    };
    return MoveRoundTrip;
}(Module));
exports.MoveRoundTrip = MoveRoundTrip;
var MoveTo = /** @class */ (function (_super) {
    __extends(MoveTo, _super);
    function MoveTo(actor, ratio) {
        if (ratio === void 0) { ratio = 0.1; }
        var _this = _super.call(this, actor) || this;
        _this.ratio = ratio;
        _this.targetPos = g.p.createVector();
        return _this;
    }
    MoveTo.prototype.update = function () {
        this.actor.pos.x += (this.targetPos.x - this.actor.pos.x) * this.ratio;
        this.actor.pos.y += (this.targetPos.y - this.actor.pos.y) * this.ratio;
    };
    return MoveTo;
}(Module));
exports.MoveTo = MoveTo;
var AbsorbPos = /** @class */ (function (_super) {
    __extends(AbsorbPos, _super);
    function AbsorbPos(actor, type, dist) {
        if (type === void 0) { type = 'player'; }
        if (dist === void 0) { dist = 32; }
        var _this = _super.call(this, actor) || this;
        _this.type = type;
        _this.dist = dist;
        _this.absorbingTicks = 0;
        return _this;
    }
    AbsorbPos.prototype.update = function () {
        var absorbingTos = this.actor.game.actorPool.get(this.type);
        if (absorbingTos.length > 0) {
            var to = absorbingTos[0];
            if (this.absorbingTicks > 0) {
                var r = this.absorbingTicks * 0.01;
                this.actor.pos.x += (to.pos.x - this.actor.pos.x) * r;
                this.actor.pos.y += (to.pos.y - this.actor.pos.y) * r;
                this.absorbingTicks++;
            }
            else if (this.actor.pos.dist(to.pos) < this.dist) {
                this.absorbingTicks = 1;
            }
        }
    };
    return AbsorbPos;
}(Module));
exports.AbsorbPos = AbsorbPos;
var DestroyWhenColliding = /** @class */ (function (_super) {
    __extends(DestroyWhenColliding, _super);
    function DestroyWhenColliding(actor, type, isDestroyingOther) {
        if (isDestroyingOther === void 0) { isDestroyingOther = false; }
        var _this = _super.call(this, actor) || this;
        _this.type = type;
        _this.isDestroyingOther = isDestroyingOther;
        return _this;
    }
    DestroyWhenColliding.prototype.update = function () {
        var as = this.actor.testCollision(this.type);
        if (as.length > 0) {
            this.actor.destroy();
            if (this.isDestroyingOther) {
                _.forEach(as, function (a) {
                    a.destroy();
                });
            }
        }
    };
    return DestroyWhenColliding;
}(Module));
exports.DestroyWhenColliding = DestroyWhenColliding;
var LimitInstances = /** @class */ (function () {
    function LimitInstances(actor, count) {
        if (count === void 0) { count = 1; }
        if (actor.game.actorPool.get(actor.type).length > count) {
            actor.remove();
        }
    }
    return LimitInstances;
}());
exports.LimitInstances = LimitInstances;
var HaveGravity = /** @class */ (function (_super) {
    __extends(HaveGravity, _super);
    function HaveGravity(actor, mass) {
        if (mass === void 0) { mass = 0.1; }
        var _this = _super.call(this, actor) || this;
        _this.mass = mass;
        _this.velocity = 0.01;
        return _this;
    }
    HaveGravity.prototype.update = function () {
        var _this = this;
        _.forEach(this.actor.game.actorPool.getByModuleName('HaveGravity'), function (a) {
            if (a === _this.actor) {
                return;
            }
            var r = g.wrap(a.pos.dist(_this.actor.pos), 1, 999) * 0.1;
            var v = (a.getModule('HaveGravity').mass * _this.mass) / r / r /
                _this.mass * _this.velocity;
            var an = g.Vector.getAngle(_this.actor.pos, a.pos);
            g.Vector.addAngle(_this.actor.vel, an, v);
        });
    };
    return HaveGravity;
}(Module));
exports.HaveGravity = HaveGravity;
var CollideToActor = /** @class */ (function (_super) {
    __extends(CollideToActor, _super);
    function CollideToActor(actor, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, actor) || this;
        _this.velRatio = 1;
        _this.isDestroying = false;
        _this.types = ['wall'];
        if (options.velRatio != null) {
            _this.velRatio = options.velRatio;
        }
        if (options.isDestroying != null) {
            _this.isDestroying = options.isDestroying;
        }
        if (options.types != null) {
            _this.types = options.types;
        }
        return _this;
    }
    CollideToActor.prototype.update = function () {
        var _this = this;
        var collisionInfo = { dist: 999 };
        _.forEach(this.types, function (t) {
            _.forEach(_this.actor.testCollision(t), function (w) {
                var ci = w.getCollisionInfo(_this.actor);
                if (ci.dist < collisionInfo.dist) {
                    collisionInfo = ci;
                }
            });
        });
        if (collisionInfo.wall == null) {
            return;
        }
        collisionInfo.wall.adjustPos(this.actor, collisionInfo.angle);
        if (collisionInfo.angle === 0 || collisionInfo.angle === 2) {
            this.actor.vel.x *= -1 * this.velRatio;
        }
        if (collisionInfo.angle === 1 || collisionInfo.angle === 3) {
            this.actor.vel.y *= -1 * this.velRatio;
        }
        if (this.isDestroying) {
            collisionInfo.wall.destroy();
        }
    };
    return CollideToActor;
}(Module));
exports.CollideToActor = CollideToActor;
function getPropValue(obj, prop, isAdding) {
    if (isAdding === void 0) { isAdding = false; }
    var value = obj;
    var name;
    var ps = prop.split('.');
    _.forEach(ps, function (p, i) {
        if (i < ps.length - 1) {
            if (isAdding && !value.hasOwnProperty(p)) {
                value[p] = {};
            }
            value = value[p];
        }
        else {
            name = p;
        }
    });
    return { value: value, name: name };
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = p5;

/***/ })
/******/ ]);