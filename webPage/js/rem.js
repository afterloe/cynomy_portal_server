(function(doc,win){
			var docEl = doc.documentElement,resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function(){
				var clientWidth = docEl.clientWidth;
				if(!clientWidth) return;
				if(clientWidth>=640){
					docEl.style.fontSize = '100px'; //1rem  = 100px
				}
				else{
					docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
				}
			};
			if (!doc.addEventListener) return;
	        win.addEventListener(resizeEvt, recalc, false);
	        doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window);


// 匿名函数的调用： 
// ()()
 //获取屏幕的宽度