var params = {
    radius: 40,
    colour: [191, 0, 255]
};


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
}

function draw() {
}

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
    switch (keyCode){
        case 27:
            clear();
            background(220);
            clickCounter = 0;
            controls = [];
            reset = false;
            break;
        case 13:
            if (!reset){
                reset = true;
                var x= mouseX, y = mouseY;
                drawFinish(x, y);
                var pX = controls[controls.length - 1].x, pY = controls[controls.length - 1].y;
                drawLine(x, y, pX, pY);
            }
    }
}

var clickCounter = 0;
var controls = [];
var reset = false;

function mouseClicked(){
    if (reset){
        return;
    }

    if (clickCounter == 0){
        var x = mouseX, y = mouseY;

        drawTriangle(x, y);
        controls.push({x: x, y: y});
    }
    else {
        var x = mouseX, y = mouseY;

        drawCircle(x, y);
        
        var pX = controls[controls.length - 1].x, pY = controls[controls.length - 1].y;
        drawLine(x, y, pX, pY);
        controls.push({x: x, y: y});

    }
    clickCounter++;
}
function doubleClicked(){
    if (!reset){
        reset = true;
        drawFinish(mouseX, mouseY);
    }
    
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

    line(edge1.x, edge1.y, edge2.x, edge2.y);
}

function edgePoint(x1, y1, x2, y2, radius) {
    var refX = x2 - x1;
    var refY = y2 - y1;

    var degrees = atan2(refY, refX);
    var cosX1 = cos(degrees);
    var sinY1 = sin(degrees);

    var x = cosX1 * radius + x1;
    var y = sinY1 * radius + y1;

    return {
        x: x,
        y: y
    }
}

function drawFinish(x, y){
    noFill();
    stroke(params.colour);
    strokeWeight(params.radius / 10);

    ellipse(x, y, params.radius + (3 * (params.radius / 10)));
    ellipse(x, y, params.radius - (2 * (params.radius / 10)));
}

//#endregion

