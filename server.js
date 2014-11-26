'use strict';

/*
 * Websockets 
 */

 var WebSocketServer = require('ws').Server;
 var wss = new WebSocketServer({port: 8000});


 wss.on('connection', function(ws) {
 	ws.on('message', function(message) {
 		sendData(message.replace('?', ' '));
 		for(var i in wss.clients) {
 			if (wss.clients[i] != ws) {
 				wss.clients[i].send(message);
 			}
 		}

 	});
 	ws.send('ok' );
 });

/*
 * HTTP-Server 
 */
 var express = require('express');
 var app = express();
 app.use(express.static('public'));
 var server = app.listen(80, function () {});

/*
 * Twitter Stream 
 */
 var Twit = require('twit');

 var T = new Twit({
 	consumer_key:         '75GuhkehsPv7KkF4XKpJnA',
 	consumer_secret:      'TkTZBDnzina0U7ZiIdXocmvhsu7jdwj92zCjusoPi4',
 	access_token:         '54156137-3bbcAkhxpvUq9OolYq56GRsdbC9uAYYJRZqxmyllf',
 	access_token_secret:  'mjw8BA1q7fwUxlR04itRxW8Ecy96fV1BYoJfs7yxhrvqa'
 });

 var hashtag = '#everyware';
 var stream = T.stream('statuses/filter', { track: hashtag });

 stream.on('tweet', function (tweet) {
 	var text = tweet.text.replace(hashtag, '').trim();
 	console.log(tweet.user.name + ': >' + text);
 	sendData(text);
 });

/*
 * Serial Port
 */
 var Serial = require('serialport');
 var SerialPort = Serial.SerialPort;
 var serialPort;

 Serial.list(function (err, ports) {
 	console.log('Searching Teensy');
 	for (var p in ports) {
 		console.log(ports[p]);
 		if (ports[p].manufacturer == 'Teensyduino' || ports[p].pnpId.indexOf('Teensyduino') > -1) {
 			var portName = ports[p].comName;
 			serialPort = new SerialPort(portName, {});
 			serialPort.on('open', initSerial);
 			return;
 		}
 	}
 	console.log('No Teensy');
 });

 function initSerial() {
 	console.log('Teensy opened');
 	serialPort.on('data', function(data) {
		//console.log('data received: ' + data);
	});
 	serialPort.on('error', function(data) {
 		console.log('error received: ' + data);
 	});
 	serialPort.on('close', function() {
 		console.log('serial.closed:' );
 	});
 }

 function sendData(dataString) {
 	dataString += '#';
 	console.log('send: ' + dataString);
 	try {
 		serialPort.write(dataString, function(err, results) {
			//if (err)	console.log('err ' + err);
			//console.log('results ' + results);
		});
 	} catch (err) {
 		console.log('Serial Error');
 	}
 }

