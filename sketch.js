// SCENEFORGE MAIN PROGRAM
// Mariam Diab ID: 202316773

let currentModule = 1;


// Separate 2-D layer used for text and the menu.
// This avoids WEBGL text problems.
let uiLayer;

function setup() {

  // WEBGL is required for Module 4.
  createCanvas(1100, 700, WEBGL);


  // Normal 2-D graphics layer for titles and menu.
  uiLayer = createGraphics(1100, 700);


  // Generate the 13 shapes from the student ID seed.
  generateScene();


  // Print generated data to the console.
  printSceneData();
}

function draw() {

  // Module 4 controls its own 3-D camera and projection.

  if (currentModule === 4) {

    draw3DFarm();
  }

  // These use normal top-left-style coordinates.

  else {

    reset2DView();


    // Module 1 - Shapes & Colour.
    if (currentModule === 1) {

      drawFarmScene();
    }


    // Module 2 - Sierpinski.
    else if (currentModule === 2) {

      drawFractalModule();
    }


    // Module 3 - Transformations.
    else if (currentModule === 3) {

      drawTransformModule();
    }


    // Module 5 - Measure & Compare.
    else if (currentModule === 5) {

      drawMeasurementModule();
    }
  }


  // Draw fixed titles and menu over the scene.
  drawUI();
}

// Modules 1, 2, 3 and 5 were designed using normal
// top-left coordinates.
//
// This creates a flat orthographic view and moves
// the origin back to the top-left.

function reset2DView() {

  // Remove transformations left from the previous frame.
  resetMatrix();


  //  camera facing the canvas.
  camera(
    0, 0, 800,   // eye
    0, 0, 0,     // target
    0, 1, 0      // up
  );


  // Flat orthographic projection.
  ortho(
    -width / 2,
     width / 2,
    -height / 2,
     height / 2,
    -1000,
     2000
  );


  // Convert WEBGL centre origin to top-left origin.
  translate(
    -width / 2,
    -height / 2
  );
}
function keyPressed() {

  // Switch modules.
  if (key === "1") currentModule = 1;
  else if (key === "2") currentModule = 2;
  else if (key === "3") currentModule = 3;
  else if (key === "4") currentModule = 4;
  else if (key === "5") currentModule = 5;

  // Module 4 controls.
  else if (currentModule === 4 && (key === "p" || key === "P")) {
    projectionMode = "perspective";
  }

  else if (currentModule === 4 && (key === "o" || key === "O")) {
    projectionMode = "orthographic";
  }

  else if (currentModule === 4 && key === " ") {
    cameraOrbit = !cameraOrbit;
  }
}