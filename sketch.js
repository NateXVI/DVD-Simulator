let dvdImgae;
let dvdScale = 0.25;
let dvdSpeed;
let dvdPos;
let backgroundColor;

let domain = 'https://dvd.stoopid.fun';
function preload(){
    dvdImage = loadImage(domain + '/dvdlogo.png');
  }

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL, 100);
    dvdSpeed = createVector(random([-1,1]),random([-1,1])).setMag(0.3);
    angleMode(DEGREES);
    dvdSpeed.rotate(random(-10,10));
    backgroundColor = color(random(100), 100, 50);
    background(backgroundColor);
    console.log(dvdSpeed);
    dvdPos = createVector(random(0, width - dvdImage.width * dvdScale), random(0, height - dvdImage.height * dvdScale));
}

function draw() {
    background(backgroundColor);
    dvdMove();
    image(dvdImage, dvdPos.x, dvdPos.y, dvdImage.width * dvdScale, dvdImage.height * dvdScale);
    if(millis() < 2000){
        push();
        fill(255);
        textFont('sans-serif', 40);
        textAlign(CENTER, CENTER);
        text('click!', width/2, height/2);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function touchStarted() {
    mousePressed();
}


function dvdMove() {
    dvdPos.x += dvdSpeed.x * deltaTime;
    dvdPos.y += dvdSpeed.y * deltaTime;

    if (dvdPos.x < 0) {
        //dvdPos.x *= -1;
        dvdPos.x = constrain(dvdPos.x, 0, width - dvdImage.width * dvdScale);
        dvdSpeed.x *= -1;
        changeBackground();
    }
    if (dvdPos.y < 0) {
        //dvdPos.y *= -1;
        dvdPos.y = constrain(dvdPos.y, 0, height - dvdImage.height * dvdScale);
        dvdSpeed.y *= -1;
        changeBackground();
    }
    if (dvdPos.x > width - dvdImage.width * dvdScale) {
        //dvdPos.x -= 2 * abs(dvdPos.x - dvdImage * dvdScale);
        dvdPos.x = constrain(dvdPos.x, 0, width - dvdImage.width * dvdScale);
        dvdSpeed.x *= -1;
        changeBackground();
    }
    if (dvdPos.y > height - dvdImage.height * dvdScale) {
        dvdPos.y = constrain(dvdPos.y, 0, height - dvdImage.height * dvdScale);
        dvdSpeed.y *= -1;
        changeBackground();
    }
}

function changeBackground() {
    let oldColor = backgroundColor
    backgroundColor = color(random(100), 100, 50);
    let d = abs(hue(backgroundColor) - hue(oldColor));
    if (d < 10 || d > 90) changeBackground();
    let r = random(-15,15);
    // console.log(r);
    dvdSpeed.rotate(r);
}