import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sso from 'aws-cdk-lib/aws-sso';

export class Sso extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the CFN parameter
    const instanceArnParam = new cdk.CfnParameter(this, 'instanceArnParam', {
      type: 'String',
      description: 'The ARN of the SSO instance',
    });

    new sso.CfnPermissionSet(this, 'adminPermissionSet', {
      // Use the value of the CFN parameter
      instanceArn: instanceArnParam.valueAsString,
      name: 'adminPermissionSet',
      description: 'Permission set for admin',
      managedPolicies: ['arn:aws:iam::aws:policy/AdministratorAccess'],
    });
  }
}