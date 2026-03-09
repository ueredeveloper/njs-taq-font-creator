const opentype = require('opentype.js');

function createGlyphD(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    // Linha curvada para a direita, com o dobro da altura da letra 'a' (~500 unidades).
    // A altura da letra 'd' é de ~1000 unidades.
    path.moveTo(400, 1200);
    path.quadraticCurveTo(1400, 700, 400, 200);
    path.lineTo(400 - thickness, 200);
    path.quadraticCurveTo(1400 - thickness, 700, 400 - thickness, 1200);
    path.closePath();
    return new opentype.Glyph({
        name: 'd',
        unicode: 'd'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphD };