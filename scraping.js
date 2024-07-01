const puppeteer = require('puppeteer');

async function scrapeWebsite(url, container_selector, name_selector) {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto(url, 
    {waitUntil: "domcontentloaded"});

    await page.waitForSelector(container_selector);

    // const sale_object = {
    //     container: container_selector
    //     name: name_selector
    // }

    const sale_items_data = await page.evaluate((container, name) => {
        const sale_items = document.querySelectorAll(container);
        console.log('sale items', sale_items)
        return Array.from(sale_items).map(item => ({
          name: item.querySelector(name).innerText,
          price: item.querySelector(".product-price--discounted").innerText,
          sale_price: item.querySelector(".product-price--sale").innerText
        }));
      }, container_selector, name_selector);


    // const sale_items_data = await page.evaluate((container, name) => {
    //     const sale_items = document.querySelectorAll(container_selector);
    //     console.log('sale items', sale_items)
    //     return Array.from(sale_items).map(item => ({
    //       name: quote.querySelector(name_selector).innerText,
    //       price: quote.querySelector(".product-price--discounted").innerText,
    //       sale_price: quote.querySelector(".product-price--sale").innerText
    //     }));
    //   }, container_selector, name_selector);

    
    console.log(sale_items_data)
    

    // const saleElements = await page.$$eval(container_selector, (item, name_selector)=> {
    //     return item.map(element => {
    //         // selector = `#${CSS.escape(name_selector)}`;
    //         // console.log(name_selector)
    //         // let selector_name = name_selector;

    //         // const item_name = element.querySelector(`[data-name=${CSS.escape(selector_name)}]`).innerText;

    //         // const item_name = element.querySelector(`[data-name="${CSS.escape(name_selector)}"]`).innerText;
    //         const item_name = element.querySelector(name_selector).innerText;
    //         const item_orig_price = element.querySelector(".product-price--discounted").innerText;
    //         const item_sale_price = element.querySelector(".product-price--sale").innerText;

            
    //         return {item_name, item_orig_price, item_sale_price};
    //     });
    //   });


  
    // console.log(saleElements)


  // Close the browser
  await browser.close();
}

scrapeWebsite('https://www.maccosmetics.ca/deals', container_selector = '.product-brief-v2', ".product-brief__product-name");
