const opentype = require('opentype.js');

function createGlyphI(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const x = 400;
    // Uma linha vertical simples, transformada em um retângulo fino.
    path.moveTo(x - thickness / 2, 700);
    path.lineTo(x + thickness / 2, 700);
    path.lineTo(x + thickness / 2, 100);
    path.lineTo(x - thickness / 2, 100);
    path.closePath();
    return new opentype.Glyph({
        name: 'i',
        unicode: 'i'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphI };