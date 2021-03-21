import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage
 } from 'discord.js';

export default class PingCommand implements Command {
    public readonly name = 'ping';
    public readonly description = 'Ping command';

    public execute(message: DiscordMessage, args: string[]): void {
        message.channel.send('Pong.')
    }
}