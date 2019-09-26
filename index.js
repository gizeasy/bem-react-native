'use strict';

function withNaming(preset) {
    const nameSpace = preset.n || '';
    const modValueDelimiter = preset.v || preset.m;

    function stringify(b, e, m, mix, styleSheet) {
        const entityName = e ? nameSpace + b + preset.e + e : nameSpace + b;
        const styles = [styleSheet[entityName]];

        if (m) {
            const modPrefix = entityName + preset.m;
            for (let k in m) {
                if (m.hasOwnProperty(k)) {
                    let modName;
                    const modVal = m[k];
                    if (modVal === true) {
                        modName = `${modPrefix + k}`;
                    } else if (Array.isArray(modVal)) {
                        modName = `${modPrefix + k + modValueDelimiter + modVal.join(preset.cv)}`;
                    } else if (modVal) {
                        modName = `${modPrefix + k + modValueDelimiter + modVal}`;
                    }
                    styleSheet[modName] && styles.push(styleSheet[modName]);
                }
            }
        }
        if (mix !== undefined) {
            for (let i = 0, len = mix.length; i < len; i++) {
                if (typeof mix[i] === 'object') {
                    styles.push(mix[i]);
                } else if (Array.isArray(mix[i])) {
                    for (let ii = 0, len = mix[i].length; ii < len; ii++) {
                        styles.push(mix[i][ii]);
                    }
                }
            }
        }
        return styles;
    }
    return function sGenerator(b, e) {
        return function(styleSheet) {
            return function(elemOrMods, elemModsOrBlockMix, elemMix) {
                if (typeof elemOrMods === 'string') {
                    if (Array.isArray(elemModsOrBlockMix)) {
                        return stringify(b, elemOrMods, undefined, elemModsOrBlockMix, styleSheet);
                    } else {
                        return stringify(b, elemOrMods, elemModsOrBlockMix, elemMix, styleSheet);
                    }
                } else {
                    return stringify(b, e, elemOrMods, elemModsOrBlockMix, styleSheet);
                }
            };
        };
    };
}

/**
 Usage:
 import { s } from 'bem-react-native';
 import style from 'path/to/style'

 const sCat = s('Cat')(style);

 sCat();
 // style['Cat']

 sCat({ size: 'm' });
 // [style['Cat'], style['Cat_size_m']]

 sCat('Tail');
 // style['Cat-Tail']

 sCat('Tail', { length: 'small' });
 // [style['Cat-Tail'], style['Cat-Tail_length_small']]

 const sDogPaw = s('Dog', 'Paw')(style);

 sDogPaw();
 // style['Dog-Paw']

 sDogPaw({ color: 'black', exists: true });
 // [style['Dog-Paw'], style['Dog-Paw_color_black'], style['Dog-Paw_exists]]

 const sBlockElement = s('Block','Element')(style);
 const sMix = s('Mix')(style);

 sBlockElement({mod: 'value'}, sMix({mod: 'value'}));
 // [style['Block-Element'], style['Block-Element_mod_value'], style['Mix'], style['Mix_mod_value']]

 sBlockElement({mod: 'value'}, [sMix({mod: 'value'}), {color: '#fff'}]);
 // [style['Block-Element'], style['Block-Element_mod_value'], style['Mix'], style['Mix_mod_value'], {color: '#fff'}]

 sBlockElement({mod: 'value'}, [{color: '#fff'}]);
 // [style['Block-Element'], style['Block-Element_mod_value'], {color: '#fff'}]

 @see https://en.bem.info/methodology/naming-convention/#react-style

 */
const s = withNaming({
    e: '-',
    m: '_',
    v: '_',
    cv: '-',
});

module.exports.s = s;
module.exports.withNaming = withNaming;
