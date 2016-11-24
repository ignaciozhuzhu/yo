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
  getHtmlFontSize
} from '../../js/common.js';

var fData = [];
var rData = [];
var FR = 0;
getHtmlFontSize();
$(document).ready(function() {
  //判断登陆与否
  $.ajax({
    url: serviceurl + "site/getUserInfo",
    type: "get",
    dataType: "json",
    contentType: "application/json",
    cache: false,
    async: false,
    beforeSend: function(XMLHttpRequest) {},
    success: function(dt) {
      if (dt.status == "redirect") {
        //表示未登录
        location.href = "../login.html?backurl=personal/per_mydoc.html";
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      reminder(XMLHttpRequest.responseJSON.message);
      return;
    }
  });
});
//---------------------------Personal_fBox----------------------------------------------------
var refleshFdata = function() {
  $("#login-loading-toast").css("display", "block");
  $.ajax({
    url: serviceurl + "patient/bdDoctor",
    dataType: 'json',
    cache: false,
    data: {},
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      $("#login-loading-toast").css("display", "none");
      console.log(JSON.stringify(dt));
      if (dt.status == "success") {
        fData = dt.data;
      } else if (dt.status == "redirect") {
        location.href = "../login.html"
      } else {
        reminder("请稍后再试");
        return;
      }
    }.bind(this),
    error: function(xhr, status, err) {
      $("#login-loading-toast").css("display", "none");
      reminder(xhr.responseJSON.message);
    }.bind(this)
  });
};

var Personal_fBox = React.createClass({
  getInitialState: function() {
    refleshFdata();
    return {
      data: fData
    };
  },
  componentDidMount: function() {
    $("#per-f").click(function() {
      // alert("per-f FR: " + FR);
      if (FR % 2 == 1) {
        $("#per-f").addClass("weui_bar_item_on");
        $("#per-r").removeClass("weui_bar_item_on");
        $("#per-fdoc-list").css("display", "block");
        $("#per-rdoc-list").css("display", "none");
        FR++;
      }
    });
  },
  goDoctor: function() {
    //查找医生
    delCookie("gobackURL");
    setCookie("gobackURL", ipurl + "/per_mydoc.html", 30);
    location.href = "../search/search.html";
  },
  render: function() {
    if (fData.length > 0) {
      var docNodes = fData.map(function(comment) {
        return (
          <Comment 
            key={comment.id} 
            id={comment.id} 
            avatar={serviceurl+comment.avatar} 
            fullname={comment.fullname} 
            title={comment.title} 
            bookingCount={comment.bookingCount} 
            queryCount={comment.queryCount} 
            skill={comment.skill} 
            >
            </Comment>
        );
      });
      return (
        <div>
            {docNodes}
          </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="per_mydoc_zero">
            <img src="images/blank_my_doctor3.png" className="img-responsive"/>
          </div>
          <div className="per_mydoc_text">
            <p className="text-align yayi-color">您还没找医生报道，赶快去找找吧</p>
            <div className="per_mydoc_btn" onClick={this.goDoctor}>
              <a className="weui_btn weui_btn_primary reg-btn pointer">查找医生</a>
            </div>
          </div>
        </div>
      );
    }
  }
});
//-------------------------Personal_fBox  end---------------------------------------------------
var Comment = React.createClass({
  goDocdecClick: function(e) {
    delCookie("doctorID");
    setCookie("doctorID", this.props.id, 30);
    delCookie("gobackURL");
    setCookie("gobackURL", "../personal/per_mydoc.html", 30);
    location.href = "../reservation/reservation_det.html?doctorID=" + this.props.id;
  },
  render: function() {
    return (
      <div className="weui_panel weui_panel_access per-fdoc pointer" id="docid{this.props.id}" ref="{this.props.id}" onClick={this.goDocdecClick}>
    			<div className="weui_panel_bd res-hos-listbg">
    				<div className="weui_media_box weui_media_appmsg">
    					<div className="weui_media_hd rmargin0 text-left width9">
    						<img className="img-rounded" width="60px" height="60px" src={this.props.avatar} />
    					</div>
    					<div className="weui_media_bd res-listcss">
    						<div className="doctor">
    							<span className="weui_media_title res-doc-name pull-left">  {this.props.fullname} </span>
    							<span className="res-doc-name">  {this.props.title} </span>
    						</div>
    						<div className="weui_media_desc res-doc-con">
    							<div className="res-doc-con-yy">
    								<span>预约量：</span>
    								<span>  {this.props.bookingCount}  </span>
    							</div>
    							<div className="res-doc-con-yy">
    								<span>咨询量：</span>
    								<span>  {this.props.queryCount}  </span>
    							</div>
    						</div>
    						<div className="weui_media_desc res-doc-con-text">
    							<span>  {this.props.skill} </span>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    );
  }
});
//---------------------------Personal_rBox----------------------------------------------------
var refleshRdata = function() {
  $("#login-loading-toast").css("display", "block");
  $.ajax({
    url: serviceurl + "patient/gzDoctor",
    dataType: 'json',
    cache: false,
    data: {},
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      $("#login-loading-toast").css("display", "none");
      if (dt.status == "success") {
        rData = dt.data;
      } else if (dt.status == "redirect") {
        location.href = "../login.html"
      } else {
        reminder("请稍后再试");
        return;
      }
    }.bind(this),
    error: function(xhr, status, err) {
      $("#login-loading-toast").css("display", "none");
      reminder(xhr.responseJSON.message);
    }.bind(this)
  });
};

