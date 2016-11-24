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
					location.href = "../login.html?backurl=personal/per_about.html";
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				  reminder(XMLHttpRequest.responseJSON.message);
					return;
			}
		});
}); 
var Personal_aboutBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  goback: function(){
  	history.go(-1);
  },
  goStatement: function(){
  	delCookie("gobackURL");
	setCookie("gobackURL", ipurl + "/per_about.html", 30);
	location.href="per_statement.html";
  },
  render: function() {
    return (
		<div>

			<div className="about_top_box">
				<div className="text-align"><img src="images/about.png" className="about_img"/></div>
				<div className="text-align">牙艺患者微信端</div>
			</div>

			<div className="weui_cells weui_cells_access martop15"	>
				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary flex2" >
						<p>客服电话</p>
					</div>
					<div className="weui_cell_bd weui_cell_primary flex3 colc5">0571-81182533</div>
				</div>

				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary flex2">
						<p>客服邮箱</p>
					</div>
					<div className="weui_cell_bd weui_cell_primary flex3 colc5">kefu@yayi365.cn</div>
				</div>

				<div className="weui_cell">
					<div className="weui_cell_bd weui_cell_primary flex2">
						<p>微信公众号</p>
					</div>
					<div className="weui_cell_bd weui_cell_primary  flex3 colc5">牙艺</div>
				</div>

				<div className="weui_cell pointer" id="per-about-disclaimer" onClick={this.goStatement}>
					<div className="weui_cell_bd weui_cell_primary flex2">
						<p>免责声明</p>
					</div>
					<div className="weui_cell_ft"></div>
				</div>
			</div>
			<div className="tmargin1 color-f6">
				<div className="text-align">Copyright 2015-2016</div>
				<div className="text-align">浙江杭州医谷科技有限公司</div>
			</div>
		</div>
    );
  }
});

ReactDOM.render(
  <Personal_aboutBox />,
  document.getElementById('content')
);