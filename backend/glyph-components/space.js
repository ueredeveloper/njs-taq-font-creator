const opentype = require('opentype.js');

function createGlyphSpace(options) {
    // A largura do espaço é crucial para a legibilidade.
    const advanceWidth = 250;
    return new opentype.Glyph({
        name: 'space',
        unicode: ' '.charCodeAt(0),
        advanceWidth: advanceWidth,
        path: new opentype.Path() // O espaço não tem contorno visível
    });
}

module.exports = { createGlyphSpace };