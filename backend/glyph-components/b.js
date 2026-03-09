const opentype = require('opentype.js');

function createGlyphB(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    // Linha curvada para baixo, 2x o tamanho da letra 'u'.
    path.moveTo(100, 400);
    path.quadraticCurveTo(500, -600, 900, 400);
    path.lineTo(900, 400 + thickness);
    path.quadraticCurveTo(500, -600 + thickness, 100, 400 + thickness);
    path.closePath();
    return new opentype.Glyph({
        name: 'b',
        unicode: 'b'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphB };