import Command from '@interfaces/Command';
import MessageDispatcher from '@events/MessageDispatcher';
import {
    Client as DiscordClient,
    Collection as DiscordCollection,
    Message as DiscordMessage
} from 'discord.js';

export default class DiscordBot {
    private readonly client: DiscordClient;
    private readonly commands: DiscordCollection<string, Command>;
    private readonly commandPrefix: string;
    private readonly token: string;

    constructor(token: string, commandPrefix: string, commands: Command[]) {
        this.client = new DiscordClient();
        this.commands = new DiscordCollection<string, Command>();
        this.commandPrefix = commandPrefix;
        this.token = token;
        this.setCommands(commands);
        this.setEventListeners();
    }

    public login(): void {
        this.client.login(this.token);
    }

    private setCommands(commands: Command[]): void {
        commands.forEach((command: Command): void => {
            this.commands.set(command.name, command);
        });
    }

    private setEventListeners(): void {
        this.client.once('ready', (): void => {
            console.log(`Logged in as ${this.client.user?.tag}!`);
        });

        this.client.on('message', (message: DiscordMessage) => {
            new MessageDispatcher(this.commandPrefix, this.commands).dispatch(message);
        });
    }
}