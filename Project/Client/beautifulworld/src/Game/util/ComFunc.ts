/**
 * Created by zhouchuang on 16/9/9.
 */
namespace game {
    export class ComFunc {
        public static unitArr: Array<string> = ["", "K", "M", "B"];
        public static constNum: number = 3;

        public static formatNumber(value: number): string {
            if (value < 1 && value > 0) {
                return 1 + "";
            }
            value = Math.floor(value);
            var exp = Math.floor(ComFunc.getExponent(value));
            if (exp < 13) {
                if (exp < 4) {
                    return value + "";
                }

                var unitIt = Math.floor(exp / ComFunc.constNum);
                var rem = exp % ComFunc.constNum;
                var numStr = String(value / Math.pow(10, unitIt * ComFunc.constNum)).substr(0, ComFunc.constNum + rem);
                return numStr + ComFunc.getUnit(exp);
            } else {
                var _num = value / Math.pow(10, exp);
                return _num.toFixed(3) + "e" + exp;
            }
        }

        public static getUnit(exp: number): string {
            var unitIt = Math.floor(exp / ComFunc.constNum);
            if (exp < 13) {
                return ComFunc.unitArr[unitIt];
            } else {
                var unitIt = Math.floor(exp / ComFunc.constNum);
                return "e" + unitIt * ComFunc.constNum;
            }
        }

        static getExponent(value) {
            var exp = 0;
            while (value >= 10) {
                exp++;
                value /= 10;
            }
            return exp;
        }

        //转化成千位，号分隔
        static toThousands(num) {
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }

        /**
         * 去除字符串的空格
         * @param str
         * @param is_global  是否需要去除中间的空格 :boolean
         * @returns {string|void}
         */
        static trim(str: string, is_global?: boolean): string {
            let _result = str.replace(/(^\s*)|(\s*$)/g, "");
            if (is_global) {
                _result = _result.replace(/\s/g, "");
            }
            return _result;
        }

        static setCookie(c_name, value, expires?) {
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + expires);
            document.cookie = c_name + "=" + encodeURIComponent(value) + ((expires == null) ? "" : ";expires=" + exdate.toUTCString());
        }

