import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage
 } from 'discord.js';

export default class BeepCommand implements Command {
    public readonly name = 'beep';
    public readonly description = 'Beep command';

    public execute(message: DiscordMessage, args: string[]): void {
        message.channel.send('Boop.')
    }
}