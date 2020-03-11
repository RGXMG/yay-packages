import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import { antd } from '@_util/jsx/form';

const {
  // @ts-ignore
  multilevelKey: { unique, combination },
} = antd;
console.log(
  'advanceStoreSet_advanceStorePrice_4018G7HD76',
  unique('advanceStorePrice', '4018G7HD76', 'advanceStoreSet'),
  'advanceStoreSet_advanceStorePrice_4018G7HD76' ===
    unique('advanceStorePrice', '4018G7HD76', 'advanceStoreSet')
);
console.log(unique('advanceStorePrice', '4018G7HD76') === 'advanceStorePrice_4018G7HD76');
console.log(
  combination(
    {
      line: 161,
      openAdvancePrice: true,
      minCustomerNumberOfPeople: '20',
      maxCustomerNumberOfPeople: '88',
      insurePrice: 40,
      insureLimit: 5,
      carpoolPrice: '100.00',
      roomPriceDiff: '800.00',
      operator: 0,
      type_H2CFD350B9: 0,
      advancePrice_H2CFD350B9: 1680,
      salesPrice_H2CFD350B9: 1880,
      marketPrice_H2CFD350B9: 1880,
      type_29BB35FDJ0: 1,
      advancePrice_29BB35FDJ0: 280,
      salesPrice_29BB35FDJ0: 280,
      marketPrice_29BB35FDJ0: 280,
      type_E76HICJDFD: 2,
      advancePrice_E76HICJDFD: 20,
      salesPrice_E76HICJDFD: 20,
      marketPrice_E76HICJDFD: 20,
      advanceStoreSet_advanceStorePrice_4018G7HD76: 100,
      advanceStoreSet_deductiblePrice_4018G7HD76: 300,
    },
    'priceSet'
  )
);
class Demo extends Component {
  render() {
    return (
      <div>
        <Button>yay-request Demo</Button>
        <h1>yay-request Demo</h1>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
