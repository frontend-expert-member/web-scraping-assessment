import { chromium } from "playwright";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function scrapeAmazonOrders() {
  const username = await askQuestion("Enter your Amazon username: ");
  const password = await askQuestion("Enter your Amazon password: ");
  rl.close();

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.amazon.in/");
  await page.click("#nav-link-accountList");
  await page.fill('input[name="email"]', username);
  await page.click("input#continue");
  await page.fill('input[name="password"]', password);
  await page.click("input#signInSubmit");

  console.log("Please complete MFA if prompted...");

  // Wait for the orders page to load after successful login
  await page.waitForSelector("#nav-orders");
  await page.click("#nav-orders");

  // Wait for the orders list to load
  await page.waitForSelector(".order");

  const orders = await page.$$eval(".order", (orders) => {
    return orders.slice(0, 10).map((order) => {
      const nameElement = order.querySelector(".a-link-normal");
      const priceElement = order.querySelector(".a-color-price");
      const linkElement = order.querySelector(".a-link-normal");

      const name = nameElement ? nameElement.textContent.trim() : "N/A";
      const price = priceElement ? priceElement.textContent.trim() : "N/A";
      const link = linkElement
        ? (linkElement as HTMLAnchorElement).href
        : "N/A";
      return { name, price, link };
    });
  });

  console.log(JSON.stringify(orders, null, 2));

  await browser.close();
}

scrapeAmazonOrders().catch(console.error);
