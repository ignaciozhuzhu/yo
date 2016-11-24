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
	getHtmlFontSize
} from '../../js/common.js';

var fData = [];
var idx = 0;
getHtmlFontSize();
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
				location.href = "../login.html?backurl=personal/per_family.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
}); 
var deletePatient = function(patientId){
	$("#login-loading-toast").css("display","block");
	$.ajax({
      url: serviceurl+"patient/delete",
      dataType: 'json',
      cache: false,
      data : {patientId:patientId},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
      	$("#login-loading-toast").css("display","none");
        if( dt.status == "success"){
			reminder("删除家庭联系人成功！");
		}else if(dt.status == "failed"){
			reminder("删除家庭联系人失败");
		}else{
			reminder("删除家庭联系人失败！");
		}
      }.bind(this),
      error: function(xhr, status, err) {
        $("#login-loading-toast").css("display","none");
		reminder("删除家庭联系人错误！");
      }.bind(this)
    });
};
var refleshData = function(){
	$("#login-loading-toast").css("display","block");
	$.ajax({
      url: serviceurl+"patient/list",
      dataType: 'json',
      cache: false,
      data : {},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
      	console.log(JSON.stringify(dt));
      	$("#login-loading-toast").css("display","none");
        if( dt.status == "success"){
			fData = dt.data;
		}else if( dt.status == "redirect"){
			location.href="../login.html"
		}else{
			reminder("请稍后再试");
			return ;
		}
      }.bind(this),
      error: function(xhr, status, err) {
        $("#login-loading-toast").css("display","none");
		reminder(xhr.responseJSON.message);
      }.bind(this)
    });
};
var Personal_familyDown = React.createClass({
	addUser:function(){
		if( parseInt($("#per-family-ynum").text())>5){
			reminder("最多只能有5名联系人");
		}else{
			location.href="per_adduser.html"
		}
	},
	render: function() {
		return(
			<div>
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

var Personal_familyCenter = React.createClass({
	render: function() {
		return(
			<div className="per-family-alert">
				已添加
				<span id="per-family-ynum" ref="per-family-ynum">
				</span>
				人，还可添加
				<span id="per-family-wnum" ref="per-family-wnum">
				</span>
				人
			</div>
		);
	}
});

var Personal_familyList = React.createClass({
	componentDidMount: function(){
		$("#per-family-ynum").text(idx);
 		$("#per-family-wnum").text(5-idx);
 		if(idx < 5 && idx > 0){
			$("#adduser").show();
 		}else{
			$("#adduser").hide();
 		}
	},
	goAddUser: function(){
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal/personal_family.html", 30);
		location.href = "../reservation/reservation_adduser.html";
	},
	render: function() {
		var Time = new Date();
		var Year = Time.getFullYear();
		if(this.props.data.length>0){
			var nodes = this.props.data.map(function (comment) {
				idx++;
				var Idcard = comment.idcard;
				var familyCss = (comment.default_patient != null)?"weui_panel weui_panel_access per-family-one per-family-first":"";
				var fullname = comment.fullname;
				var IDCardDisplay = "";
				var familyAge = "";
				var familySex = "";
				var familyMobile = comment.mobile.substring(0,3) + "****" + comment.mobile.substring(7);
				var birthdayDate = comment.birthday.split("-")[0];
				var gender = comment.gender;
				if( checknull(Idcard).length == 15){
					var ageyear = "19"+Idcard.substring(6,8); 
					if( Year - ageyear < 0){
						reminder("身份证号有误");
						return;
					}else{
						IDCardDisplay = Idcard.substring(0,6)+"******"+Idcard.substring(12);
							familyAge = Year - ageyear;
						var sexnum = Idcard.substring(14,15); 
						familySex = sexnum % 2 ? "男" : "女";
						}
					}else if( checknull(Idcard).length == 18 ){
						var ageyear = Idcard.substring(6,10);
						if( Year - ageyear < 0){
						reminder("身份证号有误");
						return;
						}else{
							IDCardDisplay = Idcard.substring(0,6)+"********"+Idcard.substring(14);
							familyAge = Year - ageyear;
						var sexnum = Idcard.substring(16,17); 
						familySex = sexnum % 2 ? "男" : "女";
						}
					}else if( checknull(Idcard) == ""){
						if( checknull(birthdayDate) != ""){
							if( checknull(birthdayDate) > Year){
								familyAge = 0;
							}else{
								familyAge = Year - birthdayDate; 
							}
						}else{
							familyAge = "";
						}

						if( gender == "1" ){
							familySex = "男";
						}else if( gender == "-1" ){
							familySex = "女";
						}else{
							familySex = "不详";
						}
					}else{
						reminder("身份证号有误");
						return;
					}
					return (
						<Comment 
						key={comment.id} 
						id={comment.id} 
						familyCss={familyCss} 
						fullname={fullname}
						IDCardDisplay={IDCardDisplay}
						familyAge={familyAge}
						familySex={familySex}
						familyMobile={familyMobile}
						>
						</Comment>
					);
				});
				return (
					<div className="container-fluid">
						<div className="row">
							<div id="per-family-list" ref="per-family-list">
								{nodes}
							</div>
		                </div>
		                <div className="datedet_btn_box">
		                	<div className="weui_btn weui_btn_primary success_btn" id="adduser" onClick={this.goAddUser}>添加家庭联系人</div>
		               	</div>
						
	                </div>
				);
		}else if(this.props.data.length == 0){
			return (
				<div className="container-fluid">
	              <div className="per_myfamily_zero">
	                <img src="images/patient_list_empty.png" className="img-responsive"/>
	              </div>
	              <div className="per_mydoc_text">
	                <p className="text-align yayi-color">您还没有添加任何常用联系人</p>
	                <p className="text-align yayi-color">您可以添加家人,为他们预约挂号，咨询专家</p>
	                <div className="per_mydoc_btn" onClick={this.goAddUser}>
	                  <a className="weui_btn weui_btn_primary reg-btn pointer">添加家庭联系人</a>
	                </div>
	              </div>
	            </div>
			);
		}
	}
});

var Comment = React.createClass({
	goUpdate:function(){
		// delCookie("patientID");
		// setCookie("patientID", this.props.id);
		// location.href="per_family_update.html";
		location.href="per_family_update.html?patientID=" + this.props.id;
	},
    render: function() {
      return (
      <div ref="per-family-first">
				<div  className={this.props.familyCss}  >
					<div className="weui_media_box weui_media_appmsg per-family-border-bottom pointer" onClick={this.goUpdate} >
						<div className="per-family-list-left">
							<div>  {this.props.fullname}</div>
							<div className="per-family-IDCard"> {this.props.IDCardDisplay} </div>
						</div>
						<div className="per-family-list-right">
							<div>
								<span className="per-family-width30 per-family-sex">{this.props.familySex}</span>
								<span className="per-family-age">{this.props.familyAge}</span>
							</div>
							<div>  {this.props.familyMobile} </div>
						</div>
					</div>
				</div>
			</div>
      );
    }
});

var Personal_familyBox = React.createClass({
  getInitialState: function() {
	refleshData();
  	return {data: fData};
  },
  handleCommentSubmit: function(comment) {
    this.setState({data: comment});
  },
  render: function() {
    return (
      <div>
        
        <Personal_familyCenter />
        <Personal_familyList data={this.state.data} />
        <Personal_familyDown onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <Personal_familyBox data={fData} />,
  document.getElementById('content')
);
