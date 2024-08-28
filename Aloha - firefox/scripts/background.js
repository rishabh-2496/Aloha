/*eslint-disable*/

console.log('Executing background Script');
function getImage(){
  const authorization_key = "";
  const headersObject = {
    method:'get',
    headers:{
      'Authorization': `Client-ID ${authorization_key}`
      }
    };
  const photosApi = fetch(`https://api.unsplash.com/photos/random?query=nature+landscape`,headersObject);
  photosApi
          .then(rawData => rawData.json())
          .then(jsonData => {
            console.log(jsonData);
             browser.storage.local.set({'photos':jsonData});
          });

        setTimeout(getImage,120000);
}


function getQuote(){
  const authorization_key = '';
  const headersObject = {
    method: 'get',
    headers: {
      'X-Mashape-Key': `${authorization_key}`
    }
  }

 const quotesApi = fetch('https://quotes.p.mashape.com/?category=motivational',headersObject);
 quotesApi
        .then(rawData => rawData.json())
        .then(data => {
          browser.storage.local.set({'quotes':data});
        })

        setTimeout(getQuote,120000);
}

getImage();
getQuote();

function createTab(){
  console.log('Not Working why??')
  browser.tabs.create({active: true});
}


browser.browserAction.onClicked.addListener(createTab);
