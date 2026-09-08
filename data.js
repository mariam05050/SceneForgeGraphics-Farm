
const STUDENT_ID = 202316773;

const SEED = STUDENT_ID % 10000;


const SHAPE_COUNT = 8 + (SEED % 8);


const PALETTE_COUNT = 3 + (SEED % 4);

const FRACTAL_DEPTH = 4 + (SEED % 3);


// 0:blue
// 1:green
// 2 :red
// 3:yellow

const palette = [
  [139, 198, 222],  // blue
  [92, 151, 72],    // green
  [188, 72, 58],    // red
  [240, 194, 91]    // yellow
];




let sceneShapes = [];



function nextRandom(x) {
  return (
    (Math.imul(1103515245, x) + 12345) >>> 0
  ) & 0x7fffffff;
}

// SEEDED VALUE BETWEEN min AND max

// nextRandom() gives us a large integer.

// This function converts that integer into a useful
// number between min and max.

function seededValue(state, min, max) {

  // Generate the next number.
  state.value = nextRandom(state.value);

  // Convert it approximately into the range 0 to 1.
  let normalized = state.value / 2147483647;

  // Convert 0..1 into min..max.
  return min + normalized * (max - min);
}


function generateScene() {

  // Remove any old scene data.
  sceneShapes = [];

  // Start our generator using the student seed.
  let state = {
    value: SEED
  };


  // Generate exactly 13 shapes.
  for (let i = 0; i < SHAPE_COUNT; i++) {

    state.value = nextRandom(state.value);

    let typeNumber = state.value % 3;
    let type;

    if (typeNumber === 0) {
      type = "rect";
    }
    else if (typeNumber === 1) {
      type = "circle";
    }
    else {
      type = "triangle";
    }


    let x = seededValue(state, 70, 1030);
    let y = seededValue(state, 470, 625);

    // SIZE
    let size = seededValue(state, 24, 52);


    // ROTATION

    // Module 3 will use this seeded angle.

    let rotation = seededValue(state, -0.35, 0.35);
//scale
    let scaleValue = seededValue(state, 0.75, 1.25);

//pallette index
    state.value = nextRandom(state.value);

    let paletteIndex = state.value % PALETTE_COUNT;

    // ADD SHAPE TO ARRAY

    sceneShapes.push({
      id: i + 1,
      type: type,
      x: x,
      y: y,
      size: size,
      rotation: rotation,
      scale: scaleValue,
      paletteIndex: paletteIndex
    });
  }
}


function printSceneData() {

  console.log("================================");
  console.log("SCENEFORGE - GENERATED DATA");
  console.log("================================");

  console.log("Student ID:", STUDENT_ID);
  console.log("Seed:", SEED);
  console.log("Shapes:", SHAPE_COUNT);
  console.log("Palette:", PALETTE_COUNT);
  console.log("Depth:", FRACTAL_DEPTH);

  console.log("--------------------------------");


  // Print every generated shape.
  for (let shape of sceneShapes) {

    console.log(
      "S" + String(shape.id).padStart(2, "0"),
      "type=" + shape.type,
      "x=" + shape.x.toFixed(1),
      "y=" + shape.y.toFixed(1),
      "size=" + shape.size.toFixed(1),
      "rotation=" + shape.rotation.toFixed(2),
      "scale=" + shape.scale.toFixed(2),
      "col=" + shape.paletteIndex
    );
  }


  console.log("================================");
}