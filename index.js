var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')) );

function validateTime(req, timeString){
	//console.log(req.url +' requested '+timeString);
	if(typeof new Date(timeString) === 'object'){
		req.timeRequested = Math.floor( new Date(timeString).getTime() / 1000 );
		req.timeString = new Date(timeString).toLocaleDateString('en-US',{month:"long",day:"numeric",year:'numeric'});
		req.timeRequestValid= true;
	}
}

app.all('*', function(req,resp,next){
	console.log('req for'+req._parsedUrl.path);
	req.timeString = null;
	req.timeRequested = null;
	req.timeRequestValid = false;
	next();
});

//unix time routes
app.use(/\/\d+$/,function(req,resp,next){
	//console.log('unix req ');
	var time = decodeURIComponent(req._parsedUrl.path).substring(1);
	req.timeRequest = 'unix';
	if(typeof new Date(time) === 'object'){
		req.timeRequestValid = true;
		req.timeRequested = time;
		req.timeString = new Date(time * 1000).toLocaleDateString('en-US',{month:"long",day:"numeric",year:'numeric'});
	}
	next();
});
//american time style routes
app.use(/\/([a-zA-Z]+)%20(\d+)(th|st)?,?%20(\d{4,})/,function(req,resp,next){
	//console.log("ameircan req");
	var time = req._parsedUrl.path;
	req.timeRequest = 'american';
	var matches =  /\/([a-zA-Z]+)%20(\d+)(?:th|st)?,?%20(\d{4,})/.exec(time);

	var timeString = matches[1]+' '+matches[2]+', '+matches[3];
	validateTime(req, timeString);
	next();
});

//british style time routes
app.use(/\/(\d+)(th|st)?%20(of%20)?([a-zA-Z]+),?%20(\d{4,})/,function(req,resp,next){
	//console.log('british req');
	var time = req._parsedUrl.path;
	req.timeRequest = 'british';
	var matches = /\/(\d+)(?:th|st)?%20(?:of%20)?([a-zA-Z]+),?%20(\d{4,})/.exec(time);
	var timeString = matches[2]+' '+matches[1]+', '+matches[3];
	validateTime(req, timeString);
	next();
});


app.get('*',function(req,resp){
	//console.log('get req');
	resp.status(200).json({'unix':req.timeRequested, 'human':req.timeString});
});


app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
