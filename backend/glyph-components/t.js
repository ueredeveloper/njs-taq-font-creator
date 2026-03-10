const opentype = require('opentype.js');

function createGlyphT(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Linha horizontal do tamanho de uma consoante (300)
    const width = 300;
    const y = 400; // Linha de base

    path.moveTo(0, y - thickness / 2);
    path.lineTo(width, y - thickness / 2);
    path.lineTo(width, y + thickness / 2);
    path.lineTo(0, y + thickness / 2);
    path.closePath();

    return new opentype.Glyph({
        name: 't',
        unicode: 't'.charCodeAt(0),
        advanceWidth: width,
        path: path
    });
}

module.exports = { createGlyphT };