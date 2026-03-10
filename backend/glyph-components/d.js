const opentype = require("opentype.js");

function createGlyphD({ thickness }) {
  const path = new opentype.Path();

  // Semicírculo vertical para a direita, 3x o tamanho da vogal 'o'
  const radius = 300;
  const x1 = thickness; // Borda interna em x=20
  const midY = 400; // Centralizado na linha de base
  const y1 = midY + radius;
  const y2 = midY - radius;

  const kappa = 0.5522847498;
  const control = radius * kappa;

  const outerRightX = x1 + radius;
  const innerX = x1 - thickness; // Borda interna em x=0
  const innerRightX = innerX + radius;

  // Arco externo (para a direita)
  path.moveTo(x1, y1);
  path.curveTo(x1 + control, y1, outerRightX, midY + control, outerRightX, midY);
  path.curveTo(
    outerRightX, midY - control,
    x1 + control, y2,
    x1, y2
  );

  // Linha interna e arco interno
  path.lineTo(innerX, y2);
  path.curveTo(
    innerX + control, y2,
    innerRightX, midY - control,
    innerRightX, midY
  );
  path.curveTo(innerRightX, midY + control, innerX + control, y1, innerX, y1);

  path.closePath();

  return new opentype.Glyph({
    name: "d",
    unicode: "d".charCodeAt(0),
    advanceWidth: radius + thickness, // 320
    path,
  });
}

module.exports = { createGlyphD };