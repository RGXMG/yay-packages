import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button } from 'antd';

class Demo extends Component {
  render() {
    return <div>
      <Button>yay-request Demo</Button>
      <h1>yay-request Demo</h1>
    </div>
  }

}

render(<Demo/>, document.querySelector('#demo'));
