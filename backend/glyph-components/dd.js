const opentype = require('opentype.js');

function drawDShape(path, thickness, yOffset) {
    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para a direita
    const radius = 150;
    const x1 = thickness;
    const midYBase = 400;
    const y1 = midYBase + radius + yOffset;
    const y2 = midYBase - radius + yOffset;

    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midY = midYBase + yOffset;
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
}

function createGlyphDD(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const verticalShift = 300; // 2 * radius

    drawDShape(path, thickness, 0);
    drawDShape(path, thickness, -verticalShift);

    return new opentype.Glyph({
        name: 'd_d',
        advanceWidth: 150 + thickness, // Mesma largura do 'd' simples
        path: path
    });
}

module.exports = { createGlyphDD };