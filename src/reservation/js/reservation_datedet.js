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
	getURLparam,
	getHtmlFontSize
} from '../../js/common.js';
import Vld from 'validator';

getHtmlFontSize();
var Patientid = 0;//登陆时候的用户id
var Patientname = "";//未登录时候的用户姓名
var Worktimeid = "";//预约时间段
var intDiff = parseInt(59);//倒计时总秒数量
var loginStatus = "";//是否已登录
var Mobile = "";//未登录时获取手机号
var Captcha = "";//未登录时的验证码
var checkMobile = function(account){
	if( Vld.isMobilePhone(account, 'zh-CN') === false){
		reminder("请输入11位手机号!");
		return false;
	}
	return true;
}; 
var getUser = function(){
	 var urlinfo=window.location.href;                      //获取当前页面的url 
	 var len=urlinfo.length;                                     //获取url的长度 
	 var offset=urlinfo.indexOf("?");                            //设置参数字符串开始的位置 
	 var Isfirst = "";
	 var Msg = "";
	 var WorktimeValue = "";
	 if(offset>0){
		//Patientid = getURLparam("patientid");
		//Patientname = getURLparam("patientname");
		//Mobile = getURLparam("mobile");
		Isfirst = decodeURI(getURLparam("isfirst"));
		Msg = decodeURI(getURLparam("msg"));
		Worktimeid = getURLparam("worktimeid");
		WorktimeValue = getURLparam("worktimevalue");

		$("#res-datedet-numb-value").text(Isfirst);
		$("#res-datedet-time-value").text(WorktimeValue);
		$("#res-datedet-msg-value").val(Msg);
		
	 }else{
	 	
	 }                                     
};
var Reservation_topBox = React.createClass({
	getInitialState: function(){
		return {data:[]};
	},
	goback: function(){
		history.go(-1);
	},
	render: function() {
	    return (
	      <div>
	        <div className="weui_panel weui_panel_access datedet_top_box">
	            <div className="weui_panel_bd">
	                <div className="weui_media_box weui_media_text datedet_top_tit_box">
	                    <div className="weui_media_title res_datedet_top_tit">
	                        <span><img src="images/Oval 47 Copy@2x.png" className="datedet_top_tit_img"/></span>
	                        <span className="res_datedet_top_font">{getURLPram(9)}</span>
	                        <span className="res_datedet_top_tit_font">{getURLPram(10)}</span>
	                    </div>
	                    <div className="weui_media_desc res_datedet_top_det">
	                        <div className=" res-det-padbot">
	                        	<span className="res_datedet_c3">就诊医院：</span>
	                            <span>{getURLPram(11)}</span>
	                        </div>
	                         <div className=" res-det-padbot">
	                        	<span className="res_datedet_c3">门诊类型：</span>
	                            <span>{getURLPram(6)}门诊</span>
	                        </div>
	                         <div className=" res-det-padbot">
	                        	<span className="res_datedet_c3">诊断时间：</span>
	                            <span>{getURLPram(7)} {getURLPram(8)}</span>
	                        </div>
	                         <div className=" res-det-padbot">
	                        	<span className="res_datedet_c3">门诊费用：</span>
	                            <span>{getURLPram(5)}</span>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	      </div>
	    );
	  }
});

//验证码发送
var GetCaptcha = function(account){
	  var Mobile = account;
	  if( checkMobile(Mobile) == true ){
	    $.ajax({	  
			url : thisurl+"getCaptcha",   	 //请求的Url
			type : "get",                                           //提交方式
			dataType : "json",                                       //请求的返回类型 这里为json	
			data : { "mobile" : Mobile },
			contentType : "application/json",        			     //内容类型
			cache : false,  
			beforeSend:function(XMLHttpRequest){
						$("#loading-toast").css("display","block");
					},                                         //是否异步提交
			success : function(data){
				$("#loading-toast").css("display","none");
				if( data.status == "success"){
						//验证码发送成功
						reminderSuccess("验证码已发送","");
						return true;
					}else{
						reminder("验证码发送失败");
						return false;
					}
				},
			complete:function(XMLHttpRequest,textStatus) {},	
			error: function (XMLHttpRequest, textStatus, errorThrown) {
					//console.log("验证码发送失败！！！");
					$("#loading-toast").css("display","none");
					reminder(XMLHttpRequest.responseJSON.message);
					return false;
				}
 		});
	  }else{
			return false;  
	  }
};

