const { execSync } = require('child_process');
const fs = require('fs');

// 1. Generate Real Keys
const privateKey = execSync('wg genkey').toString().trim();
const publicKey = execSync(`echo ${privateKey} | wg pubkey`).toString().trim();

// 2. Create the Configuration File (wg0.conf)
const conf = `
[Interface]
PrivateKey = ${privateKey}
Address = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey = <PUB_KEY_xftmmb>
AllowedIPs = 10.0.0.2/32
`;

fs.writeFileSync('wg0.conf', conf);

console.log("✅ WireGuard Config Generated.");
console.log(`🔑 Your Public Key: ${publicKey}`);
console.log("🚀 Run this command to start the tunnel: 'wg-quick up ./wg0.conf'");