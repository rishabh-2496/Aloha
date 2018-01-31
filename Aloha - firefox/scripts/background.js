/*eslint-disable*/

console.log('Executing background Script');
function getImage(){
  const authorization_key = "e181a6095c2333ed40d114d5619b4aafe381a09a81339403b26e474e4554d2a2";
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
  const authorization_key = 'hwYTYNmfscmsh7Bt38I7MZdUkfSVp1HUBOejsnw7KIdZpylEor';
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
