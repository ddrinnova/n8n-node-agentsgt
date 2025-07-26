# AgentsGT n8n Node - Installation & Setup Guide

## Overview

This n8n custom node allows you to integrate AgentsGT AI agents into your n8n workflows. The node supports:

- **Agent Management**: List all agents in your organization
- **Chat Operations**: Send messages to agents with different chat types (Basic, Advanced, CopilotKit)
- **Balance Checking**: Monitor organization credits and subscription status

## Prerequisites

- n8n instance (self-hosted or cloud)
- AgentsGT account with API keys
- Node.js and npm (for development/building)

## Installation Methods

### Method 1: Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click **Install a community node**
4. Enter: `n8n-nodes-agentsgt`
5. Click **Install**

### Method 2: Manual Installation

```bash
# Navigate to your n8n installation directory
cd /path/to/your/n8n

# Install the package
npm install n8n-nodes-agentsgt

# Restart n8n
npm start
```

### Method 3: Development Setup

```bash
# Clone or download the node source code
git clone <repository-url>
cd n8n-agentsgt-node

# Install dependencies
npm install

# Build the node
npm run build

# Link to your n8n instance
npm link
cd /path/to/your/n8n
npm link n8n-nodes-agentsgt

# Restart n8n
npm start
```

## API Key Setup

### 1. Get Your AgentsGT API Keys

1. Log in to your [AgentsGT dashboard](https://agentsgt.com)
2. Navigate to **Account > API Keys**
3. Create a new API key pair
4. Copy both the **Public Key** (starts with `pk_`) and **Secret Key** (starts with `sk_`)

### 2. Configure Credentials in n8n

1. In n8n, go to **Credentials**
2. Click **Create New Credential**
3. Search for and select **AgentsGT API**
4. Fill in the required fields:
   - **Public Key**: Your `pk_` key
   - **Secret Key**: Your `sk_` key
   - **Base URL**: `https://agentsgt.com/api/v1` (default)
5. Click **Save**

## Quick Start Example

### Basic Workflow: List Agents and Send Message

1. **Add AgentsGT Node**
   - Drag the AgentsGT node to your workflow
   - Set Resource: `Agent`
   - Set Operation: `Get All`
   - Select your AgentsGT API credentials

2. **Add Another AgentsGT Node for Chat**
   - Resource: `Chat`
   - Operation: `Send Message`
   - Agent ID: `{{ $json.data[0].id }}` (uses first agent from previous step)
   - Message: `Hello, how can you help me?`
   - Session Identifier: `workflow-{{ $workflow.id }}`
   - Chat Type: `Basic`

3. **Execute the Workflow**
   - The first node will return all your agents
   - The second node will send a message to the first agent

## Node Configuration

### Resources and Operations

#### Agent Resource
- **Get All**: Retrieves all agents in your organization

#### Chat Resource
- **Send Message**: Send a message to a specific agent
  - **Basic**: Simple request/response
  - **Advanced**: GraphQL-based with streaming support
  - **CopilotKit**: Framework integration format

#### Balance Resource
- **Check Balance**: Verify credits and subscription status

### Required Parameters

#### For Chat Operations:
- **Agent ID**: The unique identifier of the agent
- **Message**: The text message to send
- **Session Identifier**: Unique session ID for conversation tracking
- **Chat Type**: The type of chat interaction

#### For Balance Operations:
- **Organization ID**: (Optional) Specific organization to check
- **Agent ID**: (Optional) Specific agent to check

## Error Handling

The node includes comprehensive error handling:

- **401 Unauthorized**: Check your API keys
- **402 Payment Required**: Insufficient credits
- **404 Not Found**: Agent not found or unauthorized
- **429 Rate Limited**: Too many requests
- **500 Server Error**: Internal server error

Enable "Continue on Fail" in node settings to handle errors gracefully.

## Advanced Usage

### Dynamic Agent Selection

```javascript
// In a Function node, select agent based on criteria
const agents = $input.all()[0].json.data;
const supportAgent = agents.find(agent => 
  agent.name.toLowerCase().includes('support')
);

return {
  agentId: supportAgent.id,
  message: "I need help with my account"
};
```

### Session Management

```javascript
// Generate unique session identifiers
const sessionId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

return {
  identifier: sessionId
};
```

### Conditional Chat Types

Use different chat types based on your needs:
- **Basic**: For simple Q&A interactions
- **Advanced**: For complex conversations with streaming
- **CopilotKit**: For framework integrations

## Troubleshooting

### Common Issues

1. **"Cannot find module 'n8n-workflow'"**
   - This is expected during development
   - The module will be available when installed in n8n

2. **"Invalid API key"**
   - Verify your public and secret keys
   - Ensure keys are active in your AgentsGT dashboard

3. **"No credits remaining"**
   - Check your subscription status
   - Add credits to your AgentsGT account

4. **"Agent not found"**
   - Verify the agent ID exists
   - Ensure you have access to the agent

### Debug Mode

Enable debug mode in n8n to see detailed request/response information:

```bash
# Set environment variable
export N8N_LOG_LEVEL=debug

# Or in your .env file
N8N_LOG_LEVEL=debug
```

## Support

- **Documentation**: [https://agentsgt.com/documentation/v1](https://agentsgt.com/documentation/v1)
- **Support Email**: [info@agentsgt.com](mailto:info@agentsgt.com)
- **GitHub Issues**: [Repository Issues](https://github.com/agentsgt/n8n-nodes-agentsgt/issues)

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.
