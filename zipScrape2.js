
const cheerio = require('cheerio');
const getHp = require('./fetchHelper2')


const siteUrl = "https://worldpostalcode.com/nigeria/";
const baseUrl = "https://worldpostalcode.com";

const stateList =  getHp.getRegion(siteUrl)

//let states = []
let lga = [] 

stateList.then((stateL)=>{
  return stateL
}).then(async (stateList)=>{
  for (let index = 0; index < stateList.length; index++) {
    const $ = await getHp.fetchData(baseUrl+stateList[index]['href']);
    const stateAs = $('.regions').eq(0).find('a'); 
    stateAs.each((i, stateA) => {
        lga.push({ href: stateA.attribs.href, LGA: cheerio(stateA).text(), State:stateList[index]['name'] });
    });
  }
  //console.log(lga)
  return lga  

}).then(async (lgalist)=>{
  
  for (let index = 0; index < lgalist.length; index++) {
    //   console.log('baseUrl+siteurl : ',baseUrl+lgalist[index]['href'])
    await getHp.getZip(baseUrl+lgalist[index]['href'], lgalist[index]['State'], lgalist[index]['LGA'])
  }
})
