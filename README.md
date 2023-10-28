# Budget App - Java Capstone Project

Welcome to the "Budget App," a full-stack application created as a Java capstone project for the Neue Fische Java Bootcamp. This project aims to help you manage your finances efficiently and provides a consistent development and deployment workflow.

## Project Overview

The "Budget App" is a feature-rich financial management application with both Java backend and Vite React frontend. The application leverages Docker for containerization, GitHub Actions for continuous integration, and Render for deployment. This ReadMe provides an overview of the project and its current features.

## Features

### User Authentication

- Log in securely via GitHub OAuth.
- Access personalized financial data.

### Dashboard

- View your current financial balance at a glance.

### Income and Expense Tracking

- Add income and expenses with a title, amount, and category.
- Create and manage categories for your transactions.

### Transaction History

- View all your financial transactions.
- Delete individual transactions as needed.

### Category Management

- View, create, and delete transaction categories.

## Project Setup and Deployment

Here's an overview of the project setup and deployment:

1. **GitHub Repository Setup:**
   - A GitHub repository named "capstone-java" hosts the project.
   - The repository includes a `.gitignore` file suitable for Java, Maven, and React/Vite with TypeScript.

2. **Backend Setup:**
   - The backend is powered by a Maven project using Java.

3. **Frontend Setup:**
   - The frontend is developed using Vite React with TypeScript.

4. **Docker Image Creation:**
   - A Docker image for the full-stack application has been created using a Dockerfile.

5. **Docker Image Push to Docker Hub:**
   - Docker Hub credentials are configured for the project.

6. **Continuous Integration (CI) with GitHub Actions:**
   - GitHub Actions are set up for automated testing and deployment.
   - CI workflows build and test the full-stack application on every code push, including linting, unit tests, and integration tests.

7. **SonarCloud Integration:**
   - SonarCloud integration is being used to perform code analysis and ensure code quality.

## Getting Started

To get started with the "Budget App," follow these steps:

1. Clone the GitHub repository to your local machine.
2. Build and run the Docker image for the "Budget App."
3. Access the application in your web browser.

Stay tuned for further updates and contributions to the project. Happy budgeting!

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=ryliecc_capstone-java-backend)

---

*Note: This ReadMe provides an overview of the project setup and its current features. For detailed instructions on building, running, and contributing to the "Budget App," refer to the project's documentation.*
