const opentype = require('opentype.js');

function createGlyphU(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para baixo
    const x1 = 100, y1 = 400;
    const x2 = 700, y2 = 400;
    const radius = (x2 - x1) / 2; // 300

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midX = (x1 + x2) / 2;
    const outerBottomY = y1 - radius;
    const innerY = y1 + thickness;
    const innerBottomY = innerY - radius;

    // Arco externo (para baixo)
    path.moveTo(x1, y1);
    path.curveTo(x1, y1 - control, midX - control, outerBottomY, midX, outerBottomY);
    path.curveTo(midX + control, outerBottomY, x2, y1 - control, x2, y1);

    // Arco interno
    path.lineTo(x2, innerY);
    path.curveTo(x2, innerY - control, midX + control, innerBottomY, midX, innerBottomY);
    path.curveTo(midX - control, innerBottomY, x1, innerY - control, x1, innerY);

    path.closePath();
    return new opentype.Glyph({
        name: 'u',
        unicode: 'u'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphU };