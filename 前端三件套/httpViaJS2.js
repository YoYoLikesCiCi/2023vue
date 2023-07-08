

var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
httpRequest.open('POST', 'url', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
/**
 * 获取数据后的处理程序
 */
httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
        var json = httpRequest.responseText;//获取到服务端返回的数据
        console.log(json);
    }
};