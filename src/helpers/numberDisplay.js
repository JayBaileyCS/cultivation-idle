const ONE_THOUSAND = 1000;

const SUFFIXES = ["K", "M", "B", "T"];

export function displayNumber(number, integerOnly) {
  if (number < ONE_THOUSAND) {
    return integerOnly ? Math.floor(number) : displayNumberWithDecimals(number);
  }
  return displayNumberWithSuffix(number);
}

function displayNumberWithSuffix(number) {
  let numberLength = Math.floor(number).toString().length;
  let suffixIndex = Math.floor((numberLength - 4) / 3);
  while (number >= 1000) {
    number = number / 1000;
  }
  return `${displayNumberWithDecimals(number)}${SUFFIXES[suffixIndex]}`;
}

function displayNumberWithDecimals(number) {
  return number.toFixed(3 - Math.floor(number).toString().length);
}
