import { WhoAreYouCommand } from '../../src/commands/whoareyou';

describe('Test hello command', () => {
    test('Command info test', () => {
        expect(WhoAreYouCommand.slashCommand.name).toEqual('who-are-you');
    });

    test('Callback test', () => {
        const response = WhoAreYouCommand.callback({
            id: '0',
            name: 'who-are-you',
        });
        expect(response).toEqual({
            tts: false,
            // eslint-disable-next-line max-len
            content: `I am a Discord bot created by CNU Alumni Gerald McAlister! You can find more information about me at https://github.com/GEMISIS/captain-chris-bot.`,
            embeds: [],
            allowedMentions: [],
        });
    });
});
