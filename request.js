const axios = require('axios')
const data = require('./data.json')
const fs = require('fs');
let links = (Object.keys(data))
async function dog() {
  console.log('calling');
  for (let i = 0; i < links.length; i++) {
    let item = links[i].split(" ").join("_")
    let url = "https://dungeonquestroblox.fandom.com/api.php?action=imageserving&format=json&wisTitle=File:" + item + ".png"
    let res = await axios.get(url)
      .then(res => {
        let link = res.data.image.imageserving
        data[links[i]].imagelink = link
      })
      .catch(error => {
        console.log(error)
      })
  }
  fs.writeFile("./datawithlinks.json", JSON.stringify(data), (err) => {
    if (err)
      console.log(err);
  });
}
dog();