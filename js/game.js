var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var bgReady = false;
var bgImage = new Image;
bgImage.onload = function() {
    bgReady = true
};
bgImage.src = "img/background.png";
var heroReady = false;
var heroImage = new Image;
heroImage.onload = function() {
    heroReady = true
};
heroImage.src = "img/hero.png";
var monsterReady = false;
var monsterImage = new Image;
monsterImage.onload = function() {
    monsterReady = true
};
monsterImage.src = "img/monster.png";
var hero = {
    speed: 256
};
var monster = {};
var monstersCaught = 0;
var keysDown = {};
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true
}, false);
addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode]
}, false);
var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64)
};
var update = function(modifier) {
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier
    }
    if (40 in keysDown) {
        hero.y += hero.speed * modifier
    }
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier
    }
    if (39 in keysDown) {
        hero.x += hero.speed * modifier
    }
    if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
        ++monstersCaught;
        reset()
    }
};
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0)
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }
    /*ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(, 32, 32);*/
	var txt = "جنید جمشید کو مارا: " + monstersCaught;
	var font = '32px arial';
	ctx.save();
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f50';
    
    var width = ctx.measureText(txt).width;
    ctx.fillRect(32, 32, width, parseInt(font, 10));
    
    ctx.fillStyle = '#000';
    ctx.fillText(txt, 32, 32);
    
    ctx.restore();
	
	
};
var main = function() {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1e3);
    render();
    then = now;
    requestAnimationFrame(main)
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();