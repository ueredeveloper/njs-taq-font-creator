const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
 
const FONT_FILENAME = 'fonte_abeu.otf';
const FONTS_DIR = path.join(__dirname, 'fonts');
 
function generateFont() {
    const notdefGlyph = new opentype.Glyph({
        name: '.notdef',
        unicode: 0,
        advanceWidth: 650,
        path: new opentype.Path()
    });
 
    const glyphs = [notdefGlyph];
    const thickness = 20; // Define a espessura da linha
 
    // Glifo 'a': uma linha curvada para cima, mais acentuada e fina
    const pathA = new opentype.Path();
    pathA.moveTo(100, 400);
    pathA.quadraticCurveTo(400, 900, 700, 400);
    pathA.lineTo(700, 400 - thickness);
    pathA.quadraticCurveTo(400, 900 - thickness, 100, 400 - thickness);
    pathA.closePath();
    const glyphA = new opentype.Glyph({
        name: 'a',
        unicode: 'a'.charCodeAt(0),
        advanceWidth: 800,
        path: pathA
    });
    glyphs.push(glyphA);
 
    // Glifo 'b': uma linha curvada para a direita, mais acentuada e fina
    const pathB = new opentype.Path();
    pathB.moveTo(400, 700);
    pathB.quadraticCurveTo(900, 400, 400, 100);
    pathB.lineTo(400 - thickness, 100);
    pathB.quadraticCurveTo(900 - thickness, 400, 400 - thickness, 700);
    pathB.closePath();
    const glyphB = new opentype.Glyph({
        name: 'b',
        unicode: 'b'.charCodeAt(0),
        advanceWidth: 800,
        path: pathB
    });
    glyphs.push(glyphB);
 
    // Glifo 'e': uma linha curvada para a esquerda, mais acentuada e fina
    const pathE = new opentype.Path();
    pathE.moveTo(400, 700);
    pathE.quadraticCurveTo(-100, 400, 400, 100);
    pathE.lineTo(400 + thickness, 100);
    pathE.quadraticCurveTo(-100 + thickness, 400, 400 + thickness, 700);
    pathE.closePath();
    const glyphE = new opentype.Glyph({
        name: 'e',
        unicode: 'e'.charCodeAt(0),
        advanceWidth: 800,
        path: pathE
    });
    glyphs.push(glyphE);
 
    // Glifo 'u': uma linha curvada para baixo, mais acentuada e fina
    const pathU = new opentype.Path();
    pathU.moveTo(100, 400);
    pathU.quadraticCurveTo(400, -100, 700, 400);
    pathU.lineTo(700, 400 + thickness);
    pathU.quadraticCurveTo(400, -100 + thickness, 100, 400 + thickness);
    pathU.closePath();
    const glyphU = new opentype.Glyph({
        name: 'u',
        unicode: 'u'.charCodeAt(0),
        advanceWidth: 800,
        path: pathU
    });
    glyphs.push(glyphU);
 
    const font = new opentype.Font({
        familyName: 'FonteABEU',
        styleName: 'Regular',
        unitsPerEm: 1000,
        ascender: 1000,
        descender: -300,
        glyphs: glyphs
    });
 
    if (!fs.existsSync(FONTS_DIR)) {
        fs.mkdirSync(FONTS_DIR, { recursive: true });
    }
 
    const fontPath = path.join(FONTS_DIR, FONT_FILENAME);
    const buffer = Buffer.from(font.toBuffer());
    fs.writeFileSync(fontPath, buffer);
    console.log(`Fonte "${FONT_FILENAME}" gerada em ${fontPath}`);
}
 
module.exports = { generateFont };