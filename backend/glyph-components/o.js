const opentype = require('opentype.js');

function createGlyphO(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a direita
    const radius = 100;
    const x1 = thickness; // Para que a borda interna esquerda fique em x=0
    const y1 = 500, y2 = 300; // Centralizado em y=400

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
        name: 'o',
        unicode: 'o'.charCodeAt(0),
        advanceWidth: radius + thickness, // 120
        path: path
    });
}

module.exports = { createGlyphO };