const opentype = require('opentype.js');

function createGlyphE(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    path.moveTo(400, 700);
    path.quadraticCurveTo(-200, 400, 400, 100);
    path.lineTo(400 + thickness, 100);
    path.quadraticCurveTo(-200 + thickness, 400, 400 + thickness, 700);
    path.closePath();
    return new opentype.Glyph({
        name: 'e',
        unicode: 'e'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphE };