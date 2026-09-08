
// MODULE 1 - SHAPES & COLOUR
// Dynamic Countryside Farm

// This file draws the 2-D farm scene.
// The farm uses basic graphics primitives:
// rect(), circle(), ellipse(), triangle(), line()
// The 13 required SceneForge shapes come from
// sceneShapes[] in data.js.

// DRAW THE COMPLETE FARM


function drawFarmScene() {

  // Sky uses palette colour 0.
  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  // Draw objects from back to front.
  //
  // Drawing order matters in 2-D:
  // objects drawn later appear on top.

  drawSun();
  drawClouds();
  drawHills();
  drawField();

  drawHouse();
  drawBarn();
  drawWindmill();

  drawTrees();
  drawFence();
  drawCropRows();
  drawHayBales();

  // REQUIRED seed-generated shapes.
  drawSeededShapes();

  // Information required by the project.
  drawFarmInfo();
}


// SUN
function drawSun() {

  push();

  translate(900, 115);

  // Sun rays.
  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(3);

  for (let angle = 0; angle < TWO_PI; angle += PI / 8) {

    let x1 = cos(angle) * 52;
    let y1 = sin(angle) * 52;

    let x2 = cos(angle) * 70;
    let y2 = sin(angle) * 70;

    line(x1, y1, x2, y2);
  }

  // Sun body.
  noStroke();

  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  circle(0, 0, 85);

  pop();
}



// CLOUDS
// We keep these simple and use alpha transparency.

function drawClouds() {

  drawCloud(160, 115, 1.0);
  drawCloud(520, 145, 0.8);
  drawCloud(740, 95, 0.65);
}

function drawCloud(x, y, cloudScale) {

  push();

  translate(x, y);
  scale(cloudScale);

  // Use a transparent/light version of palette colour 0.
  fill(
    palette[0][0],
    palette[0][1],
    palette[0][2],
    120
  );

  noStroke();

  circle(-35, 5, 70);
  circle(0, -10, 85);
  circle(38, 5, 70);

  ellipse(0, 15, 130, 45);

  pop();
}

// FAR HILLS

function drawHills() {

  noStroke();

  // Transparent green gives us a lighter distant hill.
  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2],
    150
  );

  ellipse(130, 405, 470, 210);
  ellipse(510, 395, 620, 235);
  ellipse(930, 405, 550, 210);
}

// MAIN FIELD

function drawField() {

  // Main grass.
  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  noStroke();

  rect(0, 400, width, height - 400);


  // Golden crop field on the right.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2],
    130
  );

  quad(
    600, 455,
    1080, 450,
    1100, 650,
    660, 650
  );
}

// FARMHOUSE

function drawHouse() {

  push();

  translate(80, 325);


  // House body.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  stroke(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  strokeWeight(3);

  rect(0, 0, 180, 130);


  // Roof.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  triangle(
    -20, 0,
    90, -85,
    200, 0
  );


  // Door.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  rect(68, 65, 45, 65);


  // Windows.
  fill(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  rect(20, 35, 35, 32);
  rect(125, 35, 35, 32);


  // Window dividers.
  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(2);

  line(37, 35, 37, 67);
  line(20, 51, 55, 51);

  line(142, 35, 142, 67);
  line(125, 51, 160, 51);

  pop();
}

// BARN

function drawBarn() {

  push();

  translate(310, 300);


  // Main barn.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(3);

  rect(0, 0, 230, 185);


  // Roof.
  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  triangle(
    -25, 0,
    115, -105,
    255, 0
  );


  // Barn door.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2],
    180
  );

  rect(70, 75, 90, 110);


  // X pattern on the door.
  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(5);

  line(72, 78, 157, 180);
  line(157, 78, 72, 180);


  // Barn window.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(2);

  rect(92, 22, 48, 38);

  pop();
}

// WINDMILL

// This will become even more important in Module 3.
//
// Right now it demonstrates a basic animated rotation.
//
// We:
// 1. translate to the windmill hub
// 2. rotate the coordinate system
// 3. draw the blades around the local origin

function drawWindmill() {

  push();

  // Hub position.
  translate(790, 285);

  // TOWER
  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(7);

  // Two tower legs.
  line(-42, 185, -12, 15);
  line(42, 185, 12, 15);


  // Tower cross braces.
  strokeWeight(3);

  for (let y = 45; y <= 150; y += 35) {

    line(-30, y, 30, y + 28);
    line(30, y, -30, y + 28);
  }


  // ROTATING BLADES

  push();

  rotate(frameCount * 0.015);

  for (let i = 0; i < 4; i++) {

    push();

    // 90 degrees between each blade.
    rotate(i * HALF_PI);

    fill(
      palette[3][0],
      palette[3][1],
      palette[3][2]
    );

    stroke(
      palette[2][0],
      palette[2][1],
      palette[2][2]
    );

    strokeWeight(2);

    quad(
      12, -12,
      110, -28,
      128, 4,
      12, 12
    );

    pop();
  }

  pop();

  // HUB
  
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(3);

  circle(0, 0, 40);

  pop();
}

