
const puppeteer = require("puppeteer"); 
let product = process.argv.slice(2); //takes name from user

let final = product ;
let websites = ['https://www.flipkart.com','https://www.amazon.in','https://www.reliancedigital.in']; // Websites Currently Supported
let value = []; //gets Price of Product 
let portal = ['Flipkart','Amazon','Reliance Digital'];//Website Name
async function run(){
    if(product == 0 ){ // returns Error When Porduct Name is not given
        console.log("Please Provide The Product Name");
        return;
    }
    const browser = await puppeteer.launch({ // Initialises Chromium
        headless: false,
        defaultViewport: false,
    });
    // -----------------------------------------------------------------------------------
    // ---------------------------FlipKart------------------------------------
    const Flipkart = await browser.newPage();// Opens a new Tab in Chromium
    await Flipkart.goto(websites[0]); // Tab Redirectes to Flipkart.com
    await Flipkart.waitForSelector("._3704LK",{visible: true}); // Waits Till It Finds Search Box
    await Flipkart.click("._2KpZ6l._2doB4z")//Closes The Login Popup
    await Flipkart.type("._3704LK", final);//Types Product Name In Search Bar 
    await Flipkart.click("button[type = 'submit']");//Clicks The Search Button
    await Flipkart.waitForSelector("._13oc-S",{visible: true}); // Waits For Products List To Load
    let buttonfk = await Flipkart.$("._13oc-S a[rel='noopener noreferrer']");
    let Fkurl = await Flipkart.evaluate(function(ele){
        return ele.getAttribute("href");
    },buttonfk);
    Flipkart.goto(websites[0] + Fkurl);
    await Flipkart.waitForSelector(".B_NuCI",{visisble:true});
    let pnameFk = await Flipkart.$eval('.B_NuCI', el => el.innerText);
    value[0] = await Flipkart.$eval('._30jeq3._16Jk6d', el => el.innerText); // Catches Price of The Product
    console.log(portal[0] + " : "  + pnameFk +" : " + value[0]  + "Link: " + websites[0] + Fkurl); // prints 
    console.log("\n"); // Prints Empty Line
    
    // -----------------------------------------------------------------------------------
    // -------------------------------Amazon-----------------------------------------------------
    const Amazon = await browser.newPage();// Opens a new Tab in Chromium
    await Amazon.goto(websites[1]);
    await Amazon.waitForSelector("#twotabsearchtextbox",{visible: true});
    await Amazon.type("#twotabsearchtextbox", final);
    await Amazon.click("#nav-search-submit-button");
    await Amazon.waitForSelector(".a-size-base.a-link-normal.s-no-hover.a-text-normal .a-price-whole",{visible: true});
    let buttonam = await Amazon.$(".a-link-normal.a-text-normal");
    let amurl = await Amazon.evaluate(function(ele){
        return ele.getAttribute("href");
    },buttonam);
    Amazon.goto(websites[1] + amurl);
    await Amazon.waitForSelector(".a-size-medium.a-color-price.priceBlockBuyingPriceString",{visisble:true});
    value[1] = await Amazon.$eval('.a-size-medium.a-color-price.priceBlockBuyingPriceString', el => el.innerText);
    let pnameam = await Amazon.$eval('.a-size-large.product-title-word-break', el => el.innerText);
    
    console.log(portal[1] +  " : " + pnameam + " : " + value[1]  + " Link: " + websites[1] + amurl);
    console.log("\n");

    // -----------------------------------------------------------------------------------
    // -------------------------------Reliance Digital-----------------------------------------------------
    const Reliance = await browser.newPage();// Opens a new Tab in Chromium
    await Reliance.goto(websites[2]);
    await Reliance.waitForSelector(".suggestion__input.searchPanel__searchBox",{visible: true});
    await Reliance.type(".suggestion__input.searchPanel__searchBox", final);
    await Reliance.click("#RIL_HomeSearchButton");
    await Reliance.waitForSelector("a[target='_blank']",{visible: true});
    let buttonrel = await Reliance.$("a[target='_blank']");
    let relurl = await Reliance.evaluate(function(ele){
        return ele.getAttribute("href");
    },buttonrel);
    Reliance.goto(websites[2] + relurl);
    await Reliance.waitForSelector(".pdp__offerPrice",{visisble:true});
    value[2] = await Reliance.$eval('.pdp__offerPrice', el => el.innerText);
    let pnamerel = await Reliance.$eval('.pdp__title', el => el.innerText);
    
    console.log(portal[2] +  " : " + pnamerel + " : " + value[2]  + " Link: " + websites[2] + relurl);
    console.log("\n");
    // ----------------------------------------------------------------------------------
   
}  
run();