const puppeteer = require('puppeteer');

async function scrapeWebsite_brandInItemElement(url, container_selector, brand_selector, name_selector, price_selector, sale_price_selector) {
    //Function that scrapes the product name, original price and sale price when given the website sale section url, 
    // & the CSS selectors which contain the sale items, the item names, the item prices and discount prices
    // this function is for when the brand name is stated in the element that contains the sale item

  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto(url, 
    {waitUntil: "domcontentloaded"});

    await page.waitForSelector(container_selector);

    //Scrape the data for each sale item and store the data in an object, which is
    // then stored in an array

    const sale_items_data = await page.evaluate((container, brand, name, price, sale_price, sale_url) => {

        const sale_items = document.querySelectorAll(container);

        return Array.from(sale_items).map(item => ({

          name: item.querySelector(name).innerText,
          brand: item.querySelector(brand).innerText,
          price: item.querySelector(price).innerText,
          sale_price: item.querySelector(sale_price).innerText,
          url: sale_url

        }));

      }, container_selector, brand_selector, name_selector, price_selector, sale_price_selector, url);
 
    console.log(sale_items_data) //will console log an array of objects, each object contains the data of a sale item

  // Close the browser
  await browser.close();
}

async function scrapeWebsite_brandNotInItemElement(url, container_selector, tset_selector, name_selector, price_selector, sale_price_selector) {
  //Function that scrapes the product name, original price and sale price when given the website sale section url, 
  // & the CSS selectors which contain the sale items, the item names, the item prices and discount prices
  // this function is for when the brand name is not stated in the element that contains the sale item, but is stated somewhere else in the website

  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(url, 
    {waitUntil: "domcontentloaded"});

    // await page.waitForSelector('body');
    
    // const brand_name = await page.evaluate((brand) => {

    //   const brand_name_is = document.querySelector(brand).innerText;

    //   return brand_name_is;

    // }, brand_selector);

    await page.waitForSelector(container_selector);

    //Scrape the data for each sale item and store the data in an object, which is
    // then stored in an array

    const test_name = await page.evaluate((test_selector_is) => {

        const test_element = document.querySelector(test_selector_is).innerText;

        return test_element;

      }, tset_selector);

    

    await page.waitForSelector(container_selector);

    //Scrape the data for each sale item and store the data in an object, which is
    // then stored in an array

    const sale_items_data = await page.evaluate((container, test_argument, name, price, sale_price, sale_url) => {

        const sale_items = document.querySelectorAll(container);

        return Array.from(sale_items).map(item => ({

          name: item.querySelector(name).innerText,
          test: test_argument,
          // brand: brand,
          price: item.querySelector(price).innerText,
          sale_price: item.querySelector(sale_price).innerText,
          url: sale_url

        }));

      }, container_selector, test_name,  name_selector, price_selector, sale_price_selector, url);

    console.log(sale_items_data) //will console log an array of objects, each object contains the data of a sale item

  // Close the browser
  await browser.close();
}

// export default scrapeWebsite;

console.log(scrapeWebsite_brandNotInItemElement('https://www.maccosmetics.ca/deals', 
                          
                          '.product-brief-v2', 
                          '.product-brief__description',
                          '.product-brief__name-link',
                          '.product-price--discounted',  
                          '.product-price--sale'
                        ))

                      // '.site-header-formatter__logo',
