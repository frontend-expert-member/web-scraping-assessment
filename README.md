# web-scraping-assessment

Here's a TypeScript web scraping program that uses Playwright to scrape the last 10 items purchased from Amazon. This example includes steps to navigate to the website, log in, and return the last 10 items purchased. For simplicity, MFA (Multi-Factor Authentication) is handled manually by the user when encountered.

1. Setup the Project
     First, you need to create a new Node.js project and install the required dependencies.
      <code>
      mkdir <project_folder>
      cd <project_folder>
      npm init -y
      npm install playwright
      npm install @types/node @playwright/test typescript ts-node
      npx playwright install
      </code>

2. Create the TypeScript Configuration File
      Create a `tsconfig.json` file with the following content:
      <code>
            {
        "compilerOptions": {
          "target": "ES6",
          "module": "commonjs",
          "strict": true,
          "esModuleInterop": true,
          "skipLibCheck": true,
          "forceConsistentCasingInFileNames": true,
          "outDir": "./dist"
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_modules"]
      }
      </code>

3. Create the Web Scraping Script
     Created under `src/index.js` file and added the script to perform the Web Scraping.

4. Run the program
     To run the script, use the following command:
     <code> npx ts-node src/index.ts </code> on the command prompt.

This script will prompt you to enter your Amazon username and password, log in to your Amazon account, navigate to the orders page, and scrape the last 10 items purchased. The results will be printed in the console as a JSON array.

Notes:
MFA Handling: This script assumes that the user will manually handle any MFA prompts. The script will pause and wait for the user to completed the MFA process.
       
