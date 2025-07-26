import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AgentsGTApi implements ICredentialType {
	name = 'agentsGTApi';
	displayName = 'AgentsGT API';
	documentationUrl = 'https://agentsgt.com/documentation/v1';
	properties: INodeProperties[] = [
		{
			displayName: 'Public Key',
			name: 'publicKey',
			type: 'string',
			default: '',
			placeholder: 'pk_xxxxxxxxxxxxxxxx',
			description: 'Your AgentsGT public API key (starts with pk_)',
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'sk_xxxxxxxxxxxxxxxx',
			description: 'Your AgentsGT secret API key (starts with sk_)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://agentsgt.com/api/v1',
			description: 'Base URL for the AgentsGT API (change for self-hosted instances)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.publicKey}}:{{$credentials.secretKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/agents',
			method: 'GET',
		},
	};
}
