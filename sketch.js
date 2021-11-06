var params = {
    radius: 40,
    colour: [191, 0, 255]
};


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {}

function keyPressed() {
    switch (key) {
        case 'c':
            drawCircle(mouseX, mouseY);
            break;
        case 't':
            drawTriangle(mouseX, mouseY);
            break;
        case 'e':
            exampleLines();
            break;
    }
    switch (keyCode) {
        case 27:
            clear();
            clickCounter = 0;
            controls = [];
            reset = false;
            break;
        case 13:
            if (!reset) {
                reset = true;
                var x = mouseX,
                    y = mouseY;
                drawFinish(x, y);
                var pX = controls[controls.length - 1].x,
                    pY = controls[controls.length - 1].y;
                drawLine(x, y, pX, pY);
            }
    }
}

var clickCounter = 0;
var controls = [];
var reset = false;

function mouseClicked() {
    if (reset) {
        return;
    }

    if (clickCounter == 0) {
        var x = mouseX,
            y = mouseY;

        drawTriangle(x, y);
        controls.push({
            x: x,
            y: y
        });
    } else {
        var x = mouseX,
            y = mouseY;

        drawCircle(x, y);

        var pX = controls[controls.length - 1].x,
            pY = controls[controls.length - 1].y;
        drawLine(x, y, pX, pY);
        controls.push({
            x: x,
            y: y
        });



    }
    clickCounter++;
}


//#region Functions

function exampleLines() {
    var x1 = random(0, windowWidth);
    var x2 = random(0, windowWidth);
    var y1 = random(0, windowHeight);
    var y2 = random(0, windowHeight);

    drawTriangle(x1, y1);
    drawCircle(x2, y2);

    drawLine(x1, y1, x2, y2);
}


function drawCircle(x, y) {
    noFill();
    stroke(params.colour);
    strokeWeight(params.radius / 10);

    ellipse(x, y, params.radius * 1.2);
}

function drawTriangle(x, y) {
    noFill();
    stroke(params.colour);
    strokeWeight(params.radius / 10);

    var d = params.radius * 1.4;

    beginShape();
    for (i = 0; i < 3; i++) {
        var angle = TWO_PI / 3 * i;
        var px = x + sin(angle) * d / 2;
        var py = y - cos(angle) * d / 2;
        vertex(px, py);
    }
    endShape(CLOSE);
}

function drawLine(x1, y1, x2, y2) {
    var edge1 = edgePoint(x1, y1, x2, y2, params.radius);
    var edge2 = edgePoint(x2, y2, x1, y1, params.radius);

    stroke(params.colour);
    strokeWeight(params.radius / 10);

    let p1 = {
        x: x1,
        y: y1
    };
    let p2 = {
        x: x2,
        y: y2
    };

    if (isClose(p1, p2, edge1, edge2)){
        line(edge1.x, edge1.y, edge2.x, edge2.y);
    }

    

    

}

function edgePoint(x1, y1, x2, y2, radius) {
    var refX = x2 - x1;
    var refY = y2 - y1;

    angleMode(DEGREES);
    var degrees = atan2(refY, refX);
    var cosX1 = cos(degrees);
    var sinY1 = sin(degrees);


    var x = cosX1 * radius / 1.5 + x1;
    var y = sinY1 * radius / 1.5 + y1;

    return {
        x: x,
        y: y
    }
}

function drawFinish(x, y) {
    noFill();
    stroke(params.colour);
    strokeWeight(params.radius / 10);

    ellipse(x, y, params.radius + (3 * (params.radius / 10)));
    ellipse(x, y, params.radius - (2 * (params.radius / 10)));
}

function isClose(p1, p2, ep1, ep2) {
    let ang1 = angle(p1, p2);
    let ang2 = angle(ep1, ep2);
    let diff = ang1 - ang2;

    if (diff < 1 && diff > -1) {
        return true;
    } else {
        return false;
    }
}

function angle(b, c) {
    let a = {
        x: b.x,
        y: b.y + 50
    };

    let ab = distBtwnPoints(a, b);
    let bc = distBtwnPoints(b, c);
    let ac = distBtwnPoints(a, c);

    let part1 = pow(ab, 2) + pow(bc, 2) - pow(ac, 2);
    let part2 = 2 * ab * bc;

    return acos(part1 / part2) * (180 / PI);
}

function distBtwnPoints(a, b) {
    return sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2));
}

//#endregion