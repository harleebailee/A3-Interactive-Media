let video;
let prevFrame;
let threshold = 30;
let synth;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); 
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  prevFrame = createImage(width, height);
  prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
  prevFrame.filter(GRAY);

  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  Tone.Transport.start();
}

function draw() {
  clear(); 

  video.loadPixels();
  prevFrame.loadPixels();

  let movement = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;

      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let gray = (r + g + b) / 3;
      let prevGray = prevFrame.pixels[index];

      if (Math.abs(gray - prevGray) > threshold) {
        movement++;
      }
    }
  }

  let movementRatio = movement / (width * height);
  let frequency = map(movementRatio, 0, 0.1, 300, 1000);
  
  if (movementRatio > 0.005) {
    synth.triggerAttackRelease(frequency, '8n');
  }

  prevFrame.copy(video, 0, 0, width, height, 0, 0, width, height);
  prevFrame.filter(GRAY);

  push();
  translate(0, 220, -200); 
  rotateX(frameCount * 0.01); 

  
  for (let j = 0; j < 5; j++) { 
    let colorShift = (frameCount * 0.5) % 255; 
    let colorValue = map(j, 0, 5, 0, 255);
    let c = color((colorValue + colorShift) % 255, 100, 255 - colorShift); 
    stroke(c); 
    strokeWeight(4); 
    noFill();
    beginShape();

    let amplitude = map(movementRatio, 0, 0.1, 10, 150);
    let waveFrequency = map(movementRatio, 0, 0.1, 1, 10);

    for (let i = 0; i < TWO_PI * waveFrequency; i += 0.1) {
      let x = map(i, 0, TWO_PI * waveFrequency, -width / 2, width / 2);
      let y = amplitude * sin(i * 2 + frameCount * 0.05 + j * 0.5); 
      let z = amplitude * cos(i * 2 + frameCount * 0.05 + j * 0.5); 
      vertex(x, y, z);
    }
    
    endShape();
  }
  pop();
}
