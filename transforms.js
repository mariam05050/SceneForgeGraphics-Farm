// MODULE 3 - TRANSFORMATIONS

// Required concepts:
// push() / pop()
// translate()
// rotate()
// scale()
// transformation order
// The shape data comes from sceneShapes[].
// DRAW MODULE 3

function drawTransformModule() {

  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );
  drawTransformTitle();

  // Draw the seeded shapes using their transformations.
  drawTransformedShapes();

  // Demonstrate why transformation order matters.
  drawOrderDemo();
}

// DRAW ALL SEEDED SHAPES WITH TRANSFORMS

function drawTransformedShapes() {
  for (let shape of sceneShapes) {

    // push() saves the current coordinate system.
    push();

    // 1. Move to the seed-generated position.
    translate(shape.x, shape.y - 170);

    // 2. Rotate by the seed-generated angle.
    rotate(shape.rotation);

    // 3. Scale by the seed-generated value.
    scale(shape.scale);

    // Draw at the LOCAL origin (0, 0).
    drawTransformShape(shape);

    // Restore the coordinate system.
    pop();
  }
}
// DRAW ONE TRANSFORMED SHAPE

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

    rect(
      0,
      0,
      shape.size,
      shape.size * 0.7
    );
  }
  else if (shape.type === "circle") {

    circle(
      0,
      0,
      shape.size
    );
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
// ORDER-MATTERS DEMONSTRATION
// We use the SAME rectangle and the SAME two transforms.
// Left: translate() then rotate()
// Right: rotate() then translate()
// The results are different because transformation
// order matters.

function drawOrderDemo() {

  let angle = frameCount * 0.02;

  // Divider.
  stroke(palette[1][0], palette[1][1], palette[1][2]);
  strokeWeight(2);
  line(width / 2, 410, width / 2, 650);

  // LEFT: TRANSLATE -> ROTATE

  // First move the origin to (280, 525).
  // Then rotate there.
  //
  // Result: the blade spins IN PLACE.

  push();
  translate(280, 525);
  rotate(angle);
  drawDemoBlade();
  pop();
  // Mark the left pivot.
  noStroke();
  fill(palette[1][0], palette[1][1], palette[1][2]);
  circle(280, 525, 8);
  
  // RIGHT: ROTATE -> TRANSLATE
  // We first move to a visible demonstration centre.
  // Then: rotate -> translate
  // Because the axes rotate BEFORE the translation,
  // the blade travels around the centre.
  push();
  translate(820, 525);
  rotate(angle);
  translate(110, 0);
  drawDemoBlade();
  pop();
  // Mark the orbit centre.
  noStroke();
  fill(palette[1][0], palette[1][1], palette[1][2]);
  circle(820, 525, 8);


  // Draw the orbit path so the movement is obvious.
  noFill();
  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2],
    120
  );

  strokeWeight(1);
  circle(820, 525, 220);


  // LABELS
  noStroke();
  fill(palette[1][0], palette[1][1], palette[1][2]);

  textAlign(CENTER);
  textSize(16);

  text(
    "TRANSLATE -> ROTATE",
    280,
    650
  );

  text(
    "ROTATE -> TRANSLATE",
    820,
    650
  );

  textSize(12);
  text(
    "spins in place",
    280,
    670
  );

  text(
    "moves around the pivot",
    820,
    670
  );

  textAlign(LEFT);
}
// DEMO BLADE
// A windmill-style blade makes rotation easy to see.

function drawDemoBlade() {

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

  // Mark the local origin.
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

// MODULE TITLE
function drawTransformTitle() {

  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  rect(
    15,
    15,
    600,
    90,
    10
  );
  
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  textSize(18);
  text(
    "MODULE 3 - TRANSFORMATIONS",
    30,
    42
  );

  textSize(13);

  text(
    "Each seeded shape: translate -> rotate -> scale -> draw at origin",
    30,
    67
  );

  text(
    "Bottom demonstration: changing transform order changes the result",
    30,
    89
  );
}
