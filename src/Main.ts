import fs from 'fs';
import Command from '@interfaces/Command';
import DiscordBot from '@models/DiscordBot';
import { config as DotenvConfig } from 'dotenv-flow';

export default class Main {
	static async main(): Promise<void> {
		DotenvConfig();
		(await this.getBot()).login();
	}

	private static async getBot(): Promise<DiscordBot> {
		return new DiscordBot(
			process.env.TOKEN as string,
			process.env.COMMAND_PREFIX as string,
			await this.getCommands()
		);
	}

	private static async getCommands(): Promise<Command[]> {
		const commandFolders: string[] = fs.readdirSync(`${__dirname}/commands`);
		const commands: Command[] = [];

		for (const commandFolder of commandFolders) {
			const commandFiles = fs.readdirSync(`${__dirname}/commands/${commandFolder}`);
			const folderCommands: Command[] = await this.getFolderCommands(commandFiles, commandFolder);
			commands.push(...folderCommands);
		}

		return commands;
	}

	private static async getFolderCommands(commandFiles: string[], commandFolder: string): Promise<Command[]> {
		return await Promise.all(commandFiles.map(
			async (commandFile): Promise<Command> => new (await import(`./commands/${commandFolder}/${commandFile}`)).default()
		));
	}
}

Main.main();