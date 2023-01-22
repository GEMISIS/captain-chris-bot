# Captain Chris Bot

This is a Discord bot for Christopher Newport University servers! It makes use of AWS to allow for the bot to be serverless, meaning there is no dedicat host waiting for commands. Instead, it uses the [Discord Bot CDK Construct](https://constructs.dev/packages/discord-bot-cdk-construct/) in TypeScript to deploy via API Gateway and Lambda functions.

Interested in adding it to your Discord server? Contact me [here](https://geraldmcalister.com/contact.html) (use any Subject you want) to request a link to it. The bot will be made more public at a later date.

## Quick Start Contributions

Want to quickly get started adding commands? Check out the simple "Hello" command in `src/commands/hello.ts`, or a slightly more complicated "Poke" command in `src/commands/poke.ts`. You can begin adding new commands to the `src/commands` directory, and creating tests for your command in `test/commands`! See `test/commands/hello.test.ts` and `test/commands/poke.test.ts` for example tests too!

Join the CNU ACM Discord server to get help!

## Architecture

The architecture of this projet is fairly simple: When a user uses a slash command from this bot, Discord will reach out to our endpoint at API Gateway and call into the lambda function at `src/functions/core-command.ts`. If the command is valid, then the corresponding command in `src/commands` will be called! You can see the architecture of the cloud side below:

![Architecture of the bot](https://github.com/GEMISIS/captain-chris-bot/blob/main/diagrams/architecture.png?raw=true)

## Setting Up Project

*Note: You only need to setup the project if you plan to deploy the Discord bot. If you just want to add a command, you can simple pull down the code, create a command with appropriate tests, and go from there.*

To setup the project so you can contribute, simply run the following commands:

```bash
npm install
```

It is recommended you use [Visual Studio Code](https://code.visualstudio.com/) for development since it has support for autocompleting many of the types here.

To deploy the bot to your own AWS account, you'll need to [setup the AWS CLI to deploy](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html), including connecting your account to do so. After that, you can run the following commands to deploy to your account:

```bash
# Compile the TypeScript code
npm run build
# Synthesize the CDK application
cdk synth
# Deploy the CDK application
cdk deploy
```

After this, you'll need to update your AWS Secrets Manager secret created from this deployment with the following JSON structure:

```json
{
    "applicationId": "123",
    "publicKey": "456",
    "botToken": "789",
    "authToken": "789"
}
```

This information is used when validating things with Discord's APIs. Once you have done this, you can get deploy your API Gateway endpoint, and enter its URL into your Discord bot's `INTERACTIONS ENDPOINT URL` section.

## Adding New Commands

Adding commands is fairly straightforward:

1. Begin by creating a new command file in `src/commands`
2. Declare a slash command structure.
3. Declare your command's callback for when called.
4. Update `src/commands/command-list.ts`'s `Commands` array with your command.

As an example, you can see in `src/commands/hello.ts` a very simple "hello world" command. If you want your command to take inputs, see `src/commands/poke.ts` for how to tag users (note that you can use strings and other types too!)

After you have added a new command, there are two things that still need to happen to actually use the commands:

1. The CDK stack needs to be updated with the new code to run the command.
2. The new commands need to be registered with Discord for the bot.

You can update the CDK stack with the instructions above this section for deploying. To update Discord with the new commands, you will need to run the following command:

```bash
npm run configure <secrets_name>
```

Where `<secrets_name>` is the name of your AWS Secrets Manager secret. This will be used to pull the bot's token and application ID. **Note that this means the bot won't have your commands until your changes have been submitted and accepted!**

## Contributing

If you plan to contribute new commands to the project, please make sure to `lint` your code using `npm run lint` and fixing any errors that appear. Also ensure that you have added proper tests for your command, and that `npm run test` succeeds fully. If you are not sure why your tests are not getting full coverage, you can find the full details of what is tested in the generated `coverage/lcov-report/index.html` file once you have run the tests.

## Useful commands

### For deplying, use the following commands

* `npm run build`                       compile typescript to js
* `cdk synth`                           emits the synthesized CloudFormation template
* `cdk deploy`                          deploy this stack to your default AWS account/region

### For keeping the code clean, use the following commands

* `npm run lint`                        runs linting across the code
* `npm run fix-lint`                    fixes any lint issues where possible across the code
* `npm run test`                        perform the jest unit tests and output coverage
* `cdk diff`                            compare deployed stack with current state

### Run the following to manage slash commands

* `npm run configure <secrets_name>`    sets up the slash commands using the secret keys in CDK.
* `npm run reset <secrets_name>`        resets the slash commands using the secret keys in CDK.
