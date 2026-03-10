const opentype = require('opentype.js');

function drawVShape(path, thickness) {
    // Linha oblíqua da esquerda para a direita (sobe)
    const x1 = 0, y1 = 550; // Invertido: desce da esquerda para a direita
    const x2 = 300, y2 = 250; // Ponto final na parte inferior direita
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const dx = (thickness / 2) * Math.sin(angle);
    const dy_v = (thickness / 2) * Math.cos(angle);
    path.moveTo(x1 - dx, y1 + dy_v);
    path.lineTo(x2 - dx, y2 + dy_v);
    path.lineTo(x2 + dx, y2 - dy_v);
    path.lineTo(x1 + dx, y1 - dy_v);
    path.closePath();
}

function drawTShape(path, thickness, xOffset, yOffset) {
    const width = 300;
    const y = 400; // Original baseline of T

    path.moveTo(0 + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y + thickness / 2 + yOffset);
    path.lineTo(0 + xOffset, y + thickness / 2 + yOffset);
    path.closePath();
}

function createGlyphVT(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    drawVShape(path, thickness);

    // V termina em (300, 250). O 't' se conecta horizontalmente.
    const xOffset = 300;
    const yOffset = 0;

    drawTShape(path, thickness, xOffset, yOffset);

    return new opentype.Glyph({
        name: 'v_t',
        advanceWidth: 300 + 300, // Largura do V + Largura do T
        path: path
    });
}

module.exports = { createGlyphVT };