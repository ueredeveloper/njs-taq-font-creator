const opentype = require('opentype.js');

function createGlyphSpace(options) {
    // A largura do espaço é crucial para a legibilidade. 600 é um bom ponto de partida
    // em um sistema de 1000 unidades por Em.
    return new opentype.Glyph({
        name: 'space',
        unicode: ' '.charCodeAt(0),
        advanceWidth: 600,
        path: new opentype.Path() // O espaço não tem contorno visível
    });
}

module.exports = { createGlyphSpace };