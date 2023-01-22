import { IDiscordRequestData, IDiscordResponseData } from 'discord-bot-cdk-construct';
import { ApplicationCommandOptionType } from 'slash-commands';
import { CustomCommand, SlashCommand } from './command-list';

const pokeCommandInfo: SlashCommand = {
    name: 'poke',
    description: 'A simple poke command to poke someone.',
    options: [
        {
            name: 'user',
            description: 'The user to be poked.',
            type: ApplicationCommandOptionType.USER,
            required: true,
        },
    ],
};

/**
 * A simple poke command, pokes the user mentioned.
 * @param {IDiscordRequestData} requestData The incoming request data.
 * @return {IDiscordResponseData} Returns the response that should be sent down.
 */
function pokeCommand(requestData?: IDiscordRequestData): IDiscordResponseData {
    let message: string = 'Couldn\'t poke the user for some reason!';
    if (requestData?.options) {
        message = `Hey <@${requestData?.options[0].value}>, I'm poking you!`;
    }
    return {
        tts: false,
        content: message,
        embeds: [],
        allowedMentions: [],
    };
}

export const PokeCommand: CustomCommand = {
    slashCommand: pokeCommandInfo,
    callback: pokeCommand,
};
