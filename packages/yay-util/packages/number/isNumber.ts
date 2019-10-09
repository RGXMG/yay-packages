import isNaN from 'lodash/isNaN';
const index = any => {
  return typeof any === 'number' && !isNaN(any);
};
export default index;
