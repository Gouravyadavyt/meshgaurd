const WebSocket = require('ws');
let myBalance = 500.00;

const ws = new WebSocket('ws://LAPTOP_1_IP:8080');

ws.on('open', () => {
    console.clear();
    console.log("======================================");
    console.log("   🛡️ DECENTRALIZED VPN DASHBOARD     ");
    console.log("======================================");
    ws.send(JSON.stringify({ type: 'REQUEST_CONNECTION' }));
});

ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.type === 'CONNECTION_READY') {
        console.log(`✅ TUNNEL ESTABLISHED TO: ${msg.node.id}`);
        startBilling();
    }
});

function startBilling() {
    setInterval(() => {
        const usage = Math.random() * 10;
        myBalance -= usage;
        console.log(`🛰️ Tunneling... Usage: ${usage.toFixed(2)} KB | Balance: ${myBalance.toFixed(2)} tokens`);
        
        ws.send(JSON.stringify({ 
            type: 'TRAFFIC_REPORT', 
            clientId: 'Laptop_2', 
            bytes: usage 
        }));
    }, 2000);
}