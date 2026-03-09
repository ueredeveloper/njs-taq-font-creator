const opentype = require('opentype.js');

function createGlyphP(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    // Linha curvada para cima, 2x o tamanho da letra 'a'.
    path.moveTo(100, 400);
    path.quadraticCurveTo(500, 1400, 900, 400);
    path.lineTo(900, 400 - thickness);
    path.quadraticCurveTo(500, 1400 - thickness, 100, 400 - thickness);
    path.closePath();
    return new opentype.Glyph({
        name: 'p',
        unicode: 'p'.charCodeAt(0),
        advanceWidth: 1000,
        path: path
    });
}

module.exports = { createGlyphP };