'use strict';
import React from 'react';
import {
	serviceurl,
	reminder,
	getURLparam
} from '../common.js';
var thisattentive = "";
var Reservation_dialog = React.createClass({
	cancelClick: function() {
		$("#dialog-box").hide();
	},
	sureClick: function() {
		location.href = "../login.html?backurl=reservation/" + this.props.href + ".html?doctorid=" + this.props.getDoctorID + "&hospitalID=" + this.props.getHospitalID;
	},
	render: function() {
		return (
			<div>
				<div className="weui_dialog_confirm displaynone" id="dialog-box">
					<div className="weui_mask"></div>
					<div className="weui_dialog">
							<div className="weui_dialog_hd text-align"><strong className="weui_dialog_title">温馨提示</strong></div>
							<div className="weui_dialog_bd text-align">您还未登录，请先登录</div>
							<div className="weui_dialog_ft text-align">
									<a href="#" className="weui_btn_dialog default" onClick={this.cancelClick}>取消</a>
									<a href="#" className="weui_btn_dialog primary" onClick={this.sureClick}>确定</a>
							</div>
					</div>
				</div>
			</div>
		);
	}
});
var Reservation_docList = React.createClass({
	goback: function(e) {
		history.go(-1);
	},
	componentDidMount:function(){
		thisattentive = this.props.attentive;
		if(thisattentive == "关注"){
			$("#res_docdet_gz").attr("src", "images/Shape@2x.png");
			$("#res-docdet-att").text("关注");
		}else{
			$("#res_docdet_gz").attr("src", "images/Shape.png");
			$("#res-docdet-att").text("已关注");
		}
	},
	attentClick: function(e) {
		//判断登陆与否
		$.ajax({
			url: serviceurl + "site/getUserInfo",
			type: "get",
			dataType: "json",
			contentType: "application/json",
			cache: false,
			async: false,
			beforeSend: function(XMLHttpRequest) {},
			success: function(data) {
				if (data.status == "redirect") {
					//表示未登录
					$("#dialog-box").show();
					return;
				} else {
					var doctorid = getURLparam("doctorid");
					var ajaxurl = serviceurl + "attention/";
					var str = "关注";
					if (thisattentive == "关注") {
						//添加关注
						ajaxurl += "add";
						str = "已关注";
					} else {
						//取消关注
						ajaxurl += "cancel";
						str = "关注";
					}
					$.ajax({
						url: ajaxurl, //请求的Url
						type: "post", //提交方式
						dataType: "json", //请求的返回类型 这里为json	
						data: JSON.stringify({
							"doctorid": doctorid
						}),
						contentType: "application/json", //内容类型
						cache: false, //是否异步提交
						// beforeSend: function(XMLHttpRequest) {
						// 	$("#loading-toast").css("display", "block");
						// },
						success: function(dt) {
							$("#loading-toast").css("display", "none");
							if (dt.status == "success") {
								// $("#success-toast-text").css("display", "block");
								// $("#res-docdet-att").text(str);
								// $("#success-toast-text").text("操作成功!");
								if (str == "关注") {
									$("#res_docdet_gz").attr("src", "images/Shape@2x.png");
									$("#res-docdet-att").text("关注");
									reminder("取消关注");
								} else if (str == "已关注") {
									$("#res_docdet_gz").attr("src", "images/Shape.png");
									$("#res-docdet-att").text("已关注");
									reminder("关注成功！");
								}
								thisattentive = str;
								// setTimeout(function() {
								// 	$("#success-toast").css("display", "none");
								// }, 2000);
							} else if (dt.status == "fail") {
								reminder("操作失败!");
								return;
							} else if (dt.status == "redirect") {
								//表示未登录
								$("#dialog-box").show();
								return;
							}else {
								reminder("操作失败!");
								return;
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							reminder("操作失败!");
							return;
						}
					});
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//toast.show(XMLHttpRequest.responseJSON.message);
				return;
			}
		});
	},
	render: function() {
		var avatar = serviceurl + this.props.data.avatar;
		return (
	    	<div className="res_top_box_bg">
				<div className="weui_panel weui_panel_access res_doctor_det_box clance_border">
        			<div className="weui_panel_hd res_doctor_avatar clance_border">
        				<img className="img-rounded res_doctor_avatar_img" src={avatar}/>
        			</div>
		            <div className="weui_panel_bd res_doctor_det">
		                <div className="weui_media_box weui_media_box_text res_doctor_name clance_border">{this.props.data.fullname}</div>
		                <div className="weui_media_box weui_media_box_text res_doctor_title clance_border">{this.props.data.title}</div>
		                <div className="weui_media_box weui_media_box_text res_doctor_hpname clance_border">{this.props.hospitalName}</div>
		                <div className="weui_media_box weui_media_box_text res_doctor_rc clance_border">
							<span>预约量：{this.props.data.bookingCount}</span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span>咨询量：{this.props.data.queryCount}</span>
		                </div>
		            </div>
		        	<div className="res_doctor_attention" onClick={this.attentClick}>
		        		<img src="images/Shape@3x.png" id="res_docdet_gz" className="res_doctor_attention_img"/>
		        		<div className="text-align" id="res-docdet-att">{this.props.attentive}</div>
		       	 	</div>
		    	</div> 
		    </div>
		);
	}
});



export {
	Reservation_dialog,
	Reservation_docList
};