import { AWSError, SecretsManager } from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { ApplicationCommand, DiscordInteractions } from 'slash-commands';
import { Commands } from '../commands/command-list';
import { IDiscordSecrets } from 'discord-bot-cdk-construct';

const secretsManager = new SecretsManager({
    region: 'us-west-2',
});

const inputArgs = process.argv.slice(2);

secretsManager.getSecretValue({
    SecretId: inputArgs[1],
}, async (err?: AWSError, data?: GetSecretValueResponse) => {
    if (data?.SecretString) {
        try {
            const discordSecrets: IDiscordSecrets = JSON.parse(data.SecretString);
            const interaction = new DiscordInteractions(discordSecrets);

            switch (inputArgs[0]) {
            case 'setup':
                Commands.map((command) => {
                    return command.slashCommand;
                }).forEach(async (command) => {
                    await interaction.createApplicationCommand(command).then(() => {
                        console.log(`Created command ${command.name}!`);
                    }).catch(console.error);
                });
                break;
            case 'reset':
                await interaction.getApplicationCommands()
                    .then((existingCommands: ApplicationCommand[]) => {
                        existingCommands.forEach(async (command) => {
                            await interaction
                                .deleteApplicationCommand(command.id)
                                .then(() => {
                                    console.log(`Deleted command ${command.name}!`);
                                })
                                .catch(console.error);
                        });
                    }).catch(console.error);
                break;
            }
        } catch (exception) {
            console.log(`There was an error parsing the secret JSON: ${exception}`);
            console.log('Please make sure that you have setup your secrets in the AWS console!');
        }
    } else {
        console.log('There was a problem retrieving your deployment results.\
    Make sure you\'ve run "npm run deploy" before running this command.');
    }
});
