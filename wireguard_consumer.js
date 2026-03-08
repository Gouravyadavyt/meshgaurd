const { execSync } = require('child_process');
const fs = require('fs');

const LAPTOP_1_IP = '172.20.10.x'; // Use your Hotspot IP
const PROVIDER_PUB_KEY = 'PUB_KEY_ku79vo';

const privateKey = execSync('wg genkey').toString().trim();
const publicKey = execSync(`echo ${privateKey} | wg pubkey`).toString().trim();

const conf = `
[Interface]
PrivateKey = ${privateKey}
Address = 10.0.0.2/24

[Peer]
PublicKey = ${PROVIDER_PUB_KEY}
Endpoint = ${LAPTOP_1_IP}:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
`;

fs.writeFileSync('wg_client.conf', conf);
console.log("✅ Client Config Generated.");
console.log(`🔑 Send THIS Key to Laptop 1: ${publicKey}`);