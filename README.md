# Budget App - Java Capstone Project

Welcome to the "Budget App," a full-stack application created as a Java capstone project for the Neue Fische Java Bootcamp. This project aims to help you manage your finances efficiently and provides a consistent development and deployment workflow.

## Project Overview

The "Budget App" is a feature-rich financial management application with both Java backend and Vite React frontend. The application leverages Docker for containerization, GitHub Actions for continuous integration, and Render for deployment. It also utilizes MongoDB for data storage, and MongoDB Atlas for cloud-based database services. Styled-components are used for styling, and icons are sourced from Heroicons. This ReadMe provides an overview of the project and its current features.

## Features

### User Authentication

- Log in securely via GitHub OAuth.
- Access personalized financial data.

### Dashboard

- View your current financial balance at a glance.
- Get insights into your daily budget and balance based on your transactions and the remaining days of the month.

### Income and Expense Tracking

- Add income and expenses with a title, amount, and category.
- Create and manage categories for your transactions.
- Configure recurring transactions, both income and expenses, specifying a start date and optional end date.
- Conveniently delete individual or all future transactions of the same type.

### Transaction History

- View all your financial transactions.
- Delete individual transactions as needed.

### Category Management

- View, create, and delete transaction categories.

### Burger Menu

- Access a convenient burger menu from all pages for quick navigation.

## Project Setup and Deployment

Here's an overview of the project setup and deployment:

1. **GitHub Repository Setup:**
   - A GitHub repository named "capstone-java" hosts the project.
   - The repository includes a `.gitignore` file suitable for Java, Maven, and React/Vite with TypeScript.

2. **Backend Setup:**
   - The backend is powered by a Maven project using Java.
   - Data is stored in a MongoDB database, with MongoDB Atlas providing cloud-based database services.

3. **Frontend Setup:**
   - The frontend is developed using Vite React with TypeScript and styled with styled-components.

4. **Docker Image Creation:**
   - A Docker image for the full-stack application has been created using a Dockerfile.

5. **Docker Image Push to Docker Hub:**
   - Docker Hub credentials are configured for the project.

6. **Continuous Integration (CI) with GitHub Actions:**
   - GitHub Actions are set up for automated testing and deployment.
   - CI workflows build and test the full-stack application on every code push, including linting, unit tests, and integration tests.

7. **SonarCloud Integration:**
   - SonarCloud integration is being used to perform code analysis and ensure code quality.

## Automatic Deployment

The "Budget App" is automatically deployed to [https://capstone-java-budget-app.onrender.com](https://capstone-java-budget-app.onrender.com) whenever a pull request is merged to the main branch. This ensures that the main branch always represents the working version of the app.

## Getting Started

To access and use the "Budget App," simply visit the deployed application at [https://capstone-java-budget-app.onrender.com](https://capstone-java-budget-app.onrender.com). No need to clone the repository or set up your own instance, as the main branch is automatically deployed.

Please note that the application relies on environment variables and secrets for secure operation, and these details are not publicly accessible. As a result, no additional setup or local installation is required to use the app. Simply visit the provided URL, log in, and start managing your finances seamlessly.

Happy budgeting!

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=ryliecc_capstone-java-backend)

---

*Note: This ReadMe is the primary source of documentation for the "Budget App." For detailed instructions on building, running, and contributing to the project, refer to this ReadMe.*
