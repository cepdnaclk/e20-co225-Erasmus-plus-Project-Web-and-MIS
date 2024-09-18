/**
 * Apply mixins for the React components.
 *
 * @param {any} derivedClass ?
 * @param {any[]} baseClass ?
 * @returns {void} ?
 * @private
 */
export function applyMixins(derivedClass, baseClass) {
    baseClass.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            if (name !== 'isMounted' && name !== 'replaceState' && name !== 'render') {
                derivedClass.prototype["" + name] = baseClass.prototype["" + name];
            }
        });
    });
}