        static getCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return decodeURIComponent(document.cookie.substring(c_start, c_end))
                }
            }
            return null;
        }

        static delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }

        static getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }

        static invokeCallback(cb, param?) {
            if (!!cb && typeof cb === 'function') {
                cb.apply(null, Array.prototype.slice.call(arguments, 1));
            }
        }

        static randomReal(min, max) {
            // if (_.isArray(min)) {
            //     max = min[1];
            //     min = min[0];
            // }
            return Math.random() * (max - min) + min;
        }

        static randomInt(min, max) {
            // if (_.isArray(min)) {
            //     max = min[1];
            //     min = min[0];
            // }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        static randomRate(rate) {
            return Math.random() < rate;
        }

        static groupBy(obj, key1, key2) {
            var ret = {};
            // _.each(obj, function (meta) {
            //     ret[meta[key1]] = ret[meta[key1]] || {};
            //     ret[meta[key1]][meta[key2]] = meta;
            // });
            return ret;
        }

        static formatTime(sec: any, showHour?: any) {
            var day = Math.floor(sec / 3600 / 24);
            if (day > 0) {
                return day + "天";
            }

            var hour = Math.floor(sec / 3600);
            var second = Math.floor(sec % 3600);
            var minute = Math.floor(second / 60);
            second = second % 60;
            var hourToMinute = hour * 60;
            minute = showHour ? minute : (hourToMinute + minute);
            if (showHour && sec < 0) {
                return "00:00:00"
            }
            if (sec < 0) {
                return "0";
            }
            var str = "";
            if (showHour) {
                if (showHour != "auto" || hour != 0) {
                    if (hour >= 10) {
                        str = hour.toString();
                    } else {
                        str = "0" + hour;
                    }
                    str = str + ":";
                }
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + ":" + second;
            } else {
                str = str + ":0" + second;
            }
            return str;
        }

        static formatTimeCN(sec: any, showHour?: any) {
            var day = Math.floor(sec / 3600 / 24);
            if (day > 0) {
                return day + "天";
            }

            var hour = Math.floor(sec / 3600);
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);
            if (sec < 0) {
                return "0";
            }
            var str = "";
            if (hour != 0) {
                if (hour >= 10) {
                    str = hour.toString();
                } else {
                    str = "0" + hour;
                }
                str = str + "小时";
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + "分" + second;
            } else {
                str = str + "分0" + second;
            }
            str = str + "秒";
            return str;
        }

        static formatTimeCNAll(sec: any, showHour?: any) {
            var day = Math.floor(sec / 3600 / 24);
            var hour = Math.floor(sec / 3600) - day * 24;
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);
            if (sec < 0) {
                return "0";
            }
            var str = "";
            if (day > 0) {
                str = day + "天";
            }
            if (hour != 0) {
                var _hour = "";
                if (hour >= 10) {
                    _hour = hour.toString();
                } else {
                    _hour = "0" + hour;
                }
                str += (_hour + "小时");
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + "分" + second;
            } else {
                str = str + "分0" + second;
            }
            str = str + "秒";
            return str;
        }

        static isLocalServer() {
            return ComFunc.getQueryString('d') == '1';
        }

        // static isLocalClient() {
        //     return location.hostname == 'localhost'
        // }

        static isQAServer() {
            return ComFunc.getQueryString('d') == '2';
        }

        static isOnlineServer() {
            return !ComFunc.isLocalServer() && !ComFunc.isQAServer();
        }

        static stopEvent(obj: any): void {
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
                e.stopPropagation();
            }, this);
        }

        /**
         *  1小时内显示    =====》  上次活跃：刚刚
         *  超过1小时，小于24小时  =====》上次活跃：n小时前
         *  超过24小时  =====》上次活跃：n天前
         *  超过30天 ---》上次活跃:30天前
         * @param unixTime unix时间磋
         * @returns {string}
         */
        static showTimeBefore(unixTime): string {
            let _str: string = "刚刚";
            // var _diffMon = moment().month() - moment.unix(unixTime).month();
            // var _diffDate = moment().date() - moment.unix(unixTime).date() + _diffMon * 30;
            // if (_diffDate < 1) {
            //     var _diffHour = moment().hour() - moment.unix(unixTime).hour();
            //     if (_diffHour > 1) {
            //         _str = _diffHour + "小时前";
            //     }
            // } else {
            //     _diffDate = _diffDate > 30 ? 30 : _diffDate;
            //     _str = _diffDate + "天前";
            // }
            return _str;
        }

        /**
         * 以间隔的秒数判断时间
         * @param unixTime
         * @returns {string}
         */
        static showTimeBeforeNew(unixTime): string {
            let _str: string = "刚刚";
            // let _diffSecond = moment().unix() - unixTime;
            // let _diffMinute = Math.floor(_diffSecond / 60);
            // let _diffHour = Math.floor(_diffSecond / 60 / 60);
            // let _diffDay = Math.floor(_diffSecond / 60 / 60 / 24);
            // if (_diffDay < 1) {
            //     if (_diffHour < 1) {
            //         if (_diffMinute > 0) {
            //             _str = _diffMinute + "分钟前";
            //         }
            //     } else {
            //         _str = _diffHour + "小时前";
            //     }
            // } else {
            //     _diffDay = _diffDay > 30 ? 30 : _diffDay;
            //     _str = _diffDay + "天前";
            // }
            return _str;
        }

        /**
         * 以间隔的秒数判断时间
         * @param unixTime
         * @returns {string}
         */
        static showTimeNormal(unixTime): string {
            let _str: string = "";
            let _monthDay = 30;
            // let _lastMonth = moment.unix(unixTime).month();
            // var _diffMon = moment().month() - _lastMonth;
            // if (_lastMonth == 1) {
            //     _monthDay = 28;
            // } else if (_lastMonth == 0 || _lastMonth == 2 || _lastMonth == 4 || _lastMonth == 6 || _lastMonth == 7 || _lastMonth == 9 || _lastMonth == 11) {
            //     _monthDay = 31;
            // }

            // var _diffDate = moment().date() - moment.unix(unixTime).date() + _diffMon * _monthDay;
            // if (_diffDate < 1) {
            //     var minutes = moment.unix(unixTime).minute();
            //     if (minutes < 10) {
            //         var _minutes = "0" + minutes;
            //     } else {
            //         var _minutes = minutes + "";
            //     }
            //     _str = moment.unix(unixTime).hour() + ":" + _minutes;
            // } else if (_diffDate == 1) {
            //     var minutes = moment.unix(unixTime).minute();
            //     if (minutes < 10) {
            //         var _minutes = "0" + minutes;
            //     } else {
            //         var _minutes = minutes + "";
            //     }
            //     _str = "昨天" + moment.unix(unixTime).hour() + ":" + _minutes;
            // } else {
            //     _str = _diffDate + "天前";
            // }
            return _str;
        }

        /**
         * 显示距离上次的时间
         * @param sec 秒数
         * @returns {string}
         */
        static showElapseTime(sec: number): string {
            let _str = "刚刚";
            let _diffSecond = sec;
            let _diffMinute = Math.floor(_diffSecond / 60);
            let _diffHour = Math.floor(_diffSecond / 60 / 60);
            let _diffDay = Math.floor(_diffSecond / 60 / 60 / 24);
            if (_diffDay < 1) {
                if (_diffHour < 1) {
                    if (_diffMinute > 0) {
                        _str = _diffMinute + "分钟前";
                    }
                } else {
                    _str = _diffHour + "小时前";
                }
            } else {
                _diffDay = _diffDay > 30 ? 30 : _diffDay;
                _str = _diffDay + "天前";
            }

            return _str;
        }

        static isEmojiCharacter(substring): any {
            var _emoji = 0;
            var emojiIndex = [];
            for (var i = 0; i < substring.length; i++) {
                var hs = substring.charCodeAt(i);
                if (0xd800 <= hs && hs <= 0xdbff) {
                    if (substring.length > 1) {
                        var ls = substring.charCodeAt(i + 1);
                        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                        if (0x1d000 <= uc && uc <= 0x1f77f) {
                            emojiIndex.push(i);
                            i++;
                            _emoji++;
                        }
                    }
                } else if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    if (ls == 0x20e3) {
                        emojiIndex.push(i);
                        i++;
                        _emoji++;
                    }
                } else {
                    if (0x2100 <= hs && hs <= 0x27ff) {
                        emojiIndex.push(i);
                        _emoji++;
                    } else if (0x2B05 <= hs && hs <= 0x2b07) {
                        emojiIndex.push(i);
                        _emoji++;
                    } else if (0x2934 <= hs && hs <= 0x2935) {
                        emojiIndex.push(i);
                        _emoji++;
                    } else if (0x3297 <= hs && hs <= 0x3299) {
                        emojiIndex.push(i);
                        _emoji++;
                    } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                        || hs == 0x2b50) {
                        emojiIndex.push(i);
                        _emoji++;
                    }
                }
            }
            console.log(emojiIndex);
            return emojiIndex;
        }

        /**
         * 改变的时候，显示放大缩小效果
         * @param node
         */
        static showChangeEffect(node: any): void {
            let _tw = egret.Tween.get(node);
            _tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 100).call(() => {
                if (node && node.parent) {
                    egret.Tween.removeTweens(node);
                }
            });
        }

        /**
         * http特殊字符转义
         * @param n
         * @returns {string|any}
         */
        static enCodeHtml(n): any {
            n = n.replace(/%/g, "%25");
            n = n.replace(/\+/g, "%2B");
            n = n.replace(/\//g, "%2F");
            n = n.replace(/\?/g, "%3F");
            n = n.replace(/\#/g, "%23");
            n = n.replace(/\&/g, "%26");
            n = n.replace(/\=/g, "%3d");
            return n;
        }

        /**
         * http特殊字符转义
         * @param n
         * @returns {string|any}
         */
        static unCodeHtml(n): any {
            n = n.replace(/%25/g, "%");
            n = n.replace(/%2B/g, "+");
            n = n.replace(/%2F/g, "/");
            n = n.replace(/%3F/g, "?");
            n = n.replace(/%23/g, "#");
            n = n.replace(/%26/g, "&");
            n = n.replace(/%3d/g, "=");
            return n;
        }

        static formatTimeMS(sec: any) {
            sec = sec / 1000;
            if (sec < 0) {
                return "";
            }
            let str: string = "";
            var hour = Math.floor(sec / 3600);
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);

            if (hour >= 10) {
                str += hour.toString() + ":";
            } else {
                str += "0" + hour + ":";
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + ":" + second;
            } else {
                str = str + ":0" + second;
            }
            return str;
        }

        //金币播放特效的时候，金币的个数
        public static getWheelGoldEffectNum(num: number): number {
            let _num = 10;
            if (num > 10000 && num <= 25000) {
                _num = 17;
            } else if (num > 25000 && num <= 50000) {
                _num = 25;
            } else if (num > 50000) {
                _num = 30;
            }
            return _num;
        }

        /**
         * 检测是否是小游戏中 IOS 可以充值
         * return false->可以充值  true->>不能充值
        */
        public static checkIOSPay() {
            return gateModel.isWxgame && !Const.PayInterFaceId && initModel.mobileSystem == Const.IOS;
        }

        public static isShowPayNode(node: any): void {
            if (game.ComFunc.checkIOSPay()) {
                node.visible = false;
            } else {
                node.visible = true;
            }
        }

        /**
         * 弹窗
         * @param desc 文字描述
         * @param title 标题
         * @param cb 回调函数
         * @param btnLabel 按钮上面的字
         * @constructor
         */
        public static PopConfirmView(desc: string, title?: string, cb?: any, btnLabel?: string, parentLayer?: string): void {
            console.log("PopConfirmView == ", desc, title)
            // MainUIView.getInstance().showView(new ui.PopConfirmView(desc, title, cb, btnLabel), ui.PopConfirmMediator.NAME, true, parentLayer);
        }

        /**
          * 弹窗
          * @param desc 文字描述
          * @param title 标题
          * @param cb 回调函数
          * @param btnLabel 按钮上面的字
          * @constructor
          */
        public static PopConfirmWithIconView(desc: any, title?: string, cb?: any, btnLabel?: string): void {
            console.log(">>>>>PopConfirmWithIconView ", desc, title)
            // MainUIView.getInstance().showView(new ui.PopConfirmWithIconView(desc, title, cb, btnLabel), ui.PopConfirmWithIconMediator.NAME, true);
        }

        /**
        * 带头像的弹窗,描述文本过长请适当加\n换行
        * @param desc 文字描述， 富文本传textFlow，普通文本传string
        * @param title 标题
        * @param btnLabel 按钮上面的字
        * @constructor
        */
        public static PopConfirmWithHeadView(playerInfo: any, desc, cb = null, title: string = "common_json.tjtc_txt_yqts"): void {
            TsEngine.WindowManager.showWindow(game.WindowType.WINDOW_COMWITHHEADPANEL, { playerInfo: playerInfo, desc: desc, cb: cb, title: title });
        }

        /**
         * 获取视频奖励
         */
        public static videoReward(type: string): void {
            let _type = 0;
            // _type 1每日能量 2 能量不足
            switch (type) {
                case game.AdType.adUnitId_dailyEnergy:
                    dailyModel.dailyEventInfo.dailyEnergyADRemain--;
                    let mediator = TsEngine.WindowManager.getWindow(WindowType.GROUP_DAILYREWARD)
                    if (mediator) {
                        mediator["dailyEnergy"].initVideo();
                    }
                    _type = 1;
                    break;
                case game.AdType.adUnitId_noEnergy:
                    dailyModel.dailyEventInfo.zeroEnergyADRemain--;
                    _type = 2;
                    break;
            }

            if (_type < 1) return;

            HttpService.post(ServerMsg.AD_REWARDS, `uid=${playerModel.uid}&type=${_type}`, (data) => {
                EventCenter.sendEvent(EventConst.EnergyChange);
                TsEngine.WindowManager.showWindow(WindowType.WINDOW_REWARD, data);
            })
        }

        /**
         * 计数单位：天，小时，分钟

        超过24小时显示为XX天XX时（例如：12天23时）

        小于24小时显示为XX时XX分（例如：22时52分）

        小于1小时显示为XX分XX秒（例如：53分25秒）
        * @param sec
        * @returns {any}
        */
        public static formatTimeCNNew3(sec: number): string {
            if (sec < 0) {
                return "";
            }
            let str: string = "";
            let day = Math.floor(sec / 3600 / 24);
            let hour = Math.floor(sec / 3600);
            let minute = Math.floor(sec / 60);
            let second = sec;
            if (day > 0) {
                sec = sec % (24 * 3600);
                hour = Math.floor(sec / 3600);

                str += day + "天";
                str += hour >= 10 ? hour + "时" : "0" + hour + "时";

            } else if (hour > 0) {
                minute = Math.floor((sec % 3600) / 60);
                str += hour >= 10 ? hour + "时" : "0" + hour + "时";
                str += minute >= 10 ? minute + "分" : "0" + minute + "分";
            } else {
                if (minute > 0) {
                    str += minute >= 10 ? minute + "分" : "0" + minute + "分";
                    second = Math.floor((sec % 3600) % 60);
                    str += second >= 10 ? second + "秒" : "0" + second + "秒";
                } else {
                    str += "00分";
                    str += second >= 10 ? second + "秒" : "0" + second + "秒";
                }
            }


            return str;
        }

        //用户头像（有0、46、64、96、132数值可选，0代表640*640正方形头像）
        public static headImg(url: string, size?: number): string {
            //console.log("todo:获取头像的接口")
            if (!url) {
                return "head_recallBg_png";
            }
            const headVersion = "?v=1.0.7";
            let _index = url.indexOf("");
            if (_index != -1) {
                return url;
            } else if (url == "/0" || url == "") {
                return "head_recallBg_png";
            } else {
                size = size || 96;
                url = url || "";
                let _imgUrl = url.replace(/\/0$/, "\/" + size) + headVersion;
                if (url.indexOf("/132") != -1) {
                    _imgUrl = url.replace(/\/132$/, "\/" + size) + headVersion;
                }
                //_imgUrl = _imgUrl.substring(0, _index)
                return _imgUrl;
            }
        }

        public static canCreateClubBtn() {
            if (!gateModel.isWxgame) return false;
            let result = ComFunc.compareVersion(WxSystemInfo.SDKVersion, "2.0.3");
            return result >= 0;
        }

        //保留小数点后2位
        public static format_Number_float(value: number): string {
            value = Math.floor(value);
            // if (value >= 1000000) {
            //     return _.numberFormat(value / 1000000, 2) + 'M';
            // } else if (value >= 1000) {
            //     return _.numberFormat(value / 1000) + 'K';
            // } else {
            //     return _.numberFormat(value);
            // }
            return ""
        }

        /**
     * 比较小程序基础库版本号的正确方法
     * compareVersion('1.11.0', '1.9.9') // => 1 // 1 表示 1.11.0 比 1.9.9 要新
        compareVersion('1.11.0', '1.11.0') // => 0 // 0 表示 1.11.0 和 1.11.0 是同一个版本
        compareVersion('1.11.0', '1.99.0') // => -1 // -1 表示 1.11.0 比 1.99.0 要老
     */
        public static compareVersion(v1, v2) {
            v1 = v1.split('.');
            v2 = v2.split('.');
            let len = Math.max(v1.length, v2.length)
            while (v1.length < len) {
                v1.push('0');
            }
            while (v2.length < len) {
                v2.push('0');
            }
            for (let i = 0; i < len; i++) {
                let num1 = parseInt(v1[i]);
                let num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                } else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }

        /**
         * 毫秒计算
         */
        public static formatTimeHMSMilliSecond(mil: number) {
            if (mil < 0) {
                return "";
            }
            let str: string = "";
            var minute = Math.floor(mil / 60000);
            var second = Math.floor((mil % 60000) / 1000);
            var milsecond = Math.floor((mil % 60000) % 1000);
        }
        /*   
         * 获取已经拥有道具的数量
         */
        public static getPropsCount(name: string): number {
            let count = 0;
            switch (name) {
                case "monthcard":
                    count = playerModel.monthCardExpired;
                    break;
                case "wanted":
                    count = playerModel.wantedCount;
                    break;
                case "shipwreck":
                    count = playerModel.ShipwreckCount;
                    break;
                case "cookie":
                    count = playerModel.cookieCount;
                    break;
                case "potion":
                    count = playerModel.potionCount;
                    break;
                case "killTitanCannonBall":
                    count = playerModel.killTitanCannonBall;
                    break;
                case "SummonStone":
                    count = playerModel.summonStone;
                    break;
                case "miniShield":
                    count = playerModel.miniShieldCount;
                    break;
                case "puffer":
                    count = playerModel.puffer;
                    break;
                case "lolly":
                    count = playerModel.lolly;
                    break;
                case "guildMedal":
                    count = playerModel.guildMedal;
                    break;
                case "horn":
                    count = playerModel.hornCount;
                    break;
                case "hamburger":
                    count = activityModel.getActivityInfo(ActivityType.beach).playerData.hamburger
                    break;
                case "magicBook":
                    count = activityModel.getActivityInfo(ActivityType.beach).playerData.magicBook
                    break;
                case "beachPowerPotion":
                    count = activityModel.getActivityInfo(ActivityType.beach).playerData.beachPowerPotion
                    break;
            }

            return count;
        }
        public static formatTimeHMS(sec: number) {
            if (sec < 0) {
                return "";
            }
            let str: string = "";
            var hour = Math.floor(sec / 3600);
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);
            var milsecond = Math.floor((sec % 60000) % 1000);

            if (hour >= 10) {
                str += hour.toString() + ":";
            } else {
                str += "0" + hour + ":";
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + ":" + second;
            } else {
                str = str + ":0" + second;
            }

            if (milsecond >= 100) {
                str = str + "." + milsecond.toString();
            } else if (milsecond >= 10) {
                str = str + "." + "0" + milsecond;
            } else {
                str = str + "." + "00" + milsecond;
            }
            return str;
        }

        public static formatTimeHMSNew(sec: number) {
            if (sec < 0) {
                return "";
            }
            let str: string = "";
            var hour = Math.floor(sec / 3600);
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);

            if (hour >= 10) {
                str += hour.toString() + ":";
            } else if (hour > 0) {
                str += "0" + hour + ":";
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + ":" + second;
            } else {
                str = str + ":0" + second;
            }
            return str;
        }

        public static getTimeString(sec: number) {
            if (sec < 0) {
                return "";
            }
            let str: string = "";
            var hour = Math.floor(sec / 3600);
            var minute = Math.floor((sec % 3600) / 60);
            var second = Math.floor((sec % 3600) % 60);

            if (hour >= 10) {
                str += hour.toString();
            } else {
                str += "0" + hour;
            }

            if (minute >= 10) {
                str = str + minute;
            } else {
                str = str + "0" + minute;
            }

            if (second >= 10) {
                str = str + second;
            } else {
                str = str + "0" + second;
            }
            return str;
        }

        //参数为毫秒
        static formatActivityDate(beginTime, endTime) {
            return ComFunc.formatDateTime(beginTime) + '至' + ComFunc.formatDateTime(endTime);
        }

        //参数为毫秒
        static formatDateTime(time) {
            var str = "";
            if (!!time) {
                var timeDate = new Date(time);
                str += timeDate.getFullYear() + "/";
                str += (timeDate.getMonth() + 1) + "/";
                str += timeDate.getDate() + "";
                //str += timeDate.getHours() + "";
                //str += timeDate.getMinutes() + "分";
            }
            return str;
        }

        static formatTimeMmddhh(s) {
            let d = new Date(s * 1000);
            let month = d.getMonth() + 1;
            let date = d.getDate();
            let hour: any = d.getHours();
            hour = (hour < 10) ? "0" + hour : hour;
            // let min = d.getMinutes();
            //     min = (min<10) ? "0" + min : min;
            // let sec = d.getSeconds()
            //     sec = (sec<10) ? "0" + sec : sec;
            let yymmdd = (month + "月" + date + "日" + hour + "时");
            return yymmdd;
        }

        public static rand(begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        }

        /**
         * 打开通用的帮助界面
         * @param text 帮助描述内容
         */
        public static openHelpPanel(content: string, title: string = "帮助信息"): void {
            soundModel.buttonOpen();
            TsEngine.WindowManager.showWindow(WindowType.WINDOW_COMHELP, { content: content, title: title });
        }

        //获取地理位置
        public static getUserLocation(province, city): string {
            let str = Province[province];
            if (province != 0 && city != 0 && City[province] && City[province][city]) {
                str += " " + City[province][city]
            }

            return str;
        }

        /**
        * 距离今天是什么时候
        * @param createAt 需要判断的时间
        * @returns {string}
        */
        public static toTodayTime(createAt: any): string {
            let _toTime = "昨天";
            // let _monthDay = 30;
            // let _lastMonth = moment.unix(createAt).month();
            // var _diffMon = moment().month() - _lastMonth;
            // if (_lastMonth == 1) {
            //     _monthDay = 28;
            // } else if (_lastMonth == 0 || _lastMonth == 2 || _lastMonth == 4 || _lastMonth == 6 || _lastMonth == 7 || _lastMonth == 9 || _lastMonth == 11) {
            //     _monthDay = 31;
            // }

            // var _diffDate = moment().date() - moment.unix(createAt).date() + _diffMon * _monthDay;
            // if (_diffDate < 1) {
            //     var minutes = moment.unix(createAt).minute();
            //     if (minutes < 10) {
            //         var _minutes = "0" + minutes;
            //     } else {
            //         var _minutes = minutes + "";
            //     }
            //     _toTime = "今天" + moment.unix(createAt).hour() + ":" + _minutes;
            // } else if (_diffDate == 1) {
            //     _toTime = "昨天";
            // } else {
            //     _toTime = _diffDate + "天前";
            // }

            return _toTime;
        }

        //免费能量
        public static getFreeEnergyData(friendArr: any[], cp: any): any {
            let _arr = friendArr;
            _arr.sort((p1, p2) => {
                return p1.updateElapse - p2.updateElapse;
            });

            if (cp) {
                cp.isCp = true;
                _arr.unshift(cp);
            }

            // let _hasEmpty = _.find(_arr, (a1: any) => {
            //     return a1.uid == 0;
            // });
            // if (!_hasEmpty) {
            //     _arr.push({ uid: 0 });
            // }
            return _arr;
        }

        //判断是否是特殊机型-》在小游戏中带有头帘的手机，例如iPhone X
        public static checkMobileDevice(): void {
            console.log("check isNotchMobile");
            if (!TsEngine.SystemManager.isWxGame) return;//H5上

            platform.user.getSystemInfo(function (data) {
                WxSystemInfo = data;//系统信息;
                let _mobile = ComFunc.trim(data.model, true);
                if (_mobile.indexOf("iPhoneX") != -1 || _mobile.indexOf("vivoX21A") != -1 || _mobile.indexOf("PADM00") != -1) {
                    console.log("isNotchMobile:true");
                    TsEngine.SystemManager.isNotchMobile = true;
                }
            });
        }

        /**
        * 返回对应星级可以被举报次数
        * @param num 星星数
        */
        public static getReportLimit(num: number): number {
            let count = 5;
            if (num < 50) {
                count = 5;
            } else if (num < 200) {
                count = 7;
            } else if (num < 500) {
                count = 10;
            } else if (num < 1000) {
                count = 20;
            } else {
                count = 30;
            }
            return count;
        }

        //使用滤镜恢复原色
        public static setDefaultFilters(node: any): void {
            if (!node) return;

            let colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            node.filters = [colorFlilter];
        }

        //使用滤镜灰色
        public static setGrayFilters(node: any): void {
            if (!node) return;
            let colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            node.filters = [colorFlilter];
        }

        //获得奖励弹框
        public static getRewardView(data) {
            TsEngine.WindowManager.showWindow(game.WindowType.WINDOW_REWARD, data);
        }
        //获取机器人数据
        public static getRobot(callBack: Function): void {
            let _obj = { crowns: 0, headImg: "", name: "" };
            HttpService.get(ServerMsg.ROBOT, "uid=" + playerModel.uid, function (data) {
                _obj = data;
                callBack(_obj);
            });
        }

        /**
         * 输入的字数限制
         * @param node 文本编辑节点
         * @param limitNum 限制的字符数，例如汉字20个，传入40
         */
        public static inputLimit(node: eui.EditableText, limitNum: number): void {
            let _length = 0;
            let text = ComFunc.trim(node.text);
            for (let i = 0; i < text.length; i++) {
                let reg = new RegExp("[\\u4E00-\\u9FFF]", "");
                if (reg.test(text[i])) { //是汉字
                    _length += 2;
                } else {
                    _length += 1;
                }
            }

            if (_length <= limitNum) {
                node.text = text;
            } else {
                let str: string = "";
                let _length = 0;
                let text = node.text;
                for (let i = 0; i < text.length; i++) {
                    let reg = new RegExp("[\\u4E00-\\u9FFF]", "");
                    if (reg.test(text[i])) { //是汉字
                        _length += 2;
                    } else {
                        _length += 1;
                    }
                    if (_length <= limitNum) {
                        str += text[i]
                    }
                }
                node.text = str;
            }
        }

        /* 显示引导关注或者是看视频界面
        * type  需要展示的类型，focus：关注类型，ad：广告类型
        * showId   目前只有当focus的时候必传，ad类型可以传入0
        * cb   关闭remindView界面的回调
        */
        public static showRemindView(type: string, showId: number = 0, cb?: any): void {
            if (type == "focus" && playerModel.isSubscribed) return;//已关注-》需要显示关注的返回
            //诱导关注
            util.jzlog(">>>todo:显示引导关注或者是看视频界面")
            if (Const.FocusInterFaceId && type == "focus" && showId != -1 && gateModel.isWxgame) {
                // MainUIView.getInstance().showView(new ui.FocusRewardTipView(), ui.FocusRewardTipMediator.NAME, true);
            } else {
                showId = showId == -1 ? 1 : showId;
                // MainUIView.getInstance().showView(new ui.RemindView({ type: type, showId: showId }, cb), ui.RemindMediator.NAME, true);
            }
        }

        /**
        * 解锁提示通用
        * @param type 解锁类型--》参照Const中的功能类型类型
        */
        public static openComConfirmPanel(type: string | number): void {
            TsEngine.WindowManager.showWindow(WindowType.WINDOW_MODULEUNLOCK, { type: type });
        }

        //通知服务器已经弹窗展示
        public static ctsShowAlertView(type: string): void {
            HttpService.post(ServerMsg.REFRESH_SHOW_BOX, { uid: playerModel.uid, boxName: type }, (data) => {
                console.log(`refresh-show-box == >`, data);
            });
        }

        /**
         * 获得活动道具-例如拼图碎片，河豚单等
         * @param t 道具类型
         * @param c 道具数量
         */
        public static getPopReward(t: string, c: number): void {
            let reward = {};
            reward[t] = c;
            let obj = { fly: true, reward: reward };
            TsEngine.WindowManager.showWindow(WindowType.WINDOW_REWARD, obj);
        }

        //排行榜查看某个人的岛屿
        public static rankToIsland(): void {
            let _selectPlayer = rankModel.selectedRankPlayer;
            if (_selectPlayer && _selectPlayer.fromType) {
                switch (_selectPlayer.fromType) {
                    case Const.RankToIsland:
                        game.ComFunc.hideViewByWindowType(game.WindowType.WINDOW_RANK);
                        break;
                    case Const.HateToIsland:
                        game.ComFunc.hideViewByWindowType(game.WindowType.WINDOW_ENEMY);
                        break;
                    case Const.Buildings:
                        game.ComFunc.hideViewByWindowType(-1);
                        break;
                    case Const.ChatPerson:
                        game.ComFunc.hideViewByWindowType(game.WindowType.GROUP_FRIEND);
                        break;
                    case Const.NewsAndMails:
                        game.ComFunc.hideViewByWindowType(game.WindowType.GROUP_NEWS);
                        break;
                    case Const.GuildsChat:
                        game.ComFunc.hideViewByWindowType(-1);
                        break;
                    case Const.PlaneRank:
                        game.ComFunc.hideViewByWindowType(-1);
                        break;
                    case Const.PlaneLogs:
                        game.ComFunc.hideViewByWindowType(-1);
                        break;
                    case Const.FriendCity:
                        game.ComFunc.hideViewByWindowType(game.WindowType.GROUP_FRIEND);
                        break;
                    case Const.FriendInfo:
                        game.ComFunc.hideViewByWindowType(game.WindowType.GROUP_FRIEND);
                        game.ComFunc.hideViewByWindowType(-1);//cp界面
                        break;
                    case Const.WorldChat:
                        game.ComFunc.hideViewByWindowType(game.WindowType.GROUP_FRIEND);
                        break;
                    case Const.RecallToIsland:
                        game.ComFunc.hideViewByWindowType(game.WindowType.WINDOW_RECALL);
                        game.ComFunc.hideViewByWindowType(game.WindowType.WINDOW_RECALL_REWARD);
                        break;
                    case Const.RecallTaskToIsland:
                        game.ComFunc.hideViewByWindowType(-1);
                        break;
                    case Const.ShareCheerToIsland:
                        game.ComFunc.hideViewByWindowType(game.WindowType.WINDOW_HELPGIFT);
                        break;
                    // case Const.BoaterUserInfo:
                    //     game.ComFunc.hideViewByWindowType(-1);
                    //     game.ComFunc.hideViewByWindowType(-1);
                    //     break;
                    // case Const.CPInfo:
                    //     game.ComFunc.hideViewByWindowType(-1);
                    //     break;
                }
            }
            if (TsEngine.ScreenManager.getScreen(game.ScreenType.ISLANDSPACE)) {
                TsEngine.ScreenManager.hideScreen(game.ScreenType.ISLANDSPACE);
            }
            TsEngine.ScreenManager.showScreen(game.ScreenType.ISLANDSPACE);
        }

        //通过名字隐藏界面
        public static hideViewByWindowType(windowId: number): void {
            if (windowId == -1) return;
            TsEngine.WindowManager.hideWindow(windowId);
        }

    }

}