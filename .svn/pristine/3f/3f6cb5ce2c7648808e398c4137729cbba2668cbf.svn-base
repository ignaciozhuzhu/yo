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
  downloadurl,
  getHtmlFontSize
} from '../../js/common.js';
import {LoginAuthentication} from '../../js/components/LoginAuthentication.js';
import ReactPullToRefresh from 'react-pull-to-refresh';
getHtmlFontSize();

$(document).ready(function() { 
  LoginAuthentication("personal/per_mypay.html");
}); 
var fData = [];
var rData = [];
var FR = 0;
var CurrentPage = "1";
  let Loading = React.createClass({
       render() {
           return(
               <div className="loading">
                  <div>加载中...</div>
               </div>
           );
       }
  });

  let IconLoading =  React.createClass({
       render() {
           return(
               <span className="iconloading"></span>
           );
       }
  });
//---------------------------Personal_centBox----------------------------------------------------
var Personal_centBox = React.createClass({
  pending: function(){
    $("#pending").attr("class", "midchtext colorblue");
    $("#paid").attr("class", "midchtext colorgray");
    $(".blueanim").attr("class", "blueanim move2left");
  },
  paid: function(){
    $("#paid").attr("class", "midchtext colorblue");
    $("#pending").attr("class", "midchtext colorgray");
    $(".blueanim").attr("class", "blueanim move2right");
  },
  render: function() {
    return (
      <div>
        <div className="midch"><div id="pending" className="midchtext colorblue" onClick={this.pending}>待支付</div></div>
        <div className="midch"><div id="paid" className="midchtext colorgray" onClick={this.paid}>已付账单</div></div>
        <div className="blueanim move2left"></div>
      </div>
    	
    );
  }
});
//-------------------------Personal_centBox  end---------------------------------------------------