//检测手机号 按钮倒计时
var TimeSet = function(btn,intDiff){
	var timer = window.setInterval(function(){
		var day=0,
		hour=0,
		minute=0,
		second=0;//时间默认值	
	if( intDiff > 0 ){	
		btn.disabled=true;
		day = Math.floor(intDiff / (60 * 60 * 24));
		hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
		btn.html(second+'s');
		intDiff--;
		}else if( intDiff == 0){
			clearInterval(timer);
			btn.html("<div class=\"weui_btn weui_btn_mini weui_btn_primary reg-btn\"  id=\"securityCode\">获取验证码</div>");
			btn.disabled=false;
			$("#securityCode").click(function(){
	          var account = $("#res-datedet-mobile-value").val().trim();
	          var btn = $("#getPriBtn");
	          if(!checkMobile(account)){
	            return;
	          }
	          $.ajax({    
	            url : thisurl+"checkMobileAndRole",     //请求的Url
	            type : "get",                                           //提交方式
	            dataType : "json",                                       //请求的返回类型 这里为json  
	            data : { 
            		"mobile" : account, 
            		"role" : 1 
            		},
	            contentType : "application/json",                  //内容类型
	            cache : false,  
	            beforeSend:function(XMLHttpRequest){},            //是否异步提交
	            success : function(data){
					if( data.status == "success"){
			            if( data.data == 0 ){
			              	GetCaptcha(account);//验证码已发送，倒计时，禁止按钮，等待下一步操作
							TimeSet(btn,59);
			            }else if( data.data == 1 ){
			               GetCaptcha(account);
			               TimeSet(btn,59);
			               //reminder("已存在用户");//当前用户和角色不一致
			               //return;
			            }else if( data.data == 2 ){
			               GetCaptcha(account);
			               TimeSet(btn,59);
			               //reminder("该号码已在其他端口注册");//当前用户和角色一致
			               //return;
			            }else{
			               reminder(data.message);
			               return;
			            }
			         }else{
			            reminder(data.message);
			            return; 
			            }
			         },
	            complete:function(XMLHttpRequest,textStatus){},  
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	                  reminder(XMLHttpRequest.responseJSON.message);
	                  return; 
	              }
	          });
	        });
		}
	}, 1000);
};

