// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};

function __each(_list,_callbak){
	$.each(_list,_callbak);
}
function __get(_url,__param,_callbak){
	$.get(_url,__param,_callbak);
}
function __post(_url,__param,_callbak){
	$.post(_url,__param,_callbak);
}
function __getJSON(_url,_callbak){
	$.getJSON(_url,_callbak);
}
function __getJSON(_url,_data,_callbak){
	$.getJSON(_url,_data,_callbak);
}
function __bootstrapTable(table_id,__url,__columns,__responseHandler,__queryParams,__onAll,__showRefresh){
	return $('#'+table_id).bootstrapTable({
	    method: 'get',
	    url: __url,
	    queryParams: __queryParams,
	    cache: false,
	    striped: false,
	    pagination: true,
	    pageSize: 5,
	    pageList: [10, 20, 50, 100],
	    sortOrder: 'desc',
		sidePagination:'server',
	    search: false,
	    searchAlign: 'left',
	    showColumns: false,
	    showRefresh: __showRefresh||false,
	    minimumCountColumns: 2,
	    clickToSelect:false,
		responseHandler: function(__pagedata){
			if (!__pagedata) 
				return false;
			if(!__responseHandler)
				return __pagedata;
			if(!__pagedata.list || __pagedata.list.length==0)
				return __pagedata;
			__responseHandler(__pagedata.list);
			return __pagedata;
		},
	    columns:__columns,
	    onAll:__onAll,
	    onLoadSuccess: function (data) {
            return false;
        },
	    onLoadError:function(status){
	    	if(status && status.success)
	    		return;
	    	alert(status.msg);
	    }
	});
}
function MinuteToDate(minute){
	return secondToDate(minute*60);
}
function secondToDate(second) {
	if (!second)
		return 0;
	var time = '';
	if (second >= 24 * 3600) {
		time += parseInt(second / (24 * 3600)) + '天';
		second %= 24 * 3600;
	}
	if (second >= 3600) {
		time += parseInt(second / 3600) + '小时';
		second %= 3600;
	}
	if (second >= 60) {
		time += parseInt(second / 60) + '分钟';
		second %= 60;
	}
	if (second > 0) {
		time += second + '秒';
	}
	return time;
}
function _request(_type, req_url, _params, suc_function, _dataType,_alertfunc) {
	$.ajax({
		type : _type,
		cache : false,
		dataType : _dataType,
		timeout : 5000,
		url : req_url,
		data : _params,
		beforeSend : function(xhr) {
			if(_alertfunc)_alertfunc('正在提交请求,请稍候...');
		},
		success : suc_function == null ? function(data) {
			if(_alertfunc)_alertfunc(data.msg);
		} : suc_function,
		error : function(data) {
			var errdata = {};
			errdata.success = false;
			if (0 == data.status) {
				errdata.msg = '网络超时';
			} else {
				errdata.msg = '发生异常：' + data.status;
			}
			if (suc_function != null)
				suc_function(errdata);
			else
				if(_alertfunc)_alertfunc(errdata.msg);
		}
	});
}
function _post(post_url, _params, suc_function, _dataType,_alertfunc) {
	_request('POST', post_url, _params, suc_function,
			_dataType == null ? 'JSON' : _dataType,_alertfunc);
}
function _post_form(post_url, form_id, suc_function,_alertfunc) {
	_post(post_url, $('#' + form_id).serialize(), suc_function,null,_alertfunc);
}
function _get(get_url, _params, suc_function, _dataType,_alertfunc) {
	_request('GET', get_url, _params, suc_function, _dataType == null ? 'JSON'
			: _dataType,_alertfunc);
}

function _keypress(_cbk){
	$(document).keypress(function(e) {
        if(e.which == 13) {_cbk();} 
    });
}
function _timeout(_s,_cbk){
	window.setTimeout(_cbk,_s*1000);
}
function _initZtree(treeid,setting,treejson){
	$.fn.zTree.init($("#"+treeid), setting,treejson);
	return $.fn.zTree.getZTreeObj(treeid);
}
function _serialize(_obj){
	return $.param(_obj);
}
jQuery.prototype.serializeObject=function(){
    var a,o,h,i,e;  
    a=this.serializeArray();  
    o={};  
    h=o.hasOwnProperty;  
    for(i=0;i<a.length;i++){  
        e=a[i];  
        if(!h.call(o,e.name)){  
            o[e.name]=e.value;  
        }  
    }  
    return o;  
};