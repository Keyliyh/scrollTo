/**
	* 平滑滚动到指定位置
	* @param : target string||object 
	* @example : $.scrollTo($('#desID'));
	* 	     $.scrollTo('300px');
	* 	     $scrollTo('300px');
	* @version 1.0
	* @date 2015-10-19 15:09:57
	* @author YJC
	* @github https://github.com/52fhy/scrollTo
	*/
;(function(window, $){
	'use strict';
	
	var $scrollTo;
	var timer = null;
	var scrollTop = 0;
	
	window.onscroll=function(){
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	};
	
	$scrollTo = function(target) {
		var destOffsetTop = 0;
		if(typeof target == 'string'){
			destOffsetTop = target;
		}else if(typeof target.offset == 'function'){
			var destOffsetTopObj = target.offset();
			destOffsetTop = destOffsetTopObj.top;
		}else if(target.top != undefined){
			destOffsetTop = target.top;
		}else{
			throw 'param target error!';
		}

		clearInterval(timer);
		timer = setInterval(function(){
			var now	= scrollTop;
			var speed = (destOffsetTop - now) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(scrollTop == destOffsetTop){
				clearInterval(timer);
			}
			document.documentElement.scrollTop = scrollTop + speed;
			document.body.scrollTop = scrollTop + speed;
		}, 30);
	};
	
	if($ != undefined){
		$.fn.scrollTo = $.scrollTo = $scrollTo;
	}
	
	window.$scrollTo = $scrollTo; //支持$scrollTo('300px');纯js用法
})(window, window.jQuery || window.Zepto || undefined);
