'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	serviceurl,
	reminder,
	getHtmlFontSize
} from '../../js/common.js';

import {
	SearchHidden
} from '../../js/components/searchList.js';

$(document).ready(function() {
	getHtmlFontSize();
})

var Box = React.createClass({
	getInitialState: function() {
		return {
			mobile: '',
			return_code: ''
		}
	},
	render: function() {
		return (
			<div className="invite"> 
				<form>
						<div className="form-group">
							<div className="tit"><h3>邀请确认</h3></div>
							<input type="text" className="form-control formcon height58 inline" ref="mobile" placeholder="手机号" />
							<input type="text" className="form-control formcon height58 inline" ref="return_code" placeholder="邀请码" />
							<input type='button' className="btn btn-default btn-lg formcon height65" onClick={this.handleSubmit} value="检验" />
						</div>
				</form>
		        <SearchHidden toastText="正在查询" />
			</div>
		);
	},
	handleSubmit: function() {
		if (!this.refs.mobile.value) {
			reminder("请输入手机号")
			return;
		}
		if (!this.refs.return_code.value) {
			reminder("请输入邀请码")
			return;
		}
		$.ajax({
			url: serviceurl + "survey/selectSurveys?mobile=" + this.refs.mobile.value + "&return_code=" + this.refs.return_code.value + "",
			type: 'GET',
			dataType: "json",
			success: function(result) {
				if (result.data.length > 0)
					reminder("检验通过");
				else {
					reminder("检验未通过,请检查邀请码");
				}
			},
			error: function(XMLHttpRequest) {
				reminder(XMLHttpRequest.responseJSON.message);
				return;
			}
		})
	}
});
ReactDOM.render(
	<Box />,
	document.getElementById('content')
);