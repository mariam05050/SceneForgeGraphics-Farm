// ============================================================
// MODULE 4 - 3-D FARM AND CAMERA
// ============================================================
//
// Controls:
// P     = Perspective projection
// O     = Orthographic projection
// SPACE = Start / stop camera orbit
//
// Camera:
// eye    = camera position
// target = point the camera looks at
// up     = which direction is up
// ============================================================


let projectionMode = "perspective";
let cameraOrbit = true;
let cameraAngle = 0;


// ------------------------------------------------------------
// DRAW MODULE 4
// ------------------------------------------------------------

function draw3DFarm() {

  background(
    palette[0][0],
    palette[0][1],
    palette[0][2]
  );


  // Move the camera only when orbit is enabled.
  if (cameraOrbit) {
    cameraAngle += 0.005;
  }


  setupFarmCamera();
  setupFarmLighting();

  draw3DGround();
  draw3DBarn();
  draw3DHouse();
  draw3DWindmill();
  draw3DTrees();
  draw3DCrops();

  // Same seed-generated data used in Module 1.
  draw3DSeededShapes();
}

function setupFarmCamera() {

  // Remove any camera/matrix state left by the UI.
  resetMatrix();

  let radius = 850;

  let eyeX = cos(cameraAngle) * radius;
  let eyeY = -350;
  let eyeZ = sin(cameraAngle) * radius;

  camera(
    eyeX, eyeY, eyeZ,
    0, -50, 0,
    0, 1, 0
  );

  if (projectionMode === "perspective") {

    perspective(
      PI / 3,
      width / height,
      1,
      2000
    );

  } else {

    ortho(
      -550, 550,
      -350, 350,
      1, 2000
    );
  }
}
// ------------------------------------------------------------
// LIGHTING
// ------------------------------------------------------------

function setupFarmLighting() {

  // General light.
  ambientLight(150);


  // Directional light helps reveal 3-D surfaces.
  directionalLight(
    255, 255, 255,
    -0.5, 1, -1
  );
}


// ------------------------------------------------------------
// GROUND
// ------------------------------------------------------------

function draw3DGround() {

  // Main grass platform.
  push();

  translate(0, 120, 0);

  ambientMaterial(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  box(1100, 30, 850);

  pop();


  // Crop field.
  push();

  translate(300, 100, 120);

  ambientMaterial(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  box(400, 15, 500);

  pop();
}


// ------------------------------------------------------------
// 3-D BARN
// ------------------------------------------------------------

function draw3DBarn() {

  push();

  translate(-170, -20, 30);


  // Barn body.
  ambientMaterial(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  box(230, 210, 180);


  // Roof.
  push();

  translate(0, -140, 0);
  rotateZ(PI / 4);

  ambientMaterial(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  box(165, 165, 200);

  pop();


  // Door.
  push();

  translate(0, 25, 93);

  ambientMaterial(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  box(85, 105, 6);

  pop();


  pop();
}


// ------------------------------------------------------------
// 3-D FARMHOUSE
// ------------------------------------------------------------

function draw3DHouse() {

  push();

  translate(-410, 0, -180);


  // House body.
  ambientMaterial(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  box(170, 150, 150);


  // Roof.
  push();

  translate(0, -105, 0);
  rotateZ(PI / 4);

  ambientMaterial(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  box(120, 120, 175);

  pop();


  pop();
}


// ------------------------------------------------------------
// 3-D WINDMILL
// ------------------------------------------------------------

function draw3DWindmill() {

  push();

  translate(260, -70, -30);


  // ----------------------------------------------------------
  // TOWER
  // ----------------------------------------------------------

  push();

  translate(-35, 115, 0);
  rotateZ(-0.12);

  ambientMaterial(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  box(14, 320, 14);

  pop();


  push();

  translate(35, 115, 0);
  rotateZ(0.12);

  ambientMaterial(
    palette[3][0],
    palette[3][1],
    palette[3][2]
  );

  box(14, 320, 14);

  pop();


  // ----------------------------------------------------------
  // ROTATING BLADES
  // ----------------------------------------------------------

  push();

  // Move to the windmill hub.
  translate(0, -48, 20);

  // Rotate the entire blade system.
  rotateZ(frameCount * 0.015);


  for (let i = 0; i < 4; i++) {

    push();

    rotateZ(i * HALF_PI);
    translate(75, 0, 0);

    ambientMaterial(
      palette[3][0],
      palette[3][1],
      palette[3][2]
    );

    box(135, 28, 10);

    pop();
  }


  pop();


  // ----------------------------------------------------------
  // HUB
  // ----------------------------------------------------------

  push();

  translate(0, -48, 30);

  ambientMaterial(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  sphere(22, 16, 12);

  pop();


  pop();
}


// ------------------------------------------------------------
// 3-D TREES
// ------------------------------------------------------------

function draw3DTrees() {

  draw3DTree(-430, -120);
  draw3DTree(430, 50);
}


function draw3DTree(x, z) {

  push();

  translate(x, 0, z);


  // Trunk.
  push();

  translate(0, 30, 0);

  ambientMaterial(
    palette[2][0],
    palette[2][1],
    palette[2][2]
  );

  cylinder(18, 150, 12);

  pop();


  // Leaves.
  push();

  translate(0, -80, 0);

  ambientMaterial(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  sphere(70, 16, 12);

  pop();


  pop();
}


// ------------------------------------------------------------
// 3-D CROPS
// ------------------------------------------------------------

function draw3DCrops() {

  for (let row = 0; row < 5; row++) {

    for (let plant = 0; plant < 7; plant++) {

      push();

      translate(
        160 + plant * 45,
        65,
        -170 + row * 70
      );

      ambientMaterial(
        palette[3][0],
        palette[3][1],
        palette[3][2]
      );

      box(7, 80, 7);

      pop();
    }
  }
}


// ------------------------------------------------------------
// 3-D SEEDED SHAPES
// ------------------------------------------------------------
//
// This uses the SAME sceneShapes[] array as Module 1.
//
// 2-D rect     -> 3-D box
// 2-D circle   -> 3-D sphere
// 2-D triangle -> 3-sided cone
//
// Therefore Module 4 is a 3-D interpretation of the
// same generated scene data rather than unrelated data.

function draw3DSeededShapes() {

  for (let shape of sceneShapes) {

    push();


    // Convert the 2-D farm coordinates into 3-D ground
    // coordinates.
    let x = map(
      shape.x,
      70, 1030,
      -480, 480
    );

    let z = map(
      shape.y,
      470, 625,
      -330, 330
    );


    translate(x, 70, z);


    // Reuse the seed-generated transformations.
    rotateY(shape.rotation);
    scale(shape.scale);


    // Reuse the seed-generated palette index.
    let col =
      palette[shape.paletteIndex];

    ambientMaterial(
      col[0],
      col[1],
      col[2]
    );


    // Rectangle -> box.
    if (shape.type === "rect") {

      box(
        shape.size,
        shape.size * 0.7,
        shape.size * 0.6
      );
    }


    // Circle -> sphere.
    else if (shape.type === "circle") {

      sphere(
        shape.size / 2,
        14,
        10
      );
    }


    // Triangle -> triangular cone.
    else {

      cone(
        shape.size / 2,
        shape.size,
        3,
        1
      );
    }


    pop();
  }
}