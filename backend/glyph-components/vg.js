const opentype = require('opentype.js');

function drawVShape(path, thickness) {
    // Linha oblíqua da esquerda para a direita (sobe)
    const x1 = 0, y1 = 550;
    const x2 = 300, y2 = 250;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const dx_v = (thickness / 2) * Math.sin(angle);
    const dy_v = (thickness / 2) * Math.cos(angle);
    path.moveTo(x1 - dx_v, y1 + dy_v);
    path.lineTo(x2 - dx_v, y2 + dy_v);
    path.lineTo(x2 + dx_v, y2 - dy_v);
    path.lineTo(x1 + dx_v, y1 - dy_v);
    path.closePath();
}

function drawGShape(path, thickness, xOffset, yOffset) {
    const radius = 150;
    const x1 = radius + xOffset;
    const midYBase = 400 + yOffset;
    const y1 = midYBase + radius;
    const y2 = midYBase - radius;
    const kappa = 0.5522847498;
    const control = radius * kappa;
    const midY = midYBase;
    const outerLeftX = x1 - radius;
    const innerX = x1 + thickness;
    const innerLeftX = innerX - radius;
    path.moveTo(x1, y1);
    path.curveTo(x1 - control, y1, outerLeftX, midY + control, outerLeftX, midY);
    path.curveTo(outerLeftX, midY - control, x1 - control, y2, x1, y2);
    path.lineTo(innerX, y2);
    path.curveTo(innerX - control, y2, innerLeftX, midY - control, innerLeftX, midY);
    path.curveTo(innerLeftX, midY + control, innerX - control, y1, innerX, y1);
    path.closePath();
}

function createGlyphVG(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    drawVShape(path, thickness);

    // V termina em (300, 250). O topo do G (y=550) deve se conectar a este ponto.
    const xOffset = 300; // g's left edge is at xOffset
    const yOffset = 250 - 550; // g's top is at 550

    drawGShape(path, thickness, xOffset, yOffset);

    return new opentype.Glyph({
        name: 'v_g',
        advanceWidth: 300, // Largura do V
        path: path
    });
}

module.exports = { createGlyphVG };