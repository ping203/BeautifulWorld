/**
* Created by liaojiangzheng
* Copyright (c) 2018 HortorGames. All rights reserved.
*/
namespace game {
    //----------------邀请VIP分享------------------
    export class InviteVipShare extends GameShare {
        public onShareSuc(): void {
            util.jzlog("邀请VIP分享>>>>分享成功回调")
            super.onShareSuc();
            TsEngine.TipManager.bubble("分享成功")
            //MainUIView.getInstance().closeView(ui.BoaterShareTipMediator.NAME);
        }

        public onShareEnter(params: any): void {
            util.jzlog("邀请VIP分享>>>>从链接进入");
        }
    }


    // //----------------船员召回分享------------------
    // export class SignShare extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员召回分享成功");
    //     }

    //     public onShareEnter(params: any): void {

    //     }
    // }

    // //----------------船员招募分享------------------
    // export class BoaterHireShare2 extends GameShare {
    //     public onShareSuc(): void {
    //         super.onShareSuc();
    //         //new TextPop("船员招募分享成功");
    //     }

    //     public onShareEnter(params: any): void {
    //         //BoaterManager.AcceptBoater(this.shareOwnerId);
    //     }
    // }
}