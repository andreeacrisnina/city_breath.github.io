/* City Breath
        by Andreea-Cristina Mircea
        
   Final Project for TBAG WS 22/23     
          
                  MA 1 Creative Technologies, 
                  Filmuniversitaet Babelsberg
*/

let click = false;
let introFont;
//scenes
let scenes = 1;
//grain
let grainSize;
let angle = 0;
// the audio input and an amplitude analyzer
let audio;
let analyzer;
let fft, fftPlus;
let level, levelPlus;
let spectrum, spectrumPlus;
// camera
let cameraPlus = 1;
let cameraPlusPlus = 5;
let camX = 0;
let camY = 0;
let camZ = 0;
// colours
let white, black, yellow, blue, red;

function preload() {
  // the audio file
  audio = loadSound('assets/city_breath.mp3');
  // intro font
  introFont = loadFont('assets/Montserrat-Thin.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // defining the colour palette
  white = color(234, 239, 233);
  black = color(5, 1, 3);
  red = color(231, 5, 3);
  yellow = color(253, 222, 6);
  blue = color(3, 0, 173);
 
  // text
  angleMode(DEGREES);
  textFont(introFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);

  // parameters for the audio input
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  analyzer.setInput(audio);
  fft.setInput(audio);
  audio.play();
  
  smooth(10);
  frameRate(10);
}

function draw() {
  level = analyzer.getLevel();
  levelPlus = level * 5;
  let time = audio.currentTime();
  if (time >= 0 && time < 21) {
    scene1_01();
  }
  else if (time >= 21 && time < 32) {
    scene1_02();
  }
  else if (time >= 32 && time < 40) {
    scene1_03();
  }
 else if (time >= 40 && time < 53) {
    scene1_04();
  }
 else if (time >= 53 && time < 62) {
    scene1_05();
  }
 else if (time >= 62 && time < 82) {
    scene2_01();
 }
else if (time >= 82 && time < 102) {
    scene2_02();
 }
else if (time >= 106 && time < 120) {
    scene4_02();
 }
else if (time >= 128 && time < 140) {
    scene5_01();
 }
 else if (time >= 140 && time < 150) {
  scene2_02();
}
else if (time >= 150 && time < 170) {
  scene1_02();
}
else if (time >= 171 && time < 190) {
  scene1_05();
}
else if (time >= 190 && time < 205) {
  scene1_04();
}
else if (time >= 205 && time < 210) {
  scene1_03();
}
else if (time >= 210 && time < 220) {
  scene1_05();
}
else if (time >= 220) {
  scene1_01();
}  

if (time >= audio.duration()) {
    audio.stop();
    resetScenes();
  }

  //GRAIN EFFECT
  stroke(black);
  strokeWeight(levelPlus*100);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(x, y, z);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  //GRAIN EFFECT
  stroke(white);
  strokeWeight(levelPlus*100);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(y, y, z);
    translate(z, y, z);
    sphere(grainSize);
    pop();
  }
}


