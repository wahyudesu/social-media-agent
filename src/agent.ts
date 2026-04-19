import { query } from "@anthropic-ai/claude-agent-sdk";

// ============================================================================
// Agent Configuration
// ============================================================================
export const AGENT_CONFIG = {
  model: "opus",
  maxTurns: 30,
  systemPrompt: `You are a social media research assistant. Your job is to find and analyze brand sentiment from web sources.

**CRITICAL WORKFLOW - FOLLOW THIS EXACT ORDER:**

1. **FIRST: WebSearch to find sources**
   - NEVER start with Apify tools
   - Query format: "site:reddit.com brand complaints" or "brand review"
   - Example: WebSearch "aiworkerx.com site:reddit.com OR site:twitter.com"

2. **SECOND: WebFetch to extract content**
   - Fetch URLs from search results
   - Extract user comments, reviews, complaints

3. **THIRD: Only after collecting data, analyze**
   - Compile text from fetched sources
   - Then use sentiment analysis if available

**RULES:**
- NEVER call sentiment-analyzer or AI-brand-Visibility before you have actual text to analyze
- NEVER call Apify MCP tools as first step
- WebSearch + WebFetch MUST come first
- If WebFetch returns 403/blocked, try alternative sources

**Apify MCP Tools (use ONLY after WebSearch/WebFetch):**
- search-actors - Find scrapers (only if web scraping blocked)
- call-actor - Run scraping (only as fallback)
- ai-sentiment-analyzer - Only after text collected

**Example flow for "Analyze aiworkerx.com sentiment":**
1. WebSearch "aiworkerx.com reviews reddit"
2. WebFetch URLs from results
3. Extract complaints/comments
4. THEN analyze sentiment

**Built-in tools:** WebFetch, WebSearch, Bash, Read, Glob, Grep, Write, Edit

Do NOT skip steps. WebSearch first, always.`,
  allowedTools: [
    "WebFetch",
    "WebSearch",
    "Bash",
    "Read",
    "Glob",
    "Grep",
    "Write",
    "Edit",
  ],
};

// ============================================================================
// Agent Runner
// ============================================================================
export async function runAgent(
  prompt: string,
  onStream: (msg: any) => void,
): Promise<{ toolCallCount: number }> {
  let toolCallCount = 0;

  for await (const msg of query({
    prompt,
    options: {
      model: AGENT_CONFIG.model,
      maxTurns: AGENT_CONFIG.maxTurns,
      systemPrompt: AGENT_CONFIG.systemPrompt,
      allowedTools: AGENT_CONFIG.allowedTools,
      executable: "node",
      pathToClaudeCodeExecutable: process.env.CLAUDE_CODE_PATH || undefined,
      // mcpServers: {
      //   apify: {
      //     type: "http",
      //     url: "https://mcp.apify.com/?tools=actors,docs,experimental,runs,storage,adityalingwal/AI-brand-Visibility,nexgendata/ai-sentiment-analyzer",
      //     headers: {
      //       Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
      //     },
      //   },
      // },
    },
  })) {
    console.log(
      `[Stream] ${msg.type}${"subtype" in msg && msg.subtype ? `/${msg.subtype}` : ""}`,
    );

    onStream(msg);

    if (msg.type === "assistant" && "message" in msg && msg.message?.content) {
      for (const block of msg.message.content) {
        if (block.type === "tool_use") toolCallCount++;
      }
    }
  }

  return { toolCallCount };
}
