const Province = {
    0: "未设置地区",
    110000: '北京',
    120000: '天津',
    310000: '上海',
    500000: '重庆',
    130000: '河北',
    140000: '山西',
    210000: '辽宁',
    220000: '吉林',
    230000: '黑龙江',
    320000: '江苏',
    330000: '浙江',
    340000: '安徽',
    350000: '福建',
    360000: '江西',
    370000: '山东',
    410000: '河南',
    420000: '湖北',
    430000: '湖南',
    440000: '广东',
    460000: '海南',
    510000: '四川',
    520000: '贵州',
    530000: '云南',
    610000: '陕西',
    620000: '甘肃',
    630000: '青海',
    710000: '台湾',
    540000: '西藏',
    150000: '内蒙古',
    640000: '宁夏',
    450000: '广西',
    650000: '新疆',
    810000: '香港',
    820000: '澳门',
    999999: '海外'
}

const City = {
    0: { 0: "未设置地区" },
    110000: { 0: "北京" },
    120000: { 0: "天津" },
    130000: {
        0: "未设置地区",
        130100: '石家庄',
        130200: '唐山',
        130300: '秦皇岛',
        130400: '邯郸',
        130500: '邢台',
        130600: '保定',
        130700: '张家口',
        130800: '承德',
        130900: '沧州',
        131000: '廊坊',
        131100: '衡水'
    },
    140000: {
        0: "未设置地区",
        140100: '太原',
        140200: '大同',
        140300: '阳泉',
        140400: '长治',
        140500: '晋城',
        140600: '朔州',
        140700: '晋中',
        140800: '运城',
        140900: '忻州',
        141000: '临汾',
        141100: '吕梁'
    },
    150000: {
        0: "未设置地区",
        150100: '呼和浩特',
        150200: '包头',
        150300: '乌海',
        150400: '赤峰',
        150500: '通辽',
        150600: '鄂尔多斯',
        150700: '呼伦贝尔',
        150800: '巴彦淖尔',
        150900: '乌兰察布',
        151000: '兴安',
        151100: '锡林郭勒',
        151200: '阿拉善',
    },
    210000: {
        0: "未设置地区",
        210100: '沈阳',
        210200: '大连',
        210300: '鞍山',
        210400: '抚顺',
        210500: '本溪',
        210600: '丹东',
        210700: '锦州',
        210800: '营口',
        210900: '阜新',
        211000: '辽阳',
        211100: '盘锦',
        211200: '铁岭',
        211300: '朝阳',
        211400: '葫芦岛'
    },
    220000: {
        0: "未设置地区",
        220100: '长春',
        220200: '吉林',
        220300: '四平',
        220400: '辽源',
        220500: '通化',
        220600: '白山',
        220700: '松原',
        220800: '白城'
    },
    230000: {
        0: "未设置地区",
        230100: '哈尔滨',
        230200: '齐齐哈尔',
        230300: '鸡西',
        230400: '鹤岗',
        230500: '双鸭山',
        230600: '大庆',
        230700: '伊春',
        230800: '佳木斯',
        230900: '七台河',
        231000: '牡丹江',
        231100: '黑河',
        231200: '绥化'
    },
    310000: {
        0: "上海"
    },
    320000: {
        0: "未设置地区",
        320100: '南京',
        320200: '无锡',
        320300: '徐州',
        320400: '常州',
        320500: '苏州',
        320600: '南通',
        320700: '连云港',
        320800: '淮安',
        320900: '盐城',
        321000: '扬州',
        321100: '镇江',
        321200: '泰州',
        321300: '宿迁'
    },
    330000: {
        0: "未设置地区",
        330100: '杭州',
        330200: '宁波',
        330300: '温州',
        330400: '嘉兴',
        330500: '湖州',
        330600: '绍兴',
        330700: '金华',
        330800: '衢州',
        330900: '舟山',
        331000: '台州',
        331100: '丽水'
    },
    340000: {
        0: "未设置地区",
        340100: '合肥',
        340200: '芜湖',
        340300: '蚌埠',
        340400: '淮南',
        340500: '马鞍山',
        340600: '淮北',
        340700: '铜陵',
        340800: '安庆',
        341000: '黄山',
        341100: '滁州',
        341200: '阜阳',
        341300: '宿州',
        341400: '巢湖',
        341500: '六安',
        341600: '亳州',
        341700: '池州',
        341800: '宣城'
    },
    350000: {
        0: "未设置地区",
        350100: '福州',
        350200: '厦门',
        350300: '莆田',
        350400: '三明',
        350500: '泉州',
        350600: '漳州',
        350700: '南平',
        350800: '龙岩',
        350900: '宁德'
    },
    360000: {
        0: "未设置地区",
        360100: '南昌',
        360200: '景德镇',
        360300: '萍乡',
        360400: '九江',
        360500: '新余',
        360600: '鹰潭',
        360700: '赣州',
        360800: '吉安',
        360900: '宜春',
        361000: '抚州',
        361100: '上饶'
    },
    370000: {
        0: "未设置地区",
        370100: '济南',
        370200: '青岛',
        370300: '淄博',
        370400: '枣庄',
        370500: '东营',
        370600: '烟台',
        370700: '潍坊',
        370800: '济宁',
        370900: '泰安',
        371000: '威海',
        371100: '日照',
        371200: '莱芜',
        371300: '临沂',
        371400: '德州',
        371500: '聊城',
        371600: '滨州',
        371700: '菏泽'
    },
    410000: {
        0: "未设置地区",
        410100: '郑州',
        410200: '开封',
        410300: '洛阳',
        410400: '平顶山',
        410500: '安阳',
        410600: '鹤壁',
        410700: '新乡',
        410800: '焦作',
        410900: '濮阳',
        411000: '许昌',
        411100: '漯河',
        411200: '三门峡',
        411300: '南阳',
        411400: '商丘',
        411500: '信阳',
        411600: '周口',
        411700: '驻马店',
        419001: '济源'
    },
    420000: {
        0: "未设置地区",
        420100: '武汉',
        420200: '黄石',
        420300: '十堰',
        420500: '宜昌',
        420600: '襄阳',
        420700: '鄂州',
        420800: '荆门',
        420900: '孝感',
        421000: '荆州',
        421100: '黄冈',
        421200: '咸宁',
        421300: '随州',
        422800: '恩施州'
    },
    430000: {
        0: "未设置地区",
        430100: '长沙',
        430200: '株洲',
        430300: '湘潭',
        430400: '衡阳',
        430500: '邵阳',
        430600: '岳阳',
        430700: '常德',
        430800: '张家界',
        430900: '益阳',
        431000: '郴州',
        431100: '永州',
        431200: '怀化',
        431300: '娄底',
    },
    440000: {
        0: "未设置地区",
        440100: '广州',
        440200: '韶关',
        440300: '深圳',
        440400: '珠海',
        440500: '汕头',
        440600: '佛山',
        440700: '江门',
        440800: '湛江',
        440900: '茂名',
        441200: '肇庆',
        441300: '惠州',
        441400: '梅州',
        441500: '汕尾',
        441600: '河源',
        441700: '阳江',
        441800: '清远',
        441900: '东莞',
        442000: '中山',
        445100: '潮州',
        445200: '揭阳',
        445300: '云浮'
    },
    450000: {
        0: "未设置地区",
        450100: '南宁',
        450200: '柳州',
        450300: '桂林',
        450400: '梧州',
        450500: '北海',
        450600: '防城港',
        450700: '钦州',
        450800: '贵港',
        450900: '玉林',
        451000: '百色',
        451100: '贺州',
        451200: '河池',
        451300: '来宾',
        451400: '崇左'
    },
    460000: {
        0: "未设置地区",
        460100: '海口',
        460200: '三亚',
        460300: '三沙'
    },
    500000: {
        0: "重庆"
    },
    510000: {
        0: "未设置地区",
        510100: '成都',
        510300: '自贡',
        510400: '攀枝花',
        510500: '泸州',
        510600: '德阳',
        510700: '绵阳',
        510800: '广元',
        510900: '遂宁',
        511000: '内江',
        511100: '乐山',
        511300: '南充',
        511400: '眉山',
        511500: '宜宾',
        511600: '广安',
        511700: '达州',
        511800: '雅安',
        511900: '巴中',
        512000: '资阳'
    },
    520000: {
        0: "未设置地区",
        520100: '贵阳',
        520200: '六盘水',
        520300: '遵义',
        520400: '安顺',
        522200: '铜仁',
        522400: '毕节'
    },
    530000: {
        0: "未设置地区",
        530100: '昆明',
        530300: '曲靖',
        530400: '玉溪',
        530500: '保山',
        530600: '昭通',
        530700: '丽江',
        530800: '普洱',
        530900: '临沧'
    },
    540000: {
        0: "未设置地区",
        540100: '拉萨',
        542100: '昌都',
        542200: '山南',
        542300: '日喀则',
        542400: '那曲',
        542500: '阿里',
        542600: '林芝'
    },
    610000: {
        0: "未设置地区",
        610100: '西安',
        610200: '铜川',
        610300: '宝鸡',
        610400: '咸阳',
        610500: '渭南',
        610600: '延安',
        610700: '汉中',
        610800: '榆林',
        610900: '安康',
        611000: '商洛'
    },
    620000: {
        0: "未设置地区",
        620100: '兰州',
        620200: '嘉峪关',
        620300: '金昌',
        620400: '白银',
        620500: '天水',
        620600: '武威',
        620700: '张掖',
        620800: '平凉',
        620900: '酒泉',
        621000: '庆阳',
        621100: '定西',
        621200: '陇南'
    },
    630000: {
        0: "未设置地区",
        630100: '西宁'
    },
    640000: {
        0: "未设置地区",
        640100: '银川',
        640200: '石嘴山',
        640300: '吴忠',
        640400: '固原',
        640500: '中卫'
    },
    650000: {
        0: "未设置地区",
        650100: '乌鲁木齐',
        650200: '克拉玛依',
        652100: '吐鲁番'
    },
    710000: { 0: "未设置地区" },
    810000: { 0: "未设置地区" },
    820000: { 0: "未设置地区" },
    999999: { 0: "未设置地区" }
}

const XingZuo = {
    0: '未设置',
    1: '水瓶座',
    2: '双鱼座',
    3: '白羊座',
    4: '金牛座',
    5: '双子座',
    6: '巨蟹座',
    7: '狮子座',
    8: '处女座',
    9: '天秤座',
    10: '天蝎座',
    11: '射手座',
    12: '摩羯座',
}

const FriendInfos = {
    0: "单身狗，求交友~",
    1: "简单的认识一下呗",
    2: "求伙伴，一起玩游戏~",
    3: "无聊！一起聊聊天~",
    4: "来啊！互相伤害啊！",
    5: "互帮互助小伙伴！"
}

const SexInfos = {
    0: "女",
    1: "男"
}










