export interface IPreset {
    n?: string;
    e?: string;
    m?: string;
    v?: string;
    cv?: string;
}
export declare type b = string;
export declare type e = string;
export declare type mEntry = string | boolean | number;
export declare type m = Record<string, mEntry | Array<mEntry> | undefined>;
export declare type mixObjectEntry = Record<string | number, any>;
export declare type mix = Array<mixObjectEntry | Array<mixObjectEntry>>;
export declare type withNaming = (b: b, e?: e) => setStyle;
export declare type elemOrMods = e | m | null;
export declare type elemModsOrBlockMix = m | mix | null;
export declare type elemMix = mix;
export declare type sGenerator = (elemOrMods?: elemOrMods, elemModsOrBlockMix?: elemModsOrBlockMix, elemMix?: elemMix) => Array<object> | undefined;
export declare type styleSheet = Record<string, object>;
export declare type setStyle = (styleSheet: styleSheet) => sGenerator;
export declare function withNaming(preset: IPreset): withNaming;
export declare const s: withNaming;
