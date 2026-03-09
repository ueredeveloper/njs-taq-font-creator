const opentype = require('opentype.js');

function createGlyphG(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    // Linha curvada para a esquerda, 2x o tamanho da letra 'e'.
    path.moveTo(400, 900);
    path.quadraticCurveTo(-600, 400, 400, -100);
    path.lineTo(400 + thickness, -100);
    path.quadraticCurveTo(-600 + thickness, 400, 400 + thickness, 900);
    path.closePath();
    return new opentype.Glyph({
        name: 'g',
        unicode: 'g'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphG };