/*
Write a program that loops over the numbers 1-105 (inclusive). For each number it should:
* Print 'Veni' if divisible by 3
* 'Vedi' if divisble by 5 && 'Vici' if divisible by 7

else print the number itself
e.g:
2 --> 2
3 --> Veni
21 --> VeniVici

 */

function printVeni(n) {
  let str = "";

  if (n % 3 === 0) {
    str = str + "Veni";
  }

  if (n % 5 === 0) {
    str = str + "Vedi";
  }

  if (n % 7 === 0) {
    str = str + "Vici";
  }

  return str;
}

for (let i = 1; i <= 105; i++) {
  console.log(printVeni(i), i);
}
