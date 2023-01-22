import { PokeCommand } from '../../src/commands/poke';

describe('Test poke command', () => {
    test('Command info test', () => {
        expect(PokeCommand.slashCommand.name).toEqual('poke');
    });

    test('Callback test - Valid', () => {
        const response = PokeCommand.callback({
            id: '0',
            name: 'hello',
            options: [
                {
                    name: 'user',
                    value: '123',
                },
            ],
        });
        expect(response).toEqual({
            tts: false,
            content: `Hey <@123>, I'm poking you!`,
            embeds: [],
            allowedMentions: [],
        });
    });

    test('Callback test - Invalid', () => {
        const response = PokeCommand.callback({
            id: '0',
            name: 'hello',
        });
        expect(response).toEqual({
            tts: false,
            content: 'Couldn\'t poke the user for some reason!',
            embeds: [],
            allowedMentions: [],
        });
    });
});
