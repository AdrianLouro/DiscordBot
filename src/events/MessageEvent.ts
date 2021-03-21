import Command from '@interfaces/Command';
import {
    Collection as DiscordCollection,
    Message as DiscordMessage
} from 'discord.js';

export default class MessageEvent {
    private readonly commands = new DiscordCollection<string, Command>();
    private readonly commandPrefix: string;

    constructor(commandPrefix: string, commands: Command[]) {
        this.commandPrefix = commandPrefix;
        this.setCommands(commands);
    }

    public handle(message: DiscordMessage): void {
        if (!message.content.startsWith(this.commandPrefix) || message.author.bot) {
            return;
        }

        const commandArguments: string[] = message.content.slice(this.commandPrefix.length).trim().split(/ +/);
        const commandName: string = (commandArguments.shift() as string).toLowerCase();

        if (!this.commands.has(commandName)) {
            return;
        }

        const command: Command = (this.commands.get(commandName) as Command);

        try {
            command.execute(message, commandArguments);
        } catch (error: unknown) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }

    private setCommands(commands: Command[]): void {
        commands.forEach((command: Command): void => {
            this.commands.set(command.name, command);
        });
    }
}