const opentype = require('opentype.js');

function createGlyphGG(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const verticalShift = 1100; // Distância vertical entre as duas curvas

    // Curva G superior
    path.moveTo(400, 900);
    path.quadraticCurveTo(-600, 400, 400, -100);
    path.lineTo(400 + thickness, -100);
    path.quadraticCurveTo(-600 + thickness, 400, 400 + thickness, 900);
    path.closePath();

    // Curva G inferior
    path.moveTo(400, 900 - verticalShift);
    path.quadraticCurveTo(-600, 400 - verticalShift, 400, -100 - verticalShift);
    path.lineTo(400 + thickness, -100 - verticalShift);
    path.quadraticCurveTo(-600 + thickness, 400 - verticalShift, 400 + thickness, 900 - verticalShift);
    path.closePath();

    return new opentype.Glyph({
        name: 'g_g',
        advanceWidth: 800, // Mesma largura do 'g' simples
        path: path
    });
}

module.exports = { createGlyphGG };