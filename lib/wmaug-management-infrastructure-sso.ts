import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sso from "aws-cdk-lib/aws-sso";

export class Sso extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const instanceArnParam = new cdk.CfnParameter(this, "instanceArnParam", {
      type: "String",
      description: "The ARN of the SSO instance",
    });

    // start account number parameters
    const wmaugManagementAccountNumberParam = new cdk.CfnParameter(
      this,
      "wmaugManagementAccountNumberParam",
      {
        type: "String",
        description: "The account number of the WMAUG management account",
      },
    );

    const wmaugMemberAccountNumberParam = new cdk.CfnParameter(
      this,
      "wmaugMemberAccountNumberParam",
      {
        type: "String",
        description: "The account number of the WMAUG member account",
      },
    );

    const wmaugModeratorAccountNumberParam = new cdk.CfnParameter(
      this,
      "wmaugModeratorAccountNumberParam",
      {
        type: "String",
        description: "The account number of the WMAUG moderator account",
      },
    );

    // start group GUID parameters

    const wmaugModeratorAdminGroupId = new cdk.CfnParameter(
      this,
      "wmaugModeratorAdminGroupId",
      {
        type: "String",
        description: "The GUID of the wmaugModeratorAdmin SSO group",
      },
    );

    const wmaugMemberAdminGroupId = new cdk.CfnParameter(
      this,
      "wmaugMemberAdminGroupId",
      {
        type: "String",
        description: "The GUID of the wmaugMemberAdmin SSO group",
      },
    );

    const wmaugMemberGroupId = new cdk.CfnParameter(
      this,
      "wmaugMemberGroupId",
      {
        type: "String",
        description: "The GUID of the wmaugMember SSO group",
      },
    );

    const wmaugFullAdminGroupId = new cdk.CfnParameter(
      this,
      "wmaugFullAdminGroupId",
      {
        type: "String",
        description: "The GUID of the wmaugFullAdmin SSO group",
      },
    );

    // Moderator permission set
    const wmaugModeratorAdminPermissionSet = new sso.CfnPermissionSet(
      this,
      "wmaugModeratorAdminPermissionSet",
      {
        // Use the value of the CFN parameter
        instanceArn: instanceArnParam.valueAsString,
        name: "wmaugModeratorAdminPermissionSet",
        description:
          "Permission set WMAUG moderators and administrators will use",
        managedPolicies: ["arn:aws:iam::aws:policy/AdministratorAccess"],
      },
    );
    // Owner permission set
    const wmaugFullAdminPermissionSet = new sso.CfnPermissionSet(
      this,
      "wmaugFullAdminPermissionSet",
      {
        instanceArn: instanceArnParam.valueAsString,
        name: "wmaugFullAdminPermissionSet",
        description: "Permission set WMAUG owners will use",
        managedPolicies: ["arn:aws:iam::aws:policy/AdministratorAccess"],
        sessionDuration: "PT12H",
      },
    );
    // Member permission set
    const wmaugMemberPermissionSet = new sso.CfnPermissionSet(
      this,
      "wmaugMemberPermissionSet",
      // allow members to assume deploy roles for manual deployment
      {
        inlinePolicy: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: "sts:AssumeRole",
              Resource: "arn:aws:iam::*:role/cdk-*",
            },
          ],
        },
        instanceArn: instanceArnParam.valueAsString,
        name: "wmaugMemberPermissionSet",
        description: "Permission set WMAUG members will use",
        managedPolicies: ["arn:aws:iam::aws:policy/ReadOnlyAccess"],
        sessionDuration: "PT12H",
      },
    );

    // Assign member users to member account
    new sso.CfnAssignment(this, "wmaugMemberAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugMemberPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugMemberGroupId.valueAsString,
      targetId: wmaugMemberAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });

    // Assign moderator admin to moderator account
    new sso.CfnAssignment(this, "wmaugModeratorAdminModeratorAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugModeratorAdminPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugModeratorAdminGroupId.valueAsString,
      targetId: wmaugModeratorAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });

    // Assign member admin to member account
    new sso.CfnAssignment(this, "wmaugMemberAdminModeratorAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugModeratorAdminPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugMemberAdminGroupId.valueAsString,
      targetId: wmaugMemberAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });

    // Assign full admin to management account
    new sso.CfnAssignment(this, "wmaugFullAdminManagementAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugFullAdminPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugFullAdminGroupId.valueAsString,
      targetId: wmaugManagementAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });

    // Assign full admin to member account
    new sso.CfnAssignment(this, "wmaugFullAdminMemberAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugFullAdminPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugFullAdminGroupId.valueAsString,
      targetId: wmaugMemberAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });

    // Assign full admin to moderator account
    new sso.CfnAssignment(this, "wmaugFullAdminModeratorAssignment", {
      instanceArn: instanceArnParam.valueAsString,
      permissionSetArn: wmaugFullAdminPermissionSet.attrPermissionSetArn,
      principalType: "GROUP",
      principalId: wmaugFullAdminGroupId.valueAsString,
      targetId: wmaugModeratorAccountNumberParam.valueAsString,
      targetType: "AWS_ACCOUNT",
    });
  }
}
