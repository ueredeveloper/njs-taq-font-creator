const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
const { createGlyphA } = require('./glyph-components/a.js');
const { createGlyphB } = require('./glyph-components/b.js');
const { createGlyphD } = require('./glyph-components/d.js');
const { createGlyphE } = require('./glyph-components/e.js');
const { createGlyphG } = require('./glyph-components/g.js');
const { createGlyphI } = require('./glyph-components/i.js');
const { createGlyphDD } = require('./glyph-components/dd.js');
const { createGlyphDDD } = require('./glyph-components/ddd.js');
const { createGlyphDDDD } = require('./glyph-components/dddd.js');
const { createGlyphGG } = require('./glyph-components/gg.js');
const { createGlyphGGG } = require('./glyph-components/ggg.js');
const { createGlyphGGGG } = require('./glyph-components/gggg.js');
const { createGlyphO } = require('./glyph-components/o.js');
const { createGlyphP } = require('./glyph-components/p.js');
const { createGlyphU } = require('./glyph-components/u.js');
const { createGlyphT } = require('./glyph-components/t.js');
const { createGlyphTT } = require('./glyph-components/tt.js');
const { createGlyphTTT } = require('./glyph-components/ttt.js');
const { createGlyphSpace } = require('./glyph-components/space.js');
const { createGlyphLines } = require('./glyph-components/lines.js');
 
const FONT_FAMILY_NAME = 'FonteTaq';
const FONT_FILENAME = 'font_taq_maron.otf';
const FONTS_DIR = path.join(__dirname, 'fonts');
 
