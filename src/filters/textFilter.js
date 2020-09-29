export default function (text, amount) {
  const amountStr = '' + amount;
  if (amountStr[amountStr.length - 2] == 1 || amountStr[amountStr.length - 1] == 0) {
    return text + 'ов';
  } else if (amountStr[amountStr.length - 1] == 1) {
    return text;
  } else if (amountStr[amountStr.length - 1] >= 2 && amountStr[amountStr.length - 1] <= 4) {
    return text + 'а';
  } else {
    return text + 'ов';
  }
}
