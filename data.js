
// SCENEFORGE - DATA
// Student ID: 202316773

// This file is does:
// 1. Student ID and seed
// 2. Number of shapes
// 3. Colour palette
// 4. Seeded random-number generator
// 5. Generating the scene data


// STUDENT DATA


// My full student ID.
const STUDENT_ID = 202316773;

// SceneForge uses the last 4 digits of the ID.
//
// 202316773 % 10000 = 6773
const SEED = STUDENT_ID % 10000;


// NUMBER OF SHAPES

//
// Formula from the project:
//
// n = 8 + seed % 8
//
// For my seed:
//
// 6773 % 8 = 5
// 8 + 5 = 13

const SHAPE_COUNT = 8 + (SEED % 8);


// PALETTE SIZE

//
// Formula from the project:
//
// p = 3 + seed % 4
//
// For my seed:
//
// 6773 % 4 = 1
// 3 + 1 = 4

const PALETTE_COUNT = 3 + (SEED % 4);

// FRACTAL DEPTH

// The project says the Sierpinski depth d should come
// from the seed.
//
// We currently know d = 5 works for the examples,
// but the exact seed-to-depth formula is not visible
// in the uploaded project material.
//
// Keeping it here makes it easy to change later.

const FRACTAL_DEPTH = 5;

// FOUR-COLOUR FARM PALETTE

//
// My seed gives a palette size of 4.
//
// Every generated shape stores a palette INDEX:
//
// 0 -> blue
// 1 -> green
// 2 -> red
// 3 -> yellow
//
// The shape does not store its own RGB colour.

const palette = [
  [139, 198, 222],  // blue
  [92, 151, 72],    // green
  [188, 72, 58],    // red
  [240, 194, 91]    // yellow
];


// SCENE ARRAY

//
// This array will contain all 13 generated shapes.
//
// Example shape:
//
// {
//   id: 1,
//   type: "circle",
//   x: 300,
//   y: 500,
//   size: 40,
//   rotation: 0.2,
//   scale: 1.1,
//   paletteIndex: 2
// }

let sceneShapes = [];

// SEEDED RANDOM GENERATOR

// Formula given by the SceneForge project:
//
// next(x) =
// (1103515245 * x + 12345) % 2147483648
//
// This generator is deterministic:
//
// same seed -> same numbers -> same scene

function nextRandom(x) {
  return (
    (Math.imul(1103515245, x) + 12345) >>> 0
  ) & 0x7fffffff;
}

// SEEDED VALUE BETWEEN min AND max

//
// nextRandom() gives us a large integer.
//
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


// GENERATE SCENE

//
// This function creates all 13 shapes.
//
// IMPORTANT:
//
// We are NOT hard-coding:
//
// rect(100, 200, ...)
// circle(300, 400, ...)
//
// The seed generates the properties instead.
//
// If the student ID changes, the generated scene changes.

function generateScene() {

  // Remove any old scene data.
  sceneShapes = [];

  // Start our generator using the student seed.
  let state = {
    value: SEED
  };


  // Generate exactly 13 shapes.
  for (let i = 0; i < SHAPE_COUNT; i++) {

    // SHAPE TYPE

    //
    // 0 -> rectangle
    // 1 -> circle
    // 2 -> triangle

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

    // POSITION

    // These will later place the generated objects
    // mainly inside the farm field.

    let x = seededValue(state, 70, 1030);
    let y = seededValue(state, 470, 625);

    // SIZE
    let size = seededValue(state, 24, 52);


    // ROTATION

    // Module 3 will use this seeded angle.

    let rotation = seededValue(state, -0.35, 0.35);


    // --------------------------------------------------------
    // SCALE
    // --------------------------------------------------------
    //
    // Module 3 will also use this value.

    let scaleValue = seededValue(state, 0.75, 1.25);


    // --------------------------------------------------------
    // PALETTE INDEX
    // --------------------------------------------------------

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

// PRINT SCENE INFORMATION

// We use this to verify that the generator works.
//
// The same ID should print exactly the same data
// every time the program runs.

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
