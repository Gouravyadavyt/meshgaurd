const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 dVPN Hub is LIVE on port ${PORT}`);
console.log(`📡 Waiting for nodes to register...`);

let nodes = [];
// Add a simulation for data transfer
setInterval(() => {
    if (nodes.length > 0) {
        const traffic = (Math.random() * 5).toFixed(2);
        console.log(`[TRAFFIC] Node ${nodes[0].id} is routing ${traffic} MB/s... 🛡️`);
    }
}, 3000);
wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`✨ New connection attempt from: ${ip}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'REGISTER_NODE') {
                nodes.push({ id: data.id, pubKey: data.pubKey, ip: ip });
                console.log(`✅ NODE REGISTERED: [${data.id}] with PubKey: ${data.pubKey.substring(0, 10)}...`);
            }
            
            // Send the list of available nodes back to the requester
            ws.send(JSON.stringify({ type: 'NODE_LIST', nodes }));
        } catch (err) {
            console.error("❌ Failed to parse message:", err);
        }
    });

    ws.on('close', () => console.log("🔌 A device disconnected."));
});