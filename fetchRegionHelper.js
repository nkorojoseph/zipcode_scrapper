const cheerio = require('cheerio');
const getHp = require('./fetchHelper')

const siteUrl = "https://worldpostalcode.com/nigeria/abia/aba-north/";
exports.getRegion = async () => {
    const stateList = []
    const $ = await getHp.fetchData(siteUrl);
    const stateAs = $('.regions').eq(0).find('a'); 
    stateAs.each((i, stateA) => {
        stateList.push({ href: stateA.attribs.href, name: cheerio(stateA).text() });
    });
    console.log(stateList);
}
