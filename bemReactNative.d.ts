export interface IPreset {
    n?: string;
    e?: string;
    m?: string;
    v?: string;
    cv?: string;
}
export declare type Tb = string;
export declare type Te = string;
export declare type TmEntry = string | boolean | number;
export declare type Tm = Record<string, TmEntry | Array<TmEntry> | undefined>;
export declare type TMixObjectEntry = Record<string | number, any>;
export declare type TMix = Array<TMixObjectEntry | Array<TMixObjectEntry>>;
export declare type TWithNaming = (b: Tb, e?: Te) => TSetStyle;
export declare type TElemOrMods = Te | Tm | null;
export declare type TElemModsOrBlockMix = Tm | TMix | null;
export declare type TElemMix = TMix;
export declare type TsGenerator = (elemOrMods?: TElemOrMods, elemModsOrBlockMix?: TElemModsOrBlockMix, elemMix?: TElemMix) => Array<object> | undefined;
export declare type TStyleSheet = Record<string, object>;
export declare type TSetStyle = (styleSheet: TStyleSheet) => TsGenerator;
export declare function withNaming(preset: IPreset): TWithNaming;
export declare const s: TWithNaming;
