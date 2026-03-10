const opentype = require('opentype.js');

function createGlyphA(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para cima
    const x1 = 0, y1 = 400;
    const x2 = 200, y2 = 400;
    const radius = (x2 - x1) / 2; // 100

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midX = (x1 + x2) / 2;
    const outerTopY = y1 + radius;
    const innerY = y1 - thickness; // Linha interna é deslocada para baixo
    const innerTopY = innerY + radius;

    // Arco externo (para cima)
    path.moveTo(x1, y1);
    path.curveTo(x1, y1 + control, midX - control, outerTopY, midX, outerTopY);
    path.curveTo(midX + control, outerTopY, x2, y1 + control, x2, y1);

    // Linha interna e arco interno
    path.lineTo(x2, innerY);
    path.curveTo(x2, innerY + control, midX + control, innerTopY, midX, innerTopY);
    path.curveTo(midX - control, innerTopY, x1, innerY + control, x1, innerY);

    path.closePath();
    return new opentype.Glyph({
        name: 'a',
        unicode: 'a'.charCodeAt(0),
        advanceWidth: 200,
        path: path
    });
}

module.exports = { createGlyphA };