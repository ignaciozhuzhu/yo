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
import Vld from 'validator';
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
				location.href = "../login.html?backurl=personal/per_info.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
}); 
var Personal_infoBox = React.createClass({
  getInitialState: function() {
  	$("#per-info-avatar").change(function(){  
  		if(Vld.isNull($("#per-info-avatar").val())){
  			reminder("请选择要上传的文件");
  			return;
  		}else{
            $("#per_form").ajaxSubmit({
                type: "post",
                url: thisurl+"upload",
                dataType: "json",
                data: { "files": $("#per-info-avatar").val() },
                success: function (data) {
                	if(data.status == "success"){
						delCookie("gobackURL");
						setCookie("gobackURL", ipurl + "/personal.html", 30);
						location.href="per_info.html";
                	}else{
                		reminder(data.message);
                		return;
                	}
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                	if(XMLHttpRequest.status==413){
                		reminder("图片尺寸过大!");
						return;	
                	}else{
                		reminder(XMLHttpRequest.responseJSON.message);
						return;	
                	}
                }
            });
        }
	});   
  	$.ajax({	  
		url : serviceurl+"site/getUserInfo",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { },
		contentType : "application/json",        			     //内容类型
		cache : false,  
		beforeSend:function(XMLHttpRequest){
			$("#login-loading-toast").css("display","block");
		},                                        
		success : function(data){
			console.log("getInitialState: " + JSON.stringify(data));
			$("#login-loading-toast").css("display","none");
			if( data.status == "success"){
				$(".per-fullname").text(checknull(data.data.fullname));
				$(".avatar").attr("src",  serviceurl+data.data.avatar);
				$(".per-account").text(checknull(data.data.mobile));
				$(".per-cardnum").text(checknull(data.data.idcard));
				var sex = data.data.gender;
				if( sex == 0 ){
					$(".per-sex").text("未知");
				}else if( sex == 1){
					$(".per-sex").text("男");
				}else if( sex == -1){
					$(".per-sex").text("女");
				}

				if( data.data.areacode == null){
					$(".per-ads").text("");
				}else{
					var cityID = data.data.areacode;
					var address = data.data.address;
					delCookie("cityID");
					setCookie("cityID", cityID, 30);
					delCookie("proName");
					setCookie("proName", data.data.address.split(" ")[0], 30);
					delCookie("address");
					setCookie("address", data.data.address, 30);
					delCookie("cityName");
					setCookie("cityName",data.data.address.split(" ")[1], 30)
					$(".per-ads").text(address);
				}	
			}else if( data.status == "redirect"){
				delCookie("gobackURL");
				setCookie("gobackURL", ipurl + "/per_info.html", 30);
				location.href = "../login.html"
				return;
			}else{
				reminder("请稍后再试");
				return;
			}
		},	
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			return;	
		}
	});
  	return {data: []};
  },
  nameClick: function(){
  	//设置需要的参数
  	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/per_info.html", 30);
	location.href="per_fullname.html";
  },
  sexClick: function(){
  	//设置需要的参数
  	$(".mask").css("display","block");
    $(".actionsheet").addClass("weui_actionsheet_toggle");
  },
  editClick: function(e){
  	var sexEdit = 0;
  	var sexName = e.target.textContent;
  	if (sexName == "男" ){
  		sexEdit = 1;
  	}else if( sexName == "女" ){
  		sexEdit = -1;
  	}
  	$("#login-loading-toast").css("display","block");
	$.ajax({	  
		url : serviceurl+"patient/patientUserEdit",   	 //请求的Url
		type : "post",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : JSON.stringify({"gender" : sexEdit }),
		contentType : "application/json",        			     //内容类型
		cache : false,                                       //是否异步提交
		success : function(data){
			$("#login-loading-toast").css("display","none");
			if( data.status == "success"){
				reminderSuccess("修改成功","per_info.html");
				$(".mask").css("display","none");
  				$(".actionsheet").removeClass("weui_actionsheet_toggle");
  				$("#per_sex").text(sexName);
			}else{
				reminder("出错了，稍后再试!");
				$(".mask").css("display","none");
  				$(".actionsheet").removeClass("weui_actionsheet_toggle");
				return;
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			$(".mask").css("display","none");
  			$(".actionsheet").removeClass("weui_actionsheet_toggle");
			return ;	
		}
    });
  },
  cancelClick: function(){
  	$(".mask").css("display","none");
  	$(".actionsheet").removeClass("weui_actionsheet_toggle");
  },
  cardnumClick: function(){
  	//设置需要的参数
  	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/per_info.html", 30);
	location.href="per_cardnum.html";
  },
  addressClick: function(){
  	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/per_info.html", 30);
	location.href="per_info_address.html";
  },
  render: function() {
    return (
		<div>			
			<div className="weui_cells weui_cells_access tmargin0">
				<div className="weui_cell per-borbot per_info_cell per_info_det" id="per-fullname" ref="per-fullname" onClick={this.nameClick}>
					<div className="weui_cell_bd weui_cell_primary">
						<span className="weui_media_title ">昵称</span>
					</div>
					<div className="weui_cell_ft per-fullname"></div>
				</div>

				<div className="weui_cell per-borbot per_info_cell per_info_det" id="per-sex" ref="per-sex" onClick={this.sexClick}>
					<div className="weui_cell_bd weui_cell_primary">
						<span className="weui_media_title ">性别</span>
					</div>
					<div className="weui_cell_ft per-sex" id="per_sex"></div>
				</div>
			</div>
			
			<div className="weui_cells weui_cells_access per_info_account">
				<div className="weui_cell per-borbot per_info_cell per_info_det">
					<div className="weui_cell_bd weui_cell_primary">
						<span className="weui_media_title">账号</span>
					</div>
					<div className="weui_cell_ft per-account"></div>
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

			<div id="actionSheet_wrap">
		        <div className="weui_mask_transition mask" id="mask" onClick={this.cancelClick}></div>
		        <div className="weui_actionsheet actionsheet" id="weui_actionsheet">
		            <div className="weui_actionsheet_menu">
		                <div className="weui_actionsheet_cell per_sex" onClick={this.editClick}>男</div>
		                <div className="weui_actionsheet_cell per_sex" onClick={this.editClick}>女</div>
		            </div>
		            <div className="weui_actionsheet_action">
		                <div className="weui_actionsheet_cell" id="actionsheet_cancel" onClick={this.cancelClick}>取消</div>
		            </div>
		        </div>
		    </div>
		</div>
   	);
  }
});
ReactDOM.render(
  <Personal_infoBox />,
  document.getElementById('content')
);