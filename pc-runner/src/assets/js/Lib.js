var cityName = "郑州市"; // 选择的城市
var cityId = 379;
var action = "index";
var OrderDistanceRule = 2; //1:步行,2: 驾车
var fun; //微信检测
var userCityId = 0; //用户所在城市
var userCityName = ""; //用户所在城市名称
var timeLimitData = {};
$(function () {

    $("div,button,input,a,li,ul").live("click", (function (event) {
        var click = $(this).data("click");
        if (click != undefined) {
            eval(click);
        }
        event.stopPropagation();
    }));
	userCityId = Page.ReadCookie("usercityid") || 0;
	userCityName = Page.ReadCookie("usercityname") || "";
	if(cityId <= 0) {
		cityId = userCityId;
		cityName = userCityName;
	}

	$("#money").change(function() {
		order.price();
	});
	$("#startDate").change(function() {
		order.price();
	});
	action = window.location.pathname.replace('/', '').replace('.htm', '').toLowerCase();
	if(action == "") {
		action = "index";
	}
	switch(action) {
		case "buy":
		case "send":
		case "take":
		case "takeorder":
			dic.timeLimit(cityId);
			order.getCouponList();
			//单选按钮
			radioSelect();
			//帮您送表单提交
			uuSend();
			order.selectCity();
			drawMyMapPath();
			order.addressDrop();
			$("#login").bind("click", order.login);
			$("#sendSmsCode").bind("click", order.checkOrder);
			$("#confirmorder").bind("click", order.confirmOrder);
			if(action == "buy") {
				//$("#balance").hide();

				//帮您买
				uuBuy();
				order.info.type = 1;
				dic.goodsType(0);
			} else if(action == "send") {
				order.info.type = 0;
				dic.sendType();
				//选择时间
				selectTime();
			} else if(action == "take") {

				//选择时间
				selectTime();
				dic.sendType();
			} else if(action == "takeorder") {
				$(".distance").hide();
				order.lineTime();
				dic.lineType();
				//收藏 、历史
				shouCang();
				//带排队
				uuLine();
				//选择日期时间
				selectDateTime();
			}
			break;
	}
});

dic = {

	goodsType: function(city) {
		artDialog.ajax({
			url: "/handler/dic.ashx",
			type: "get",
			data: {
				action: 1000,
				ctiyId: city || cityId
			},
			success: function(result) {
				var sb = new StringBuffer();
				$.each(result.Body, function(i, v) {
					sb.append('<a href="javascript:;" data-desc="' + v.Describe + '" data-id="' + v.ID + '" ' + (i == 0 ? " class=\"selected\"" : "") + '>' + v.QuickOperation + '</a>');
				});
				$("#goodstype").empty().append(sb.toString());
				$("#goodstype a").unbind().click(function() {
					var desc = $(this).data("desc");
					$("#details").attr("placeholder", desc);
					$("#goodstype .selected").removeClass("selected");
					$(this).addClass("selected");
				});
			}
		});
	}, ///获取帮我买物品类型
	sendType: function(city) {
		artDialog.ajax({
			url: "/handler/dic.ashx",
			type: "get",
			data: {
				action: 1001,
				ctiyId: city || cityId
			},
			success: function(result) {
				var sb = new StringBuffer();
				$.each(result.Body, function(i, v) {
					sb.append('<a href="javascript:;" data-desc="' + v.Problem + '" data-id="' + v.ID + '" ' + (i == 0 ? " class=\"selected\"" : "") + '>' + v.Problem + '</a>');
				});
				$("#sendType").empty().append(sb.toString());
				$("#sendType a").unbind().click(function() {

					//$("#sendType .selected").removeClass("selected");
					$(this).toggleClass("selected");
				});
			}
		});
	}, //物品类型
	lineType: function(city) {
		artDialog.ajax({
			url: "/handler/dic.ashx",
			type: "get",
			data: {
				action: 1002,
				cityId: city || cityId
			},
			success: function(result) {
				var sb = new StringBuffer();
				$.each(result.Body, function(i, v) {
					sb.append('<a href="javascript:;" data-desc="' + v.Describe + '" data-id="' + v.ID + '" ' + (i == 0 ? " class=\"selected\"" : "") + '>' + v.QuickOperation + '</a>');
				});
				$("#lineType").empty().append(sb.toString());
				$("#lineType a").unbind().click(function() {
					var desc = $(this).data("desc");
					$("#note").attr("placeholder", desc);
					$("#lineType .selected").removeClass("selected");
					$(this).addClass("selected");
				});
			}
		});
	}, //排队类型
	timeLimit: function(cityId) { //时间限制数据
		artDialog.ajax({
			url: "/handler/dic.ashx?action=1003",
			data: {
				cityId: cityId
			},
			success: function(result) {
				timeLimitData = result.Body;
				order.info.QueueTime = timeLimitData.QueueMinTime;
				$(".enddate>.text").text(+timeLimitData.QueueMinTime + "分钟");
				$(".days>.daystext").text("0天");
				$(".hours>.hourstext").text("0小时");

				var tip = "预约时间为上门取货时间，支持" + timeLimitData.SubscribeTimeMin + "分钟以后，" + Math.floor((timeLimitData.SubscribeTimeMax / 60)) + "小时以内.";
				$("#subText span").text(tip);
			}
		});
	}
}

