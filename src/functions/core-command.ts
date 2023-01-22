import {
    IDiscordEventRequest,
    getDiscordSecrets, sendFollowupMessage, IDiscordEndpointInfo, verifyEvent,
} from 'discord-bot-cdk-construct';
import { CustomCommand, Commands } from '../commands/command-list';

/**
 * The main entry point for all of the bots commands. All of the commands are handled
 * in sub-scripts to make management of commands easier.
 *
 * @param {IDiscordEventRequest} event The incoming event to handle.
 * @return {Promise<string>} 200 response on success, 400 otherwise.
 */
export async function handler(event: IDiscordEventRequest): Promise<string> {
    const discordSecret = await getDiscordSecrets();
    const endpointInfo: IDiscordEndpointInfo = {
        authToken: discordSecret?.authToken ?? '',
        applicationId: discordSecret?.applicationId ?? '',
    };
    // Verify the incoming event.
    if (await verifyEvent(event) && event.jsonBody.token && event.jsonBody.data) {
        // Filter out for our custom command.
        const customCommand: CustomCommand | undefined = Commands.filter((command) => {
            return command.slashCommand.name == event.jsonBody.data?.name;
        }).pop();

        if (customCommand) {
            // If we find a custom command, call it and send the response down.
            await sendFollowupMessage(endpointInfo, event.jsonBody.token,
                customCommand.callback(event.jsonBody.data, event.jsonBody.member));
        } else {
            console.log('Invalid command!');
            return '400';
        }
    } else {
        console.log('Invalid request!');
        return '400';
    }
    return '200';
}
