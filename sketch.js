// SCENEFORGE - MAIN PROGRAM

function setup() {

  // Start with a 2-D canvas.
  // We will switch the project to WEBGL when Module 4
  // is implemented.
  createCanvas(1100, 700);

  // Generate the 13 shapes from my ID seed.
  generateScene();

  // Print the generated data to the console.
  printSceneData();
}

function draw() {

  // Module 1:
  // draw the complete farm every frame.
  drawFarmScene();
}
