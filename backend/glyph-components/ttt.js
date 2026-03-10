const opentype = require('opentype.js');

function drawTShape(path, thickness, xOffset = 0) {
    // Linha horizontal do tamanho de uma consoante (300)
    const width = 300;
    const y = 400; // Linha de base

    path.moveTo(0 + xOffset, y - thickness / 2);
    path.lineTo(width + xOffset, y - thickness / 2);
    path.lineTo(width + xOffset, y + thickness / 2);
    path.lineTo(0 + xOffset, y + thickness / 2);
    path.closePath();
}

function createGlyphTTT(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const horizontalShift = 300;

    drawTShape(path, thickness, 0);
    drawTShape(path, thickness, horizontalShift);
    drawTShape(path, thickness, horizontalShift * 2);

    return new opentype.Glyph({
        name: 't_t_t',
        advanceWidth: horizontalShift * 3,
        path: path
    });
}

module.exports = { createGlyphTTT };