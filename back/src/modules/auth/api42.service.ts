import { Client } from '42.js';
import { AuthProcess } from '42.js/dist/auth/auth_manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Api42Service {
	private _client: Client;
	private _auth_process: AuthProcess;

	constructor() {
		this._client = new Client(
			<string>process.env.API_CLIENT_ID,
			<string>process.env.API_CLIENT_SECRET,
		);
	}

	get client(): Client {
		return this._client;
	}

	async get_auth_process(): Promise<AuthProcess> {
		if (!this._auth_process) {
			this._auth_process =
				await this.client.auth_manager.init_auth_process(
					process.env.FRONT_URL + '/callback',
					['public'],
				);
		}
		return this._auth_process;
	}
}
