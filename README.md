# Shopping List Application

## Intorduction

This is a sample or demo application for AWS development. The purpose of the app to learn and try out most of the AWS cloud computing services.

The application implements a simple __Shopping List__ app, in which users can manage their shopping lists in one place and share with others.

## Starting the application

To run the application, the AWS CLI must be configured on the machine with an AWS account and Terraform must be installed.

Local development:
1. Run the `terraform apply` command in the `tf/auth` folder to start the Cognito service.
2. Run the `terraform apply` command in the `tf/backend` folder to start the Backend services.
3. Run the `ng serve` command in the `frontend` folder.
4. Application is running on `localhost:4200`

Production deployment:
1. Run the `terraform apply` command in the `tf/auth` folder to start the Cognito service.
2. Run the `terraform apply` command in the `tf/backend` folder to start the Backend services.
3. Run the `terraform apply` command in the `tf/frontend` folder to start the Frontend services.
4. Run the `npm ci` and `npm build` command in the `frontend` folder to build the Angular application.
5. Run the `terraform apply` command in the `tf/frontend_upload` folder to upload the previously builded frontend code to S3 bucket.
