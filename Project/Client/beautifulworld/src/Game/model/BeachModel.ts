namespace game {
    export class BeachCache {
        public static BeachPerWith = 500 / 5;
        public static BeachPerHeight = 367 / 10000;
        public static friendsRedPoint = false;
        public static newsRedPoint = false;
        public static refreshRedPoint = false;
        public static workersRedPoint = false;
        public static rewardRedPoint = false;
        public static rewardNewsRedPoint = false;
        public static CanCarry = false;
        public static BoostTargetUid = 0;
        public static TESTUID = 0;
        public static BoostTargetData = null;

        public static getShipwreckConf(): any {
            // let shipwreck = activityModel.getActivityInfo(ActivityType.beach).configData.shipwreck.confMap2;
            // return shipwreck[BeachEnterData.shipwreck.gold];
        }

        public static getBeachPropById(id: number): any {
            // let collections = activityModel.getActivityInfo(ActivityType.beach).configData.collections;
            // return _.find(collections, (item: any) => {
            //     return item.cid == id;
            // });
        }

        public static getPlayer(uid: number, cb?): any {
            // let player = _.find(BeachEnterData.friends, (player: any) => {
            //     return player.uid == uid;
            // });

            // if (cb && typeof (cb) == "function") {
            //     if (player) {
            //         cb(player);
            //     } else {
            //         HttpService.post(ServerMsg.KILLTITAN_GET_PLAYER_SIMLE_INFO, "uid=" + playerModel.uid + "&ids=" + uid, (data) => {
            //             BeachEnterData.friends.push(data.playerSimpleInfos[0]);
            //             cb(data.playerSimpleInfos[0]);
            //         });
            //     }
            // } else {
            //     if (player) {
            //         return player;
            //     } else {
            //         HttpService.post(ServerMsg.KILLTITAN_GET_PLAYER_SIMLE_INFO, "uid=" + playerModel.uid + "&ids=" + uid, (data) => {
            //             BeachEnterData.friends.push(data.playerSimpleInfos[0]);
            //             return data.playerSimpleInfos[0];
            //         });
            //     }
            // }
        }

        public static corpsData(data: any): any {
            let _propIndex: number = -1;
            for (var i = 0; i < BeachEnterData.corps.length; i++) {
                if (BeachEnterData.corps[i].uid == data.uid && BeachEnterData.corps[i].trackId == data.trackId) {//存在
                    _propIndex = i;
                }
            }

            if (_propIndex >= 0) {//存在
                BeachEnterData.corps[_propIndex] = data;
                if (data.uid == playerModel.uid) {
                    if (data.ownerSailor == 0) {
                        BeachEnterData.corps.splice(_propIndex, 1);
                    }
                } else {
                    if (data.enemySailor == 0) {
                        BeachEnterData.corps.splice(_propIndex, 1);
                    }
                }

            } else {
                BeachEnterData.corps.push(data);
            }
        }

        //检测是否显示兑换奖励红点
        public static checkIsShowRewardRed(): boolean {
            let _isShowRed = false;
            if (BeachCollectionData.recipes.length == 0) return BeachCache.rewardRedPoint;//数据没有初始化时不变

            for (let i = 0; i < BeachCollectionData.recipes.length; i++) {
                let _formula = BeachCollectionData.recipes[i].formula;
                if (BeachCache.calIsAllOver(_formula)) {
                    _isShowRed = true;
                    break;
                }
            }

            return _isShowRed;
        }

        private static calIsAllOver(formula: any[]): boolean {
            let _isAll = true;
            let useCollection = util.cloneArr(BeachCollectionData.collections);
            for (let i = 0; i < formula.length; i++) {
                let _cid = formula[i] - 1;
                if (useCollection[_cid] <= 0) {
                    _isAll = false;
                    break;
                } else {
                    useCollection[_cid]--;
                }
            }

            return _isAll;
        }

        //检测水手管理界面红点
        public static checkIsWorkerRedPoint(): void {
            if (BeachSailor.confs.length == 0 || BeachSailor.casuals.length == 0) return;
            let list = [];
            for (let i = 0; i < BeachSailor.confs.length; i++) {
                var obj = {
                    hasGot: BeachSailor.casuals[i],
                    ableGot: BeachSailor.worth >= BeachSailor.confs[i]//BeachSailor.worth >= BeachSailor.confs[i] , i < 2 ? BeachSailor.inviteCount >= BeachSailor.confs[i] :
                }
                list.push(obj);
            }

            let _ableGot = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i].ableGot && !list[i].hasGot) {
                    _ableGot = true;
                    break;
                }
            }

            BeachCache.workersRedPoint = _ableGot;
        }

        /**
         * 是否在owner
         */
        public static isJoinOwner(uid?): boolean {
            let _isJoin: boolean = false;
            let _owners: Array<any> = BeachEnterData.shipwreck.owners;
            let _uid = uid || playerModel.uid;
            for (let i = 0; i < _owners.length; i++) {
                if (_owners[i].uid == _uid) {
                    _isJoin = true;
                    break;
                }
            }
            return _isJoin;
        }

        /**
         * 是否在enemy
         */
        public static isJoinEnemy(uid?): boolean {
            let _isJoin: boolean = false;
            let _enemies: Array<any> = BeachEnterData.shipwreck.enemies;
            let _uid = uid || playerModel.uid;
            for (let i = 0; i < _enemies.length; i++) {
                if (_enemies[i].uid == _uid) {
                    _isJoin = true;
                    break;
                }
            }
            return _isJoin;
        }

        /**
         * 是否参与
         */
        public static isSelfJoin(uid?): boolean {
            return BeachCache.isJoinOwner(uid) || BeachCache.isJoinEnemy(uid);
        }

        /**
         * owner参与人数
         */
        public static ownersJoinPlayers(): number {
            let _owners: Array<any> = BeachEnterData.shipwreck.owners;
            let _count = 0;
            for (let i = 0; i < _owners.length; i++) {
                if (_owners[i].uid > 0) {
                    _count++;
                }
            }
            return _count;
        }

        /**
         * enemy参与人数
         */
        public static enemyJoinPlayers(): number {
            let _enemies: Array<any> = BeachEnterData.shipwreck.enemies;
            let _count = 0;
            for (let i = 0; i < _enemies.length; i++) {
                if (_enemies[i].uid > 0) {
                    _count++;
                }
            }
            return _count;
        }

        /**
         * 是否有人参与
         */
        public static isJoin(): boolean {
            return BeachCache.ownersJoinPlayers() + BeachCache.enemyJoinPlayers() > 0;
        }

        /**
         * 获取自己参与占用的水手数量
         */
        public static selfJoinSailor(): number {
            let _nowCount = 0;
            if (BeachCache.isJoinOwner()) {
                let _owners: any = BeachEnterData.shipwreck.owners;
                for (let i = 0; i < _owners.length; i++) {
                    if (_owners[i].uid == playerModel.uid) {
                        _nowCount = _owners[i].sailor;
                        break;
                    }
                }
            }

            if (BeachCache.isJoinEnemy()) {
                let _enemies: any = BeachEnterData.shipwreck.enemies;
                for (let i = 0; i < _enemies.length; i++) {
                    if (_enemies[i].uid == playerModel.uid) {
                        _nowCount = _enemies[i].sailor;
                        break;
                    }
                }
            }

            return _nowCount;
        }

        /**
        * 获取owner水手数量
        */
        public static ownerSailor(): number {
            let _sailor = 0;
            let _owners: any = BeachEnterData.shipwreck.owners;
            for (let i = 0; i < _owners.length; i++) {
                _sailor += _owners[i].sailor * (1 + .25 * _owners[i].cheers.length + .1 * _owners[i].powerPotion);
            }

            return _sailor;
        }

        /**
        * 获取owner水手数量
        */
        public static enemySailor(): number {
            let _sailor = 0;
            let _enemies: any = BeachEnterData.shipwreck.enemies;
            for (let i = 0; i < _enemies.length; i++) {
                _sailor += _enemies[i].sailor * (1 + .25 * _enemies[i].cheers.length + .1 * _enemies[i].powerPotion);
            }

            return _sailor;
        }
    }

    let BeachEnterData = {
        "ownerId": 0,
        "beachPowerPotion": 0,
        "beachSecret": "",
        "gotPowerPotionCount": 0,
        "cheerCount": 0,
        "beachTutorial": 0,
        "refreshRemain": 0,
        "sailorRemain": 0,
        "sailorTotal": 0,
        "worth": 0,
        "WorthConf": 1,
        "energyCount": 0,
        "recoverRemain": 0,
        "newArrival": {},
        "shipwreck": {
            "uid": 0,
            "gold": 0,
            "state": 0,
            "location": 0,
            "finishRemain": 0,
            "owners": [
                {
                    "uid": 0,
                    "sailor": 0,
                    "powerPotion": 0,
                    "cheers": []
                }
            ],
            "enemies": [
                {
                    "uid": 0,
                    "sailor": 0,
                    "powerPotion": 0,
                    "cheers": []
                }
            ]
        },
        "tracks": [
            {
                "uid": 75,
                "fid": 0,
                "cid": 27,
                "trackId": 1,
                "state": 0,
                "ownerSailor": 0,
                "enemySailor": 0,
                "ownerPowerPotion": 0,
                "enemyPowerPotion": 0,
                "ownerCheers": [],
                "enemyCheers": [],
                "location": 201,
                "finishRemain": 0
            }
        ],
        "corps": [
            {
                "uid": 75,
                "fid": 15218,
                "cid": 6,
                "location": 6834792,
                "state": 1,
                "trackId": 1,
                "ownerSailor": 1,
                "enemySailor": 1,
                "ownerPowerPotion": 0,
                "enemyPowerPotion": 0,
                "finishRemain": 0
            }
        ],
        "friends": [
            {
                "uid": 75,
                "name": "Young",
                "headImg": "http://wx.qlogo.cn/mmhead/EoDzFPAicg5Uq4Z8VKUemPJWBPebxn3bicibJ4bflbhgQU/0",
                "crowns": 1410,
                "gender": 1,
                "isVip": true
            }
        ],
        "shareInfo": {
            "goodsId": "",
            "inviteCount": 0,
            "inviteLimit": 1,
            "buyCount": 0,
            "rewardCount": 0,
            "limit": 2
        }
    }

    let BeachSailor = {
        "inviteCount": 0,
        "worth": 0,
        "sailorRemain": 0,
        "sailorTotal": 0,
        "tracks": [
            {
                "uid": 0,
                "fid": 0,
                "cid": 1,
                "location": 0,
                "state": 0,
                "ownerSailor": 0,
                "enemySailor": 0,
                "ownerPowerPotion": 0,
                "enemyPowerPotion": 0,
                "finishRemain": 0
            }
        ],
        "shipwrecks": [
            {
                "uid": 0,
                "gold": 0,
                "state": 1,
                "location": 0,
                "finishRemain": 0,
                "owners": [
                    {
                        "uid": 0,
                        "sailor": 0,
                        "powerPotion": 0,
                        "cheers": []
                    }
                ],
                "enemies": [
                    {
                        "uid": 0,
                        "sailor": 0,
                        "powerPotion": 0,
                        "cheers": []
                    }
                ]
            }
        ],
        "friends": [
            {
                "uid": 75,
                "name": "Young",
                "headImg": "http://wx.qlogo.cn/mmhead/EoDzFPAicg5Uq4Z8VKUemPJWBPebxn3bicibJ4bflbhgQU/0",
                "crowns": 1410,
                "gender": 1,
                "isVip": true
            }
        ],
        "casuals": [],
        "confs": []
    };

    //收藏品数据
    let BeachCollectionData = {
        donateCount: 0,
        collections: [],
        recipes: [],
        worth: 0,
        worthConf: 0,
        "goldNuggetConfs": [
            {
                "id": 1,
                "title": "小堆金币",
                "gold": 0,
                "param": 0,
                "limit": 0
            }
        ],
        "goldNugget": 0,
        "goldNuggetRemainCount": [
            -1,
            2,
            1
        ],
        needGoldNugget: 0,
        exchangedMoney: 0
    };

    let BeachInviteGift = {
        "shareInfo": {
            "goodsId": "beachGift1",
            "inviteCount": 0,
            "inviteLimit": 1,
            "buyCount": 0,
            "rewardCount": 0,
            "limit": 2
        },
        "beachGiftConfs": {
            "beachGift1": {
                "id": 1,
                "price": 6,
                "needInvite": 1,
                "rewards": {
                    "beachPowerPotion": 1,
                    "beachWorthCount": 5,
                    "goldNugget": 10
                },
                "limit": 2,
                "goodsId": "beachGift1"
            },
            "beachGift2": {
                "id": 2,
                "price": 18,
                "needInvite": 3,
                "rewards": {
                    "beachPowerPotion": 3,
                    "beachWorthCount": 15,
                    "hamburger": 1
                },
                "limit": 3,
                "goodsId": "beachGift2"
            }
        }
    }


    let BeachMarkData = {
        sendBeachId: 0,//赠送的收藏品id
        guideStep: 1,//沙滩新手引导
        randomReTime: 0,//沙滩邻居刷新时间
        newArrival: {}, //fix原本放在enterData中的，但是老薛接口中去掉了
        _soundPlayed1: false,
        _soundPlayed2: false,
    };
}