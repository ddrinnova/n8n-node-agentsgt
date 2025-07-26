import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class AgentsGT implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AgentsGT',
		name: 'agentsGt',
		icon: 'file:agentsgt.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with AgentsGT AI agents via the v1 API',
		defaults: {
			name: 'AgentsGT',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'agentsGTApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Balance',
						value: 'balance',
					},
				],
				default: 'agent',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['agent'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many agents in your organization',
						action: 'Get many agents',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send a message to an agent',
						action: 'Send message to agent',
					},
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['balance'],
					},
				},
				options: [
					{
						name: 'Check Balance',
						value: 'checkBalance',
						description: 'Check organization credits and subscription status',
						action: 'Check balance',
					},
				],
				default: 'checkBalance',
			},
			// Agent ID field for chat operations
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'The ID of the agent to chat with',
			},
			// Message field for chat operations
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'The message to send to the agent',
			},
			// Session identifier for chat operations
			{
				displayName: 'Session Identifier',
				name: 'identifier',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'Unique identifier for the conversation session',
			},
			// Chat type selection
			{
				displayName: 'Chat Type',
				name: 'chatType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendMessage'],
					},
				},
				options: [
					{
						name: 'Basic',
						value: 'basic',
						description: 'Simple request/response chat',
					},
					{
						name: 'Advanced',
						value: 'advanced',
						description: 'Advanced chat with streaming support',
					},
					{
						name: 'CopilotKit',
						value: 'copilotkit',
						description: 'CopilotKit framework integration',
					},
				],
				default: 'basic',
				description: 'Type of chat interaction',
			},
			// Organization ID for balance check
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['balance'],
						operation: ['checkBalance'],
					},
				},
				default: '',
				description: 'Organization ID for balance check (optional for general balance)',
			},
			// Agent ID for specific balance check
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['balance'],
						operation: ['checkBalance'],
					},
				},
				default: '',
				description: 'Agent ID for specific agent balance check (optional)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		await this.getCredentials('agentsGTApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'agent') {
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'agentsGTApi',
							{
								method: 'GET',
								url: '/agents',
							},
						);
					}
				} else if (resource === 'chat') {
					if (operation === 'sendMessage') {
						const agentId = this.getNodeParameter('agentId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const identifier = this.getNodeParameter('identifier', i) as string;
						const chatType = this.getNodeParameter('chatType', i) as string;

						if (!agentId || !message || !identifier) {
							throw new NodeOperationError(
								this.getNode(),
								'Agent ID, message, and identifier are required for chat operations',
							);
						}

						let endpoint = '';
						let requestBody: any = {};

						switch (chatType) {
							case 'basic':
								endpoint = `/agents/basic/${agentId}`;
								requestBody = {
									message,
									identifier,
								};
								break;
							case 'advanced':
								endpoint = `/agents/chat/${agentId}`;
								// For advanced chat, you might need to construct a GraphQL query
								// This is a simplified version - you may need to adjust based on your needs
								requestBody = {
									query: `mutation SendMessage($message: String!, $identifier: String!) {
										sendMessage(message: $message, identifier: $identifier) {
											response
											success
										}
									}`,
									variables: {
										message,
										identifier,
									},
								};
								break;
							case 'copilotkit':
								endpoint = `/agents/copilotkit/${agentId}`;
								// CopilotKit format - adjust based on your specific needs
								requestBody = {
									variables: {
										data: {
											messages: [
												{
													textMessage: {
														role: 'user',
														content: message,
													},
												},
											],
											identifier,
										},
									},
								};
								break;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'agentsGTApi',
							{
								method: 'POST',
								url: endpoint,
								body: requestBody,
							},
						);
					}
				} else if (resource === 'balance') {
					if (operation === 'checkBalance') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const agentId = this.getNodeParameter('agentId', i) as string;

						let endpoint = '/agents/check-balance';
						const headers: any = {};

						// If agent ID is provided, check specific agent balance
						if (agentId) {
							endpoint = `/agents/chat/${agentId}/check-balance`;
						}

						// Add organization ID header if provided
						if (organizationId) {
							headers['x-organization-id'] = organizationId;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'agentsGTApi',
							{
								method: 'GET',
								url: endpoint,
								headers: Object.keys(headers).length > 0 ? headers : undefined,
							},
						);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
