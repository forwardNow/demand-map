export function getRandomInteger(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

export function getRandomMinusSign(num) {
  const absNum = Math.abs(num);
  return Math.random() > 0.5 ? absNum : -absNum;
}