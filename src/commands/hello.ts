import {
    IDiscordMember,
    IDiscordRequestData,
    IDiscordResponseData,
} from 'discord-bot-cdk-construct';
import { CustomCommand, SlashCommand } from './command-list';

const helloCommandInfo: SlashCommand = {
    name: 'hello',
    description: 'A simple hello command.',
};

/**
 * A simple hello command, just responds.
 * @param {IDiscordRequestData} _requestData The incoming request data.
 * @param {IDiscordMember} memberData The information of the sender for this command.
 * @return {IDiscordResponseData} Returns a simple "Hello there" response.
 */
function helloCommand(_requestData?: IDiscordRequestData,
    memberData?: IDiscordMember): IDiscordResponseData {
    let message: string = 'Hello there!';
    if (memberData?.user) {
        message = `Hello there <@${memberData.user.id}>!`;
    }
    return {
        tts: false,
        content: message,
        embeds: [],
        allowedMentions: [],
    };
}

export const HelloCommand: CustomCommand = {
    slashCommand: helloCommandInfo,
    callback: helloCommand,
};
