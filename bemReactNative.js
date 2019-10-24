export function withNaming(preset) {
    const nameSpace = preset.n || '';
    const modValueDelimiter = preset.v || preset.m || '';
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
                    }
                    else if (Array.isArray(modVal)) {
                        modName = `${modPrefix + k + modValueDelimiter + modVal.join(preset.cv)}`;
                    }
                    else if (modVal) {
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
                }
                else if (Array.isArray(mix[i])) {
                    for (let ii = 0, len = mix[i].length; ii < len; ii++) {
                        styles.push(mix[i][ii]);
                    }
                }
            }
        }
        return styles;
    }
    return function sGenerator(b, e) {
        return function (styleSheet) {
            return function (elemOrMods, elemModsOrBlockMix, elemMix) {
                if (typeof elemOrMods === 'string') {
                    if (Array.isArray(elemModsOrBlockMix)) {
                        return stringify(b, elemOrMods, undefined, elemModsOrBlockMix, styleSheet);
                    }
                    else {
                        return stringify(b, elemOrMods, elemModsOrBlockMix, elemMix, styleSheet);
                    }
                }
                else {
                    return stringify(b, e, elemOrMods, elemModsOrBlockMix, styleSheet);
                }
            };
        };
    };
}
export const s = withNaming({
    e: '-',
    m: '_',
});
