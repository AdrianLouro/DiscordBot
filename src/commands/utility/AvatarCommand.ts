import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage,
    User as DiscordUser
 } from 'discord.js';

export default class AvatarCommand implements Command {
    public readonly name = 'avatar';
    public readonly description = 'Avatar command';

    public execute(message: DiscordMessage, args: string[]): void {
        if (!message.mentions.users.size) {
			message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		} else {
			message.channel.send(message.mentions.users.map((user: DiscordUser): string => `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`));
		}
    }
}