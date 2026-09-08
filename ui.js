// ============================================================
// SCENEFORGE - 2-D USER INTERFACE
// ============================================================
function drawUI() {

  // Clear the old UI.
uiLayer.clear();

if (currentModule !== 5) {
  drawModuleInfo();
}
else {
  drawAnalysisText();
}

drawBottomMenu();
  
  // Save the current WEBGL state.
  push();

  // Reset camera and matrices completely.
  resetMatrix();

  // Put a simple camera directly in front of the canvas.
  camera(
    0, 0, 800,
    0, 0, 0,
    0, 1, 0
  );

  // Flat projection ONLY for the UI.
  ortho(
    -width / 2,
     width / 2,
    -height / 2,
     height / 2,
    0,
    2000
  );

  // Draw the UI exactly over the screen.
  imageMode(CENTER);

  image(
    uiLayer,
    0,
    0
  );

  // Restore Module 4's graphics state.
  pop();
}

// MODULE INFORMATION
// ============================================================

function drawModuleInfo() {

  let panelHeight = 85;

  if (currentModule === 3) {
    panelHeight = 100;
  }

  if (currentModule === 4) {
    panelHeight = 115;
  }


  // Panel.
  uiLayer.noStroke();

  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  uiLayer.rect(
    15,
    15,
    620,
    panelHeight,
    10
  );


  // Text.
  uiLayer.fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  uiLayer.textAlign(LEFT, BASELINE);


  // MODULE 1
  if (currentModule === 1) {

    uiLayer.textSize(18);

    uiLayer.text(
      "SCENEFORGE - DYNAMIC COUNTRYSIDE FARM",
      30,
      42
    );

    uiLayer.textSize(13);

    uiLayer.text(
      "Seed: " + SEED +
      "   Shapes: " + SHAPE_COUNT +
      "   Palette: " + PALETTE_COUNT +
      "   Depth: " + FRACTAL_DEPTH,
      30,
      69
    );
  }


  // MODULE 2
  else if (currentModule === 2) {

    let expected = Math.pow(3, FRACTAL_DEPTH);

    uiLayer.textSize(18);

    uiLayer.text(
      "MODULE 2 - SIERPINSKI GASKET",
      30,
      42
    );

    uiLayer.textSize(13);

    uiLayer.text(
      "Depth: " +
      FRACTAL_DEPTH +
      "   Expected: 3^" +
      FRACTAL_DEPTH +
      " = " +
      expected,
      30,
      65
    );

    uiLayer.text(
      "Triangles actually drawn: " +
      triangleCount,
      30,
      85
    );
  }


  // MODULE 3
  else if (currentModule === 3) {

    uiLayer.textSize(18);

    uiLayer.text(
      "MODULE 3 - TRANSFORMATIONS",
      30,
      42
    );

    uiLayer.textSize(13);

    uiLayer.text(
      "Each seeded shape: translate -> rotate -> scale -> draw at origin",
      30,
      66
    );

    uiLayer.text(
      "Order demo: translate -> rotate versus rotate -> translate",
      30,
      88
    );
  }


  // MODULE 4
  else if (currentModule === 4) {

    uiLayer.textSize(18);

    uiLayer.text(
      "MODULE 4 - 3-D VIEW",
      30,
      42
    );

    uiLayer.textSize(13);

    uiLayer.text(
      "Projection: " + projectionMode.toUpperCase(),
      30,
      65
    );

    uiLayer.text(
      "P = Perspective   O = Orthographic   SPACE = Toggle orbit",
      30,
      87
    );

    uiLayer.text(
      "Camera: eye -> target -> up",
      30,
      108
    );
  }
}


// ============================================================
// BOTTOM MENU// ============================================================
// MODULE 5 - ANALYSIS TEXT
// ============================================================

