
// MODULE 2 - SIERPINSKI GASKET
// Counts the triangles actually drawn.
let triangleCount = 0;

// DRAW MODULE 2
function drawFractalModule() {

  // Background.
  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  // Green grass at the bottom.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  rect(0, 500, width, 200);


  // Reset every frame because draw() repeats.
  triangleCount = 0;


  // Starting triangle vertices.
  let a = createVector(width / 2, 120);
  let b = createVector(220, 560);
  let c = createVector(880, 560);


  // Start the recursive algorithm.
  sierpinski(a, b, c, FRACTAL_DEPTH, 0);


  // Display depth and triangle count.
  drawFractalInfo();
}

// RECURSIVE SIERPINSKI FUNCTION

function sierpinski(a, b, c, depth, level) {

  // BASE CASE:
  // At depth 0, draw one triangle and stop.
  if (depth === 0) {

    // Choose colour based on recursion level.
    let col = palette[level % PALETTE_COUNT];

    fill(col[0], col[1], col[2]);

    stroke(
      palette[3][0],
      palette[3][1],
      palette[3][2]
    );

    strokeWeight(1);

    triangle(
      a.x, a.y,
      b.x, b.y,
      c.x, c.y
    );

    triangleCount++;

    return;
  }

  // Find the midpoint of each side.
  // 0.5 means halfway between the two vertices.
  let ab = p5.Vector.lerp(a, b, 0.5);
  let bc = p5.Vector.lerp(b, c, 0.5);
  let ca = p5.Vector.lerp(c, a, 0.5);


  // RECURSIVE CASE:
  // Recurse into the three corner triangles.

  // Top.
  sierpinski(
    a,
    ab,
    ca,
    depth - 1,
    level + 1
  );

  // Bottom-left.
  sierpinski(
    ab,
    b,
    bc,
    depth - 1,
    level + 1
  );

  // Bottom-right.
  sierpinski(
    ca,
    bc,
    c,
    depth - 1,
    level + 1
  );
}

// FRACTAL INFORMATION

function drawFractalInfo() {

  let expectedTriangles =
    Math.pow(3, FRACTAL_DEPTH);

  //info panel.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  rect(15, 15, 540, 95, 10);


  // Text.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  textSize(18);

  text(
    "MODULE 2 - SIERPINSKI GASKET",
    30,
    42
  );

  textSize(13);
  text(
    "Depth: " +
    FRACTAL_DEPTH +
    "   Expected: 3^" +
    FRACTAL_DEPTH +
    " = " +
    expectedTriangles,
    30,
    68
  );

  text(
    "Triangles actually drawn: " +
    triangleCount,
    30,
    91
  );
}
