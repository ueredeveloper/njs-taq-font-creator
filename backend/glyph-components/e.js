const opentype = require('opentype.js');

function createGlyphE(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a esquerda
    const radius = 50;
    const x1 = radius; // Para que a borda externa esquerda fique em x=0
    const y1 = 450, y2 = 350; // Centralizado em y=400

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midY = (y1 + y2) / 2;
    const outerLeftX = x1 - radius;
    const innerX = x1 + thickness;
    const innerLeftX = innerX - radius;

    // Arco externo (para a esquerda)
    path.moveTo(x1, y1);
    path.curveTo(x1 - control, y1, outerLeftX, midY + control, outerLeftX, midY);
    path.curveTo(outerLeftX, midY - control, x1 - control, y2, x1, y2);

    // Arco interno
    path.lineTo(innerX, y2);
    path.curveTo(innerX - control, y2, innerLeftX, midY - control, innerLeftX, midY);
    path.curveTo(innerLeftX, midY + control, innerX - control, y1, innerX, y1);

    path.closePath();
    return new opentype.Glyph({
        name: 'e',
        unicode: 'e'.charCodeAt(0),
        advanceWidth: radius + thickness, // 70
        path: path
    });
}

module.exports = { createGlyphE };