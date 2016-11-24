﻿'use strict';
import Vld from 'validator';
export var serviceurl = process.env.API_URL;
export var thisurl = serviceurl + "site/";
export var ipurl = process.env.IP_URL;
export var weixinPayBack = process.env.WEIXINPAY_URL;
export var protocol = process.env.PROTOCOL_URL;
export var downloadurl = "https://www.yayi365.cn/";

export var downDistance = 10;
//写cookies
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  // window.localStorage.setItem(c_name,value);
  　
};

//读取cookies
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  /*eslint no-cond-assign: 0 */
  if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return "";
  // return window.localStorage.getItem(name);
};

//删除cookies
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  // window.localStorage.removeItem(name);
};

//获取cookie中的参数
export var getURLPram = function(pram) { //获取参数：0地市号，1医院号, 2返回的url, 3医生的id, 4地市名称
  var arr = new Array();
  arr[0] = getCookie("cityID");
  arr[1] = getCookie("hospitalID");
  arr[2] = protocol + getCookie("gobackURL");
  arr[3] = getCookie("doctorID");
  arr[4] = getCookie("cityName");

  arr[5] = getCookie("price");
  arr[6] = getCookie("role");
  arr[7] = getCookie("timedate");
  arr[8] = getCookie("timeFlag");
  arr[9] = getCookie("doctorName");

  arr[10] = getCookie("doctorTitle");
  arr[11] = getCookie("hospitalName");
  arr[12] = getCookie("hospitalAdress");
  arr[13] = getCookie("patientID");
  arr[14] = getCookie("mobile");

  arr[15] = getCookie("orderID");
  arr[16] = getCookie("bookingID");
  arr[17] = getCookie("proAreacode");
  arr[18] = getCookie("proAddress");
  arr[19] = getCookie("mobileNum");

  arr[20] = getCookie("latitude");
  arr[21] = getCookie("longitude");
  arr[22] = getCookie("workdayID");
  arr[23] = getCookie("noon");
  return arr[pram];
};

//
export var clearCookies = function() {
  setCookie("cityID", "", 30);
  setCookie("hospitalID", "", 30);
  setCookie("gobackURL", "", 30);
  setCookie("doctorID", "", 30);
  setCookie("cityName", "", 30);

  setCookie("price", "", 30);
  setCookie("role", "", 30);
  setCookie("timedate", "", 30);
  setCookie("timeFlag", "", 30);
  setCookie("doctorName", "", 30);

  setCookie("doctorTitle", "", 30);
  setCookie("hospitalName", "", 30);
  setCookie("hospitalAdress", "", 30);
  setCookie("patientID", "", 30);
  setCookie("mobile", "", 30);

  setCookie("orderID", "", 30);
  setCookie("bookingID", "", 30);
  setCookie("proAreacode", "", 30);
  setCookie("proAddress", "", 30);
  // setCookie("mobileNum","",30);  //登录的手机号需要记录，所以不清空

  setCookie("latitude", "", 30);
  setCookie("longitude", "", 30);
  setCookie("workdayID", "", 30);
  setCookie("noon", "", 30);
  setCookie("searchText", "", 30);
};

//获取当前地址id
export var getCityIDByName = function(cityName) {
  var thisData = "";

  $.ajax({
    url: serviceurl + "site/getLocation",
    dataType: 'json',
    cache: false,
    data: {
      "name": cityName
    },
    contentType: "application/json",
    type: "get",
    async: false,
    success: function(dt) {
      thisData = dt.data;
      if (thisData.length > 0) {
        console.log("CityID: " + thisData[0].id);
        return thisData[0].id;
      } else {
        return "地点";
      }

    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err.toString());
      return "";
    }.bind(this)
  });
};

//短暂提示信息
export var reminder = function(text) {
  $("#fail-toast").css("display", "block");
  $("#fail-toast-text").text(text);
  setTimeout(function() {
    $("#fail-toast").css("display", "none");
  }, 2000);
};

//提示成功，并可以跳转
export var reminderSuccess = function(text, url) {
  $("#success-toast").css("display", "block");
  $("#success-toast-text").text(text);
  setTimeout(function() {
    $("#success-toast").css("display", "none");
    if (url != "") {
      location.href = url;
    }
  }, 2000);
};

//时间戳转换成（yyyy/mm/dd hh/mm/ss）
export var getLocalTime = function(nS) {
  return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "/").replace(/日/g, " ");
};

//检测""、undefined、null""
export var checknull = function(value) {
  if (value == "" || value == null || value == "undefined") {
    return "";
  } else {
    return value;
  }
};
//价格换算 （后台所有价格都是以 分 为单位 这里转换成 元 ）
export var MoneyConversion = function(money) {
  money = money / 100;
  return money.toFixed(2);
};
//价格换算 （后台所有价格都是以 分 为单位 这里元转换成分的单位 ）
export var MoneyValue = function(money) {
  money = money * 100;
  return money;
};
//数字精确到小数后两位
export var toDecimal = function(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f.toFixed(2);
};

export var getMobilTime = function(nS) {
  var time = new Date(nS);
  return time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日" + plusZero(time.getHours()) + ":" + plusZero(time.getMinutes()) + ":" + plusZero(time.getSeconds());
};
export function plusZero(ns) {
  if ((ns + "").length > 1) {
    return ns;
  } else {
    return "0" + ns;
  }
};

//获取连接中的参数name的值
export var getURLparam = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var val = "";
  if (r != null) {
    val = r[2];
  }
  return val;
};

/*
 * 获取适配宽度比例
 * 默认为 设计稿竖直放时的横向分辨率为640px--> pert: 6.4    px/70=rem
 */
export var getHtmlFontSize = function(pert) {
  pert = pert || 5.4;
  document.documentElement.style.fontSize = document.documentElement.clientWidth / pert + 'px';
  //每当浏览器窗口大小发生变化
  $(window).resize(function() {
    pert = pert || 5.4;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / pert + 'px';
  });
}

/* 按钮置灰 */
export var btnSetash = function(btnID) {
    $("#" + btnID).attr("disabled", true);
    $("#" + btnID).css("background", "#c3c3c3");
  }
  /* 按钮变回 */
export var btnSetBack = function(btnID, bgcolor) {
  $("#" + btnID).attr("disabled", false);
  $("#" + btnID).css("background", bgcolor);
}

/* 计算经纬度距离*/
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;
var getRad = function getRad(d) {
  return d * PI / 180.0;
};
export var getFlatternDistance = function(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  //返回公里数
  return (d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) / 1000).toFixed(2);
};

export var checkMobile = function(account) {
  if (Vld.isMobilePhone(account, 'zh-CN') === false) {
    //reminder("请输入11位手机号!");
    return false;
  }
  return true;
};

export var isWeiXin = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}