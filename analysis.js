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
// ANALYSIS TABLE GRAPHICS
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

  line(
    col1,
    y,
    col1,
    y + rowHeight * 5
  );

  line(
    col2,
    y,
    col2,
    y + rowHeight * 5
  );

  line(
    col3,
    y,
    col3,
    y + rowHeight * 5
  );
}


// ============================================================
// FRACTAL PLOT GRAPHICS
// ============================================================

function drawFractalPlotGraphics(x, y) {

  // Five growing depths.
  // The final depth is the seed-derived depth:
  //
  // d = 4 + (6773 % 3)
  // d = 6

  let depths = [2, 3, 4, 5, 6];

  let averages = [];


  // ----------------------------------------------------------
  // THREE RUNS FOR EACH DEPTH
  // ----------------------------------------------------------

  for (let depth of depths) {

    let total = 0;

    for (let run = 0; run < 3; run++) {

      total +=
        countFractalTriangles(depth);
    }

    averages.push(
      total / 3
    );
  }


  // ----------------------------------------------------------
  // PLOT PANEL
  // ----------------------------------------------------------

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
    470,
    260,
    8
  );


  // ----------------------------------------------------------
  // GRAPH POSITION
  // ----------------------------------------------------------

  let gx = x + 55;
  let gy = y + 205;

  let graphWidth = 360;
  let graphHeight = 145;
//axes
  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(1);

  // X axis.
  line(
    gx,
    gy,
    gx + graphWidth,
    gy
  );

  // Y axis.
  line(
    gx,
    gy,
    gx,
    gy - graphHeight
  );
//fractal plot line

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


    // Maximum is now 729

    let py = map(
      averages[i],
      0,
      729,
      gy,
      gy - graphHeight
    );


    vertex(
      px,
      py
    );
  }


  endShape();
//fractal data points
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
      729,
      gy,
      gy - graphHeight
    );


    noStroke();

    fill(
      palette[1][0],
      palette[1][1],
      palette[1][2]
    );


    circle(
      px,
      py,
      8
    );
  }
}

function drawShapePlotGraphics(x, y) {

  let sizes = [
    5,
    10,
    15,
    20,
    25
  ];

  let averages = [];

//3 runs for each scene
  for (let size of sizes) {

    let total = 0;

    for (let run = 0; run < 3; run++) {

      total +=
        countShapeOperations(size);
    }

    averages.push(
      total / 3
    );
  }
//plot panel
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
    460,
    260,
    8
  );

//graph position
  let gx = x + 55;
  let gy = y + 205;

  let graphWidth = 350;
  let graphHeight = 145;

  stroke(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  strokeWeight(1);


  // X axis.
  line(
    gx,
    gy,
    gx + graphWidth,
    gy
  );


  // Y axis.
  line(
    gx,
    gy,
    gx,
    gy - graphHeight
  );

//shape plot line

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


    vertex(
      px,
      py
    );
  }


  endShape();
// shape data pounts
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


    circle(
      px,
      py,
      8
    );
  }
}

function countFractalTriangles(depth) {

  // Base case.
  if (depth === 0) {

    return 1;
  }

  // Three recursive branches.
  return (
    countFractalTriangles(depth - 1) +
    countFractalTriangles(depth - 1) +
    countFractalTriangles(depth - 1)
  );
}
function countShapeOperations(n) {

  let operations = 0;

  for (let i = 0; i < n; i++) {

    operations++;
  }
  return operations;
}