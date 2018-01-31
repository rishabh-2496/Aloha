/* eslint-disable */

const quotePara = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const picLocation = document.querySelector('.pic-location');
const referral = document.querySelector('.user-name');

function showImage() {
  // document.body.style.background = 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))';
  document.body.style.background = `url(${this.src})`;
  document.body.style.backgroundSize = 'cover';
}

function changeImg(){
browser.storage.local.get('photos')
  .then((data) => {
  const downloadingImage = new Image();
  downloadingImage.addEventListener('load', showImage);
  downloadingImage.src = data.photos.urls.regular;
  referral.href = `${data.photos.user.links.html}?utm_source=Aloha&utm_medium=referral`;
  referral.textContent = data.photos.user.name;
  picLocation.textContent = data.photos.location.title;
  });
  setTimeout(changeImg,300000);
}

changeImg();
browser.storage.local.get('quotes')
 .then((data) => {
  quotePara.textContent = data.quotes.quote;
  quoteAuthor.textContent = data.quotes.author;
});


function putGreetingMsg(msg) {
  const greetingHeader = document.createElement('h1');
  greetingHeader.className = 'info';
  greetingHeader.textContent = msg;
  document.querySelector('.intro').appendChild(greetingHeader);
}


function greetUser() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    browser.storage.local.get('UserName')
    .then((greet) => {
      const greeting = `Good Morning, ${greet.UserName}`;
      putGreetingMsg(greeting);
    });
  } else if (hours >= 12 && hours < 17) {
    browser.storage.local.get('UserName')
     .then((greet) => {
      const greeting = `Good Afternoon, ${greet.UserName}`;
      putGreetingMsg(greeting);
    });
  } else if (hours >= 17) {
    browser.storage.local.get('UserName')
    .then((greet) => {
      const greeting = `Good Evening, ${greet.UserName}`;
      putGreetingMsg(greeting);
    });
  }
}

browser.storage.local.get('UserName')
  .then((name) => {
    if(name.UserName != undefined){
      document.querySelector('.info').className = 'hide';
      document.querySelector('.input').className = 'hide';
      greetUser();
    }
    else{
      const input = document.querySelector('.input');
      input.addEventListener('keypress',(e) =>{
        if(e.keyCode === 13){
          browser.storage.local.set({ UserName : input.value});
          document.querySelector('.info').className = 'hide';
          document.querySelector('.input').className = 'hide';
          greetUser();
        }
      });
    }
});
