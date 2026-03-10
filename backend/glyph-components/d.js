const opentype = require('opentype.js');

function createGlyphD(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a direita
    const x1 = 400, y1 = 1200;
    const y2 = 200;
    const radius = (y1 - y2) / 2; // 500

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midY = (y1 + y2) / 2;
    const outerRightX = x1 + radius;
    const innerX = x1 - thickness;
    const innerRightX = innerX + radius;

    // Arco externo (para a direita)
    path.moveTo(x1, y1);
    path.curveTo(x1 + control, y1, outerRightX, midY + control, outerRightX, midY);
    path.curveTo(outerRightX, midY - control, x1 + control, y2, x1, y2);

    // Arco interno
    path.lineTo(innerX, y2);
    path.curveTo(innerX + control, y2, innerRightX, midY - control, innerRightX, midY);
    path.curveTo(innerRightX, midY + control, innerX + control, y1, innerX, y1);

    path.closePath();
    return new opentype.Glyph({
        name: 'd',
        unicode: 'd'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphD };