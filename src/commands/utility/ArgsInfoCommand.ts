import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage
 } from 'discord.js';

export default class ArgsInfoCommand implements Command {
    public readonly name = 'args-info';
    public readonly description = 'Args info command';

    public execute(message: DiscordMessage, args: string[]): void {
        message.channel.send(`Command name: ${this.name}\nArguments: ${args.join(', ')}`);
    }
}