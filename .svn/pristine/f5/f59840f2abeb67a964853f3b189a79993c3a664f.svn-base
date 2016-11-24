'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  setCookie,
  getCookie,
  delCookie,
  getHtmlFontSize
} from '../../js/common.js';
import {
  SearchHidden,
  DocComment
} from '../../js/components/searchList';

var data = [];
var dataSize = 0;
var currentPage = 1;
var keyword = getCookie("searchText");
var startX = 0,
  startY = 0;
getHtmlFontSize();


var refleshData = function(pageNum) {
  $.ajax({
    url: serviceurl + "doctor/query",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "keyword": "" //keyword
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
        data = [];
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
      $("#loading-toast").css("display", "none");
      console.error(xhr, status, err.toString());
    }.bind(this)
  });
};
var refleshDownData = function(pageNum, resolve, reject) {
  $.ajax({
    url: serviceurl + "doctor/query",
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
        data = [];
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
      console.error(xhr, status, err.toString());
    }.bind(this)
  });
};
var appendData = function(pageNum) {
  $.ajax({
    url: serviceurl + "doctor/query",
    dataType: 'json',
    cache: false,
    data: {
      "currentPage": pageNum,
      "keyword": "" //keyword
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      dt.data.forEach(function(e) {
        data.push(e);
      });
      if (dt.data.length == 0) {
        $("#more").css("display", "none");
        // date=[];
      } else {
        dataSize = dt.data.length;
        console.log(dataSize + "||||");
        if (dataSize < 10 && dataSize > 0) {
          $("#more").css("display", "none");
        } else {
          $("#more").css("display", "block");
        }
      }
      console.log("success: " + JSON.stringify(dt));
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err.toString());
    }.bind(this)
  });
};
var Reservation_docList = React.createClass({
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
        <div>
            <div className="weui_panel_bd" >
              <div className='text-align res-docoter-color'>未搜索到任何数据!</div>
            </div>
          </div>
      );
    } else {
      var docNodes = this.props.data.map(function(comment) {
        return (
          <DocComment 
            key={comment.id} 
            id={comment.id} 
            title={comment.title} 
            skill={comment.skill}
            brief={comment.brief}
            bookingCount={comment.bookingCount}
            queryCount={comment.queryCount}
            reviewScore={comment.reviewScore}
            fullname={comment.fullname}
            mobile={comment.mobile}
            reviewCount={comment.reviewCount}
            avatar={serviceurl+comment.avatar}
            >
            </DocComment>
        );
      });
      return (
        <div>
            <div className="weui_panel_bd" >
                <div className="listItems">{docNodes}</div>
                <div className="text-align more_height" id="more" style={style} onClick={this.nextPage}>加载更多</div>
            </div>
          </div>
      );
    }

  }
});

//-----------------------------Search_relist-------------------------------------------------.

var Reservation_docBox = React.createClass({
  getInitialState: function() {
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
        <Reservation_docList onCommentSubmit={this.handleCommentSubmit} data={this.state.data} />
        <SearchHidden toastText="正在查询" />
      </div>
    );
  }
});

ReactDOM.render(
  <Reservation_docBox data={data} />,
  document.getElementById('content')
);