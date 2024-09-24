let stars = [];
let fillAmount = 0;
let isFilling = false;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0); 
  cnv.style('z-index', '-1'); 

  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }

  const button = select('.button');
  button.mousePressed(startFilling);
  button.mouseReleased(stopFilling);
}

function draw() {
  background(0);
  
  translate(width / 2, height / 2);
  for (let star of stars) {
    star.update();
    star.show();
  }

  noStroke();
  fill(255, 165, 0);
  rect(-100, 200, 200, 40, 10); 

  if (fillAmount > 0) {
    fill(random(255), random(255), random(255)); 
    rect(-100, 200, fillAmount, 40, 10); 
  }

  if (isFilling && fillAmount < 200) {
    fillAmount += 2; 
  } else if (!isFilling && fillAmount > 0) {
    fillAmount -= 2; 
  }
  if (fillAmount >= 200) {
    window.location.href = 'id.html'; 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startFilling() {
  isFilling = true;
}

function stopFilling() {
  isFilling = false;
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
  }

  update() {
    this.z -= 10;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }
  }

  show() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, 8, 0);

    fill(225);
    noStroke();
    ellipse(sx, sy, r, r);
  }
}
