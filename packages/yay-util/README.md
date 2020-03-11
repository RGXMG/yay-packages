# # yay-util
  
  [![Travis][build-badge]][build]
  [![npm package][npm-badge]][npm]
  
  ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567421472507&di=dd6bcc6a16288c398ef7b3d40bfb6189&imgtype=0&src=http%3A%2F%2Fimage.9game.cn%2F2018%2F12%2F25%2F39134653.jpg)
  
  Utility function(专业辅助二十年), includes modules `array`、`collection`、`data`、`function`、`jsx`、`number`、`object`、`storage`、`string`、`window`、
  
  ## Install
  
  use npm:
  
  ```sh
  npm install yay-utility -d
  ```
  
  > **Note:** or you can use yarn
  >
  > `yarn add yay-utility  --dev`
  
  #### method desc：
  - array
  
  ```javascript
     /**
      * 树形结构转为扁平化数据
      * @param data
      * @param opts
      * @returns {*}
      */
       flatten: (data: Object[], opts?: {
           childrenKey?: string;
       }) => any;
     
     /**
       * 是否为数组
       * @param array
     */
     isArray: (any: any) => boolean;
     
     /**
      * 数组是否含有元素
      * @param array
      */
     hasEle: (array: any[]) => boolean;
     
     /**
      * 获取数组元素最后一个元素
      * @param array
      * @returns {*}
      */
     lastEel: (array: any[]) => any;
     
     /**
      * 获取数组的长度
      * @param array
      */
     len(array: any[]) => number;
     
     /**
      * 将每一数组的元素中的某个属性按照sym相连接
      * @param array
      * @param pro
      * @param sym
      * @param itemCb
      * @returns {*}
      */
     someEleToJoin(array: Array<any>, pro: string, sym: string, itemCb: (item: any, i: number, array: Array<any>) => void): string;
    
    /**
     * array 累加
     * @param list
     * @param key
     * @param base
     * @returns {*}
     */
    someEleToSum: (list: any[], key: string, base?: number) => number;
    
    /**
     * 扁平化数据转为树形结构
     * @param data
     * @param opt
     * @returns {*}
     */
     interface IOpt<T> {
            key?: string;
            parentKey?: string;
            childrenKey?: string;
            topVal?: number | string | boolean | null | undefined;
            filterCb?: (args: Array<T>) => Array<T>;
            cutCb?: (args: T) => Partial<T>;
        }
    treeData<T>(data: Array<T>, opt?: IOpt<T>): any[];
  ```
  
  - collection
     
  ```
     /**
      * 根据配置项找到正确的item 只能用于编辑
      * 如果匹配了父项，就不会再去查找子项
      * 1. 直接添加obj数据
      * 2. 回调
      * @param list
      * @param root：{ string |function } 比较的凭据，函数返回true
      * @param cb：比较成功之后的回调函数
      * @param opt {
      *   correctSym:{string|function} 正确项的匹配值, 可以由该函数返回  默认id
      *   children: 下一级的字段名
      *   type: m:多个，会遍项历所有的， s：如果找到一项，就不再查找子项
      * }
      * @returns {Array}
      */
     editItem<T>(list: Array<T>, root: ((i: T) => boolean) | string, cb: (i: T) => Partial<T>, opt?: {
         correctSym?: ((i: T) => string) | string;
         children?: string;
         type?: 'm' | 's';
     }): Array<Partial<T>>;
     
     /**
      * 将集合类对象展开为一个对象
      * 后面的属性将会覆盖前面
      * @param array
      */
     flatToObj: (array: Object[]) => Object;
     
     /**
      *
      * @param list 集合
      * @param root
      * @param opt
      */
     removeItem<T>(list: Array<T>, root: ((i: T) => boolean) | string | number, opt?: {
         correctSym?: ((i: T) => string) | string;
         children?: string;
     }): Array<T>;
     
  ```
  - data
  
    > 见各方法的声明文件
  - function
  
    > 见各方法的声明文件
  - jsx
  
    > 见各方法的声明文件
  - number
  
    > 见各方法的声明文件
  - object
  
    > 见各方法的声明文件
  - storage
  
    > 见各方法的声明文件
  - string
  
    > 见各方法的声明文件
  - window
  
    > 见各方法的声明文件
     - react
      
    > 见各方法的声明文件
  ## 用法：
  - 各种用法会在后续进行更改
  
  [build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
  [build]: https://travis-ci.org/user/repo
  
  [npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
  [npm]: https://www.npmjs.org/package/npm-package
  
  [coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
  [coveralls]: https://coveralls.io/github/user/repo