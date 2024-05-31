#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Sso } from '../lib/wmaug-management-infrastructure-sso';
import { Scp } from '../lib/wmaug-management-infrastructure-scp';

const app = new cdk.App();
new Sso(app, 'Sso', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },
});

new Scp(app, 'Scp', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },
});