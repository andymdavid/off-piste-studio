"""Generate regular-weight homepage font subsets from the checked-in originals.

Developer tool only: Python 3, fonttools==4.68.0 and brotli==1.2.1.
Run from the repository root. No Python dependency is needed to build the site.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

source = Path('src/assets/fonts')
output = source / 'critical'
output.mkdir(exist_ok=True)
characters = list(range(0x20, 0x7F)) + [
    0xA0, 0xA9, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2192,
]
for original, target in [
    ('Geist-Variable', 'Geist-Regular'),
    ('GeistSerif-Regular', 'GeistSerif-Regular'),
    ('BebasNeue-Regular', 'BebasNeue-Regular'),
]:
    font = TTFont(source / f'{original}.woff2')
    if 'fvar' in font:
        font = instantiateVariableFont(
            font, {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}, inplace=True,
        )
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['kern', 'liga', 'clig', 'calt', 'locl', 'mark', 'mkmk']
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.name_languages = [0x409]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    font.flavor = 'woff2'
    font.recalcTimestamp = False
    font.save(output / f'{target}.woff2')
