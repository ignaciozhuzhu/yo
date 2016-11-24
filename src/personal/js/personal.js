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
	plusZero,
	downloadurl
} from '../../js/common.js';

var per_name = "";
var Personal_mainBox = React.createClass({
  getInitialState: function() {
  	$.ajax({	  
		url : serviceurl+"site/getUserInfo",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { },
		contentType : "application/json",        			     //内容类型
		cache : false,  
		beforeSend:function(XMLHttpRequest){
			$("#login-loading-toast").css("display","block");
		},                                         //是否异步提交
		success : function(data){
			$("#login-loading-toast").css("display","none");
			console.log(JSON.stringify(data))
			if( data.status == "success"){
					delCookie("mobile");
					setCookie("mobile", data.data.mobile);
					$("#personal-name").text(checknull(data.data.fullname));
					$("#avatar").attr("src",serviceurl+data.data.avatar.substr(1));
				}else if( data.status == "redirect"){
					location.href = "../login.html?backurl=personal/personal.html";
				}else{
					reminder("请稍后再试");
					return ;
				}
			},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			return ;	
		}
	});
    return {data: []};
  },
  userClick: function(){
  	//个人信息修改
  	per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_info.html";
  	}
  },
  doctorClick: function(){
  	//我的医生
  	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_mydoc.html";
  	}
  },
  yuyueClick: function(){
  	//我的预约
  	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_booking.html";
  	}
  },
  orderClick: function(){
  	//我的订单
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_mypay.html";
  	}
  },
  familyClick: function(){
  	//家庭联系人
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录"){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_family.html";
  	}
  },
  caseClick: function(){
  	//家庭病例管理
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_case.html";
  	}
  },
  collectClick: function(){
  	//我的收藏
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_collect.html";
  	}
  },
  setClick: function(){
  	//设置
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_setup.html";
  	}
  },
  render: function() {
    return (
		<div>
			<div className="weui_cells weui_cells_access per_my_box pointer">
				<div className="weui_cell my_cell">
					<div className="weui_cell_hd per_avatar_box per-width8">
						<img src=""  className="img-circle " width="75px" height="75px" id="avatar" ref="avatar"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary per_avatar_tit" onClick={this.userClick}>
						<div >
							<span className="weui_media_title " id="personal-name" ref="personal-name"></span> 
						</div>
						<div className="weui_media_desc res-doc-con-text per-margintop5">我的积分：0</div> 
					</div>
					<div className="weui_cell_ft"></div>
				</div>
			</div>
			<div className="weui_cells weui_cells_access tmargin1 personal_paddingBox">	
				<div className="weui_cell pointer" onClick={this.doctorClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 4 Copy@2x.png"  className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">我的医生</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
				<div className="weui_cell pointer" onClick={this.yuyueClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 9 Copy 2@2x.png"  className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">我的预约</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
				<div className="weui_cell pointer" onClick={this.orderClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 10 Copy@2x.png"  className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">我的订单</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
				<div className="weui_cell pointer" onClick={this.familyClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 11 Copy@2x.png" className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">家庭联系人</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
				<div className="weui_cell pointer displaynone" onClick={this.caseClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 12 Copy@2x.png" className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">家庭病例管理</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
				<div className="weui_cell pointer displaynone" onClick={this.collectClick}>
					<div className="weui_cell_hd">
						<img src="images/Group 13 Copy@2x.png" className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">我的收藏</span></div>
					<div className="weui_cell_ft"></div>
				</div>
				
			</div>
			
			<div className="weui_cells weui_cells_access pointer tmargin1 personal_paddingBox" onClick={this.setClick}>
				<div className="weui_cell">
					<div className="weui_cell_hd">
						<img src="images/Group 14 Copy@2x.png" className="margin-right15 displayblock per-imggroup"/>
					</div>
					<div className="weui_cell_bd weui_cell_primary"><span className="weui_media_title ">设置</span></div>
					<div className="weui_cell_ft"></div>
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


var Personal_tarBox = React.createClass({
  orderClick: function(){
  	//我的订单
	var per_name = $("#personal-name").text();
  	if( per_name == "未登录" ){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_mypay.html";
  	}
  },
  yuyueClick: function(){
  	//我的预约
  	var per_name = $("#personal-name").text();
  	if( per_name == "" || per_name == "未登录"){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_booking.html";
  	}
  },
  setClick: function(){
  	//设置
  	var per_name = $("#personal-name").text();
  	if( per_name == "" || per_name == "未登录"){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_setup.html";
  	}
  },
  mainClick: function(){
  	//主页
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="per_index.html";
  },
  messageClick: function(){
  	//消息点击
  	per_name = $("#personal-name").text();
  	if( per_name == "" || per_name == "未登录"){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
		if(confirm("该功能需要下载app，是否下载？")){
			//消息点击
			delCookie("gobackURL");
			setCookie("gobackURL", ipurl + "/personal.html", 30);
			location.href=downloadurl;
		}else{
			return;
		}
  	}
  },
  meClick: function(){
  	//我点击事件
  	per_name = $("#personal-name").text();
	if( per_name == "" || per_name == "未登录"){
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../login.html";
  	}else{
  		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="personal.html";
  	}
  },
  render: function() {
    return (
		<div className="weui_tabbar">
			<div className="weui_tabbar_item per-foot-nav pointer" onClick={this.mainClick}>
				<div className="weui_tabbar_icon">
					<img src="images/ic_home_main.png" className="height-auto"/>
				</div>
				<p className="weui_tabbar_label">牙艺</p>
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
					<img src="images/ic_home_me_checked.png" className="height-auto"/>
				</div>
				<p className="weui_tabbar_label">我</p>
			</div>
		</div>
    );
  }
});

ReactDOM.render(
  <Personal_mainBox />,
  document.getElementById('content')
);

ReactDOM.render(
  <Personal_tarBox />,
  document.getElementById('downTar')
);