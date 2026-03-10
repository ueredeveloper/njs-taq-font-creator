const opentype = require('opentype.js');

function drawVShape(path, thickness, yOffset) {
    // Linha oblíqua da esquerda para a direita (sobe)
    const x1 = 0, y1 = 550 + yOffset;
    const x2 = 300, y2 = 250 + yOffset;

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const dx = (thickness / 2) * Math.sin(angle);
    const dy = (thickness / 2) * Math.cos(angle);

    path.moveTo(x1 - dx, y1 + dy);
    path.lineTo(x2 - dx, y2 + dy);
    path.lineTo(x2 + dx, y2 - dy);
    path.lineTo(x1 + dx, y1 - dy);
    path.closePath();
}

function createGlyphVVV(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const verticalShift = 300; // Altura do glifo 'v' para união perfeita

    drawVShape(path, thickness, 0);
    drawVShape(path, thickness, -verticalShift);
    drawVShape(path, thickness, -verticalShift * 2);

    return new opentype.Glyph({
        name: 'v_v_v',
        advanceWidth: 300, // Mesma largura do 'v' simples
        path: path
    });
}

module.exports = { createGlyphVVV };