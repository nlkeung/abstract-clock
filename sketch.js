// setup() is called once at page-load
function setup() {
    createCanvas(800,600); // make an HTML canvas element width x height pixels
}

// draw() is called 60 times per second
function draw() {
    let hr = hour();
    let min = minute();
    let currentMin;
    let sec = second();

    background(225);
    stroke(0);
    strokeWeight(3);

    // ---- AM vs PM ----
    strokeWeight(3);
    stroke(0);

    let rSky, gSky, bSky;
    let rSun, gSun, bSun;
    rSun = 252;

    if (hr <= 5) {                      // midnight to 5:59 AM
        rSky = map(hr, 0, 5, 19, 159)
        gSky = map(hr, 0, 5, 38, 245)
        bSky = map(hr, 0, 5, 56, 255)

        gSun = map(hr, 0, 5, 255, 198)
        bSun = map(hr, 0, 5, 185, 60)
    }
    else if (hr > 5 && hr <= 11) {      // 6 AM to 11:59 AM
        rSky = 159;
        gSky = 245;
        bSky = 255;

        gSun = 198;
        bSun = 60;
    }
    else if (hr > 11 && hr <= 17) {     // afternoon to 5:59 PM
        rSky = map(hr, 12, 17, 159, 19)
        gSky = map(hr, 12, 17, 245, 38)
        bSky = map(hr, 12, 17, 255, 56)

        gSun = map(hr, 12, 17, 198, 255)
        bSun = map(hr, 12, 17, 60, 185)

    }
    else {                              // 6 PM to 11:59 PM
        rSky = 19;
        gSky = 38;
        bSky = 56;

        gSun = 255;
        bSun = 185;
    }
    
    fill(rSky, gSky, bSky);
    rect(600, 50, 150, 100, 10)

    fill(rSun, gSun, bSun)
    circle(675, 80, 45)

    fill(28, 117, 52)
    rect(600, 125, 150, 25, 5)
    
    
    // ---- HOUR ----
    strokeWeight(3);
    stroke(0);
    fill(225);
    rect(50, 50, 300, 500, 10);         // border

    fill(0);
    rect(75, 300, 250, 10, 10);         // middle divider line

    let dotsH = [
        {x: 0, y: 0},
        {x: 150, y: 100},
        {x: 150, y: 175},
        {x: 150, y: 250},

        {x: 250, y: 100},
        {x: 250, y: 175},
        {x: 250, y: 250},

        {x: 150, y: 350},
        {x: 150, y: 425},
        {x: 150, y: 500},

        {x: 250, y: 350},
        {x: 250, y: 425},
        {x: 250, y: 500},
    ]

    let hrFormat;
    if ((hr % 12) == 0) {
        hrFormat = 12;
    }
    else {
        hrFormat = hr % 12;
    }

    for (let i = 1; i <= Math.min(hrFormat + 1, 12); i++) {
        fill(0);
        strokeWeight(4);
        if (i == hrFormat + 1) {
            if (min == 0) {
                noFill();
                noStroke();
            }
            else {
                let red = map(59 - min, 0, 59, 45, 207)
                let green = map(59 - min, 0, 59, 56, 255)
                let yellow = map(59 - min, 0, 59, 48, 222)
                fill(red, green, yellow);
            }
        }

        circle(dotsH[i].x, dotsH[i].y, 50)
    }

    // ---- MINUTE ----
    strokeWeight(3);
    stroke(0);
    fill(225);
    rect(400, 250, 200, 300, 10);

    if (currentMin === null || currentMin !== min) {
        currentMin = min;
        print(min)
    }

    let dotsM = [
        {x: 460, y: 310},
        {x: 540, y: 310},
        {x: 460, y: 400},
        {x: 540, y: 400},
        {x: 460, y: 490},
        {x: 540, y: 490},
    ]

    let minTensPlace = Math.floor(min / 10);
    let minOnesPlace = min % 10;

    for (let i = 0; i <= minTensPlace; i++) {
        fill(0);
        strokeWeight(3);
        if (i == minTensPlace) {
            let red = map(10 - (min % 10), 0, 10, 45, 192)
            let green = map(10 - (min % 10), 0, 10, 55, 233)
            let blue = map(10 - (min % 10), 0, 10, 60, 255)
            fill(red, green, blue);

            if (minOnesPlace == 0) {        // do not draw last dot at 0, 10, 20, ..., 60
                noFill();
                noStroke();
            }
        }
        circle(dotsM[i].x, dotsM[i].y, 50)
    }


    // ---- SECOND ----
    strokeWeight(3);
    stroke(0);
    fill(225);
    rect(650, 450, 100, 100, 10);

    let dotsS = [
        {x: 680, y: 470},
        {x: 720, y: 470}, 
        {x: 680, y: 500}, 
        {x: 720, y: 500},
        {x: 680, y: 530}, 
        {x: 720, y: 530}];

    let currentFrame = frameCount % 60;
    let appear;
    if (currentFrame < 30) {
        appear = true;
    }
    else {
        appear = false;
    }
    
    let secTensPlace = Math.floor(sec / 10);
    let secOnesPlace = sec % 10;

    for (let i = 0; i < dotsS.length; i++) {        

        if (i <= secTensPlace) {   // draw dot for tens digit
            strokeWeight(2);
            fill(0);
            if (i == secTensPlace && !appear) {
                noFill();
                noStroke();
            }
            else if (i == secTensPlace && secOnesPlace == 0) {      // do not draw last dot at 0, 10, 20, ..., 60
                noFill();
                noStroke();
            }
            else if (i == secTensPlace && appear) {                 // set color of last dot
                let red = map(10 - (sec % 10), 0, 10, 60, 255)
                let green = map(10 - (sec % 10), 0, 10, 50, 215)
                let blue = map(10 - (sec % 10), 0, 10, 50, 215)
                fill(red, green, blue);
            }
            circle(dotsS[i].x, dotsS[i].y, 20)
        }
    }


}