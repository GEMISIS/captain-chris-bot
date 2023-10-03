import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CaptainChrisBotStack, CaptainChrisBotStackProps } from '../../src/stacks/core';

/**
 * Validate our stack has the specific things we want in it.
 */
describe('Stack test', () => {
    test('Confirm stack resources for bot', () => {
        const stackProps: CaptainChrisBotStackProps = {
            usersTableName: 'testUsersTable',
            companiesTableName: 'testCompaniesTable',
        };
        const app = new App();
        const stack = new CaptainChrisBotStack(app, 'MyTestStack', stackProps);
        const template = Template.fromStack(stack);

        template.hasResourceProperties('AWS::DynamoDB::Table', {
            TableName: stackProps.usersTableName,
            AttributeDefinitions: [
                {
                    AttributeName: 'uid',
                    AttributeType: 'N',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'uid',
                    KeyType: 'HASH',
                },
            ],
        });

        template.hasResourceProperties('AWS::DynamoDB::Table', {
            TableName: stackProps.companiesTableName,
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'N',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                },
            ],
        });

        template.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            MemorySize: 256,
            Runtime: 'nodejs18.x',
            Timeout: 60,
            Environment: {
                Variables: {
                    'companiesTableName': stackProps.companiesTableName,
                    'usersTableName': stackProps.usersTableName,
                },
            },
        });
    });
});
