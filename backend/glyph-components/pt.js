const opentype = require('opentype.js');

function drawPShape(path, thickness) {
    // Coordenadas para uma "meia-lua" perfeita (semicírculo) para cima
    const x1 = 0, y1 = 400;
    const x2 = 300, y2 = 400;
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

function drawTShape(path, thickness, xOffset, yOffset) {
    const width = 300;
    const y = 400; // Original baseline of T

    path.moveTo(0 + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y + thickness / 2 + yOffset);
    path.lineTo(0 + xOffset, y + thickness / 2 + yOffset);
    path.closePath();
}

function createGlyphPT(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // 1. Draw the 'p' shape
    drawPShape(path, thickness);

    // 2. 'p' is 300 wide. 't' should start right after it, on the same baseline.
    const dx = 300;
    drawTShape(path, thickness, dx, 0);

    return new opentype.Glyph({
        name: 'p_t',
        advanceWidth: dx + 300, // 300 + 300 = 600
        path: path
    });
}

module.exports = { createGlyphPT };