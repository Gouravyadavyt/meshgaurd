const { execSync } = require('child_process');
const fs = require('fs');

const LAPTOP_1_IP = '172.20.10.x'; // Use your Hotspot IP
const PROVIDER_PUB_KEY = 'PUB_KEY_ku79vo';

const privateKey = execSync('wg genkey').toString().trim();
const publicKey = execSync(`echo ${privateKey} | wg pubkey`).toString().trim();
const config = (clientPrivateKey, clientAddress, providerPublicKey, endpoint) => {
    return `
[Interface]
PrivateKey = ${clientPrivateKey}
Address = ${clientAddress}
# Native DNS Filtering: Cloudflare Security + Malware Blocking
DNS = 1.1.1.3, 1.0.0.3 

[Peer]
PublicKey = ${providerPublicKey}
Endpoint = ${endpoint}
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
    `.trim();
};
fs.writeFileSync('wg_client.conf', conf);
console.log("✅ Client Config Generated.");

console.log(`🔑 Send THIS Key to Laptop 1: ${publicKey}`);
