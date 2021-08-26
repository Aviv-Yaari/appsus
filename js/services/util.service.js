export const utilService = {
  makeId,
  getRandomIntInclusive,
  formatDate,
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
  if (currTimestamp - timestamp < day * 8) return days[date.getDay()];
  if (currDate.getFullYear() !== date.getFullYear())
    return months[date.getMonth()] + ' ' + date.getFullYear();
  return date.getDate() + ' ' + months[date.getMonth()];
}

function _formatTime(time) {
  return time < 10 ? '0' + time : time;
}
