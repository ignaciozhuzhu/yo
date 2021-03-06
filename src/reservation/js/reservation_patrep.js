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
	getURLparam,
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
				location.href = "../login.html?backurl=reservation/reservation_det.html?doctorid="+getURLparam("doctorid");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
				reminder(XMLHttpRequest.responseJSON.message);
				return;
		}
	});
}); 
var Reservation_mainBox = React.createClass({
  subClick: function(){
  	var Doctorid = getURLparam("doctorid");
	var Remark = $("#res-patrep-remark").val().trim();
	if(Vld.isNull(Remark+"")){
		reminder("请填写留言!");
		return;
	}
	if(Vld.isLength(Remark+"", {min:1, max:200}) === false){
		reminder("留言不得超过200字!");
		return;
	}
	$.ajax({	  
		url : serviceurl+"patient/patientbd",   	 //请求的Url
		type : "post",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : JSON.stringify({
			"doctorid" : Doctorid,
			"remark" : Remark
		}),
		contentType : "application/json",        			     //内容类型
		cache : false,
		beforeSend:function(XMLHttpRequest){
			$("#loading-toast").css("display","block");
		},   
		success : function(data){
			$("#loading-toast").css("display","none");
			if( data.status == "success"){
				$("#success-toast-text").css("display","block");
				reminder("操作成功!");
				setTimeout(function(){
					location.href = "reservation_det.html";
				},2000);
			}else if( data.status == "fail"){
				$("#fail-toast").css("display","block");
				reminder("操作失败!");
				setTimeout(function(){$("#fail-toast").css("display","none");}, 2000);
				return;
			}else{
				$("#fail-toast").css("display","block");
				reminder("操作失败!");
				setTimeout(function(){$("#fail-toast").css("display","none");}, 2000);
				return;
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#loading-toast").css("display","none");
			$("#fail-toast").css("display","block");
			$("#fail-toast-text").text(XMLHttpRequest.responseJSON.message);
			setTimeout(function(){$("#fail-toast").css("display","none");}, 2000);
			return;	
		}
	});
  },
  goback: function(e){
     history.go(-1);
  },
  change: function(){
		$("#res-message-hadnum").text($("#res-patrep-remark").val().length);
  },
  render: function() {
    return (
				<div className="patrep_box_poistion">
					<div className="weui_cells weui_cells_form res_pat_box">
						<div className="weui_cell patrep_form_cell">
							<div className="weui_cell_bd weui_cell_primary">
								<textarea className="weui_textarea res_pat_textarea" placeholder="给医生留言" rows="3" id="res-patrep-remark" ref="res-patrep-remark" name="res-datedet-msg-value" onInput={this.change} ></textarea>
								<div className="weui_textarea_counter res_pat_textarea_counter">
									<span id="res-message-hadnum">0</span>
									<span>/200</span>
								</div>
							</div>
						</div>
					</div>
					
					<div className="res_pat_btn_box">
						<div className="weui_btn weui_btn_primary res_pat_btn_primary" ref="res-patrep-submit" onClick={this.subClick}>提交</div>
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


ReactDOM.render(
  <Reservation_mainBox />,
  document.getElementById('content')
);