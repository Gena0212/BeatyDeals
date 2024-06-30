const puppeteer = require('puppeteer');

async function scrapeWebsite() {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('https://www.maccosmetics.ca/deals', 
    {waitUntil: "domcontentloaded"});

//   await page.waitForSelector('.product-price--sale');

//   const priceElement = await page.$('.product-price--sale ');  
//   const price = await page.evaluate(el => el.textContent, priceElement);
  
// // " js-product-price--sale"

//   console.log(price)

  await page.waitForSelector('.product-price--sale');

  const saleElements = await page.$$eval('.product-price--sale', sale_item => {
    return sale_item.map(item => item.textContent);
  });
  
// " js-product-price--sale"

  console.log(saleElements)

//  // Extract data from the page
//  const sale_prices = await page.evaluate(() => {
//     const saleElements = document.querySelectorAll('.produpct-price--sale');

//     return Array.from(saleElements).map((sale_item) => {
//         const text = sale_item.querySelector(".text").innerText;

//     //   author: quote.querySelector('.author').innerText

//     return {text};
//     });
//   });

//   // Display the extracted data
//   console.log(sale_Elements);

  // Close the browser
  await browser.close();
}

scrapeWebsite();
