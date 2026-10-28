let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;
function setup() {
  createCanvas(480, 360);
  spawnGhost();
}
function draw() {
  background(0, 10, 70);
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(0,225,0);
    textSize(22);
    text('ALIEN INVASION 👽🛸', width / 2, height / 2);
    text('Click to start' ,width / 2, height / 3);
    return;
  }

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}
function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}
function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(70);
  ellipse (x, y, 60, 60);
  fill(120, 220, 90);
  ellipse(x, y, 50, 100);
  
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}
