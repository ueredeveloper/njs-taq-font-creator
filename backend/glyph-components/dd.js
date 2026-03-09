const opentype = require('opentype.js');

function createGlyphDD(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    const verticalShift = 1100; // Distância vertical entre as duas curvas

    // Curva D superior
    path.moveTo(400, 1200);
    path.quadraticCurveTo(1400, 700, 400, 200);
    path.lineTo(400 - thickness, 200);
    path.quadraticCurveTo(1400 - thickness, 700, 400 - thickness, 1200);
    path.closePath();

    // Curva D inferior
    path.moveTo(400, 1200 - verticalShift);
    path.quadraticCurveTo(1400, 700 - verticalShift, 400, 200 - verticalShift);
    path.lineTo(400 - thickness, 200 - verticalShift);
    path.quadraticCurveTo(1400 - thickness, 700 - verticalShift, 400 - thickness, 1200 - verticalShift);
    path.closePath();

    return new opentype.Glyph({
        name: 'd_d',
        advanceWidth: 800, // Mesma largura do 'd' simples
        path: path
    });
}

module.exports = { createGlyphDD };