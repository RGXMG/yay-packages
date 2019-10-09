import moment from 'moment';
declare type TSizeUnit = 'b' | 'B' | 'Kb' | 'KB' | 'm' | 'M' | 'g' | 'G';
/**
 * format 文件大小
 * @param size
 * @param opt
 *  noUnit: true 最后不加单位
 *  degrade： true 进行降级处理，当wUnit单位下，值为0时，向下一个单位计算，知道不为0
 * @returns {*}
 */
declare const formatSize: (
  size: string | number,
  opt: {
    bUnit: TSizeUnit;
    wUnit: TSizeUnit;
    digit: 1 | 2 | 3 | 4 | 5;
    noUnit: boolean;
    degrade: boolean;
  }
) => any;
declare const formatTimeIndex: {
  format: any;
  to13: (time: any) => string;
  to10: (time: any) => number;
  isValid: (m: any) => boolean;
  moment: {
    toMoment(m: string | number): moment.Moment;
    toUnix: (m: moment.Moment) => string;
    unixForMat: (m: any, mat?: string) => string;
  };
};
export { formatSize, formatTimeIndex as formatTime };
