import { IDiscordRequestData, IDiscordResponseData } from 'discord-bot-cdk-construct';
import { Commands, CustomCommand } from '../commands/command-list';

const inputArgs = process.argv.slice(2);

const commandArg: IDiscordRequestData = JSON.parse(inputArgs[0]) as IDiscordRequestData;
const customCommand: CustomCommand | undefined = Commands.filter((command) => {
    return command.slashCommand.name == commandArg.name;
}).pop();

if (customCommand) {
    const response: IDiscordResponseData = customCommand.callback(commandArg);
    console.log(`
    Input Command: ${JSON.stringify(commandArg)}

    Command Response: ${JSON.stringify(response)}
    `);
}
