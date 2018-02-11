/// <reference path="jquery-2.1.4.min.js" />
/// <reference path="jquery.cookie.js" />
/// <reference path="jweixin-1.0.0.js" />
function fenxiang(content1, content2, content3, shareurl, shareimage, openid) {
	try{
	    var tijiaourl = location.href.split('#')[0];
	    var fenxiangcontent = content1;
	    $.post("jssdk.php", { test: "test", tijiaourl: tijiaourl }, function (text) {
	        var data = JSON.parse(text);//把返回的字符串转换成JSON格式的字符串，然后下面分别读取参数到上面声明的变量中以便wx.config使用。
	        timestamp = data.timestamp; rawString = data.rawString;
	        url = data.url; appId = data.appId;
	        signature = data.signature; nonceStr = data.nonceStr;
	        wx.config({
	            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            appId: appId, // 必填，公众号的唯一标识
	            timestamp: timestamp, // 必填，1`生成签名的时间戳
	            nonceStr: nonceStr, // 必填，生成签名的随机串
	            signature: signature,// 必填，签名，见附录1
	            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu', 'showOptionMenu', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'uploadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2，这里我们随便调用一个，如果一个都不调用会报错。
	        });
	        wx.ready(function () {
	        	//yinyue();
	        	 	//var shipin1 = document.getElementById("video1");
		        //shipin1.play();
	            wx.hideOptionMenu();
	            wx.showOptionMenu();
	            var linkinfo = content2;
	            wx.onMenuShareAppMessage({
	                title: content1, // 分享标题
	                desc: content2, // 分享描述
	                link: shareurl, // 分享链接
	                imgUrl: shareimage, // 分享图标
	                type: '', // 分享类型,music、video或link，不填默认为link
	                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                success: function () {
	                    // 用户确认分享后执行的回调函数
	                    //$.post("shuju.php?jieshou=yemian",{"openid":openid,"yemian":"fenxiang","type":"pengyou"},function(text){
	                    //});
	                },
	                cancel: function () {
	                    // 用户取消分享后执行的回调函数
	                }
	            });
	
	            wx.onMenuShareTimeline({
	                title: content3, // 分享标题
	                desc: content3, // 分享描述
	                link: shareurl, // 分享链接
	                imgUrl: shareimage, // 分享图标
	                success: function () {
	                    // 用户确认分享后执行的回调函数
	                    //$.post("shuju.php?jieshou=yemian",{"openid":openid,"yemian":"fenxiang","type":"pengyouquan"},function(text){});
	                    //jQuery.post("qujiangqianyue_Handler.ashx?jieshou=yemian", { openid: openid, yemian: "fenxiang", type: "朋友圈" }, function () {
	                       
	                    //})
	                },
	                cancel: function () {
	                    // 用户取消分享后执行的回调函数
	
	                }
	            });
	            //$("#shipin1").hide();
	           
	            
	            //shipin1.pause();
	        })
	    })
	
		
	}catch(e){
		//TODO handle the exception
//		alert(e.message);
	}

}




