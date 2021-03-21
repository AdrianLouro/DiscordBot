import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage
 } from 'discord.js';

export default class ServerCommand implements Command {
    public readonly name = 'server';
    public readonly description = 'Server command';

    public execute(message: DiscordMessage, args: string[]): void {
        message.channel.send(`Server name: ${message.guild?.name}\nTotal members: ${message.guild?.memberCount}`);
    }
}