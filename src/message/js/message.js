
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
	downloadurl
} from '../../js/common.js';

var refleshList = function(){
	$.ajax({	  
		url : serviceurl+"notice/list",   	 //请求的Url
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
			if( data.status == "success"){
				var NoticeList = data.data;	
				// var thisDate = getLocalTime(Date.parse(new Date(new Date()))).split(" ")[0];
					$.each(NoticeList,function(idx,item){

					if( item.type == 1 ){
						$("#mes-sys-tit").text(checknull(item.content));
						$("#mes-sys-date").text(checknull(getLocalTime(item.updatetime).split(" ")[0]));
						if(item.news_count > 99 ){
							$("#mes-sys-new").text(99);
						}else if( item.news_count > 1 ){
							$("#mes-sys-new").text(item.news_count);
						}else if( item.news_count == 0 ){
							$("#mes-sys-new").css("background","#fff");
						}
					}else if( item.type == 2 ){
						$("#mes-res-tit").text(checknull(item.content));
						$("#mes-res-date").text(checknull(getLocalTime(item.updatetime)));
						if(item.news_count > 99 ){
							$("#mes-res-new").text(99);
						}else if( item.news_count > 1 ){
							$("#mes-res-new").text(item.news_count);
						}else if( item.news_count == 0 ){
							$("#mes-res-new").css("background","#fff");
						}
					}else if( item.type == 3 ){
						$("#mes-ya-tit").text(checknull(item.content));
						$("#mes-ya-date").text(checknull(getLocalTime(item.updatetime)));
						if(item.news_count > 99 ){
							$("#mes-ya-new").text(99);
						}else if( item.news_count > 1 ){
							$("#mes-ya-new").text(item.news_count);
						}else if( item.news_count == 0 ){
							$("#mes-ya-new").css("background","#fff");
						}
					}
				 });
				}else if( data.status == "redirect"){
					location.href="../login.html"
				}else{
					reminder("请稍后再试");
				}
				console.log(JSON.stringify(data));
			},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#login-loading-toast").css("display","none");
			reminder(XMLHttpRequest.responseJSON.message);
			return;	
			}
	});
};

