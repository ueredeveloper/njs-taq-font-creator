const opentype = require('opentype.js');

function createGlyphU(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    path.moveTo(100, 400);
    path.quadraticCurveTo(400, -300, 700, 400);
    path.lineTo(700, 400 + thickness);
    path.quadraticCurveTo(400, -300 + thickness, 100, 400 + thickness);
    path.closePath();
    return new opentype.Glyph({
        name: 'u',
        unicode: 'u'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphU };