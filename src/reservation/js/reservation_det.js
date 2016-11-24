'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
	serviceurl,
	ipurl,
	setCookie,
	getCookie,
	delCookie,
	reminder,
	checknull,
	getMobilTime,
	getURLparam,
	getHtmlFontSize
} from '../../js/common.js';

import {
	SearchHidden
} from '../../js/components/searchList';

import {
	Reservation_dialog,
	Reservation_docList
} from '../../js/components/reservationComp';
import Vld from 'validator';

getHtmlFontSize();
var docData = [];
var titData = [];
var placeData = [];
var commentData = [];
var hospitalAddress = "";
var hospitalName = "";
var idx = 0;
var beief_clickNum = 0;
var cssTemp = "";
var attentive = "关注";
var toggleNum = 1; //展开计数
var hasFriend = "N";
var hasReport = -1;
var isRealLoad = false;//代表未登录
var Reservation_topBox = React.createClass({
	getInitialState: function() {
		var doctorid = getURLparam("doctorid");
		$.ajax({
			url: serviceurl + "doctor/detail", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			async: false,
			data: {
				"doctorid": doctorid
			},
			contentType: "application/json", //内容类型
			cache: false, //是否异步提交
			success: function(dt) {
				console.log("success: " + JSON.stringify(dt));
				if (dt.status == "success") {
					docData = dt.data;
					//获取医院名称
					$.ajax({
						url: serviceurl + "hospital/detail",
						type: "get",
						dataType: "json",
						data: {
							"hospitalid": getURLparam("hospitalID")
						},
						contentType: "application/json",
						cache: false,
						async: false,
						beforeSend: function(XMLHttpRequest) {},
						success: function(dt) {
							console.log(JSON.stringify(dt));
							if (dt.status == "success") {
								hospitalName = checknull(dt.data) == "" ? docData.defaulthosname : dt.data.name;
							} else {
								hospitalName = docData.defaulthosname;
							}
						},
						complete: function(XMLHttpRequest, textStatus) {},
						error: function(XMLHttpRequest, textStatus, errorThrown) {}
					});
					// hospitalName = checknull(hospitalName)==""?checknull(docData.defaulthosname):hospitalName;

					if (dt.data.hasAttention == "N") {
						attentive = "关注";
					} else {
						attentive = "已关注";
					}
				} else if (dt.status == "fail") {
					reminder("查询失败");
					return;
				} else {
					reminder("查询错误");
					return;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					location.href = "../404.html";
				}
				reminder("医生详情查询失败！");
				return;
			}
		});
		return {
			data: docData
		};
	},
	render: function() {
		return (
			<div>
				<Reservation_docList data={this.state.data} getDoctorID={getURLparam("doctorid")} attentive={attentive} hospitalName={hospitalName}/>
			</div>
		);
	}
});


