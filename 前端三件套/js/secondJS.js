// <!-- 看所有记录 -->
{/* <script> */ }

var url = "http://127.0.0.1:18000/"
function seeAll() {
    document.getElementById('sql1').value = "SELECT * FROM Records order by record_time desc"
    var temp = document.getElementById('exec')
    temp.onclick()
}

// </script>



// <!-- 数据库功能 -->
{/* <script type="text/Javascript"> */ }

// 执行sql
var db;
bready(function () {
    document.getElementById('exec').onclick = function () {
        testPost(document.getElementById('sql1').value)
    };

});
// </script>
// <!-- http请求 -->

function testPost(sql) {
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'http://127.0.0.1:18000/fetchAll', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    // var obj = { ping: "ping" };
    httpRequest.send(JSON.stringify({ "sql": sql }));//发送请求 将json写入send中
    /**
     * 获取数据后的处理程序
     */
    console.log("shit")
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功  
            var json1 = httpRequest.responseText;//获取到服务端返回的数据

            //得到标签
            var json = JSON.parse(json1);
            console.log(json.key)
            // var json = JSON.parse(json2)
            //拼接成html

            var htmlStr = ""

            for (i = 0; i < json.length; i++) {

                htmlStr += "<tr>"
                htmlStr += "<td>"
                htmlStr += json[i].Record_id
             
                htmlStr += "&nbsp&nbsp&nbsp&nbsp</td>"
                htmlStr += "<td>"
                htmlStr += json[i].Note
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].Value
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].From_Account
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].To_Account
                htmlStr += "</td>"
                htmlStr += "<td width:300>"
                htmlStr += json[i].Record_Time
                htmlStr += "</td>"
                htmlStr += "</tr>"

                console.log(json[i].Note)

            }
            document.getElementById("tBody").innerHTML = htmlStr


            // let doc = parser.parseFromString(stringContainingXMLSource, json)
            // console.log(doc);
            // use(["Table"], function () {
            //     Table().init({
            //         id: 'table2',
            //         header: result[0].columes,
            //         data: result[0].values
            //     });
            //     console.log(json.name);
            // });
        }
    };
}


// 支出功能
bready(function () {
    document.getElementById('insertExpendRecord').onclick = function () {
        // var tempp = "insert into Records (value, from_account, to_account, record_Time, note ) values("
        // tempp = tempp + document.getElementById('price').value
        // tempp = tempp + ", "
        // tempp = tempp + "\""
        // tempp = tempp + document.getElementById('secondAccount').value
        // tempp = tempp + "\""
        // tempp = tempp + ", "
        // tempp = tempp + "\""
        // tempp = tempp + document.getElementById('secondExpend').value
        // tempp = tempp + "\""
        // tempp = tempp + ", "
        // tempp = tempp + "\""
        // var temp3 = document.getElementById('date').value
        // temp3 = temp3.replace("T", " ")
        // tempp = tempp + temp3
        // tempp = tempp + "\""
        // tempp = tempp + ", "
        // tempp = tempp + "\""
        // tempp = tempp + document.getElementById('note').value
        // tempp = tempp + "\""
        // tempp = tempp + ")"
        // // var temp = document.getElementById('sql2').value ;
        // document.getElementById('sql1').value = tempp;


        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'http://127.0.0.1:18000/CreateRecord', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
 
    httpRequest.send(JSON.stringify({ 
        "Value":document.getElementById('price').value,
        "From_Account" : document.getElementById('secondAccount').value,
        "To_Account" : document.getElementById('secondExpend').value,
        "Record_Time": document.getElementById('date').value,
        "Note" : document.getElementById('note').value,
     }));//发送请求 将json写入send中
    /**
     * 获取数据后的处理程序
     */
    console.log("shit")
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功  
            var json1 = httpRequest.responseText;//获取到服务端返回的数据

            //得到标签
            var json = JSON.parse(json1);
            console.log(json.key)
            // var json = JSON.parse(json2)
            //拼接成html

            var htmlStr = ""

            for (i = 0; i < json.length; i++) {

                htmlStr += "<tr>"
                htmlStr += "<td width:300>"
                htmlStr += json[i].Note
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].Value
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].From_Account
                htmlStr += "</td>"
                htmlStr += "<td>"

                htmlStr += json[i].To_Account
                htmlStr += "</td>"
                htmlStr += "<td width:300>"
                htmlStr += json[i].Record_Time
                htmlStr += "</td>"
                htmlStr += "</tr>"

                console.log(json[i].Note)

            }
            document.getElementById("tBody").innerHTML = htmlStr

    }
}
    }
})


// <!-- 收入功能 -->

