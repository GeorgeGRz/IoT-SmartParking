const WebSocketServer = require("ws").Server;
const HttpsServer = require('https').createServer;
const fs = require("fs");


var https = require('https');





//import { WebSocketServer } from 'ws';
//TO SKIP CA VERIFICATION(IN CASE OF SELF-SIGNED CA)
//RUN SERVER WITH : NODE_TLS_REJECT_UNAUTHORIZED='0' node server.js 


server = HttpsServer({
    cert: fs.readFileSync("/home/george/Documents/IoT-Project/WebSocket Server/certificates/domain.crt"),
    key: fs.readFileSync("/home/george/Documents/IoT-Project/WebSocket Server/certificates/domain.key"),
                     passphrase: 'athens'
}, function( req, res ) {res.writeHead(200);res.end('<b>Hello World!</b>');}).listen(9898);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s, sending back to verify', JSON.parse(data));
    const options = {
      hostname: '192.168.1.4',
      port: 443,
      path: '/verify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.write(data)
    req.end()

  
    });
  
  ws.send('RECEIVED');
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

