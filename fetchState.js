
// const cheerio = require('cheerio');
// const axios = require("axios");
// const getHp = require('./fetchHelper')


// const siteUrl = "https://worldpostalcode.com/nigeria/";
// const baseUrl = "https://worldpostalcode.com";

// const stateList =  getHp.getRegion(siteUrl)

// //console.log(stateList)
// let states = []
// let lga = []
// stateList.then((stateL)=>{
//   stateL.forEach(element => {
//     states.push(element['href'])
//   })

//   //new section with iteration





// //working without iteration
//   let fetchLGA = getHp.getRegion(baseUrl + states[3])
//   fetchLGA.then((lgaList) =>{
//     lgaList.forEach(element => {
//       lga.push(element['href'])
//     })
    
//     let fetchLoc = getHp.getRegion(baseUrl+lga[0])
//     fetchLoc.then((locList)=>{
//       //console.log(baseUrl+locList[0]['href'])
//       getHp.getZip(baseUrl+locList[0]['href'])
//     })

//   })

// }).catch((e)=>console.log('Error from fetching \n' + e))
