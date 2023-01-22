import { IDiscordResponseData } from 'discord-bot-cdk-construct';
import { CustomCommand, SlashCommand } from './command-list';

const helloCommandInfo: SlashCommand = {
    name: 'hello',
    description: 'A simple hello command.',
};

/**
 * A simple hello command, just responds.
 * @return {IDiscordResponseData} Returns the response that should be sent down.
 */
function helloCommand(): IDiscordResponseData {
    return {
        tts: false,
        content: 'Hello there!',
        embeds: [],
        allowedMentions: [],
    };
}

export const HelloCommand: CustomCommand = {
    slashCommand: helloCommandInfo,
    callback: helloCommand,
};
