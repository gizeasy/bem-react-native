export interface IPreset {
    n?: string;
    e?: string;
    m?: string;
    v?: string;
    cv?: string;
}

export type Tb = string;
export type Te = string;
export type TmEntry = string | boolean | number;
export type Tm = Record<string, TmEntry | Array<TmEntry> | undefined>;
export type TMixObjectEntry = Record<string | number, any>;
export type TMix = Array<TMixObjectEntry | Array<TMixObjectEntry>>;
export type TWithNaming = (b: Tb, e?: Te) => TSetStyle;
export type TElemOrMods = Te | Tm | null;
export type TElemModsOrBlockMix = Tm | TMix | null;
export type TElemMix = TMix;
export type TsGenerator = (
    elemOrMods?: TElemOrMods,
    elemModsOrBlockMix?: TElemModsOrBlockMix,
    elemMix?: TElemMix
) => Array<object> | undefined;
export type TStyleSheet = Record<string, object>;
export type TSetStyle = (styleSheet: TStyleSheet) => TsGenerator;

export function withNaming(preset: IPreset): TWithNaming {
    const nameSpace = preset.n || '';
    const modValueDelimiter = preset.v || preset.m;
    const modCompositionValueDelimiter = preset.cv || modValueDelimiter;

    function stringify(
        b: Tb,
        e: Te | null | undefined,
        m: Tm | null | undefined,
        mix: TMix | null | undefined,
        styleSheet: TStyleSheet
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
    return function sGenerator(b: Tb, e?: Te): TSetStyle {
        return function(styleSheet: TStyleSheet): TsGenerator {
            return function(
                elemOrMods?: TElemOrMods,
                elemModsOrBlockMix?: TElemModsOrBlockMix,
                elemMix?: TElemMix
            ) {
                if (typeof elemOrMods === 'string') {
                    if (Array.isArray(elemModsOrBlockMix)) {
                        return stringify(b, elemOrMods, undefined, elemModsOrBlockMix, styleSheet);
                    } else {
                        return stringify(b, elemOrMods, elemModsOrBlockMix, elemMix, styleSheet);
                    }
                } else {
                    return stringify(b, e, elemOrMods, elemModsOrBlockMix as TMix, styleSheet);
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
