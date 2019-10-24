export interface IPreset {
    n?: string;
    e?: string;
    m?: string;
    v?: string;
    cv?: string;
}

export type b = string;
export type e = string;
export type mEntry = string | boolean | number;
export type m = Record<string, mEntry | Array<mEntry> | undefined>;
export type mixObjectEntry = Record<string | number, any>;
export type mix = Array<mixObjectEntry | Array<mixObjectEntry>>;
export type withNaming = (b: b, e?: e) => setStyle;
export type elemOrMods = e | m | null;
export type elemModsOrBlockMix = m | mix | null;
export type elemMix = mix;
export type sGenerator = (
    elemOrMods?: elemOrMods,
    elemModsOrBlockMix?: elemModsOrBlockMix,
    elemMix?: elemMix
) => Array<object> | undefined;
export type styleSheet = Record<string, object>;
export type setStyle = (styleSheet: styleSheet) => sGenerator;

export function withNaming(preset: IPreset): withNaming {
    const nameSpace = preset.n || '';
    const modValueDelimiter = preset.v || preset.m;
    const modCompositionValueDelimiter = preset.cv || modValueDelimiter;

    function stringify(
        b: b,
        e: e | null | undefined,
        m: m | null | undefined,
        mix: mix | null | undefined,
        styleSheet: styleSheet
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
                        modName = `${modPrefix +
                            k +
                            modValueDelimiter +
                            modVal.join(modCompositionValueDelimiter)}`;
                    } else if (modVal) {
                        modName = `${modPrefix + k + modValueDelimiter + modVal}`;
                    }
                    styleSheet[modName as string] && styles.push(styleSheet[modName as string]);
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
    return function sGenerator(b: b, e?: e): setStyle {
        return function(styleSheet: styleSheet): sGenerator {
            return function(
                elemOrMods?: elemOrMods,
                elemModsOrBlockMix?: elemModsOrBlockMix,
                elemMix?: elemMix
            ) {
                if (typeof elemOrMods === 'string') {
                    if (Array.isArray(elemModsOrBlockMix)) {
                        return stringify(b, elemOrMods, undefined, elemModsOrBlockMix, styleSheet);
                    } else {
                        return stringify(b, elemOrMods, elemModsOrBlockMix, elemMix, styleSheet);
                    }
                } else {
                    return stringify(b, e, elemOrMods, elemModsOrBlockMix as mix, styleSheet);
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

export const s = withNaming({
    e: '-',
    m: '_',
});
