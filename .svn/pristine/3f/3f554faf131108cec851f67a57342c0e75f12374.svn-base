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
} from '../js/common.js';
import Vld from 'validator';

var intDiff = parseInt(59);//倒计时总秒数量
var checkMobile = function(account){
  if( Vld.isMobilePhone(account, 'zh-CN') === false){
    reminder("请输入11位手机号!");
    return false;
  }
  return true;
}; 
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
          var account = $("#account").val();
          var btn = $("#getPriBtn");
          if(!checkMobile(account)){
            return;
          }
          $.ajax({    
            url : thisurl+"checkMobileAndRole",     //请求的Url
            type : "get",                                           //提交方式
            dataType : "json",                                       //请求的返回类型 这里为json  
            data : { "mobile" : account,"role" : 1 },
            contentType : "application/json",                  //内容类型
            cache : false,  
            beforeSend:function(XMLHttpRequest){
                  //console.log("正在查询1");
                },                                         //是否异步提交
            success : function(data){
               console.log(JSON.stringify(data));
               if( data.status == "success"){
                  if( data.data == 0 ){
                     reminder(data.message);//当前用户不存在
                     return;
                  }else if( data.data == 1 ){
                     reminder(data.message);//当前用户和角色不一致
                     return;
                  }else if( data.data == 2 ){
                     GetCaptcha(account);
                     //验证码已发送，倒计时，禁止按钮，等待下一步操作
                     TimeSet(btn,59);
                  }else{
                     reminder(data.message);
                     return;
                  }
               }else{
                  reminder(data.message);
                  return; 
                  }
               },
            complete:function(XMLHttpRequest,textStatus){
              },  
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                  reminder(XMLHttpRequest.responseJSON.message);
                    return; 
              }
          });
        });
      }
    }, 1000);
  
};
var GetCaptcha = function(account){
    var Mobile = account;
    if(checkMobile(Mobile)){
      $.ajax({    
      url : thisurl+"getCaptcha",      //请求的Url
      type : "get",                                           //提交方式
      dataType : "json",                                       //请求的返回类型 这里为json  
      data : { "mobile" : Mobile },
      contentType : "application/json",                  //内容类型
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
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          reminder(XMLHttpRequest.responseJSON.message);
          return false;
          }
      });
    }else{
      return false;  
    }
};

var ResetpasswordBox = React.createClass({
  render: function() {
    return (
		<ResetpasswordForm />
    );
  }
});

var ResetpasswordForm = React.createClass({
  goback: function(e){
    history.go(-1);
  },
  subOnClick:function(e){
    var account = this.refs.account.value;
    var captcha = this.refs.captcha.value;
    //判别账号和验证码的规范
    if(!checkMobile(account)){
      return;
    }
    if(Vld.isNull(captcha+"")){
      reminder("请填写验证码");
      return;
    }
    if(Vld.isLength(captcha+"", {min:4, max:4}) === false && Vld.isNumeric(captcha) === false ){
      reminder("请输入4位数字的验证码");
      return;
    }
    $.ajax({    
    url : thisurl+"verifyCaptcha",              //请求的Url
    type : "get",                                           //提交方式
    dataType : "json",                                       //请求的返回类型 这里为json  
    data : { "captcha" : captcha },
    contentType : "application/json",                  //内容类型
    cache : false,                        //是否异步提交                                   
    success : function(data){
      if( data.status == "success"){ 
          //"验证码正确"
          location.href = "loginpassword.html?mobile="+account;
        }else if( data.status == "fail"){
          reminder("验证码错误");
          return;
        }else{
          reminder("验证失败");
          return;
        }
      //console.log("success: " + JSON.stringify(data));
      },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        reminder(XMLHttpRequest.responseJSON.message);
        return;
      }
     });
    return false;
  },
  getPriOnClick:function(e){
    var account = $("#account").val();
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
      beforeSend:function(XMLHttpRequest){
            //console.log("正在查询1");
          },                                         //是否异步提交
      success : function(data){
        console.log(JSON.stringify(data));
        if( data.status == "success"){
            if( data.data == 0 ){
               reminder(data.message);//当前用户不存在
               return;
            }else if( data.data == 1 ){
               reminder(data.message);//当前用户和角色不一致
               return;
            }else if( data.data == 2 ){
               GetCaptcha(account);
               //验证码已发送，倒计时，禁止按钮，等待下一步操作
               TimeSet(btn,59);
            }else{
               reminder(data.message);
               return;
            }
         }else{
            reminder(data.message);
            return; 
            }
         },
      complete:function(XMLHttpRequest,textStatus){
        },  
      error: function (XMLHttpRequest, textStatus, errorThrown) {
            reminder(XMLHttpRequest.responseJSON.message);
            return; 
        }
    });
  },
	render: function(){
		return(
			<div>

          <div className="weui_cells weui_cells_form reg-margin">
            <div className="weui_cell color res-padding">
                <div className="weui_cell_bd weui_cell_primary">
                    <input className="weui_input" type="number" ref="account" id="account" placeholder="手机号码"/>
                </div>
            </div>
            <div className="weui_cell ">
                 <div className="weui_cell_bd weui_cell_primary">
                    <input className="weui_input" type="number" ref="captcha" id="captcha" placeholder="短信验证码" />
                </div>
                <div className="button_sp_area pointer" ref="getPriBtn" id="getPriBtn">
                    <div className="reg-btn-first fontsize14 text-align" id="securityCode" onClick={this.getPriOnClick} >获取验证码</div>
                </div>
            </div> 
          </div>
          
          <div className="container-fluid reg-margin">
            <div className="reg-padding"></div>
            <div className="reg-padding"><a href="#" className="weui_btn weui_btn_primary reg-btn" onClick={this.subOnClick} >下一步</a></div>
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
                <p className="weui_toast_content text-align" id="loading-toast-text">正在发送验证码</p>
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
	<ResetpasswordBox />,
	document.getElementById('content')
);