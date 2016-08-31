$(function(){
	//导航search模块菜单切换
	(function(){
		var aLi=$('#menu li');
		var arrText=[
		'例如：荷塘鱼访烧鱼或樱花日本料理',
		'例如：昌平区育新站龙旗广场2号楼609室',
		'例如：万达影院双人情侣券',
		'例如：东莞出事了，大老鼠是谁？',
		'例如：武汉初春降雪，天气变幻莫测'
		];
		var iNow=0;
		var oText=$('#search').find('.form .text');
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				oText.val(arrText[index]);
				iNow=index;
			});
		});

		oText.focus(function(){
			if($(this).val()==arrText[iNow]){
				$(this).val('');
			}
		});
		oText.blur(function(){
			if($(this).val()==''){
				$(this).val(arrText[iNow]);
			}
		});
	})();
	//导航search模块信息滚动
	(function(){
		var iH=0;
		var str='';
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
		var oDiv=$('.update');
		var oUl=$('.update').find('ul');
		var iNow=0;
		var updateUp=$('#update_up');
		var updateDown=$('#update_down');
		var timer=null;
		for(var i=0;i<arrData.length;i++){
			str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span>写了一篇新文章：'+arrData[i].title+'</a></li>';

		}
		oUl.html(str);
		iH=oUl.find('li').height();
		// console.log(iH);
		updateUp.click(function(){
			doMove(-1);
		});

		updateDown.click(function(){
			doMove(1);
		});

		oDiv.hover(function(){
			clearInterval(timer);
		},autoPlay);

		autoPlay();
		function autoPlay(){
			timer=setInterval(function(){
				doMove(-1);
			},2000);
		}

		function doMove(num){
			iNow+=num;
			if(Math.abs(iNow)>=arrData.length){
				iNow=0;
			}
			if(iNow>0){
				iNow=-(arrData.length-1);
			}
			oUl.stop().animate({'top': iH*iNow},1500,'elasticOut');
		}
	})();
	//选项卡的切换
	(function(){
		option($('.tab_nav1'),$('.tab_con1'),'click');
		option($('.tab_nav2'),$('.tab_con2'),'click');
		option($('.tab_nav3'),$('.tab_con3'),'mouseover');
		option($('.tab_nav4'),$('.tab_con4'),'mouseover');
		function option(oNav,oCon,sEvent){
			var aTab = oNav.children();
			oCon.hide().eq(1).show();
			aTab.each(function(index){
				
				$(this).on(sEvent,function(){
					aTab.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aTab.find('a').removeClass('triangle_down_red').addClass('triangle_down_gray');
					$(this).find('a').removeClass('triangle_down_gray').addClass('triangle_down_red');

					oCon.hide().eq(index).show();
				});
				
			});
		}
	})();
	//焦点图切换
	(function(){
		var aUlLi=$('#fade').find('ul li');
		var aOlLi=$('#fade').find('ol li');
		var iNow=1;
		var timer=null;
		var oP=$('#fade').find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		Fnfade();
		autoPlay();

		aOlLi.each(function(i){
			$(this).click(function(){
				iNow=i;
				Fnfade();
			});
		});

		$('#fade').hover(function(){clearInterval(timer);},autoPlay);

		function autoPlay(){
			timer=setInterval(function(){
				iNow++;
				iNow%=arr.length;
				Fnfade();
			},1000);
		}

		function Fnfade(){
			aUlLi.eq(0).fadeIn().css('zIndex',2);
			aUlLi.each(function(i){
				if(i != iNow){
					aUlLi.eq(i).fadeOut().css('zIndex',1);
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(i).fadeIn().css('zIndex',2);
					aOlLi.eq(i).addClass('active');
				}
				oP.text(arr[iNow]);
			});
		}
	})();
	//日历
	(function(){
		var aSpan=$('.calendar').find('h3 span');
		var aImg=$('.calendar').find('.img');
		var oDiv=$('.today_info');
		var oImg=oDiv.find('img');
		var oStrong=oDiv.find('strong');
		var oP=oDiv.find('p');
		aImg.hover(function(){
			oDiv.show();
			var iTop=$(this).parent().position().top-30;
			var iLeft=$(this).parent().position().left+50;
			var index=$(this).parent().index()%aSpan.length;

			oDiv.show().css({'top':iTop, 'left': iLeft});
			oImg.attr('src',$(this).attr('src'));
			oStrong.text( aSpan.eq(index).text() );
		},function(){
			oDiv.hide();
		});
	})();
	//bbs
	(function(){
		var aLi = $('.bbs ol li');
		aLi.hover(function(){
			aLi.removeClass('active');
			$(this).addClass('active');
		});
	})();
	// 红人烧客
	(function(){
		var aLi=$('.hot_area li');
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		aLi.mouseover(function(){
			if($(this).index()==0) return;
			aLi.find('p').remove();
			$(this).append('<p style="width: '+($(this).width()-12)+'px; height:'+($(this).height()-12)+' px">'+arr[$(this).index()]+'</p>');
			
		});
	})();
});