import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { DiscordBotConstruct } from 'discord-bot-cdk-construct';
import * as path from 'path';

/**
 * The main stack that will be used to deploy everything.
 */
export class CaptainChrisBotStack extends Stack {
    /**
     * The constructor for creating an instances of this stack.
     *
     * @param {Construct} scope The app for which this construct is created within.
     * @param {string} id The ID to identify this specific stack's deployment via.
     * @param {StackProps} props Any additional properties that should be passed along.
     */
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // The core lambda that will handle all of the bots commands.
        const commandsLambda = new NodejsFunction(this, 'captain-chris-commands', {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../functions/core-command.ts'),
            handler: 'handler',
            timeout: Duration.seconds(60),
            memorySize: 256,
        });

        // The actual Discord bot's infrastructure.
        new DiscordBotConstruct(this, 'captain-chris', {
            commandsLambdaFunction: commandsLambda,
        });
    }
}
