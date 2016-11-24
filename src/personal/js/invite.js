'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	serviceurl,
	reminder,
	getHtmlFontSize,
	checkMobile,
	isWeiXin
} from '../../js/common.js';

import {
	SearchHidden
} from '../../js/components/searchList.js';

const phoneNum = "01064328838";
$(document).ready(function() {
	getHtmlFontSize();
	if (isWeiXin) {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'wx384850d6a13cd619', // 必填，公众号的唯一标识
			timestamp: '1479956536', // 必填，生成签名的时间戳
			nonceStr: 'zhusheng123', // 必填，生成签名的随机串
			signature: '58b5396c5b23ac108171a09afe358c2490b47463', // 必填，签名，见附录1
			jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'onVoicePlayEnd',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function() {
			var title = '北京德倍尔口腔开业邀请函';
			var desc = '北京德倍尔口腔将于2016年12月18日盛大开业！！';
			var imgUrl = 'https://wx1.yayi365.cn/personal/images/%E5%88%86%E4%BA%AB.jpg';
			wx.onMenuShareTimeline({
				title: title, // 分享标题
				desc: desc, //分享描述
				imgUrl: imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: desc, // 分享描述
				imgUrl: imgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		})
	}

})

var Box = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			mobile: '',
			work_unit: '',
			position: '',
			gender: '1',
			email: ''
		}
	},
	render: function() {
		var callnum = "tel:" + phoneNum;
		return (
			<div className="invite"> 
				<form>
						<div className="form-group" style={{paddingTop: "1.8rem"}}>
							<input type="text" className="form-control formcon height58 inline glyphicon-phone" ref="name" placeholder="姓名，必填" /><span className="require" style={{display:"none"}}></span>
							<input type="text" className="form-control formcon height58 inline" ref="mobile" placeholder="手机号，必填" onChange={this.mobileChange} /><span ref="imobile" className="require" style={{display:"none"}}></span>
							<input type="text" className="form-control formcon height58 inline" ref="work_unit" placeholder="工作单位" />
							<input type="text" className="form-control formcon height58 inline" ref="position" placeholder="职位" />
							<input type="text" className="form-control formcon height58 inline" ref="email" placeholder="邮箱" />
							<div className="formcon"  style={{display:"none"}}>
								<RadioButtons ref="gender" handleRadio={this.handleRadio} />
							</div>
							<input type='button' className="btn btn-lg formcon height65 brown" onClick={this.handleSubmit} value="接受邀请" />
							 <a href={callnum} className="btn btn-mobile btn-lg btn-block formcon height65 glyphicon glyphicon glyphicon-earphone" >
					          <span style={{paddingLeft:".1rem"}}>010-64328838</span>
					        </a>
						</div>
				</form>
		        <SearchHidden toastText="正在查询" />
			</div>
		);
	},
	handleSubmit: function() {
		var data = {
			"name": this.refs.name.value,
			"mobile": this.refs.mobile.value,
			"work_unit": this.refs.work_unit.value,
			"gender": this.state.gender,
			"position": this.refs.position.value,
			"email": this.refs.email.value
		}
		if (!(this.refs.name.value)) {
			reminder("请填写姓名")
			return;
		}
		if (!checkMobile(this.refs.mobile.value)) {
			reminder("请填写正确手机号")
			return;
		}

		$.ajax({
			url: serviceurl + "survey/insert",
			type: 'POST',
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(result) {
				var msg = result.message;
				if (msg.indexOf("重复") > -1) {
					reminder("此嘉宾已经存在,不需要重复邀请")
					console.log(msg);
				} else {
					reminder("感谢您接受邀请！");
				}
			},
			error: function(XMLHttpRequest) {
				reminder(XMLHttpRequest.responseJSON.message);
				return;
			}
		})
	},
	handleRadio: function(e) {
		this.setState({
			gender: e.target.value
		})
	},
	mobileChange: function(e) {
		if (!checkMobile(e.target.value)) {
			this.refs.imobile.className = "requiren"
		} else {
			this.refs.imobile.className = "required"
		}
	}
});
var RadioButtons = React.createClass({
	render: function() {
		return (
			<span>
				<span style={{width:"30%",display:"inline-block"}}>男<input className="" onChange={this.props.handleRadio} name="gender" type="radio" defaultChecked value="1"/></span>
				<span style={{width:"30%",display:"inline-block"}}>女<input onChange={this.props.handleRadio} name="gender" type="radio" value="-1"/></span>
			</span>
		)
	}
});
ReactDOM.render(
	<Box />,
	document.getElementById('content')
);