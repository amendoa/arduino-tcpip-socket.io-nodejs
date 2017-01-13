//I'm writing with es5 because this is just a test,
//and i do not need configure one task for compile es6 or something like that

var socket = new io.connect({
	port: 3000,
	rememberTransport: false
});

function toggleLed () {
	console.log('Toggle led');
	socket.send(13);
}

socket.on('connect', function () {
	console.log('Web client has been connected');
});

socket.on('disconnect', function () {
	console.log('Web client has been disconnected');
});

document.getElementById('interruptor').addEventListener('click', toggleLed);