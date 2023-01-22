import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CaptainChrisBotStack } from '../../src/stacks/core';

/**
 * Validate our stack has the specific things we want in it.
 */
describe('Stack test', () => {
    test('Confirm stack resources for bot', () => {
        const app = new App();
        const stack = new CaptainChrisBotStack(app, 'MyTestStack');
        const template = Template.fromStack(stack);

        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            MemorySize: 256,
            Runtime: 'nodejs18.x',
            Timeout: 60,
        });
    });
});
