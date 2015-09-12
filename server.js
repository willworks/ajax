var express = require('express'),//express路由
	fs = require('fs'),// node文件操作板块
    app = express(),//实例化
    bodyParser = require('body-parser');//http报文文本解析

// 路由中转静态资源
app.use('/', express.static(__dirname + '/app'));

// see https://github.com/expressjs/body-parser
// 添加 body-parser ，能起到分析http报文的作用，自动划分出每一个传递的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 处理GET请求
app.get('/ajax_get', function(req, res){
	fs.readFile("data.json",'utf-8',function(err,data){  
	    if(err){  
	        console.log("error");  
	    }else{  
	    	res.send(data);
	        console.log(data);  
	    }  
	});  
});

// 处理JSONP请求
app.get('/jsonp', function(req, res){ 
	// 读取文件内容加入到回调字符串内 
	fs.readFile("data.json",'utf-8',function(err,data){  
	    if(err){  
	        console.log("error");  
	    }else{  
	    	var js = 'callback('+data+')';
	        console.log(js);  
	        res.send(js);
	    }  
	}); 
});

// 处理POST请求
app.post('/ajax_post', function(req, res){
	var name=req.body.name,
		age=req.body.age,
		sex=req.body.sex;

	console.log(name);
	console.log(age);
	console.log(sex);

	var data = '{'+'"'+"name"+'":'+'"'+name+'",'+'"'+"age"+'":'+'"'+age+'",'+'"'+"sex"+'":'+'"'+sex+'"'+'}';
	fs.writeFile("data.json",data.toString(),function(err,data){  
	    if(err){  
	        console.log("error");  
	    }else{  
	    	res.send('{"info":"success"}');
	    }  
	});  
});

app.listen(8080, function(){
	console.log('listening on *:8080');
});