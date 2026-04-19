---
name: web-search
description: Search the web for current information, news, research topics, and competitive intelligence. Use when user asks about recent events, needs to find sources, or wants to research any topic requiring up-to-date information from the internet.
allowed_tools:
  - web_search
---

# Web Search Skill

Search the web for current information, news, and research topics.

## Tool
- **web_search**: Search the web
  - Input: `{ query: string, limit?: number }`
  - Returns: Search results with links and snippets

## Usage
Use when:
- Researching current events or news
- Finding sources for claims
- Competitive intelligence
- Market research
- Any topic requiring up-to-date web information

## Example
```
web_search({ query: "latest AI trends 2025", limit: 5 })
```
