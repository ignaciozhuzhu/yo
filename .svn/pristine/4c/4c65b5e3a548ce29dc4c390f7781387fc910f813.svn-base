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
var goDoctorDet = function(doctorID, doctorName){
    $("#search_input").val(doctorName);
    $.ajax({
        url: serviceurl+"doctor/detail",
        dataType: 'json',
        cache: false,
        data : {
          doctorid:doctorID
        },
        contentType : "application/json",
        type : "get", 
        async: false,
        beforeSend:function(XMLHttpRequest){
          $("#loading-toast").css("display","block");
        }, 
        success: function(dt) {
          $("#loading-toast").css("display","none");
          if( dt.data.length == 0){
              $("#res-hos-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
          }else{
             var doc = dt.data;
             var htmlval = "";
             htmlval =   "<div class=\"weui_panel weui_panel_access\" id=\"thisDoctor\">                                                   "
                    +"<div class=\"weui_panel_bd res-hos-listbg pointer\" >                                                       "
                    +"  <div class=\"weui_media_box weui_media_appmsg\" >                                                 "
                    +"  <div class=\"weui_media_hd res_hos_imgbox_width\">                                                                     "
                    +"  <img class=\"img-rounded center-block\" width=\"65px\" height=\"65px\" src="+serviceurl+doc.avatar+"/>     "
                    +"  </div>                                                                                          "
                    +"  <div class=\"weui_media_bd res-listcss\">                                                         "
                    +"  <div class=\"doctor\">                                                                            "
                    +"    <span class=\"weui_media_title res-doc-name pull-left\">                                        "
                    +"    "+doc.fullname+"                                                                       "
                    +"    </span>                                                                                       "
                    +"    <span class=\"weui_btn weui_btn_mini weui_btn_primary pull-right res-doc-hosbtn\" >预约</span>  "
                    +"    <span class=\"res-doc-name\">  "+doc.title+" </span>                                      "
                    +"  </div>                                                                                          "
                    +"  <div class=\"weui_media_desc res-doc-con\">                                                       "
                    +"  <div class=\"res-doc-con-yy\">预约量：                                                            "
                    +"    <span >  "+doc.bookingCount+" </span>                                                 "
                    +"  </div>                                                                                          "
                    +"  <div class=\"res-doc-con-null\"></div>                                                            "
                    +"  <div class=\"res-doc-con-yy\">咨询量：                                                            "
                    +"    <span > "+doc.queryCount+" </span>                                                    "
                    +"  </div>                                                                                          "
                    +"  </div>                                                                                          "
                    +"  <div class=\"weui_media_desc res-doc-con-text\"> "+doc.skill+" </div>                       "
                    +"  </div>                                                                                          "
                    +"  </div>                                                                                          "
                    +"</div>                                                                                            "
                    +"</div>                                                                                              ";
             $("#res-hos-list").html("");
             $("#res-hos-list").append(htmlval);
             $("#thisDoctor").click(function(){
                goDocDet(doctorID);
             });
          }
          console.log("success: " + JSON.stringify(dt));
        }.bind(this),
        error: function(xhr, status, err) {
          $("#loading-toast").css("display","none");
          reminder(err.toString());
        }.bind(this)
      });
};

var goDocDet = function(doctorID){
    delCookie("doctorID");
    setCookie("doctorID", doctorID);
    delCookie("gobackURL");
    setCookie("gobackURL", "reservation_doc.html");
    location.href = "reservation_det.html";
};

var Reservation_Search = React.createClass({
  searchClick: function(){
      //每一次文本变化都进行查询
      var searchText = this.refs.search_input.value;
      $.ajax({
        url: serviceurl+"doctor/list",
        dataType: 'json',
        cache: false,
        data : {
          hospitalid:"",
          keyword:searchText
        },
        contentType : "application/json",
        type : "get", 
        async: false,
        beforeSend:function(XMLHttpRequest){
          $("#loading-toast").css("display","block");
        }, 
        success: function(dt) {
          $("#loading-toast").css("display","none");
          if( dt.data.length == 0){
            $("#res-hos-list").html("<div class='text-align res-docoter-color'>未搜索到任何数据</div>");
            
          }else{
            var hosList = dt.data;
            $("#res-hos-list").html("");
            $.each(hosList,function(idx,item){
              $("#res-hos-list").append(
                  "<div class='weui_panel weui_panel_access res_ser_title pointer'>"+
                    "<div class='weui_panel_bd'>"+
                      "<div class='weui_media_box weui_media_appmsg'>"+
                        "<div class='weui_media_bd' id='hospital-"+item.id+"'>"+item.fullname+"<div/>"+
                      "</div>"+
                    "</div>"+
                  "</div>"
                );

              $("#hospital-"+item.id).click(function(){
                goDoctorDet(item.id, item.name);
              });
            });
          }
          console.log("success: " + JSON.stringify(dt));
        }.bind(this),
        error: function(xhr, status, err) {
          $("#loading-toast").css("display","none");
          reminder(err.toString());
        }.bind(this)
      });
  },
  labelClick: function(){
      var searchText = this.refs.search_text;
      searchText.style.display = "none";
  },
  cancelClick: function(){
      //取消就是返回前一页面
      location.href = "reservation_doc.html";
  },
  render: function() {
    return (
      <div>
          <div className="serch-bg">
            <div className="weui_search_bar weui_search_bar_top_bprder serch-bg" ref="search_bar">
                <form className="weui_search_outer">
                  <div className="weui_search_inner">
                    <i className="weui_icon_search"></i>
                    <input type="search" className="weui_search_input" ref="search_input" id="search_input" placeholder="搜索" onChange={this.searchClick}/>
                  </div>
                  <label htmlFor="search_input" className="weui_search_text" ref="search_text" onClick={this.labelClick}>
                        <i className="weui_icon_search"></i>
                        <span>搜索医生</span>
                  </label>       
                </form> 
                <a href="javascript:" className="weui_search_cancel" ref="search_cancel" onClick={this.cancelClick}>取消</a>
            </div>
          </div> 
      </div>
    );
  }
});

var Reservation_List = React.createClass({
  render: function(){
    return (
      <div className="weui_panel_bd" >
        <div className="res_ser_title">相关医生：</div>
        <div id="res-hos-list">
        </div>
      </div>
    );
  }
});


var Reservation_Hidden = React.createClass({
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
var Reservation_Box = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div>
        <Reservation_Search />
        <Reservation_List />
        <Reservation_Hidden />
      </div>
    );
  }
});
ReactDOM.render(
  <Reservation_Box />,
  document.getElementById('content')
);