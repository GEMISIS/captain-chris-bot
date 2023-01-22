import {
    IDiscordMember,
    IDiscordRequestData,
    IDiscordResponseData,
} from 'discord-bot-cdk-construct';
import { Commands, CustomCommand } from '../commands/command-list';

const inputArgs = process.argv.slice(2);

if (inputArgs[0]) {
    const commandArg: IDiscordRequestData = JSON.parse(inputArgs[0]) as IDiscordRequestData;
    let memberArg: IDiscordMember | undefined = undefined;
    if (inputArgs[1]) {
        memberArg = JSON.parse(inputArgs[1]) as IDiscordMember;
    }
    const customCommand: CustomCommand | undefined = Commands.filter((command) => {
        return command.slashCommand.name == commandArg.name;
    }).pop();

    if (customCommand) {
        const response: IDiscordResponseData = customCommand.callback(commandArg, memberArg);
        console.log(`
        Input Command: ${JSON.stringify(commandArg)}
        Member Caller: ${memberArg ? JSON.stringify(memberArg) : 'None'}

        Command Response: ${JSON.stringify(response)}
        `);
    }
} else {
    console.error('No input command given!');
}
