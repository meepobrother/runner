function StringBuffer() {
	this.buffer = [];
}
StringBuffer.prototype.append = function append(string) {
	this.buffer.push(string);
	return this;
};
StringBuffer.prototype.toString = function toString() {
	return this.buffer.join("");
};

///插件form表单转成json
(function($) {
	$.fn.serializeJson = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(function() {
			if(serializeObj[this.name]) {
				if($.isArray(serializeObj[this.name])) {
					serializeObj[this.name].push(this.value);
				} else {
					serializeObj[this.name] = [serializeObj[this.name], this.value];
				}
			} else {
				serializeObj[this.name] = this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);
///页面公用
var Page = {
	///返回顶部
	ShowTop: function() {
		$(window).scroll(function() {
			if($(window).scrollTop() > 20) {
				$(".w-button-backToTop").fadeIn(1000);
			} else {

				$(".w-button-backToTop").fadeOut(1000);

			}
		});

	},
	RetTop: function() {
		$("body,html").animate({
			scrollTop: 0
		}, 600);
	},
	Versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核                
			presto: u.indexOf('Presto') > -1, //opera内核                
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端                
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
			iPad: u.indexOf('iPad') > -1, //是否iPad                
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
		};
	},
	Login: function() {

		return artDialog.iframe({
			title: "用户登录",
			url: URL + "/account/login?returl=" + escape(location.href).replace(/\//g, "%2F"),
			width: 520,
			height: 250
		});

	},
	Reg: function() {

		return window.location = URL + "/account/reg?returl=" + escape(location.href);

	},
	Logout: function() {
		return window.location = URL + "/account/logout?returl=" + escape(location.href), !1
	},
	CreateCookie: function createCookie(a, b, c, d) {
		var d = d ? d : "/";
		if(c) {
			var e = new Date;
			e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c);
			var f = "; expires=" + e.toGMTString()
		} else var f = "";
		document.cookie = a + "=" + b + f + "; path=" + d
	},
	ReadCookie: function readCookie(a) {
		for(var b = a + "=",
				c = document.cookie.split(";"), d = 0; d < c.length; d++) {
			for(var e = c[d];
				" " == e.charAt(0);) e = e.substring(1, e.length);
			if(0 == e.indexOf(b)) return e.substring(b.length, e.length)
		}
		return null
	},
	AddToFavorite: function addToFavorite() {
		var a = "http://www.uudb.com/",
			b = "\u4eac\u4e1cJD.COM-\u7f51\u8d2d\u4e0a\u4eac\u4e1c\uff0c\u7701\u94b1\u53c8\u653e\u5fc3";
		document.all ? window.external.AddFavorite(a, b) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b, a, "") : alert("\u5bf9\u4e0d\u8d77\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c!\n\u8bf7\u60a8\u4f7f\u7528\u83dc\u5355\u680f\u6216Ctrl+D\u6536\u85cf\u672c\u7ad9\u3002"),
			createCookie("_fv", "1", 30, "/;domain=mall.com")
	},
	Request: function(name) {
		var reg = new RegExp("(^|&)" + name.toLowerCase() + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).toLowerCase().match(reg);
		if(r != null) return unescape(r[2]);
		return null;

	},
	//发送手机验证码
	SendPhoneCode: function(id) {
		var s = 60;
		$("#" + id).attr("disabled", "disabled");
		$("#" + id).removeClass("state-success").addClass("state-sending");
		var inter = setInterval(send, 1000);

		function send() {
			if(s == 0) {
				$("#" + id).val("重新获取").attr("data-click", "$('#Captcha').click();");
				$("#" + id).removeAttr("disabled");
				clearInterval(inter);
			} else {
				$("#" + id).val(s + "秒");
				s--;
			}

		}
	}
};
///验证类
var verify = {

	//不为空验证
	empty: function(e, tips) {
		var obj = $(e);
		if(obj.val() == "") {

			artDialog.tips(tips, e);

			return false;

		}
		return true;
	},
	phone: function(e, tips) {
		var obj = $(e);
		var reg = /^\d{1}[3,4,5,7,8]\d{9}$/;

		if(!reg.test(obj.val())) {

			artDialog.tips(tips, e);

			return false;
		}

		return true;
	},
	///正则验证
	rule: function(e, tips, rule) {
		var d = dialog();
		var obj = $(e);

		var re = rule;

		var value = obj.val();

		if(!re.test(value)) {

			artDialog.tips(tips, e);
			obj.focus(function() {

			})

			return false;

		}
		return true;
	}
}

artDialog = {

	loadingDialog: new Array(),
	alert: function(content, icon, title, yesFun) {
		var iconIndex = 1;
		if(icon == "error") {
			iconIndex = 2;
		}
		layer.alert(content, {
			icon: iconIndex,
			title: title || "",
			skin: 'layer-ext-moon'
		}, function() {
			if(yesFun == undefined) {
				return layer.closeAll();
			}
			yesFun();
		})
	},

	confirm: function(content, yes, no) {
		var index = layer.confirm(content, {
			title: '确认操作',
			btn: ['确定', '取消'] //按钮
		}, function() {
			yes() || function() {};
			layer.close(index);
		}, function() {
			no || function() {};
		});
	},
	prompt: function(content, yes, value, type) {

		layer.prompt({
			formType: type || 2, //2 //输入框类型，支持0（文本）默认1（密码）2（多行文本）
			value: value || "", //初始时的值，默认空字符
			title: content || '请输入值'
		}, function(val) {
			yes(val) || function() {}
		});
	},
	tips: function(content, id, time) {
		$(id).addClass("inputBorder");
		var index = layer.tips(content, id, {
			tips: [3, '#3595CC'],
			time: 5000
		});

		$(id).focus(function() {
			layer.close(index);
		});

	},
	msg: function(content, time) {
		layer.msg(content, {
			icon: 5
		});

	},
	iframe: function(options) {
		var p = options || {};
		return layer.open({
			type: 2,
			title: p.title || "窗口",
			shadeClose: true,
			shade: 0.8,
			area: [p.width, p.height],
			content: p.url //iframe的url
		});
	},
	ajax: function(options) {
		var p = options || {};
		var ashxUrl = "/handlers/" + (options.ashxUrl || "ajaxsubmit") + ".ashx?";
		var url = p.url || ashxUrl + $.param({
			action: p.action
		});
		$.ajax({
			cache: false,
			async: p.async || true,
			url: url,
			data: p.data,
			dataType: p.dataType || 'json',
			type: p.type || 'post',
			beforeSend: function() {
				if(p.beforeSend)
					p.beforeSend();
				else
					artDialog.loading.show(p.loading);

			},
			complete: function() {
				if(p.complete)
					p.complete();
				else

					setTimeout(artDialog.loading.hide, 40);
			},
			success: p.success || function(result) {
				if(!result) return;
				if(!result.IsError) {

					artDialog.alert("消息", "succeed", result.Message);
				} else {

					artDialog.alert("消息", "error", result.Message);
				}
			},
			error: function(result, b) {

				if(result.status != 0) {
					artDialog.alert('发现系统错误 <BR>错误码：' + result.status, "error", null, function() {});
				}

			}
		});
	},
	loading: {
		show: function(message) {
			artDialog.loadingDialog.push(layer.load(0, {
				shade: false
			})); //0代表加载的风格，支持0-2);
		},
		hide: function() {
			$.each(artDialog.loadingDialog, function() {
				layer.close(this);
			});
			arrloading = new Array();
		}
	},
	close: function() {
		layer.closeAll()
			//$.each(art.dialog.list, function (index, item) {
			//    console.info(item);
			//    item.close();
			//});
	}
};

var loc = {
	local: undefined,
	baiduPoi: function(obj, fun) {
		var width = $(obj).outerWidth();
		var height = $(obj).outerHeight();
		var offset = $(obj).offset();

		var options = {
			onSearchComplete: function(results) {
				$(".list_footer").remove();
				var str = new StringBuffer();
				if(local.getStatus() == BMAP_STATUS_SUCCESS) {
					str.append('<div class="list_footer" style="width:' + width + 'px; position:absolute;">')
					str.append('<ul>')
					var num = results.getCurrentNumPois() > 20 ? 20 : results.getCurrentNumPois();
					var tags = "";
					for(i = 0; i < num; i++) {
						if(results.getPoi(i).city == undefined) {
							console.info("city error");
							return;
						}
						if(results.getPoi(i).city != $.trim(cityName)) {
							return;
						}
						if($.trim(cityName) == "信阳市") {
							if(results.getPoi(i).address.indexOf("固始县") > -1) {
								return;
							}
						}

						if(results.getPoi(i).tags != undefined) {
							tags = results.getPoi(i).tags.join(',');
						}

						if(tags.indexOf("道路") == -1 && tags.indexOf("行政地标") == -1) {
							//  str.append('<li class="getLocation" onclick="event.stopPropagation();select(' + results.getPoi(i).point.lng + ',' + results.getPoi(i).point.lat + ',\"' + results.getPoi(i).title + '\");">')
							str.append('<li class="getLocation" data-note="' + results.getPoi(i).address + '" data-lng="' + results.getPoi(i).point.lng + '" data-lat="' + results.getPoi(i).point.lat + '" data-title="' + results.getPoi(i).title + '">')
							str.append(results.getPoi(i).title);
							str.append("<span>");
							str.append(results.getPoi(i).address);
							str.append("</span>");
							str.append("</li>");
						}
						curCity = results.getPoi(i).city;
						tags = "";

					}
					str.append('</ul></div>');

					var html = $(str.toString()).offset({
						top: offset.top + height,
						left: offset.left
					}).show();

					$("body").append(html);
					$('.getLocation').bind("click", function() {
						$('.list_footer').remove();
						$(obj).val($(this).attr("data-title"));

						if(fun != undefined) {
							fun({
								note: $(this).attr("data-note"),
								lng: $(this).attr("data-lng"),
								lat: $(this).attr("data-lat"),
								title: $(this).attr("data-title")
							});
						}
					});
					//if (html.find("li").length > 0) {
					//    var notice = '<li style="cursor:default" class="baiduPoint">请选择地址</li>';
					//    $(html).find("ul").prepend(notice);
					//}
				}
				if(str.toString() == "" || $(str.toString()).find("li").length == 0) {
					var empty = new StringBuffer();
					empty.append('<div class="list_footer" style="width:' + width + 'px">')
					empty.append('<ul>')
					empty.append('<li style="color:red">没有检索结果,请确认地址是否正确</li>')
					empty.append("</ul></div>")
					var emptyHtml = $(empty.toString()).offset({
						top: offset.top + height,
						left: offset.left
					}).show();
					$("body").prepend(emptyHtml);
				}
			}
		};
		var local = new BMap.LocalSearch(cityName, options);

		var destination = $(obj).val();
		if(destination.length > 1) local.search(destination); //获取点的坐标
	},
	getLocation: function() {
		var options = {
			enableHighAccuracy: true,
			maximumAge: 1000
		}

		//var lng = page.ReadCookie("lng");
		//var lat = page.ReadCookie("lat");
		//var address = page.ReadCookie("address");
		//alert(lng);
		//alert(address);
		//if (lng != null & lat != null & address != null) {
		//    this.getAddress(lng, lat, address);
		//    return false;
		//}
		if(navigator.geolocation) {
			//浏览器支持geolocation
			//  113.718365, 34.761742
			//var lng = "113.718365";
			//var lat = "34.761742";

			//loc.getAddress(lng, lat);
			//store.list(window.location.href);
			//return;

			navigator.geolocation.getCurrentPosition(loc.onSuccess, loc.onError, options);

		} else {
			//浏览器不支持geolocation
			art.alert(null, "定位错误", null);
		}
	},
	onSuccess: function(position) {
		//返回用户位置
		//经度
		var lng = position.coords.longitude;
		//纬度
		var lat = position.coords.latitude;

		page.CreateCookie("lng", lng);
		page.CreateCookie("lat", lat);

		//loc.getAddress(longitude, latitude);

	},
	onError: function(error) {
		switch(error.code) {
			case 1:
				art.tips("位置服务被拒绝");
				break;

			case 2:
				art.tips("暂时获取不到位置信息");
				break;

			case 3:
				art.tips("获取信息超时");
				break;

			case 4:
				art.tips("未知错误");
				break;
		}
	},
	baiduGps: function(id, fun) { //百度定位
		// 百度地图API功能

		var map = new BMap.Map(id);
		var point = new BMap.Point(116.331398, 39.897445);
		map.centerAndZoom(point, 12);

		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r) {
			if(this.getStatus() == BMAP_STATUS_SUCCESS) {
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);

				if(fun != undefined) {
					fun(r);
				}
			} else {

			}
		}, {
			enableHighAccuracy: true
		});
	}
};

function FmtTime(date, fmt) {
	var o = {
		"M+": date.getMonth() + 1, //月份   
		"d+": date.getDate(), //日   
		"h+": date.getHours(), //小时   
		"m+": date.getMinutes(), //分   
		"s+": date.getSeconds(), //秒   
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
		"S": date.getMilliseconds() //毫秒   
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}