const opentype = require('opentype.js');

function drawGShape(path, thickness) {
    const radius = 150;
    const x1 = radius;
    const midYBase = 400;
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

function drawTShape(path, thickness, xOffset, yOffset) {
    const width = 300;
    const y = 400; // Original baseline of T

    path.moveTo(0 + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y - thickness / 2 + yOffset);
    path.lineTo(width + xOffset, y + thickness / 2 + yOffset);
    path.lineTo(0 + xOffset, y + thickness / 2 + yOffset);
    path.closePath();
}

function createGlyphGT(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // 1. Draw the 'g' shape
    drawGShape(path, thickness);

    // 2. Define where the 't' should start
    const g_advanceWidth = 150 + thickness; // 170
    const t_new_y = 250; // Bottom of the 'g' glyph
    const t_original_y = 400;

    const dx = g_advanceWidth;
    const dy = t_new_y - t_original_y; // -150

    // 3. Draw the 't' shape at the new position
    drawTShape(path, thickness, dx, dy);

    return new opentype.Glyph({
        name: 'g_t',
        advanceWidth: dx + 300, // 170 + 300 = 470
        path: path
    });
}

module.exports = { createGlyphGT };