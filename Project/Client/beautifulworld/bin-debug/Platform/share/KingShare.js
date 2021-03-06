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
/**
* Created by liuyang
* Copyright (c) 2017 HortorGames. All rights reserved.
*/
var game;
(function (game) {
    //----------------触礁等待 分享------------------
    var KingBarrierShare = (function (_super) {
        __extends(KingBarrierShare, _super);
        function KingBarrierShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KingBarrierShare.prototype.onShareSuc = function () {
            _super.prototype.onShareSuc.call(this);
            //MainUIView.getInstance().closeView(ui.PirateKingEventMediator.NAME);
        };
        KingBarrierShare.prototype.onShareEnter = function (params) {
            egret.log("kingShare透传参数为:", params);
            if (params && params.luffyShareToken) {
                //URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
                // new TextPop(data.message);
                // });
            }
        };
        return KingBarrierShare;
    }(game.GameShare));
    game.KingBarrierShare = KingBarrierShare;
    __reflect(KingBarrierShare.prototype, "game.KingBarrierShare");
    //----------------达成一圈 分享------------------
    var KingCircleShare = (function (_super) {
        __extends(KingCircleShare, _super);
        function KingCircleShare() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KingCircleShare.prototype.onShareSuc = function () {
            _super.prototype.onShareSuc.call(this);
        };
        KingCircleShare.prototype.onShareEnter = function (params) {
            egret.log("kingShare透传参数为:", params);
            // if (params && params.luffyShareToken) {
            // URLGetRequest.init(ServerMsg.PIRATEKING_SHARE_NOTIFY, "uid=" + InitMark.uid + "&luffyShareToken=" + params.luffyShareToken, (data) => {
            //   new TextPop(data.message);
            // });
            //}
        };
        return KingCircleShare;
    }(game.GameShare));
    game.KingCircleShare = KingCircleShare;
    __reflect(KingCircleShare.prototype, "game.KingCircleShare");
})(game || (game = {}));
//# sourceMappingURL=KingShare.js.map