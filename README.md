
# Cat finder

This project is a web application deployed on AWS, available at: [https://d3tsi0wyyqncdr.cloudfront.net/](https://d3tsi0wyyqncdr.cloudfront.net/).

## Table of Contents

- [Overview](#overview)
- [Test Coverage](#test-coverage)
- [CI/CD Pipeline](#ci-cd-pipeline)
- [Package Versions](#package-versions)
- [Deployment](#deployment)
- [Installation](#installation)
- [Usage](#usage)

## Overview

This project implements a web application with modern front-end technologies. It has been deployed using AWS CloudFront for optimal performance and availability. This document outlines key aspects of the project, including testing, CI/CD pipeline, and deployment strategy.

## Test Coverage

I have implemented automated tests to ensure the quality and reliability of the codebase. The project uses **Jest** for unit testing, and we achieve approximately 90% test coverage across critical components. Test results are generated automatically during the CI pipeline, and any drop in coverage below a set threshold will fail the build.

### Running Tests

To run tests locally:

```bash
npm run test
```

You can view a detailed coverage report by running:

```bash
npm run test:coverage
```

## CI/CD Pipeline

This project uses a **CI/CD pipeline** integrated with GitHub Actions. The pipeline performs the following steps:

1. **Checkout Code**: Clones the repository from the `main` branch.
2. **Set Up Node.js**: Configures the Node.js environment using version `20.17.0`.
3. **Cache Dependencies**: Caches Node.js dependencies to speed up future builds.
4. **Install Dependencies**: Installs necessary packages using `npm ci` for clean installations.
5. **Run Unit Tests**: Executes unit tests and generates a code coverage report.
6. **Build**: Builds the Angular application in production mode.
7. **Deploy to S3**: Deploys the production build to an AWS S3 bucket, syncing the contents with the S3 bucket and ensuring deleted files are removed.

### GitHub Actions Configuration

The CI/CD pipeline is defined in the `deploy.yml` file and is triggered on every `push` to the `main` branch.

You can view and customize the pipeline as needed. The deployment step uses the `jakejarvis/s3-sync-action` to handle the S3 upload and sync process, with environment variables for AWS credentials and bucket configuration.

- **Node.js Version**: 20.17.0
- **Cache**: Utilizes GitHub Actions cache for `npm` dependencies.
- **Testing**: Runs unit tests using the `npm run test` command with code coverage.
- **Build**: Executes the `npm run build --prod` command for production builds.
- **S3 Deployment**: Deployed using the AWS S3 bucket and configured through GitHub secrets for AWS credentials.


## Package Versions

This project uses the following key packages:

- **Angular**: 18.2.0
- **TypeScript**: 5.5.2

Make sure to install the correct versions of these packages to avoid compatibility issues.

## Deployment

The site is deployed on AWS and can be accessed at:

[https://d3tsi0wyyqncdr.cloudfront.net/](https://d3tsi0wyyqncdr.cloudfront.net/)


## Installation

To get started with the project locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/Nicorvenius/cat-finder.git
cd cat-finder
npm install
```

## Usage

To run the development server locally:

```bash
npm start
```

