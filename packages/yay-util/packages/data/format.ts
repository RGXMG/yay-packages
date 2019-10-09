import moment from 'moment';
import len from '../array/len';
import calculation from '../number/calculation';
import isNumber from '../number/isNumber';
/**
 * format 文件大小
 * @param size
 * @param opt
 *  noUnit: true 最后不加单位
 *  degrade： true 进行降级处理，当wUnit单位下，值为0时，向下一个单位计算，知道不为0
 * @returns {*}
 */
declare type TSizeUnit = 'b' | 'B' | 'Kb' | 'KB' | 'm' | 'M' | 'g' | 'G';
const formatSize = function(
  size: string | number,
  opt: {
    bUnit: TSizeUnit;
    wUnit: TSizeUnit;
    digit: 1 | 2 | 3 | 4 | 5;
    noUnit: boolean;
    degrade: boolean;
  }
) {
  const opts = { bUnit: 'b', wUnit: 'M', digit: 2, ...opt };
  const bToKb = s => {
    return s / 1024;
  };
  const bToM = s => {
    return s / 1048576;
  };
  const bToG = s => {
    return s / 1073741824;
  };
  const kbToM = s => {
    return s / 1024;
  };
  const kbToG = s => {
    return s / 1048576;
  };
  const mToKb = s => {
    return s * 1024;
  };
  const mToG = s => {
    return s / 1024;
  };
  const gToKb = s => {
    return s * 1048576;
  };
  const gToM = s => {
    return s * 1024;
  };
  const degradeKeys = ['G', 'M', 'KB', 'B'];
  const changeObj = {
    B: (s, wUnit) => {
      if (wUnit === 'KB') return bToKb(s);
      if (wUnit === 'M') return bToM(s);
      if (wUnit === 'G') return bToG(s);
      return s;
    },
    KB: (s, wUnit) => {
      if (wUnit === 'M') return kbToM(s);
      if (wUnit === 'G') return kbToG(s);
      return s;
    },
    M: (s, wUnit) => {
      if (wUnit === 'KB') return mToKb(s);
      if (wUnit === 'G') return mToG(s);
      return s;
    },
    G: (s, wUnit) => {
      if (wUnit === 'KB') return gToKb(s);
      if (wUnit === 'M') return gToM(s);
      return s;
    },
  };
  const reVal = function reVal(val, unit) {
    if (opts.noUnit) return val;
    return val + unit;
  };
  // 获取format之后的值
  const getValNoUnit = (s, b, w) => {
    // 不存在size, 直接根据位数返回
    if (!s) return reVal((0).toFixed(opts.digit), w);
    const val = calculation.toFixed(changeObj[b.toUpperCase()](s, w.toUpperCase()), opts.digit);
    // 是否进行降级处理
    if (opts.degrade && !parseInt(val, 10)) {
      // 找到当前的index
      const index = degradeKeys.indexOf(w);
      // 如果到达最后一位 直接返回
      if (index === len(degradeKeys)) return reVal(val, w);
      // 递归查找下去
      return getValNoUnit(s, opts.bUnit, degradeKeys[index + 1]);
    }
    return reVal(val, w);
  };
  return getValNoUnit(size, opts.bUnit, opts.wUnit);
};
/**
 * 时间戳转换
 * 10位到13 toJS
 * 13位转10 toUnix
 */
const formatTime = {
  to13: (time: number | string) => {
    return time + '000';
  },
  to10: (time: number | string) => {
    return Math.round(new Date(time).getTime() / 1000);
  },
  isValid: (m: number | string) => {
    return isNumber(Number(m)) && m > 0;
  },
  format: function(m: number | string, mat: string = 'YYYY-MM-DD') {
    if (!this.isValid(m)) return '';
    if (String(m).length === 10) {
      return this.moment.unixForMat(m, mat);
    }
    if (String(m).length === 13) {
      return moment(m).format(mat);
    }
    return '';
  },
  moment: {
    toMoment: function toMoment(m: string | number) {
      if (!formatTime.isValid(m)) return moment();
      if (String(m).length === 10) {
        return moment(Number(m) * 1000);
      }
      if (String(m).length === 13) {
        return moment(m);
      }
      return moment();
    },

    toUnix: function toUnix(m: moment.Moment) {
      return m ? m.format('X') : '';
    },
    unixForMat: function unixForMat(m: any, mat: string = 'YYYY-MM-DD') {
      return moment(parseInt(m + '000', 10)).format(mat);
    },
  },
};
const formatTimeIndex = {
  ...formatTime,
  format: formatTime.format.bind(formatTime),
};
export { formatSize, formatTimeIndex as formatTime };
