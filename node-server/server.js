const WebSocketServer = require("ws").Server;
const HttpsServer = require('https').createServer;
const fs = require("fs");
//import { WebSocketServer } from 'ws';

//Server will implement A* path finding algorithm to calculate shortest path to ESP32 car


server = HttpsServer({
    cert: fs.readFileSync("/home/george/node-server/certificates/domain.crt"),
    key: fs.readFileSync("/home/george/node-server/certificates/domain.key"),
                     passphrase: 'athens'
}, function( req, res ) {res.writeHead(200);res.end('<b>Hello World!</b>');}).listen(9898);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  
  ws.send('something');
});


/*  astar-list.js http://github.com/bgrins/javascript-astar
    MIT License
    
    ** You should not use this implementation (it is quite slower than the heap implementation) **
    
    Implements the astar search algorithm in javascript
    Based off the original blog post http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript
    It has since been replaced with astar.js which uses a Binary Heap and is quite faster, but I am leaving
    it here since it is more strictly following pseudocode for the Astar search
    **Requires graph.js**
*/

