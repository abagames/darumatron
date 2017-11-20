import * as _ from 'lodash';
import * as g from './index';

export let cursorPos: p5.Vector;
export let isPressed = false;
export let isJustPressed = false;
export let stick: p5.Vector;
export let stickAngle: number;
let canvas: HTMLCanvasElement;
let pixelSize: p5.Vector;
let isCursorDown = false;
let isInitialized = false;
const isKeyPressing = _.times(256, () => false);
const stickKeys = [[39, 68, 102], [40, 83, 101, 98], [37, 65, 100], [38, 87, 104]];
const stickXys = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const buttonKeys = [90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 17, 16, 18, 32, 13];

export function init(_canvas: HTMLCanvasElement, _pixelSize: p5.Vector) {
  canvas = _canvas;
  pixelSize = _pixelSize;
  document.onmousedown = (e) => {
    onMouseTouchDown(e.pageX, e.pageY);
  };
  document.ontouchstart = (e) => {
    onMouseTouchDown(e.touches[0].pageX, e.touches[0].pageY);
  };
  document.onmousemove = (e) => {
    onMouseTouchMove(e.pageX, e.pageY);
  };
  document.ontouchmove = (e) => {
    e.preventDefault();
    onMouseTouchMove(e.touches[0].pageX, e.touches[0].pageY);
  };
  document.onmouseup = (e) => {
    onMouseTouchUp(e);
  };
  document.ontouchend = (e) => {
    onMouseTouchUp(e);
  };
  document.onkeydown = (e) => {
    isKeyPressing[e.keyCode] = true;
  };
  document.onkeyup = (e) => {
    isKeyPressing[e.keyCode] = false;
  };
  cursorPos = g.p.createVector();
  stick = g.p.createVector();
  isInitialized = true;
}

export function clearJustPressed() {
  isJustPressed = false;
  isPressed = true;
}

export function update() {
  if (!isInitialized) {
    return;
  }
  stick.set();
  _.forEach(stickKeys, (ks, i) => {
    _.forEach(ks, k => {
      if (isKeyPressing[k]) {
        stick.x += stickXys[i][0];
        stick.y += stickXys[i][1];
        return false;
      }
    });
  });
  stickAngle = 0;
  if (stick.magSq() > 0) {
    stickAngle = g.wrap(
      Math.round(g.Vector.getAngle(stick) / g.p.HALF_PI * 2), 0, 8);
    stick.set();
    g.Vector.addAngle(stick, stickAngle * g.p.HALF_PI / 2, 1);
    stickAngle++;
  }
  const pp = isPressed;
  isPressed = isCursorDown;
  _.forEach(buttonKeys, k => {
    if (isKeyPressing[k]) {
      isPressed = true;
      return false;
    }
  });
  isJustPressed = (!pp && isPressed);
}

function onMouseTouchDown(x, y) {
  calcCursorPos(x, y, cursorPos);
  isCursorDown = true;
}

function onMouseTouchMove(x, y) {
  calcCursorPos(x, y, cursorPos);
}

function calcCursorPos(x, y, v) {
  v.x = ((x - canvas.offsetLeft) / canvas.clientWidth + 0.5) * pixelSize.x;
  v.y = ((y - canvas.offsetTop) / canvas.clientHeight + 0.5) * pixelSize.y;
}

function onMouseTouchUp(e) {
  isCursorDown = false;
}
