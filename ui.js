// SCENEFORGE - MENU
function drawMenu() {

  // Bottom menu bar.
  noStroke();

  fill(
    palette[1][0],
    palette[1][1],
    palette[1][2]
  );

  rect(0, height - 50, width, 50);

  let menuItems = [
    "1 SHAPES & COLOUR",
    "2 SIERPINSKI",
    "3 TRANSFORM",
    "4 3-D VIEW",
    "5 MEASURE & COMPARE"
  ];

  let positions = [
    25,
    235,
    410,
    570,
    715
  ];

  for (let i = 0; i < menuItems.length; i++) {
    // Highlight selected module.
    if (currentModule === i + 1) {
      fill(
        palette[2][0],
        palette[2][1],
        palette[2][2]
      );
    }

    else {
      fill(
        palette[3][0],
        palette[3][1],
        palette[3][2]
      );
    }

    textSize(13);
    text(
      menuItems[i],
      positions[i],
      height - 20
    );
  }
}
