// Jonah Senzel
// 2020
// made with p5.js

// A simple sketch playing with fonts

let links;

let childrenToBeDrawn;

let tempChildText;
let tempChildFont;

let easeIn = .001;

let over = false;

//TODO: add more fonts from google fonts zip
let fonts = ["Arial",
  "Helvetica",
  "Gill Sans",
  "Lucida",
  "Helvetica Narrow",
  "Times",
  "Times New Roman",
  "Palatino",
  "Bookman",
  "New Century Schoolbook",
  "Andale Mono",
  "Courier New",
  "Courier",
  "Lucidatypewriter",
  "Fixed",
  "Comic Sans Comic Sans MS, cursive",
  "Zapf Chancery, cursive",
  "Coronetscript, cursive",
  "Florence, cursive",
  "Parkavenue, cursive",
  "Impact, fantasy",
  "Arnoldboecklin, fantasy",
  "Oldtown, fantasy",
  "Blippo, fantasy",
  "Brushstroke, fantasy"]

//Finds all link classes and randomizes font
function allFontsRandom() {

  //Gets all links by class
  links = document.getElementsByClassName("link");

  //cycles through array and randomizes font of each
  for (let i = 0; i < links.length; i++) {
    let rInd = floor(random(0, fonts.length));
    let rFont = fonts[rInd];
    links[i].style.fontFamily = rFont;
  }
}

function oneFontRandom() {

  // links = document.getElementsByClassName("link");

  // let rLink = links[floor(random(links.length))];

  // let rInd = floor(random(0, fonts.length));
  // let rFont = fonts[rInd];
  // rLink.style.fontFamily = rFont;

  let child = childrenToBeDrawn[floor(random(childrenToBeDrawn.length))];

  child.font = fonts[floor(random(fonts.length))];
}


function setup() {



  canvas = createCanvas(windowWidth, windowHeight);

  canvas.position(0, 0);

  canvas.style("z-index", "-1");
  //createCanvas(400, 400);

  allFontsRandom();
  console.log(links);

  for (let i = 0; i < links.length; i++) {
    // links[i].mouseOver(links[i].innerHTML);
    links[i].addEventListener("mouseenter", linkOver);
    links[i].addEventListener("mouseout", linkOut);

  }

  childrenToBeDrawn = [];
}

function draw() {
  background(255);

  if (random(1) < .5 && childrenToBeDrawn.length > 0) {
    oneFontRandom()
  }

  for (let i = 0; i < floor((childrenToBeDrawn.length * easeIn)); i++) {
    //draw children
    let tChild = childrenToBeDrawn[i];

    fill(tChild.greyScale);
    //font
    textFont(tChild.font);
    textSize(tChild.size);
    text(tChild.text, tChild.xPos, tChild.yPos);

  }

  if (over) {
    easeIn += .2;
  } else {
    easeIn -= .001;
  }

  if (easeIn < 0) {
    easeIn = 0;
  }
  if (easeIn > 1) {
    easeIn = 1;
  }
}

function keyPressed() {
  oneFontRandom();

  //TODO: add sound to keypress
}

function linkOver(linkEl) {
  over = true;
  // console.log(linkEl);

  console.log("linkOver");
  console.log(event.target.innerHTML)

  tempChildText = event.target.innerHTML;

  for (let i = 0; i < random(20, 80); i++) {

    let childObj = {
      xPos: random(width),
      yPos: random(height),

      text: tempChildText,

      font: fonts[floor(random(fonts.length))],

      size: random(5, 30),

      greyScale: random(255)

    }

    childrenToBeDrawn.push(childObj);

  }
}

function linkOut() {
  over = false
  easeIn = 0;
  console.log("linkOut");

  childrenToBeDrawn = [];
}

