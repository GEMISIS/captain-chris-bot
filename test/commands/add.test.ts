import { AddCommand } from '../../src/commands/add';

describe('Test add command', () => {
    test('Command info test', () => {
        expect(AddCommand.slashCommand.name).toEqual('add');
    });

    test('Callback test - Valid', () => {
        const response = AddCommand.callback({
            id: '0',
            name: 'add',
            options: [
                {
                    name: 'a',
                    value: '2',
                },
                {
                    name: 'b',
                    value: '3',
                },
            ],
        });
        expect(response).toEqual({
            tts: false,
            content: `2 + 3 = 5`,
            embeds: [],
            allowedMentions: [],
        });
    });

    test('Callback test - Invalid', () => {
        const response = AddCommand.callback({
            id: '0',
            name: 'add',
        });
        expect(response).toEqual({
            tts: false,
            content: 'No numbers found to add!',
            embeds: [],
            allowedMentions: [],
        });
    });
});
