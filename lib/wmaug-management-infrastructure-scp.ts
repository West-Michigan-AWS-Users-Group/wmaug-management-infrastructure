import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as orgs from 'aws-cdk-lib/aws-organizations';


export class Scp extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new orgs.CfnPolicy(this, 'denyIamAccessKeyCreation', {
      name: 'denyIamAccessKeyCreation',
        description: 'Deny IAM access key creation',
        type: 'SERVICE_CONTROL_POLICY',
        content:{
          "Version": "2012-10-17",
          "Statement": {
            "Effect": "Deny",
            "Action": [
              "iam:CreateAccessKey",
              "iam:CreateUser"
            ],
            "Resource": "*"
          }
        },
    });
    }
}
