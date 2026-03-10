const opentype = require('opentype.js');

function createGlyphV(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Linha oblíqua da esquerda para a direita (sobe)
    const x1 = 0, y1 = 550;
    const x2 = 300, y2 = 250;

    // Calcula o vetor perpendicular para a espessura
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const dx = (thickness / 2) * Math.sin(angle);
    const dy = (thickness / 2) * Math.cos(angle);

    path.moveTo(x1 - dx, y1 + dy);
    path.lineTo(x2 - dx, y2 + dy);
    path.lineTo(x2 + dx, y2 - dy);
    path.lineTo(x1 + dx, y1 - dy);
    path.closePath();

    return new opentype.Glyph({
        name: 'v',
        unicode: 'v'.charCodeAt(0),
        advanceWidth: x2,
        path: path
    });
}

module.exports = { createGlyphV };