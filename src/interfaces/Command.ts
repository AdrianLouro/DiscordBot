import { Message as DiscordMessage } from 'discord.js';

export default interface Command {
    readonly name: string;
    readonly description: string;
    execute(message: DiscordMessage, args: string[]): void;
}