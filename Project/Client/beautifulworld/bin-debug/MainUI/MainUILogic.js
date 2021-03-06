var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainUILogic = (function (_super) {
    __extends(MainUILogic, _super);
    function MainUILogic() {
        var _this = _super.call(this) || this;
        _this.midEvent = { MAINUI_MIDBTN_START_TYPE: _this.onBegin, MAINUI_MIDBTN_END_TYPE: _this.onEnd, MAINUI_MIDBTN_UPDATE_TYPE: _this.onGetNewData };
        console.log(">>>>>创建了MainUILogic对象");
        _this.onGetNewData();
        return _this;
    }
    //监听事件：关心的消息广播之后这里就听到了。然后刷新数据
    MainUILogic.prototype.listenEvent = function () {
        AddEventListener(EventType.CLICK_MID_BTN, this.onClickMidBtn, this);
    };
    MainUILogic.prototype.onClickMidBtn = function (e) {
        var type = e.data;
        var func = this.midEvent[type];
        console.log(">>>>处理逻辑,func = ", func, "type = ", type);
        func();
    };
    MainUILogic.prototype.onBegin = function () {
        console.log("开始");
        SendEvent(EventType.UPDATE_MAINUI, { start: true });
    };
    MainUILogic.prototype.onEnd = function () {
        SendEvent(EventType.UPDATE_MAINUI, { stop: true });
    };
    MainUILogic.prototype.onGetNewData = function () {
        console.log(">>>发送请求， 请求链接");
        RES.getResByUrl("http://154.8.151.240:8090/get/image/urls?count=5", this.onGetComplete, this, RES.ResourceItem.TYPE_TEXT);
    };
    // private urlloader:egret.URLLoader; 
    // this.urlloader = new egret.URLLoader(); 
    // private urlreq:egret.URLRequest; 
    // this.urlreq = new egret.URLRequest(); 
    // urlreq.url = "http://httpbin.org/user-agent"; 
    // this.urlloader.load( urlreq ); 
    // this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this); 
    // 	private onComplete(event:egret.Event):void{ 
    // 	console.log(this.urlloader.data); 
    // } 
    MainUILogic.prototype.onGetComplete = function (event) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete", event);
        var data = JSON.parse(event).images;
        console.log(">>>>>>>>>>>>>>>>>>>>>>onGetComplete22...", data);
        for (var i = 0; i < 5; i++) {
            console.log(">>>>data_", i, "[id]= ", data[i]["id"]);
            console.log(">>>>data_", i, "[cerate_at]= ", data[i].cerate_at);
            console.log(">>>>data_", i, "[image_url]= ", data[i].image_url);
        }
        // var img: egret.Texture = <egret.Texture>event;//new egret.Texture();
        SendEvent(EventType.UPDATE_MAINUI, { data: data });
    };
    return MainUILogic;
}(BaseLogic));
__reflect(MainUILogic.prototype, "MainUILogic");
