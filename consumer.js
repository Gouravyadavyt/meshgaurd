const WebSocket = require('ws');

const LAPTOP_1_IP = '10.136.244.135'; // <--- CHANGE THIS
const ws = new WebSocket(`ws://${LAPTOP_1_IP}:8080`);

console.log(`🔍 Searching for dVPN nodes on ${LAPTOP_1_IP}...`);

ws.on('open', () => {
    console.log("✅ Connected to dVPN Network!");
    // Ask for the list of nodes
   
    ws.send(JSON.stringify({ type: 'GET_NODES' }));
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    if (response.nodes && response.nodes.length > 0) {
        console.log("📡 AVAILABLE EXIT NODES FOUND:");
        console.table(response.nodes);
        console.log("\n🚀 Ready to tunnel traffic to: " + response.nodes[0].id);
    } else {
        console.log("😴 No nodes providing bandwidth right now.");
    }
});