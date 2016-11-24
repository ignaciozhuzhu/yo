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
import Vld from 'validator';
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
				location.href = "../login.html?backurl=personal/per_info.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
});
var cityID = "";
var address = "";
var Personal_mainBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
  	var cityName = "";
  	if( Vld.isNull(getCookie("cityID")+"") === false && Vld.isNull(getCookie("proName")+"") === false){
  		cityName = getCookie("proName")+ " " + getCookie("cityName"); 
	}
  	var address = getCookie("address"); 
  	if( Vld.isNull(cityName+"") === false ){
  		$("#cityName").html(cityName);
  		$("#per-address-msg").val(address.split(" ")[2]);
  		$("#per-feedback-hadnum").text(address.length);
  	}
    
  },
  subClick:function(){
  	cityID = getCookie("cityID"); 
  	address = $("#per-address-msg").val().trim();
  	if( Vld.isNull(cityID+"")){
  		reminder("请选择地址！");
  		return;
  	}
  	if( Vld.isNull(address+"")){
  		reminder("请填写详细地址！");
  		return;
  	}
  	if( Vld.isLength(address+"", {min:1, max:200}) === false){
  		reminder("详细地址最多200字");
  		return;
  	}
  	var _params={
	  "areacode" : cityID ,
	  "address" : $("#cityName").text()+ " " +address
	};
	$.ajax({    
		url : serviceurl+"patient/patientUserEdit",   
		type : "post",         
		dataType : "json",                                     
		data : JSON.stringify(_params),
		contentType : "application/json",        
		cache : false,                                                       
		beforeSend:function(XMLHttpRequest){},                                         
		success : function(dt){
			console.log(JSON.stringify(dt));
			if(dt.status == "success"){
				location.href="per_info.html";
			}else{
				reminder("修改地址出错");
				return;
			}
		},
		complete:function(XMLHttpRequest,textStatus){},  
		error:function(XMLHttpRequest,textStatus,errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
  },
  change: function(){
	$("#per-feedback-hadnum").text($("#per-address-msg").val().length);
  },
  goChooseCity:function(){
 //  	delCookie("address");
	// setCookie("address", $("#per-address-msg").val(), 30);
	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/personal/per_info_address.html", 30);
	location.href = "per_ads.html";
  },
  render: function() {
    return (
		<div>
			<div className="weui_cells weui_cells_access tmargin0 pointer" onClick={this.goChooseCity}>
				<div className="weui_cell per-borbot" data-reactid=".0.0.0">
					<div className="weui_cell_bd weui_cell_primary">
						<span className="weui_media_title ">地区</span>
					</div>
					<div className="weui_cell_ft per-account" id="cityName">选择地区</div>
				</div>
			</div>
			<div className="weui_cells weui_cells_form tmargin0">
				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary">
						<textarea className="weui_textarea" placeholder="请输入您的详细地址"  id="per-address-msg" rows="3" onInput={this.change} ></textarea>
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
					<a className="weui_btn weui_btn_primary reg-btn pointer" onClick={this.subClick}>确定</a>
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