// TREES
function drawTrees() {

  drawTree(990, 370, 1.1);
  drawTree(55, 430, 0.75);
  drawTree(1030, 445, 0.7);
}


function drawTree(x, y, treeScale) {

  push();

  translate(x, y);
  scale(treeScale);


  // Trunk.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  noStroke();

  rect(-10, 10, 20, 85);


  // Leaves.
  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  circle(0, -10, 85);
  circle(-30, 10, 60);
  circle(30, 10, 60);
  circle(0, -42, 60);

  pop();
}


// FENCE

function drawFence() {

  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(7);


  // Horizontal boards.
  line(10, 520, 570, 520);
  line(10, 555, 570, 555);


  // Fence posts.
  for (let x = 20; x <= 570; x += 85) {

    line(x, 490, x, 585);
  }
}

// CROP ROWS

// Nested loops:
//
// outer loop = rows
// inner loop = plants
//
// This is the same nested-loop idea taught in the workbook.

function drawCropRows() {

  for (let row = 0; row < 4; row++) {

    for (let plant = 0; plant < 8; plant++) {

      let x =
        690 + plant * 44 + row * 10;

      let y =
        490 + row * 38;

      drawCrop(x, y, 0.7 + row * 0.06);
    }
  }
}

// ONE CROP

function drawCrop(x, y, cropScale) {

  push();

  translate(x, y);
  scale(cropScale);


  // Slight animation using sine.
  rotate(
    sin(frameCount * 0.025 + x * 0.02) * 0.06
  );


  // Stem.
  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(3);

  line(0, 0, 0, -32);
  line(0, -15, -12, -24);
  line(0, -20, 12, -30);


  // Wheat.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  noStroke();

  ellipse(0, -35, 11, 21);

  pop();
}

// HAY BALES

// IMPORTANT:
// No arc().
//
// Our earlier version used arc(), which caused problems
// under the WEBGL renderer later.
//
// This version uses only circles and lines.

function drawHayBales() {

  drawHayBale(610, 530, 1.0);
  drawHayBale(645, 560, 0.75);
}


function drawHayBale(x, y, hayScale) {

  push();

  translate(x, y);
  scale(hayScale);


  // Main bale.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  stroke(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  strokeWeight(3);

  circle(0, 0, 65);


  // Hay details.
  strokeWeight(2);

  line(-18, -12, 18, 12);
  line(-20, 8, 15, -8);
  line(-10, -22, 20, -3);

  pop();
}

// REQUIRED SEEDED SHAPES

// sceneShapes[] comes from data.js.
//
// This is important for the assignment:
//
// the shapes are NOT manually hard-coded here.

function drawSeededShapes() {

  for (let shape of sceneShapes) {

    drawSeededShape(shape);
  }
}


// ------------------------------------------------------------
// DRAW ONE SEEDED SHAPE
// ------------------------------------------------------------

function drawSeededShape(shape) {

  push();


  // Move to its seed-generated position.
  translate(shape.x, shape.y);


  // Rotate using its seed-generated angle.
  rotate(shape.rotation);


  // Scale using its seed-generated scale.
  scale(shape.scale);


  // Look up its colour using the palette index.
  let c =
    palette[shape.paletteIndex];


  fill(
    c[0],
    c[1],
    c[2],
    220
  );

  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(1.5);


  // RECTANGLE
  
  if (shape.type === "rect") {

    rectMode(CENTER);

    rect(
      0,
      0,
      shape.size,
      shape.size * 0.7
    );
  }

    
  // CIRCLE
    
  else if (shape.type === "circle") {

    circle(
      0,
      0,
      shape.size
    );
  }

  // TRIANGLE
    
  else {

    let s = shape.size;

    triangle(
      0, -s / 2,
      -s / 2, s / 2,
      s / 2, s / 2
    );
  }


  // Restore the previous coordinate system.
  pop();
}

// FARM INFORMATION

// Module 1 requires seed + counts to be visible.

function drawFarmInfo() {

  // Information panel.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2],
    230
  );

  rect(
    15,
    15,
    430,
    70,
    10
  );
  
  fill(palette[3][0], palette[3][1],  palette[3][2] );

  textSize(15);

  text(
    "SCENEFORGE - DYNAMIC COUNTRYSIDE FARM",
    30,
    42
  );


  textSize(13);

  text(
    "Seed: " + SEED +
    "   Shapes: " + SHAPE_COUNT +
    "   Palette: " + PALETTE_COUNT +
    "   Depth: " + FRACTAL_DEPTH,
    30,
    67
  );
}
