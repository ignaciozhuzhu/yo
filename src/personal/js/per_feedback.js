'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	thisurl,
	serviceurl,
	ipurl,
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
} from '../../js/common.js';


var Personal_mainBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  subClick:function(){
  	
  },
  goback: function(){
  	history.go(-1);
  },
  change: function(){
	$("#per-feedback-hadnum").text($("#per-feedback-msg").val().length);
  },
  render: function() {
    return (
		<div>

			<div className="weui_cells weui_cells_form">
				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary">
						<textarea className="weui_textarea" placeholder="欢迎向我们吐槽牙艺的各种问题"  id="per-feedback-msg" rows="3" onInput={this.change} ></textarea>
						<div className="weui_textarea_counter">
							<span id="per-feedback-hadnum">0</span>
							<span>/200</span>
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid">
				<div className="reg-padding"></div>
				<div className="reg-padding">
					<a className="weui_btn weui_btn_primary reg-btn" onClick={this.subClick}>提交</a>
				</div>
		  	</div>

		  	<div id="loading-toast" ref="loading-toast" className="weui_loading_toast displaynone">
			    <div className="weui_mask_transparent"></div>
			    <div className="weui_toast">
			        <div className="weui_loading">
			            <div className="weui_loading_leaf weui_loading_leaf_0"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_1"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_2"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_3"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_4"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_5"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_6"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_7"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_8"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_9"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_10"></div>
			            <div className="weui_loading_leaf weui_loading_leaf_11"></div>
			        </div>
			        <p className="weui_toast_content text-align" id="loading-toast-text">正在加载</p>
			    </div>
			</div>

			<div id="success-toast" className="displaynone">
			    <div className="weui_mask_transparent" id="success-toast-mask"></div>
			    <div className="weui_toast">
			        <i className="weui_icon_toast"></i>
			        <p className="weui_toast_content text-align" id="success-toast-text"></p>
			    </div>
			</div>

			<div id="fail-toast" className="displaynone">
			    <div className="weui_mask_transparent" id="fail-toast-mask"></div>
			    <div className="weui_toast_fail">
			        <p className="text-align" id="fail-toast-text"></p>
			    </div>
			</div>
		</div>
    );
  }
});

ReactDOM.render(
  <Personal_mainBox />,
  document.getElementById('content')
);