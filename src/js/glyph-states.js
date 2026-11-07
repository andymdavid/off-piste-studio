const block = (x, y, width = 10, height = 10) => Object.freeze({ x, y, width, height });
const state = ({ blocks, contexts = ['lab'], aliases = [], ...definition }) => Object.freeze({
  ...definition,
  contexts: Object.freeze(contexts),
  aliases: Object.freeze(aliases),
  blocks: Object.freeze(blocks),
});

export const GLYPH_STATES = Object.freeze({
  base: state({ id: 'base', number: '01', label: 'Base', family: 'Face', status: 'Production', contexts: ['lab', 'brand'], blocks: [block(16, 11), block(38, 11), block(6, 33), block(48, 33), block(16, 43, 32, 10)] }),
  wink: state({ id: 'wink', number: '02', label: 'Wink', family: 'Face', status: 'Production', contexts: ['lab', 'brand'], blocks: [block(16, 11), block(37, 14, 12, 3), block(6, 33), block(48, 33), block(16, 43, 32, 10)] }),
  'look-left': state({ id: 'look-left', number: '03', label: 'Look left', family: 'Face', status: 'Experimental', blocks: [block(12, 11), block(34, 11), block(6, 33), block(48, 33), block(16, 43, 32, 10)] }),
  'look-right': state({ id: 'look-right', number: '04', label: 'Look right', family: 'Face', status: 'Experimental', blocks: [block(20, 11), block(42, 11), block(6, 33), block(48, 33), block(16, 43, 32, 10)] }),
  think: state({ id: 'think', number: '05', label: 'Think', family: 'Face', status: 'Experimental', blocks: [block(16, 11), block(38, 11), block(6, 33), block(48, 33), block(16, 43, 32, 8), block(27, 51)] }),
  flag: state({ id: 'flag', number: '06', label: 'Flag', family: 'Directional', status: 'Experimental', blocks: [block(8, 4, 10, 56), block(18, 12), block(18, 22), block(18, 32), block(28, 17), block(28, 27), block(38, 22)] }),
  mountain: state({ id: 'mountain', number: '07', label: 'Mountain', family: 'Directional', status: 'Experimental', blocks: [block(6, 45), block(14, 37), block(22, 29), block(30, 21), block(38, 29), block(46, 37), block(54, 45)] }),
  arrow: state({ id: 'arrow', number: '08', label: 'Arrow', family: 'Directional', status: 'Experimental', blocks: [block(7, 27, 34, 10), block(31, 17), block(41, 27), block(31, 37)] }),
  loading: state({ id: 'loading', number: '09', label: 'Loading', family: 'System', status: 'Production', contexts: ['lab', 'status'], blocks: [block(27, 6), block(43, 12), block(50, 27), block(43, 43), block(27, 50), block(11, 43), block(4, 27), block(11, 12)] }),
  sparkle: state({ id: 'sparkle', number: '10', label: 'Sparkle', family: 'System', status: 'Production', contexts: ['lab', 'status'], blocks: [block(27, 4, 10, 18), block(27, 42, 10, 18), block(4, 27, 18, 10), block(42, 27, 18, 10), block(18, 18, 28, 28)] }),
  check: state({ id: 'check', number: '11', label: 'Check', family: 'System', status: 'Production', contexts: ['lab', 'status'], blocks: [block(4, 30), block(14, 40), block(24, 30), block(34, 20), block(44, 10), block(54, 0)] }),
  x: state({ id: 'x', number: '12', label: 'X', family: 'System', status: 'Production', contexts: ['lab', 'status'], aliases: ['error'], blocks: [block(10, 10), block(20, 20), block(30, 30), block(40, 40), block(40, 10), block(30, 20), block(20, 30), block(10, 40)] }),
  focus: state({ id: 'focus', number: '13', label: 'Focus', family: 'System', status: 'Production', contexts: ['lab', 'status'], blocks: [block(15, 12, 34, 8), block(15, 44, 34, 8), block(12, 20, 8, 24), block(44, 20, 8, 24)] }),
});

export const GLYPH_STATE_ORDER = Object.freeze([
  'base', 'wink', 'look-left', 'look-right', 'think', 'flag', 'mountain',
  'arrow', 'loading', 'sparkle', 'check', 'x', 'focus',
]);

export const GLYPH_STATE_LIST = Object.freeze(GLYPH_STATE_ORDER.map((id) => GLYPH_STATES[id]));

export const GLYPH_ALIASES = Object.freeze(Object.fromEntries(
  GLYPH_STATE_LIST.flatMap((glyphState) => glyphState.aliases.map((alias) => [alias, glyphState.id])),
));

export const glyphStatesForContext = (context) => GLYPH_STATE_LIST.filter(
  (glyphState) => glyphState.contexts.includes(context),
);

export const resolveGlyphState = (id) => GLYPH_STATES[GLYPH_ALIASES[id] || id] || null;
