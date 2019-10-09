import isNaN from 'lodash/isNaN';
import isObject from '../object/isObject';

const index = (function() {
  const objOpts = {
    /**
     * 重写toFixed
     * 解决精度问题
     * 并返回精准的小数位数，即使原数为整数
     * @param v
     * @param exponent = 2 默认俩位
     * @returns {number}
     */
    toFixed: function toFixed(v, exponent: number = 2): string {
      if (isNaN(Number(v))) return '0';
      const formatter = function(f) {
        return f.padEnd(exponent, '0');
      };
      // eslint-disable-next-line no-restricted-properties
      const pow = Math.pow(10, exponent);
      const val = parseInt(String(v * pow + (v >= 0 ? 0.5 : -0.5)), 10) / pow;
      const valArr = ('' + val).split('.');
      return valArr[0] + '.' + formatter(valArr[1] || '');
    },

    /**
     * 获取倍数的100化
     * @param t
     * @returns {number}
     */
    getHundredOfTimes: function getHundredOfTimes(t) {
      // eslint-disable-next-line no-restricted-properties
      return Math.pow(10, t);
    },

    /**
     * 将v变成整数，返回扩大的times以及扩大后的value
     * @param v
     * @returns {{times: number, value: string}|{times: number, value: number}}
     */
    toRoundNumber: function getDiff(v) {
      const vOfArray = v.toString().split('.');
      if (vOfArray.length === 2) {
        const rightLength = vOfArray[1].length;
        // 将原始数值扩大times倍
        return { value: v * this.getHundredOfTimes(rightLength), times: rightLength };
      }
      return { value: vOfArray[0], times: 1 };
    },

    /**
     * 获取不同的值
     * 数值整数部分
     * 数值小数部分
     * @param args 元素均为string类型
     */
    getRoundNumberByEquallyFixed: function getDiffValue(...args: any[]) {
      if (!args.length) return { values: [], times: 1 };
      const values = [];
      let times = 0;
      for (const v of args) {
        const _getDiff = this.toRoundNumber(v),
          value = _getDiff.value,
          t = _getDiff.times;
        values.push(value);
        if (!times) times = t;
      }
      return { values: values, times: times };
    },

    /**
     * 将v值恢复到times倍
     * v值必须为正整数
     * 此处采用除法，不采用字符串拼接，不考虑极端情况，
     * 满足平常使用的情况
     * @param v
     * @param times
     * @returns {number}
     */
    resetDiff: function resetDiff(v, times) {
      if (v % 1 !== 0)
        throw new Error('method resetDiff: expect v % 1 equals 0,but v is not valid!');
      return v / times;
    },

    /**
     * 计算
     * @returns {{}}
     */
    calculatio: function calculatio(...args: any[]) {
      const _this = this;
      if (args.length < 2)
        throw new Error(
          'method calculatio: expect function arguments length > 2, but args length is not valid'
        );
      // 默认配置
      // 现在只存在fixed
      let opts = { fixed: 2 };
      const params = [...args];
      // 最后一个参数是否为传入的defOpts;
      if (isObject(args[args.length - 1])) {
        opts = { ...opts, ...params.pop() };
      }

      const _getDiffValue = this.getRoundNumberByEquallyFixed.apply(
          this,
          params.map(function(v) {
            if (typeof v !== 'number' && typeof v !== 'string')
              throw new Error(
                'method calculatio: expect typeof v equals number or string,but v is invalid!'
              );
            return _this.toFixed(Number(v), opts.fixed);
          })
        ),
        values = _getDiffValue.values,
        times = _getDiffValue.times;

      const hundredTimes = this.getHundredOfTimes(times);
      return {
        plus: function plus() {
          return (
            values.reduce(function(pre, next) {
              return pre + next;
            }) / hundredTimes
          );
        },
        subtract: function subtract() {
          return (
            values.reduce(function(pre, next) {
              return pre - next;
            }) / hundredTimes
          );
        },
        multiply: function multiply() {
          return (
            values.reduce(function(pre, next) {
              return pre * next;
            }) / hundredTimes
          );
        },
        divide: function divide() {
          return (
            values.reduce(function(pre, next) {
              return pre / next;
            }) / hundredTimes
          );
        },
      };
    },
  };
  return {
    ...objOpts,
    calculation: objOpts.calculatio.bind(objOpts),
  };
})();
export default index;
