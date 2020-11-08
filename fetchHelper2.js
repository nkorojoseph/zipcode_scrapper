//import axios for fetching the html content of a website, cheerio for parsing html and objects-to-csv for creating a csv from an object
const axios = require('axios')
const cheerio = require('cheerio')
const objectToCv = require('objects-to-csv')

//const siteUrl = "https://worldpostalcode.com/nigeria/abia/aba-north/";
const baseUrl = "https://worldpostalcode.com";

/**
 * Fetch the HTML content of a website and pass it to cheerio.
 *
 * @param {*} siteUrl - The URL to page you want to scrape
 * @returns - A promise containing HTML tags of the website.
 */
const fetchData = async (siteUrl) => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
  };
exports.fetchData = fetchData

/**
 * Scrape out the regions class and the href of every 'a' tag within the region. 
 * Region could be a state, and location but not the unit
 *
 * @param {*} siteUrl - The URL to the location you want to extract the region
 * @returns Returns a promise containing href of a region and the name of the region. 
 */
const getRegion = async (siteUrl) => {
    const stateList = []
    const $ = await fetchData(siteUrl);
    /**Parse the first region class within the full website and locate the 'a' tags */
    const stateAs = $('.regions').eq(0).find('a'); 
    stateAs.each((i, stateA) => {
        stateList.push({ href: stateA.attribs.href, name: cheerio(stateA).text() });
    });
    return stateList
}
exports.getRegion = getRegion

/**
 * Get the Zip code or postal code of any location within nigeria.
 *
 * @param {*} siteUrl - The link to the state
 * @param {*} state - The state where the location is situated
 * @param {*} lga -  Local government where the place is located
 * @returns {zipCodes, location, state}- Returns a promise containing the list of zip codes and lga
 */
const getZip = async (siteUrl,state,lga) => {

    const zipCodes = []
    const $ = await fetchData(siteUrl)
    /**parse all the .unit class within the page. Iterate all the units and get the place and the zip codes */
    const zipUnit = $('.unit')
    zipUnit.each((i,unit)=>{
        let $place = $(unit).find('.place')
        let $code = $(unit).find('.code > span')
        zipCodes.push({state,lga,place: $place.text(), code:$code.text()})
    })
    /**For areas with more than two hyperlink to the the zipcodes, Go deeper and extract the zip codes. The zipcodes of those locations will be zero 
     * but by iterating, you will be able to get the hyperlink
     */
   if (zipCodes.length===0) {
       const stateList = []
       const $ = await fetchData(siteUrl);
       const stateAs = $('.regions').eq(0).find('a'); 
       stateAs.each((i, stateA) => {
           stateList.push({ href: stateA.attribs.href, name: cheerio(stateA).text() });
       });
       for (let index = 0; index < stateList.length; index++) {
           siteUrlc = stateList[index]['href']
           const $ = await fetchData(baseUrl+siteUrlc)
           const zipUnit = $('.unit')
           zipUnit.each((i,unit)=>{
               let $place = $(unit).find('.place')
               let $code = $(unit).find('.code > span')
               zipCodes.push({state,lga,place: $place.text(), code:$code.text()})
           })
           
       }
   }
    const csv = new objectToCv(zipCodes)
    await csv.toDisk('./list4.csv',{append:true})
    return zipCodes
}

exports.getZip = getZip


