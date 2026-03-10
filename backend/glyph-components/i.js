const opentype = require('opentype.js');

function createGlyphI(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const x = thickness / 2; // Centralizado na própria espessura
    // Uma linha vertical simples, transformada em um retângulo fino.
    path.moveTo(x - thickness / 2, 450);
    path.lineTo(x + thickness / 2, 450);
    path.lineTo(x + thickness / 2, 350);
    path.lineTo(x - thickness / 2, 350);
    path.closePath();
    return new opentype.Glyph({
        name: 'i',
        unicode: 'i'.charCodeAt(0),
        advanceWidth: thickness, // Apenas a espessura da linha
        path: path
    });
}

module.exports = { createGlyphI };