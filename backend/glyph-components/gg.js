const opentype = require('opentype.js');

function drawGShape(path, thickness, yOffset) {
    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a esquerda
    const x1 = 500; // Ajustado para corresponder ao novo 'g'
    const y1 = 900 + yOffset;
    const y2 = -100 + yOffset;
    const radius = (y1 - y2) / 2; // 500

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
}

function createGlyphGG(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const verticalShift = 1100; // Distância vertical entre as duas curvas

    drawGShape(path, thickness, 0);
    drawGShape(path, thickness, -verticalShift);

    return new opentype.Glyph({
        name: 'g_g',
        advanceWidth: 520, // Mesma largura do 'g' simples ajustado
        path: path
    });
}

module.exports = { createGlyphGG };