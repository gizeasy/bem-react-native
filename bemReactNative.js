"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withNaming(preset) {
    var nameSpace = preset.n || '';
    var modValueDelimiter = preset.v || preset.m;
    var modCompositionValueDelimiter = preset.cv || modValueDelimiter;
    function stringify(b, e, m, mix, styleSheet) {
        var entityName = e ? nameSpace + b + preset.e + e : nameSpace + b;
        var styles = [styleSheet[entityName]];
        if (m) {
            var modPrefix = entityName + preset.m;
            for (var k in m) {
                if (m.hasOwnProperty(k)) {
                    var modName = void 0;
                    var modVal = m[k];
                    if (modVal === true) {
                        modName = "" + (modPrefix + k);
                    }
                    else if (Array.isArray(modVal)) {
                        modName = "" + (modPrefix +
                            k +
                            modValueDelimiter +
                            modVal.join(modCompositionValueDelimiter));
                    }
                    else if (modVal) {
                        modName = "" + (modPrefix + k + modValueDelimiter + modVal);
                    }
                    styleSheet[modName] && styles.push(styleSheet[modName]);
                }
            }
        }
        if (mix !== undefined && mix !== null) {
            for (var i = 0, len = mix.length; i < len; i++) {
                if (typeof mix[i] === 'object') {
                    styles.push(mix[i]);
                }
                else if (Array.isArray(mix[i])) {
                    for (var ii = 0, len_1 = mix[i].length; ii < len_1; ii++) {
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
exports.withNaming = withNaming;
exports.s = withNaming({
    e: '-',
    m: '_',
});
