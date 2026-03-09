const opentype = require('opentype.js');

function createGlyphA(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    path.moveTo(100, 400);
    path.quadraticCurveTo(400, 1000, 700, 400);
    path.lineTo(700, 400 - thickness);
    path.quadraticCurveTo(400, 1000 - thickness, 100, 400 - thickness);
    path.closePath();
    return new opentype.Glyph({
        name: 'a',
        unicode: 'a'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphA };