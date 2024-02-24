/* eslint-disable no-console */
function strLenCheck(str, len) {
  return String(str).length <= len;
}

function palindromeCheck(str) {
  const clearStr = String(str).replaceAll(' ', '').toLowerCase();
  if (clearStr.length === 0) {
    return false;
  }
  for (let i = 0; i < Math.round(clearStr.length / 2); i++) {
    if (clearStr.charAt(i) !== clearStr.substr(-i - 1, 1)) {
      return false;
    }
  }
  return true;
}

function recognizeNum(str) {
  const numberStr = String(str).replace(/[^0-9]/g, '');
  return parseInt(numberStr, 10);
}

// Строка короче 20 символов
console.debug(strLenCheck('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.debug(strLenCheck('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.debug(strLenCheck('проверяемая строка', 10)); // false
//-----------------
console.debug(palindromeCheck('Лёша на полке клопа нашёл '));
//---------------
console.debug(recognizeNum('2023 год')); // 2023
console.debug(recognizeNum('ECMAScript 2022')); // 2022
console.debug(recognizeNum('1 кефир, 0.5 батона')); // 105
console.debug(recognizeNum('агент 007')); // 7
console.debug(recognizeNum('а я томат')); // NaN
console.debug(recognizeNum(2023)); // 2023
console.debug(recognizeNum(-1)); // 2023
console.debug(recognizeNum(1.5)); // 2023


function timeToDateTime(time){
  const dateTime = new Date();
  const [hh, mi] = String(time).split(':');
  return new Date(dateTime.setHours(+hh + 7, +mi, 0, 0));
}

function validMeetTime(
  startWorkTime, finishWorkTime,
  startMeetTime, duration
) {
  const startWorkDateTime = timeToDateTime(startWorkTime);
  const finishWorkDateTime = timeToDateTime(finishWorkTime);
  const startMeetDateTime = timeToDateTime(startMeetTime);
  const finishMeetDateTime = new Date(startMeetDateTime);
  finishMeetDateTime.setTime(finishMeetDateTime.getTime() + (duration * 60 * 1000));

  if (startMeetDateTime >= startWorkDateTime
    && startMeetDateTime <= finishWorkDateTime
    && finishMeetDateTime >= startWorkDateTime
    && finishMeetDateTime <= finishWorkDateTime
  ) {
    return true;
  }
  return false;
}
console.debug(validMeetTime('08:00', '17:30', '14:00', 90));//true

/*
console.log(validMeetTime('08:00', '17:30', '14:00', 90));//true
console.log(validMeetTime('8:0', '10:0', '8:0', 120)); // true
console.log(validMeetTime('08:00', '14:30', '14:00', 90)); // false
console.log(validMeetTime('14:00', '17:30', '08:0', 90)); // false
console.log(validMeetTime('8:00', '17:30', '08:00', 900)); // false
*/
