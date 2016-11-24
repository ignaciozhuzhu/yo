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

var casetData = [];
var Patientid = "";
var Id = "";
var refleshData = function(){
  $("#login-loading-toast").css("display","block");
  $.ajax({
      url: serviceurl+"case/patients",
      dataType: 'json',
      cache: false,
      data : {},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        console.log("success: " + JSON.stringify(casetData));
        $("#login-loading-toast").css("display","none");
        if( dt.status == "success"){
          casetData = dt.data;
        }else if( dt.status == "redirect"){
          location.href="../login.html"
        }else{
          reminder("请稍后再试");
          return ;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        $("#login-loading-toast").css("display","none");
        reminder(xhr.responseJSON.message);
      }.bind(this)
    });
};
var Personal_mainBox = React.createClass({
  getInitialState: function() {
    refleshData();
    return {data: casetData};
  },
  goback: function(e){
    history.go(-1);
  },
  render: function() {
    if(casetData.length>0){
        var nodes = casetData.map(function (comment) {  
          return (
              <Comment 
              key={comment.id} 
              id={comment.id} 
              fullname={comment.fullname} 
              >
              </Comment>
          );
        });
        return (
          <div>
              <div className="weui_cells weui_cells_access martop0" id="per-case-list" ref="per-case-list">
                  {nodes}
              </div>
          </div>
        );
    }else{
      return (
          <div className="container-fluid">
              <div>
                  <img src="images/blank_family_medical_record.png" className="img-responsive"/>
              </div>
              <div>
                  <p className="text-align yayi-color">目前没有病例</p>
              </div>
          </div>
      );
    }
  }
});

var Comment = React.createClass({
    goInfo: function(){
      delCookie("patientID");
      setCookie("patientID", this.props.id, 30);
      delCookie("gobackURL");
      setCookie("gobackURL", ipurl + "per_case.html", 30);
      location.href="per_case_info.html";
    },
    render: function() {
      return (
        <div className="weui_cell" onClick={this.goInfo}>
          <div className="weui_cell_hd  text-left per-width20">
            <img src="images/ic_information_express.png"  className="per-width70 display-block avatar"/>
          </div>
          <div className="weui_cell_bd weui_cell_primary">
            <div className="weui_media_desc res-doc-con-text">{this.props.fullname}的病历档案</div> 
          </div>
          <div className="weui_cell_ft"></div>
        </div>
      );
    }
  });
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
ReactDOM.render(
  <Personal_mainBox data={casetData} />,
  document.getElementById('content')
);