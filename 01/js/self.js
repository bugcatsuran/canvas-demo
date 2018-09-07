
//canvas base

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
canvas.style.background = 'black';
document.body.appendChild(canvas);

//img base 

let bgimg = new Image();
let bgReady = false
bgimg.src = "images/background.png";
bgimg.onload = () => {
  bgReady = true;
}

let heroimg = new Image();
heroimg.src = "images/hero.png";
let heroReady = false
heroimg.onload = () => {
  heroReady = true;
}

let monsterimg = new Image();
monsterimg.src = "images/monster.png";
let monsterReady = false;
monsterimg.onload = () => {
  monsterReady = true;
}

//obj base

let hero = {
  speed: 96 / 1000,
  originX: canvas.width / 2 - heroimg.width / 2,
  originY: canvas.height / 2 - heroimg.height / 2
}

let monster = {}

let keysDown = {}






// game flow controll funcs

addEventListener("keydown", function (e) {
  console.log(e.keyCode)
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);


let reset = () => {
  hero.x = hero.originX;
  hero.y = hero.originY;
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
}

let update = (modifier) => {
  if (keysDown[38]) {
    hero.y -= hero.speed * modifier;
  } //上
  if (keysDown[40]) {
    hero.y += hero.speed * modifier;
  } //下
  if (keysDown[37]) {
    hero.x -= hero.speed * modifier;
  } //左
  if (keysDown[39]) {
    hero.x += hero.speed * modifier;
  } //右

  const collide = hero.x <= monster.x + 32
    && hero.y <= monster.y + 32
    && monster.x <= hero.x + 32
    && monster.y <= hero.y + 32
    ;
  if (collide) {
    reset()
  }
}

let render = () => {
  if (bgReady) {
    ctx.drawImage(bgimg, 0, 0)
  }
  if (heroReady) {
    ctx.drawImage(heroimg, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterimg, monster.x, monster.y)
  }
}

let main = () => {
  const now = Date.now();
  const delta = now - then;
  update(delta);
  render();
  then = now;
  requestAnimationFrame(main)
}






//start game 
let then = Date.now()
reset()
main()






// 坑一：有背景图时，一定要注意让背景图第一个先画出来，否则会遮住其他
// 坑二：一定要有时间修正器，因为速度是每秒的速度，得算出已经过了0.多少秒然后去乘以速度,
// 将速度乘以60也可以办到，但是那样的话，如果一个浏览器每秒刷新57次，
// 那你按键时间为1秒，你就可能走了57 * 速度/每秒的路程
// 如果别人的浏览器刷新了60次，同样按键一秒，他就比你多走
// 所以最好的方式是按时间间隔来，间隔了多少秒或者毫秒就乘这个时间

// requestanimationframe 大概每秒调用60次，与浏览器刷新速度相当 