'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as Common from './Common.js';
import {
  serviceurl,
  ipurl,
  setCookie,
  getCookie,
  delCookie,
  reminder,
  getURLparam
} from '../../js/common.js';
import {
  SearchHidden
} from '../../js/components/searchList';
    
    var longitude = 0;//医院位置的经度
    var latitude = 0;//医院位置的纬度
    var hospitalName = "";//医院名称
    $(document).ready(function() { 
        longitude = getURLparam("longitude");
        latitude = getURLparam("latitude");
        hospitalName = getURLparam("hospitalName");

        //初始化地图
        var geolocation;
        var map = new AMap.Map("container", {
            resizeEnable: true,
            // center: [116.397428, 39.90923],//地图中心点
            zoom: 12 //地图显示的缩放级别
        });

        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            // map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            // alert(data.position.getLng() + ", " + data.position.getLat() + ", " + longitude + ", " + latitude);
            // var str=['定位成功'];
            // str.push('经度：' + data.position.getLng());
            // str.push('纬度：' + data.position.getLat());
            // str.push('精度：' + data.accuracy + ' 米');
            // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            // document.getElementById('tip').innerHTML = str.join('<br>');
            //构造路线导航类
            var driving = new AMap.Driving({
                map: map
            }); 
            // 根据起终点经纬度规划驾车导航路线
            driving.search(new AMap.LngLat(data.position.getLng(), data.position.getLat()), new AMap.LngLat(longitude, latitude));
            //根据起终点坐标规划步行路线
            // walking.search([data.position.getLng(), data.position.getLat()], [longitude, latitude]);
            // walking.search([116.379028, 39.865042], [116.427281, 39.903719]);
        }
        //解析定位错误信息
        function onError(data) {
            document.getElementById('tip').innerHTML = '定位失败';
        }
    });