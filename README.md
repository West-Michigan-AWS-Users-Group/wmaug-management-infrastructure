# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


## Manually deploying the Sso stack
npx cdk deploy Sso --parameters instanceArnParam="arn:aws:sso:::instance/ssoins-123456789abcdefg" \
--parameters wmaugManagementAccountNumberParam="123456789abcd" \
--parameters wmaugModeratorAccountNumberParam="123456789abcd" \
--parameters wmaugModeratorAdminGroupId="12345678-1234-1234-1234-abcdefghijkl" \
--parameters wmaugFullAdminGroupId="12345678-1234-1234-1234-abcdefghijkl"

## Manually deploying the Scp stack
npx cdk deploy Scp

## TODO: Configure CI to auto deploy