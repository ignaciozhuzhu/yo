'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  reminder,
  getURLparam,
  checknull,
  getHtmlFontSize
} from '../../js/common.js';
import {
  SearchHidden,
  DocComment
} from '../../js/components/searchList.js';
//轮播功能
import Slider from '../../js/components/touch-slider/touch-slider.js';

var Hospitalid = ""; //医院id
var longitude = 0; //医院位置的经度
var latitude = 0; //医院位置的纬度
var brief = ""; //医院简介
var address = ""; //医院地址
var avatar = ""; //医院的主图
var imgArr = []; //医院轮播图片数组
var hospitalName = ""; //医院名称
var phoneNum = ""; //医院电话

getHtmlFontSize();
var data = [];
var currentPage = 1;

var Reservation_mainBox = React.createClass({
  getInitialState: function() {
    Hospitalid = getURLparam("hospitalID");
    //医院信息
    $.ajax({
      url: serviceurl + "hospital/detail",
      dataType: 'json',
      cache: false,
      data: {
        "hospitalid": Hospitalid
      },
      contentType: "application/json",
      type: "get",
      async: false,
      success: function(data) {
        console.log("Hospital: " + JSON.stringify(data));
        if (data.status == "success") {
          var HospitalInfo = data.data;
          //医院位置的经度
          longitude = checknull(HospitalInfo.positionx);
          //医院位置的纬度
          latitude = checknull(HospitalInfo.positiony);
          //医院名称
          hospitalName = checknull(HospitalInfo.name);
          //医院简介
          brief = checknull(HospitalInfo.brief);
          //医院地址
          address = checknull(HospitalInfo.address);
          //医院电话
          phoneNum = checknull(HospitalInfo.telephone);
          //轮播图片
          imgArr = HospitalInfo.images;
          var arr = [];
          arr = imgArr;
          imgArr = [];
          $.each(arr, function(idx, item) {
            imgArr.push(serviceurl + item);
          });
          //没有轮播图片则展示医院的主图
          var imgsize = imgArr.length;
          avatar = serviceurl + HospitalInfo.avatar;
          if (imgsize < 1) {
            imgArr[0] = avatar;
          }
        } else if (data.status == "fail") {
          reminder("医院信息查询失败！");
          return;
        } else {
          reminder("医院信息查询错误！");
          return;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        reminder("医院信息查询错误！");
      }.bind(this)
    });
    refleshData(getURLparam("hospitalID"), 1);
    return {
      data: data
    };
  },
  componentDidMount: function() {
    showDoctor();
    $(".blueanim").attr("class", "blueanim move2right");
  },
  hosintro: function() {
    showHospital();
    $(".blueanim").attr("class", "blueanim move2left");
  },
  reldoc: function() {
    showDoctor();
    $(".blueanim").attr("class", "blueanim move2right");
  },
  render: function() {
    var callnum = "tel:" + phoneNum;
    var goMapURL = "reservation_map.html?hospitalName=" + hospitalName + "&longitude=" + longitude + "&latitude=" + latitude;
    let time;
    if (imgArr.length == 1)
      time = 0;
    else
      time = 3e3;
    return (
      <div>
          <div>
              <Slider autoPlayInterval={time} imgs={imgArr}/>
          </div>
          <div className="midch"><div id="hosintro" className="midchtext colorblue" onClick={this.hosintro}>医院介绍</div></div>
          <div className="midch"><div id="reldoc" className="midchtext colorgray" onClick={this.reldoc}>相关医生</div></div>
          <div className="blueanim"></div>
          <div className="gray12"></div>
          <div id="brief">
              <div className="margin02">简介</div>
              <div className="gray1 line2right"></div>
              <div className="size14 gray margin02">{brief}</div>
              <div className="gray1"></div>
              <ConnectBox title="联系电话" content={phoneNum} hrname="拨打" href={callnum} />
              <div className="gray1"></div>
              <ConnectBox title="地址" content={address} hrname="导航"  href={goMapURL}  />
              <div className="gray1"></div>
              <br/>
          </div>

          <Reservation_docList data={this.state.data} />
        </div>
    );
  }
});

var ConnectBox = React.createClass({
  render: function() {
    return (
      <div className="margin016">
        <div className="midchv w85">
          <div>{this.props.title}</div>
          <div className="gray">{this.props.content}</div>
        </div>
        <a href={this.props.href} className="midchv w15 button white size14">
          {this.props.hrname}
        </a>
      </div>)
  }
});

//隐藏相关医生，展示医院信息
var showHospital = function() {
  $("#hosintro").attr("class", "midchtext colorblue");
  $("#reldoc").attr("class", "midchtext colorgray");
  $("#brief").css("display", "block");
  $("#doclist").css("display", "none");
  $(".none_panel").hide();
};
//隐藏医院信息，展示相关医生
var showDoctor = function() {
  $("#hosintro").attr("class", "midchtext colorgray");
  $("#reldoc").attr("class", "midchtext colorblue");
  $("#brief").css("display", "none");
  $("#doclist").css("display", "block");
  $(".none_panel").show();
};
//医生列表
var refleshData = function(hospitalid, pageNum) {
  $.ajax({
    url: serviceurl + "doctor/list",
    dataType: 'json',
    cache: false,
    data: {
      "countycode": "",
      "keyword": "",
      "hospitalid": hospitalid,
      "currentPage": pageNum
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      data = dt.data;
      console.log("success: " + JSON.stringify(dt));
    }.bind(this),
    error: function(xhr, status, err) {

    }.bind(this)
  });
};
var appendData = function(hospitalid, pageNum) {
  $.ajax({
    url: serviceurl + "doctor/list",
    dataType: 'json',
    cache: false,
    data: {
      "countycode": "",
      "keyword": "",
      "hospitalid": hospitalid,
      "currentPage": pageNum
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      dt.data.forEach(function(e) {
        data.push(e);
      });
      console.log("success: " + JSON.stringify(dt));
    }.bind(this),
    error: function(xhr, status, err) {

    }.bind(this)
  });
};
var Reservation_docList = React.createClass({
  nextPage: function() {
    currentPage++;
    appendData(getURLparam("hospitalID"), currentPage);
    // this.props.onCommentSubmit(data);
    this.setState({
      data: data
    });
  },
  render: function() {
    var listsize = this.props.data.length;
    if (listsize % 10 != 0 && listsize >= 1)
      var style = {
        display: "none"
      }
    if (listsize < 1) {
      return (
        <div className="none_panel">
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
            gobackurl="reservation_hos_info.html"
            hospitalid={getURLparam("hospitalID")} 
            >
            </DocComment>
        );
      });
      return (
        <div id="doclist">
            <div className="weui_panel_bd" >
                <div className="listItems">{docNodes}</div>
                <div className="text-align more_height" style={style} onClick={this.nextPage}>加载更多</div>
            </div>
          </div>
      );
    }
  }
});

ReactDOM.render(
  <Reservation_mainBox />,
  document.getElementById('content')
);

ReactDOM.render(
  <SearchHidden toastText="正在查询" />,
  document.getElementById('hiddenContent')
);