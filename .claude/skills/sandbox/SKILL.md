---
name: sandbox
description: Execute Python or JavaScript code for data analysis, calculations, and processing. Use when user wants to analyze data, run calculations, process collected information, or prototype algorithms.
allowed_tools:
  - sandbox_execute
---

# Sandbox Execution Skill

Execute Python or JavaScript code in a sandboxed environment.

## Tool
- **sandbox_execute**: Run code safely
  - Input: `{ code: string, language: "python" | "javascript" }`
  - Returns: Execution output or error message
  - Timeout: 30 seconds
  - Memory limit: 128MB

## Usage
Use when:
- Data analysis and calculations
- Processing collected data
- Running algorithms
- Prototyping solutions
- Generating reports from data

## Example
```
sandbox_execute({ code: "print([x**2 for x in range(10)])", language: "python" })
```
