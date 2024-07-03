import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as orgs from "aws-cdk-lib/aws-organizations";

export class Scp extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new orgs.CfnPolicy(this, "denyIamAccessKeyCreation", {
      name: "denyIamAccessKeyCreation",
      description: "Deny IAM access key creation",
      type: "SERVICE_CONTROL_POLICY",
      content: {
        Version: "2012-10-17",
        Statement: {
          Effect: "Deny",
          Action: [
            "iam:CreateAccessKey",
            "iam:CreateUser",
            "iam:CreateLoginProfile",
            "iam:UpdateLoginProfile",
            "iam:DeleteAccessKey",
            "iam:DeleteUser",
            "iam:DeleteLoginProfile",
          ],
          Resource: "*",
        },
      },
    });

    // create SCP blocking access to all regions except us-east-1 and us-east-2
    new orgs.CfnPolicy(this, "denyAllRegionsExceptUsEast", {
      name: "denyAllRegionsExceptUsEast",
      description: "Deny all regions except us-east-1 and us-east-2",
      type: "SERVICE_CONTROL_POLICY",
      content: {
        Version: "2012-10-17",
        Statement: {
          Effect: "Deny",
          Action: "*",
          Resource: "*",
          Condition: {
            StringNotEquals: {
              "aws:RequestedRegion": ["us-east-1", "us-east-2"],
            },
          },
        },
      },
    });
  }
}
