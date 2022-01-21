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
      hostname: '192.168.1.2',
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
        process.stdout.write(d+"\n")
        ws.send(String(d));
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.write(data)
    req.end()

  
    });
  

});



