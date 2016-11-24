import {
	thisurl
} from '../../js/common.js';
$(document).ready(function() {
	// Doctor();
	ProList();

	function ProList() {
		//$(".res-ads-city-btn").click(function(){
		//alert("1");
		var CityID = 11;
		var Location = "";
		$.ajax({
			url: thisurl + "getLocation", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			data: {
				"location": Location
			},
			contentType: "application/json", //内容类型
			cache: false,
			beforeSend: function(XMLHttpRequest) {
				console.log("正在查地区");
			}, //是否异步提交
			success: function(data) {
				if (data.status == "success") {
					console.log("查询成功");
					var AddressList = data.data;
					$.each(AddressList, function(idx, item) {
						if (item.id % 10000 == 0) {
							$(".res-ads-pro").append("<div class='res-ads-pro-g res-ads-pro-btn' id='" + item.id + "'>" + item.name + "</div>");
						}
						if (item.id % 10000 != 0 && item.id % 100 == 0 && parseInt(item.id / 10000) == CityID) {
							$(".res-ads-city").append("<div class='res-ads-city-w res-ads-city-btn' id='" + item.id + "'>" + item.name + "</div>");
						}
					})

					$(".res-ads-pro-btn").click(function() {
						$(".res-ads-pro-w").addClass("res-ads-pro-g");
						$(".res-ads-pro-w").removeClass("res-ads-pro-w");
						$(this).addClass("res-ads-pro-w");
						$(this).removeClass("res-ads-pro-g");

						$(".res-ads-city").html("");

						var ProId = $.trim($(this).attr("id"));
						$.each(AddressList, function(idx, item) {
							var CityNO = parseInt(item.id / 10000);
							var CityNo = item.id / 10000;
							if (item.id % 10000 != 0 && item.id % 100 == 0 && CityNO == ProId / 10000) {
								$(".res-ads-city").append("<div class='res-ads-city-w res-ads-city-btn' id='" + item.id + "'>" + item.name + "</div>");
							}
						})


						$(".res-ads-city-btn").click(function() {
							$(".res-ads-city-g").addClass("res-ads-city-w");
							$(".res-ads-city-g").removeClass("res-ads-city-g");
							$(this).addClass("res-ads-city-g");
							$(this).removeClass("res-ads-city-w");

							//跳转到医院列表传参地址id
						});
					});
				} else if (data.status == "fail") {
					console.log("查询失败");
				} else {
					console.log("查询错误");
					//location.href = "login.html";
					return false;
				}
				console.log("success: " + JSON.stringify(data));
			},
			complete: function(XMLHttpRequest, textStatus) {
				console.log("地区列表查询结束");
				return false;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("地区列表查询失败！");
				return false;
			}
		});
		//});
	}


	/*   医生列表	*/
	function Doctor() {
		var Countycode = $.trim($("#countycode").val());
		var Keyword = $.trim($("#keyword").val());
		var hospitalid = $.trim($("#hospitalid").val());
		var CurrentPage = $.trim($("#currentPage").val());

		$.ajax({
			url: "http://localhost/yayi/ya/doctor/list", //请求的Url
			type: "get", //提交方式
			dataType: "json", //请求的返回类型 这里为json	
			data: {
				"countycode": Countycode,
				"keyword": Keyword,
				"hospitalid": 1,
				"currentPage": CurrentPage
			},
			contentType: "application/json", //内容类型
			cache: false,
			beforeSend: function(XMLHttpRequest) {
				console.log("正在查询医生列表");
			}, //是否异步提交
			success: function(data) {
				if (data.status == "success") {
					console.log("查询成功");

					var arr = data.data;
					$.each(arr, function(idx, item) {
						$("#doctor-list").append(
							"<div class='weui_panel weui_panel_access'>" +
							"<div class='weui_panel_bd res-hos-listbg' >" +
							"<div class='weui_media_box weui_media_appmsg' >" +
							"<div class='weui_media_hd'>" +
							"<img class='img-rounded img-responsive center-block res-img' src='images/6b129ead23ed7e2560f4d13bc104bd50cb31a3f2804d-TPKHRT_fw658 Copy@2x.png' />" +
							"</div>" +
							"<div class='weui_media_bd res-listcss'>" +
							"<div class='doctor'>" +
							"<span class='weui_media_title res-doc-name pull-left' id='doctor-name'>" + item.fullname + "</span>" +
							"<span class='weui_btn weui_btn_mini weui_btn_primary pull-right res-doc-hosbtn'>预约</span>" +
							"<span class='res-doc-name'>" + item.title + "</span>" +
							"</div> " +
							"<div class='weui_media_desc res-doc-con'>" +
							"<div class='res-doc-con-yy'>预约量：<span >" + item.bookingCount + "</span></div>" +
							"<div class='res-doc-con-null'></div>" +
							"<div class='res-doc-con-yy'>咨询量：<span >" + item.queryCount + "</span></div>" +
							"</div>" +
							"<div class='weui_media_desc res-doc-con-text'>" + item.skill + "</div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"</div>"
						);

					})



					// alert(json[i].name + "name:" + json[i].sex);
				} else if (data.status == "fail") {
					console.log("查询失败");
				} else {
					console.log("查询错误");
					//location.href = "login.html";
					return false;
				}
				console.log("success: " + JSON.stringify(data));
			},
			complete: function(XMLHttpRequest, textStatus) {
				console.log("医生列表查询结束");
				return false;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("医生列表查询失败！");
				return false;
			}
		});
	}
});