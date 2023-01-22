import { HelloCommand } from '../../src/commands/hello';

describe('Test hello command', () => {
    test('Command info test', () => {
        expect(HelloCommand.slashCommand.name).toEqual('hello');
    });

    test('Callback test - no member info', () => {
        const response = HelloCommand.callback({
            id: '0',
            name: 'hello',
        });
        expect(response).toEqual({
            tts: false,
            content: 'Hello there!',
            embeds: [],
            allowedMentions: [],
        });
    });


    test('Callback test - with member info', () => {
        const response = HelloCommand.callback({
            id: '0',
            name: 'hello',
        }, {
            deaf: false,
            roles: [],
            user: {
                discriminator: '',
                id: 123,
                username: 'test-user',
            },
        });
        expect(response).toEqual({
            tts: false,
            content: 'Hello there <@123>!',
            embeds: [],
            allowedMentions: [],
        });
    });
});
