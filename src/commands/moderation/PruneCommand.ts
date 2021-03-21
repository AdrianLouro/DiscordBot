import Command from '@interfaces/Command';
import { 
    Message as DiscordMessage,
    TextChannel as DiscordTextChannel
 } from 'discord.js';

export default class PruneCommand implements Command {
    public readonly name = 'prune';
    public readonly description = 'Prune command';

    public execute(message: DiscordMessage, args: string[]): void {
        const amount: number = parseInt(args[0]) + 1;
		if (isNaN(amount) || amount < 2 || amount > 6) {
			message.reply('you need to input a number between 1 and 5.');
		} else {
			(message.channel as DiscordTextChannel).bulkDelete(amount, true)
				.catch((error: unknown): void => {
					console.log(error);
					message.channel.send('there was an error trying to prune messages in this channel!');
				});
		}
    }
}