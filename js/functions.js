function strLenCheck(str, len) {
  return String(str).length <= len;
}

function palindromeCheck(str) {
  const clear_str = String(str).replaceAll(" ", "").toLowerCase();
  if (clear_str.length == 0) {
    return false;
  }
  for (i = 0; i < Math.round(clear_str.length / 2); i++) {
    if (clear_str.charAt(i) !== clear_str.substr(-i - 1, 1)) {
      return false;
    }
  }
  return true;
}

function recognizeNum(str) {
  const number_str = String(str).replace(/[^0-9]/g, "");
  return parseInt(number_str);
}

// Строка короче 20 символов
//console.log(strLenCheck("проверяемая строка", 20)); // true
// Длина строки ровно 18 символов
//console.log(strLenCheck("проверяемая строка", 18)); // true
// Строка длиннее 10 символов
//console.log(strLenCheck("проверяемая строка", 10)); // false
//-----------------
//console.log(palindromeCheck("Лёша на полке клопа нашёл "));
//---------------
//console.log(recognizeNum("2023 год")); // 2023
//console.log(recognizeNum("ECMAScript 2022")); // 2022
//console.log(recognizeNum("1 кефир, 0.5 батона")); // 105
//console.log(recognizeNum("агент 007")); // 7
//console.log(recognizeNum("а я томат")); // NaN
//console.log(recognizeNum(2023)); // 2023
//console.log(recognizeNum(-1)); // 2023
//console.log(recognizeNum(1.5)); // 2023
