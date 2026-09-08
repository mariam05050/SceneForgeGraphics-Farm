// ============================================================
// MODULE 5 - MEASURE & COMPARE
// ============================================================
//
// Four measures:
// 1. Shapes drawn per frame
// 2. Fractal triangles
// 3. Transformations applied
// 4. Recursion depth
//
// Experiments:
// 5 input sizes/depths
// 3 runs each
// ============================================================


function drawMeasurementModule() {

  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  drawAnalysisTableGraphics();

  drawFractalPlotGraphics(55, 365);
  drawShapePlotGraphics(585, 365);
}


// ============================================================
// TABLE GRAPHICS
// ============================================================

function drawAnalysisTableGraphics() {

  let x = 55;
  let y = 115;

  let tableWidth = 990;
  let rowHeight = 42;


  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2],
    210
  );

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(2);

  rect(
    x,
    y,
    tableWidth,
    rowHeight * 5,
    8
  );


  // Horizontal lines.
  for (let row = 1; row < 5; row++) {

    line(
      x,
      y + row * rowHeight,
      x + tableWidth,
      y + row * rowHeight
    );
  }


  // Vertical lines.
  let col1 = x + 190;
  let col2 = x + 500;
  let col3 = x + 745;

  line(col1, y, col1, y + rowHeight * 5);
  line(col2, y, col2, y + rowHeight * 5);
  line(col3, y, col3, y + rowHeight * 5);
}


// ============================================================
// FRACTAL PLOT GRAPHICS
// ============================================================

function drawFractalPlotGraphics(x, y) {

  let depths = [1, 2, 3, 4, 5];
  let averages = [];


  // 3 runs for each depth.
  for (let depth of depths) {

    let total = 0;

    for (let run = 0; run < 3; run++) {
      total += countFractalTriangles(depth);
    }

    averages.push(total / 3);
  }


  // Panel.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2],
    210
  );

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(2);

  rect(x, y, 470, 260, 8);


  // Graph position.
  let gx = x + 55;
  let gy = y + 205;

  let graphWidth = 360;
  let graphHeight = 145;


  // Axes.
  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(1);

  line(gx, gy, gx + graphWidth, gy);
  line(gx, gy, gx, gy - graphHeight);


  // Plot line.
  noFill();

  stroke(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  strokeWeight(3);

  beginShape();

  for (let i = 0; i < depths.length; i++) {

    let px = map(
      i,
      0,
      depths.length - 1,
      gx,
      gx + graphWidth
    );

    let py = map(
      averages[i],
      0,
      243,
      gy,
      gy - graphHeight
    );

    vertex(px, py);
  }

  endShape();


  // Data points.
  for (let i = 0; i < depths.length; i++) {

    let px = map(
      i,
      0,
      depths.length - 1,
      gx,
      gx + graphWidth
    );

    let py = map(
      averages[i],
      0,
      243,
      gy,
      gy - graphHeight
    );

    noStroke();

    fill(
      palette[1][0],
      palette[1][1],
      palette[1][2]
    );

    circle(px, py, 8);
  }
}


// ============================================================
// SHAPE PLOT GRAPHICS
// ============================================================

function drawShapePlotGraphics(x, y) {

  let sizes = [5, 10, 15, 20, 25];
  let averages = [];


  // 3 runs for each scene size.
  for (let size of sizes) {

    let total = 0;

    for (let run = 0; run < 3; run++) {
      total += countShapeOperations(size);
    }

    averages.push(total / 3);
  }


  // Panel.
  fill(
    palette[3][0],
    palette[3][1],
    palette[3][2],
    210
  );

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(2);

  rect(x, y, 460, 260, 8);


  // Graph position.
  let gx = x + 55;
  let gy = y + 205;

  let graphWidth = 350;
  let graphHeight = 145;


  // Axes.
  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(1);

  line(gx, gy, gx + graphWidth, gy);
  line(gx, gy, gx, gy - graphHeight);


  // Plot line.
  noFill();

  stroke(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );

  strokeWeight(3);

  beginShape();

  for (let i = 0; i < sizes.length; i++) {

    let px = map(
      i,
      0,
      sizes.length - 1,
      gx,
      gx + graphWidth
    );

    let py = map(
      averages[i],
      0,
      25,
      gy,
      gy - graphHeight
    );

    vertex(px, py);
  }

  endShape();


  // Data points.
  for (let i = 0; i < sizes.length; i++) {

    let px = map(
      i,
      0,
      sizes.length - 1,
      gx,
      gx + graphWidth
    );

    let py = map(
      averages[i],
      0,
      25,
      gy,
      gy - graphHeight
    );

    noStroke();

    fill(
      palette[1][0],
      palette[1][1],
      palette[1][2]
    );

    circle(px, py, 8);
  }
}


// ============================================================
// FRACTAL OPERATION COUNTER
// ============================================================
//
// T(0) = 1
// T(d) = 3T(d - 1)

function countFractalTriangles(depth) {

  if (depth === 0) {
    return 1;
  }

  return (
    countFractalTriangles(depth - 1) +
    countFractalTriangles(depth - 1) +
    countFractalTriangles(depth - 1)
  );
}


// ============================================================
// SHAPE OPERATION COUNTER
// ============================================================

function countShapeOperations(n) {

  let operations = 0;

  for (let i = 0; i < n; i++) {
    operations++;
  }

  return operations;
}