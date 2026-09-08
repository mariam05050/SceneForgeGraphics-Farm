SceneForge is a computer graphocs final project built using p5.js and webjl to provide 3D scenery.
the scene is a farm using my student ID and focuses on 2D ,3D, recursion for sierpinski gasket, and projection.
 
Student name: Mariam Diab
Seed: 6773
Generated shapes: 8+(6773%8) = 13
Palette size: 3+(6773%4)= 4
Sierpinski recursion depth: 5

Modules:
1- Shape and color in 2D
-Barn
-Rotating windmill
-trees, fence, and corn crops
-4 color palette
-rectangles, circles, and triangles to make the scene beautiful

2- Sierpinski Gasket
-creating Sierpinski Gasket using recursion method
-Recursion depth: 5
-expected triangles: 3^5= 243

3- Transformations
-pop() and push() functions 
-translate()
-rotate()
-scale()
-comparison between rotate then scale and the opposite

4- 3D view using WEBGL
-camera eye, target, and up vectors.
-perspective vs orthographc projection
-switch between:
  p: perspective
  o: orthographic
  space: pause/resume camera movement

5- Graphs and Measurements
- measure shapes drawn per frame
- measure sierpinski gasket
- measure ecursion depth
- measure transformations
shapes drawn vs scene size


Going through the program:
1- Shapes and colors
2- Sierpinski Gasket
3- Transformations
4- 3D view
  'P': perspective
  'O': orthographic
  'space': pause/resume camera orbit
5- Measure,Compare and Graphs

Languages and IDE:
-javascript
-p5.js
-EBGL
-HTML/CSS


Project Architecture:
- data.js: tudent seed, palette and deterministic scene generation
- farm2d.js: Module 1: 2-D farm
- fractal.js: Module 2: recursive Sierpinski gasket
- transforms.js: Module 3: transformations
- farm3d.js: Module 4: 3-D farm, camera and projections
- analysis.js: Module 5: measurements and plots
- ui.js: Interface, information panels and menu
- sketch.js: Main program and keyboard controls
- index.html: Project page and script loading
