const axios = require('axios')
const cheerio = require('cheerio')
const objectToCv = require('objects-to-csv')


//const siteUrl = "https://worldpostalcode.com/nigeria/abia/aba-north/";


const fetchData = async (siteUrl) => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
  };
exports.fetchData = fetchData

const getRegion = async (siteUrl) => {
    const stateList = []
    const $ = await fetchData(siteUrl);
    const stateAs = $('.regions').eq(0).find('a'); 
    stateAs.each((i, stateA) => {
        stateList.push({ href: stateA.attribs.href, name: cheerio(stateA).text() });
    });
    
    return stateList
    
}
exports.getRegion = getRegion

const getZip = async (siteUrl,state,lga) => {
    const zipCodes = []
    const $ = await fetchData(siteUrl)
    const zipUnit = $('.unit')
    zipUnit.each((i,unit)=>{
        let $place = $(unit).find('.place')
        let $code = $(unit).find('.code > span')
        zipCodes.push({state, lga, place: $place.text(), code:$code.text()})
    })
   
    const csv = new objectToCv(zipCodes)
    await csv.toDisk('./list4.csv',{append:true})
    return zipCodes
    
}
exports.getZip = getZip