var Reservation_messageBox = React.createClass({
	componentDidMount: function(){
		refleshList();
		var ConType = 0;
		$(".mes-news").click(function(){
			if( $(this).attr("id").split("-")[1] == "ya"){
				ConType = 3;	
			}else if( $(this).attr("id").split("-")[1] == "sys"){
				ConType = 1;	
			}if( $(this).attr("id").split("-")[1] == "res"){
				ConType = 2;	
			}
			$("#login-loading-toast").css("display","block");
			$.ajax({	  
				url : serviceurl+"notice/clearByType",   	 //请求的Url
				type : "post",                                           //提交方式
				dataType : "json",                                       //请求的返回类型 这里为json	
				data : JSON.stringify({ "type" : ConType }),
				contentType : "application/json",        			     //内容类型
				cache : false,                                         //是否异步提交
				success : function(data){
					$("#login-loading-toast").css("display","none");
					if( data.status == "success"){
							refleshList();
						}else if( data.status == "fail"){
							reminder("请稍后再试");
						}else{
							reminder("遇到未知错误");
							//return false;	
						}
					},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$("#login-loading-toast").css("display","none");
					reminder(XMLHttpRequest.responseJSON.message);
					return ;	
					}
 		    });
		});
	},
	  mainClick: function(){
	  	//主页
	  	delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../personal/per_index.html";
	  },
	  orderClick: function(){
	  	//我的订单
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../personal/per_mypay.html";
	  },
	  messageClick: function(){
		if(confirm("该功能需要下载app，是否下载？")){
			//消息点击
			delCookie("gobackURL");
			setCookie("gobackURL", ipurl + "/personal.html", 30);
			location.href=downloadurl;
		}else{
			return;
		}
	  },
	  meClick: function(){
	  	//我点击事件
		delCookie("gobackURL");
		setCookie("gobackURL", ipurl + "/personal.html", 30);
		location.href="../personal/personal.html";
	  },
	render: function() {
    return (
	    <div>
	      	<div className="weui_tab_bd">
			    <div className="weui_panel weui_panel_access">
					<div className="weui_panel_bd res-hos-listbg">
						<div className="weui_media_box weui_media_appmsg">
							<div className="weui_media_hd mes-width20">
								<img className="img-rounded img-responsive center-block " src="images/Oval 52 Copy 5@2x.png" width="50px"/> 
							</div> 
							<div className="weui_media_bd res-listcss">
								<div className="">
									<span className="weui_media_title res-doc-name" id="doctor-name" ref="doctor-name">牙艺精选</span> 
									<span className="res-doc-name pull-right text-right" id="mes-ya-date" ref="mes-ya-date"></span>
								</div>
								<div className="">
									<span className="weui_media_desc mes-doc-con-text mes-tit-color" id="mes-ya-tit" ref="mes-ya-tit"></span> 
									<span className="res-doc-name pull-right text-right mes-news" id="mes-ya-new" ref="mes-ya-new"></span>
								</div>
							</div> 
						</div> 
					</div> 
				</div>
				<div className="weui_panel weui_panel_access">
					<div className="weui_panel_bd res-hos-listbg">
						<div className="weui_media_box weui_media_appmsg">
							<div className="weui_media_hd mes-width20">
								<img className="img-rounded img-responsive center-block " src="images/Oval 52 Copy 3@2x.png" width="50px"/> 
							</div> 
							<div className="weui_media_bd res-listcss">
								<div className="">
									<span className="weui_media_title res-doc-name" id="doctor-name" ref="doctor-name">系统消息</span> 
									<span className="res-doc-name pull-right text-right" id="mes-sys-date" ref="mes-sys-date"></span>
								</div>
								<div className="">
									<span className="weui_media_desc mes-doc-con-text mes-tit-color" id="mes-sys-tit" ref="mes-sys-tit"></span> 
									<span className="res-doc-name pull-right text-right mes-news" id="mes-sys-new" ref="mes-sys-new"></span>
								</div> 
							</div> 
						</div> 
					</div> 
				</div>
				<div className="weui_panel weui_panel_access">
					<div className="weui_panel_bd res-hos-listbg">
						<div className="weui_media_box weui_media_appmsg">
							<div className="weui_media_hd mes-width20">
								<img className="img-rounded img-responsive center-block " src="images/Oval 52 Copy 4@2x.png" width="50px"/> 
							</div> 
							<div className="weui_media_bd res-listcss">
								<div className="">
									<span className="weui_media_title res-doc-name" id="doctor-name" ref="doctor-name">预约提醒</span> 
									<span className="res-doc-name pull-right text-right" id="mes-res-date" ref="mes-res-date"></span>
								</div>
								<div className="">
									<span className="weui_media_desc mes-doc-con-text mes-tit-color" id="mes-res-tit" ref="mes-res-tit"></span> 
									<span className="res-doc-name pull-right text-right mes-news" id="mes-res-new" ref="mes-res-new"></span>
								</div> 
							</div> 
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
			<div className="weui_tabbar">
				<div className="weui_tabbar_item per-foot-nav pointer" onClick={this.mainClick}>
					<div className="weui_tabbar_icon">
						<img src="../personal/images/ic_home_main.png" className="height-auto"/>
					</div>
					<p className="weui_tabbar_label">牙艺</p>
				</div>
				<div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.orderClick}>
					<div className="weui_tabbar_icon">
						<img src="../personal/images/ic_home_pay.png" className="height-auto"/>
					</div>
					<p className="weui_tabbar_label">支付</p>
				</div>
				<div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.messageClick}>
					<div className="weui_tabbar_icon">
						<img src="../personal/images/ic_home_notice_checked.png" className="height-auto"/>
					</div>
					<p className="weui_tabbar_label">消息</p>
				</div>
				<div  className="weui_tabbar_item per-foot-nav pointer" onClick={this.meClick}>
					<div className="weui_tabbar_icon">
						<img src="../personal/images/ic_home_me.png" className="height-auto"/>
					</div>
					<p className="weui_tabbar_label">我</p>
				</div>
			</div>
	    </div> 
    );
  }
});

ReactDOM.render(
  <Reservation_messageBox />,
  document.getElementById('content')
);