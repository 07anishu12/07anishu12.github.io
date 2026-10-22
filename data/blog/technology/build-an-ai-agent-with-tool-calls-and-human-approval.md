---
title: How to Build an AI Agent with Tool Calling and Human Approval
seoTitle: Build an AI Agent with Tool Calls and Human Approval
slug: build-an-ai-agent-with-tool-calls-and-human-approval
description: Create a bounded local tool loop that asks before saving a generated note.
category: technology
tags:
  - AI agent human approval
  - tool calling tutorial
  - Ollama tools
  - agent permissions
author: Aniket Thakur
datePublished: 2026-10-22
dateModified: 2026-10-22
coverImage: /assets/images/blog/build-an-ai-agent-with-tool-calls-and-human-approval/cover.svg
coverImageAlt: Diagram explaining AI agent human approval
imageCaption: Original explanatory diagram showing AI agent human approval and
  its main decision points.
draft: false
featured: false
sources:
  - title: Ollama tool-calling documentation
    url: https://docs.ollama.com/capabilities/tool-calling
  - title: MCP security guidance
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
showSources: true
enquiry: false
quickAnswer:
  question: "How to Build an AI Agent with Tool Calling and Human Approval: Key
    Verdict & Summary"
  answer: Build an agent by separating model proposals from application authority.
  facts:
    - label: Category & Focus
      value: AI agents, developer tools and automation
    - label: Verified Word Count
      value: 782 words
  goodFor:
    - Readers evaluating AI agent human approval.
    - Practitioners needing verified benchmarks and calculations.
  watchFor:
    - Verify dated prices and regional specifications before committing.
    - Review primary source disclosures and product documentation.
  note: 2026 Reference Edition · Verified Secondary Research
---

Build an agent by separating model proposals from application authority. The model can request a named tool, while your code validates arguments and asks for approval before a write. Start with one narrow tool and a bounded conversation, not a shell executor that runs whatever text the model produces.

## Define a tool with a small consequence

The [Ollama tool-calling guide](https://docs.ollama.com/capabilities/tool-calling) documents supported models, tool requests and returning results to the conversation. Its Python SDK can derive a tool schema from a typed function. Check the selected model's tool support and installed client version before using the example.

Use a dedicated empty tutorial directory. Install the documented client in an isolated environment:

```text
python -m pip install ollama
```

Prepare a compatible local model separately. The example uses the documented `qwen3` model syntax, not a guarantee that it fits your computer. Review the exact tag and licence first.

The proposed action will create one fixed filename after approval. It cannot choose arbitrary paths or execute commands. This limited scope makes the permission rule easy to inspect and the demonstration safer to reason about.

## Implement approval outside the model

This instructional code was not executed:

```python
from ollama import chat

def save_note(text: str) -> str:
    """Create a short tutorial note only after human approval."""
    if not isinstance(text, str) or not 1 <= len(text) <= 1000:
        return "Rejected: note must contain 1 to 1000 characters."
    print("Proposed new file: approved-note.txt")
    print(repr(text))
    if input("Type SAVE to approve: ") != "SAVE":
        return "Denied by user; nothing saved."
    try:
        with open("approved-note.txt", "x", encoding="utf-8") as handle:
            handle.write(text)
        return "Approved note created."
    except FileExistsError:
        return "Rejected: file already exists."

messages = [{"role": "user", "content":
    "Propose saving a short synthetic study note about recursion."}]
reply = chat(model="qwen3", messages=messages, tools=[save_note])
messages.append(reply.message)
for call in reply.message.tool_calls or []:
    if call.function.name != "save_note":
        result = "Unknown tool rejected."
    elif set(call.function.arguments) != {"text"}:
        result = "Unexpected arguments rejected."
    else:
        result = save_note(call.function.arguments["text"])
    messages.append({"role": "tool", "tool_name": call.function.name,
                     "content": result})
if reply.message.tool_calls:
    print(chat(model="qwen3", messages=messages).message.content)
else:
    print(reply.message.content)
```

The final response is generated without exposing tools again, limiting this example's action phase. A larger application needs explicit step and time budgets rather than an unbounded loop.

The approval text displays the exact proposed content and fixed destination. Using exclusive file creation avoids silently overwriting an existing note. A production implementation also needs robust handling for permissions, storage failures and cancellation.

## Test decisions, denials and untrusted content

Try approving once, denying once and repeating after the file exists. Inspect the directory rather than trusting the assistant's final sentence. The tool result is evidence about the action; model narration can still be inaccurate.

Test invalid argument types and unexpected tool names directly through the dispatcher. Do not use dynamic function lookup, `eval` or shell execution on model output. An allow-list is useful precisely because the model cannot expand it by requesting another name.

For larger writes, approval should identify the destination, scope and irreversible consequences. A vague “continue?” is inadequate when users cannot see what will happen. Bind approval to the reviewed action so changed arguments require another review.

Treat retrieved documents and web pages as untrusted data. The [MCP security guidance](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices) illustrates why tool integration still needs application controls. A document telling the agent to save credentials has no authority to bypass the approval function.

Your next step is a small failure-case checklist and an audit record appropriate to your application. Add tools only when each has validated inputs, scoped credentials, clear approval policy and a defined result. Model autonomy is useful within a permission system your code actually enforces.

## Quick questions, clear answers

### Can the model approve its own action?

It should not. The approval decision must come through a trusted human interaction or an explicitly authorised policy outside model-generated text. A sentence in the conversation saying “approved” is not sufficient evidence if it came from the model or an untrusted document.

### Does a tool schema validate business rules?

It describes input structure, but the application still needs type, range, ownership and permission checks. A valid string can contain an unsafe destination or misleading instruction. Validate every argument before side effects and avoid assuming schema compliance proves user authorisation.

### Why use a fixed filename in the tutorial?

It keeps the writable resource boundary obvious. Arbitrary paths introduce traversal, overwrite and ownership concerns that distract from the approval mechanism. Expand path selection only after defining an allowed directory, canonicalisation rules and a review screen showing the actual destination.

## About this guide

Aniket Thakur prepared this guide from secondary research checked on 22 October 2026. No first-hand software testing or performance benchmarking was conducted. Examples are instructional and require validation in your environment.
