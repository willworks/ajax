var express = require('express'),//express路由
	fs = require('fs'),// node文件操作板块
    app = express();//实例化

app.use('/', express.static(__dirname + '/app'));

app.get('/ajax', function(req, res){
	fs.readFile("data.json",'utf-8',function(err,data){  
	    if(err){  
	        console.log("error");  
	    }else{  
	    	res.send(data);
	        console.log(data);  
	    }  
	});  
});

app.listen(8080, function(){
	console.log('listening on *:8080');
});