//THE LUNG OF THE CITY
function scene1_01() { 
  background(white);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level;
  spectrumPlus = spectrum * 100;
// INTRO ----------------------------------  
   if (!click) {
    fill(black);
    text('the city is breathing: click to hear', 0, 0);
  }
  
  // the polygon lung
  camX = map(level, 0, 1, -500, 500);
  camY = map(level, 0, 1, -500, 500);
  camZ = map(level, 0, 1, -500, -100);
  translate(0, 0, 0);
  push();
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  rotateX(frameCount * level * 5);
  rotateY(frameCount * level * 5);
  let sphereDetail = round(map(levelPlus, 0, 6, 5, 15));
  sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
  stroke(white);
  strokeWeight(levelPlus*100);
  let sphereSize = map(levelPlus, 0, 1, 0, 1600);
  sphere(sphereSize, sphereDetail, sphereDetail);
  pop();
  
  //GRAIN EFFECT
  stroke(black);
  strokeWeight(levelPlus*100);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();    
    translate(x, y, z);
    translate(y, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(levelPlus*100);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}

function scene1_02() { 
   // environment settings
   background(white);
   // the audio parameters and the exagerated values
   level = analyzer.getLevel();
   spectrum = fft.analyze();
   levelPlus = level;
   spectrumPlus = spectrum * 100;
   
   camera(levelPlus, levelPlus-300, levelPlus+500, 0, 0, 0, 0, 1, 0);
   
   // Element 1: the polygon
   camX = map(level, 0, 1, -500, 500);
   camY = map(level, 0, 1, -500, 500);
   camZ = map(level, 0, 1, -500, -100);
   translate(0, 0, 0);
   push();
   camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
   rotateX(frameCount * level * 5);
   rotateY(frameCount * level * 5);
   let sphereDetail = round(map(levelPlus, 0, 6, 5, 15));
   sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
   //fill(blue);
   stroke(white);
   strokeWeight(levelPlus*100);
   let sphereSize = map(levelPlus, 0, 1, 0, 1600);
   sphere(sphereSize, sphereDetail, sphereDetail);
   pop();
   
   //Element 2: particles
   stroke(white);
   strokeWeight(levelPlus*100);
   //fill(red);
   let grainSize = map(levelPlus, 0, 1, 0, 20);
   for (let i = 0; i < 159; i++) {
     let x = random(-windowWidth, windowWidth);
     let y = random(-windowHeight, windowHeight);
     let z = random(-50, 50);
     push();
     translate(x, y, z);
     sphere(grainSize);
     pop();
   }
    
   //GRAIN EFFECT
   stroke(black);
   strokeWeight(levelPlus*100);
   //fill(red);
   grainSize = map(levelPlus, 0, 10, 0, 20);
   for (let i = 0; i < 400; i++) {
     let x = random(-windowWidth, windowWidth);
     let y = random(-windowHeight, windowHeight);
     let z = random(-50, 50);
     push();
     translate(x, y, z);
     sphere(grainSize);
     pop();
   }
   
   //GRAIN EFFECT
   stroke(white);
   strokeWeight(levelPlus*100);
   //fill(red);
   grainSize = map(levelPlus, 0, 10, 0, 20);
   for (let i = 0; i < 400; i++) {
     let x = random(-windowWidth, windowWidth);
     let y = random(-windowHeight, windowHeight);
     let z = random(-50, 50);
     push();
     translate(x, y, z);
     sphere(grainSize);
     pop();
   }
 
}

function scene1_03() { 
  background(white);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 5;
  spectrumPlus = spectrum * 100;
  stroke(black);
  strokeWeight(levelPlus*100);
  let grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }

  // Element 1: the polygon
  camX = map(level, 0, 1, -500, 500);
  camY = map(level, 0, 1, -500, 500);
  camZ = map(level, 0, 1, -500, -100);
  translate(0, 0, 0);
  push();
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  rotateX(frameCount * level * 5);
  rotateY(frameCount * level * 5);
  let sphereDetail = round(map(levelPlus, 0, 6, 5, 15));
  sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
  stroke(white);
  strokeWeight(levelPlus*100);
  let sphereSize = map(levelPlus, 0, 1, 0, 1600);
  sphere(sphereSize, sphereDetail, sphereDetail);
  pop();
  
  //Particles
  stroke(white);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 159; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(black);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}

function scene1_04(){ 
  //background(white);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 5;
  spectrumPlus = spectrum * 100;

  //PARTICLES
  grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(black);
    strokeWeight(levelPlus*100);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(black);
    strokeWeight(levelPlus*100);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  //the polygons
  camX = map(level, 0, 1, -500, 500);
  camY = map(level, 0, 1, -500, 500);
  camZ = map(level, 0, 1, -500, -100);
  translate(0, 0, 0);
  push();
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  rotateX(frameCount * level * 5);
  rotateY(frameCount * level * 5);

  let numSpheres = 2; // number of spheres to create
  let maxSphereSize = 1000;
  let minSphereSize = 100;
  for (let i = 0; i < numSpheres; i++) {
  let sphereDetail = round(map(levelPlus, 0, 6, 5, 5));
  sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
  let sphereSize = map(levelPlus, 0, 1, minSphereSize, maxSphereSize);
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    stroke(white);
    strokeWeight(levelPlus * 100);
    sphere(sphereSize, sphereDetail, sphereDetail);
    pop();
  }

  pop();
  //particles
  stroke(black);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}  


