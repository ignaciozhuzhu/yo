'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	serviceurl,
	setCookie,
	getCookie,
	delCookie,
	reminder,
	MoneyConversion
} from '../../js/common.js';
var data = [];
var commentArr = [];
var orderArr = [];
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
				location.href = "../login.html?backurl=personal/per_booking.html";
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
});
var Personal_down = React.createClass({
	goPay: function() {
		delCookie("gobackURL");
		setCookie("gobackURL", "per_booking_det.html");
		location.href = "per_rpay_comment.html";
	},
	render: function() {
		var statusclass = "per-npay-buttom bmargin1 displaynone";
		if (this.props.data.d != "1") {
			if (this.props.data.isorder == "2") {
				statusclass = "per-npay-buttom bmargin1";
			}
		}
		return (
			<div>
			<div className={statusclass}>
				<a href="javascript:;" className="weui_btn weui_btn_primary per-npay-btn-img" onClick={this.goPay}>去评价</a>
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

var BookingList = React.createClass({
	render: function() {
		var nodes = this.props.data.map(function(comment) {
			var state = comment.state;
			if (state == "1") {
				state = "未付款";
			} else if (state == "2") {
				state = "已付款";
			} else if (state == "3") {
				state = "完成";
			} else if (state == "4") {
				state = "取消";
			} else {
				state = "未生效";
			}
			return (
				<Comment 
          key={comment.id} 
					orderid={comment.id} 
					userAvatar={serviceurl+comment.userAvatar.substr(1)}
					totalprice={MoneyConversion(comment.totalprice)}
					doctorname={comment.doctorname}
					patientname={comment.patientname}
					state={state}
					ordercontent={comment.ordercontent}
          >
          </Comment>
			);
		});
		return (
			<div className="weui_cells weui_cells_access martop0">
						{nodes}
					</div>
		);
	}
});

var Comment = React.createClass({
	goDetail: function() {
		delCookie("orderID");
		setCookie("orderID", this.props.orderid);
		delCookie("gobackURL");
		setCookie("gobackURL", "per_booking_det.html");
		location.href = "per_booking_info.html";
	},
	render: function() {
		return (
			<div className="weui_cell per_npay_info_paddingcell pointer" onClick={this.goDetail}>
							<div className="weui_cell_hd text-left width5">
								<img src="images/ic_order_item.png" className="per-width90 display-block"  />
							</div>

							<div className="weui_cell_bd weui_cell_primary fontsize15 lpadding1">
									<div>
										<span className="weui_media_title per-name">{this.props.ordercontent}</span> 
									</div>

									<div className="weui_media_desc res-doc-con-text fontsize15" >
										<span className="weui_media_title marrig10 color-f6">接诊人：
											<span className="color-black">{this.props.doctorname}</span>
										</span>
										<span className="pull-right per-npay-gopay per-npay-gopaybg">{this.props.state}</span>
									</div>

									<div className="weui_media_desc res-doc-con-text fontsize15">
										<span className="weui_media_title marrig10 color-f6">总价：
											<span className="weui_media_title per-name">{this.props.totalprice}</span> 
										</span>
									</div>
							</div>
					</div>
		);
	}
});


var Personal_top = React.createClass({
	render: function() {
		var hospitalname = this.props.data.hospitalname;
		var patientname = this.props.data.patientname;
		var status = this.props.data.status;
		if (this.props.data.d == "1") {
			status = "已退号";
		} else {
			if (this.props.data.isorder == "1") {
				status = "已就诊";
			} else if (this.props.data.isorder == "2") {
				status = "待评价";
				$("#gopayBtn").removeClass("displaynone");
			} else if (this.props.data.isorder == "3") {
				status = "已评价";
			} else {
				if (this.props.data.timestatus == "1") {
					status = "已过期";
				} else {
					status = "未就诊";
				}
			}
		}
		var doctorname = this.props.data.doctorname;
		var showtime = this.props.data.bookingtime.split(" ")[0];
		return (
			<div>
			<div className="weui_panel weui_panel_access">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text bmargin0 pointer">
						<div className="weui_media_title text-align per_npay_ifno_hosname fontsize18 color-black">
							<span id="hospitalname">{hospitalname}</span>
						</div>
						<div className="weui_media_desc res-det-padleft weui_media_title fontsize15">
							<div className="res-det-padbot text-center ">
								<span className="per-npay-info-span color-f6">就诊人：
									<span className="per-npay-info-time color-black" >{patientname}</span>
								</span>
								<span className="text-right color-f6">状态：
									<span className="color-black" >{status}</span>
								</span>
							</div>
							<div className="" >
								<span className="per-npay-info-span color-3 color-f6">预约医生：
									<span id="per-npay-info-doctorname color-black" >{doctorname}</span>
								</span>
								<span className="text-right	color-f6">就诊时间：
									<span id="per-npay-info-createtime">{showtime}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
});
var CommentList = React.createClass({
	render: function() {
		var nodes = this.props.data.map(function(comment) {
			return (
				<Commentc 
          key={comment.id} 
					words={comment.words} 
          >
          </Commentc>
			);
		});
		return (
			<div className="weui_cells weui_cells_access martop0">
						{nodes}
					</div>
		);
	}
});

var Commentc = React.createClass({
	render: function() {
		return (
			<div className="weui_cell per_npay_info_paddingcell" >
					<div className="weui_panel_bd">
						<div className="weui_media_box weui_media_text">
							<h4 className="weui_media_title">我的评论</h4>
							<p className="weui_media_desc">{this.props.words}</p>
						</div>
					</div>
				</div>
		);
	}
});

var Personal_MainBox = React.createClass({
	getInitialState: function() {
		$.ajax({
			url: serviceurl + "order/bookingOrder",
			type: "get",
			dataType: "json",
			data: {
				"bookingid": getCookie("bookingID")
			},
			contentType: "application/json",
			cache: false,
			async: false,
			beforeSend: function(XMLHttpRequest) {},
			success: function(dt) {
				console.log(JSON.stringify(dt));
				if (dt.status == "success") {
					data = dt.data;
					orderArr = dt.map.orders;
					commentArr = dt.map.review;
				} else {
					reminder("获取预约详情失败");
					return;
				}
			},
			complete: function(XMLHttpRequest, textStatus) {},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					location.href = "../404.html";
				}
				reminder("获取预约详情错误");
				return;
			}
		});
		return {
			data: data,
			orderArr: orderArr,
			commentArr: commentArr
		};
	},
	render: function() {
		return (
			<div>
        <Personal_top data={this.state.data}/>
				<BookingList data={this.state.orderArr}/>
				<CommentList data={this.state.commentArr}/>
				<Personal_down data={this.state.data}/>
      </div>
		);
	}
});
ReactDOM.render(
	<Personal_MainBox />,
	document.getElementById('content')
);