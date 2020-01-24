var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

// parse application/json
app.use(bodyParser.json());


//send the page
app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
	res.send('Socket.IO Works!!');
});

io.on('connect', function(socket){
	console.info(new Date().toLocaleString() + ' : '+ socket.id +', connected.');

	socket.on('notif', function(val){
		io.emit('notif', val);
	}); 

	socket.on('socketio', function(msg){
		io.emit('socketio', msg);
		console.log(new Date().toLocaleString() + ' : '+ msg);
	});
	
	socket.on('AssignDriver', function(msg){
		// let str = JSON.stringify(msg);
		// let obj = JSON.parse(msg);
		io.emit('AssignDriver', msg);
		console.log(new Date().toLocaleString() + ' : '+ msg);
	});
	
	socket.on('DriverStatus', function(msg){
		io.emit('DriverStatus', msg);
		console.log(new Date().toLocaleString() + ' : '+ msg);
	});
	
	
	socket.on('disconnect', function(){
		console.log(new Date().toLocaleString() + ' : ' + socket.id + ', disconnected.');
	});
	
	setInterval(function() {
	}, 5000);
});


http.listen(port, function(){
	console.log(`listening on Port : ${port}`);
});