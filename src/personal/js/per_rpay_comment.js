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
				location.href = "../login.html?backurl=personal/per_booking.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
}); 
var bookingID = "";
var Personal_mainBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  subClick:function(){
  	bookingID = getCookie("bookingID");
  	var Words = $("#per-rpay-comment-msg").val();
		$.ajax({	  
			url : serviceurl+"order/review",   	 //请求的Url
			type : "post",                                           //提交方式
			dataType : "json",                                       //请求的返回类型 这里为json	
			data : JSON.stringify({
				"words" : Words,
				"bookingid" : bookingID
				}),
			contentType : "application/json",        			     //内容类型
			cache : false,                                       //是否异步提交
			success : function(data){
				if( data.status == "success"){
					$("#per-fullname-toast").css("display","block");
					setTimeout(PerToast, 2000);
				}else if( data.status == "fail"){
					reminder("评论失败");
					return;
				}else{
					reminder("评论错误");
					return;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				reminder("评论查询失败！");
				return ;	
			}
    });
  },
  goback: function(){
  	history.go(-1);
  },
  change: function(){
		$("#per-rpay-comment-hadnum").text($("#per-rpay-comment-msg").val().length);
  },
  render: function() {
    return (
		<div>
			<div className="container-fluid mes-bg-img">
				<div className="padding-bottom reg-padding ">
					<div className="pull-left"><img src="images/back.png" className="img-responsive" width="60%" onClick={this.goback}/></div>
					<div className="tit-point res-datedet-fontsize18 pull-right text-right" onClick={this.subClick}>提交</div>
					<div className=" tit-tit center-block">评论</div>
				</div>
			</div>

			<div className="weui_cells weui_cells_form">
				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary">
						<textarea className="weui_textarea" placeholder="欢迎您的评价"  id="per-rpay-comment-msg" rows="3" onInput={this.change} ></textarea>
						<div className="weui_textarea_counter">
							<span id="per-rpay-comment-hadnum">0</span>
							<span>/200</span>
						</div>
					</div>
				</div>
			</div>

			<div id="per-fullname-toast" ref="per-rpay-comment-toast" className="displaynone">
				<div className="weui_mask_transparent"></div>
				<div className="weui_toast">
					<i className="weui_icon_toast"></i>
					<p className="weui_toast_content text-align">提交成功</p>
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

var PerToast = function(){
	$("#per-rpay-comment-toast").css("display","none");
	location.href="per_booking_det.html";
};
ReactDOM.render(
  <Personal_mainBox />,
  document.getElementById('content')
);