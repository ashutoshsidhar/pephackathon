/* 
===============================================================================================================
Project Name : The Product Scrapper 
Author Name : Ashutosh Sidhar (GTBIT BATCH PEPCODING)
Github Link : https://github.com/ashutoshsidhar/pephackathon/blob/master/review.js
LinkedIn Profile : https://www.linkedin.com/in/ashutosh-sidhar-5a17b2106/
Project Working Video : 
Description : This Project is basically a helping hand to users so that they can find the Products They Need
On Different Websites and Provides the Price and Link For the Product to The User so that there price Comparing 
Time is Saved. 
===============================================================================================================
*/
const puppeteer = require("puppeteer"); // requires Puppeteer Tool 
let product = process.argv.slice(2); //takes name from user

let websites = ['https://www.flipkart.com','https://www.amazon.in','https://www.reliancedigital.in']; // Websites Currently Supported
let value = []; //gets Price of Product 
let portal = ['Flipkart','Amazon','Reliance Digital'];//Website Name
async function run(){
    if(product == 0 ){ // returns Error When Porduct Name is not given
        console.log("Please Provide The Product Name");
        return;
    }
    const browser = await puppeteer.launch({ // Initialises Chromium
        headless: false,  // makes the browser visible
        defaultViewport: false, // makes sure that website looks normal
    });
    // ----------------------------------------------------------------------------------------------------
    // ---------------------------FlipKart-----------------------------------------------------------------

    const Flipkart = await browser.newPage();// Opens a new Tab in Chromium
    await Flipkart.goto(websites[0]); // Tab Redirectes to Flipkart.com
    await Flipkart.waitForSelector("._3704LK",{visible: true}); // Waits Till It Finds Search Box
    await Flipkart.click("._2KpZ6l._2doB4z")//Closes The Login Popup
    await Flipkart.type("._3704LK", product);//Types Product Name In Search Bar 
    await Flipkart.click("button[type = 'submit']");//Clicks The Search Button
    await Flipkart.waitForSelector("._13oc-S",{visible: true}); // Waits For Products List To Load
    let buttonfk = await Flipkart.$("._13oc-S a[rel='noopener noreferrer']");
    let Fkurl = await Flipkart.evaluate(function(ele){// takes link of the product
        return ele.getAttribute("href");
    },buttonfk);
    Flipkart.goto(websites[0] + Fkurl);//go's to product page
    await Flipkart.waitForSelector(".B_NuCI",{visisble:true});//waits till product price is visible
    let pnameFk = await Flipkart.$eval('.B_NuCI', el => el.innerText); //stores product name
    value[0] = await Flipkart.$eval('._30jeq3._16Jk6d', el => el.innerText); //stores price
    console.log(portal[0] + " : "  + pnameFk +" : " + value[0]  + " Link: " + websites[0] + Fkurl); // Prints Website Name Product Name Price And Link
    console.log("\n"); // Prints Empty Line


    // ----------------------------------------------------------------------------------------------------
    // -------------------------------Amazon---------------------------------------------------------------


    const Amazon = await browser.newPage();// Opens a new Tab in Chromium
    await Amazon.goto(websites[1]);// go's to ecommerce website
    await Amazon.waitForSelector("#twotabsearchtextbox",{visible: true});// waits till website loads
    await Amazon.type("#twotabsearchtextbox", product);// types product provided by user in search bar
    await Amazon.click("#nav-search-submit-button");// clicks on search button
    await Amazon.waitForSelector(".a-size-base.a-link-normal.s-no-hover.a-text-normal .a-price-whole",{visible: true});// waits until product list is available
    let buttonam = await Amazon.$(".a-link-normal.a-text-normal");
    let amurl = await Amazon.evaluate(function(ele){// takes link of the product
        return ele.getAttribute("href");
    },buttonam);
    Amazon.goto(websites[1] + amurl);//go's to product page
    await Amazon.waitForSelector(".a-size-medium.a-color-price.priceBlockBuyingPriceString",{visisble:true});//waits till product price is visible
    value[1] = await Amazon.$eval('.a-size-medium.a-color-price.priceBlockBuyingPriceString', el => el.innerText);//stores price
    let pnameam = await Amazon.$eval('.a-size-large.product-title-word-break', el => el.innerText);//stores product name
    
    console.log(portal[1] +  " : " + pnameam + " : " + value[1]  + " Link: " + websites[1] + amurl);// Prints Website Name Product Name Price And Link
    console.log("\n");// prints empty line

    // ----------------------------------------------------------------------------------------------------
    // -------------------------------Reliance Digital-----------------------------------------------------
   
    const Reliance = await browser.newPage();// Opens a new Tab in Chromium
    await Reliance.goto(websites[2]);// go's to ecommerce website
    await Reliance.waitForSelector(".suggestion__input.searchPanel__searchBox",{visible: true}); // waits till website loads
    await Reliance.type(".suggestion__input.searchPanel__searchBox", product);// types product provided by user in search bar
    await Reliance.click("#RIL_HomeSearchButton");// clicks on search button
    await Reliance.waitForSelector("a[target='_blank']",{visible: true}); // waits until product list is available
    let buttonrel = await Reliance.$("a[target='_blank']");
    let relurl = await Reliance.evaluate(function(ele){ // takes link of the product
        return ele.getAttribute("href");
    },buttonrel);
    Reliance.goto(websites[2] + relurl);//go's to product page
    await Reliance.waitForSelector(".pdp__offerPrice",{visisble:true});//waits till product price is visible
    value[2] = await Reliance.$eval('.pdp__offerPrice', el => el.innerText);//stores price
    let pnamerel = await Reliance.$eval('.pdp__title', el => el.innerText);//stores product name
    
    console.log(portal[2] +  " : " + pnamerel + " : " + value[2]  + " Link: " + websites[2] + relurl); // Prints Website Name Product Name Price And Link
    console.log("\n");// prints empty line
    
    // -----------------------------------------------------------------------------------------------------
}  


run();  // Calls The Function 