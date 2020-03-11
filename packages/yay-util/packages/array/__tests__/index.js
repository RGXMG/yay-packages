import isArray from '../isArray';
import hasEle from '../hasEle';
import lastEle from '../lastEle';
import len from '../len';

/**
 * isArray
 */
test('test isArray: args -> ([])，返回true ', () => {
  expect(isArray([])).toBe(true);
});
test('test isArray: args -> (null)，返回false', () => {
  expect(isArray(null)).toBe(false);
});
test('test isArray: args -> (new Array())，返回true', () => {
  expect(isArray(new Array(2))).toBe(true);
});

/**
 * hasEle
 */
test('test hasEle: args -> ({ length: 3 }) -> 抛出错误', () => {
  const error = function() {
    hasEle({});
  };
  expect(error).toThrow('hasEle: 参数必须是一个数组');
});
test('test hasEle: args -> (new Array(3), false)，返回false', () => {
  expect(hasEle(new Array(3), false)).toBe(false);
});
test('test hasEle: args -> ([null, undefined, 2])，返回true', () => {
  expect(hasEle([null, undefined, 2])).toBe(true);
});

/**
 * lastEle
 */
test('test lastEle: args -> ({ length: 3 }) -> 抛出错误', () => {
  const error = function() {
    lastEle({});
  };
  expect(error).toThrow('lastEle: 参数必须是一个数组');
});
test('test lastEle: args -> (new Array(2))，返回undefined', () => {
  expect(lastEle(new Array(2))).toBe(undefined);
});
test('test lastEle: args -> ([1,2,3])，返回3', () => {
  expect(lastEle([1, 2, 3])).toBe(3);
});

/**
 * len
 */
test('test len: args -> ({ length: 3 }) -> 抛出错误', () => {
  const error = function() {
    len({});
  };
  expect(error).toThrow('len: 参数必须是一个数组');
});
test('test len: args -> (new Array(2))，返回2', () => {
  expect(len(new Array(2))).toBe(2);
});
test('test len: args -> ([1,2,3])，返回3', () => {
  expect(len([1, 2, 3])).toBe(3);
});
