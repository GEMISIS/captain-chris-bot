import { HelloCommand } from '../../src/commands/hello';

describe('Test hello command', () => {
    test('Command info test', () => {
        expect(HelloCommand.slashCommand.name).toEqual('hello');
    });

    test('Callback test', () => {
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
});
