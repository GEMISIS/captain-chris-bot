import { IDiscordResponseData } from 'discord-bot-cdk-construct';
import { CustomCommand, SlashCommand } from './command-list';

const whoAreYouCommandInfo: SlashCommand = {
    name: 'who-are-you',
    description: 'Give a quick description about the bot.',
};

/**
 * Gives a description of the Discord bot.
 * @return {IDiscordResponseData} Returns the response that should be sent down.
 */
function whoAreYouCommand(): IDiscordResponseData {
    return {
        tts: false,
        // eslint-disable-next-line max-len
        content: `I am a Discord bot created by CNU Alumni Gerald McAlister! You can find more information about me at https://github.com/GEMISIS/captain-chris-bot.`,
        embeds: [],
        allowedMentions: [],
    };
}

export const WhoAreYouCommand: CustomCommand = {
    slashCommand: whoAreYouCommandInfo,
    callback: whoAreYouCommand,
};
