import { App } from 'aws-cdk-lib';
import { CaptainChrisBotStack } from './stacks/core';

const app = new App();
new CaptainChrisBotStack(app, 'CaptainChrisBotStack', {});