bready(function () {
    document.getElementById('insertIncomeRecord').onclick = function () {
        var tempp = "insert into Records (value, from_account, to_account, record_Time, note ) values("
        tempp = tempp + document.getElementById('price').value
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('secondIncome').value
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('secondAccount').value
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        var temp3 = document.getElementById('date').value
        temp3 = temp3.replace("T", " ")
        tempp = tempp + temp3
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('note').value
        tempp = tempp + "\""
        tempp = tempp + ")"
        // var temp = document.getElementById('sql2').value ;
        document.getElementById('sql1').value = tempp;
    }
}
)

// <!-- 转账功能 -->
bready(function () {
    document.getElementById('insertTransRecord').onclick = function () {
        var tempp = "insert into Records (value, from_account, to_account, record_Time, note ) values("
        tempp = tempp + document.getElementById('price').value
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('secondAccount').value
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('secondAccount2').value
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        var temp3 = document.getElementById('date').value
        temp3 = temp3.replace("T", " ")
        tempp = tempp + temp3
        tempp = tempp + "\""
        tempp = tempp + ", "
        tempp = tempp + "\""
        tempp = tempp + document.getElementById('note').value
        tempp = tempp + "\""
        tempp = tempp + ")"
        // var temp = document.getElementById('sql2').value ;
        document.getElementById('sql1').value = tempp;
    }
}
)


