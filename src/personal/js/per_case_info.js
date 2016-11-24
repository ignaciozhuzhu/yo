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
  Patientid = getCookie("patientID");
  $("#login-loading-toast").css("display","block");
  $.ajax({
      url: serviceurl+"case/query",
      dataType: 'json',
      cache: false,
      data : {patientid:Patientid},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        console.log("success: " + JSON.stringify(dt));
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
  	var nodes = casetData.map(function (comment) {  
  	   return (
          <Comment 
          key={comment.id} 
          createtime={getLocalTime(comment.createtime)} 
          hospitalname={comment.hospitalname} 
          content={comment.content}  
          >
          </Comment>
      );
    });
    var num = casetData.length;

    return (
      <div >
    		<div className="per-npay-pay-info per-case-info-num">一共<span>{num}</span>次治疗记录</div>
    		<div className="per-case-info-list-fir" id="per-case-info-list"> 
    			{nodes}
    		</div>
    	</div>
    );
  }
});

var Comment = React.createClass({
    render: function() {
      return (
		<div className="weui_cells weui_cells_access bordernone martop0"> 
			<div > 
				<div className="lpadding15">   {this.props.createtime}  </div> 
				<div className="weui_cell bordernone padding015"> 
					<div className="weui_cell_hd  text-align per-width30"> 
						<img src="11"  className="per-width70 display-block" id="avatar"/> 
					</div> 
					<div className="weui_cell_bd weui_cell_primary"> 
						<div > 
							<span className="weui_media_title " id="personal-name" ref="personal-name">   {this.props.hospitalname} </span>  
						</div> 
						<div className="weui_media_desc res-doc-con-text fontsize14">   {this.props.content} </div>  
					</div> 
				</div> 
				<div className="weui_cell bordernone per-margintop5 padding015"> 
					<div className="weui_cell_hd  text-align per-width30"> 
					</div> 
					<div className="weui_cell_bd weui_cell_primary"> 
						<div  className="weui_media_title " id="personal-name" ref="personal-name"> 
							<span><img src="1" /></span> <span><img src="1" /></span> <span><img src="1" /></span> <br/ > 
							<span><img src="1" /></span> <span><img src="1" /></span> <span><img src="1" /></span>  
						</div> 
					</div> 
				</div> 
			</div> 
		</div>
      );
    }
  });

ReactDOM.render(
  <Personal_mainBox data={casetData} />,
  document.getElementById('content')
);
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