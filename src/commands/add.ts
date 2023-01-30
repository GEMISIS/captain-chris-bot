import {
    IDiscordRequestData,
    IDiscordResponseData,
} from 'discord-bot-cdk-construct';
import { ApplicationCommandOptionType } from 'slash-commands';
import { CustomCommand, SlashCommand } from './command-list';

const addCommandInfo: SlashCommand = {
    name: 'add',
    description: 'Adds two numbers together.',
    options: [
        {
            name: 'a',
            description: 'The first number to add',
            type: ApplicationCommandOptionType.INTEGER,
            required: true,
        },
        {
            name: 'b',
            description: 'The second number to add',
            type: ApplicationCommandOptionType.INTEGER,
            required: true,
        },
    ],
};

/**
 * A simple add command, just responds with the addition of two given numbers.
 * @param {IDiscordRequestData} requestData The incoming request data.
 * @return {IDiscordResponseData} Returns the result of the inputs added if given.
 */
function addCommand(requestData?: IDiscordRequestData): IDiscordResponseData {
    let message: string = 'No numbers found to add!';
    // Make sure we were given options.
    if (requestData?.options) {
        // Parse out the values and add them.
        const a: number = Number(requestData?.options[0].value);
        const b: number = Number(requestData?.options[1].value);
        const result: number = a + b;
        message = `${a} + ${b} = ${result}`;
    }
    // Return our message finally.
    return {
        tts: false,
        content: message,
        embeds: [],
        allowedMentions: [],
    };
}

export const AddCommand: CustomCommand = {
    slashCommand: addCommandInfo,
    callback: addCommand,
};
