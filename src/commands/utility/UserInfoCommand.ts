import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage
 } from 'discord.js';

export default class UserInfoCommand implements Command {
    public readonly name = 'user-info';
    public readonly description = 'User info command';

    public execute(message: DiscordMessage, args: string[]): void {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}