# n8n-nodes-agentsgt

![AgentsGT Logo](https://agentsgt.com/assets/logo.png)

An n8n community node for interacting with AgentsGT AI agents via the v1 API.

## Installation

To install this node in your n8n instance:

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Click **Install a community node**
3. Enter `n8n-nodes-agentsgt`
4. Click **Install**

### Manual Installation

```bash
# In your n8n root directory
npm install n8n-nodes-agentsgt
```

## Configuration

### Credentials

Before using the AgentsGT node, you need to configure your API credentials:

1. Go to **Credentials** in your n8n instance
2. Click **Create New Credential**
3. Select **AgentsGT API**
4. Fill in your credentials:
   - **Public Key**: Your AgentsGT public API key (starts with `pk_`)
   - **Secret Key**: Your AgentsGT secret API key (starts with `sk_`)
   - **Base URL**: `https://agentsgt.com/api/v1` (default)

You can obtain your API keys from your [AgentsGT dashboard](https://agentsgt.com/account/api-keys).

## Usage

The AgentsGT node supports three main resources:

### 1. Agent Operations

#### Get All Agents
Retrieve all agents in your organization.

**Parameters:**
- Resource: `Agent`
- Operation: `Get All`

**Output:**
```json
{
  "success": true,
  "data": [
    {
      "id": "agent-123",
      "name": "Customer Support Agent",
      "description": "AI agent specialized in customer support",
      "system_prompt": "You are a helpful customer support agent...",
      "slug": "customer-support-agent",
      "model": {
        "name": "gpt-4",
        "display_name": "GPT-4",
        "pricing": {
          "input_per_1k_tokens": 0.03,
          "output_per_1k_tokens": 0.06
        },
        "context_window": 8192
      },
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z",
      "url": "https://agentsgt.com/api/v1/agents/basic/agent-123"
    }
  ]
}
```

### 2. Chat Operations

#### Send Message
Send a message to an AI agent and receive a response.

**Parameters:**
- Resource: `Chat`
- Operation: `Send Message`
- **Agent ID**: The ID of the agent to chat with
- **Message**: The message to send to the agent
- **Session Identifier**: Unique identifier for the conversation session
- **Chat Type**: Type of chat interaction
  - `Basic`: Simple request/response chat
  - `Advanced`: Advanced chat with streaming support
  - `CopilotKit`: CopilotKit framework integration

**Example:**
```json
{
  "agentId": "agent-123",
  "message": "Hello, how can you help me?",
  "identifier": "user-456-session-789",
  "chatType": "basic"
}
```

**Output (Basic Chat):**
```json
{
  "success": true,
  "response": "Hello! I'm here to help you with any questions or tasks you might have. What can I assist you with today?"
}
```

### 3. Balance Operations

#### Check Balance
Verify organization credits and subscription status.

**Parameters:**
- Resource: `Balance`
- Operation: `Check Balance`
- **Organization ID**: Organization ID for balance check (optional)
- **Agent ID**: Agent ID for specific agent balance check (optional)

**Output:**
```json
{
  "success": true,
  "organizationId": "org-123",
  "hasCredits": true,
  "hasAssistant": true
}
```

## Examples

### Basic Workflow Example

1. **Get All Agents**: Use the Agent > Get All operation to retrieve your available agents
2. **Extract Agent ID**: Use a Set node to extract the agent ID from the response
3. **Send Message**: Use the Chat > Send Message operation with the extracted agent ID
4. **Process Response**: Handle the agent's response in subsequent nodes

### Advanced Integration Example

```json
{
  "nodes": [
    {
      "name": "Get Agents",
      "type": "n8n-nodes-agentsgt.agentsGT",
      "parameters": {
        "resource": "agent",
        "operation": "getAll"
      }
    },
    {
      "name": "Chat with Agent",
      "type": "n8n-nodes-agentsgt.agentsGT",
      "parameters": {
        "resource": "chat",
        "operation": "sendMessage",
        "agentId": "{{ $json.data[0].id }}",
        "message": "Analyze this data: {{ $json.inputData }}",
        "identifier": "workflow-{{ $workflow.id }}-{{ $execution.id }}",
        "chatType": "basic"
      }
    }
  ]
}
```

## Error Handling

The node includes comprehensive error handling:

- **401 Unauthorized**: Invalid or inactive API key
- **402 Payment Required**: Insufficient credits or inactive subscription
- **404 Not Found**: Agent not found or unauthorized
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side error

Enable "Continue on Fail" in the node settings to handle errors gracefully in your workflows.

## API Documentation

For detailed API documentation, visit: [https://agentsgt.com/documentation/v1](https://agentsgt.com/documentation/v1)

## Support

- **Documentation**: [https://agentsgt.com/docs](https://agentsgt.com/docs)
- **Support**: [info@agentsgt.com](mailto:info@agentsgt.com)
- **Issues**: [GitHub Issues](https://github.com/agentsgt/n8n-nodes-agentsgt/issues)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

---

Made with ❤️ by the [AgentsGT](https://agentsgt.com) team.
