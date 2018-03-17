import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  cityJson = [{ "Id": 5, "CityName": "阿勒泰地区" }, { "Id": 8, "CityName": "安康市" }, { "Id": 11, "CityName": "安阳市" }, { "Id": 12, "CityName": "鞍山市" }, { "Id": 15, "CityName": "巴中市" }, { "Id": 21, "CityName": "蚌埠市" }, { "Id": 23, "CityName": "宝鸡市" }, { "Id": 27, "CityName": "北海市" }, { "Id": 28, "CityName": "北京市" }, { "Id": 29, "CityName": "本溪市" }, { "Id": 31, "CityName": "滨州市" }, { "Id": 32, "CityName": "亳州市" }, { "Id": 36, "CityName": "昌吉回族自治州" }, { "Id": 39, "CityName": "长沙市" }, { "Id": 40, "CityName": "长治市" }, { "Id": 41, "CityName": "常德市" }, { "Id": 42, "CityName": "常州市" }, { "Id": 44, "CityName": "朝阳市" }, { "Id": 46, "CityName": "郴州市" }, { "Id": 47, "CityName": "成都市" }, { "Id": 51, "CityName": "赤峰市" }, { "Id": 53, "CityName": "滁州市" }, { "Id": 57, "CityName": "大连市" }, { "Id": 58, "CityName": "大庆市" }, { "Id": 59, "CityName": "大同市" }, { "Id": 70, "CityName": "东莞市" }, { "Id": 71, "CityName": "东营市" }, { "Id": 72, "CityName": "鄂尔多斯市" }, { "Id": 74, "CityName": "恩施土家族苗族自治州" }, { "Id": 76, "CityName": "佛山市" }, { "Id": 82, "CityName": "阜阳市" }, { "Id": 93, "CityName": "贵阳市" }, { "Id": 94, "CityName": "桂林市" }, { "Id": 103, "CityName": "邯郸市" }, { "Id": 104, "CityName": "汉中市" }, { "Id": 105, "CityName": "杭州市" }, { "Id": 106, "CityName": "合肥市" }, { "Id": 110, "CityName": "菏泽市" }, { "Id": 116, "CityName": "衡阳市" }, { "Id": 118, "CityName": "呼和浩特市" }, { "Id": 123, "CityName": "怀化市" }, { "Id": 137, "CityName": "济宁市" }, { "Id": 138, "CityName": "济源市" }, { "Id": 144, "CityName": "江门市" }, { "Id": 145, "CityName": "焦作市" }, { "Id": 146, "CityName": "揭阳市" }, { "Id": 148, "CityName": "金华市" }, { "Id": 150, "CityName": "晋城市" }, { "Id": 156, "CityName": "酒泉市" }, { "Id": 158, "CityName": "开封市" }, { "Id": 167, "CityName": "廊坊市" }, { "Id": 169, "CityName": "乐山市" }, { "Id": 176, "CityName": "聊城市" }, { "Id": 182, "CityName": "临沂市" }, { "Id": 189, "CityName": "娄底市" }, { "Id": 190, "CityName": "泸州市" }, { "Id": 192, "CityName": "洛阳市" }, { "Id": 195, "CityName": "茂名市" }, { "Id": 199, "CityName": "绵阳市" }, { "Id": 206, "CityName": "南京市" }, { "Id": 211, "CityName": "南阳市" }, { "Id": 218, "CityName": "平顶山市" }, { "Id": 221, "CityName": "萍乡市" }, { "Id": 222, "CityName": "莆田市" }, { "Id": 223, "CityName": "濮阳市" }, { "Id": 232, "CityName": "青岛市" }, { "Id": 242, "CityName": "三门峡市" }, { "Id": 249, "CityName": "商丘市" }, { "Id": 253, "CityName": "邵阳市" }, { "Id": 255, "CityName": "深圳市" }, { "Id": 259, "CityName": "石河子市" }, { "Id": 268, "CityName": "宿迁市" }, { "Id": 273, "CityName": "塔城地区" }, { "Id": 285, "CityName": "唐山市" }, { "Id": 289, "CityName": "天水市" }, { "Id": 295, "CityName": "铜仁市" }, { "Id": 301, "CityName": "潍坊市" }, { "Id": 302, "CityName": "渭南市" }, { "Id": 303, "CityName": "温州市" }, { "Id": 305, "CityName": "文山壮族苗族自治州" }, { "Id": 308, "CityName": "乌鲁木齐市" }, { "Id": 311, "CityName": "吴忠市" }, { "Id": 312, "CityName": "芜湖市" }, { "Id": 318, "CityName": "西安市" }, { "Id": 319, "CityName": "西宁市" }, { "Id": 322, "CityName": "厦门市" }, { "Id": 324, "CityName": "咸宁市" }, { "Id": 325, "CityName": "咸阳市" }, { "Id": 327, "CityName": "湘潭市" }, { "Id": 329, "CityName": "襄阳市" }, { "Id": 332, "CityName": "新乡市" }, { "Id": 336, "CityName": "信阳市" }, { "Id": 338, "CityName": "邢台市" }, { "Id": 340, "CityName": "许昌市" }, { "Id": 343, "CityName": "烟台市" }, { "Id": 344, "CityName": "延安市" }, { "Id": 357, "CityName": "银川市" }, { "Id": 359, "CityName": "营口市" }, { "Id": 360, "CityName": "永州市" }, { "Id": 361, "CityName": "榆林市" }, { "Id": 362, "CityName": "玉林市" }, { "Id": 365, "CityName": "岳阳市" }, { "Id": 368, "CityName": "运城市" }, { "Id": 370, "CityName": "湛江市" }, { "Id": 373, "CityName": "张掖市" }, { "Id": 374, "CityName": "彰化县" }, { "Id": 379, "CityName": "郑州市" }, { "Id": 380, "CityName": "中山市" }, { "Id": 381, "CityName": "中卫市" }, { "Id": 384, "CityName": "周口市" }, { "Id": 385, "CityName": "株洲市" }, { "Id": 387, "CityName": "驻马店市" }, { "Id": 389, "CityName": "淄博市" }, { "Id": 390, "CityName": "自贡市" }, { "Id": 391, "CityName": "固始县" }, { "Id": 394, "CityName": "漯河市" }, { "Id": 395, "CityName": "遵义市" }, { "Id": 396, "CityName": "三沙市" }];

  constructor() { }

  ngOnInit() {
  }

}