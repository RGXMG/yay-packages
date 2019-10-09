declare const antd: {
    multilevelKey: {
        fieldName: (str: any) => any;
        key: (str: any) => any;
    };
    fieldCommonStyle: {
        full: {
            width: string;
        };
        combination(...style: any[]): {};
    };
    inputNumberProps: {
        price: {
            formatter: (value: any, hasSpace?: boolean) => any;
            parser: (value: any) => any;
        };
        percent: {
            formatter: (value: any) => any;
            parser: (value: any) => any;
        };
        kilometres: {
            parser: (value: any) => any;
            formatter: (value: any) => string;
        };
    };
    selectProps: {
        openSearch: {
            showSearch: boolean;
            filterOption: (input: any, option: any) => boolean;
        };
    };
};
export { antd };
