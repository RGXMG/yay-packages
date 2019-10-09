const _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

const _extends = Object.assign || function (target) { for (const i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function noSpread(useArgs) {
    const change = useArgs[1];
    const state = useArgs[0];
    const setState = function setState(arg) {
        if (typeof arg === 'function') {
            change(_extends({}, state, arg(state)));
        } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
            change(_extends({}, state, arg));
        }
    };
    return [state, setState];
}
export { noSpread };