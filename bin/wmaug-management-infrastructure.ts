#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Sso } from '../lib/wmaug-management-infrastructure-sso';
import { Scp } from '../lib/wmaug-management-infrastructure-scp';

const app = new cdk.App();
new Sso(app, 'Sso', {
});

new Scp(app, 'Scp', {
});