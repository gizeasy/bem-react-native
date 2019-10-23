'use strict';

interface IPreset {
    n?: string;
    e?: string;
    m?: string;
    v?: string;
    cv?: string;
}

function withNaming(preset: IPreset) {
    const nameSpace: string = preset.n || '';
    const modValueDelimiter: string = preset.v || preset.m || '';

    function stringify(
        b: string,
        e?: string,
        m?: object | null,
        mix?: (object | object[])[] | null,
        styleSheet?: object
    ) {
        const entityName: string = e ? nameSpace + b + preset.e + e : nameSpace + b;
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
        if (mix !== undefined && mix !== null) {
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
    return function sGenerator(b: string, e?: string) {
        return function(styleSheet: object) {
            return function(
                elemOrMods?: string | object | null,
                elemModsOrBlockMix?: (object | object[])[] | null,
                elemMix?: (object | object[])[]
            ) {
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
 * Usage:
 *
 * import { s } from '@bem-react/classname';
 * import style from 'path/to/style'
 * const sCat = s('Cat')(style);
 *
 * sCat(); // Cat
 * <View style={sCat()}/> //
 * eq: <View style={style['Cat']}/>
 *
 * sCat({ size: 'm' }); // Cat Cat_size_m
 * <View style={sCat({ size: 'm' })}/> //
 * eq: <View style={[style['Cat'], style['Cat_size_m']]}/>
 *
 * sCat('Tail'); // Cat-Tail
 * <View style={sCat()}/> //
 * eq: <View style={style['Cat']}/>
 *
 * sCat('Tail', { length: 'small' }); // Cat-Tail Cat-Tail_length_small
 * <View style={sCat('Tail', { length: 'small' })}/> //
 * eq:<View style={[style['Cat-Tail'], style['Cat-Tail_length_small']]}/>
 *
 * const sDogPaw = s('Dog', 'Paw')(style);
 *
 * sDogPaw(); // Dog-Paw
 * <View style={sDogPaw()}/> //
 * eq: <View style={style['Dog-Paw']}/>
 *
 * sDogPaw({ color: 'black', exists: true }); // Dog-Paw Dog-Paw_color_black Dog-Paw_exists
 * <View style={sDogPaw({ color: 'black', exists: true })}/> // eq:
 * <View style={[style['Dog-Paw'], style['Dog-Paw_color_black'], style['Dog-Paw_exists]]}/>
 * ```
 *
 * @see https://en.bem.info/methodology/naming-convention/#react-style
 *
 */

const s = withNaming({
    e: '-',
    m: '_',
});

module.exports.s = s;
