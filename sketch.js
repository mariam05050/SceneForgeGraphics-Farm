// SCENEFORGE - MAIN PROGRAM
// 1 = Shapes & Colour
// 2 = Sierpinski
// 3 = Transform
// 4 = 3-D View
// 5 = Measure & Compare

let currentModule = 1;
function setup() {

  createCanvas(1100, 700);
  generateScene();
  printSceneData();
}

function draw() {

  if (currentModule === 1) {
    drawFarmScene();
  }

  else if (currentModule === 2) {
    drawFractalModule();
  }

  else if (currentModule === 3) {
    drawTransformModule();
  }

  else {
    drawNotImplemented();
  }
  drawMenu();
}

// Press 1-5 to change modules.
function keyPressed() {

  if (key === "1") currentModule = 1;
  else if (key === "2") currentModule = 2;
  else if (key === "3") currentModule = 3;
  else if (key === "4") currentModule = 4;
  else if (key === "5") currentModule = 5;
}

// Temporary screen for unfinished modules.
function drawNotImplemented() {

  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );
  
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text(
    "Module " +
    currentModule +
    " - Not implemented yet",
    width / 2,
    height / 2
  );

  textAlign(LEFT, BASELINE);
}
