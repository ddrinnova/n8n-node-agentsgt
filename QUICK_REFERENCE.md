# AgentsGT Node - Quick Reference Guide

## Installation

```bash
# Via n8n UI
Settings > Community Nodes > Install > n8n-nodes-agentsgt

# Via npm
npm install n8n-nodes-agentsgt
```

## Credentials Setup

1. Get API keys from [AgentsGT dashboard](https://agentsgt.com)
2. In n8n: Credentials > Create New > AgentsGT API
3. Enter Public Key (`pk_...`) and Secret Key (`sk_...`)

## Available Resources & Operations

| Resource | Operation | Description |
|----------|-----------|-------------|
| Agent | Get Many | List all available agents |
| Chat | Send Message | Send a message to an agent |
| Balance | Check Balance | Verify credits and subscription |

## Required Parameters

### Chat - Send Message
- **Agent ID**: `agent-xxx`
- **Message**: Your message text
- **Session Identifier**: Unique conversation ID
- **Chat Type**: `basic`, `advanced`, or `copilotkit`

### Balance - Check Balance
- **Organization ID**: (Optional)
- **Agent ID**: (Optional)

## Common Workflow Patterns

### Basic Agent Chat
```
[Start] → [AgentsGT: Get Agents] → [AgentsGT: Send Message]
```

### Data Analysis
```
[HTTP Request] → [AgentsGT: Send Message] → [Process Results]
```

### Content Generation
```
[Trigger] → [AgentsGT: Send Message] → [Save/Publish Content]
```

## Expression Examples

### Dynamic Agent Selection
```
{{ $node["AgentsGT: Get Agents"].json.data[0].id }}
```

### Session Identifier
```
workflow-{{$workflow.id}}-{{$execution.id}}
```

### Formatting Message with Data
```
Please analyze: {{ $json.data | json }}
```

## Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 401 | Authentication Error | Check API keys |
| 402 | Payment Required | Add credits |
| 404 | Not Found | Verify agent ID |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Contact support |

## Troubleshooting Tips

1. **Authentication Issues**
   - Verify API key format (pk_/sk_)
   - Check key permissions

2. **No Response**
   - Verify agent exists and is active
   - Check network connectivity

3. **Unexpected Responses**
   - Check message formatting
   - Review agent configuration

## Best Practices

1. **Performance**
   - Cache agent lists
   - Use consistent session IDs
   - Select appropriate chat type

2. **Error Handling**
   - Enable "Continue on Fail"
   - Add error notification nodes
   - Implement retry logic

3. **Security**
   - Never expose Secret Key
   - Sanitize sensitive data

## Resources

- [Full Documentation](./README.md)
- [Detailed Usage Guide](./README_USAGE.md)
- [Installation Guide](./INSTALLATION.md)
- [API Documentation](https://agentsgt.com/documentation/v1)
- [Support](mailto:info@agentsgt.com)
