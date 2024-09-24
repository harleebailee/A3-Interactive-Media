let stars = [];
let video;
let button;
let snapshot; 
let blinkButton;
let blinkState = true;
let buttonX = 695; 
let buttonY = 750; 
let targetY = 750; 
let lerpSpeed = 0.4; 
let showBlinkButton = false; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }

  video = createCapture(VIDEO);
  video.size(252.1499, 226.96); 
  video.hide(); 

  button = createButton('SNAP');
  
  button.mousePressed(handleSnapAndBlink);

  button.style('padding', '10px 0px');
  button.style('background-color', '#f171ab');
  button.style('color', 'white');
  button.style('font-family', 'Bebas Neue');
  button.style('font-size', '29px');
  button.style('border', 'none');
  button.style('cursor', 'pointer');
  button.style('width', '252px'); 
  button.style('height', '39px'); 
  button.style('display', 'flex'); 
  button.style('align-items', 'center'); 
  button.style('justify-content', 'center');
  button.position(466, 568); 
  button.style('z-index', '111'); 

  blinkButton = createButton('YOU\'RE SET');
  blinkButton.style('padding', '8px 8px');
  blinkButton.style('background-color', '#ffff33'); 
  blinkButton.style('color', '#ff9933');
  blinkButton.style('font-family', 'Source Code Pro');
  blinkButton.style('font-weight', 'bold');
  blinkButton.style('font-size', '16px');
  blinkButton.style('border', '5px solid #ff9933');
  blinkButton.style('border-radius', '12px')
  blinkButton.style('cursor', 'pointer');
  blinkButton.position(buttonX, buttonY); 
  blinkButton.hide(); 

  button.mouseOver(() => {
    button.style('box-shadow', '0 0 20px rgba(255, 255, 255, 1)');
  });

  button.mouseOut(() => {
    button.style('box-shadow', 'none');
  });

  blinkButton.mousePressed(() => {
    
    setTimeout(() => {
      window.location.href = 'home.html'; 
    }, 500); 
  });
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let star of stars) {
    star.update();
    star.show();
  }

  resetMatrix();

  if (snapshot) {
    image(snapshot, 465, 328, 252.1499, 226.96); 
  } else {
    image(video, 465, 328, 252.1499, 226.96); 
  }

  if (blinkButton && showBlinkButton) {
    blinkButton.style('opacity', blinkState ? '1' : '0.8');
    blinkState = !blinkState; 


    buttonY = lerp(buttonY, targetY, lerpSpeed);

    
    if (buttonY < targetY + 20) {
      blinkButton.show(); 
      blinkButton.position(buttonX, buttonY); 
    }
  }
}

function handleSnapAndBlink() {
  takesnap(); 
  showBlinkButtonFunc(); 
}

function takesnap() {
  snapshot = video.get();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showBlinkButtonFunc() {
  showBlinkButton = true; 
  buttonY = 800; 
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