// <!-- 第二账户变动日志功能 -->
function printlog() {
    var first = document.form_first_type.firstType;
    var second = document.form_first_type.secondAccount;
    console.log("log")
    console.log(first.value)
    console.log(second.value)
}
// <!-- 账户选择功能 -->
function changeCard() {
    // var first = document.getElementById("firstType")
    var first = document.form_first_type.firstType;
    var second = document.form_first_type.secondAccount;
    console.log(first.selectedIndex)

    // var second  = document.getElementById("secontAccount")
    second.options.length = 0; //clear 
    // while(second.options.le)
    if (first.value == "信用卡") {
        second.options.add(new Option("招行白羊♈", "招行白羊♈"))
        second.options.add(new Option("建行visa白金", "建行visa白金"))
        second.options.add(new Option("建设银行全球支付卡", "建设银行全球支付卡"))
        second.options.add(new Option("广发有鱼白金", "广发有鱼白金"))
        second.options.add(new Option("中行汽车卡", "中行汽车卡"))
        second.options.add(new Option("故宫联名卡", "故宫联名卡"))
        second.options.add(new Option("农行国家宝藏", "农行国家宝藏"))
        second.options.add(new Option("吉维尼小船", "吉维尼小船"))
    } else if (first.value == "网络信用") {
        second.options.add(new Option("花呗", "花呗"))
        second.options.add(new Option("京东白条", "京东白条"))
    } else if (first.value == "储值网络支付") {
        second.options.add(new Option("天猫超市", "天猫超市"))
        second.options.add(new Option("支付宝", "支付宝"))
        second.options.add(new Option("微信钱包", "微信钱包"))
        second.options.add(new Option("京东小金库", "京东小金库"))
        second.options.add(new Option("翼支付", "翼支付"))
        second.options.add(new Option("建行速盈", "建行速盈"))
        second.options.add(new Option("饭卡", "饭卡"))
        second.options.add(new Option("余额宝", "余额宝"))
        second.options.add(new Option("qq钱包", "qq钱包"))
    } else if (first.value == "储蓄卡") {
        second.options.add(new Option("小白青春卡", "小白青春卡"))
        second.options.add(new Option("龙卡通", "龙卡通"))
        second.options.add(new Option("工商银行", "工商银行"))
        second.options.add(new Option("邮政储蓄", "邮政储蓄"))
        second.options.add(new Option("中行6802", "中行6802"))
        second.options.add(new Option("中行校园卡7462", "中行校园卡7462"))
        second.options.add(new Option("海绵宝宝8376", "海绵宝宝8376"))
        second.options.add(new Option("农行", "农行"))
        second.options.add(new Option("大螺丝招行", "大螺丝招行"))
        second.options.add(new Option("一鹿追梦", "一鹿追梦"))
    } else if (first.value == "现金") {
        second.options.add(new Option("现金", "现金"))
    } else if (firlst.value == "系统默认") {
        second.options.add(new Option("千金散去", "千金散去"))
        second.options.add(new Option("欠别人的", "欠别人的"))
        second.options.add(new Option("余额变更", "余额变更"))
    }
    document.form_first_type.secondAccount = second;
}
// <!-- 收入选择功能 -->
function changeIncome() {
    var first = document.form_first_income.firstIncome;
    var second = document.form_first_income.secondIncome;

    second.options.length = 0;

    if (first.value == "职业收入") {
        second.options.add(new Option("工资收入", "工资收入"))
        second.options.add(new Option("奖金收入", "奖金收入"))
        second.options.add(new Option("利息收入", "利息收入"))
    } else if (first.value == "上一代") {
        second.options.add(new Option("打赏", "打赏"))
        second.options.add(new Option("报销", "报销"))
        second.options.add(new Option("生活费", "生活费"))

    } else if (first.value == "人情") {
        second.options.add(new Option("亲戚", "亲戚"))
    } else if (first.value == "其他收入") {
        second.options.add(new Option("卖二手", "卖二手"))
        second.options.add(new Option("返还", "返还"))
        second.options.add(new Option("意外来钱", "意外来钱"))
        second.options.add(new Option("刷单", "刷单"))
    }
}
// <!-- 支出选择功能 -->
function changeExpend() {
    // var first = document.getElementById("firstType")
    var first = document.form_first_expend.firstExpend;
    var second = document.form_first_expend.secondExpend;
    console.log(first.selectedIndex)

    // var second  = document.getElementById("secontAccount")
    second.options.length = 0; //clear 

    if (first.value == "食品酒水") {
        second.options.add(new Option("食材", "食材"))
        second.options.add(new Option("早午晚餐", "早午晚餐"))
        second.options.add(new Option("酒水饮料", "酒水饮料"))
        second.options.add(new Option("水果零食", "水果零食"))
        second.options.add(new Option("烹饪用品", "烹饪用品"))
        second.options.add(new Option("聚餐", "聚餐"))
    } else if (first.value == "居家物业") {
        second.options.add(new Option("日常用品", "日常用品"))
        second.options.add(new Option("家用电器", "家用电器"))
        second.options.add(new Option("房租", "房租"))
        second.options.add(new Option("物业水电", "物业水电"))
        second.options.add(new Option("居家使用", "居家使用"))
        second.options.add(new Option("个护清洁", "个护清洁"))
        second.options.add(new Option("维修保养", "维修保养"))
    } else if (first.value == "交流通讯") {
        second.options.add(new Option("通信", "通信"))
        second.options.add(new Option("邮寄费", "邮寄费"))
    } else if (first.value == "休闲娱乐") {
        second.options.add(new Option("搞机", "搞机"))
        second.options.add(new Option("数码配件", "数码配件"))
        second.options.add(new Option("游戏、充值", "游戏、充值"))
        second.options.add(new Option("宠物宝贝", "宠物宝贝"))
        second.options.add(new Option("运动健身", "运动健身"))
        second.options.add(new Option("休闲玩乐", "休闲玩乐"))
        second.options.add(new Option("旅游度假", "旅游度假"))
        second.options.add(new Option("爱好", "爱好"))
    } else if (first.value == "服务") {
        second.options.add(new Option("各类会员服务", "各类会员服务"))
        second.options.add(new Option("人力服务", "人力服务"))
        second.options.add(new Option("知识付费", "知识付费"))
    } else if (firlst.value == "行车交通") {
        second.options.add(new Option("公共交通", "公共交通"))
        second.options.add(new Option("打车租车", "打车租车"))
        second.options.add(new Option("长途车票", "长途车票"))
    } else if (first.value == "家长") {
        second.options.add(new Option("衣食住行", "衣食住行"))
        second.options.add(new Option("孝敬", "孝敬"))
        second.options.add(new Option("医疗", "医疗"))
        second.options.add(new Option("衣帽", "衣帽"))
    } else if (first.value == "医疗保健") {
        second.options.add(new Option("医保", "医保"))
        second.options.add(new Option("药品费", "药品费"))
        second.options.add(new Option("治疗费", "治疗费"))
    } else if (first.value == "衣服饰品") {
        second.options.add(new Option("衣服裤子", "衣服裤子"))
        second.options.add(new Option("鞋帽包包", "鞋帽包包"))
        second.options.add(new Option("眼镜手表", "眼镜手表"))
    } else if (first.value == "人情往来") {
        second.options.add(new Option("送礼请客", "送礼请客"))
        second.options.add(new Option("红包", "红包"))
        second.options.add(new Option("孝敬家长", "孝敬家长"))
    } else if (first.value == "学习进修") {
        second.options.add(new Option("知", "知"))
        second.options.add(new Option("学习用品", "学习用品"))
        second.options.add(new Option("education", "education"))
    } else if (first.value = "金融保险") {
        second.options.add(new Option("利息支出", "利息支出"))
        second.options.add(new Option("保险", "保险"))
    }
    // document.form_first_type.secondAccount = second;
}

