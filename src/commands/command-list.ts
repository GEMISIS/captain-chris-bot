import {
    IDiscordMember,
    IDiscordRequestData,
    IDiscordResponseData,
} from 'discord-bot-cdk-construct';
import { PartialApplicationCommand } from 'slash-commands';
import { AddCommand } from './add';
import { HelloCommand } from './hello';
import { PokeCommand } from './poke';
import { WhoAreYouCommand } from './whoareyou';

/**
 * Remape the "PartialApplicationCommand" to be a "SlashCommand" for better
 * clarity.
 */
export declare type SlashCommand = PartialApplicationCommand;

/**
 * Every custom command should define an export with these definitions.
 */
export interface CustomCommand {
    /** The properties of the slash command, used for configuring the bot. */
    slashCommand: SlashCommand;
    /** The callback to run for the slash command. */
    callback: (requestData?: IDiscordRequestData,
        memberData?: IDiscordMember) => IDiscordResponseData;
}

/**
 * The list of commands available for the bot. Make sure to update
 * so that your command is available to the bot!
 */
export const Commands: CustomCommand[] = [
    HelloCommand,
    PokeCommand,
    WhoAreYouCommand,
    AddCommand,
];
