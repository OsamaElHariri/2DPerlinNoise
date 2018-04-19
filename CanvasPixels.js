// HTML5 canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let color = 120;
context.fillStyle = `rgb(${color}, ${color}, ${color})`;

function setGrey(grey) {
    grey = Math.floor(grey);
    context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`;
}

let colors = [];

changeGridSize(80);
for (let i = 5; i < width; i++) {
    for (let j = 0; j < height; j++) {
        let grey = (perlinNoise(i, j) + 1) * 122;
        colors[i * width + j] = grey;
        // setGrey(grey);
        // context.fillRect(i, j, 1, 1);
    }
}

changeGridSize(50);
for (let i = 5; i < width; i++) {
    for (let j = 0; j < height; j++) {
        colors[i * width + j] += (perlinNoise(i, j) + 1) / 2 * 40;
        // setGrey(colors[i * width + j]);
        // context.fillRect(i, j, 1, 1);
    }
}


changeGridSize(20);
for (let i = 5; i < width; i++) {
    for (let j = 0; j < height; j++) {
        colors[i * width + j] += (perlinNoise(i, j) + 1) / 2 * 20;
        setGrey(colors[i * width + j]);
        context.fillRect(i, j, 1, 1);
    }
}



console.log('done');