//---------------------------Personal_fBox----------------------------------------------------
var refleshFdata = function(){
  $("#login-loading-toast").css("display","block");
	$.ajax({
      url: serviceurl+"order/noPay",
      dataType: 'json',
      cache: false,
      data : { "currentPage" : CurrentPage},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        $("#login-loading-toast").css("display","none");
        console.log(JSON.stringify(dt));
        if( dt.status == "success"){
          fData = dt.data;
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

var refleshFDowndata = function(resolve, reject){
  $("#login-loading-toast").css("display","block");
  $.ajax({
      url: serviceurl+"order/noPay",
      dataType: 'json',
      cache: false,
      data : { "currentPage" : CurrentPage},
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        $("#login-loading-toast").css("display","none");
        console.log(JSON.stringify(dt));
        if( dt.status == "success"){
          resolve();
          fData = dt.data;
        }else if( dt.status == "redirect"){
          reject();
          location.href="../login.html"
        }else{
          reject();
          reminder("请稍后再试");
          return ;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        reject();
        $("#login-loading-toast").css("display","none");
        reminder(xhr.responseJSON.message);
      }.bind(this)
  });
};

var Personal_fBox = React.createClass({
  getInitialState: function() {
  	refleshFdata();
  	return {data: fData};
  },
  componentDidMount: function(){
  	$("#pending").click(function(){
  		if( FR%2 == 1){
  			$("#per_npay_list").css("display","block");
  			$("#per_rpay_list").css("display","none");
  			FR++;
  		}
  	});

  	$("#per_npay_list").on("click",".per_npay_box",function(e){
      if(e.target.textContent=="去支付"){
        delCookie("orderID");
        setCookie("orderID", $(this).attr("id"));
        delCookie("gobackURL");
        setCookie("gobackURL", ipurl + "/per_mypay.html", 30);
        location.href="per_npay_pay.html";
      }else{
        delCookie("orderID");
        setCookie("orderID", $(this).attr("id"));
        delCookie("gobackURL");
        setCookie("gobackURL", ipurl + "/per_mypay.html", 30);
        location.href="per_npay_info.html";
      }
  	});
  },
  handleRefresh(resolve, reject) {
    refleshFDowndata(resolve, reject);
    this.props.onCommentSubmit(fData);
  },  
  render: function() {
      if( fData.map == undefined){
        location.href = "../login.html"
      }else{
        if(fData.length>0){
          var docNodes = fData.map(function(comment) {
              var doctorname = checknull(comment.doctorname);
              var doctortitle = checknull(comment.doctortitle);
              var hospitalname = checknull(comment.hospitalname);
              var snapshot = checknull(comment.snapshot);
              var createtime = checknull(getMobilTime(comment.createtime));
              var totalprice = MoneyConversion(comment.totalprice-comment.reduce);
              var patientname = checknull(comment.patientname);
                return (
                  <NComment 
                  key={comment.id} 
                  id={comment.id} 
                  doctorname={doctorname} 
                  doctortitle={doctortitle} 
                  hospitalname={hospitalname} 
                  snapshot={snapshot.substring(snapshot.indexOf("services")+11,snapshot.indexOf("doctorname")-3)} 
                  createtime={createtime} 
                  totalprice={totalprice} 
                  patientname={patientname} 
                  ordercontent={checknull(comment.ordercontent)}
                  >
                  </NComment>
              );
          });
          return (
              <div className="listItems">{docNodes}</div>
          );
        }else{
          return (
            <div className="container-fluid">
              <div className="per_mypay_zero">
                <img src="images/empty_zd.png" className="per_booking_img"/>
              </div>
              <div className="per_mydoc_text">
                <p className="text-align yayi-color">暂无订单信息</p>
              </div>
            </div>
          );
        }

    }
  }
});
//-------------------------Personal_fBox  end---------------------------------------------------
var NComment = React.createClass({
    render: function() {
      return (
		<div className="weui_panel weui_panel_access per_npay_box" id={this.props.id}>
			<div className="weui_panel_bd">
				<div className="weui_media_box weui_media_text bordernone per_npay_desc">
					<div className="weui_media_title per_mypay_top">
						<span><img src="images/Group 3.png" className="per_myper_img"/></span>
						<span className="per_mypay_docname"> {this.props.doctorname} </span>
						<span className="per_mypay_skill"> {this.props.doctortitle} </span>
					</div>
					<div className="weui_media_desc weui_media_title per_mypay_mid">
						<div className="per_mypay_mid_hname">
							<span className="per_mypay_mid_color">就诊医院：</span>
							<span> {this.props.hospitalname} </span>
						</div>
						<div className="per_mypay_mid_service">
							<span className="per_mypay_mid_color">服务内容：</span>
							<span> {this.props.ordercontent} </span>
						</div>
						<div className="per_mypay_mid_times">
							<span className="per_mypay_mid_color">诊断时间：</span>
							<span>
								<span> {this.props.createtime} </span>
							</span>
						</div>
					</div>
					<div className="weui_media_desc per_mypay_footer">
						<div className="per_mypay_footer_money">
							<span className="per_mypay_footer_color">服务费用：</span>
							<span> {this.props.totalprice} </span>
						</div>
						<div className="per_mypay_footer_name">
							<span className="per_mypay_footer_color">就&nbsp;诊&nbsp;人&nbsp;：</span>
							<span> {this.props.patientname} </span>
              <span className="weui_btn weui_btn_primary pull-right per-npay-gopay per-npay-gopaybg per_mypay_mid">去支付</span>
						</div>
					</div>
				</div>
			</div>
		</div>
      );
    }
});
var RComment = React.createClass({
    evaluate:function(){
      // if(this.props.state == 2){
      //   delCookie("bookingID");
      //   setCookie("bookingID", this.props.bookingID, 30);
      //   delCookie("gobackURL");
      //   setCookie("gobackURL", ipurl + "per_mypay.html", 30);
      //   location.href="per_rpay_comment.html";
      // }
    },
    render: function() {
      return (
    <div className="weui_panel weui_panel_access per_rpay_box" id={this.props.id}>
      <div className="weui_panel_bd">
        <div className="weui_media_box weui_media_text bordernone per_rpay_desc">
          <div className="weui_media_title per_mypay_top">
            <span><img src="images/ic_order.png" className="per_myper_img" /></span>
            <span className="per_mypay_docname"> {this.props.doctorname} </span>
            <span className="per_mypay_skill"> {this.props.doctortitle} </span>
          </div>
          <div className="weui_media_desc per_mypay_mid per_mypay_top weui_media_title">
            <div className="per_mypay_mid_hname">
              <span className="per_mypay_mid_color">就诊医院：</span>
              <span> {this.props.hospitalname} </span>
            </div>
            <div className="per_mypay_mid_service">
              <span className="per_mypay_mid_color">服务内容：</span>
              <span> {this.props.ordercontent} </span>
            </div>
            <div className="per_mypay_mid_times">
              <span className="per_mypay_mid_color">诊断时间：</span>
              <span>
                <span> {this.props.createtime} </span>
              </span>
            </div>
          </div>
          <div className="weui_media_desc per_mypay_footer">
            <div className="per_mypay_footer_money">
              <span className="per_mypay_footer_color">服务费用：</span>
              <span> {this.props.totalprice} </span>
            </div>
            <div className="per_mypay_footer_name">
              <span className="per_mypay_footer_color">就&nbsp;诊&nbsp;人&nbsp;：</span>
              <span> {this.props.patientname} </span>
              <span className={this.props.cssClass} >{this.props.cssName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
    }
});
//---------------------------Personal_rBox----------------------------------------------------
var refleshRDowndata = function(resolve, reject){
  $("#login-loading-toast").css("display","block");
  $.ajax({
      url: serviceurl+"order/hadPay",
      dataType: 'json',
      cache: false,
      data : { },
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        $("#login-loading-toast").css("display","none");
       if( dt.status == "success"){
          resolve();
          rData = dt.data;
        }else if( dt.status == "redirect"){
          reject();
          location.href="../login.html"
        }else{
          reject();
          reminder("请稍后再试");
          return ;
        }
        console.log("success: " + JSON.stringify(dt));
      }.bind(this),
      error: function(xhr, status, err) {
        reject();
        $("#login-loading-toast").css("display","none");
        reminder(xhr.responseJSON.message);
      }.bind(this)
  });
};

var refleshRdata = function(){
  $("#login-loading-toast").css("display","block");
	$.ajax({
      url: serviceurl+"order/hadPay",
      dataType: 'json',
      cache: false,
      data : { },
      contentType : "application/json",
      type : "get", 
      async: false,
      success: function(dt) {
        $("#login-loading-toast").css("display","none");
       if( dt.status == "success"){
          rData = dt.data;
        }else if( dt.status == "redirect"){
          location.href="../login.html"
        }else{
          reminder("请稍后再试");
          return ;
        }
        console.log("success: " + JSON.stringify(dt));
      }.bind(this),
      error: function(xhr, status, err) {
        $("#login-loading-toast").css("display","none");
        reminder(xhr.responseJSON.message);
      }.bind(this)
	});
};

var Personal_rBox = React.createClass({
  getInitialState: function() {
  	refleshRdata();
  	return {data: rData};
  },
  componentDidMount: function(){
  	$("#paid").click(function(){
  		if( FR%2 == 0){
  			$("#per_rpay_list").css("display","block");
  			$("#per_npay_list").css("display","none");
        $("#per_npay_list").html();
  			FR++; 
  		}
  	});
  	$("#per_rpay_list").on("click",".per_rpay_box",function(){
  		delCookie("orderID");
  		setCookie("orderID", $(this).attr("id"));
  		delCookie("gobackURL");
  		setCookie("gobackURL", ipurl + "/per_mypay.html", 30);
  		location.href="per_rpay_info.html";
  	});
  },
  handleRefresh(resolve, reject) {
    refleshRDowndata(resolve, reject);
    this.props.onCommentSubmit(rData);
  },
  render: function() {
     if( rData.map == undefined){
      location.href = "../login.html"
    }else{
      if(rData.length>0){
        var docNodes = rData.map(function(comment) {
          var doctorname = checknull(comment.doctorname);
          var doctortitle = checknull(comment.doctortitle);
          var hospitalname = checknull(comment.hospitalname);
          var snapshot = checknull(comment.snapshot);
          var createtime = checknull(getMobilTime(comment.createtime));
          var totalprice = MoneyConversion(comment.totalprice-comment.reduce);
          var patientname = checknull(comment.patientname);
          var state = checknull(comment.state);
          var refundstate = comment.refundstate;
          var CanRefund = comment.CanRefund;
          var cssClass = "";
          var cssName = "";
          // switch (state){
          //   case 2: //待评价
          //     // cssClass = "pull-right per-npay-gopay per_mypay_mid per-npay-gopaybg";
          //     // cssName = "去评价";
          //     //不显示
          //     cssClass = "";
          //     cssName = "";
          //     break;
          //   case 3: //已完成
          //     cssClass = "pull-right per-npay-gopay per-npay-overbg per_mypay_mid";
          //     cssName = "已评价";
          //     break;
          //   default: //不显示
          //     cssClass = "";
          //     cssName = "";
          // }
          switch (refundstate){
            case -1: //未退款
              cssClass = "";
              cssName = "";
              break;
            case 0: //退款中
              cssClass = "pull-right per-npay-gopay per-npay-overbg per_mypay_mid";
              cssName = "退款中";
              break;
            case 1: //已退款
              cssClass = "pull-right per-npay-gopay per-npay-overbg per_mypay_mid";
              cssName = "已退款";
              break;
            default: //不显示
              cssClass = "";
              cssName = "";
          }
            return (
              <RComment 
              key={comment.id} 
              id={comment.id} 
              bookingID={comment.bookingid}
              state={state}
              refundstate={refundstate}
              CanRefund={CanRefund}
              cssClass={cssClass}
              cssName={cssName}
              doctorname={doctorname} 
              doctortitle={doctortitle} 
              hospitalname={hospitalname} 
              snapshot={snapshot.substring(snapshot.indexOf("services")+11,snapshot.indexOf("doctorname")-3)} 
              createtime={createtime} 
              totalprice={totalprice} 
              patientname={patientname} 
              ordercontent={checknull(comment.ordercontent)}
              >
              </RComment>
          );
        });
        return (
              <div className="listItems">{docNodes}</div>
        );
      }else{
        return (
            <div className="container-fluid">
              <div className="per_mypay_zero">
                <img src="images/empty_zd.png" className="per_booking_img"/>
              </div>
              <div className="per_mydoc_text">
                <p className="text-align yayi-color">暂无订单信息</p>
              </div>
            </div>
        );
      }
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



//-------------------------Personal_rBox  end---------------------------------------------------
ReactDOM.render(
  <Personal_centBox />,
  document.getElementById('centContent')
);
ReactDOM.render(
  <Personal_fBox data={fData} />,
  document.getElementById('per_npay_list')
);
ReactDOM.render(
  <Personal_rBox data={rData} />,
  document.getElementById('per_rpay_list')
);