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
var Personal_mainBox = React.createClass({
  getInitialState: function() {
  	$("#login-loading-toast").css("display","block");
  	$.ajax({	  
		url : serviceurl+"site/getUserInfo",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { },
		contentType : "application/json",        			     //内容类型
		cache : false,                                         //是否异步提交
		success : function(data){
			console.log(JSON.stringify(data));
			$("#login-loading-toast").css("display","none");
			if( data.status == "success"){
				if(Vld.isNull(data.data.idcard+"")){
					$("#per-fullname").val("");
				}else{
					$("#per-fullname").val(data.data.idcard);
				}
			}else if( data.status == "redirect"){
				location.href="../login.html"
				return;
			}else{
				reminder("出错了，稍后再试!")
				return;
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
  goback: function(e){
    history.go(-1);
  },
  subClick: function(){
  	var Idcard = $("#per-fullname").val().trim();
  	if(Vld.isNull(Idcard+"")){
  		reminder("请输入身份证号");
  		return;
  	}
  	if(Vld.isAlphanumeric(Idcard+"",'en-US') === false){
  		reminder("请输入正确的身份证号");
  		return;
  	}
  	if(Vld.isLength(Idcard+"", {min:15, max:15}) === false && Vld.isLength(Idcard+"", {min:18, max:18}) === false){
  		reminder("请输入正确的身份证号");
  		return;
  	}
        
    $("#login-loading-toast").css("display","block");
    $.ajax({	  
        url : serviceurl+"patient/patientUserEdit",   	 //请求的Url
        type : "post",                                           //提交方式
        dataType : "json",                                       //请求的返回类型 这里为json	
        data : JSON.stringify({"idcard" : Idcard }),
        contentType : "application/json",        			     //内容类型
        cache : false,                                       //是否异步提交
        success : function(data){
            $("#login-loading-toast").css("display","none");
            if( data.status == "success"){
                reminderSuccess("修改成功","per_info.html");
            }else{
                reminder("出错了，稍后再试!");
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#login-loading-toast").css("display","none");
            reminder(XMLHttpRequest.responseJSON.message);
            return ;	
        }
    });
  },
  render: function() {
    return (
		<div>
			<div className="weui_cells weui_cells_form">
				<div className="weui_cell">
					<div className="weui_cell_hd">
						<label className="weui_label">身份证</label>
					</div>
					<div className="weui_cell_bd weui_cell_primary">
						<input name="per-fullname" id="per-fullname" ref="per-fullname" className="text-right weui_input" type="text" />
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div className="reg-padding"></div>
				<div className="reg-padding">
					<a className="weui_btn weui_btn_primary reg-btn pointer" id="per-fullname-submit" ref="per-fullname-submit" onClick={this.subClick}>提交</a>
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
			        <p className="weui_toast_content text-align" id="loading-toast-text"></p>
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