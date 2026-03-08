# 🛡️ MeshGuard dVPN
### *Secure, Community-Powered Smart-Relay Network*

MeshGuard is a decentralized VPN (dVPN) built on the military-grade **WireGuard** protocol. It moves away from "Open Relays" to **Smart Relays**, designed specifically for verified communities like universities and government departments.

---

## 📂 Architecture & File Breakdown

The system is split into three modular layers to ensure scalability and security.

### 1️⃣ Signaling Layer (The Brain)
* **`server.js`**
    * **Role:** The Central Signaling Hub.
    * **Logic:** A WebSocket server that acts as a "matchmaker." It allows providers and consumers to find each other and swap cryptographic keys without ever seeing the actual traffic.

### 2️⃣ Orchestration Layer (The Logic)
* **`provider.js` / `consumer.js`**
    * **Role:** Peer Managers.
    * **Logic:** These scripts handle the "handshake" logic. They talk to the `server.js` to register availability or request a connection.
* **`wireguard_provider.js` / `wireguard_consumer.js`**
    * **Role:** Automation Engines.
    * **Logic:** These scripts automate the "heavy lifting." They trigger the WireGuard CLI to generate **Base64 Private/Public keys** and write the `.conf` files dynamically.

### 3️⃣ Networking Layer (The Tunnel)
* **`wg0.conf`**
    * **Role:** The Provider's Gateway.
    * **Logic:** Sets up the virtual interface (`10.0.0.1`) and defines security policies for incoming traffic.
* **`wg_client.conf`**
    * **Role:** The Consumer's Passport.
    * **Logic:** Directs all system traffic (`0.0.0.0/0`) into the encrypted tunnel toward the provider.

---

## 🛠️ Tech Stack & Requirements

### **Prerequisites**
* **WireGuard CLI:** Installed and accessible via terminal (`wg --version`).
* **Node.js:** v16.x or higher.
* **Admin Access:** Required to modify network interfaces and routing tables.
## 🏗️ Technical Architecture

This system uses a three-tier architecture to decouple signaling from data transport, ensuring maximum privacy and speed.

### 🗺️ System Map
```text
┌────────────────────────────────────────────────────────────────────────────┐
│                          LOCAL MESH ECOSYSTEM                              │
│                                                                            │
│   LAPTOP 2 (CONSUMER)            LAPTOP 1 (SERVER + PROVIDER)              │
│  ┌──────────────────────┐        ┌──────────────────────────────────────┐  │
│  │   Node.js Client     │        │          Node.js Hub (Server.js)     │  │
│  │  ┌────────────────┐  │        │        ┌────────────────────────┐    │  │
│  │  │ consumer.js    │  │        │        │ WebSocket Matchmaker   │    │  │
│  │  │ (Key Request)  │◀─┼────────┼───────▶│ RSA Handshake Registry │    │  │
│  │  └────────────────┘  │        │        └────────────────────────┘    │  │
│  │          │           │        │                     ▲                │  │
│  │          ▼           │        │                     │                │  │
│  │  ┌────────────────┐  │        │        ┌────────────────────────┐    │  │
│  │  │ wg_client.conf │  │        │        │      provider.js       │    │  │
│  │  │ (AllowedIPs=0) │  │        │        │  (Node Registration)   │    │  │
│  │  └────────────────┘  │        │        └────────────────────────┘    │  │
│  └──────────┬───────────┘        └─────────────────────┬────────────────┘  │
│             │                                          │                   │
└─────────────┼──────────────────────────────────────────┼───────────────────┘
              │            SECURE TUNNEL                 │
              └──────────────────────────────────────────┘
                           UDP Port: 51820
              (Military Grade ChaCha20 Encryption)

┌────────────────────────────────────────────────────────────────────────────┐
│                         SMART-RELAY SAFETY LAYER                           │
│  ┌───────────────────┐    ┌────────────────────┐    ┌───────────────────┐  │
│  │ Policy Routing    │    │ DNS-Level Filter   │    │ Handshake Log     │  │
│  │ (Port Blocking)   │───▶│ (Cloudflare 1.1.1.3)│───▶│ (Audit Trail)     │  │
│  └───────────────────┘    └────────────────────┘    └───────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```
### **Libraries Used**
```bash
npm install ws qrcode-terminal