var Reservation_titBox = React.createClass({
	getInitialState: function() {
		var doctorid = getURLparam("doctorid");
		$.ajax({
			url: serviceurl + "doctor/detail", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			async: false,
			data: {
				"doctorid": doctorid
			},
			contentType: "application/json", //内容类型
			cache: false, //是否异步提交
			success: function(dt) {
				console.log("success: " + JSON.stringify(dt));
				if (dt.status == "success") {
					titData = dt.data;
					hospitalName = checknull(titData.defaulthosname);
					hasFriend = titData.hasFriend;
					hasReport = titData.hasReport;
				} else if (dt.status == "fail") {
					reminder("查询失败");
					return;
				} else {
					reminder("查询错误");
					return;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == 404) {
					location.href = "../404.html";
				}
				reminder("医生详情查询失败！");
				return;
			}
		});
		return {
			data: titData
		};
	},
	render: function() {
		return (
			<div>
        		<Reservation_titList data={this.state.data} />
      		</div>
		);
	}
});
var Reservation_titList = React.createClass({
	patientClick: function() {
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
					location.href = "../login.html?backurl=reservation/reservation_det.html?doctorid=" + getURLparam("doctorid") + "&hospitalID=" + getURLparam("hospitalID");
				}else{
					//已登录
					if (hasFriend=="N") {
						//与医生不是好友
						if (hasReport == -1) {
							//未报到
							delCookie("gobackURL");
							setCookie("gobackURL", ipurl + "/reservation/reservation_det.html", 30);
							location.href = "reservation_patrep.html?doctorid=" + getURLparam("doctorid");
						}else if(hasReport == 0){
							//报道未确认
							delCookie("gobackURL");
							setCookie("gobackURL", ipurl + "/reservation/reservation_det.html", 30);
							location.href = "reservation_patrep.html?doctorid=" + getURLparam("doctorid");
						}else if(hasReport == 1){
							//已报到,按钮灰，显示已报到
						}else if(hasReport == 2){
							//报道被拒绝
							reminder("很遗憾你已被医生拒绝，请稍后重新报到");
							return;
						}
					}else{
						//与医生已经是好友了，按钮灰色并显示已报到
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				reminder(XMLHttpRequest.responseJSON.message);
				return;
			}
		});
	},
	reservationClick: function() {
		location.href = "reservation_resdet.html?doctorid=" + getURLparam("doctorid") + "&hospitalID=" + getURLparam("hospitalID");
	},
	doctorClick: function() {
		reminder("该功能下一版上线，敬请期待");
	},
	briefClick: function() {
		beief_clickNum = beief_clickNum + 1;
		if (beief_clickNum % 2 == 1) {
			$("#beief_det").removeClass("wrap-class-2");
			$("#beief_btn").text("收起");
		} else if (beief_clickNum % 2 == 0) {
			$("#beief_det").addClass("wrap-class-2");
			$("#beief_btn").text("查看更多");
		}
	},
	componentDidMount: function(){
		var Fheight = $("#beief_det_none").height(); 
		var Nheight = $("#beief_det").height(); 
		$("#beief_det_none").addClass("displaynone");
		if( Nheight > Fheight){
			$("#beief_det").addClass("wrap-class-2");
			$("#beief_btn").removeClass("displaynone");
		}

		var doctor_skill_det = $("#doctor_skill_det").text();
		var beief_det_none = $("#beief_det_none").text();

		if( checknull(doctor_skill_det) == ""){
			$("#doctor_skill_det").text("暂无信息");
		}
		if( checknull(beief_det_none) == ""){
			$("#beief_det_none").text("暂无信息");
			$("#beief_det").text("暂无信息");
		}

	},
	render: function() {
		var thisImgURL = "images/t_reports.png";
		var showRegister = "患者报到";
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
					// location.href = "login.html?backurl=manage_doctor.html";
					isRealLoad = false;
					showRegister = "患者报到";
				}else{
					isRealLoad = true;
					//已登录
					if (hasFriend=="N") {
						//与医生不是好友
						if (hasReport == -1) {
							//未报到,按钮显色并显示患者报到
							showRegister = "患者报到";
						}else if(hasReport == 0){
							//报道未确认，按钮显色并显示患者报到
							showRegister = "患者报到";
						}else if(hasReport == 1){
							//已报到,按钮灰，显示已报到
							showRegister = "已报到";
						}else if(hasReport == 2){
							//报道被拒绝
							reminder("很遗憾你已被医生拒绝，请稍后重新报到");
							return;
						}
					}else{
						//与医生已经是好友了，按钮灰色并显示已报到
						showRegister = "已报到";
					}
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				reminder(XMLHttpRequest.responseJSON.message);
				return;
			}
		});
		return (
			<div>       
	            <div className="weui_flex res_doctor_tool_box">
		            <div className="weui_flex_item pointer" onClick={this.reservationClick}>
		            	<div className="text-align"><img src="images/t_registration.png" className="res_doctor_tool_img"/></div>
		            	<div className="res_doctor_tool_word">预约挂号</div>
		            </div>
		            <div className="weui_flex_item pointer"  onClick={this.patientClick}>
		            	<div className="text-align"><img id="thisRegister" src={thisImgURL} className="res_doctor_tool_img" /></div>
		            	<div className="res_doctor_tool_word" id="showRegister">{showRegister}</div>
		            </div>
		            <div className="weui_flex_item pointer" onClick={this.doctorClick}>
		            	<div className="text-align"><img src="images/t_consultation.png" className="res_doctor_tool_img" /></div>
		            	<div className="res_doctor_tool_word">线上咨询</div>
		            </div>
		        </div>

				<div className="weui_panel weui_panel_access res_doctor_skill_box clance_border">
			        <div className="weui_panel_hd res_doctor_skill_title clance_border">
			        	<span className="res_doctor_skill_font"><img src="images/icon_goodat.png" className="res_doctor_skill_img"/></span>
			        	<span className="res_doctor_skill_font">擅长</span>
			        </div>
			        <div className="weui_panel_bd res_doctor_skill_word" id="doctor_skill_det">{this.props.data.skill}</div>
			    </div>
				
				<div className="weui_panel weui_panel_access res_doctor_skill_box clance_border">
			        <div className="weui_panel_hd res_doctor_skill_title clance_border">
			        	<span className="res_doctor_skill_font"><img src="images/icon_introduction.png" className="res_doctor_skill_img"/></span>
			        	<span className="res_doctor_skill_font">简介</span>
			        </div>
			        <div className="weui_panel_bd res_doctor_skill_word wrap-class-2" id="beief_det_none">{this.props.data.brief}</div>
			        <div className="weui_panel_bd res_doctor_skill_word" id="beief_det">{this.props.data.brief}</div>
			        <div className="res_doctor_more displaynone" onClick={this.briefClick} id="beief_btn">查看更多</div>
			    </div>
	    	</div>
		);
	}
});

