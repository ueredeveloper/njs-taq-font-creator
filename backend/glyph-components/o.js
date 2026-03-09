const opentype = require('opentype.js');

function createGlyphO(options) {
    const { thickness } = options;
    const path = new opentype.Path();
    // Curva para a direita, padronizada com as outras vogais.
    path.moveTo(400, 700);
    path.quadraticCurveTo(1100, 400, 400, 100);
    path.lineTo(400 - thickness, 100);
    path.quadraticCurveTo(1100 - thickness, 400, 400 - thickness, 700);
    path.closePath();

    return new opentype.Glyph({
        name: 'o',
        unicode: 'o'.charCodeAt(0),
        advanceWidth: 800,
        path: path
    });
}

module.exports = { createGlyphO };