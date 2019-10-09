interface ISetState<T> {
    (arg: ((s: T) => Partial<T>) | Partial<T>): void;
}
declare function noSpread<T>(useArgs: [T, Function]): [T, ISetState<T>];
export { noSpread };
