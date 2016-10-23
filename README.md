# loghour

[![Join the chat at https://gitter.im/99xt/loghour](https://badges.gitter.im/99xt/loghour.svg)](https://gitter.im/99xt/loghour?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Time Tracker hub for Geeks.

## Setup Project
Go to project root folder and execute the following commands

* Intall Project NPM dependencies
```
npm install
```

* Install Global NPM Dependencies
```
npm install serverless@1.0 webpack webpack-dev-server -g
```

* Initialize Serverless Project

1) Create a AWS User with Credentials and Grant Administrator Access Policy
http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html

2) Set Up the AWS Command Line Interface
http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html

* Configure github app for development

1) Create a file called .env inside serverless folder

2) Add the following content inside
```
REMOTE_STAGE=dev
GITHUB_ID=<github-client-id>
GITHUB_SECRET=<github-client-secret>
```

Note: Here dev stage is used as the development stage

3) Go to the project root folder and execute the following command
```
gulp deploy-api --stage dev --github_id <github-client-id> --github_secret <github-client-secret>
```
Note:- Here 'dev' is the Stage and You can use a different Stage also. To find github app information go to https://github.com/settings/applications/new
