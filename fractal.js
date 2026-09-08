// ============================================================
// MODULE 2 - SIERPINSKI GASKET
// ============================================================
//
// Recursive Sierpinski construction.
//
// At every level:
// 1 triangle -> 3 smaller triangles
//
// Therefore:
// T(d) = 3^d
// ============================================================


// Counts the triangles actually drawn.
let triangleCount = 0;


// ------------------------------------------------------------
// DRAW MODULE 2
// ------------------------------------------------------------

function drawFractalModule() {

  // Sky.
  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  // Green field.
  noStroke();
  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  rect(0, 500, width, 200);


  // draw() repeats every frame,
  // so reset the counter before drawing.
  triangleCount = 0;


  // Starting triangle vertices.
  let a = createVector(width / 2, 120);
  let b = createVector(220, 560);
  let c = createVector(880, 560);


  // Start recursion.
  sierpinski(
    a,
    b,
    c,
    FRACTAL_DEPTH,
    0
  );
}


// ------------------------------------------------------------
// RECURSIVE SIERPINSKI FUNCTION
// ------------------------------------------------------------

function sierpinski(a, b, c, depth, level) {

  // BASE CASE:
  // draw one triangle and stop this branch.
  if (depth === 0) {

    // Colour based on recursion level.
    let col =
      palette[level % PALETTE_COUNT];

    fill(
      col[0],
      col[1],
      col[2]
    );

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


  // ----------------------------------------------------------
  // MIDPOINTS
  // ----------------------------------------------------------
  //
  // lerp(..., 0.5) gives the point halfway
  // between two vertices.

  let ab = p5.Vector.lerp(a, b, 0.5);
  let bc = p5.Vector.lerp(b, c, 0.5);
  let ca = p5.Vector.lerp(c, a, 0.5);


  // ----------------------------------------------------------
  // RECURSIVE CASE
  // ----------------------------------------------------------
  //
  // Recurse into the three corner triangles.
  // The centre triangle is left empty.

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