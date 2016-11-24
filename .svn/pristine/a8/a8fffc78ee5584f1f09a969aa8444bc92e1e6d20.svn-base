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
				location.href = "../login.html?backurl=personal/per_booking.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
}); 
var CurrentPage = "1";
var book = "";
var patient = "";
var worktime = "";
var Personal_mainBox = React.createClass({
  getInitialState: function() {
	$.ajax({	  
		url : serviceurl+"booking/myBooking",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { "currentPage" : CurrentPage},
		contentType : "application/json",        			     //内容类型
		cache : false,  
		beforeSend:function(XMLHttpRequest){
			$("#login-loading-toast").css("display","block");
		},                                         //是否异步提交
		success : function(data){
			console.log("Personal_mainBox: " + JSON.stringify(data));
			$("#login-loading-toast").css("display","none");
			if( data.status == "success"){
				var PerBdDoctorList = data.data;
				if(PerBdDoctorList.length>0){
					$.each(PerBdDoctorList,function(idx,item){	
						$("#per-booking-list").append(
							"<div class='per_booking_box_tit'>"+
								"<div class='text-align bookint_tit_color'>" + getMobilTime(item.createtime) + "</div>"+
								"<div class='weui_cells noborder weui_cells_access per-booking-box fontsize16 pointer' id='bookingList-"+idx+"'>"+
								    "<div class='per-booking-patient'>"+
								    	"<span class='color-f6'>就&nbsp;&nbsp;诊&nbsp;&nbsp;人：</span>"+
								    	"<span>" + checknull(item.patientname) + "</span>"+
									"</div>"+
									"<div class='per-booking-patient'>"+
								    	"<span class='color-f6'>就诊医院：</span>"+
								    	"<span>" +  checknull(item.hospitalname) + "</span>"+
									"</div>"+
									"<div class='per-booking-patient'>"+
								    	"<span class='color-f6'>就诊医生：</span>"+
								    	"<span>" + checknull(item.doctorname) + "</span>"+
									"</div>"+
									"<div class='per-booking-patient'>"+
								    	"<span class='color-f6'>门诊时间：</span>"+
								    	"<span>" + checknull(item.bookingtime) + "</span>"+
									"</div>"+
									"<div class='per-booking-patient'>"+
								    	"<span class='color-f6'>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</span>"+
								    	"<span>" + checknull(item.msg) + "</span>"+
									"</div>"+
									"<div class='per-booking-patient fontsize14'>"+
										"<span name='"+ idx +"' class='pull-right per-state-5-" + idx + " per-booking-5 text-align'>已完成</span>"+
										"<span name='"+ idx +"' class='pull-right per-state-4-" + idx + " per-booking-4 text-align'>去评价</span>"+
										"<span name='"+ idx +"' class='pull-right per-state-3-" + idx + " per-booking-3 text-align'>已过期</span>"+
										"<span name='"+ idx +"' class='pull-right per-state-2-" + idx + " per-booking-2 text-align'>已就诊</span>"+
								    	"<span name='"+ idx +"' class='pull-right per-state-1-" + idx + " per-booking-1 text-align'>已退号</span>"+
								    	"<span name='"+ idx +"' class='pull-right per-state-0-" + idx + " per-booking-0 text-align'>申请退号</span>"+
									"</div>"+
								"</div>"+
							"</div>"
						);
						$("#bookingList-"+idx).click(function(e){
							delCookie("bookingID");
							setCookie("bookingID", item.id, 30);
							delCookie("gobackURL");
							setCookie("gobackURL", ipurl + "/per_booking.html", 30);
							if(e.target.innerText=="去评价"){
								location.href="per_rpay_comment.html";
							}else if(e.target.innerText=="申请退号"){
								
							}else{
								location.href="per_booking_det.html";
							}
						});
						if( item.d == "1"){
							//已退号
							$(".per-state-1-"+idx).css("display","block");
							$(".per-state-2-"+idx).css("display","none");
							$(".per-state-3-"+idx).css("display","none");
							$(".per-state-0-"+idx).css("display","none");
							$(".per-state-4-"+idx).css("display","none");
							$(".per-state-5-"+idx).css("display","none");
						}else{
							if( item.isorder == "1"){
								//已就诊
								$(".per-state-2-"+idx).css("display","block");
								$(".per-state-1-"+idx).css("display","none");
								$(".per-state-3-"+idx).css("display","none");
								$(".per-state-0-"+idx).css("display","none");
								$(".per-state-4-"+idx).css("display","none");
								$(".per-state-5-"+idx).css("display","none");
								//$(".per-state-2-"+idx).html("已就诊");
							}else if( item.isorder == "2"){
								//待评价
								$(".per-state-4-"+idx).css("display","block");
								$(".per-state-1-"+idx).css("display","none");
								$(".per-state-2-"+idx).css("display","none");
								$(".per-state-3-"+idx).css("display","none");
								$(".per-state-0-"+idx).css("display","none");
								$(".per-state-5-"+idx).css("display","none");
								// $(".per-state-4-"+idx).click(function(){
								// 	reminder("去评价");
								// });
							}else if( item.isorder == "3"){
								//已评价
								$(".per-state-5-"+idx).css("display","block");
								$(".per-state-1-"+idx).css("display","none");
								$(".per-state-2-"+idx).css("display","none");
								$(".per-state-3-"+idx).css("display","none");
								$(".per-state-4-"+idx).css("display","none");
								$(".per-state-0-"+idx).css("display","none");
								$(".per-state-2-"+idx).html("已评价");
							}else{
								if( item.timestatus == "1"){
									//已过期
									$(".per-state-3-"+idx).css("display","block");
									$(".per-state-0-"+idx).css("display","none");
									$(".per-state-1-"+idx).css("display","none");
									$(".per-state-2-"+idx).css("display","none");
									$(".per-state-4-"+idx).css("display","none");
									$(".per-state-5-"+idx).css("display","none");
								}else if( item.timestatus == "0"){
									//未就诊(退号按钮) 
									$(".per-state-0-"+idx).css("display","block");
									$(".per-state-1-"+idx).css("display","none");
									$(".per-state-2-"+idx).css("display","none");
									$(".per-state-3-"+idx).css("display","none");
									$(".per-state-4-"+idx).css("display","none");
									$(".per-state-5-"+idx).css("display","none");
									$(".per-state-0-"+idx).on("click",function(){
										if(confirm("是否申请退号？")){
											var _params={
											  "id" : item.id,
											  "patientid" : item.patientid,
											  "worktimeid" : item.worktimeid
											};
											$.ajax({    
												url : serviceurl+"booking/cancel ",   
												type : "post",         
												dataType : "json",                                     
												data : JSON.stringify(_params),
												contentType : "application/json",        
												cache : false,                                                       
												beforeSend:function(XMLHttpRequest){},                                         
												success : function(dt){
													console.log(JSON.stringify(dt));
													if(dt.status == "success"){
														location.href = "per_booking.html";
														return;
													}else{
														reminder("退号失败");
														return;
													}
												},
												complete:function(XMLHttpRequest,textStatus){},  
												error:function(XMLHttpRequest,textStatus,errorThrown){}
											});
										}else{
											return;
										}
									});
								}
							}
						}
					});
					var bookingId = "";
					$(".per-booking-apl").click(function(){
						bookingId = $(this).attr("name");
						book = $(this).attr("book");
						patient = $(this).attr("patient");
						worktime = $(this).attr("worktime");
						$(".per-booking-dialog").css("display","block");
					});
					$(".default").click(function(){
						$(".per-booking-dialog").css("display","none");
					});
					$(".primary").click(function(){
						var param = {
					        "id": book,
					        "patientid": patient,
					        "Worktimeid": worktime
					      };
					    $("#login-loading-toast").css("display","block");
						$.ajax({
					      url: serviceurl+"booking/cancel",
					      dataType: 'json',
					      cache: false,
					      data : JSON.stringify(param),
					      contentType : "application/json",
					      type : "POST", 
					      async: false,
					      success: function(dt) {
					      	$("#login-loading-toast").css("display","none");
					      	if( dt.status == "success"){
								$(".per-state-2-"+bookingId).css("display","block");
								$(".per-state-1-"+bookingId).css("display","none");
								$(".per-state-3-"+bookingId).css("display","none");
								$(".per-booking-dialog").css("display","none");
								reminderSuccess("成功取消预约","");
							}else{
								reminder("请稍后再试");
								return;
							}
					      }.bind(this),
					      error: function(xhr, status, err) {
					        $("#login-loading-toast").css("display","none");
							reminder(xhr.responseJSON.message);
					      }.bind(this)
						});
					});
				}else{
					// $("#per-booking-list").append("<div class='text-align res-docoter-color'>没有任何数据</div>");
					$("#per-booking-list").append(
						 "<div class=\"container-fluid\">"
						+"  <div class=\"per_mybooking_zero\">                                          "
						+"	<img src=\"images/empty_yy.png\" class=\"per_booking_img\"/> 					"
						+"  </div>                                                             			"
						+"  <div class=\"per_mydoc_text\">											"
            			+"		<p class=\"text-align yayi-color\">暂无预约信息</p>					"
						+"	</div>                                                               		"
						+"</div>																		"
					);
				}
			}else if( data.status == "redirect"){
				location.href="../login.html"
			}else{
				reminder("请稍后再试");
				return ;
			}
		},	
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			return false;	
		}
	});
  	return {data: []};
  },
  goback: function(){
  	history.go(-1);
  },
  render: function() {
    return (
		<div>
			<div id="per-booking-list" ref="per-booking-list"></div>

			<div className="weui_dialog_confirm per-booking-dialog displaynone">
			    <div className="weui_mask"></div>
			    <div className="weui_dialog">
			        <div className="weui_dialog_hd text-align">
			          <strong className="weui_dialog_title">提示</strong>
			        </div>
			        <div className="weui_dialog_bd text-align">每个用户一个个月内只允许申请退号5次，确认退号么？</div>
			        <div className="weui_dialog_ft">
			            <a className="weui_btn_dialog default text-align">取消</a>
			            <a className="weui_btn_dialog primary text-align">确定</a>
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