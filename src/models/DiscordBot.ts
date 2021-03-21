import Command from '@interfaces/Command';
import MessageEvent from '@events/MessageEvent';
import {
    Client as DiscordClient,
    Message as DiscordMessage
} from 'discord.js';
import ReadyEvent from '@events/ReadyEvent';

export default class DiscordBot {
    private readonly client = new DiscordClient();
    private readonly token: string;

    constructor(token: string, commandPrefix: string, commands: Command[]) {
        this.token = token;
        this.setReadyEventListener();
        this.setMessageEventListener(commandPrefix, commands);
    }

    public login(): void {
        this.client.login(this.token);
    }

    private setReadyEventListener() {
        const readyEvent = new ReadyEvent(this.client);

        this.client.once('ready', (): void => {
            readyEvent.handle();
        });
    }

    private setMessageEventListener(commandPrefix: string, commands: Command[]) {
        const messageEvent = new MessageEvent(commandPrefix, commands);

        this.client.on('message', (message: DiscordMessage): void => {
            messageEvent.handle(message);
        });
    }
}