function generateFont() {
    const notdefGlyph = new opentype.Glyph({
        name: '.notdef',
        unicode: 0,
        advanceWidth: 800,
        path: new opentype.Path()
    });
 
    const thickness = 20; // Define a espessura da linha
    const options = { thickness };
 
    // Criar glifos base a partir dos componentes
    const glyphA = createGlyphA(options);
    const glyphB = createGlyphB(options);
    const glyphD = createGlyphD(options);
    const glyphE = createGlyphE(options);
    const glyphI = createGlyphI(options);
    const glyphO = createGlyphO(options);
    const glyphU = createGlyphU(options);
    const glyphG = createGlyphG(options);
    const glyphP = createGlyphP(options);
    const glyphDD = createGlyphDD(options);
    const glyphGG = createGlyphGG(options);
    const glyphDDD = createGlyphDDD(options);
    const glyphDDDD = createGlyphDDDD(options);
    const glyphGGG = createGlyphGGG(options);
    const glyphGGGG = createGlyphGGGG(options);
    const glyphSpace = createGlyphSpace(options);
    const glyphLines = createGlyphLines(options);
    const glyphT = createGlyphT(options);
    const glyphTT = createGlyphTT(options);
    const glyphTTT = createGlyphTTT(options);
 
    // Criar glifos para ligaduras (usando a mesma forma do 'd')
    const pathD = glyphD.path;
    const ligaturesD = ['d_a', 'd_e', 'd_i', 'd_o', 'd_u'].map(name => {
        return new opentype.Glyph({
            name: name,
            // Glifos de ligadura não têm um ponto unicode, então esta propriedade é omitida.
            advanceWidth: glyphD.advanceWidth,
            path: pathD
        });
    });

    // Criar glifos para ligaduras da letra B
    const pathB = glyphB.path;
    const ligaturesB = ['b_a', 'b_e', 'b_i', 'b_o', 'b_u'].map(name => {
        return new opentype.Glyph({
            name: name,
            advanceWidth: glyphB.advanceWidth,
            path: pathB
        });
    });

    // Criar glifos para ligaduras da letra G
    const pathG = glyphG.path;
    const ligaturesG = ['g_a', 'g_e', 'g_i', 'g_o', 'g_u'].map(name => {
        return new opentype.Glyph({
            name: name,
            advanceWidth: glyphG.advanceWidth,
            path: pathG
        });
    });

    // Criar glifos para ligaduras da letra P
    const pathP = glyphP.path;
    const ligaturesP = ['p_a', 'p_e', 'p_i', 'p_o', 'p_u'].map(name => {
        return new opentype.Glyph({
            name: name,
            advanceWidth: glyphP.advanceWidth,
            path: pathP
        });
    });

    // Criar glifos para ligaduras da letra T
    const pathT = glyphT.path;
    const ligaturesT = ['t_a', 't_e', 't_i', 't_o', 't_u'].map(name => {
        return new opentype.Glyph({
            name: name,
            advanceWidth: glyphT.advanceWidth,
            path: pathT
        });
    });

    const ligatures = [...ligaturesD, ...ligaturesB, ...ligaturesG, ...ligaturesP, ...ligaturesT, glyphDD, glyphDDD, glyphDDDD, glyphGG, glyphGGG, glyphGGGG, glyphTT, glyphTTT];
 
    // Os glifos devem ser ordenados por unicode para evitar erros de 'cmap'.
    // O glifo .notdef deve ser o primeiro. As ligaduras não têm unicode e vêm depois.
    const unicodeGlyphs = [glyphA, glyphB, glyphD, glyphE, glyphG, glyphI, glyphO, glyphP, glyphT, glyphU, glyphSpace, glyphLines];
    unicodeGlyphs.sort((a, b) => a.unicode - b.unicode);

    const glyphs = [
        notdefGlyph,
        ...unicodeGlyphs,
        ...ligatures
    ];
 
    const font = new opentype.Font({
        familyName: FONT_FAMILY_NAME,
        styleName: 'Regular',
        unitsPerEm: 1000,
        ascender: 800,
        descender: -900,
        glyphs: glyphs
    });

    // Adicionar substituições de ligaduras
    // As ligaduras devem ser definidas da mais longa para a mais curta para garantir a correspondência correta.

    // 1. Ligaduras de 6 e 8 caracteres para 'd' e 'g'
    const dLigatures = [];
    const gLigatures = [];
    const tLigatures = [];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    vowels.forEach(v1 => vowels.forEach(v2 => vowels.forEach(v3 => vowels.forEach(v4 => {
        dLigatures.push({ sub: ['d', v1, 'd', v2, 'd', v3, 'd', v4], by: 'd_d_d_d' });
        gLigatures.push({ sub: ['g', v1, 'g', v2, 'g', v3, 'g', v4], by: 'g_g_g_g' });
    }))));
    vowels.forEach(v1 => vowels.forEach(v2 => vowels.forEach(v3 => {
        dLigatures.push({ sub: ['d', v1, 'd', v2, 'd', v3], by: 'd_d_d' });
        gLigatures.push({ sub: ['g', v1, 'g', v2, 'g', v3], by: 'g_g_g' });
        tLigatures.push({ sub: ['t', v1, 't', v2, 't', v3], by: 't_t_t' });
    })));

    // 2. Ligaduras de 4 caracteres (ex: DADE)
    const complexLigatures = [];
    vowels.forEach(v1 => {
        vowels.forEach(v2 => {
            complexLigatures.push({ sub: ['d', v1, 'd', v2], by: 'd_d' });
            complexLigatures.push({ sub: ['g', v1, 'g', v2], by: 'g_g' });
            complexLigatures.push({ sub: ['t', v1, 't', v2], by: 't_t' });
        });
    });

    // 3. Ligaduras de 2 caracteres (ex: DA, DD)
    const simpleLigatures = [
        // Ligaduras de empilhamento
        { sub: ['d', 'd'], by: 'd_d' },
        { sub: ['g', 'g'], by: 'g_g' },
        { sub: ['t', 't'], by: 't_t' },

        // Ligaduras de consoante + vogal (atualmente são placeholders)
        { sub: ['d', 'a'], by: 'd_a' },
        { sub: ['d', 'e'], by: 'd_e' },
        { sub: ['d', 'i'], by: 'd_i' },
        { sub: ['d', 'o'], by: 'd_o' },
        { sub: ['d', 'u'], by: 'd_u' },
        { sub: ['b', 'a'], by: 'b_a' },
        { sub: ['b', 'e'], by: 'b_e' },
        { sub: ['b', 'i'], by: 'b_i' },
        { sub: ['b', 'o'], by: 'b_o' },
        { sub: ['b', 'u'], by: 'b_u' },
        { sub: ['g', 'a'], by: 'g_a' },
        { sub: ['g', 'e'], by: 'g_e' },
        { sub: ['g', 'i'], by: 'g_i' },
        { sub: ['g', 'o'], by: 'g_o' },
        { sub: ['g', 'u'], by: 'g_u' },
        { sub: ['p', 'a'], by: 'p_a' },
        { sub: ['p', 'e'], by: 'p_e' },
        { sub: ['p', 'i'], by: 'p_i' },
        { sub: ['p', 'o'], by: 'p_o' },
        { sub: ['p', 'u'], by: 'p_u' },
        { sub: ['t', 'a'], by: 't_a' },
        { sub: ['t', 'e'], by: 't_e' },
        { sub: ['t', 'i'], by: 't_i' },
        { sub: ['t', 'o'], by: 't_o' },
        { sub: ['t', 'u'], by: 't_u' },
    ];

    const ligatureSubs = [...dLigatures, ...gLigatures, ...tLigatures, ...complexLigatures, ...simpleLigatures];

    ligatureSubs.forEach(lig => {
        try {
            // A função font.glyphNameToIndex() não é confiável em todas as versões da lib.
            // Uma forma mais robusta é encontrar o índice do glifo no nosso array original.
            const byIndex = glyphs.findIndex(g => g.name === lig.by);
            if (byIndex === -1) {
                throw new Error(`O glifo da ligadura '${lig.by}' não foi encontrado.`);
            }
            font.substitution.addLigature('liga', {
                sub: lig.sub.map(c => font.charToGlyphIndex(c)),
                by: byIndex
            });
        } catch (e) {
            console.error(`Erro ao criar ligadura ${lig.by}: ${e.message}`);
            console.error(`Certifique-se que os glifos '${lig.sub.join("', '")}' e '${lig.by}' existem na fonte.`);
        }
    });
 
    if (!fs.existsSync(FONTS_DIR)) {
        fs.mkdirSync(FONTS_DIR, { recursive: true });
    }
 
    const fontPath = path.join(FONTS_DIR, FONT_FILENAME);
    // O método .toBuffer() está obsoleto, usando .toArrayBuffer() em seu lugar.
    const buffer = Buffer.from(font.toArrayBuffer());
    fs.writeFileSync(fontPath, buffer);
    console.log(`Fonte "${FONT_FILENAME}" gerada em ${fontPath}`);
}
 
module.exports = { generateFont };