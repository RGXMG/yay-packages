import flatten from '../flatten';
import treeData from '../treeData';
import editItem from '../editItem';
import flatToObj from '../flatToObj';
import differentObj from '../../object/differentObj';
import removeItem from '../removeItem';
import someEleToSum from '../someEleToSum';
import someEleToJoin from '../someEleToJoin';

const _treeData = [
  {
    pid: '0',
    id: '1',
    children: [
      {
        pid: '1',
        id: '1-1',
        children: [
          {
            pid: '1-1',
            id: '1-1-1',
          },
          {
            pid: '1-1',
            id: '1-1-2',
          },
          {
            pid: '1-1',
            id: '1-1-3',
          },
        ],
      },
      {
        pid: '1',
        id: '1-2',
      },
      {
        pid: '1',
        id: '1-3',
        children: [
          {
            pid: '1-3',
            id: '1-3-1',
            children: [
              {
                pid: '1-3-1',
                id: '1-3-1-1',
                children: [
                  {
                    pid: '1-3-1-1',
                    id: '1-3-1-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    pid: '0',
    id: '2',
  },
  {
    pid: '0',
    id: '4',
  },
];
const _flattenData = [
  {
    pid: '0',
    id: '1',
  },
  {
    pid: '1',
    id: '1-1',
  },
  {
    pid: '1-1',
    id: '1-1-1',
  },
  {
    pid: '1-1',
    id: '1-1-2',
  },
  {
    pid: '1-1',
    id: '1-1-3',
  },
  {
    pid: '1',
    id: '1-2',
  },
  {
    pid: '1',
    id: '1-3',
  },
  {
    pid: '1-3',
    id: '1-3-1',
  },
  {
    pid: '1-3-1',
    id: '1-3-1-1',
  },
  {
    pid: '1-3-1-1',
    id: '1-3-1-1-1',
  },
  {
    pid: '0',
    id: '2',
  },
  {
    pid: '0',
    id: '4',
  },
];
/**
 * flatten
 */
test('test flatten: args -> ({})，抛出错误', () => {
  const error = function() {
    flatten({});
  };
  expect(error).toThrow('flatten: data必须是Array<Object>！');
});
test('test flatten: args -> 树形结构数据，返回扁平化数据', () => {
  expect(flatten(_treeData)).toEqual(_flattenData);
});

/**
 * treeData
 */
test('test treeData: args -> ({})，抛出错误', () => {
  const error = function() {
    treeData({});
  };
  expect(error).toThrow('treeData: data必须为Array<Object>！');
});
// test('test treeData: args -> 扁平化数据，返回树形结构数据', () => {
//   console.log(differentObj(treeData(_flattenData), _treeData));
//   expect(treeData(_flattenData)).toEqual(_treeData);
//   // expect(_treeData).toEqual(treeData(_flattenData));
// });

/**
 * editItem
 */
test('test editItem: args -> ({})，抛出错误', () => {
  const error = function() {
    editItem({});
  };
  expect(error).toThrow('editItem: list必须是Array<Object>！');
});
test('test editItem: args -> (_treeData, 1-1-1, callback)，返回id为1-1-1的item项', () => {
  expect.assertions(1);
  editItem(_treeData, '1-1-1', i => {
    expect(i.id).toEqual('1-1-1');
  });
});

/**
 * flatToObj
 */
test('test flatToObj: args -> ({})，抛出错误', () => {
  const error = function() {
    flatToObj({});
  };
  expect(error).toThrow('flatCollection need Array collection, but arguments type is not correct');
});
test('test flatToObj: args -> (_flattenData)，返回_flattenData合并后的结果{ pid: 0, id: 4 }', () => {
  expect(flatToObj(_flattenData)).toEqual({ pid: '0', id: '4' });
});
test('test flatToObj: args -> ([{ a: 1, b: 2 }, null, undefined, { a: 2, b: 2 }])，会忽略非Object类型数据，最后返回{ a:2, b: 2 }', () => {
  expect(flatToObj([{ a: '1', b: '2' }, null, undefined, { a: '2', b: '2' }])).toEqual({
    a: '2',
    b: '2',
  });
});
//
// /**
//  * removeItem
//  */
// test('test removeItem: args -> ({})，抛出错误', () => {
//   const error = function() {
//     removeItem({});
//   };
//   expect(error).toThrow('removeItem: list必须是Array<Object>！');
// });
// test('test removeItem: args -> ()');
