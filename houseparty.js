let vid; 
let w = 150; 
let h = 86; 
let scl = 10;

function setup() {
  createCanvas(w * scl, h * scl); 
  vid = createCapture(VIDEO);
  vid.size(w, h);
  vid.hide(); 
}

function draw() {
  background(220);
  vid.loadPixels();
  
  for (let i = 0; i < vid.width; i++) {
    for (let j = 0; j < vid.height; j++) {
     
      let index = ((j * vid.width) + i) * 4;
      let r = vid.pixels[index + 0];
      let g = vid.pixels[index + 1];
      let b = vid.pixels[index + 2];
      
      let time = millis() * 0.001; 
      let redShift = map(sin(time + i * 0.1), -1, 1, 0, 255);
      let greenShift = map(sin(time + j * 0.1 + TWO_PI / 3), -1, 1, 0, 255);
      let blueShift = map(sin(time + (i + j) * 0.1 + TWO_PI / 1.5), -1, 1, 0, 255);
  
      fill((r + redShift) % 256, (g + greenShift) % 256, (b + blueShift) % 256);
     
      let c = (r + g + b) / 3;
      let s = map(c, 0, 255, 0, 20); 

      ellipse(scl / 2 + i * scl, scl / 2 + j * scl, s, s);
    }
  }
}
