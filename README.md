# pgats-automacao-web

This repository was created for the final project of my Web Automation class. The goal is to practice Cypress by automating test cases from the Automation Exercise website.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/pgats-automacao-web.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pgats-automacao-web
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Tests

To execute the test suite, use one of the following commands:

- Run tests in headless mode:
  ```bash
  npx cypress run
  ```

- Open the Cypress Test Runner:
  ```bash
  npx cypress open
  ```

## Generating JUnit Test Reports

This project is configured to generate JUnit test reports, which are useful for CI/CD pipelines.

1. **Run the tests:**
   ```bash
   npx cypress run
   ```

2. **Locate the reports:**
   - The JUnit reports will be saved in the `cypress/reports` directory.

3. **Use in CI/CD:**
   - The reports can be uploaded as artifacts in CI/CD pipelines for further analysis.

## Generating Mochawesome Test Reports

This project is configured to generate Mochawesome test reports, which provide detailed insights into test execution.

1. **Run the tests:**
   ```bash
   npx cypress run
   ```

2. **Locate the reports:**
   - The Mochawesome reports will be saved in the `cypress/reports` directory.

3. **View the reports:**
   - Open the HTML report in your browser:
     ```bash
     open cypress/reports/<report-name>.html
     ```

4. **Use in CI/CD:**
   - The reports can be uploaded as artifacts in CI/CD pipelines for further analysis.

## Test Structure

The test cases are located in the `cypress/tests` directory. Each test file corresponds to a specific feature or functionality of the Automation Exercise website.

## Tools and Libraries

This project uses the following tools and libraries:

- [Cypress](https://www.cypress.io/): End-to-end testing framework
- [Faker.js](https://fakerjs.dev/): Library for generating random test data

## Contribution

Feel free to fork this repository and submit pull requests for improvements or additional test cases.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
