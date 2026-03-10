const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
const { createGlyphA } = require('./a.js');
const { createGlyphB } = require('./b.js');
const { createGlyphD } = require('./d.js');
const { createGlyphE } = require('./e.js');
const { createGlyphG } = require('./g.js');
const { createGlyphI } = require('./i.js');
const { createGlyphDD } = require('./dd.js');
const { createGlyphDDD } = require('./ddd.js');
const { createGlyphDDDD } = require('./dddd.js');
const { createGlyphGG } = require('./gg.js');
const { createGlyphGGG } = require('./ggg.js');
const { createGlyphGGGG } = require('./gggg.js');
const { createGlyphO } = require('./o.js');
const { createGlyphP } = require('./p.js');
const { createGlyphU } = require('./u.js');
const { createGlyphT } = require('./t.js');
const { createGlyphTT } = require('./tt.js');
const { createGlyphTTT } = require('./ttt.js');
const { createGlyphGT } = require('./gt.js');
const { createGlyphDT } = require('./dt.js');
const { createGlyphV } = require('./v.js');
const { createGlyphSpace } = require('./space.js');
const { createGlyphLines } = require('./lines.js');
const { createGlyphPT } = require('./pt.js');
const { createGlyphVV } = require('./vv.js');
const { createGlyphVVV } = require('./vvv.js');
const { createGlyphVVVV } = require('./vvvv.js');
const { createGlyphVD } = require('./vd.js');
const { createGlyphVG } = require('./vg.js');
const { createGlyphVP } = require('./vp.js');
const { createGlyphVT } = require('./vt.js');

const FONT_FAMILY_NAME = 'FonteTaq';
const FONT_FILENAME = 'font_taq_maron.otf';
const FONTS_DIR = path.join(__dirname, '..', 'fonts');

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
    const glyphGT = createGlyphGT(options);
    const glyphDT = createGlyphDT(options);
    const glyphV = createGlyphV(options);
    const glyphVV = createGlyphVV(options);
    const glyphVVV = createGlyphVVV(options);
    const glyphVVVV = createGlyphVVVV(options);
    const glyphVD = createGlyphVD(options);
    const glyphVG = createGlyphVG(options);
    const glyphVP = createGlyphVP(options);
    const glyphVT = createGlyphVT(options);

    const ligaturesB = ['b_a', 'b_e', 'b_i', 'b_o', 'b_u'].map(name => new opentype.Glyph({
        name, advanceWidth: glyphB.advanceWidth, path: glyphB.path
    }));
    const ligaturesP = ['p_a', 'p_e', 'p_i', 'p_o', 'p_u'].map(name => new opentype.Glyph({
        name, advanceWidth: glyphP.advanceWidth, path: glyphP.path
    }));
    const ligaturesT = ['t_a', 't_e', 't_i', 't_o', 't_u'].map(name => new opentype.Glyph({
        name, advanceWidth: glyphT.advanceWidth, path: glyphT.path
    }));
    const ligaturesV = ['v_a', 'v_e', 'v_i', 'v_o', 'v_u'].map(name => new opentype.Glyph({
        name, advanceWidth: glyphV.advanceWidth, path: glyphV.path
    }));

    const ligatures = [
        ...ligaturesB,
        ...ligaturesP,
        ...ligaturesT,
        glyphDD,
        glyphDDD,
        glyphDDDD,
        glyphGG,
        glyphGGG,
        glyphGGGG,
        glyphTT,
        glyphTTT,
        glyphGT,
        glyphDT,
        ...ligaturesV,
        glyphVV,
        glyphVVV,
        glyphVVVV,
        glyphVD,
        glyphVG,
        glyphVP,
        glyphVT,
    ];

    // Os glifos devem ser ordenados por unicode para evitar erros de 'cmap'.
    // O glifo .notdef deve ser o primeiro. As ligaduras não têm unicode e vêm depois.
    const unicodeGlyphs = [glyphA, glyphB, glyphD, glyphE, glyphG, glyphI, glyphO, glyphP, glyphT, glyphU, glyphV, glyphSpace, glyphLines];
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
    const vLigatures = [];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    vowels.forEach(v1 => vowels.forEach(v2 => vowels.forEach(v3 => vowels.forEach(v4 => {
        dLigatures.push({ sub: ['d', v1, 'd', v2, 'd', v3, 'd', v4], by: 'd_d_d_d' });
        gLigatures.push({ sub: ['g', v1, 'g', v2, 'g', v3, 'g', v4], by: 'g_g_g_g' });
        vLigatures.push({ sub: ['v', v1, 'v', v2, 'v', v3, 'v', v4], by: 'v_v_v_v' });
    }))));
    vowels.forEach(v1 => vowels.forEach(v2 => vowels.forEach(v3 => {
        dLigatures.push({ sub: ['d', v1, 'd', v2, 'd', v3], by: 'd_d_d' });
        gLigatures.push({ sub: ['g', v1, 'g', v2, 'g', v3], by: 'g_g_g' });
        tLigatures.push({ sub: ['t', v1, 't', v2, 't', v3], by: 't_t_t' });
        vLigatures.push({ sub: ['v', v1, 'v', v2, 'v', v3], by: 'v_v_v' });
    })));

    // 2. Ligaduras de 4 caracteres (ex: DADE)
    const complexLigatures = [];
    vowels.forEach(v1 => {
        vowels.forEach(v2 => {
            complexLigatures.push({ sub: ['d', v1, 'd', v2], by: 'd_d' });
            complexLigatures.push({ sub: ['g', v1, 'g', v2], by: 'g_g' });
            complexLigatures.push({ sub: ['t', v1, 't', v2], by: 't_t' });
            complexLigatures.push({ sub: ['v', v1, 'v', v2], by: 'v_v' });
        });
    });

    // 2.5 Ligaduras de conexão para 't' (g-v-t e d-v-t)
    // Regra para "comer" a vogal final: g-a-t-a -> g_t
    vowels.forEach(v1 => {
        vowels.forEach(v2 => {
            complexLigatures.push({ sub: ['g', v1, 't', v2], by: 'g_t' });
            complexLigatures.push({ sub: ['d', v1, 't', v2], by: 'd_t' });
        });
    });
    // Regra para quando não há vogal final: g-a-t -> g_t
    vowels.forEach(v => {
        complexLigatures.push({ sub: ['g', v, 't'], by: 'g_t' });
        complexLigatures.push({ sub: ['d', v, 't'], by: 'd_t' });
    });

    // 3. Ligaduras de 2 caracteres (ex: DD)
    const simpleLigatures = [
        // Ligaduras de empilhamento
        { sub: ['d', 'd'], by: 'd_d' },
        { sub: ['g', 'g'], by: 'g_g' },
        { sub: ['t', 't'], by: 't_t' },
        { sub: ['v', 'v'], by: 'v_v' },

        // Ligaduras de consoante + vogal para "comer" a vogal
        ...['a', 'e', 'i', 'o', 'u'].map(v => ({ sub: ['b', v], by: `b_${v}` })),
        ...['a', 'e', 'i', 'o', 'u'].map(v => ({ sub: ['p', v], by: `p_${v}` })),
        ...['a', 'e', 'i', 'o', 'u'].map(v => ({ sub: ['t', v], by: `t_${v}` })),
        ...['a', 'e', 'i', 'o', 'u'].map(v => ({ sub: ['v', v], by: `v_${v}` })),
    ];

    const ligatureSubs = [...dLigatures, ...gLigatures, ...tLigatures, ...complexLigatures, ...simpleLigatures]
        .sort((a, b) => b.sub.length - a.sub.length);

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