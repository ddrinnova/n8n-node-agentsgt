# AgentsGT Node for n8n - Usage Guide

This document provides detailed instructions on how to use the AgentsGT node in your n8n workflows.

![AgentsGT Logo](https://agentsgt.com/assets/logo.png)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Node Overview](#node-overview)
- [Resource Types](#resource-types)
  - [Agent Resource](#agent-resource)
  - [Chat Resource](#chat-resource)
  - [Balance Resource](#balance-resource)
- [Workflow Examples](#workflow-examples)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Tips and Best Practices](#tips-and-best-practices)

## Prerequisites

Before using the AgentsGT node, ensure you have:

1. An active AgentsGT account with API access
2. Your API credentials (Public Key and Secret Key)
3. n8n installed and running
4. The AgentsGT node installed in your n8n instance

## Node Overview

The AgentsGT node allows you to interact with AI agents created on the AgentsGT platform. You can:

- Retrieve a list of your available agents
- Send messages to agents and receive responses
- Check your organization's credit balance and subscription status

## Resource Types

The node supports three main resource types:

### Agent Resource

#### Get Many Agents

Retrieves all agents available in your organization.

**Configuration:**
- **Resource**: Select `Agent`
- **Operation**: Select `Get Many`

**Output:**
The node returns an array of agent objects containing details such as:
- Agent ID
- Name
- Description
- System prompt
- Model information
- Creation and update timestamps
- API endpoint URL

**Example Use Case:**
Use this operation to dynamically select an agent for chat operations based on specific criteria.

### Chat Resource

#### Send Message

Sends a message to an AI agent and returns the agent's response.

**Configuration:**
- **Resource**: Select `Chat`
- **Operation**: Select `Send Message`
- **Agent ID**: Enter the ID of the agent you want to chat with
- **Message**: The message text to send to the agent
- **Session Identifier**: A unique identifier for the conversation session (used for conversation continuity)
- **Chat Type**: Select one of the following:
  - `Basic`: Simple request/response chat
  - `Advanced`: Advanced chat with streaming support
  - `CopilotKit`: CopilotKit framework integration

**Output:**
The node returns the agent's response to your message. The exact format depends on the chat type selected.

**Example Use Case:**
Use this operation to integrate AI agent capabilities into your workflows, such as:
- Analyzing data
- Generating content
- Answering customer queries
- Processing information

### Balance Resource

#### Check Balance

Verifies your organization's credit balance and subscription status.

**Configuration:**
- **Resource**: Select `Balance`
- **Operation**: Select `Check Balance`
- **Organization ID**: (Optional) Specific organization ID for balance check
- **Agent ID**: (Optional) Specific agent ID for agent-specific balance check

**Output:**
The node returns information about your account status, including:
- Organization ID
- Credit availability status
- Subscription status

**Example Use Case:**
Use this operation to check if your account has sufficient credits before executing chat operations.

## Workflow Examples

### Example 1: Basic Agent Interaction

This workflow demonstrates how to retrieve agents and chat with a specific agent:

1. **Start Node** → **AgentsGT: Get Agents** → **Set Variable** (to store agent ID) → **AgentsGT: Send Message** → **Process Response**

Configuration:
```
[AgentsGT: Get Agents]
Resource: Agent
Operation: Get Many

[Set Variable]
Name: agentId
Value: {{ $node["AgentsGT: Get Agents"].json.data[0].id }}

[AgentsGT: Send Message]
Resource: Chat
Operation: Send Message
Agent ID: {{ $vars.agentId }}
Message: Hello, can you help me analyze this data?
Session Identifier: workflow-{{$workflow.id}}-{{$execution.id}}
Chat Type: basic
```

### Example 2: Conditional Agent Selection

This workflow selects different agents based on the input data type:

1. **Start Node** → **Switch** → **AgentsGT: Send Message (Data Analysis)** / **AgentsGT: Send Message (Content Creation)**

Configuration:
```
[Switch]
Value: {{ $json.dataType }}
Rules:
  - Value: analysis
    Output: 0
  - Value: content
    Output: 1

[AgentsGT: Send Message (Data Analysis)]
Resource: Chat
Operation: Send Message
Agent ID: agent-data-analysis-123
Message: {{ $json.data }}
Session Identifier: analysis-{{$execution.id}}
Chat Type: advanced

[AgentsGT: Send Message (Content Creation)]
Resource: Chat
Operation: Send Message
Agent ID: agent-content-creation-456
Message: {{ $json.prompt }}
Session Identifier: content-{{$execution.id}}
Chat Type: basic
```

## Advanced Usage

### Maintaining Conversation Context

To maintain conversation context across multiple interactions:

1. Use a consistent Session Identifier for related messages
2. Store conversation history in n8n variables or database
3. Include relevant context in each message

Example:
```
[AgentsGT: Send Message]
Resource: Chat
Operation: Send Message
Agent ID: agent-123
Message: {{ $json.newMessage }}
Session Identifier: user-{{ $json.userId }}-session-{{ $json.sessionId }}
Chat Type: basic
```

### Integrating with Other Services

You can combine AgentsGT with other n8n nodes to create powerful workflows:

- Use HTTP Request nodes to fetch data for analysis
- Process agent responses with Text Manipulation nodes
- Send agent outputs via Email, Slack, or other communication nodes
- Store conversation history in databases

## Troubleshooting

### Common Issues and Solutions

1. **Authentication Errors (401)**
   - Verify your API credentials are correct
   - Check if your API keys are active in the AgentsGT dashboard

2. **Payment Required Errors (402)**
   - Verify your account has sufficient credits
   - Check your subscription status in the AgentsGT dashboard

3. **Not Found Errors (404)**
   - Confirm the Agent ID exists and is accessible to your account
   - Verify the API endpoint URLs

4. **Rate Limit Errors (429)**
   - Implement retry logic with exponential backoff
   - Reduce the frequency of API calls

5. **Server Errors (500)**
   - Check the AgentsGT status page for service disruptions
   - Contact AgentsGT support if the issue persists

### Debugging Tips

- Enable "Continue on Fail" in node settings to prevent workflow failures
- Use the "Debug" tab in n8n to inspect input/output data
- Add Function nodes to log detailed information during execution

## Tips and Best Practices

1. **Optimize API Usage**
   - Cache agent lists instead of fetching them repeatedly
   - Use session identifiers effectively to maintain conversation context
   - Implement rate limiting in high-volume workflows

2. **Enhance Message Quality**
   - Provide clear, specific instructions in your messages
   - Include all necessary context in each message
   - Format data appropriately for the agent to process

3. **Error Handling**
   - Implement proper error handling in your workflows
   - Use IF nodes to check for successful responses
   - Set up notification alerts for critical failures

4. **Security Considerations**
   - Never expose your Secret Key in workflow data
   - Be cautious about the data you send to agents
   - Implement data sanitization for sensitive information

5. **Performance Optimization**
   - Use the appropriate chat type for your needs
   - Consider response time requirements when selecting agents
   - Batch operations when possible to reduce API calls

---

For more information, refer to the [AgentsGT API Documentation](https://agentsgt.com/documentation/v1) or contact [AgentsGT Support](mailto:info@agentsgt.com).
