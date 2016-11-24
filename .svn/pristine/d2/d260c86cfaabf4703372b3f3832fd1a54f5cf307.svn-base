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
var Personal_npayBox = React.createClass({
  getInitialState: function() {
  	var PayOrderid = getCookie("orderID");
	 $.ajax({	  
		url : serviceurl+"order/willPayInfo",   	 //请求的Url
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
				console.log(JSON.stringify(data));
				
				var PerNPayInfoOrder = data.map.order;	
				var PerNPayInfoServices = data.map.oderServices;
				var Preferential = 0;
				var Allprice = 0;
				$.each(PerNPayInfoOrder,function(idx,item){			
 					$("#per-npay-info-hospitalname").text(item.hospitalname);
					$("#per-npay-info-userfullname").text(item.userfullname);
					$("#per-npay-info-doctorname").text(item.doctorname);
					$("#per-npay-info-createtime").text(getMobilTime(item.createtime));
					Preferential = MoneyConversion(Preferential + item.reduce);
					Allprice = MoneyConversion(Allprice + item.totalprice);
				});
				
				$.each(PerNPayInfoServices,function(idx,item){	
	 				$("#per-npay-info-ser").append(
	 					"<div class='weui_cell per_npay_info_paddingcell pointer' >"+
					        "<div class='weui_cell_hd text-left width4'>"+
					            "<img src='images/ic_order_item.png'  class='img-responsive'>"+
					       	"</div>"+
					        "<div class='weui_cell_bd weui_cell_primary fontsize15 lpadding1'>"+
					            "<div>"+
									"<span class='weui_media_title per-name'>" + item.servicename + "</span> "+
									"<span class='weui_media_title per-name pull-right'>￥" + toDecimal(MoneyConversion(item.price)) + "</span> "+
								"</div>"+
								"<div class='weui_media_desc res-doc-con-text fontsize15' id='per-npay-info-spanmarrig10'>"+
									"<span class='weui_media_title marrig10 color-f6'>接诊人：<span class='color-black'>" + item.handlername + "</span></span>"+
									"<span class='weui_media_title color-f6' >就诊人：<span class='color-black'>" + item.patientname + "</span></span>"+
								"</div>"+
					        "</div>"+
					    "</div>"
					   	
						)	
					    
	 					$("#per-npay-info-price").text(Allprice);
	 					$("#per-npay-info-preferential").text(Preferential);
	 					$("#per-npay-info-actually").text(toDecimal(Allprice - Preferential));
					});
			}else if( data.status == "fail"){
					reminder("查询失败");
			}else{
					reminder("查询错误");
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			reminder("用户信息查询失败！");
			return ;	
		}
     });
    return {data: []};
  },
  goback: function(){
  	history.go(-1);
  },
  goPay: function(){
  	location.href="per_npay_pay.html";
  },
  render: function() {
    return (
		<div>

			<div className="weui_panel weui_panel_access">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text per_npay_box bmargin0">
						<div className="weui_media_title text-align per_npay_ifno_hosname fontsize18 color-black" id="per-npay-info-hospitalname">
						</div>
						<div className="weui_media_desc res-det-padleft weui_media_title fontsize15">
							<div className="res-det-padbot text-center ">
								<div className="per-npay-info-span color-f6">用户：
									<span className="per-npay-info-time color-black" id="per-npay-info-userfullname"></span>
								</div>
								<div className="per-npay-info-span color-f6">就诊地点：
									<span className="color-black">互联网诊间</span>
								</div>
							</div>
							<div className="" >
								<div className="per-npay-info-span color-f6">主治医生：
									<span className="per-npay-info-doctorname color-black" id="per-npay-info-doctorname"></span>
								</div>
								<div className="per-npay-info-span color-f6">时间：
									<span id="per-npay-info-createtime" className="per-npay-info-time color-black"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
				
			<div className="weui_cells weui_cells_access martop0" id="per-npay-info-ser">
			   
			</div>

			<div className="weui_panel weui_panel_access res-det-borbot no-border bmargin100">
				<div className="weui_panel_bd">
					<div className="weui_media_box weui_media_text per_npay_info_paddingcell">
						<div className="weui_media_desc res-det-padleft weui_media_title pull-right fontsize15">
							<div className="bpadding05 text-right">
								<span>合计：<span id="per-npay-info-price"></span></span>
							</div>
							<div className="text-right fontsize15">
								<span className="marright10px">优惠：<span id="per-npay-info-preferential"></span></span>
								<span>实付：<span id="per-npay-info-actually"></span></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="per-npay-buttom">
				<a href="javascript:;" className="weui_btn weui_btn_primary per-npay-btn-img" onClick={this.goPay}>去支付</a>
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

var Reservation_hidden = React.createClass({
  render: function() {
    return (
      <div >
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
  <Reservation_hidden />,
  document.getElementById('loading')
);

ReactDOM.render(
  <Personal_npayBox />,
  document.getElementById('content')
);