function drawAnalysisText() {

  // ----------------------------------------------------------
  // TITLE
  // ----------------------------------------------------------

  uiLayer.noStroke();

  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  uiLayer.rect(
    15,
    15,
    650,
    75,
    10
  );


  uiLayer.fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  uiLayer.textAlign(LEFT, BASELINE);

  uiLayer.textSize(18);

  uiLayer.text(
    "MODULE 5 - MEASURE & COMPARE",
    30,
    43
  );

  uiLayer.textSize(13);

  uiLayer.text(
    "4 measures | 5 input sizes | 3 runs each | 2 plots",
    30,
    68
  );


  // ----------------------------------------------------------
  // TABLE TEXT
  // ----------------------------------------------------------

  let x = 55;
  let y = 115;
  let rowHeight = 42;

  let col1 = x + 190;
  let col2 = x + 500;
  let col3 = x + 745;


  uiLayer.fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  uiLayer.textSize(11);
  uiLayer.textAlign(LEFT, CENTER);


  // Header.
  uiLayer.text(
    "Measure",
    x + 12,
    y + rowHeight / 2
  );

  uiLayer.text(
    "Basic operation",
    col1 + 12,
    y + rowHeight / 2
  );

  uiLayer.text(
    "Operation count C(n)",
    col2 + 12,
    y + rowHeight / 2
  );

  uiLayer.text(
    "Growth class",
    col3 + 12,
    y + rowHeight / 2
  );


  // Table rows.
  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );


  drawAnalysisRow(
    x,
    col1,
    col2,
    col3,
    y + rowHeight * 1.5,
    "Shapes / frame",
    "Draw one shape",
    "n",
    "Theta(n)"
  );


  drawAnalysisRow(
    x,
    col1,
    col2,
    col3,
    y + rowHeight * 2.5,
    "Fractal triangles",
    "Draw base triangle",
    "3^d",
    "Theta(3^d)"
  );


  drawAnalysisRow(
    x,
    col1,
    col2,
    col3,
    y + rowHeight * 3.5,
    "Transforms",
    "Apply one transform",
    "3n",
    "Theta(n)"
  );


  drawAnalysisRow(
    x,
    col1,
    col2,
    col3,
    y + rowHeight * 4.5,
    "Recursion depth",
    "One recursion level",
    "d",
    "Theta(d)"
  );


  // ----------------------------------------------------------
  // FRACTAL PLOT TEXT
  // ----------------------------------------------------------

  uiLayer.fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  uiLayer.textAlign(LEFT, BASELINE);
  uiLayer.textSize(14);

  uiLayer.text(
    "Plot 1 - Fractal triangles vs depth",
    70,
    390
  );


  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  uiLayer.textSize(10);
  uiLayer.textAlign(CENTER, BASELINE);


  let depths = [1, 2, 3, 4, 5];

  for (let i = 0; i < depths.length; i++) {

    let px = map(
      i,
      0,
      4,
      110,
      470
    );

    uiLayer.text(
      depths[i],
      px,
      586
    );
  }


  uiLayer.text(
    "Depth d",
    290,
    605
  );


  uiLayer.textAlign(LEFT, BASELINE);

  uiLayer.text(
    "Average counts: 3, 9, 27, 81, 243 | Ratio = 3",
    70,
    610
  );


  // ----------------------------------------------------------
  // SHAPE PLOT TEXT
  // ----------------------------------------------------------

  uiLayer.fill(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  uiLayer.textSize(14);

  uiLayer.text(
    "Plot 2 - Shapes drawn vs scene size",
    600,
    390
  );


  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  uiLayer.textSize(10);
  uiLayer.textAlign(CENTER, BASELINE);


  let sizes = [5, 10, 15, 20, 25];

  for (let i = 0; i < sizes.length; i++) {

    let px = map(
      i,
      0,
      4,
      640,
      990
    );

    uiLayer.text(
      sizes[i],
      px,
      586
    );
  }


  uiLayer.text(
    "Scene size n",
    815,
    605
  );


  uiLayer.textAlign(LEFT, BASELINE);

  uiLayer.text(
    "Average counts: 5, 10, 15, 20, 25 | C(n) = n",
    600,
    610
  );
}


// ============================================================
// ONE ANALYSIS TABLE ROW
// ============================================================

function drawAnalysisRow(
  x,
  col1,
  col2,
  col3,
  y,
  measure,
  operation,
  count,
  growth
) {

  uiLayer.text(measure, x + 12, y);

  uiLayer.text(
    operation,
    col1 + 12,
    y
  );

  uiLayer.text(
    count,
    col2 + 12,
    y
  );

  uiLayer.text(
    growth,
    col3 + 12,
    y
  );

}
// ============================================================
// BOTTOM MENU
// ============================================================

function drawBottomMenu() {

  // Green menu bar.
  uiLayer.noStroke();
  uiLayer.fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  uiLayer.rect(0, height - 55, width, 55);


  // Five required menu options.
  let menuItems = [
    "1 SHAPES & COLOUR",
    "2 SIERPINSKI",
    "3 TRANSFORM",
    "4 3-D VIEW",
    "5 MEASURE & COMPARE"
  ];

  let positions = [
    20,
    210,
    365,
    505,
    630
  ];


  // Draw menu options.
  for (let i = 0; i < menuItems.length; i++) {

    // Selected module = red.
    if (currentModule === i + 1) {
      uiLayer.fill(
        palette[2][0],
        palette[2][1],
        palette[2][2]
      );
    }

    // Other modules = yellow.
    else {
      uiLayer.fill(
        palette[3][0],
        palette[3][1],
        palette[3][2]
      );
    }

    uiLayer.textSize(12);
    uiLayer.textAlign(LEFT, BASELINE);

    uiLayer.text(
      menuItems[i],
      positions[i],
      height - 27
    );
  }


  // Student ID and seed.
  uiLayer.fill(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  uiLayer.textSize(9);
  uiLayer.textAlign(RIGHT, BASELINE);

  uiLayer.text(
    "ID: " + STUDENT_ID + "   Seed: " + SEED,
    width - 15,
    height - 8
  );

  uiLayer.textAlign(LEFT, BASELINE);
}