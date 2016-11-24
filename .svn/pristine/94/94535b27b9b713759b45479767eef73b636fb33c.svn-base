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
				location.href = "../login.html?backurl=personal/per_mypay.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			reminder(XMLHttpRequest.responseJSON.message);
			return;
		}
	});
}); 
var Personal_rpayBox = React.createClass({
  getInitialState: function() {
  	var PayOrderid = getCookie("orderID");
	 $.ajax({	  
		url : serviceurl+"order/hadPayInfo",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { "orderid" : PayOrderid },
		contentType : "application/json",        			     //内容类型
		cache : false,  
		beforeSend:function(XMLHttpRequest){
					console.log("正在查询用户详细信息");
				},                                         //是否异步提交
		success : function(data){
			if( data.status == "success"){
				console.log("查询成功" + JSON.stringify(data));
				
				var PerNPayInfoOrder = data.map.order;	
				var PerNPayInfoServices = data.map.oderServices;
				var PerNPayInfoRefund = data.map.refund;
				var Preferential = 0;
				var Allprice = 0;
				var Refundstatus = "";

				$.each(PerNPayInfoOrder,function(idx,item){	
 					$("#per-rpay-info-hospitalname").text(item.hospitalname);
					$("#per-rpay-info-userfullname").text(item.userfullname);
					$("#per-rpay-info-doctorname").text(item.doctorname);
					$("#per-rpay-info-createtime").text(getMobilTime(item.createtime));
					Preferential = MoneyConversion(Preferential + item.reduce);
					Allprice = MoneyConversion(Allprice + item.totalprice);
				});
				
				$.each(PerNPayInfoServices,function(idx,item){	
	 				$("#per-rpay-info-ser").append(
	 					"<div class='weui_cell per_npay_info_paddingcell pointer' >"+
					        "<div class='weui_cell_hd text-left width4'>"+
					            "<img src='images/ic_order_item.png'  class='img-responsive'  >"+
					       	"</div>"+
					        "<div class='weui_cell_bd weui_cell_primary fontsize15 lpadding1'>"+
					            "<div>"+
									"<span class='weui_media_title per-name'>" + item.servicename + "</span> "+
									"<span class='weui_media_title per-name pull-right'>￥" + MoneyConversion(item.price) + "</span> "+
								"</div>"+
								"<div class='weui_media_desc res-doc-con-text fontsize15' id='per-rpay-info-spanmarrig10'>"+
									"<span class='weui_media_title marrig10 color-f6'>接诊人：<span class='color-black'>" + item.patientname + "</span></span>"+
									"<span class='weui_media_title color-f6' >就诊人：<span class='color-black'>" + item.handlername + "</span></span>"+
								"</div>"+
					        "</div>"+
					    "</div>"
					   
						)	
						
	 					$("#per-rpay-info-price").text(Allprice);
	 					$("#per-rpay-info-preferential").text(Preferential);
	 					$("#per-rpay-info-actually").text(toDecimal(Allprice - Preferential));

					});

				if( PerNPayInfoRefund.length > 0 ){
					$.each(PerNPayInfoRefund,function(idx,item){	
						if( item.state == 0 ){
							Refundstatus =  "退款中";
						}else if( item.state == 1 ){
							Refundstatus =  "退款成功";
						}
	 					$("#per-rpay-info-refund").append(
	 						"<div class='weui_cell per_npay_info_paddingcell pointer'>"+
	 							"<div class='weui_cell_bd weui_cell_primary fontsize15'>"+
	 								"<div>"+
	 									"<span class='weui_media_title'>" + getMobilTime(item.createtime) + "</span>"+
	 								"</div>"+
	 								"<div class='weui_media_desc res-doc-con-text fontsize15'>"+
	 									"<span class='weui_media_title marrig10 color-black'>退款<span class='color-f6'>" + MoneyConversion(item.money) + "</span>元</span>"+
	 								"</div>"+
	 							"</div>"+
	 							"<div class='weui_cell_hd text-right width25 lpadding1 fontsize15'>" + Refundstatus + "</div>"+
	 						"</div>"
	 					);				
					});
				}else{
					$("#per_npay_info_refund_box").css("display","none");
				}
				


			}else if( data.status == "fail"){
					reminder("查询失败");
			}else{
					reminder("查询错误");
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 404) {
					location.href = "../404.html";
				}
			reminder("用户信息查询失败！");
			return ;	
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

			<div className="weui_panel weui_panel_access ">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text padbot0">
						<div className="weui_media_title res-doc-name text-align" id="per-rpay-info-hospitalname">
						</div>
						<div className="weui_media_desc res-det-padleft weui_media_title">
							<div className="res-det-padbot text-center">
								<span className="per-npay-info-span">用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：
									<span id="per-rpay-info-userfullname"></span>
								</span>
								<span className="text-right">诊间：
									<span>互联网诊间</span>
								</span>
							</div>
							<div className=" res-det-padbot" >
								<span className="per-npay-info-span">主治医生：
									<span id="per-rpay-info-doctorname"></span>
								</span>
								<span className="text-right	">时间：
									<span id="per-rpay-info-createtime" className="per-npay-info-time"></span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
				
			<div className="weui_cells weui_cells_access martop0" id="per-rpay-info-ser">
			   
			</div>

			<div className="weui_panel weui_panel_access res-det-borbot">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text">
						<div className="weui_media_desc res-det-padleft weui_media_title bmargin0">
							<div className=" res-det-padbot text-right">
								<span>合计：<span id="per-rpay-info-price"></span></span>
							</div>
							<div className="text-right">
								<span className="marright10px">优惠：<span id="per-rpay-info-preferential"></span></span>
								<span>实付：<span id="per-rpay-info-actually"></span></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="weui_panel weui_panel_access" id="per_npay_info_refund_box">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text">
						<div className="weui_media_desc weui_media_title bmargin0">
							<div className="text-center">退款详情</div>
						</div>
					</div>
					<div className="weui_cells weui_cells_access martop0" id="per-rpay-info-refund"></div>
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
  <Personal_rpayBox />,
  document.getElementById('content')
);