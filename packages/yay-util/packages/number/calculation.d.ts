declare const index: {
    calculation: any;
    /**
     * 重写toFixed
     * 解决精度问题
     * 并返回精准的小数位数，即使原数为整数
     * @param v
     * @param exponent = 2 默认俩位
     * @returns {number}
     */
    toFixed(v: number, exponent?: number): any;
    /**
     * 获取倍数的100化
     * @param t
     * @returns {number}
     */
    getHundredOfTimes(t: number): number;
    /**
     * 获取v值的不同情况下的值
     * @param v
     * @returns {{times: number, value: string}|{times: number, value: number}}
     */
    getDiff(v: any): {
        value: number;
        times: any;
    } | {
        value: any;
        times: number;
    };
    /**
     * 获取不同的值
     * 数值整数部分
     * 数值小数部分
     * @param args 元素均为string类型
     */
    getDiffValue(...args: any[]): {
        values: any[];
        times: number;
    };
    /**
     * 将v值恢复到times倍
     * v值必须为正整数
     * 此处采用除法，不采用字符串拼接，不考虑极端情况，
     * 满足平常使用的情况
     * @param v
     * @param times
     * @returns {number}
     */
    resetDiff(v: any, times: any): number;
    /**
     * 计算
     * @returns {{}}
     */
    calculatio(...args: any[]): {
        plus: () => number;
        subtract: () => number;
        multiply: () => number;
        divide: () => number;
    };
};
export default index;
