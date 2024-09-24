let cols; 
let rows; 
let size = 10;  
let grid = []; 
let x, y, dx, dy;
let margin = 5;

let colorPallete = ["#56DBE2", "#F3BC2B", "#2b67af", "#F3D9F4", "#f589a3", "#4789A3", "#E51C60", "#F684E4"]; 

let t = 0;

function setup() {
  let canvas = createCanvas(1536, 864); 
  canvas.position(0, 0); 

  cols = floor(width / size);  
  rows = floor(height / size);

  
  x = floor(random(cols / 2 - margin, cols / 2 + margin)); 
  y = floor(random(rows / 2 - margin, rows / 2 + margin)); 

  
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = color(0, 0, 100);  
    }
  }
}

window.onload = function() {
    const onButton = document.getElementById('onButton');
    const offButton = document.getElementById('offButton');
    const audio = document.getElementById('playlist');

    
    onButton.addEventListener('click', function() {
        onButton.style.display = 'none';  
        offButton.style.display = 'block'; 
        audio.play();  
    });

    offButton.addEventListener('click', function() {
        offButton.style.display = 'none'; 
        onButton.style.display = 'block';  
        audio.pause();  
    });
};


function draw() {
   drawAnimatedGradientBackground(); 

  dx = random([-1, 1]);
  dy = random([-2, -1, 1, 2]);

  if (x + dx < 0 || x + dx > cols - 1) {
    dx = 0;
  }
  if (y + dy < 0 || y + dy > rows - 1) {
    dy = 0;
  }

  x += dx;
  y += dy;

  let pixel1 = createVector(x, y);
  let pixel2 = createVector(cols - 1 - x, y);
  let pixel3 = createVector(x, rows - 1 - y);
  let pixel4 = createVector(cols - 1 - x, rows - 1 - y);

  let c = random(colorPallete);
  grid[pixel1.x][pixel1.y] = c;
  grid[pixel2.x][pixel2.y] = c;
  grid[pixel3.x][pixel3.y] = c;
  grid[pixel4.x][pixel4.y] = c;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j]);
      rect(i * size, j * size, size, size);
    }
  }
  
  t += 0.01; 
}


function drawAnimatedGradientBackground() {

  let r1 = map(sin(t), -1, 1, 0, 255);
  let g1 = map(sin(t + PI / 3), -1, 1, 0, 255);
  let b1 = map(sin(t + 2 * PI / 3), -1, 1, 0, 255);
  
  let r2 = map(sin(t + PI), -1, 1, 0, 255);
  let g2 = map(sin(t + 4 * PI / 3), -1, 1, 0, 255);
  let b2 = map(sin(t + 5 * PI / 3), -1, 1, 0, 255);

  let startColor = color(r1, g1, b1); 
  let endColor = color(r2, g2, b2);   

  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1); 
    let c = lerpColor(startColor, endColor, inter); 
    stroke(c);
    line(0, i, width, i);
  }
}