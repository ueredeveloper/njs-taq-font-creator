const opentype = require('opentype.js');

function drawVShape(path, thickness) {
    // Linha oblíqua da esquerda para a direita (sobe)
    const x1 = 0, y1 = 550; // Invertido: desce da esquerda para a direita
    const x2 = 300, y2 = 250; // Ponto final na parte inferior direita
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const dx_v = (thickness / 2) * Math.sin(angle);
    const dy_v = (thickness / 2) * Math.cos(angle);
    path.moveTo(x1 - dx_v, y1 + dy_v);
    path.lineTo(x2 - dx_v, y2 + dy_v);
    path.lineTo(x2 + dx_v, y2 - dy_v);
    path.lineTo(x1 + dx_v, y1 - dy_v);
    path.closePath();
}

function drawPShape(path, thickness, xOffset, yOffset) {
    const x1 = 0 + xOffset, y1 = 400 + yOffset;
    const x2 = 300 + xOffset, y2 = 400 + yOffset;
    const radius = (x2 - x1) / 2; // 150
    const kappa = 0.5522847498;
    const control = radius * kappa;
    const midX = (x1 + x2) / 2;
    const outerTopY = y1 + radius;
    const innerY = y1 - thickness;
    const innerTopY = innerY + radius;
    path.moveTo(x1, y1);
    path.curveTo(x1, y1 + control, midX - control, outerTopY, midX, outerTopY);
    path.curveTo(midX + control, outerTopY, x2, y1 + control, x2, y1);
    path.lineTo(x2, innerY);
    path.curveTo(x2, innerY + control, midX + control, innerTopY, midX, innerTopY);
    path.curveTo(midX - control, innerTopY, x1, innerY + control, x1, innerY);
    path.closePath();
}

function createGlyphVP(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    drawVShape(path, thickness);

    // V termina em (300, 250). O 'p' se conecta horizontalmente.
    const xOffset = 300;
    const yOffset = 0;

    drawPShape(path, thickness, xOffset, yOffset);

    return new opentype.Glyph({
        name: 'v_p',
        advanceWidth: 300 + 300, // Largura do V + Largura do P
        path: path
    });
}

module.exports = { createGlyphVP };