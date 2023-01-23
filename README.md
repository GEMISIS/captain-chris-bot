# Captain Chris Bot

This is a Discord bot for Christopher Newport University servers! It makes use of AWS to allow for the bot to be serverless, meaning there is no dedicated host waiting for commands. Instead, it uses the [Discord Bot CDK Construct](https://constructs.dev/packages/discord-bot-cdk-construct/) in TypeScript to deploy via API Gateway and Lambda functions.

Interested in adding it to your Discord server? Contact me [here](https://geraldmcalister.com/contact.html) (use any Subject you want) to request a link to it. The bot will be made more public at a later date.

## Getting Started Contributing

To get started developing the bot, checkout the wiki page for the bot at [https://github.com/GEMISIS/captain-chris-bot/wiki](https://github.com/GEMISIS/captain-chris-bot/wiki).

## Architecture

The architecture of this projet is fairly simple: When a user uses a slash command from this bot, Discord will reach out to our endpoint at API Gateway and call into the lambda function at [src/functions/core-command.ts](src/functions/core-command.ts). If the command is valid, then the corresponding command in [src/commands](src/commands) will be called! You can see the architecture of the cloud side below:

![Architecture of the bot](diagrams/architecture.png?raw=true)

## Useful commands

### For testing, use the following commands

- `npm run test`                        perform the jest unit tests and output coverage
- `npm run command <json_data>`         runs a desired command locally.
  - `<json_data>` should be in the format of a `IDiscordRequestData` object, for example: `'{"name": "hello"}'`.


### For deplying, use the following commands

- `npm run build`                       compile typescript to js
- `cdk synth`                           emits the synthesized CloudFormation template
- `cdk deploy`                          deploy this stack to your default AWS account/region

### For keeping the code clean, use the following commands

- `npm run lint`                        runs linting across the code
- `npm run fix-lint`                    fixes any lint issues where possible across the code
- `cdk diff`                            compare deployed stack with current state

### Run the following to manage slash commands

- `npm run configure <secrets_name>`    sets up the slash commands using the secret keys in CDK.
- `npm run reset <secrets_name>`        resets the slash commands using the secret keys in CDK.