var Personal_rBox = React.createClass({
  getInitialState: function() {
    refleshRdata();
    return {
      data: rData
    };
  },
  componentDidMount: function() {
    $("#per-r").click(function() {
      // alert("per-r FR: " + FR);
      if (FR % 2 == 0) {
        $("#per-r").addClass("weui_bar_item_on");
        $("#per-f").removeClass("weui_bar_item_on");
        $("#per-rdoc-list").css("display", "block");
        $("#per-fdoc-list").css("display", "none");
        FR++;
      }
    });
  },
  goDoctor: function() {
    //查找医生
    delCookie("gobackURL");
    setCookie("gobackURL", ipurl + "/per_mydoc.html", 30);
    location.href = "../search/search.html";
  },
  render: function() {
    if (rData.length > 0) {
      var docNodes = rData.map(function(comment) {
        return (
          <Comment 
            key={comment.id} 
            id={comment.id} 
            avatar={serviceurl+comment.avatar} 
            fullname={comment.fullname} 
            title={comment.title} 
            bookingCount={comment.bookingCount} 
            queryCount={comment.queryCount} 
            skill={comment.skill} 
            >
            </Comment>
        );
      });
      return (
        <div>
            {docNodes}
          </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="per_mydoc_zero">
            <img src="images/blank_my_doctor3.png" className="img-responsive"/>
          </div>
          <div className="per_mydoc_text">
            <p className="text-align yayi-color">您还没关注医生，赶快去找找吧</p>
            <div className="per_mydoc_btn" onClick={this.goDoctor}>
              <a className="weui_btn weui_btn_primary reg-btn pointer">查找医生</a>
            </div>
          </div>
        </div>
      );
    }

  }
});
//-------------------------Personal_rBox  end---------------------------------------------------
//-------------------------Personal_loading start-----------------------------------------------
var Personal_loading = React.createClass({
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
  <Personal_loading />,
  document.getElementById('personal_loading')
);

//-------------------------Personal_loading end-------------------------------------------------
// ReactDOM.render(
//   <Personal_centBox />,
//   document.getElementById('centContent')
// );
ReactDOM.render(
  <Personal_fBox data={fData} />,
  document.getElementById('per-fdoc-list')
);
ReactDOM.render(
  <Personal_rBox data={rData} />,
  document.getElementById('per-rdoc-list')
);