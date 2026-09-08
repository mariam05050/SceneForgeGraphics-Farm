// ============================================================
// MODULE 3 - TRANSFORMATIONS
// ============================================================
//
// Required concepts:
// push() / pop()
// translate()
// rotate()
// scale()
// transformation order
//
// The shape data comes from sceneShapes[].
// ============================================================


// ------------------------------------------------------------
// DRAW MODULE 3
// ------------------------------------------------------------

function drawTransformModule() {

  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  // Apply transformations to the seeded shapes.
  drawTransformedShapes();

  // Show why transformation order matters.
  drawOrderDemo();
}


// ------------------------------------------------------------
// TRANSFORM THE 13 SEEDED SHAPES
// ------------------------------------------------------------

function drawTransformedShapes() {

  for (let shape of sceneShapes) {

    // Save the current coordinate system.
    push();

    // 1. Move to the seed-generated position.
    translate(shape.x, shape.y - 170);

    // 2. Rotate by the seed-generated angle.
    rotate(shape.rotation);

    // 3. Scale by the seed-generated value.
    scale(shape.scale);

    // Draw at the local origin (0, 0).
    drawTransformShape(shape);

    // Restore the previous coordinate system.
    pop();
  }
}


// ------------------------------------------------------------
// DRAW ONE TRANSFORMED SHAPE
// ------------------------------------------------------------

function drawTransformShape(shape) {

  let col = palette[shape.paletteIndex];

  fill(col[0], col[1], col[2]);

  stroke(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  strokeWeight(2);


  if (shape.type === "rect") {

    rectMode(CENTER);
    rect(0, 0, shape.size, shape.size * 0.7);
  }

  else if (shape.type === "circle") {

    circle(0, 0, shape.size);
  }

  else {

    let s = shape.size;

    triangle(
      0, -s / 2,
      -s / 2, s / 2,
      s / 2, s / 2
    );
  }
}


// ------------------------------------------------------------
// TRANSFORMATION ORDER DEMONSTRATION
// ------------------------------------------------------------
//
// LEFT:
// translate -> rotate
// The blade spins around its own pivot.
//
// RIGHT:
// rotate -> translate
// The translation follows the rotated axes,
// so the blade moves around the pivot.
//
// This demonstrates that transformation order matters.
// ------------------------------------------------------------

function drawOrderDemo() {

  let angle = frameCount * 0.02;


  // ----------------------------------------------------------
  // DIVIDER
  // ----------------------------------------------------------

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(2);

  line(
    width / 2,
    410,
    width / 2,
    625
  );


  // ----------------------------------------------------------
  // LEFT: TRANSLATE -> ROTATE
  // ----------------------------------------------------------

  push();

  // Move to the desired position first.
  translate(280, 515);

  // Then rotate around that new origin.
  rotate(angle);

  drawDemoBlade();

  pop();


  // Mark the pivot.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  circle(280, 515, 8);


  // ----------------------------------------------------------
  // RIGHT: ROTATE -> TRANSLATE
  // ----------------------------------------------------------

  push();

  // Position the demonstration centre.
  translate(820, 515);

  // Rotate the coordinate system first.
  rotate(angle);

  // Translation now follows the rotated x-axis.
  translate(110, 0);

  drawDemoBlade();

  pop();


  // Mark the orbit centre.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  circle(820, 515, 8);


  // ----------------------------------------------------------
  // ORBIT PATH
  // ----------------------------------------------------------

  noFill();

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2],
    120
  );

  strokeWeight(1);

  // Diameter = 220 because orbit radius = 110.
  circle(820, 515, 220);


  // ----------------------------------------------------------
  // LABELS
  // ----------------------------------------------------------

  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  textAlign(CENTER);

  textSize(16);

  text(
    "TRANSLATE -> ROTATE",
    280,
    625
  );

  text(
    "ROTATE -> TRANSLATE",
    820,
    625
  );


  textSize(12);

  text(
    "spins in place",
    280,
    645
  );

  text(
    "moves around the pivot",
    820,
    645
  );


  textAlign(LEFT, BASELINE);
}


// ------------------------------------------------------------
// WINDMILL-STYLE DEMO BLADE
// ------------------------------------------------------------

function drawDemoBlade() {

  // Blade.
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

  rectMode(CENTER);

  rect(
    70,
    0,
    140,
    35
  );


  // Local origin / pivot.
  fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  circle(
    0,
    0,
    20
  );
}