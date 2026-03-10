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

function createGlyphTT(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const horizontalShift = 300; // Largura de um glifo 't'

    drawTShape(path, thickness, 0);
    drawTShape(path, thickness, horizontalShift);

    return new opentype.Glyph({
        name: 't_t',
        advanceWidth: horizontalShift * 2,
        path: path
    });
}

module.exports = { createGlyphTT };