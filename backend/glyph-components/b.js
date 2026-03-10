const opentype = require('opentype.js');

function createGlyphB(options) {
    const { thickness } = options;
    const path = new opentype.Path();

    // Coordenadas para uma "meia-lua" perfeita (semicírculo)
    const x1 = 0, y1 = 400;
    const x2 = 300, y2 = 400; // y2 é igual a y1 para uma base reta
    const radius = (x2 - x1) / 2; // 150

    // Constante para aproximar um arco de 90 graus com uma curva de Bézier cúbica
    const kappa = 0.5522847498;
    const control = radius * kappa;

    const midX = (x1 + x2) / 2; // Ponto central no eixo X
    const outerBottomY = y1 - radius; // Ponto mais baixo do arco externo
    const innerY = y1 + thickness;
    const innerBottomY = innerY - radius;

    // Desenha o arco externo (de cima para baixo) usando duas curvas de Bézier
    path.moveTo(x1, y1);
    // Primeira metade do arco (esquerda para o meio)
    path.curveTo(x1, y1 - control, midX - control, outerBottomY, midX, outerBottomY);
    // Segunda metade do arco (meio para a direita)
    path.curveTo(midX + control, outerBottomY, x2, y1 - control, x2, y1);

    // Linha reta para conectar ao arco interno
    path.lineTo(x2, innerY);

    // Desenha o arco interno na direção oposta para fechar a forma
    // Primeira metade (direita para o meio)
    path.curveTo(x2, innerY - control, midX + control, innerBottomY, midX, innerBottomY);
    // Segunda metade (meio para a esquerda)
    path.curveTo(midX - control, innerBottomY, x1, innerY - control, x1, innerY);

    path.closePath();
    return new opentype.Glyph({
        name: 'b',
        unicode: 'b'.charCodeAt(0),
        advanceWidth: 300,
        path: path
    });
}

module.exports = { createGlyphB };