function scene1_05(){ 
  background(white);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 5;
  spectrumPlus = spectrum * 100;
  //----------------------------------------------------------------------------------
  stroke(red);
  strokeWeight(levelPlus*100);
  let grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  //particles
  stroke(black);
  strokeWeight(levelPlus*20);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(white);
    strokeWeight(levelPlus*100);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  grainSize = map(levelPlus, 0, 1, 0, 30);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(black);
    strokeWeight(levelPlus*20);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  camX = map(level, 0, 1, -500, 500);
  camY = map(level, 0, 1, -500, 500);
  camZ = map(level, 0, 1, -500, -100);
  translate(0, 0, 0);
  push();
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  rotateX(frameCount * level * 5);
  rotateY(frameCount * level * 5);
  let numSpheres = 3;
  let maxSphereSize = 1000;
  let minSphereSize = 100;
  for (let i = 0; i < numSpheres; i++) {
  let sphereDetail = round(map(levelPlus, 0, 6, 5, 15));
  sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
  let sphereSize = map(levelPlus, 0, 1, minSphereSize, maxSphereSize);
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    stroke(white);
    strokeWeight(levelPlus * 100);
    sphere(sphereSize, sphereDetail, sphereDetail);
    pop();
  }
  pop();
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}
  
  
function scene1_06(){ 
  background(black);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 5;
  spectrumPlus = spectrum * 100;
//----------------------------------------------------------------------------------
  stroke(red);
  strokeWeight(levelPlus*100);
  let grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(levelPlus*100);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  grainSize = map(levelPlus, 0, 1, 0, 20);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(black);
    strokeWeight(levelPlus*100);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  grainSize = map(levelPlus, 0, 1, 0, 30);
  for (let i = 0; i < 200; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    stroke(black);
    strokeWeight(levelPlus*100);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  // the polygons
  camX = map(level, 0, 1, -500, 500);
  camY = map(level, 0, 1, -500, 500);
  camZ = map(level, 0, 1, -500, -100);
  translate(0, 0, 0);
  push();
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  rotateX(frameCount * level * 5);
  rotateY(frameCount * level * 5);
  let numSpheres = 3; 
  let maxSphereSize = 1000;
  let minSphereSize = 100;
  for (let i = 0; i < numSpheres; i++) {
  let sphereDetail = round(map(levelPlus, 0, 6, 5, 15));
  sphereDetail = constrain(sphereDetail, sphereDetail, sphereDetail);
  let sphereSize = map(levelPlus, 0, 1, minSphereSize, maxSphereSize);
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    stroke(black);
    fill(white)
    strokeWeight(levelPlus * 100);
    sphere(sphereSize, sphereDetail, sphereDetail);
    pop();
  }
  pop();

  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}

function scene2_01(){
  
let spacing = 0;
let diameter = 0;
let PROBABILITY = 0.5;
background(black);
level = analyzer.getLevel();
spectrum = fft.analyze();
levelPlus = level * 10;
spectrumPlus = spectrum * 100;
//----------------------------------------------------------------------------------
stroke(0, level);
translate(-width / 2, -height / 2);
spacing = map(levelPlus, 0, 1, 10, 150);
diameter = map(levelPlus, 0, 1, 10, 150);
PROBABILITY = map(levelPlus, 0, 1, 0.2, 0.8);
//----------------------------------------------------------------------------------
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      if (random(1) < PROBABILITY) {
        push();
        translate(x, y + spacing, 0);
        rotateZ(radians(frameCount * 0.1));
        fill(white);
        stroke(black);
        strokeWeight(levelPlus * 100);
        box(diameter, diameter, diameter);
        pop();
      } else {
        push();
        translate(x + (spacing * 0.5), y + (spacing * 0.5), 0);
        rotateZ(radians(frameCount * 0.1));
        fill(red);
        stroke(black);
        strokeWeight(levelPlus * 100);
        ellipse(0, 0, diameter, diameter);
        pop();
      }
    }
  }
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
}

function scene2_02(){
  
let spacing = 0;
let diameter = 0;
let PROBABILITY = 0.5;
background(black);
level = analyzer.getLevel();
spectrum = fft.analyze();
levelPlus = level * 10;
spectrumPlus = spectrum * 100;
  
stroke(0, level);
translate(-width / 2, -height / 2);

spacing = map(levelPlus, 0, 1, 10, 250);
diameter = map(levelPlus, 0, 1, 10, 250);
PROBABILITY = map(levelPlus, 0, 1, 0.2, 0.8);

  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      if (random(1) < PROBABILITY) {
        push();
        translate(x, y + spacing, 0);
        rotateZ(radians(frameCount * 0.1));
        fill(red);
        stroke(black);
        strokeWeight(levelPlus * 100);
        box(diameter, diameter, diameter);
        pop();
      } else {
        push();
        translate(x + (spacing * 0.5), y + (spacing * 0.5), 0);
        rotateZ(radians(frameCount * 0.1));
        fill(blue);
        stroke(black);
        strokeWeight(levelPlus * 100);
        ellipse(0, 0, diameter, diameter);
        pop();
      }
    }
  }
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
}
function scene3_01(){
  blackground(white);
  //background(black);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 10;
  spectrumPlus = spectrum * 100;
 
//particle
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
}
function scene3_01() {
  
  background(black);
  for (let i = 0; i < 700; i++) {
    let x = sin(angle + i / 10) * 200;
    let y = cos(angle + i / 10) * 200;
    let z = i / 2;
    fill(blue);
    stroke(black);
    push();
    translate(x, y, z);
    sphere(level);
    pop();
  }
  angle += 0.01;

}
function scene4_01() {
background(black);
level = analyzer.getLevel();
spectrum = fft.analyze();
levelPlus = level * 10;
spectrumPlus = spectrum * 100;
  
//particles
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  

}

