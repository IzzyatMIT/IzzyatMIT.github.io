/*
// Alternate, less accurate code fall

const canvas = document.getElementById('splash');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      '゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ0123456789';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );

    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 27;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        i,
        Math.floor(Math.random() * -160),
        this.fontSize,
        this.canvasHeight
      );
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 60;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(0,0,0,0.045)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
*/

// declaring global variables
const canvas = document.getElementById('splash');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let streams = [];
const symbolSize = 27;
const fps = 60;
const nextFrame = 1000 / fps;
let timer = 0;

// a random integer function to simplify its repeated usage
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// 35% opacity black canvas which is called every frame of animation
function screenRefresh() {
  ctx.fillStyle = 'rgba(0 ,0 ,0 ,0.35)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

screenRefresh();

// inital setup function which is ran first and prepares canvas
function setup() {
  let x = 0;

  for (let i = 0; i <= canvas.width / symbolSize; i++) {
    let streamVar = new Stream();
    streamVar.generateSymbols(x, Math.random() * (0 - 1000) - 1000);
    streams.push(streamVar);
    x += symbolSize;
  }

  ctx.font = symbolSize + 'px monospace';
  ctx.textAlign = 'center';
}

// animation function which keeps track of frame count and calls screenRefresh and streams that run down canvas
function draw() {
  if (timer > 59) {
    timer = 0;
  }
  timer = timer + 1;
  console.log(timer);
  screenRefresh();

  streams.forEach(function (stream) {
    stream.render();
  });
  // recursion! :D
  requestAnimationFrame(draw);
}

// function with logic for which characters are included in the streams, how often the characters change, and wraparound at bottom of canvas
function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.text;
  this.speed = speed;
  this.switchInterval = getRandomInt(10, 30);
  this.first = first;

  this.setToRandomSymbol = () => {
    this.characters =
      '゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ0123456789ⱯꓭƆƎℲ⅁ꞰꞀꟽЯ⅃∇ꞱɅ⅄.+:;';

    if (timer % this.switchInterval == 0) {
      this.text = this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
    }
  };

  this.rain = () => {
    if (this.y >= canvas.height) {
      this.y = -12;
    } else {
      this.y += this.speed;
    }
  };
}

// function with logic for creating the streams, applying colour to each character, rendering them, and determining how quickly they travel down the canvas
function Stream() {
  this.symbols = [];
  this.totalSymbols = getRandomInt(5, 30);
  this.speed = Math.random() * (20 - 5) + 5;

  this.generateSymbols = (x, y) => {
    let first = getRandomInt(0, 4) == 1;
    for (let i = 0; i < this.totalSymbols; i++) {
      symbolVar = new Symbol(x, y, this.speed, first);
      symbolVar.setToRandomSymbol();
      this.symbols.push(symbolVar);
      y -= symbolSize;
      first = false;
    }
  };

  this.render = () => {
    this.symbols.forEach(function (symbolVar) {
      if (symbolVar.first) {
        ctx.fillStyle = 'rgba(210, 255, 210, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 255, 70, 1)';
      }
      ctx.fillText(symbolVar.text, symbolVar.x, symbolVar.y);
      symbolVar.rain();
      symbolVar.setToRandomSymbol();
    });
  };
}

// actual implimentation of code
setup();
draw();
