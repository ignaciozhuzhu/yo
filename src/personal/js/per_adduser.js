'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	serviceurl,
	ipurl,
	setCookie,
	getCookie,
	delCookie,
	reminder,
	checknull
} from '../../js/common.js';
var countycode = "";
var countyName = "";
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
				location.href = "../login.html?backurl=personal/per_family.html";
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
});
var checkMobile = function(Mobile) {
	if (Mobile.length == 0) {
		reminder("手机号码不能为空!");
		return false;
	} else if (!Mobile.match(/^[0-9]*$/)) {
		reminder("请输入正确的手机号!");
		return false;
	}
	return true;
};

var Reservation_addUserInfo = React.createClass({
	componentDidMount: function() {
		countycode = getCookie("cityID");
		countyName = getCookie("cityName");
		$("#address").val(countyName);
		$("#areacode").val(countycode);

		if (getCookie("record") != "") {
			var arr = new Array();
			arr = getCookie("record").split("|");
			this.refs.fullname.value = arr[0];
			this.refs.Idcard.value = arr[1];
			this.refs.gender.value = arr[2];
			this.refs.birthday.value = arr[3];
			this.refs.mobile.value = arr[4];
		}
	},
	goback: function(e) {
		history.go(-1);
	},
	GetBirthdatByIdNo: function() {
		var Time = new Date()
		var Year = Time.getFullYear()
		var Idcard = this.refs.Idcard.value;
		if (Idcard.length == 15) {
			var ageyear = "19" + Idcard.substring(6, 8);
			if (Year - ageyear < 0) {
				reminder("身份证号有误!");
				return;
			} else {
				this.refs.birthday.value = Year - ageyear;
				var sexnum = Idcard.substring(14, 15);
				this.refs.gender.value = (sexnum % 2 ? "男" : "女");
			}
		} else if (Idcard.length == 18) {
			var ageyear = Idcard.substring(6, 10);
			this.refs.birthday.value = Year - ageyear;
			if (Year - ageyear < 0) {
				reminder("身份证号有误!");
				return;
			} else {
				this.refs.birthday.value = Year - ageyear;
				var sexnum = Idcard.substring(16, 17);
				this.refs.gender.value = (sexnum % 2 ? "男" : "女");
			}
		} else if (Idcard == "") {
			this.refs.birthday.value = "";
			this.refs.gender.value = "";
		} else {
			reminder("身份证号有误!");
			return;
		}
	},
	saveClick: function() {
		var Fullname = this.refs.fullname.value;
		var Idcard = this.refs.Idcard.value;
		var Mobile = this.refs.mobile.value;
		if (checknull(Fullname) == "") {
			reminder("请输入姓名");
			return;
		}
		if (checknull(Idcard) == "") {
			reminder("请输入身份证号码");
			return;
		}
		if (checknull(Mobile) == "") {
			reminder("请输入手机号码");
			return;
		}
		var Areacode = this.refs.areacode.value;
		var Address = this.refs.address.value;
		var Gender = this.refs.gender.value;
		if (Gender == "男") {
			Gender = 1;
		} else if (Gender == "女") {
			Gender = -1;
		} else {
			Gender = 0;
		}

		if (Idcard.length == 15) {
			var Birthday = "19" + Idcard.substring(6, 8) + "-" + Idcard.substring(8, 10) + "-" + Idcard.substring(10, 12);
		} else if (Idcard.length == 18) {
			var Birthday = Idcard.substring(6, 10) + "-" + Idcard.substring(10, 12) + "-" + Idcard.substring(12, 14);
		}

		if (checknull(Fullname) != "" && checkMobile(Mobile) == true) {
			$.ajax({
				url: serviceurl + "patient/add", //请求的Url
				type: "post", //提交方式
				dataType: "json", //请求的返回类型 这里为json	
				data: JSON.stringify({
					"fullname": Fullname,
					"idcard": Idcard,
					"gender": Gender,
					"mobile": Mobile,
					"areacode": Areacode,
					"birthday": Birthday,
					"address": Address
				}),
				contentType: "application/json", //内容类型
				cache: false,
				beforeSend: function(XMLHttpRequest) {
					$("#loading-toast").css("display", "block");
				}, //是否异步提交
				success: function(data) {
					$("#loading-toast").css("display", "none");
					if (data.status == "success") {
						$("#success-toast-text").css("display", "block");
						// $("#res-docdet-att").text(data.message);
						$("#success-toast-text").text("添加成功!");
						$("#success-toast").css("display", "none");
						//跳转页面
						location.href = "per_family.html";
						// setTimeout(function(){

						// }, 2000);
					} else if (data.status == "fail") {
						$("#fail-toast").css("display", "block");
						$("#fail-toast-text").text("添加失败!");
						setTimeout(function() {
							$("#fail-toast").css("display", "none");
						}, 2000);
						return;
					} else {
						$("#fail-toast").css("display", "block");
						$("#fail-toast-text").text(data.message);
						setTimeout(function() {
							$("#fail-toast").css("display", "none");
						}, 2000);
						return;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$("#loading-toast").css("display", "none");
					$("#fail-toast").css("display", "block");
					$("#fail-toast-text").text("操作失败!");
					setTimeout(function() {
						$("#fail-toast").css("display", "none");
					}, 2000);
					return;
				}
			});
		} else {
			reminder("请填写完整");
		}
	},
	chooseCity: function() {
		var Fullname = this.refs.fullname.value;
		var Idcard = this.refs.Idcard.value;
		var Mobile = this.refs.mobile.value;
		var Gender = this.refs.gender.value;
		var age = this.refs.birthday.value;
		delCookie("record");
		setCookie("record", Fullname + "|" + Idcard + "|" + Gender + "|" + age + "|" + Mobile, 30);
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal/per_adduser.html", 30);
		location.href = "per_ads.html";
	},
	render: function() {
		return (
			<div>
	        <div className="weui_cells weui_cells_form res-add-martop per_adduser_list">
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">姓名</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <input ref="fullname" name="fullname" className="weui_input text-right" type="text" placeholder="请输入真实姓名" />
	                </div>
	            </div>
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">身份证</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <input  ref="Idcard" name="Idcard" className="weui_input text-right" type="number" pattern="[0-9]*" placeholder="请输入真实身份证号" onBlur={this.GetBirthdatByIdNo} />
	                </div>
	            </div>
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">性别</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <input  ref="gender" name="gender" className="weui_input text-right" type="text"  disabled="disabled" placeholder="必填" value=""/>
	                </div>
	            </div>
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">年龄</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <input  ref="birthday" name="birdthday" className="weui_input text-right" type="number"  disabled="disabled" placeholder="必填" value="" />
	                </div>
	            </div>
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">地址</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <div className="weui_cell_bd weui_cell_primary text-algin" onClick={this.chooseCity}>
	                    	<input id="address" ref="address" name="address" className="weui_input text-right" type="text"  disabled="disabled" />
	                    </div>
	                    <input ref="areacode" id="areacode" name="areacode" className="weui_input" type="hidden"  disabled="disabled"  />
	                </div>
	            </div>
	            <div className="weui_cell">
	                <div className="weui_cell_hd">
	                	<label className="weui_label res-add-labcolor">手机号</label>
	                </div>
	                <div className="weui_cell_bd weui_cell_primary text-algin">
	                    <input className="weui_input text-right" ref="mobile" name="mobile" type="number" pattern="[0-9]*" placeholder="用于接收预约短信 请慎重填写" />
	                </div>
	            </div>


	            <div className="container-fluid tmargin10">
				    <div className="tpadding50">
				    	<div className="weui_btn weui_btn_primary"  ref="res-adduser-btn" onClick={this.saveClick}>保存</div>
				    </div>
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
	            <p className="weui_toast_content text-align" id="loading-toast-text">正在查询</p>
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

var Reservation_addUserBox = React.createClass({
	render: function() {
		return (
			<div>
        <Reservation_addUserInfo />
      </div>
		);
	}
});


ReactDOM.render(
	<Reservation_addUserBox />,
	document.getElementById('content')
);