function scene4_02() {
background(black);
level = analyzer.getLevel();
spectrum = fft.analyze();
levelPlus = level * 10;
spectrumPlus = spectrum * 100;
  
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  
  stroke(red);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}

function scene4_03() {
background(black);
level = analyzer.getLevel();
spectrum = fft.analyze();
levelPlus = level * 10;
spectrumPlus = spectrum * 100;
//----------------------------------------------------------------

//particles
stroke(black);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(z, z, z);
    translate(z, z, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(x, y, z);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(blue);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(z, z, z);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(red);
  strokeWeight(level*10);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(black);
  strokeWeight(level);
  //fill(red);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
  stroke(white);
  strokeWeight(level);
  //fill(red);
  grainSize = map(levelPlus, 0, 10, 0, 20);
  for (let i = 0; i < 400; i++) {
    let x = random(-windowWidth, windowWidth);
    let y = random(-windowHeight, windowHeight);
    let z = random(-50, 50);
    push();
    translate(x, y, z);
    sphere(grainSize);
    pop();
  }
}
function scene5_01() {  
  background(white);
  level = analyzer.getLevel();
  spectrum = fft.analyze();
  levelPlus = level * 10;
  spectrumPlus = spectrum * 100;

  let x1;
  let y1;
      stroke(black);
      strokeWeight(levelPlus*100);
      rotate((PI / 10) * frameCount);
      box(random(700));
      for (let i = 0; i < 10; i++) {
          rotate((PI / 200) * levelPlus);
          fill(red);
          box(random(400));
      }
      for (let i = 0; i < 20; i++) {
          rotate((PI / 20) * levelPlus);
          fill(blue);
          box(random(266));
      }
      for (let i = 0; i < 15; i++) {
          rotate((PI / 52) * level);
          fill(yellow);
          box(random(400));
      }
      rotate((PI / 200) * levelPlus);
      box(random(400));
      for (let x = 10; x <= windowWidth; x += 160) {
          for (let y = 10; y <= windowHeight; y += 160) {
              translate(x, y, 10);
              rotate((PI / 20) * levelPlus);
              box(random(700));
          }
          x1 = x1 * y1;
          y1 = y1 + x1;
      }
      
      strokeWeight(level*10);
      grainSize = map(levelPlus, 0, 10, 0, 20);
      for (let i = 0; i < 400; i++) {
        let x = random(-windowWidth, windowWidth);
        let y = random(-windowHeight, windowHeight);
        let z = random(-50, 50);
        push();
        translate(x, y, z);
        translate(x, y, z);
        translate(x, y, z);
        sphere(grainSize);
        pop();
      }

      stroke(blue);
      strokeWeight(level*100);
      grainSize = map(levelPlus, 0, 10, 0, 20);
      for (let i = 0; i < 400; i++) {
        let x = random(-windowWidth, windowWidth);
        let y = random(-windowHeight, windowHeight);
        let z = random(-50, 50);
        push();
        translate(x, y, z);
        translate(z, z, z);
        translate(x, y, z);
        sphere(grainSize);
        pop();
      }

      stroke(red);
      strokeWeight(levelPlus*100);
      grainSize = map(levelPlus, 0, 10, 0, 20);
      for (let i = 0; i < 400; i++) {
        let x = random(-windowWidth, windowWidth);
        let y = random(-windowHeight, windowHeight);
        let z = random(-50, 50);
        push();
        translate(x, y, z);
        translate(x, y, z);
        sphere(grainSize);
        pop();
      }

      stroke(black);
      strokeWeight(level);
      grainSize = map(levelPlus, 0, 10, 0, 20);
      for (let i = 0; i < 400; i++) {
        let x = random(-windowWidth, windowWidth);
        let y = random(-windowHeight, windowHeight);
        let z = random(-50, 50);
        push();
        translate(x, y, z);
        sphere(grainSize);
        pop();
      }

      stroke(white);
      strokeWeight(level);
      grainSize = map(levelPlus, 0, 10, 0, 20);
      for (let i = 0; i < 400; i++) {
        let x = random(-windowWidth, windowWidth);
        let y = random(-windowHeight, windowHeight);
        let z = random(-50, 50);
        push();
        translate(x, y, z);
        sphere(grainSize);
        pop();
      }
  }
  
 

function mousePressed() {
  userStartAudio();
  click = true;
}
