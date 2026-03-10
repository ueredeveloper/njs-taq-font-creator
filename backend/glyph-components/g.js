const opentype = require('opentype.js');
function createGlyphG(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a esquerda
    const radius = 150;
    const x1 = radius; // Deslocado para a direita para que o arco termine em X=0
    const midY = 400; // Centralizado na linha de base
    const y1 = midY + radius; // 550
    const y2 = midY - radius; // 250

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const outerLeftX = x1 - radius; // Deve ser 0
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
        name: 'g',
        unicode: 'g'.charCodeAt(0),
        advanceWidth: radius + thickness, // Largura ajustada (150 + 20)
        path: path
    });
}

module.exports = { createGlyphG };