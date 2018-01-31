const clockDiv = document.querySelector('.clock');
function setTime() {
  const date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  clockDiv.textContent = `${hours}:${mins}`;
}

setInterval(setTime, 1000);
