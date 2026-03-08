const WebSocket = require('ws');

// FOR THE HACKATHON: We will use a mock key if WireGuard isn't fully set up yet
const pubKey = '1a+e+sbyBmtOpm/TBXiwC8NO4ua/R/xGKpgNTVDQHig=';

// Since the server is on this same laptop, we use localhost
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log("🔗 Provider: Connected to Hub!");
    
    ws.send(JSON.stringify({ 
        type: 'REGISTER_NODE', 
        id: 'Gourav_Node_013', // Your custom node name
        pubKey: pubKey 
    }));
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    console.log(`🌍 Network Stats: ${response.nodes.length} node(s) online.`);
    console.table(response.nodes); // This will look cool in your terminal
});

ws.on('error', (err) => console.log("❌ Connection Error:", err.message));