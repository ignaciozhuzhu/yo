'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  getCookie,
  downDistance,
  reminder
} from '../../js/common.js';

var evaData = [];
var dataSize = 0;
var Hospitalid = "";
var currentPage = 1;

var startX = 0,
  startY = 0;
var isTouchDevice = function() {
  try {
    //绑定事件
    $.each(document.getElementsByName("thisNodes"), function(idx, item) {
      item.addEventListener('touchstart', touchSatrtFunc, false);
      item.addEventListener('touchmove', touchMoveFunc, false);
    });
  } catch (e) {
    reminder("不支持TouchEvent事件！" + e.message);
  }
};
var isTouchDeviceAll = function() {
  try {
    //绑定事件
    document.addEventListener('touchstart', touchSatrtFunc, false);
    document.addEventListener('touchmove', touchMoveFunc, false);
    //document.addEventListener('touchend', touchEndFunc, false);
  } catch (e) {
    reminder("不支持TouchEvent事件！" + e.message);
  }
};
//touchstart事件
var touchSatrtFunc = function(evt) {
  try {
    evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = evt.touches[0]; //获取第一个触点
    var x = touch.pageX; //页面触点X坐标
    var y = touch.pageY; //页面触点Y坐标
    //记录触点初始位置
    startX = x;
    startY = y;
  } catch (e) {
    reminder('touchSatrtFunc：' + e.message);
  }
};
//touchmove事件，这个事件无法获取坐标
var touchMoveFunc = function(evt) {
  try {
    evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = evt.touches[0]; //获取第一个触点
    var x = touch.pageX; //页面触点X坐标
    var y = touch.pageY; //页面触点Y坐标
    if (y - startY < 100 && y - startY > downDistance) {
      pullDown();
    }
  } catch (e) {
    reminder('touchMoveFunc：' + e.message);
  }
};
//下拉事件的执行
var pullDown = function() {
  location.href = "reservation_hos_eva.html";
};

var refleshData = function(pageNum) {
  Hospitalid = getCookie("hospitalID");
  $.ajax({
    url: serviceurl + "hospital/queryReview",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "hospitalid": Hospitalid
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      $("#loading-toast").css("display", "none");
      if (dt.data.length == 0) {
        $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
        $("#more").css("display", "none");
        isTouchDeviceAll();
      } else {
        evaData = dt.data;
        dataSize = dt.data.length;
        if (dataSize < 10 && dataSize > 0) {
          $("#more").css("display", "none");
        } else {
          $("#more").css("display", "block");
        }
      }
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err.toString());
    }.bind(this)
  });
};

var appendData = function(pageNum) {
  Hospitalid = getCookie("hospitalID");
  $.ajax({
    url: serviceurl + "hospital/queryReview",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "hospitalid": Hospitalid
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      dt.data.forEach(function(e) {
        evaData.push(e);
      });
      dataSize = dt.data.length;
      if (dataSize < 10 && dataSize >= 0) {
        $("#more").css("display", "none");
      } else {
        $("#more").css("display", "block");
      }
      console.log("success: " + JSON.stringify(evaData));
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err.toString());
    }.bind(this)
  });
};

var Personal_mainBox = React.createClass({
  getInitialState: function() {
    refleshData(1);
    return {
      data: evaData
    };
  },
  goback: function(e) {
    history.go(-1);
  },
  nextPage: function() {
    currentPage++;
    appendData(currentPage);
    this.setState({
      data: evaData
    });
  },
  componentDidMount: function() {
    if (evaData.length == 0) {
      $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
    } else {
      isTouchDevice();
    }
  },
  render: function() {
    var nodes = evaData.map(function(comment) {
      return (
        <Comment 
          words={comment.words} 
          username={comment.username} 
          reviewtime={comment.reviewtime} 
          mobile={comment.mobile} 
          >
          </Comment>
      );
    });

    return (
      <div className="weui_panel_bd" >
			<div className="weui_media_box weui_media_text padding0" id="res-doc-list">
				{nodes}
			</div>
			<div className="text-align" id="more" onClick={this.nextPage}>加载更多</div>
		</div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="res-det-borbot" name="thisNodes">
    			<div className="weui_media_desc res-det-padleft padding5-15">
    				<div>
    					<span> {this.props.words} </span>
    				</div>
    				<div className="paddingtop5 coloraaa">
    					<span className="pull-left display-inline-block width30">  {this.props.username} </span>
    					<span className="pull-right text-right display-overflow-space width30"> {this.props.reviewtime} </span>
    					<span className="text-align display-inline-block width30">  {this.props.mobile}  </span>
    				</div>
    			</div>
    		</div>
    );
  }
});

ReactDOM.render(
  <Personal_mainBox data={evaData} />,
  document.getElementById('content')
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