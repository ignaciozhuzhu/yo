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
var data = [];
var Reservation_Center = React.createClass({
    render: function() {
    var nodes = this.props.data.map(function (comment) {
        return (
            <Comment 
            key={comment.hospitalid} 
            id={"rules-"+comment.hospitalid}
            doctorid={comment.doctorid} 
            hospitalid={comment.hospitalid} 
            hospitalname={comment.hospitalname}
            booking_info={comment.booking_info}
            cssname={checknull(comment.booking_info)==""?"weui_cell_ft yayi-color pointer displaynone":"weui_cell_ft yayi-color pointer"}
            >
            </Comment>
        );
    });
    return (
      <div className="weui_cells weui_cells_access tmargin1 per_adduser_list">
          {nodes}
      </div>
    );
   }
});

var Comment = React.createClass({
  toggleBtn:function(){
      this.refs.toggleBtn.textContent = this.refs.toggleBtn.textContent=="展开"?"收起":"展开";
      $("#"+this.props.id).slideToggle();
  },
  render: function() {
      return (
        <div>
          <div className="weui_cell per-borbot pointer" >
              <div className="weui_cell_bd weui_cell_primary">
                  <span className="weui_media_title ">
                      <img src="images/Group 5@3x.png" className="rmargin1" width="12px"/>
                      {this.props.hospitalname}
                  </span>
              </div>
              <div className={this.props.cssname} ref="toggleBtn" onClick={this.toggleBtn}>展开</div>
          </div>

          <div className="weui_media_desc res-det-padleft res-det-marbot-mx res-det-hidelist displaynone" id={this.props.id}>
              <div className="weui_panel_bd">
                  <div className="weui_media_box weui_media_text">
                      <p className="res_rules_p">{this.props.booking_info}</p>
                  </div>
              </div>
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


var Reservation_mainBox = React.createClass({
  getInitialState: function() {
    var _params={
      "hospitalid" : getCookie("hospitalID"),
      "doctorid" : getCookie("doctorID")
    };
    $.ajax({	  
      url :  serviceurl+"doctor/listBookinginfo", 
      type : "get",                                           
      dataType : "json",                                       
      data : _params,
      contentType : "application/json",        			    
      cache : false,  
      async: false,                                       
      beforeSend:function(XMLHttpRequest){},                                        
      success : function(dt){
        console.log(JSON.stringify(dt));
        if(dt.status == "success"){
          data = dt.data;
        }else{}
      },
      complete:function(XMLHttpRequest,textStatus){},  
      error:function(XMLHttpRequest, textStatus, errorThrown){}
    });
    return {data: data};
  },
  render: function() {
    return (
      <div>
        <Reservation_Center data={this.state.data}/>
        <Reservation_Hidden />
      </div>
    );
  }
});

ReactDOM.render(
  <Reservation_mainBox data={data} />,
  document.getElementById('content')
);