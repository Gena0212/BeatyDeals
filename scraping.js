const puppeteer = require('puppeteer');

async function scrapeWebsite() {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('https://www.maccosmetics.ca/deals', 
    {waitUntil: "domcontentloaded"});

    await page.waitForSelector('.product-brief-v2');
    

    const saleElements = await page.$$eval('.product-brief-v2', item => {
        return item.map(element => {
            const item_name = element.querySelector(".product-brief__product-name").innerText;
            const item_orig_price = element.querySelector(".product-price--discounted").innerText;
            const item_sale_price = element.querySelector(".product-price--sale").innerText;


            // const sale_item_image = await page.$('.product-brief__container');
            // await sale_item_image.screenshot({ path: sale_item_name+'.png' });


            // const sale_item_image = async (name) => {
            //     const product_image = await page.waitForSelector('.product-brief__container');
            //     await product_image.screenshot({
            //     path: name,
            //     });
            // }

            // sale_item_image(sale_item_name)
            
            return {item_name, item_orig_price, item_sale_price};
        });
      });

    
  
    console.log(saleElements)

//   await page.waitForSelector('.product-brief__details');

//   const product_image = await page.waitForSelector('.product-brief__container');
//     await product_image.screenshot({
//     path: 'div.png',
//     });

//   const saleElement_names = await page.$$eval('.product-brief__product-name', item_name => {
//     return item_name.map(item => item.textContent);
//   });
  

//   console.log(saleElement_names)



  // Close the browser
  await browser.close();
}

scrapeWebsite();
