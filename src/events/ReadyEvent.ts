import {
    Client as DiscordClient
} from 'discord.js';

export default class ReadyEvent {
    private readonly client: DiscordClient;

    constructor(client: DiscordClient) {
        this.client = client;
    }

    public handle(): void {
        console.log(`Logged in as ${this.client.user?.tag}!`);
    }
}