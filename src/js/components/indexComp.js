'use strict';
import React from 'react';
import {
	ipurl,
	setCookie,
	delCookie,
	downloadurl
} from '../common.js';

var Navigation = React.createClass({
	mainClick: function() {
		//主页
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/per_index.html", 30);
		location.href = "per_index.html";
	},
	orderClick: function() {
		//我的订单
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/per_index.html", 30);
		location.href = "per_mypay.html";
	},
	messageClick: function() {
		if (confirm("该功能需要下载app，是否下载？")) {
			//消息点击
			delCookie("gobackURL");
			setCookie("gobackURL", ipurl + "/per_index.html", 30);
			location.href = downloadurl;
		} else {
			return;
		}
	},
	meClick: function() {
		//我点击事件
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/per_index.html", 30);
		location.href = "personal.html";
	},
	render: function() {
		return (
			<div >
			    <div className="weui_tabbar">
			        <div className="weui_tabbar_item per-foot-nav pointer" onClick={this.mainClick}>
				            <div className="weui_tabbar_icon">
				                <img src="images/ic_home_main_checked.png" className="height-auto"/>
				            </div>
				            <p className="weui_tabbar_label yayi-color">牙艺</p>
				        </div>
				        <div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.orderClick}>
				            <div className="weui_tabbar_icon">
				                <img src="images/ic_home_pay.png" className="height-auto"/>
				            </div>
				            <p className="weui_tabbar_label">支付</p>
				        </div>
				        <div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.messageClick}>
				            <div className="weui_tabbar_icon">
				                <img src="images/ic_home_notice.png" className="height-auto"/>
				            </div>
				            <p className="weui_tabbar_label">消息</p>
				        </div>
				        <div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.meClick}>
				            <div className="weui_tabbar_icon">
				                <img src="images/ic_home_me.png" className="height-auto"/>
				            </div>
				            <p className="weui_tabbar_label">我</p>
				        </div>
			    </div>
      		</div>
		);
	}
});



export {
	Navigation
};