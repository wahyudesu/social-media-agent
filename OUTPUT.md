npx wscat -c ws://localhost:3000/ws
Connected (press CTRL+C to quit)
< {"type":"connected","message":"Connected to Social Media Agent","sessionId":"default"}
> {"type":"chat","content":"detect negative any sentiment about brand aiworkerx.com"}
< {"type":"status","text":"Processing...","sessionId":"default"}
< {"type":"status","text":"Starting agent...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebSearch","toolId":"call_function_74v48fe8ohsd_1","toolInput":{"query":"aiworkerx.com negative reviews complaints"},"sessionId":"default"}
< {"type":"status","text":"Executed WebSearch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebSearch","toolId":"call_function_1t9o57gl4ae6_1","toolInput":{"query":"aiworkerx reviews"},"sessionId":"default"}
< {"type":"status","text":"Executed WebSearch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebSearch","toolId":"call_function_petkcplna0ov_1","toolInput":{"query":"aiworkerx"},"sessionId":"default"}
< {"type":"status","text":"Executed WebSearch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"text","text":"Web search API failing. Let me try fetching directly.\n","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_bkk9iafsfvsz_1","toolInput":{"url":"https://aiworkerx.com","prompt":"Extract any information about the company, reviews, testimonials, or any sentiment indicators. Look for contact info, services offered, and any red flags."},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_yqgg8sem75g5_1","toolInput":{"url":"https://www.google.com/search?q=aiworkerx.com+review","prompt":"Find any reviews, complaints, negative sentiment, or scam reports about aiworkerx.com or AI WorkerX"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_hm82e4rw74cn_1","toolInput":{"url":"https://www.trustpilot.com/review/aiworkerx.com","prompt":"Find any reviews, complaints, or negative sentiment about AI WorkerX"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_juw21nvzcp7s_1","toolInput":{"url":"https://www.reddit.com/search/?q=aiworkerx","prompt":"Find any mentions, complaints, or discussions about aiworkerx or AI WorkerX"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_y46ovcwo93bq_1","toolInput":{"url":"https://www.scam-detector.com/validate/aiworkerx.com/","prompt":"Find any scam reports or warnings about aiworkerx.com"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_k864hop6tjqp_1","toolInput":{"url":"https://web.archive.org/web/*/aiworkerx.com","prompt":"Extract any information about aiworkerx.com reviews, complaints, or negative sentiment"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_ffu0oxxbo7a2_1","toolInput":{"url":"https://www.linkedin.com/company/aiworkerx","prompt":"Find any information about AI WorkerX company, reviews, or negative sentiment"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_u1puus2wsqcy_1","toolInput":{"url":"https://www.facebook.com/aiworkerx","prompt":"Find any reviews, complaints, or negative sentiment about AI WorkerX"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_vm1c9epwd1gk_1","toolInput":{"url":"https://x.com/aiworkerx","prompt":"Find any mentions, complaints, or discussions about aiworkerx"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"tool_call","toolName":"WebFetch","toolId":"call_function_7s3k1xgle43x_1","toolInput":{"url":"https://www.whois.com/whois/aiworkerx.com","prompt":"Get domain registration info and any details about the owner of aiworkerx.com"},"sessionId":"default"}
< {"type":"status","text":"Executed WebFetch","sessionId":"default"}
< {"type":"status","text":"Processing tool result...","sessionId":"default"}
< {"type":"thinking","sessionId":"default"}
< {"type":"text","text":"**Sentiment Analysis: aiworkerx.com**\n\n**No negative sentiment detected.**\n\n**Findings:**\n\n| Source | Result |\n|--------|--------|\n| aiworkerx.com | Legitimate business. Transparent pricing, clear contact info (support@aiworkerx.com, WhatsApp +60175708651). No red flags. |\n| LinkedIn | Company page (AI WorkerX Sdn. Bhd.). Founded 2025, 2-10 employees. No reviews/complaints. |\n| WHOIS | Domain registered Oct 2025, uses Cloudflare DNS, GoDaddy registrar. Normal status locks. |\n| Trustpilot | Blocked (403) |\n| Reddit | Blocked |\n| Facebook | Blocked |\n| Twitter/X | Blocked (402) |\n| Google Search | Blocked |\n| Scam Detector | Blocked (403) |\n\n**Company Profile:**\n- **Name:** AI WorkerX Sdn. Bhd. (Malaysian entity)\n- **Service:** AI-powered digital worker for MSMEs (customer service, sales, lead capture)\n- **Pricing:** Free tier (100 AI responses/month) + Pro/Business plans\n- **Founding:** 2025 (recent)\n- **Employees:** 3 listed on LinkedIn (Chan Teck Keng, Wahyu Ikbal Maulana, Aiman Haris)\n\n**Red Flags:** None found. Business appears legitimate with standard SaaS presentation.\n\n**Caveat:** Limited access to review platforms due to blocking. Recommend checking Trustpilot directly for user reviews.","sessionId":"default"}
< {"type":"result","success":true,"cost":1.7490919999999999,"duration_ms":107614,"tool_calls":13,"sessionId":"default"}
