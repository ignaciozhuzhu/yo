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

var MobileValue = function(){//获取参数：手机号
   var urlinfo=window.location.href;                           //获取当前页面的url 
   var len=urlinfo.length;                                     //获取url的长度 
   var offset=urlinfo.indexOf("?");                            //设置参数字符串开始的位置 
   var newsidinfo=urlinfo.substr(offset+1,len);                //取出参数字符串 这里会获得类似“id=1”这样的字符串 
   var newsids=newsidinfo.split("=");                       //对获得的参数字符串按照“=”进行分割 
   var Mobile=newsids[1];                                       //得到参数值 
   var newsname=newsids[0];
  return Mobile;                                       //得到参数名字
};

//验证密码位数以及是否为空
var checkPassword = function(password){
  var Password = password;
  if( Vld.isNull(Password+"")){
    reminder("请输入密码");
    return false;
  }
  if( Vld.isAlphanumeric(Password+"",'en-US') === false){
      reminder("密码包含非法字符");
      return false;
  }
  if( Vld.isLength(Password+"", {min:6, max:16}) === false){
    reminder("密码在6~16位之间");
    return false;
  }
  return true;
};
var LoginpasswordBox = React.createClass({
  render: function() {
    return (
		<LoginpasswordForm />
    );
  }
});
var LoginpasswordForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },subOnClick:function(e){
    var account = MobileValue();
    // var account = "15958101525";
    var password = this.refs.password.value;
    var data={
          "mobile" : account ,
          "role" : 1 ,
          "password" : password
       };
    if(checkPassword(password)){
      $.ajax({    
        url : thisurl+"forgetPwd",     //请求的Url
        type : "post",                                           //提交方式
        dataType : "json",                                       //请求的返回类型 这里为json  
        data : JSON.stringify(data),
        contentType : "application/json",                  //内容类型
        cache : false,                       //是否异步提交                                       
        beforeSend:function(XMLHttpRequest){
             $("#login-loading-toast").css("display","block");
          },                                         
        success : function(data){
          $("#login-loading-toast").css("display","none");
          if( data.status == "success"){
            reminderSuccess("密码重置成功","login.html");
            }else if( data.status == "fail"){
             reminder("密码重置失败");
              return;
            }else{
              reminder("密码重置失败");
              return;
            }
          },
        complete:function(XMLHttpRequest,textStatus){},  
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#login-loading-toast").css("display","none");
            reminder(XMLHttpRequest.responseJSON.message);
            return;
          }
      });
    }else{
      return false;  
    }
  },
	render: function(){
		return(
			<div>

          <div className="weui_cells weui_cells_form reg-margin">
            <div className="weui_cell ">
                 <div className="weui_cell_bd weui_cell_primary">
                    <input className="weui_input" type="password" ref="password" placeholder="6-16位密码"/>
                </div>
            </div> 
          </div>
          
          <div className="container-fluid reg-margin">
            <div className="reg-padding"></div>
              <div className="reg-padding">
                <a href="JavaScript:;" className="weui_btn weui_btn_primary reg-btn" onClick={this.subOnClick}>确定</a>
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
                <p className="weui_toast_content text-align" id="loading-toast-text">正在找回密码</p>
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
	<LoginpasswordBox />,
	document.getElementById('content')
);