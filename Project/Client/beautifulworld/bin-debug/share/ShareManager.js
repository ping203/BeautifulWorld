var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var g_ShareManager;
function createShareManager(isWxgame, shareMaterials) {
    g_ShareManager = new ShareManager(isWxgame, shareMaterials);
    registAllShare();
}
function shareEnter(params) {
    g_ShareManager.onShareEnter(params);
}
function shareOut(shareType, activityType, customParam, replaceParam) {
    g_ShareManager.onShareOut(shareType, activityType, customParam, replaceParam);
}
function getShareConfig(type) {
    return g_ShareManager.getShareConfig(type);
}
var ShareManager = (function () {
    function ShareManager(isWxgame, shareMaterials) {
        this.shareConfigs = {};
        this.shareObjects = {};
        this.isWxgame = isWxgame;
        var shareMaterial;
        var shareType;
        //初始化分享文案数据			
        for (var i = 0; i < shareMaterials.length; i++) {
            shareMaterial = shareMaterials[i];
            shareType = shareMaterial.type;
            this.shareConfigs[shareType] = this.shareConfigs[shareType] || [];
            this.shareConfigs[shareType].push(shareMaterial);
        }
    }
    //注册分享类
    ShareManager.prototype.registShare = function (shareClassName) {
        if (this.shareObjects[shareClassName] == null)
            this.shareObjects[shareClassName] = new window[shareClassName]();
        else
            console.error("regist class existed. ClassName = ", shareClassName);
    };
    /**
     * 分享统一入口
     * @param shareInfo: "${activityType},${shareType}"  如 ”luffy,KingCircleShare“ 表示的是 海盗王的一圈分享
     * (自带shareType，shareConfigId,shareOwnerId参数)
     */
    ShareManager.prototype.onShareOut = function (shareType, activityType, customParam, replaceParam) {
        // 需要打点	
        /*
        if (activityType)
            SDK_statistics.Statistics(`share_${activityType}_${shareType}`);
        
        let shareObject = this.shareObjects[shareType];
        if (shareObject) {
            let _shareConfig = this.getShareConfig(shareType);
            let _title = _shareConfig.title.replace("$0", util.strSub(dataManager.data.name, 10));
            if (replaceParam != null) {
                for (const key in replaceParam) {
                    _title = _title.replace(key, replaceParam[key]);
                }
            }
            let _query: string = `shareType=WX_${shareType}&shareConfigId=${_shareConfig.id}&shareOwnerId=${InitMark.uid}`;
            if (customParam) {
                for (const key in customParam) {
                    _query += '&' + key + '=' + customParam[key];
                }
            }
            _query += `&friendCode=${InitMark.shareCode}`;


            if(this.isWxgame)
                shareObject.wxShare(_title, _shareConfig.img, _query);
            else
            {
                let _desc: string = _shareConfig.desc.replace("$0", util.strSub(dataManager.data.name, 10));

                let _shareCustomParam = {
                    cp_shareType: shareType,
                    cp_shareConfigId: _shareConfig.id,
                    cp_shareOwnerId: InitMark.uid
                };
                if (customParam) {
                    for (const key in customParam) {
                        _shareCustomParam["cp_" + key] = customParam[key];
                    }
                }

                shareObject.h5Share(_title, _shareConfig.img, _desc, _shareConfig.id, _shareCustomParam);
            }
        } else {
            console.error("PlatformManager error,pls regist share:" + shareType);
        }

        */
    };
    //点击分享链接进入
    ShareManager.prototype.onShareEnter = function (params) {
        var type = params.shareType;
        if (!type) {
            console.error("PlatformManager error,pls regist share:" + type);
            return;
        }
        type = type.substring(3);
        var shareObject = this.shareObjects[type];
        if (!shareObject) {
            console.error("PlatformManager error,pls regist share:" + type);
            return;
        }
        shareObject.shareOwnerId = params.shareOwnerId;
        // if (shareObject.shareOwnerId != InitMark.uid.toString()) {
        // 	shareObject.shareConfigId = params.shareConfigId;
        // 	shareObject.onShareEnter(params);
        // }
    };
    /**
     * 获取分享的配置
     * @param type 分享的类型
     */
    ShareManager.prototype.getShareConfig = function (type) {
        var _shareConfig = {
            "id": "0",
            "category": 1,
            "type": "default",
            "name": "默认",
            "title": "我靠！刚才我竟然挨了一炮！",
            "desc": "没有什么是一炮解决不了的，如果有，那就两炮",
            "img": "",
            "active": true
        };
        // if (this.shareConfigs[type] && this.shareConfigs[type].length > 0) {
        // 	let _maxRand = this.shareConfigs[type].length - 1;
        // 	let _index = _.random(0, _maxRand);
        // 	_shareConfig = this.shareConfigs[type][_index];
        // }
        return _shareConfig;
    };
    return ShareManager;
}());
__reflect(ShareManager.prototype, "ShareManager");
//注册所有分享事件
function registAllShare() {
    g_ShareManager.registShare("BoaterHireShare"); //船员招募分享
    g_ShareManager.registShare("BoaterRecallShare"); //船员召回分享
    g_ShareManager.registShare("BoaterHireShare2"); //船员招募分享
    // 注册海盗王分享
    g_ShareManager.registShare("KingBarrierShare"); //海盗王障碍物分享
    g_ShareManager.registShare("KingCircleShare"); //海盗王达成一圈分享
}
