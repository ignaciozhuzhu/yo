﻿'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	thisurl,
	serviceurl,
	ipurl,
	weixinPayBack,
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
$(document).ready(function() {
	//判断登陆与否
	$.ajax({
		url: serviceurl + "site/getUserInfo",
		type: "get",
		dataType: "json",
		contentType: "application/json",
		cache: false,
		async: false,
		beforeSend: function(XMLHttpRequest) {},
		success: function(dt) {
			if (dt.status == "redirect") {
				//表示未登录
				location.href = "../login.html?backurl=personal/per_mypay.html";
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
});
var Amount = "";
var Channel = "";
var Orderid = "";
var OrderNo = ""; //ordernumber
var Personal_npayBox = React.createClass({
	componentDidMount: function() {
		$("label").click(function() {
			$("label").removeClass("hadchecked");
			$(this).addClass("hadchecked");
		});
		$("#wx_pub").attr("checked", "checked");
	},
	getInitialState: function() {
		Orderid = getCookie("orderID");

		$.ajax({
			url: serviceurl + "order/willPayInfo", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			data: {
				"orderid": Orderid
			},
			contentType: "application/json", //内容类型
			cache: false,
			success: function(data) {
				console.log("success: " + JSON.stringify(data));
				if (data.status == "success") {
					console.log("查询成功");
					var PerNPayInfoOrder = data.map.order;
					var PerNPayInfoServices = data.map.oderServices;
					var Preferential = 0;
					var Allprice = 0;
					$.each(PerNPayInfoOrder, function(idx, item) {
						$("#per-npay-info-hospitalname").text(item.hospitalname);
						$("#per-npay-info-userfullname").text(item.userfullname);
						$("#per-npay-info-doctorname").text(item.doctorname);
						$("#per-npay-info-createtime").text(getMobilTime(item.createtime));
						OrderNo = item.ordernumber;

						Preferential = MoneyConversion(Preferential + item.reduce);
						Allprice = MoneyConversion(Allprice + item.totalprice);
						Amount = toDecimal(Allprice - Preferential);
						$("#per-npay-info-price").text(Allprice);
						$("#per-npay-info-preferential").text(Preferential);
						$("#per-npay-info-actually").text(Amount);
					});

					$.each(PerNPayInfoServices, function(idx, item) {
						$("#per-npay-info-ser").append(
							"<div class='weui_cell per_npay_info_paddingcell pointer' >" +
							"<div class='weui_cell_hd text-left width5'>" +
							"<img src='images/ic_order_item.png'  class='per-width90 display-block'  >" +
							"</div>" +
							"<div class='weui_cell_bd weui_cell_primary fontsize15 lpadding13'>" +
							"<div>" +
							"<span class='weui_media_title per-name'>" + item.servicename + "</span> " +
							"<span class='weui_media_title per-name pull-right'>￥" + Amount + "</span> " +
							"</div>" +
							"<div class='weui_media_desc res-doc-con-text fontsize15' id='per-rpay-info-spanmarrig10'>" +
							"<span class='weui_media_title marrig10 color-f6'>接诊人：<span class='color-black'>" + item.handlername + "</span></span>" +
							"<span class='weui_media_title color-f6' >就诊人：<span class='color-black'>" + item.patientname + "</span></span>" +
							"</div>" +
							"</div>" +
							"</div>"
						)

					});

				} else if (data.status == "fail") {
					reminder("支付详细信息获取失败");
				} else {
					reminder("支付详细信息获取错误");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					location.href = "../404.html";
				}
				reminder("支付详细信息获取失败！");
				return;
			}
		});
		return {
			data: []
		};
	},
	goback: function() {
		history.go(-1);
	},
	paying: function() {
		Channel = $(".hadchecked").attr("name");
		// wap_pay("alipay");
		// return;
		//判断是否为微信登录
		if (Channel == "wx_pub") {
			//获取open_id
			var urlinfo = window.location.href;
			var code = "";
			if (urlinfo.indexOf("code=") == -1) {
				location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx384850d6a13cd619&redirect_uri=" + weixinPayBack + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				// location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx384850d6a13cd619&redirect_uri=https%3a%2f%2fwx1.yayi365.cn%2fpersonal%2fper_npay_pay.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				return;
			} else {
				var openID = "";
				code = urlinfo.substring(urlinfo.indexOf("code=") + 5, urlinfo.indexOf("&state="));
				$.ajax({
					url: serviceurl + "site/openid",
					type: "get",
					dataType: "json",
					data: {
						"code": code
					},
					contentType: "application/json",
					cache: false,
					async: false,
					beforeSend: function(XMLHttpRequest) {},
					success: function(dt) {
						if (dt.status == "success") {
							openID = dt.data;
							var _params = {
								"orderId": Orderid,
								"orderNo": OrderNo,
								"amount": MoneyValue(Amount),
								"channel": Channel,
								"open_id": openID
							};
							$.ajax({
								url: serviceurl + "order/paying", //请求的Url
								type: "post", //提交方式
								dataType: "json", //请求的返回类型 这里为json	
								data: JSON.stringify(_params),
								// contentType : "application/json", 
								contentType: "application/json;charset=UTF-8",
								cache: false, //是否异步提交
								success: function(data) {
									if (data.status == "success") {
										console.log("paying: " + JSON.stringify(data));
										var charge = JSON.stringify(data.data);
										/*eslint no-undef: 1 */
										pingpp.createPayment(charge, function(result, error) {
											if (result == "success") {
												reminder("操作成功！") // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
												if (Channel != "wx_pub") {
													console.log("charge:" + charge);
													// console.log("charge.extra.success_url: " + charge.extra.success_url);
													// location.href = charge.credential.alipay_wap.channel_url;
												} else {
													//微信公众号付款成功跳转
													location.href = "per_mypay.html";
												}
											} else if (result == "fail") {
												reminder("操作失败！");
												return; // charge 不正确或者微信公众账号支付失败时会在此处返回
											} else if (result == "cancel") {
												reminder("操作取消！");
												return; // 微信公众账号支付取消支付
											}
										});
									} else if (data.status == "fail") {
										reminder("付款失败");
									} else {
										reminder("付款错误");
									}
								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									reminder("付款失败！");
									return;
								}
							});
						} else {
							reminder("获取破微信open_id失败");
							return;
						}
					},
					complete: function(XMLHttpRequest, textStatus) {},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						reminder("获取破微信open_id错误");
						return;
					}
				});
				return;
			}
		} else { //非微信支付
			var _params = {
				"orderId": Orderid,
				"orderNo": OrderNo,
				"amount": MoneyValue(Amount),
				"channel": Channel
			};
			// var _params={
			//  		"orderId" : "174",
			//  		"orderNo" : "146882802391",
			//  		"amount" : MoneyValue(1),
			//  		"channel" : Channel
			// };
			$.ajax({
				url: serviceurl + "order/paying", //请求的Url
				type: "post", //提交方式
				dataType: "json", //请求的返回类型 这里为json	
				data: JSON.stringify(_params),
				// contentType : "application/json", 
				contentType: "application/json;charset=UTF-8",
				cache: false, //是否异步提交
				success: function(data) {
					if (data.status == "success") {
						console.log("paying: " + JSON.stringify(data));
						var charge = JSON.stringify(data.data);

						pingpp.createPayment(charge, function(result, error) {
							if (result == "success") {
								reminder("操作成功！") // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
								if (Channel != "wx_pub") {
									console.log("charge:" + charge);
									// console.log("charge.extra.success_url: " + charge.extra.success_url);
									// location.href = charge.credential.alipay_wap.channel_url;
								}
							} else if (result == "fail") {
								reminder("操作失败！");
								return; // charge 不正确或者微信公众账号支付失败时会在此处返回
							} else if (result == "cancel") {
								reminder("操作取消！");
								return; // 微信公众账号支付取消支付
							}
						});
					} else if (data.status == "fail") {
						reminder("付款失败");
					} else {
						reminder("付款错误");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					reminder("付款失败！");
					return;
				}
			});
		}
	},
	cancel: function() {
		$("#per-npay-pay-dialog").css("display", "block");
	},
	exitCancel: function() {
		$("#per-npay-pay-dialog").css("display", "none");
	},
	exit: function() {
		window.history.back(-1);
	},
	render: function() {
		return (
			<div className="weui_tab">
			<div className="weui_tab_bd">
				
				<div className="per-npay-pay-info per_npay_paddingBox">支付详情</div>
				<div className="weui_panel weui_panel_access ">
					<div className="weui_panel_bd">
						<div className="weui_media_box weui_media_text bmargin0">
							<div className="weui_media_title text-align per_npay_ifno_hosname fontsize18 color-black" id="per-npay-info-hospitalname">
								
							</div>
							<div className="weui_media_desc res-det-padleft weui_media_title fontsize15">
								<div className="res-det-padbot text-center">
									<span className="per-npay-info-span color-f6">用户：
										<span className="per-npay-info-time color-black" id="per-npay-info-userfullname"></span>
									</span>
									<span className="text-right color-f6">就诊地点：
										<span className="per-npay-info-time color-black">互联网诊间</span>
									</span>
								</div>
								<div className=" res-det-padbot" >
									<span className="per-npay-info-span color-f6">主治医生：
										<span className="per-npay-info-time color-black" id="per-npay-info-doctorname"></span>
									</span>
									<span className="text-right	color-f6">时间：
										<span id="per-npay-info-createtime" className="per-npay-info-time color-black"></span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="weui_cells weui_cells_access martop0" id="per-npay-info-ser" ref="per-npay-info-ser">
				   
				</div>

				<div className="weui_panel weui_panel_access res-det-borbot no-border per_npay_info_paddingcell">
					<div className="weui_panel_bd">
						<div className="weui_media_box weui_media_text">
							<div className="weui_media_desc res-det-padleft weui_media_title pull-right fontsize15">
								<div className=" res-det-padbot text-right">
									<span>合计：<span id="per-npay-info-price"></span></span>
								</div>
								<div className="fontsize15">
									<span className="marright10px">优惠：
										<span id="per-npay-info-preferential"></span>
									</span>
									<span>实付：<span id="per-npay-info-actually"></span></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="per-npay-pay-info">支付方式</div>
				<div className="weui_cells weui_cells_radio martop0">
					<label className="weui_cell weui_check_label hadchecked per_npay_for_box" name="wx_pub">
						<div className="weui_cell_bd weui_cell_primary pointer">
							 <span><img src="images/ic_pay_wechat.png"  width="10%"/></span>
							 <span className="per_npay_for_wx">微信支付</span>
						</div>
						<div className="weui_cell_ft">
							<input type="radio" name="radio1" className="weui_check" id="wx_pub"  ref="wx_pub" />
							<span className="weui_icon_checked"></span>
						</div>
					</label>
					<label className="weui_cell weui_check_label displaynone" name="alipay_wap">
						<div className="weui_cell_bd weui_cell_primary">
							<span><img src="images/ic_pay_alipay.png" width="10%"/></span>
							<span>支付宝支付</span>
						</div>
						<div className="weui_cell_ft">
							<input type="radio" name="radio1" className="weui_check" id="alipay_wap" ref="alipay_wap" />
							<span className="weui_icon_checked"></span>
						</div>
					</label>
					<label className="weui_cell weui_check_label displaynone" name="upacp_wap">
						<div className="weui_cell_bd weui_cell_primary">
							<span><img src="images/ic_pay_qq.png" width="10%"/></span>
							<span>银联支付</span>
						</div>
						<div className="weui_cell_ft">
							<input type="radio" name="radio1" className="weui_check" id="upacp_wap" ref="upacp_wap" />
							<span className="weui_icon_checked"></span>
						</div>
					</label>
				</div>

				<div className="weui_dialog_confirm displaynone"  id="per-npay-pay-dialog" ref="per-npay-pay-dialog">
					<div className="weui_mask"></div>
					<div className="weui_dialog">
						<div className="weui_dialog_hd">
						  <strong className="weui_dialog_title">提示</strong>
						</div>
						<div className="weui_dialog_bd">您的订单还没有支付，确认退出么？</div>
						<div className="weui_dialog_ft">
							<a className="weui_btn_dialog default text-align pointer" id="per-npay-pay-dialog-no" ref="per-npay-pay-dialog-no" onClick={this.exitCancel}>取消</a>
							<a className="weui_btn_dialog primary text-align pointer" id="per-npay-pay-dialog-yes" ref="per-npay-pay-dialog-yes" onClick={this.exit}>确定</a>
						</div>
					</div>
				</div>
			</div>

			<div className="weui_tabbar">
				<div className="weui_tabbar_item">
					   <div id="per-npay-pay-cancel" ref="per-npay-pay-cancel" className="weui_btn weui_btn weui_btn_default per-npay-btn-img per-npay-pay-cancelpay pointer" onClick={this.cancel}>取消支付</div>
				</div>
				<div className="weui_tabbar_item">
					   <div className="weui_btn weui_btn_primary per-npay-btn-img per-npay-pay-gopay pointer" id="per-npay-paying" ref="per-npay-paying" onClick={this.paying}>立即支付</div>
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
	<Personal_npayBox />,
	document.getElementById('content')
);