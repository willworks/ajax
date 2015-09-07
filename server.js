var express = require('express'),//express路由
	fs = require('fs'),// node文件操作板块
    app = express(),//实例化
    bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/app'));
// see https://github.com/expressjs/body-parser
// 添加 body-parser ，能起到分析http报文的作用，自动划分出每一个传递的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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


app.post('/ajax_post', function(req, res){
	var name=req.body.name,
		age=req.body.age,
		sex=req.body.age;

	console.log(name);
	console.log(age);
	console.log(sex);

	fs.open('data.json', 'r', function(err, fd) {
	    // got fd file descriptor
	});
 
	res.send('{"info":"success"}');
});

app.listen(8080, function(){
	console.log('listening on *:8080');
});