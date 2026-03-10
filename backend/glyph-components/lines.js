const opentype = require('opentype.js');

function createGlyphLines(options) {
    const path = new opentype.Path();
    const width = 1000; // Largura do bloco de linhas
    const lineThickness = 5; // Linhas finas para o fundo

    // 5 linhas. Se a linha 3 é a base (Y=400) e temos 2 pra cima e 2 pra baixo.
    // Espaçamento de 200 unidades acomoda os glifos de raio 400 (b, p) entre 3 linhas.
    const yLevels = [0, 200, 400, 600, 800];

    yLevels.forEach(y => {
        path.moveTo(0, y);
        path.lineTo(width, y);
        path.lineTo(width, y + lineThickness);
        path.lineTo(0, y + lineThickness);
        path.lineTo(0, y);
    });

    return new opentype.Glyph({
        name: 'lines',
        unicode: '|'.charCodeAt(0), // Mapeado para o caractere pipe '|'
        advanceWidth: width,
        path: path
    });
}

module.exports = { createGlyphLines };