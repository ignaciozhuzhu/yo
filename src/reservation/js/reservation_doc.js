'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  setCookie,
  getCookie,
  delCookie,
  getURLPram,
  getURLparam,
  reminder,
  checknull,
  getHtmlFontSize
} from '../../js/common.js';
import {
  SearchHidden,
  DocComment,
  SearchHead
} from '../../js/components/searchList';

var data = [];
var dataSize = 0;
var currentPage = 1;
var startX = 0,
  startY = 0;
getHtmlFontSize();
var refleshData = function(search, pageNum) {
  $.ajax({
    url: serviceurl + "doctor/list",
    dataType: 'json',
    cache: false,
    data: {
      "countycode": checknull(getURLPram(0)),
      "keyword": search,
      "hospitalid": getURLparam("hospitalID"),
      "currentPage": pageNum
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
        $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到相关医生</div>");
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
var refleshDownData = function(search, pageNum, resolve, reject) {
  $.ajax({
    url: serviceurl + "doctor/list",
    dataType: 'json',
    cache: false,
    data: {
      "countycode": getURLPram(0),
      "keyword": search,
      "hospitalid": getURLparam("hospitalID"),
      "currentPage": pageNum
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
        $("#res-doc-list").html("<div class='text-align res-docoter-color'>未搜索到相关医生</div>");
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
var appendData = function(search, pageNum) {
  $.ajax({
    url: serviceurl + "doctor/list",
    dataType: 'json',
    cache: false,
    data: {
      "countycode": getURLPram(0),
      "keyword": search,
      "hospitalid": getURLparam("hospitalID"),
      "currentPage": pageNum
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
        //date=[];
      } else {
        dataSize = dt.data.length;
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
    appendData($("#search_input").val(), currentPage);
    this.props.onCommentSubmit(data);
  },
  goHos: function() {
    location.href = "reservation_hos_info.html?hospitalID=" + getURLparam("hospitalID");
  },
  componentDidMount: function() {
    $.ajax({
      url: serviceurl + "hospital/detail",
      dataType: 'json',
      cache: false,
      data: {
        "hospitalid": getURLparam("hospitalID")
      },
      contentType: "application/json",
      type: "get",
      async: false,
      beforeSend: function(XMLHttpRequest) {
        $("#loading-toast").css("display", "block");
      },
      success: function(dt) {
        $("#loading-toast").css("display", "none");
        console.log(dt);
        if (dt.status == "success") {
          var HospitalInfo = dt.data;
          $("#hos_index").text("去" + HospitalInfo.name + "主页");
        } else if (dt.status == "fail") {
          reminder("医院信息查询失败！");
          return;
        } else {
          reminder("医院信息查询错误！");
          return;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        $("#loading-toast").css("display", "none");
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },
  handleRefresh(resolve, reject) {
    refleshDownData($("#search_input").val(), 1, resolve, reject);
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
            <div className="weui_panel_bd res_doc_gohos w-bg pointer" onClick={this.goHos}>
              <span><img src="../reservation/images/san@3x.png" width="8px"/></span>
              <span className="lmargin1 yayi-color" id="hos_index">去医院主页</span>
            </div>
            <div className="weui_panel_bd" >
              <div className='text-align res-docoter-color'>未搜索到相关医生!</div>
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
            gobackurl="reservation_doc.html"
            hospitalid={getURLparam("hospitalID")}
            >
            </DocComment>
        );
      });
      return (
        <div>
            <div className="weui_panel_bd res_doc_gohos w-bg pointer" onClick={this.goHos}>
              <span><img src="../reservation/images/san@3x.png" width="8px"/></span>
              <span className="lmargin1 yayi-color" id="hos_index">去医院主页</span>
            </div>
            <div className="weui_panel_bd" >
                <div className="listItems">{docNodes}</div>
                <div className="text-align more_height" id="more" style={style} onClick={this.nextPage}>加载更多</div>
            </div>
          </div>
      );
    }

  }
});

var Reservation_docSearch = React.createClass({
  goSearch: function() {
    delCookie("gobackURL");
    setCookie("gobackURL", "reservation_doc.html");
    location.href = "reservation_searchDoc.html";
  },
  inputChange: function() {
    var search = this.refs.search_input || $("#search_input").val();
    //执行搜索，同时清空搜索条件
    refleshData(search.value, 1);
    this.props.onCommentSubmit(data);
  },
  clearClick: function() {
    var search = this.refs.search_input;
    search.value = "";
    refleshData("", currentPage);
    this.props.onCommentSubmit(data);
  },
  render: function() {
    return (
      <SearchHead clearClick={this.clearClick} inputChange={this.inputChange}  />
    );
  }
});

var Reservation_docBox = React.createClass({
  getInitialState: function() {
    refleshData("", currentPage);
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
        <Reservation_docSearch onCommentSubmit={this.handleCommentSubmit} />
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