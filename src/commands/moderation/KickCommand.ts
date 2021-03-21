import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage,
    User as DiscordUser
 } from 'discord.js';

export default class KickCommand implements Command {
    public readonly name = 'kick';
    public readonly description = 'Kick command';

    public execute(message: DiscordMessage, args: string[]): void {
        const taggedUsersNames: string[] = message.mentions.users.map((user: DiscordUser): string => user.username);
		message.channel.send(`You wanted to kick: ${taggedUsersNames.join(', ')}`);
    }
}