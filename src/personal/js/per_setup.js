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
$(document).ready(function() { 
		//判断登陆与否
		$.ajax({	  
			url :  serviceurl+"site/getUserInfo", 
			type : "get",                                           
			dataType : "json",  
			contentType : "application/json",        			    
			cache : false,  
			async: false,                                       
			beforeSend:function(XMLHttpRequest){},                                        
			success : function(dt){
				if(dt.status == "redirect"){
					//表示未登录
					location.href = "../login.html?backurl=personal/per_setup.html";
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				  reminder(XMLHttpRequest.responseJSON.message);
					return;
			}
		});
}); 
var Personal_setBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  goback: function(){
  	history.go(-1);
  },
  goUpdatePWD: function(){
	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/persetup.html", 30);
	location.href="per_update_psw.html";
  },
  aboutYa: function(){
	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/persetup.html", 30);
	location.href="per_about.html";
  },
  giveFriends: function(){

  },
  goOpinion: function(){
	// delCookie("gobackURL");
	// setCookie("gobackURL", ipurl + "/persetup.html", 30);
	// location.href="per_feedback.html";
		reminder("请在公众号里给我们发留言！");
		return;
  },
  logout:function(){
  		$("#login-loading-toast").css("display","block");
  		$.ajax({	  
		url : thisurl+"logout",   	 //请求的Url
		type : "post",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { },
		contentType : "application/json",        			     //内容类型
		cache : false,                                        //是否异步提交
		success : function(data){
			console.log(JSON.stringify(data))
			$("#login-loading-toast").css("display","none");
			if( data.status == "success"){
					reminderSuccess("登出成功","../login.html");
				}else{
					reminder("登出错误");
					return;	
				}
			},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			return false;	
			}
	});
  },
  render: function() {
    return (
		<div>
			<div className="weui_cells weui_cells_access tmargin1 per_adduser_list pointer" onClick={this.goUpdatePWD}>
				<div className="weui_cell per-borbot" id="per-setup-update-psw">
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">密码修改</span></div>
					<div className="weui_cell_ft"></div>
				</div>
			</div>
			<div className="weui_cells weui_cells_access tmargin1 per_adduser_list">
				<div className="weui_cell per-borbot pointer" id="per-setup-about"  onClick={this.aboutYa} >
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">关于牙艺</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				<div className="weui_cell per-borbot pointer displaynone" id="per-setup-recommend" onClick={this.giveFriends} >
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">推荐给朋友</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				<div className="weui_cell per-borbot pointer" id="per-setup-feedback" onClick={this.goOpinion} >
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">意见反馈</span></div>
					<div className="weui_cell_ft"></div>
				</div>
			</div>
			<div className="per-setup-logout">
				<a className="weui_btn weui_btn_warn pointer" onClick={this.logout}>
					退出当前账号
				</a>
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
  <Personal_setBox />,
  document.getElementById('content')
);