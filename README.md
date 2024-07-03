# wmaug-management-infrastructure

TypeScript multi-stack AWS CDK app for managing the AWS Management account for the West Michigan AWS Users Group.

## Stack information

- Sso
  - Creates the AWS SSO resources for the WMAUG Management account.
    - Creates and defines permissions for groups.
    - Assigns groups to permission sets
- Scp
  - Stack containing SCPs for the WMAUG org.
    - Deny the creation of access keys
    - Deny the deployment of resources in any region other than us-east-1 and us-east-2

## Manually deploying the Sso stack

npx cdk deploy Sso --parameters instanceArnParam="arn:aws:sso:::instance/ssoins-123456789abcdefg" \
--parameters wmaugManagementAccountNumberParam="123456789abcd" \
--parameters wmaugModeratorAccountNumberParam="123456789abcd" \
--parameters wmaugModeratorAdminGroupId="12345678-1234-1234-1234-abcdefghijkl" \
--parameters wmaugFullAdminGroupId="12345678-1234-1234-1234-abcdefghijkl"

## Manually deploying the Scp stack

npx cdk deploy Scp
