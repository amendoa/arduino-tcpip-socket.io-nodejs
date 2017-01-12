//I'm writing with es5 because this is just a test,
//and i don't want configure one task for compile es6 or something like that

var socket = new io.connect({
	port: 3000,
	rememberTransport: false
});

function turnLedOn () {
	socket.send(1);
}

function turnLedOff () {
	socket.send(0);
}

socket.on('connect', function () {
	console.log('Web client has been connected');
});

socket.on('disconnect', function () {
	console.log('Web client has been disconnected');
});