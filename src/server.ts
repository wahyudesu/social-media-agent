import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { AGENT_CONFIG, runAgent } from "./agent.js";

// ============================================================================
// Session Management
// ============================================================================
interface WSSession {
  id: string;
  messages: Array<{ role: string; content: string }>;
}

const sessions = new Map<string, WSSession>();
const wsClients = new Map<WebSocket, string>();

function getOrCreateSession(sessionId: string): WSSession {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { id: sessionId, messages: [] });
  }
  return sessions.get(sessionId)!;
}

// ============================================================================
// Express App
// ============================================================================
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    activeSessions: sessions.size,
    activeClients: wsClients.size,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// WebSocket Server
// ============================================================================
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws: WebSocket) => {
  console.log(`[WS] Client connected`);
  wsClients.set(ws, "default");

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      handleMessage(ws, msg);
    } catch {
      ws.send(JSON.stringify({ type: "error", error: "Invalid JSON" }));
    }
  });

  ws.on("close", () => {
    console.log(`[WS] Client disconnected`);
    wsClients.delete(ws);
  });

  ws.send(JSON.stringify({
    type: "connected",
    message: "Connected to Social Media Agent",
    sessionId: "default",
  }));
});

function handleMessage(ws: WebSocket, msg: any): void {
  const sessionId = wsClients.get(ws) || msg.sessionId || "default";

  switch (msg.type) {
    case "session":
      wsClients.set(ws, msg.sessionId || "default");
      ws.send(JSON.stringify({ type: "session_acked", sessionId: wsClients.get(ws) }));
      break;

    case "chat": {
      const content = msg.content;
      if (!content) {
        ws.send(JSON.stringify({ type: "error", error: "content is required" }));
        return;
      }

      const session = getOrCreateSession(sessionId);
      session.messages.push({ role: "user", content });

      ws.send(JSON.stringify({ type: "status", text: "Processing...", sessionId }));
      runAgentStream(ws, session, content, sessionId);
      break;
    }

    default:
      ws.send(JSON.stringify({ type: "error", error: `Unknown message type: ${msg.type}` }));
  }
}

async function runAgentStream(ws: WebSocket, session: WSSession, prompt: string, sessionId: string): Promise<void> {
  ws.send(JSON.stringify({ type: "status", text: "Starting agent...", sessionId }));

  let toolCallCount = 0;

  try {
    await runAgent(prompt, (msg) => {
      if (msg.type === "assistant" && msg.message?.content) {
        for (const block of msg.message.content) {
          if (block.type === "tool_use") {
            toolCallCount++;
            console.log(`  ├─ TOOL: ${block.name}`);
            ws.send(JSON.stringify({
              type: "tool_call",
              toolName: block.name,
              toolId: block.id,
              toolInput: block.input,
              sessionId,
            }));
          }

          if (block.type === "text") {
            console.log(`  └─ TEXT: ${block.text.substring(0, 100)}...`);
            ws.send(JSON.stringify({ type: "text", text: block.text, sessionId }));
          }

          if (block.type === "thinking") {
            ws.send(JSON.stringify({ type: "thinking", sessionId }));
          }
        }

        const lastBlock = msg.message.content[msg.message.content.length - 1];
        if (lastBlock?.type === "tool_use") {
          ws.send(JSON.stringify({ type: "status", text: `Executed ${lastBlock.name}`, sessionId }));
        }
      }

      if (msg.type === "user") {
        ws.send(JSON.stringify({ type: "status", text: "Processing tool result...", sessionId }));
      }

      if (msg.type === "result") {
        console.log(`[Complete] success=${msg.subtype === "success"}, cost=$${msg.total_cost_usd}, duration=${msg.duration_ms}ms`);
        ws.send(JSON.stringify({
          type: "result",
          success: msg.subtype === "success",
          cost: msg.total_cost_usd,
          duration_ms: msg.duration_ms,
          tool_calls: toolCallCount,
          sessionId,
        }));
      }
    });

    session.messages.push({ role: "assistant", content: "Agent completed" });
  } catch (err) {
    console.error(`[Error] ${err}`);
    ws.send(JSON.stringify({ type: "error", error: String(err), sessionId }));
  }
}

// ============================================================================
// Start Server
// ============================================================================
const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║  Social Media Agent Server (WebSocket + REST)           ║
╠════════════════════════════════════════════════════════╣
║  REST:        http://localhost:${PORT}                     ║
║  WebSocket:   ws://localhost:${PORT}/ws                   ║
╠════════════════════════════════════════════════════════╣
║  REST Endpoints:                                        ║
║    GET  /health      - Health check                     ║
║                                                        ║
║  WebSocket Messages:                                   ║
║    → {type:"session", sessionId:"my-session"}           ║
║    → {type:"chat", content:"your message"}              ║
║                                                        ║
║  Incoming Messages:                                    ║
║    ← {type:"connected", ...}                            ║
║    ← {type:"status", text:"..."}                        ║
║    ← {type:"tool_call", toolName:"...", ...}           ║
║    ← {type:"text", text:"..."}                          ║
║    ← {type:"result", success:true, ...}                ║
╚══════════════════════════════════════════════════════════╝

Test WebSocket with wscat:
  npx wscat -c ws://localhost:${PORT}/ws
  > {"type":"chat","content":"What is AI?"}
`);
});
