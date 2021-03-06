'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  setCookie,
  getCookie,
  delCookie,
  reminder,
  getHtmlFontSize,
  getFlatternDistance,
  getURLparam
} from '../../js/common.js';
import {
  SearchHidden,
  HosComment
} from '../../js/components/searchList';

var data = [];
var countycode = "";
var countyName = "";
var dataSize = 0;
var currentPage = 1;
var keyword = getCookie("searchText");
var startX = 0,
  startY = 0;
var latitude = 0;
var longitude = 0;
getHtmlFontSize();
var refleshData = function(pageNum) {
  $.ajax({
    url: serviceurl + "hospital/list",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "keyword": keyword
    },
    contentType: "application/json",
    type: "get",
    async: false,
    beforeSend: function(XMLHttpRequest) {
      $("#loading-toast").css("display", "block");
    },
    success: function(dt) {
      $("#loading-toast").css("display", "none");
      if (dt.data.length == 0) {
        $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
        $("#more").css("display", "none");
      } else {
        data = dt.data;
        dataSize = dt.data.length;
        if (dataSize < 10) {
          $("#more").css("display", "none");
        } else {
          $("#more").css("display", "block");
        }
      }
      console.log("success: " + JSON.stringify(dt));
      console.log("countycode: " + countycode);
    }.bind(this),
    error: function(xhr, status, err) {
      $("#loading-toast").css("display", "none");
      reminder(xhr, status, err.toString());
    }.bind(this)
  });
};
var refleshDownData = function(pageNum, resolve, reject) {
  $.ajax({
    url: serviceurl + "hospital/list",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "keyword": keyword
    },
    contentType: "application/json",
    type: "get",
    async: false,
    beforeSend: function(XMLHttpRequest) {
      $("#loading-toast").css("display", "block");
    },
    success: function(dt) {
      resolve();
      $("#loading-toast").css("display", "none");
      if (dt.data.length == 0) {
        $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
        $("#more").css("display", "none");
      } else {
        data = dt.data;
        dataSize = dt.data.length;
        if (dataSize < 10) {
          $("#more").css("display", "none");
        } else {
          $("#more").css("display", "block");
        }
      }
      console.log("success: " + JSON.stringify(dt));
    }.bind(this),
    error: function(xhr, status, err) {
      reject();
      $("#loading-toast").css("display", "none");
      reminder(xhr, status, err.toString());
    }.bind(this)
  });
};
var appendData = function(pageNum) {
  $.ajax({
    url: serviceurl + "/hospital/list",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "keyword": keyword
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      dt.data.forEach(function(e) {
        data.push(e);
      });
      dataSize = dt.data.length;
      if (dataSize < 10) {
        $("#more").css("display", "none");
      } else {
        $("#more").css("display", "block");
      }
      //console.log("success: " + JSON.stringify(dt));
    }.bind(this),
    error: function(xhr, status, err) {
      reminder(xhr, status, err.toString());
    }.bind(this)
  });
};

var Reservation_hosList = React.createClass({
  nextPage: function() {
    currentPage++;
    appendData(currentPage);
    this.props.onCommentSubmit(data);
  },
  componentDidMount: function() {},
  handleRefresh(resolve, reject) {
    refleshDownData(1, resolve, reject);
    this.props.onCommentSubmit(data);
  },
  render: function() {
    var listsize = this.props.data.length;
    if (listsize % 10 != 0 && listsize >= 1)
      var style = {
        display: "none"
      }
    if (listsize < 1) {
      return (
          <div className="weui_panel_bd" >
            <div className='text-align res-docoter-color'>未搜索到任何数据!</div>
          </div>
      );
    } else {
      var hosNodes = this.props.data.map(function(comment) {
        var grade = comment.grade;
        if (grade == "3") {
          grade = "三";
        } else if (grade == "2") {
          grade = "二";
        } else {
          grade = "一";
        }
        var level = comment.level;
        if (level == "3") {
          level = "丙";
        } else if (level == "2") {
          level = "乙";
        } else if (level == "1") {
          level = "甲";
        } else {
          level = "特";
        }
        //计算距离
        let distance = 0;
        let positionx = comment.positionx;
        let positiony = comment.positiony;
        distance = getFlatternDistance(Number(getURLparam("longitude")), Number(getURLparam("latitude")), positionx, positiony);
        return (
          <HosComment 
            key={comment.id} 
            hid={comment.id} 
            name={comment.name} 
            grade={grade}
            level={level}
            bookingCount={comment.bookingCount}
            imgs={serviceurl+comment.avatar}
            address={comment.address}
            gobackURL="reservation_hosList"
            distance={distance}
            >
            </HosComment>
        );
      });
      return (
          <div className="weui_panel_bd" >
              <div className="listItems">{hosNodes}</div>
              <div className="text-align pointer more_height" id="more" style={style} onClick={this.nextPage}>加载更多</div>
          </div>
      );
    }
  }
});

var Reservation_hosBox = React.createClass({
  getInitialState: function() {
    //查看cookie内时候有对应的值
    countycode = getCookie("cityID");
    countyName = getCookie("cityName");

    refleshData(currentPage);
    return {
      data: data
    };
  },
  componentDidMount: function() {
    this.setState({
      data: data
    });
  },
  handleCommentSubmit: function(comment) {
    this.setState({
      data: comment
    });
  },
  render: function() {
    return (
      <div>
        <Reservation_hosList onCommentSubmit={this.handleCommentSubmit} data={this.state.data} />
        <SearchHidden toastText="正在查询" />
      </div>
    );
  }
});

ReactDOM.render(
  <Reservation_hosBox data={data} />,
  document.getElementById('content')
);