# n8n-nodes-agentsgt

![AgentsGT Logo](https://agentsgt.com/assets/logo.png)

This is an n8n community node that allows you to integrate AgentsGT AI agents into your n8n workflows. With this node, you can leverage powerful AI agents to automate tasks, analyze data, generate content, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Configuration](#configuration)  
[Resources and Operations](#resources-and-operations)  
[Usage Examples](#usage-examples)  
[Troubleshooting](#troubleshooting)  
[Resources](#resources)  
[License](#license)  

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-agentsgt`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd /path/to/your/n8n

# Install the package
npm install n8n-nodes-agentsgt

# Restart n8n
npm restart
```

## Configuration

### API Credentials

Before using the AgentsGT node, you need to set up your API credentials:

1. Log in to your [AgentsGT dashboard](https://agentsgt.com)
2. Navigate to **Account > API Keys**
3. Create a new API key pair
4. Copy both the **Public Key** (starts with `pk_`) and **Secret Key** (starts with `sk_`)

### Setting Up Credentials in n8n

1. In n8n, go to **Credentials**
2. Click **Create New Credential**
3. Search for and select **AgentsGT API**
4. Fill in the required fields:
   - **Public Key**: Your `pk_` key
   - **Secret Key**: Your `sk_` key
   - **Base URL**: `https://agentsgt.com/api/v1` (default)
5. Click **Save**

## Resources and Operations

The AgentsGT node supports three main resources:

### 1. Agent Resource

#### Get Many
Retrieves all agents available in your organization.

**Parameters:**
- None required

**Output:**
Returns an array of agent objects with details such as ID, name, description, model information, etc.

### 2. Chat Resource

#### Send Message
Sends a message to an AI agent and returns the agent's response.

**Parameters:**
- **Agent ID**: The ID of the agent to chat with
- **Message**: The message to send to the agent
- **Session Identifier**: Unique identifier for the conversation session
- **Chat Type**: Type of chat interaction
  - `Basic`: Simple request/response chat
  - `Advanced`: Advanced chat with streaming support
  - `CopilotKit`: CopilotKit framework integration

**Output:**
Returns the agent's response to your message.

### 3. Balance Resource

#### Check Balance
Verifies your organization's credit balance and subscription status.

**Parameters:**
- **Organization ID**: (Optional) Specific organization ID for balance check
- **Agent ID**: (Optional) Specific agent ID for agent-specific balance check

**Output:**
Returns information about your account status, including organization ID, credit availability, and subscription status.

## Usage Examples

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

### Example 2: Data Analysis Workflow

This workflow uses an AI agent to analyze data from an HTTP request:

1. **HTTP Request** → **AgentsGT: Send Message** → **Send Email**

Configuration:
```
[HTTP Request]
URL: https://api.example.com/data
Method: GET

[AgentsGT: Send Message]
Resource: Chat
Operation: Send Message
Agent ID: agent-data-analysis-123
Message: Please analyze this data and provide insights: {{ $json.body | json }}
Session Identifier: analysis-{{$execution.id}}
Chat Type: basic

[Send Email]
To: user@example.com
Subject: Data Analysis Results
Body: {{ $node["AgentsGT: Send Message"].json.response }}
```

### Example 3: Content Generation Pipeline

This workflow generates content using an AI agent and posts it to a CMS:

1. **Schedule Trigger** → **AgentsGT: Send Message** → **WordPress: Create Post**

Configuration:
```
[Schedule Trigger]
Frequency: Weekly

[AgentsGT: Send Message]
Resource: Chat
Operation: Send Message
Agent ID: agent-content-creation-456
Message: Generate a blog post about the latest trends in AI technology
Session Identifier: content-{{$execution.id}}
Chat Type: basic

[WordPress: Create Post]
Title: AI Trends - Weekly Update
Content: {{ $node["AgentsGT: Send Message"].json.response }}
Status: publish
```

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

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [AgentsGT API Documentation](https://agentsgt.com/documentation/v1)
- [AgentsGT Website](https://agentsgt.com)
- [Detailed Usage Guide](./README_USAGE.md)
- [Installation Guide](./INSTALLATION.md)

## Support

- **Documentation**: [https://agentsgt.com/docs](https://agentsgt.com/docs)
- **Support**: [info@agentsgt.com](mailto:info@agentsgt.com)
- **Issues**: [GitHub Issues](https://github.com/agentsgt/n8n-nodes-agentsgt/issues)

## License

[MIT](LICENSE)
