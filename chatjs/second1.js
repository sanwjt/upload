/// <reference path="createjs.js" />
/// <reference path="jquery-2.1.4.min.js" />
var ContainerLG;
//var ContainerTuAn = new createjs.Container;
var ContainerResult = new createjs.Container;

var LoadPhoto = function () {
    var stageLG = new createjs.Stage("gameview_zp");
    ContainerLG = new createjs.Container;
    /////////////////////////启动触摸
    createjs.Touch.enable(stageLG);
    var queueLG = new createjs.LoadQueue();
    queueLG.loadManifest([
//      { src: "image2/haibao"+curimg+".png", id: "haibao" },
//      { src: "image2/haibao2.jpg", id: "haibao2" },
        { src: "mod-1.png", id: "bg1" },
//      { src: "image2/haibao4.jpg", id: "haibao4" },
//      { src: "image2/haibao5.jpg", id: "haibao5" },
    ], true, "chatimage/")

    queueLG.on("complete", handleComplete, this);

    function handleComplete() {
        LoadLG();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", function (event) {
            stageLG.update();
        })
    }
    var kgbW = 500;
    var kgbH = 500;
    var LoadLG = function () {
    	ContainerLG.removeAllChildren();
    	ContainerResult.removeAllChildren();
    	ContainerLG = new createjs.Container;
    	ContainerResult = new createjs.Container;
    	
    	stageLG.addChild(ContainerLG);
    	
    	var shape = new createjs.Shape();
    	shape.graphics.beginFill("black").drawRect(0,0,bgW,bgH);
    	shape.alpha = 0.01;
    	
    	var haibao = new createjs.Bitmap(document.getElementById("haibao"+curImg));
    	haibao.x = haibao.y = 0;
    	
        var photo_lg = new createjs.Bitmap(document.getElementById("demb"));
//      var photo_lg = new createjs.Bitmap(queueLG.getResult("wenzi13"));
        photo_lg.x = 100; photo_lg.y = 100;
        var nowW, nowH;
        //alert(fxlg);
//        if (fxlg == "1") { alert("您选择的照片方向为横向2拍摄，此为测试提示，请忽略！") }
//        if (fxlg == "3") { alert("您选择的照片方向为横向1拍摄，此为测试提示，请忽略！") }
//        if (fxlg == "6") { alert("您选择的照片方向为竖向拍摄，此为测试提示，请忽略！") }
//        if (fxlg == null) { alert("您选择的是非拍摄图片，此为测试提示，请忽略！") }
        if (fxlg == "6") {
            photo_lg.rotation = 90;
            photo_lg.x += photo_lg.getBounds().height * photo_lg.scaleY;

            nowW = lgH * photo_lg.scaleY;//当前图片宽
            nowH = lgW * photo_lg.scaleX;//当前图片高

            var bili = kgbW / nowW;
            photo_lg.scaleX = photo_lg.scaleY = bili;
            var ydX = nowW * (1 - bili);
            photo_lg.x -= ydX;
        }
        try {
            if (fxlg == "3") {
                photo_lg.rotation = 180;
                photo_lg.x += photo_lg.getBounds().width * photo_lg.scaleX;
                photo_lg.y += photo_lg.getBounds().height * photo_lg.scaleY;

                nowW = lgW * photo_lg.scaleX;
                nowH = lgH * photo_lg.scaleY;
                var bili = kgbW / nowW;
                photo_lg.scaleX = photo_lg.scaleY = bili;
                photo_lg.x -= nowW * (1 - bili);
                photo_lg.y -= nowH * (1 - bili);

                nowW = lgW * photo_lg.scaleX;
                nowH = lgH * photo_lg.scaleY;
                //alert(nowW + "->" + nowH);
                if (nowW <= (kgbW / kgbH) * nowH) {
                    photo_lg.scaleX = photo_lg.scaleY = kgbH / lgH;
                    var ydX = kgbW - photo_lg.getBounds().width * photo_lg.scaleX;
                    photo_lg.x += ydX / 2;
                }
                else {
                    photo_lg.scaleX = photo_lg.scaleY = kgbW / lgW;
                    var ydY = kgbH - photo_lg.getBounds().height * photo_lg.scaleY;
                    photo_lg.y += ydY / 2;
                }

            }
        }
        catch (err) {
            alert(err.message);
        }
        try {
            if (fxlg == "1") {
                nowW = lgH * photo_lg.scaleY;//当前图片宽
                nowH = lgW * photo_lg.scaleX;//当前图片高
                if (nowW <= (kgbW / kgbH) * nowH) {
                    photo_lg.scaleX = photo_lg.scaleY = kgbW / lgH;
                    var ydY = kgbH - photo_lg.getBounds().height * photo_lg.scaleY;
                    //photo_lg.y += ydY / 2;
                }
                else {
                    photo_lg.scaleX = photo_lg.scaleY = kgbH / lgW;
                    var ydX = kgbW - photo_lg.getBounds().width * photo_lg.scaleX;
                    //photo_lg.x += ydX / 2;
                }
            }
        }
        catch (err) {
            //alert(err);
        }

        try {
            if (fxlg == "undefined" || fxlg == null) {
                //alert(1223);
                nowW = photo_lg.getBounds().width * photo_lg.scaleX;//当前图片宽
                nowH = photo_lg.getBounds().height * photo_lg.scaleY;//当前图片高
                if (nowW <= (kgbW / kgbH) * nowH) {
                    photo_lg.scaleX = photo_lg.scaleY = kgbH / nowW;
                    var ydX = kgbW - photo_lg.getBounds().width * photo_lg.scaleX;
                    //photo_lg.x += ydX / 2;
                }
                else {
                    photo_lg.scaleX = photo_lg.scaleY = kgbW / nowH;
                    var ydY = kgbH - photo_lg.getBounds().height * photo_lg.scaleY;
                    //photo_lg.y += ydY / 2;
                }
            }
        }
        catch (err) {
            //alert(err);
        }
//      jQuery.cookie("imgck", "1");//标志已经获取了图片
		zpsc = true;
		stageLG.addChild(shape);
        ContainerLG.addChild(photo_lg);
        stageLG.addChild(ContainerResult);
		ContainerResult.addChild(ContainerLG,haibao);
//		$(".shoushitishi_div").show();
//		$(".shengcheng").show();
		$(".hbdiv,.shangchuantishi,.zhaopiandiv,#zhaopian1").hide();
		$(".btn_queding").show();
		
		ContainerResult.scaleX = ContainerResult.scaleY = 1;
		ContainerResult.x = 750 * 0;
		ContainerResult.y = 1206 * 0;
		
		//466 748
		var kuangshape = new createjs.Shape();
		kuangshape.graphics.beginFill("red").drawRect(750 * 0.03,1206 * 0.03,750*1,1206*0.92);
		kuangshape.alpha = 0.5;
		ContainerLG.mask = kuangshape;
//		ContainerResult.addChild(kuangshape);


    }
}
