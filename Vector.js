class Vector {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    // return the dot product of two 2D vectors
    static dotProduct (vectorV, vectorU) {
        return vectorV.x * vectorU.x + vectorV.y * vectorU.y;
    }

    // make a vector a unit vector
    static normalize (vector) {
        let length = (vector.x ** 2 + vector.y ** 2) ** (1 / 2);
        return new Vector (vector.x / length, vector.y / length);
    }

    // get vector between a Point and a Corner point on the grid
    // params: pointx, pointy, cornerx, cornery
    static getVector (px, py, cx, cy) {
        return this.normalize(new Vector(px - cx, py - cy));
    }
}

Vector.prototype.toString = function() {
    return `(${this.x}, ${this.y})`;
}