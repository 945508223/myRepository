<%--
  Created by IntelliJ IDEA.
  User: 94550
  Date: 2020/6/17
  Time: 15:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>全国地图</title>
    <script src="/echars/echarts.js"></script>
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<div id="main" style="width: 1000px;height:600px;"></div>


<script type="text/javascript">

    var chart = echarts.init(document.getElementById('main'));


    //34个省、市、自治区的名字拼音映射数组
    var provinces = {
        //23个省
        "台湾省": "taiwan",
        "河北省": "hebei",
        "山西省": "shanxi",
        "辽宁省": "liaoning",
        "吉林省": "jilin",
        "黑龙江省": "heilongjiang",
        "江苏省": "jiangsu",
        "浙江省": "zhejiang",
        "安徽省": "anhui",
        "福建省": "fujian",
        "江西省": "jiangxi",
        "山东省": "shandong",
        "河南省": "henan",
        "湖北省": "hubei",
        "湖南省": "hunan",
        "广东省": "guangdong",
        "海南省": "hainan",
        "四川省": "sichuan",
        "贵州省": "guizhou",
        "云南省": "yunnan",
        "陕西省": "shanxi1",
        "甘肃省": "gansu",
        "青海省": "qinghai",
        //5个自治区
        "新疆维吾尔自治区": "xinjiang",
        "广西壮族自治区": "guangxi",
        "内蒙古自治区": "neimenggu",
        "宁夏回族自治区": "ningxia",
        "西藏自治区": "xizang",
        //4个直辖市
        "北京": "beijing",
        "天津": "tianjin",
        "上海": "shanghai",
        "重庆": "chongqing",
        //2个特别行政区
        "香港": "xianggang",
        "澳门": "aomen"
    };


    var cityMap = {
        "晋城市": "jincheng",
        "南京市": "nanjing",
        "无锡市": "wuxi",
        "徐州市": "xuzhou",
        "常州市": "changzhou",
        "苏州市": "suzhou",
        "南通市": "nantong",
        "连云港市": "lianyungang",
        "淮安市": "huanan",
        "盐城市": "yancheng",
        "扬州市": "yangzhou",
        "镇江市": "zhenjiang",
        "泰州市": "taizhou",
        "宿迁市": "suqian",
    };

    var areaMap = {
        //江苏南京市
        "六合区": "liuhequ",
        "玄武区": "xuanwuqu",
        "高淳区": "gaochunqu",
        "鼓楼区": "gulouqu",
        "建邺区": "jianyequ",
        "江宁区": "jiangningqu",
        "溧水区": "lishuiqu",
        "浦口区": "pukouqu",
        "栖霞区": "qixiaqu",
        "秦淮区": "qinhaiqu",
        "雨花台区": "yuhuataiqu",
        //江苏徐州市
        "丰县": "fengxian",
        "鼓楼区": "gulouqu2",
        "贾汪区": "jiawangqu",
        "沛县": "peixian",
        "邳州市": "pizhoushi",
        "泉山区": "quanshanqu",
        "铜山区": "tongshanqu",
        "新沂市": "xinyishi",
        "云龙区": "yunlongqu",
        "睢宁县": "suiningxian",
        //江苏连云港市
        "东海县": "donghaixian",
        "灌南县": "guannanxian",
        "灌云县": "guanyunxian",
        "连云区": "lianyunqu",
        "海州区": "haizhouqu",
        "赣榆区": "ganyuqu",
        //江苏宿迁市
        "宿豫区": "suyuqu",
        "沭阳县": "shuyangxian",
        "泗洪县": "sihongxian",
        "泗阳县": "siyangxian",
        "宿城区": "suchengqu",
        //江苏淮安市
        "清江浦区": "qingjiangpuqu",
        "淮阴区": "huaiyinqu",
        "涟水县": "lianshuiqu",
        "盱眙县": "xuyixian",
        "金湖县": "jinhuxian",
        "洪泽区": "hongzequ",
        "淮安区": "huaianqu",
        //江苏盐城市
        "东台市": "dongtaishi",
        "大丰区": "dafengqu",
        "盐都区": "yanduqu",
        "亭湖区": "tinghuqu",
        "建湖区": "jianhuqu",
        "射阳县": "sheyangxian",
        "滨海县": "binhaixian",
        "响水县": "xiangshuixian",
        "阜宁县": "funingxian",
        //江苏扬州市
        "广陵区": "guanglingqu",
        "江都区": "jiangduqu",
        "仪征市": "yizhengshi",
        "高邮市": "gaoyoushi",
        "宝应县": "baoyingxian",
        "邗江区": "hanjiangqu",
        //江苏泰州市
        "靖江市": "jiangjiangshi",
        "泰兴市": "taixingshi",
        "高港区": "gaogangqu",
        "海陵区": "hailingqu",
        "姜堰区": "jiangyanqu",
        "兴化市": "xinghuashi",
        //江苏镇江
        "扬中市": "yangzhongshi",
        "京口区": "jingkouqu",
        "丹阳市": "danyangshi",
        "润州区": "runzhouqu",
        "丹徒区": "dantuqu",
        "句容市": "jurongshi",
        //江苏通州
        "如皋市": "rugaoshi",
        "海安市": "haianshi",
        "启东市": "qidongshi",
        "海门市": "haimenshi",
        "通州区": "tongzhouqu",
        "港闸区": "gangzhaqu",
        "如东县": "rudongxian",
        //江苏常州市
        "溧阳市": "liyangqu",
        "金坛区": "jintanqu",
        "天宁区": "tianningqu",
        "钟楼区": "zhonglouqu",
        "新北区": "xinbeiqu",
        "武进区": "wujinqu",
        //江苏无锡市
        "滨湖区": "binhuqu",
        "新吴区": "xinwuqu",
        "梁溪区": "liangxiqu",
        "锡山区": "xishanqu",
        "惠山区": "huishanqu",
        "江阴市": "jiangyinqu",
        "宜兴市": "yixingshi",
        //江苏苏州
        "常熟市": "changshushi",
        "姑苏区": "gusuqu",
        "虎丘区": "huqiuqu",
        "昆山市": "kunshanshi",
        "苏州工业园区": "suzhougongyeyuanqu",
        "太仓市": "taicangshi",
        "吴江区": "wujiangqu",
        "吴中区": "wuzhongqu",
        "相城区": "xiangchengqu",
        "张家港市": "zhangjiagangshi",


    };
    //直辖市和特别行政区-只有二级地图，没有三级地图
    var special = ["北京市", "天津市", "上海市", "重庆市", "香港香港特别行政区", "澳门香港特别行政区"];
    var mapdata = [];

    //定义一个用于存储上级地图名称的变量
    var backMap;
    //接收点击地图传递的parms参数
    var p;


    //绘制全国地图
    $.getJSON('/json/china.json', function (data) {
        d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name
            })
        }
        mapdata = d;
        //注册地图
        echarts.registerMap('china', data);
        //绘制地图
        renderMap('china', d);
    });

    $.getJSON('/json/china.json', function (data) {
        d = [];
        for (var i = 0; i < data.features.length; i++) {
            d.push({
                name: data.features[i].properties.name
            })
        }
        mapdata = d;
        //注册地图
        echarts.registerMap('china', data);
        //绘制地图
        renderMap('china', d);
    });

    //地图点击事件
    chart.on('click', function (params) {

        console.log(params);
        if (params.name in provinces) {
            //如果进入的是省 则返回上一级地图为全国地图
            backMap = 'china';
            //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
            $.getJSON('/json/province/' + provinces[params.name] + '.json', function (data) {
                echarts.registerMap(params.name, data);
                alert("params="+params.name);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name
                    })
                }
                renderMap(params.name, d);
            });
        } else if (params.seriesName in provinces) {
            //如果是【直辖市/特别行政区】只有二级下钻
            if (special.indexOf(params.seriesName) >= 0) {
                renderMap('china', mapdata);
            } else {
                //如果是进入显示市级地图则存储backMap为对应的省
                backMap = params.seriesName;
               // alert("backMap"+backMap);
                //显示市级地图
                $.getJSON('/json/city/' + cityMap[params.name] + '.json', function (data) {
                    echarts.registerMap(params.name, data);
                    var d = [];
                    for (var i = 0; i < data.features.length; i++) {
                        d.push({
                            name: data.features[i].properties.name
                        })
                    }
                    renderMap(params.name, d);

                });
            }

        } else if (params.name in areaMap) {

            alert("区级别backMap"+params.name);
            //如果是 区级别 显示区级地图
            $.getJSON('/json/area/' + areaMap[params.name] + '.json', function (data) {
                echarts.registerMap(params.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name
                    })
                }
                renderMap(params.name, d);
            });
        }
        p = params;
    });


    //点击按钮 返回全国地图
    function returnChina() {
        renderMap('china', mapdata);
    }

    //点击按钮 返回上一级地图
    function goBack() {
        //省的上一级 返回全国地图
        if (backMap == 'china') {
            renderMap('china', mapdata);

        } else if(backMap in provinces) {

            // backMap = XX省
            //显示市级地图
            $.getJSON('/json/province/' + provinces[backMap] + '.json', function (data) {
                echarts.registerMap(p.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                    d.push({
                        name: data.features[i].properties.name
                    })
                }
                renderMap(p.name, d);
            });

        } else {
            //backMap = xx 市

        }
    }

    //初始化绘制全国地图配置
    var option = {
        backgroundColor: '#e3fafd',
        title: {

            text: '中国地图下钻',
            subtext: '三级下钻',

            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei"
            },
            subtextStyle: {
                color: '#ccc',
                fontSize: 13,
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei"
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },

        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,

    };

    function renderMap(map, data) {
        option.title.subtext = map;

        option.series = [{
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            zoom: 1,
            nameMap: {
                'china': '中国'
            },
            label: {
                show: true,
                color: '#ffffff'
            },
            roam: true,
            itemStyle: {
                normal: {
                    borderColor: '#ebeff2',
                    borderWidth: 2,
                    areaColor: '#5aa4e6',
                    /*areaColor: {

                        /!*type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(	47,79,79, .1)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false*!/
                    },*/
                    shadowColor: '#216391',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#b4fefb',
                    borderWidth: 0
                }
            },
            data: data
        }];

        //渲染地图
        chart.setOption(option);
    }

</script>
<button onclick="returnChina()">返回全国地图</button>
<butonn onclick="goBack()">返回上一级</butonn>
</body>
</html>
