'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	thisurl,
	serviceurl,
	ipurl,
	uploadurl,
	imgsrc,
	downDistance,
	setCookie,
	getCookie,
	delCookie,
	getURLPram,
	clearCookies,
	getCityIDByName,
	reminder,
	reminderSuccess,
	getLocalTime,
	checknull,
	MoneyConversion,
	MoneyValue,
	toDecimal,
	getMobilTime,
	plusZero
} from '../js/common.js';

import ReactPullToRefresh from 'react-pull-to-refresh';

let Loading = React.createClass({
     render() {
         return(
             <div className="loading">
                <div>加载中...</div>
             </div>
         );
     }
});

let IconLoading =  React.createClass({
     render() {
         return(
             <span className="iconloading"></span>
         );
     }
});

let count = 1;
let App = React.createClass({

  getInitialState() {
    return {
      items: [
        <div key={'item-' + count}>Item {count++}</div>
      ]
    };
  },

  handleRefresh(resolve, reject) {
    let self = this;
    setTimeout(function () {
      self.addItem() ? resolve() : reject();
    }, 500);
  },

  addItem() {
    this.state.items.push(<div key={'item-' + count}>Item {count++}</div>);
    this.setState({
      items: this.state.items
    });
    return true;
  },

  render() {
    return (
      <ReactPullToRefresh onRefresh={this.handleRefresh} style={{
        textAlign: 'center'
      }}
      distanceToRefresh={70}
      resistance={2.5}
      loading={<Loading />}
      icon={<IconLoading />}
      >
        <h3>Pull down to refresh111111</h3>
        <div className="testlist">
          {this.state.items}
        </div>
      </ReactPullToRefresh>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('content'));

