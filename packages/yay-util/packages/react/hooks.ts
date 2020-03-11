import isFunction from '../function/isFunction';
import isObject from '../object/isObject';

interface ISetState<T> {
  (arg: ((s: T) => Partial<T>) | Partial<T>): void;
}
function noSpread<T>(useArgs: [T, Function]): [T, ISetState<T>] {
  const change = useArgs[1];
  const state = useArgs[0];
  const setState = function(arg) {
    if (isFunction(arg)) {
      change({ ...state, ...arg(state) });
    } else if (isObject(arg)) {
      change({ ...state, ...arg });
    }
  };
  return [state, setState];
}
export { noSpread };
