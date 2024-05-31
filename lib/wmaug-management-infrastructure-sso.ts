import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sso from 'aws-cdk-lib/aws-sso';

export class Sso extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const instanceArnParam = new cdk.CfnParameter(this, 'instanceArnParam', {
      type: 'String',
      description: 'The ARN of the SSO instance',
    });

    // start account number parameters
    const wmaugManagementAccountNumberParam = new cdk.CfnParameter(this, 'wmaugManagementAccountNumberParam', {
      type: 'String',
      description: 'The account number of the WMAUG management account',
    });

    const wmaugModeratorAccountNumberParam = new cdk.CfnParameter(this, 'wmaugModeratorAccountNumberParam', {
      type: 'String',
      description: 'The account number of the WMAUG moderator account',
    });

    // start group GUID parameters

    const wmaugModeratorAdminGroupId = new cdk.CfnParameter(this, 'wmaugModeratorAdminGroupId', {
      type: 'String',
      description: 'The GUID of the wmaugModeratorAdmin SSO group',
    });

    const wmaugFullAdminGroupId = new cdk.CfnParameter(this, 'wmaugFullAdminGroupId', {
      type: 'String',
      description: 'The GUID of the wmaugFullAdmin SSO group',
    });

    // Start permission set policy creation
    const wmaugModeratorAdminPermissionSet = new sso.CfnPermissionSet(this, 'wmaugModeratorAdminPermissionSet', {
      // Use the value of the CFN parameter
      instanceArn: instanceArnParam.valueAsString,
      name: 'wmaugModeratorAdminPermissionSet',
      description: 'Permission set WMAUG moderators and administrators will use',
      managedPolicies: ['arn:aws:iam::aws:policy/AdministratorAccess'],
    });

    const wmaugFullAdminPermissionSet = new sso.CfnPermissionSet(this, 'wmaugFullAdminPermissionSet', {
      // Use the value of the CFN parameter
      instanceArn: instanceArnParam.valueAsString,
      name: 'wmaugFullAdminPermissionSet',
      description: 'Permission set WMAUG owners will use',
      managedPolicies: ['arn:aws:iam::aws:policy/AdministratorAccess'],
    });

    // Assign moderator admin to moderator account
    new sso.CfnAssignment(this, 'wmaugModeratorAdminModeratorAssignment', {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugModeratorAdminPermissionSet.attrPermissionSetArn,
      principalType: 'GROUP',
      principalId: wmaugModeratorAdminGroupId.valueAsString,
      targetId: wmaugModeratorAccountNumberParam.valueAsString,
      targetType: 'AWS_ACCOUNT',
      });

    // Assign full admin to management account
    new sso.CfnAssignment(this, 'wmaugFullAdminManagementAssignment', {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugFullAdminPermissionSet.attrPermissionSetArn,
      principalType: 'GROUP',
      principalId: wmaugFullAdminGroupId.valueAsString,
      targetId: wmaugManagementAccountNumberParam.valueAsString,
      targetType: 'AWS_ACCOUNT',
    });

    // Assign full admin to moderator account
    new sso.CfnAssignment(this, 'wmaugFullAdminModeratorAssignment', {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugFullAdminPermissionSet.attrPermissionSetArn,
      principalType: 'GROUP',
      principalId: wmaugFullAdminGroupId.valueAsString,
      targetId: wmaugModeratorAccountNumberParam.valueAsString,
      targetType: 'AWS_ACCOUNT',
    });
  }


}