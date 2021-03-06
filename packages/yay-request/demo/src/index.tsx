import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button } from 'antd';
import { createAPI } from '@_/index'

const instance = createAPI('http://test.yayroadtrip.com/api/seller');
instance({
  url: '/goods/getList',
  method: 'get',
  opts: {
    params: {
      page: 2
    }
  }
});
class Demo extends Component {
  render() {
    return <div>
      <Button>yay-request Demo</Button>
      <h1>yay-request Demo</h1>
    </div>
  }

}

render(<Demo/>, document.querySelector('#demo'));