var Reservation_centerBox = React.createClass({
  componentDidMount: function(){
  		//注册取消键的事件
  		$(".mask").click(function(){
			$(".mask").css("display","none");
			$(".actionsheet").removeClass("weui_actionsheet_toggle");
			$(".weui_actionsheet_menu").addClass("displaynone");
		});

		//初始化隐藏域的数据
		$.ajax({	  
			url : serviceurl+"patient/list",   	 //请求的Url
			type : "get",                                           //提交方式
			dataType : "json",                                       //请求的返回类型 这里为json	
			data : {},
			contentType : "application/json",        			     //内容类型
			cache : false,  
			async: false,                                       
			success : function(data){
				console.log("patientdata: " + JSON.stringify(data));
				if( data.status == "success"){
					loginStatus = "Y";//表示已登录
					var PatientList = data.data;	
					$.each(PatientList,function(idx,item){
						if(idx != 4){
							$("#res-datedet-peonum").css("display","block");
						}else if(idx == 4){
							$("#res-datedet-peonum").css("display","none");
						}
						$("#res-datedet-name-list").append(
						"<div class='weui_actionsheet_cell res-datedet-selesct pointer' id='" 
						+ item.id + "'><span id='patientmobile' class='" 
						+ item.mobile + "'>" + item.fullname + "</span></div>"
						);
						if(checknull(item.default_patient)==""){
							Patientid = item.id;
							$("#res-datedet-name-value").text(item.fullname);
							$("#res-datedet-mobile-value").val(item.mobile);
						}
					});

					$(".res-datedet-selesct").click(function(){
						var text = $(this).text(); 
						var selId = $(this).parent().attr("id");
						document.getElementsByName(selId.substring(0,16)+"-value")[0].textContent = text;
						if( selId == "res-datedet-name-list"){
							document.getElementsByName("res-datedet-mobile-value")[0].value=$(this).children().attr("class");
							Patientid = $(this).attr("id");
						}
						$(".mask").css("display","none");
						$(".actionsheet").removeClass("weui_actionsheet_toggle");
						$(".weui_actionsheet_menu").addClass("displaynone");
					});

					$("#res-datedet-peonum").click(function(){
						Patientname =  $("#res-datedet-name-value").text();
						Mobile = $("#res-datedet-mobile-value").val();
						var WorktimeValue = $("#res-datedet-time-value").text();
						var Isfirst = document.getElementsByName("res-datedet-numb-value")[0].textContent;
						var Msg = document.getElementsByName("res-datedet-msg-value")[0].value;
						delCookie("gobackURL");
						setCookie("gobackURL", ipurl + "/reservation/reservation_datedet.html", 30);
						location.href = "reservation_adduser.html?isfirst="+Isfirst+"&msg="+Msg+"&worktimeid="+Worktimeid+"&worktimevalue="+WorktimeValue+"";
					})
				}else if(data.status == "redirect"){
					loginStatus = "N";//表示未登录

					//location.href = "../login.html?backurl=reservation/reservation_datedet.html";
					$("#res-datedet-name").hide();
					$("#res-request-name").css("display","flex");
					$("#res-request-captcha").css("display","flex");

					$(".res-datedet-selesct").click(function(){
						var text = $(this).text(); 
						var selId = $(this).parent().attr("id");
						document.getElementsByName(selId.substring(0,16)+"-value")[0].textContent = text;
						if( selId == "res-datedet-name-list"){
							document.getElementsByName("res-datedet-mobile-value")[0].value=$(this).children().attr("class");
							Patientid = $(this).attr("id");
						}
						$(".mask").css("display","none");
						$(".actionsheet").removeClass("weui_actionsheet_toggle");
						$(".weui_actionsheet_menu").addClass("displaynone");
					});

				}else{
					reminder("病人列表查询错误！");
					return;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				reminder("病人列表查询失败！");
				return;
			}
 		});

 		$.ajax({	  
			url : serviceurl+"workDay/bookingQueryTime",   	 //请求的Url
			type : "get",                                           //提交方式
			dataType : "json",                                       //请求的返回类型 这里为json	
			data : {
				workdayid:getCookie("workdayID"),
				noon:getCookie("noon")
			},
			contentType : "application/json",        			     //内容类型
			cache : false,  
			async: false,                                       
			success : function(dt){
				$("#res-datedet-time-list").html("");
				$.each(dt.data,function(idx,item){
					$("#res-datedet-time-list").append(
						"<div class='weui_actionsheet_cell res-datedet-selesct res-time-selesct pointer' name='"+item.worktimeid+"'>"
						+item.timeSection+"</div>"
					);
					if(idx==0){
						$("#res-datedet-time-value").text(item.timeSection);
						Worktimeid = item.worktimeid;
					}

					// if(!item.d){
					// 	var beginTime = (new Date(item.starttime*1000)).toTimeString().substr(0,5);
					// 	var endTime = (new Date((item.starttime+item.timelong)*1000)).toTimeString().substr(0,5);
					// 	$("#res-datedet-time-list").append("<div class='weui_actionsheet_cell res-datedet-selesct res-time-selesct pointer' id='"+item.id+"''>"
					// 		+beginTime+"~"+endTime+"</div>");
					// }
				});
				$(".res-time-selesct").click(function(){
					$("#res-datedet-time-value").text($(this).text());
					Worktimeid = $(this).attr("name");
					$(".mask").css("display","none");
					$(".actionsheet").removeClass("weui_actionsheet_toggle");
					$(".weui_actionsheet_menu").addClass("displaynone");
				});
				console.log("getCookie('noon')时间段:"+JSON.stringify(dt));
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				reminder("选择时间段查询失败！");
			}
 		});

 		getUser();
  },
  detNameClick: function(e){
  		$(".mask").css("display","block");
		  $(".actionsheet").addClass("weui_actionsheet_toggle");
		  $("#res-datedet-name-show").removeClass("displaynone");
  },
  detTimeClick: function(e){
  		$(".mask").css("display","block");
			$(".actionsheet").addClass("weui_actionsheet_toggle");
			$("#res-datedet-time-show").removeClass("displaynone");
  },
  detNumbClick: function(e){
  		$(".mask").css("display","block");
			$(".actionsheet").addClass("weui_actionsheet_toggle");
			$("#res-datedet-numb-show").removeClass("displaynone");
  },
  goNext: function(){

  	 if( loginStatus == "N" ){   			//未登录时 先验证验证码 成功后注册并登陆
  	 	Patientname = $("#res-request-name-value").val();
		Mobile = $("#res-datedet-mobile-value").val();
		Captcha = $("#res-request-captcha-value").val();

		if( Vld.isNull(Patientname+"")){
			reminder("请填写就诊人");
			return;	
		}
		if(!checkMobile(Mobile)){
    		return;
    	}
		if( Vld.isNull(Captcha+"")){
			reminder("请填写验证码");
			return;	
		}
		if( Vld.isNull(Sectiontime+"")){
			reminder("请选择时间段");
			return;	
		}
		if( Vld.isLength(Captcha+"", {min:4, max:4}) === false){
			reminder("请填写4位验证码");
			return;	
		}
  	 }else if( loginStatus == "Y" ){			//已登录时
		if( Vld.equals(Patientid+"","0") || Vld.isNull(Patientid+"")){
			reminder("请选择就诊人");
			return;	
		}
  	 }else{
  	 	reminder("系统出错，请稍后再试");
		return;
  	 }
		// var Worktimeid = document.getElementsByName("res-datedet-time-value")[0].textContent;
		var Isfirst = document.getElementsByName("res-datedet-numb-value")[0].textContent;
		var Msg = document.getElementsByName("res-datedet-msg-value")[0].value;
		var Sectiontime = $("#res-datedet-time-value").text();

		if( Vld.equals(Isfirst+"","初诊")){
			Isfirst = "0";
		}else if( Vld.equals(Isfirst+"","复诊")){
			Isfirst = "1";
		}else{
			reminder("请选择初/复诊");
			return;	
		}
		
		if(Vld.isLength(Msg+"", {min:0, max:200}) === false){
			reminder("留言不得超过200字");
			return;	
		}
		 $.ajax({	  
			url : serviceurl+"booking/submit",   	 //请求的Url
			type : "post",                                           //提交方式
			dataType : "json",                                       //请求的返回类型 这里为json	
			data : JSON.stringify({
					"patientid" : Patientid, 
					"worktimeid" : Worktimeid, 
					"isfirst" : Isfirst, 
					"msg" : Msg,
					"sectiontime" : Sectiontime,
					"patientname" : Patientname,
					"patientmobile" : Mobile,
					"captcha" : Captcha
				}),
			contentType : "application/json",        			     //内容类型
			cache : false,                                          //是否异步提交
			success : function(data){
				if( data.status == "success"){
						reminder("预约成功");
						//进入我的预约
						location.href = "../personal/per_booking.html";
					}else if( data.status == "fail"){
						reminder("预约失败");
						return;	
					}else{
						reminder(data.message);
						//location.href = "../login.html";
					}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				var text = XMLHttpRequest.responseText;
	        	reminder(text.substring(text.indexOf("message")+10,text.indexOf("data")-3));
	        	return;
			}
	    });
	},
  change: function(){
		$("#per-datedet-hadnum").text($("#res-datedet-msg-value").val().length);
  },
  getPriOnClick:function(e){
  	var account = $("#res-datedet-mobile-value").val().trim();
    var btn = $("#getPriBtn");
    if(!checkMobile(account)){
    	return;
    }
     $.ajax({	  
		url : thisurl+"checkMobileAndRole",   	 //请求的Url
		type : "get",                                           //提交方式
		dataType : "json",                                       //请求的返回类型 这里为json	
		data : { 
			"mobile" : account,
			"role" : 1
			},
		contentType : "application/json",        			     //内容类型
		cache : false,  
		beforeSend:function(XMLHttpRequest){},                                         //是否异步提交
		success : function(data){
			if( data.status == "success"){
	            if( data.data == 0 ){
	              	GetCaptcha(account);//验证码已发送，倒计时，禁止按钮，等待下一步操作
					TimeSet(btn,59);
	            }else if( data.data == 1 ){
	            	GetCaptcha(account);
					TimeSet(btn,59);
	               //reminder("已存在用户");//当前用户和角色不一致
	               //return;
	            }else if( data.data == 2 ){
	            	GetCaptcha(account);
					TimeSet(btn,59);
	               //reminder("该号码已在其他端口注册");//当前用户和角色一致
	               //return;
	            }else{
	               reminder(data.message);
	               return;
	            }
	         }else{
	            reminder(data.message);
	            return; 
	            }
	         },
		complete:function(XMLHttpRequest,textStatus){},	
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			reminder(XMLHttpRequest.responseJSON.message);
			return;	
		}
	});
  },
  render: function() {
    return (
      <div>
        <div className="weui_cells weui_cells_access datedet_form_box"> 
            <div className="weui_cell res-datedet-slesct datedet_form_cell" name="res-datedet-name" id="res-datedet-name" onClick={this.detNameClick}>
                <div className="weui_cell_bd weui_cell_primary">就诊人</div>
                <div className="weui_cell_bd weui_cell_primary text-right" name="res-datedet-name-value" id="res-datedet-name-value">
                </div>
                <div className="weui_cell_ft"></div>
            </div>

            <div className="weui_cell weui_cell_warn datedet_form_cell displaynone" name="res-request-name" id="res-request-name">
	            <div className="weui_cell_hd">就诊人</div>
	            <div className="weui_cell_bd weui_cell_primary rmargin1">
	                <input className="weui_input text-right" type="text" placeholder="请输入姓名" name="res-request-name-value" id="res-request-name-value" />
	            </div>
	        </div>

	        <div className="weui_cell weui_cell_warn datedet_form_cell">
                <div className="weui_cell_hd">手机</div>
               	<div className="weui_cell_bd weui_cell_primary rmargin1">
                    <input ref="mobile" name="res-datedet-mobile-value" className="weui_input text-right pointer" type="tel" id="res-datedet-mobile-value" />
                </div>
            </div>

			<div className="weui_cell weui_cell_warn datedet_form_cell displaynone" name="res-request-captcha" id="res-request-captcha">
	            <div className="weui_cell_hd">验证码</div>
	            <div className="weui_cell_bd weui_cell_primary rmargin1">
	                <input className="weui_input text-right" type="text" placeholder="请输入验证码" id="res-request-captcha-value" />
	            </div>
	            <div className="button_sp_area pointer" id="getPriBtn">
	            	<button type="button" className="login_reg_btn text-align" id="securityCode" onClick={this.getPriOnClick}>获取验证码</button>
	            </div>
	        </div>
            
            <div className="weui_cell res-datedet-slesct datedet_form_cell" name="res-datedet-time" onClick={this.detTimeClick}>
                <div className="weui_cell_bd weui_cell_primary">预约时间段</div>
                <div className="weui_cell_bd weui_cell_primary text-right" name="res-datedet-time-value" id="res-datedet-time-value"></div>
                <div className="weui_cell_ft"></div>
            </div>
            <div className="weui_cell res-datedet-slesct datedet_form_cell" name="res-datedet-numb" onClick={this.detNumbClick}>
                <div className="weui_cell_bd weui_cell_primary">初/复诊</div>
                <div className="weui_cell_bd weui_cell_primary text-right" name="res-datedet-numb-value" id="res-datedet-numb-value">初诊</div>
                <div className="weui_cell_ft"></div>
            </div>
            
        </div>

	       <div className="weui_cells weui_cells_form res_datedet_cells_form">
	       		<div className="res_datedet_cells_txt">留言</div>
	            <div className="weui_cell res_datedet_cell_form clance_border">
	                <div className="weui_cell_bd weui_cell_primary">
	                    <textarea className="weui_textarea res_datedet_textarea_box" placeholder="给医生留言" rows="3" name="res-datedet-msg-value" id="res-datedet-msg-value" onInput={this.change}></textarea>
	                    <div className="weui_textarea_counter res_datedet_textarea_box">
							<span id="per-datedet-hadnum">0</span>
							<span>/200</span>
						</div>
	                </div>
	            </div>
	       </div>

	       <div className="datedet_btn_box">
			    <div className="weui_btn weui_btn_primary success_btn"  onClick={this.goNext}>确认预约</div>
			</div>
      </div>
    );
  }
});



ReactDOM.render(
  <Reservation_topBox />,
  document.getElementById('topContent')
);

ReactDOM.render(
  <Reservation_centerBox />,
  document.getElementById('centerContent')
);

var Reservation_hosHidden = React.createClass({
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
  <Reservation_hosHidden />,
  document.getElementById('hiddenContent')
);