var Reservation_centerBox = React.createClass({
	getInitialState: function() {
		var doctorid = getURLparam("doctorid");
		$.ajax({
			url: serviceurl + "doctor/listReview", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			async: false,
			data: {
				"doctorid": doctorid
			},
			contentType: "application/json", //内容类型
			cache: false, //是否异步提交
			success: function(dt) {
				console.log(JSON.stringify(dt)+"this is listReview")
				if (dt.status == "success") {
					commentData = dt.data;

				} else if (dt.status == "fail") {
					reminder("查询失败");
					return;
				} else {
					reminder("查询错误");
					return;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				reminder("评论列表查询失败！");
				return;
			}
		});
		return {
			data: commentData
		};
	},
	render: function() {
		return (
			<div>
        <Reservation_commentList data={this.state.data} />
      </div>
		);
	}
});

var Reservation_commentList = React.createClass({
	componentDidMount: function(){
		var listReview = $("#res_listReview").text();
		if( listReview == ""){
			$("#res_listReview_box").hide();
		}
	},
	spreadClick: function() {
		location.href = "reservation_comment.html?doctorid=" + getURLparam("doctorid");
	},
	render: function() {
		var commentNotes = this.props.data.map(function(comment) {
			var time = getMobilTime(comment.createtime);
			idx = idx + 1;
			if (idx == 1) {
				return (
					<Comment 
	          key={comment.id}
	          id={comment.id}
	          words={comment.words}
	          username={comment.username}
	          time={time}
	          >
	          </Comment>
				);
			} else {
				return (
					<Dcomment 
	          key={comment.id}
	          id={comment.id}
	          words={comment.words}
	          username={comment.username}
	          time={time}
	          >
	          </Dcomment>
				);
			}
		});
		return (
			<div className="weui_panel weui_panel_access res_doctor_skill_box" id="res_listReview_box">
		        <div className="weui_panel_hd res_doctor_skill_title">
		        	<span className="res_doctor_skill_font"><img src="images/icon_comment.png" className="res_doctor_skill_img"/></span>
		        	<span className="res_doctor_skill_font">评论</span>
		        </div>
		        <div className="weui_panel_bd res_doctor_skill_word" id="res_listReview">{commentNotes}</div>
		        <div className="res_doctor_more" href="#" onClick={this.spreadClick}>查看更多</div>
		    </div>
		);
	}
});

var Comment = React.createClass({
	render: function() {
		return (
			<div className="weui_media_desc " ref={this.props.id} >
				<div className="">{this.props.words}</div>
				<div className="res_doctor_comment_word">
					<span><img src="images/user_logo.png" className="comment_img" /></span>
					<span>  {this.props.username}</span>
					<span className="pull-right"> {this.props.time}  </span>
				</div>
			</div>
		);
	}
});
var Dcomment = React.createClass({
	render: function() {
		return (
			<div className="weui_media_desc displaynone" ref={this.props.id} >
				<div className="">{this.props.words}</div>
				<div className="res_doctor_comment_word">
		        	<span><img src="images/user_logo.png" className="comment_img" /></span>
					<span>  {this.props.username}</span>
					<span className="pull-right"> {this.props.time}  </span>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Reservation_topBox data={docData} />,
	document.getElementById('topContent')
);

ReactDOM.render(
	<Reservation_titBox data={titData} />,
	document.getElementById('titContent')
);

ReactDOM.render(
	<Reservation_centerBox data={commentData} />,
	document.getElementById('centerContent')
);

ReactDOM.render(
	<SearchHidden toastText="正在加载" />,
	document.getElementById('hiddenContent')
);

ReactDOM.render(
	<Reservation_dialog href="reservation_det" getDoctorID={getURLparam("doctorid")} getHospitalID={getURLparam("hospitalID")}/>,
	document.getElementById('dialog')
);