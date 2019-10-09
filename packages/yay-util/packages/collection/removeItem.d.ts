/**
 *
 * @param list 集合
 * @param root
 * @param opt
 */
declare function index<T>(list: Array<T>, root: ((i: T) => boolean) | string | number, opt?: {
    correctSym?: ((i: T) => string) | string;
    children?: string;
}): Array<T>;
export default index;