autoComplete = function(obj, fun) {
		obj.focus(function() {
			loc.baiduPoi(this, fun);
		}).keyup(function() {
			loc.baiduPoi(this, fun);

		}).blur(function() {
			setTimeout(function() {
				$('.list_footer').remove();
			}, 1000);
		});
	} ///百度下拉地址 obj:jquery选择，fun :点击回调
order = { //订单逻辑
	info: {
		cityId: 379,
		cityName: "郑州市",
		type: 0, //0帮我送 1帮我买 2送人 3帮我取 4排队 5就近买
		startAddressLng: "",
		startAddressLat: "",
		endAddressLng: "",
		endAddressLat: "",
		startAddressTitle: "",
		startAddressNote: "",
		startAddressDoor: "",
		endAddressTitle: "",
		endAddressNote: "",
		endAddressDoor: "",
		userMobile: "",
		userCode: "", //用户验证码
		couponId: 0,
		priceToken: ""
	}, //订单信息
	price: function (couponId) {
	   
		order.packData(action);
		switch(action) {
			case "takeorder":
				if(order.info.startAddressTitle == "" || (order.info.lineTimeType == 1 && order.info.subscribeTime == "")) {
					console.info("error");
					return;
				}
				break;
			case "take":
			case "send":
				if(order.info.startAddressTitle == "" || order.info.endAddressTitle == "" || (order.info.subscribeType == 1 && order.info.subscribeTime == "")) {
					console.info("error");
					return;
				}
				break;
		    case "buy":
		        if (order.info.goodsMoney > 0) {
		            $("#balance").hide();
		            $(".goodsFei").show();
		            $("#enterbalance").hide();
		        } else {
		            $("#balance").show();
		            $(".goodsFei").hide();
		            $("#enterbalance").show();
		           
		        }
				if($(".isprice .active").index() == 0) {
					if(order.info.startAddressTitle == "" || order.info.endAddressTitle == "" || (order.info.goodsMoney == "")) {
						console.info("error");
						return;
					}
				}
				if(order.info.startAddressTitle == "" || order.info.endAddressTitle == "") {
					return;
				}
				break;
			default:
				if(order.info.startAddressTitle == "" || order.info.endAddressTitle == "") {
					return;
				}
				break;
		}

		if (parseInt(couponId)>0) {
		    order.info.couponId = couponId || -1;
		} else {
		    order.info.couponId = -1;
		}
		artDialog.ajax({
			url: "/handler/order.ashx?action=100",
			data: {
				data: JSON.stringify(order.packData(action))
			},
			success: function(result) {
				if(result.IsError) {
					return artDialog.msg(result.Msg);
				}
				order.info.couponId = result.Body.CouponID;

				order.getCouponList(cityId, result.Body.FreightMoney, order.info.type, order.info.couponId);

				
				$(".ShowKm").text(result.Body.ShowKm);
				if (result.Body.GoodsMoney > 0) {
                   
				    $(".GoodsMoney").text(result.Body.GoodsMoney);
				    $(".GoodsMoney").parent().parent().show();
				}
			
				$(".FreightMoney").text(result.Body.TotalMoney);
				$(".TotalMoney").text(result.Body.TotalPriceOff);
			    $("#TotalPriceOff").hide();
				if (result.Body.TotalPriceOff > 1) {
				    $("#TotalPriceOff").show();
				} 
			    $(".NeedPayMoney").text(result.Body.NeedPayMoney);
				order.info.priceToken = result.Body.PriceToken;
				$("#confirmorder").unbind().bind("click", order.confirmOrder);
				$("#sendSmsCode").unbind().bind("click", order.sendSmsCode);
				if(result.Body.NeedPayMoney <= 0) {
					$("#balance").show().find("input").iCheck('check');
					$("#weixin").hide();
					$("#alipay").hide();
				} else {
					$("#weixin").show().find("input").iCheck('check');;
					$("#alipay").show();
				}
			}
		});
	}, //获取价格,
	packData: function(type) { //封装数据
		switch(type) {
			case "buy":
				order.info.goodsType = $("#goodstype .selected").text();
				order.info.note = order.info.goodsType + "：" + $("#details").val();
			    order.info.goodsMoney = $("#money").val()||0;
				order.info.specialType = $("#specialType .active").data("val");//是否需要保温箱
				order.info.callMeWithTake = $("#callMeWithTake .active").data("val"); //是否给我打电话;
				order.info.endTel = $("#tel").val(); //联系人
				order.info.endName = $("#name").val();
				order.info.type = 1;
				break;
			case "send":
			case "take":
				var goodsType = [];
				$.each($("#sendType .selected"),
					function() {
						goodsType.push($(this).text());
					});
				order.info.startTel = $("#starttel").val();
				order.info.startName = $("#startname").val();
				order.info.endTel = $("#endtel").val();
				order.info.endName = $("#endname").val();
				order.info.goodsType = goodsType.join(','); //物品类型
				order.info.note = $("#note").val();
				order.info.type = type == "send" ? 0 : 3;
				order.info.specialType = $("#specialType .active").data("val");//是否需要保温箱
				order.info.callMeWithTake = $("#callMeWithTake .active").data("val"); //是否给我打电话;
				order.info.subscribeType = $("#sendTime li").eq(0).hasClass("active") ? 0 : 1;
				order.info.subscribeTime = (order.info.subscribeType == 1 ? $("#yueDate").val() : ""); //序约取件时间
				order.info.collectingMoney = $("#insteadMoney").val();//代收货款
				order.info.goodsInsuranceID =$("#goodsInsurance .active").data("val")==0?0: $("#GoodsInsuranceID").val();
				break;
			case "takeorder": // 代排队
				order.info.subscribeType = $("#lineTimeType .active").index();
				order.info.type = 4;
				order.info.lineType = $("#lineType .selected").text(); //排队类型
				order.info.note = order.info.lineType + "：" + $("#note").val();
				order.info.lineTimeType = $("#lineTimeType .active").index();
				order.info.subscribeTime = $("#startDate").val();
				order.info.startTel = $("#starttel").val();
				order.info.startName = $("#startname").val();
				break;

		}
		order.info.startAddressDoor = $("#startaddressdoor").val();
		order.info.endAddressDoor = $("#endaddressdoor").val();
		order.info.userMobile = $("#usermobile").val();
		order.info.userCode = $("#usercode").val();
		order.info.userSmsCode = $("#usersmscode").val();
		order.info.Rtype = $("input[name='countpay']:checked").attr("data-id");
		console.info(order.info);
		return order.info;

	}, //封装数据
	selectCity: function() { ///选择城市
		if(action == "buy" || action == "send" || action == "take" || action == "takeorder") {
			var cityName1 = Page.ReadCookie("cityname");
			var cityId1 = Page.ReadCookie("cityid");
			if(typeof cityName1 != "object" && cityName1 != "") {
				$(".locacity span").text(cityName1);
				$(".cur_city").text(cityName1);
				cityName = cityName1;
				cityId = cityId1;
				order.info.cityId = cityId;
				order.info.cityName = cityName;
				return;
			}
			var open = false;
			$(".locacity>span").text("正在定位....")
			loc.baiduGps("viewmap", function(r) {

				console.info(r);
				if(r.address.city != undefined) {
					$.each(cityJson, function(index, info) {
						console.log(index);
						if(info.CityName.indexOf(r.address.city) > -1) {
							order.info.cityId = info.Id;
							order.info.cityName = info.CityName;
							Page.CreateCookie("cityid", info.Id);
							Page.CreateCookie("cityname", info.CityName);
							$(".locacity>span").text(info.CityName);
							open = true;

						}

					});

					if(!open) {

						layer.open({
							type: 1,
							title: '已开通城市',
							scrollbar: false,
							area: ['864px', '550px'],
							content: $('#cityLists')
						});
						cityList();
					}

				}

			});

		}
	}, //选择城市
	addressDrop: function() { //地址下拉
		autoComplete($("#startaddress"), function(data) {
			order.info.startAddressLng = data.lng;
			order.info.startAddressLat = data.lat;
			order.info.startMap = new BMap.Point(data.lng, data.lat);
			order.info.startAddressTitle = data.title;
			order.info.startAddressNote = data.note;
			drawMyMapPath(order.info.startMap, order.info.endMap);
			order.price();
		});
		//发货地址输入提示
		autoComplete($("#endaddress"), function(data) {
			order.info.endAddressLng = data.lng;
			order.info.endAddressLat = data.lat;
			order.info.endMap = new BMap.Point(data.lng, data.lat);
			order.info.endAddressTitle = data.title;
			order.info.endAddressNote = data.note;
			drawMyMapPath(order.info.startMap, order.info.endMap);
			order.price();
		});
	}, //百度地址下拉
	confirmOrder: function() {
		order.packData(action);
		uuBuy();
		if(order.checkOrder()) {
			artDialog.ajax({
				url: "/handler/order.ashx",
				data: {
					action: 103,
					data: JSON.stringify(order.packData(action)),
					orderType: action
				},
				success: function(result) {
					if(result.IsError) {
						if(result.State == -1000) {
							$(".pay").eq(1).show();
							$(".pay").eq(0).hide();
						}
						var a = undefined;
						var msg = "下单失败";
						if (result.Msg == undefined || result.Msg == null || result.Msg.length == 0) {
						    if (result.Body.Msg != undefined && result.Body.Msg != null && result.Body.Msg.length > 0) {
						        msg = result.Body.Msg;
						    }
						} else {
						    msg = result.Msg;
						}
						return artDialog.alert(msg, "error");
					}
					switch(order.info.Rtype) {
						case "1":
							$("body").append(result.Body.Result);
							break;
						case "2":
						    $("#weixinPayUrl").attr("src", " http://appweb.uupaotui.com/pages/baseqrcode.ashx?logo=http://files.uupaotui.com/upload/Logo/weixinpay.png&code=" + result.Body.Result);
							layer.open({
								type: 1,
								title: ' ',
								area: ['340px', '448px'],
								content: $('#ewmPay'),
								cancel: function() {
									clearInterval(fun);
								}
							});
							order.weiXinNotify(result.Body.RecCode);
							break;
					    case "0":
                        case "-1":
							artDialog.alert("支付成功", "success", null, function() {
								window.location.reload();
							});
							break;
                            
					}

				}
			});
		}
	}, //确认订单
	checkOrder: function() {
		if(order.info.priceToken == "") {
			// return artDialog.alert("参数错误！","error");
		}
		var mobilereg = /^[1][3,4,5,7,8]\d{9}$/;
		switch(action) {
			case "buy":
				return buyRequired();

			case "send":
				return sendRequired();
			case "take":
				return sendRequired();
			case "takeorder":
				return lineRequired();

		}
		return true;
	}, //检测订单
	sendSmsCode: function() { //发送验证码
		order.packData(action);
		var reg = /^[1][3,4,5,7,8]\d{9}$/;
		if(!reg.test($.trim(order.info.userMobile))) {
			return artDialog.alert("用户手机号不正确！", "error");
		}
		if(order.info.userCode == "") {
			return artDialog.alert("图形验证码不能为空！", "error");
		}

		artDialog.ajax({
			url: "/handler/order.ashx",
			data: {
				action: 101,
				userMobile: order.info.userMobile,
				userCode: order.info.userCode,
				userSmsCode: order.info.userSmsCode
			},
			success: function(result) {
				if(!result.IsError) {
				    Page.SendPhoneCode("sendSmsCode");
				  
				} else {
					artDialog.msg(result.Msg);
				}
			}
		});

	}, //发送短信验证码
	login: function() { //发送验证码
		order.packData(action);
		if(!order.checkOrder()) return false;
		var reg = /^[1][3,4,5,7,8]\d{9}$/;
		if(order.info.userMobile == "") {
			return artDialog.msg("手机号码不能为空！");
			$('#usermobile').focus();
		}
		if(!reg.test($.trim(order.info.userMobile))) {
			return artDialog.msg("用户手机号不正确！");
			$('#usermobile').focus();
		}
		if(order.info.userSmsCode == "") {
			return artDialog.msg("短信验证码不能为空！");
			$('#usersmscode').focus();
		}
		artDialog.ajax({
			url: "/handler/order.ashx?action=102",
			data: {
				userMobile: order.info.userMobile,
				userSmsCode: order.info.userSmsCode
			},
			success: function(result) {
			    if (!result.IsError) {
			        if (!result.Body.IsEnter) {
			            $("#enterbalance").hide();
			        }
					order.price();
					$("#nologin").hide();
					var userInfoObj = $("#userinfo");
					userInfoObj.show();
					$("#userMobile").text(result.Body.Mobile);
					$("#userMobile")
						.attr("href", "http://shanghu.uupaotui.com/Handlers/login.ashx?token=" +
							result.Body.Token +
							"&returnUrl=/");

					$(".pay").eq(0).show();
					$(".pay").eq(1).hide();
				} else {
					artDialog.msg(result.Msg);
				}
			}
		});

	}, //登录
	weiXinNotify: function(reccode) {

		function check() {
			$.ajax({
				url: "/handler/pay.ashx?action=100",
				data: {
					recCode: reccode
				},
				dataType: "json",
				success: function(result) {

					if(!result.IsError) {
						clearInterval(fun);
						window.location.href = '/success.htm?rtype=2&recCode=' + result.Body.TradeCode;
						//layer.alert('支付成功', function(index){
						//    layer.closeAll();
						//});   

					}
				}
			});
		}
		fun = setInterval(check, 1000);
	}, //检测微信支付状态
	getCouponList: function(cityId, minUseLimit, sendType, couponId) {

		artDialog.ajax({
			url: "/handler/order.ashx?action=104",
			success: function(result) {
			    $("#coupon select").empty();
			if (result.IsError) {
			    return;
			}
			    order.info.enterpriseId = result.Body.enterpriseId||0;
				if(result.Body != null) {
					var sb = new StringBuffer();
					sb.append('<option value="-1" selected="selected">请选择优惠券</option>');
					if (result.Body.person.length > 0) {
					    sb.append('<option value="-1">个人优惠券</option>');
					}
					$.each(result.Body.person, function (i, v) {//个人优惠券
						if((cityId == v.CityId || v.CityId == 0) && minUseLimit >= v.MinUseLimit && (v.SendType == -1 || sendType == v.SendType)) {
							sb.append('<option value="');
							sb.append(v.CouponID);
							sb.append('"');
							sb.append(v.CouponID == couponId ? " selected='selected'" : "");
							sb.append('>');
							sb.append("　　"+v.CouponName);
							sb.append('</option>');
						}

					});
					if (result.Body.enterprise.length > 0) {
				        sb.append('<option value="-1">企业优惠券</option>');
				    }
					$.each(result.Body.enterprise, function (i, v) {//w企业优惠券
				        if ((cityId == v.CityId || v.CityId == 0) && minUseLimit >= v.MinUseLimit && (v.SendType == -1 || sendType == v.SendType)) {
				            sb.append('<option value="');
				            sb.append(v.CouponID);
				            sb.append('"');
				            sb.append(v.CouponID == couponId ? " selected='selected'" : "");
				            sb.append('>');
				            sb.append("　　" + v.CouponName);
				            sb.append('</option>');
				        }

				    });
					$("#coupon select").append(sb.toString()).unbind().change(function() {
						order.info.couponId = $(this).val();
						console.info(order.info.couponId);
						$("#coupon select option").removeAttr("selected");
						$(this).find("option[value='" + couponId + "']").attr("selected", "selected");
						order.price(order.info.couponId);
					});
				}

			}
		});
	}, //得到订单可用的优惠券
	loginOut: function() {
		artDialog.ajax({
			url: "/handler/order.ashx?type=logout&action=102",
			success: function(result) {

				layer.open({
					content: '退出成功',
					title: null,
					skin: 'layer-ext-moon',
					icon: 1,
					yes: function(index, layero) {
						window.location.reload();
						layer.close(index);
					},
					cancel: function(index) {
						window.location.reload();
						return false;
					}
				});

			}
		});
	},
	lineTime: function() {
		
		//排队时间操作 分钟
		$(".minutes>.minus")
			.click(function() {
				//if(curday != 7) {
					if(order.info.QueueTime <= timeLimitData.QueueMinTime) {
						$(this).removeClass("active");
						return;
					}
					$(this).addClass("active");
					$(".minutes>.add").addClass("active");
					order.info.QueueTime -= timeLimitData.QueueTimeUnitInterval;
					if(order.info.QueueTime <= timeLimitData.QueueMinTime) {
						$(this).removeClass("active");
					}
					order.price();
					$(".minutes>.text").text(order.info.QueueTime + "分钟");
				//}
			});
		$(".minutes>.add")
			.click(function() {
				//if(curday != 7) {
					if(order.info.QueueTime >= timeLimitData.QueueMaxTime) {
						$(this).removeClass("active ");
						return;
					}
					$(".minutes>.minus").addClass("active");
					order.info.QueueTime += timeLimitData.QueueTimeUnitInterval;
					if(order.info.QueueTime >= timeLimitData.QueueMaxTime) {
						$(this).removeClass("active ");
					}
					order.price();
					$(".minutes>.text").text(+order.info.QueueTime + "分钟");
				//}

			});

	},
	selectAddress:function(addressTile, addressNote, userNote, loc) {//用户选中常用地址
	    if (order.info.AddressType == "start") {
	        order.info.startAddressTitle = addressTile;
	        order.info.startAddressNote = addressNote;
	        $("#startaddress").val(addressTile);
	        $("#startaddressdoor").val(userNote);
	        var gps = loc.split(',');
	        order.info.startAddressLng = gps[0];
	        order.info.startAddressLat = gps[1];
	    }
        else if (order.info.AddressType == "end") {
	        
            order.info.endAddressTitle = addressTile;
            order.info.endAddressNote = addressNote;
            $("#endaddress").val(addressTile);
            $("#endaddressdoor").val(userNote);
            var gps = loc.split(',');
            order.info.endAddressLng = gps[0];
            order.info.endAddressLat = gps[1];
	    }
       
        order.price();
	    $(".history").hide();
	},
    selectShow:function(type,obj) {
        order.info.AddressType = type;

        $(obj).parents('.tag').find('.history').slideToggle();
       	$('body').click(function(e){
		   var $tar = $(e.target);
		    if(!$tar.is($(obj).parents('.tag').find('.history'))){
		        $(obj).parents('.tag').find('.history').slideUp();
		   	}
		});
    }
};
post = {
	agentApply: function() {
			var IntentionCity = $("#IntentionCity");
			if(IntentionCity.val() == "") {

				return artDialog.tips("意向城市不能为空", "#IntentionCity", 1000);
			}
			var Name = $("#Name");
			if(Name.val() == "") {
				return artDialog.tips("姓名不能为空", "#Name", 1000);
			}
			var Phone = $("#Phone");
			if(Phone.val() == "") {
				return artDialog.tips("电话不能为空", "#Phone", 1000);
			}
			var job = $("#job");
			if (job.val() == "") {
			    return artDialog.tips("从事行业不能为空", "#job", 1000);
			}
			//var regP = /^[1][3,4,5,7,8]\d{9}$/;
			//if (!regP.test($.trim(regP))) {
			//    return artDialog.tips("用户手机号不正确！","#Phone", 1000);
			//}
			artDialog.ajax({
				url: "/handler/post.ashx?action=1000",
				data: {
					IntentionCity: IntentionCity.val(),
					Name: Name.val(),
					Phone: Phone.val(),
					job: job.val()
				},
				success: function(result) {
					if(result.IsError) {
						layer.msg(result.Msg, {
							icon: 2
						});
					} else {
						layer.msg('提交成功！', {
							icon: 1
						});
						Name.val("");
						Phone.val("");
						IntentionCity.val("");
						job.val("");
					}

				}
			});
		} ////代理商在线审请
}