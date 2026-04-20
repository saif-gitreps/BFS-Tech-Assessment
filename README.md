# WhatsApp Message Broker

A Node.js backend service designed to bridge standard RESTful APIs with WhatsApp Web. This application provides a scalable, stateful, and modular solution for programmatically sending messages, managing sessions, and handling real-time authentication via WebSockets.

The system is built with a focus on concurrency management, session persistence, and clean architecture, making it suitable for integration into larger enterprise messaging ecosystems.

## Key Features:
- Real-Time QR Authentication: Implements Socket.IO to transmit WhatsApp Web QR codes from the server to the client in real-time, ensuring a seamless onboarding experience.

- Session Persistence: Intelligent session management that stores authentication states, allowing the server to restart without requiring users to re-scan the QR code.

- Automated Reconnection: Robust handling for network disruptions or session timeouts, ensuring the service remains online with minimal downtime.

- Concurrency & Queuing: Integrated request handling to manage high-volume API calls. Optional queuing ensures that message delivery respects WhatsApp's operational limits and prevents rate-limiting issues.

- Logging & Error Handling: Centralized error management and structured logging for easier debugging and production monitoring.

## Prerequisites

- Node.js ≥ 18
- Google Chrome or Chromium installed (used by Puppeteer under the hood)
- A WhatsApp account to authenticate with
- npm or yarn installed

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/saif-gitreps/BFS-Tech-Assessment.git
cd bfs-tech-assessment

# 2. Install dependencies

npm install
#or
yarn

# 3. Create your .env file

cp .env.example .env
# or just copy paste manually and Edit .env as needed

# 4. Start in development mode (auto-restart on save)

npm run dev
#or
yarn run dev

# 5. Open the QR viewer in your browser

open http://localhost:3000

# 6. Scan the QR code with WhatsApp on your phone

# 7. hit the endpoints in api tester like Postman

http://localhost:3000/server-status # to check server status initially
http://localhost:3000/api/status
http://localhost:3000/api/message/send

```

# Note!

in file /src/services/whatsapp.services.ts inside the initalize method you may not need to provide a certain prop:

```js
    puppeteer: {
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // this exists because I ran into errors with puppeteer installation, do remove this PROP since you may not have the same error.
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
```

## API Reference

### Health Check

```
GET /server-status
```

```json
{ "success": true, "message": "Server is running", "uptime": 42 }
```

### WhatsApp + Queue Status

```
GET /api/status
```

```json
{
   "success": true,
   "data": {
      "status": "READY",
      "ready": true,
      "uptime": 120,
      "queueSize": 0,
      "pending": 0
   }
}
```

### Send a Message

```
POST /api/messages/send
Content-Type: application/json
```

```json
{
   "phone": "8801XXXXXXXXX",
   "message": "Hello from the API!"
}
```

**Response:**

```json
{
   "success": true,
   "message": "Message sent successfully",
   "data": {
      "messageId": "XXXXXXXX",
      "phone": "8801XXXXXXXXX",
      "timestamp": "2024-01-01T00:00:00.000Z"
   }
}
```

> **Phone format:** digits only, no `+`, no spaces. Include the country code.  
> Example: Bangladesh `880` + number = `8801712345678`

---

## Building for Production

```bash
npm run build      # Compiles TypeScript to ./dist folder
npm start          # Runs the compiled output

```

---

## Session Persistence

On first run a QR code is displayed. After scanning, the session is saved to `SESSION_DATA_PATH` (`.wwebjs_auth/` by default). On subsequent restarts WhatsApp will reconnect automatically without requiring a new QR scan.

To force a fresh authentication, delete the session folder manually or suitable command line

```

```
