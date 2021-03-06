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

getHtmlFontSize();
var docData = [];
var placeData = [];
var commentData = [];
var hospitalAddress = "";
var hospitalName = "";
var idx = 0;
var cssTemp = "";
var attentive = "关注";
var toggleNum = 1; //展开计数


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
				console.log("success: " + JSON.stringify(dt));
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
	render: function() {
		var commentNotes = this.props.data.map(function(comment) {
			var time = getMobilTime(comment.createtime);
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
		});
		return (
			<div className="weui_panel_bd">{commentNotes}</div>
		);
	}
});

var Dcomment = React.createClass({
	render: function() {
		return (
			<div className="weui_panel weui_panel_access res_listReview_box clance_border" id="res_listReview_box">
		        <div className="weui_panel_bd res_doctor_skill_word" id="res_listReview">
					<div className="weui_media_desc " ref={this.props.id} >
						<div className="">{this.props.words}</div>
						<div className="res_doctor_comment_word">
							<span><img src="images/user_logo.png" className="comment_img" /></span>
							<span>  {this.props.username}</span>
							<span className="pull-right"> {this.props.time}  </span>
						</div>
					</div>
		        </div>
		    </div>


			
		);
	}
});

ReactDOM.render(
	<Reservation_centerBox data={commentData} />,
	document.getElementById('centerContent')
);

ReactDOM.render(
	<SearchHidden toastText="正在加载" />,
	document.getElementById('hiddenContent')
);

var Reservation_dialog = React.createClass({
	cancelClick: function() {
		$("#dialog-box").hide();
	},
	sureClick: function() {
		
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
ReactDOM.render(
	<Reservation_dialog />,
	document.getElementById('dialog')
);