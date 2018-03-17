//========带排队 时间=============//

var day = 0;
var hour = 0;
var min = 30;
$(function() {
		selectInp($('#timeDay'));
		selectInp($('#timeHour'));
		selectInp($('#timeMinute'));
		
		//模拟滚动条
		$(".down-box").niceScroll({
			styler: "fb",
			cursorcolor: "#ff8b03",
			cursorwidth: '3',
			cursorborderradius: '0',
			autohidemode: 'false',
			background: '#FFFFFF',
			spacebarenabled: false,
			cursorborder: '0'
		});
	})
	//========带排队 时间=============//
function selectInp(obj) {
	var parents = obj.parents('.timer');
	var child = parents.find('.down-box a');
	var value = "";

	obj.click(function() {
		parents.find('.down-box').show();
		parents.siblings().find('.down-box').hide();
	});

	child.click(function() {
	    if (obj.attr('id') == 'timeDay') {
	        day = parseFloat($(this).data('val'));
			value = day + "天";
			if($(this).data('val') == 7) {
				$('#timeHour').val("0小时").attr('disabled', 'disabled');
				$('#timeMinute').val("0分钟").attr('disabled', 'disabled');
			} else {
				$('#timeHour').removeAttr('disabled');
				$('#timeMinute').removeAttr('disabled');
			}
		
	    } else if (obj.attr('id') == 'timeHour') {

	        $(this).addClass("selected").siblings().removeClass("selected");
	        hour = parseFloat($(this).data('val'));
	        console.info(hour);
			value = $(this).data('val') + "小时";
		
		} else {
	        if ((($('#timeHour').val() != "") && ($('#timeHour').val() != "0小时")) || (($('#timeDay').val() != "") && ($('#timeDay').val() != "0天"))) {
	            min = parseFloat($(this).data('val'));
				value = $(this).data('val') + "分钟";
			} else {
				if($(this).data('val') > 0) {
					value = $(this).data('val') + "分钟";
				} else {
					
				}
			}
	    }
	    obj.val(value);
	    order.info.QueueTime = (day * 24 * 60) + (hour * 60) + min;
	    if (order.info.QueueTime < 30) {
	        artDialog.alert("排队时常不能小于30分钟", "error");
	        order.info.QueueTime = 30;
	        $("#timeMinute").val("30分钟")
	    } 
	        order.price();
	        parents.find('.down-box').hide();
	    
	
	});
	
	$('body').click(function(e){
	   var $tar = $(e.target);
	    if(!$tar.is('.inp')){
	        parents.find('.down-box').hide();
	   	}
	});
}