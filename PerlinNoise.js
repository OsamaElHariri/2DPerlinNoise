let canv_width = 400;
let canv_height = 400;
let outer_grid_square = 100;

let num_of_grid_squares = canv_width / outer_grid_square + 1;

// take unit diagonal vectors to be the gradient vectors
let gradient_vectors_options = [
    new Vector(2 ** (1 / 2) / 2, 2 ** (1 / 2) / 2),
    new Vector(2 ** (1 / 2) / 2, -1 * 2 ** (1 / 2) / 2),
    new Vector(-1 * 2 ** (1 / 2) / 2, 2 ** (1 / 2) / 2),
    new Vector(-1 * 2 ** (1 / 2) / 2, -1 * 2 ** (1 / 2) / 2),
    new Vector(1, 0),
    new Vector(0, 1),
    new Vector(-1, 0),
    new Vector(0, -1),
];

// this array holds the corner vector gradients
let gradient_vectors = [];

// fill the gradient vector array with random vectors from gradient_vectors_options 
function initGradientVectors() {
    gradient_vectors = [];
    for (let i = 0; i <= num_of_grid_squares; i++) {
        for (let j = 0; j <= num_of_grid_squares; j++) {
            gradient_vectors.push(gradient_vectors_options[Math.floor(Math.random() * gradient_vectors_options.length)]);
        }
    }
}
initGradientVectors();

// helper function in case the grid size is to be dynamically changed
function changeGridSize(size) {
    outer_grid_square = size;
    num_of_grid_squares = canv_width / outer_grid_square + 1;
    initGradientVectors();
}

// Perlin fade function
function perlinFade(x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
}

// takes the point p (x, y)
// square with corners c1, c2, c3, c4:
//          c1      c2
//              p
//          c3      c4
// find the 'height' at the top of the square, then at the bottom, then at p
// So, first find the 'height' here (at px):    c1 px   c2
// then find the 'height' here (at px):    c3 px   c4
// then find the height at p
function perlinNoiseAtP(px, py, c1, c2, c3, c4) {
    let top = c1 + perlinFade(px) * (c2 - c1);

    let bottom = c3 + perlinFade(px) * (c4 - c3);

    return top + perlinFade(py) * (bottom - top);
}


// return the 4 corner gradients c1, c2, c3, c4 as an array
function getGradientCorners(px, py) {
    let x = Math.floor(px / outer_grid_square);
    let y = Math.floor(py / outer_grid_square);

    let g = gradient_vectors;  // shorter syntax
    let c1 = x + num_of_grid_squares * y;

    return [g[c1], g[c1 + 1], g[c1 + num_of_grid_squares], g[c1 + 1 + num_of_grid_squares]];
}

// return the perlin noise value at a point p
function perlinNoise(px, py) {
    let [c1, c2, c3, c4] = getGradientCorners(px, py);

    // get the x and y values from 0 to 1 within the square
    let x = (px / outer_grid_square) % 1;
    let y = (py / outer_grid_square) % 1;

    // distance vector from four corners to the point
    let c1_dist = Vector.getVector(x, y, 0, 0);
    let c2_dist = Vector.getVector(x, y, 1, 0);
    let c3_dist = Vector.getVector(x, y, 0, 1);
    let c4_dist = Vector.getVector(x, y, 1, 1);


    let c1_dot = Vector.dotProduct(c1, c1_dist);
    let c2_dot = Vector.dotProduct(c2, c2_dist);
    let c3_dot = Vector.dotProduct(c3, c3_dist);
    let c4_dot = Vector.dotProduct(c4, c4_dist);

    // perlinNoise might be NaN on grid vertices
    return perlinNoiseAtP(x, y, c1_dot, c2_dot, c3_dot, c4_dot) || 0;
}
