export const utilService = {
  makeId,
  getRandomIntInclusive,
  formatDate,
  trimText,
  getSign,
  debounce,
  getRandCurrencyCode,
};

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function formatDate(timestamp) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // prettier-ignore
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December'];
  const date = new Date(timestamp);
  const time = _formatTime(date.getHours()) + ':' + _formatTime(date.getMinutes());
  const currTimestamp = Date.now();
  const currDate = new Date(currTimestamp);
  const day = 1000 * 60 * 60 * 24;
  if (currTimestamp - timestamp < day) return 'Today ' + time;
  if (currTimestamp - timestamp < day * 2) return 'Yesterday ' + time;
  if (currTimestamp - timestamp < day * 7) return days[date.getDay()];
  if (currDate.getFullYear() !== date.getFullYear())
    return months[date.getMonth()].slice(0, 3) + ' ' + date.getFullYear();
  return date.getDate() + ' ' + months[date.getMonth()].slice(0, 3);
}

function trimText(text, length) {
  return text.length < length ? text : text.substring(0, length - 4) + '...';
}

function _formatTime(time) {
  return time < 10 ? '0' + time : time;
}

function getSign(currencyCode) {
  let sign = '';
  switch (currencyCode) {
    case 'EUR':
      sign = '€';
      break;
    case 'USD':
      sign = '$';
      break;
    case 'ILS':
      sign = '₪';
      break;
  }
  return sign;
}

function getRandCurrencyCode() {
  const randNum = Math.random();
  if (randNum <= 0.33) return 'EUR';
  else if (randNum <= 0.66) return 'USD';
  else return 'ILS';
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
