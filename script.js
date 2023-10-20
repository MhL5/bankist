"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "mohammad hosein lashani",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
// 🏦🏦🏦🏦🏦🏦🏦🏦🏦

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``;
  //
  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //
  moves.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// calculating balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(
    (accumulator, value) => accumulator + value,
    0
  );
  labelBalance.textContent = `${acc.balance} €`;
};

//
const calcDisplaySummary = function (acc) {
  console.log(acc.movements);
  const income = acc.movements
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumIn.textContent = `${income}€`;
  //
  const outcome = acc.movements
    .filter((value) => value < 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  //
  // each deposit => 1.2% interest
  const interest = acc.movements
    .filter((value) => value > 0)
    .map((value) => (value * acc.interestRate) / 100)
    .filter((value) => value >= 1)
    .reduce((acc, value) => (acc += value), 0);
  labelSumInterest.textContent = `${interest}€`;
};

//
const createUsernames = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(` `)
      .map((value, _index, _array) => value[0])
      .join(``);
  });
};
createUsernames(accounts); // `stw`
console.log(account1.username);
//  update UI
const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // Preventing form from submitting
  e.preventDefault();
  //
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome massages
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = 1;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

// transfer feature
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  //
  const amount = Number(inputTransferAmount.value);
  // receiver account
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ``;
  // we need to store balance value to be able to use it here
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    console.log(`transfer valid`);
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(+amount);
    updateUI(currentAccount);
  }
});
// requesting loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  //
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((move) => move >= amount * 0.1)
  ) {
    // add movements
    currentAccount.movements.push(amount);
    //  update UI
    updateUI(currentAccount);

    console.log(`valid`);
  }
  inputLoanAmount.value = ``;
});
//  delete account feature
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(currentAccount);
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = 0;
    //
    console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = ``;
});

// sort
let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  //

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 3 big and important array method for data transformations
// these are methods that we use to create new arrays based on  transforming data from other arrays

// Map 🗺️
// filter
// reduce

// this lecture is a overview of them

// array map method 🗺️ 1️⃣
// we can use it to loop over arrays - its similar to forEach loop that we used before with the difference that map will create a new array based on original array
// takes an array loops over it and in each iteration it applies a call back function on the current array element
// we say that it maps the values of the original array into a new array thats why it called map
// its more useful than forEach because map will give us a new array

// array Filter method 2️⃣
// its used to filter for elements in the original array
// we can create a filter like this current > 2 and then only elements greater than 2 will make it into our new array made by filter method
// or in other word elements that which the condition is true will be included in the new array that filter method returns - other elements not included

// array Reduce method 3️⃣
// boils all array elements down to one single value
// example: adding all the elements of the array together like acc + current - ( [3,4,5,6] returns 18 )
// we can imagine this as a snowball it keeps bigger and bigger as it rolls down a hill
// its known as snowball effect and reduce is similar to that
// we say this whole process has now reduced the original array to one single value
// it returns us a return value - not an array

// Array map method
// as learned its another way to loop over array like forEach method - but UNLIKE forEach it will give us a new array
// it takes an array loop over it and applies a callback function on each iteration on the current element

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementUSD = movements.map(function (_mov) {
//   //  return mov * eurToUsd;
//   return `😎`;
// });

// console.log(movements); // Array(8) [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
// console.log(movementUSD); // Array(8) [ '😎', '😎', '😎', '😎', '😎', '😎', '😎', '😎' ]

// // lets simplify our callback function
// const movementUSD2 = movements.map((_mov) => `😎`);
// console.log(movementUSD2); // Array(8) [ '😎', '😎', '😎', '😎', '😎', '😎', '😎', '😎' ]

// // lets write it with for of loop too
// const movementsForOfLoop = [];
// for (const movement of movements) movementsForOfLoop.push(movement + `😀`);
// console.log(movementsForOfLoop); // Array(8) [ '200😀', '450😀', '-400😀', '3000😀', '-650😀', '-130😀', '70😀', '1300😀' ]

// // in modern javaScript functional programming is the way to go so the  map method is better than looping over an array and do it manually

// const movementsDescriptions = movements.map(
//   (movement, index, _array) =>
//     `movement ${index + 1}: You ${
//       movement > 0 ? `deposited` : `withdrew`
//     } ${Math.abs(movement)}`
// );

// console.log(movementsDescriptions);

// // difference between loop and map method

// // with loop we printed each line individually to console as we were looping - we can call this a side effect
// // in map method we returned each string from the callback and they got added into a new array and we logged the entire array into console - we did not create a side effect we made a new array

// // its important for functional programming - more details in later sections

// // Filter 🧻

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter((movement, index, array) => movement > 0); // Example: 😀 200 > 0 true | -400 > 0 false
// console.log(deposits); // [ 200, 450, 3000, 70, 1300 ]

// const deposits2 = [];
// for (const movement of movements) {
//   movement > 0 ? deposits2.push(movement) : console.log(`Not enough`);
// }
// console.log(deposits2); // [ 200, 450, 3000, 70, 1300 ]

// // Same result but with for of loop we can not do big chains of method and in modern javaScript functional programming is the way to go

// // withdraw
// const withdrawals = movements.filter(
//   (movement, _index, _array) => movement < 0
// );
// console.log(withdraw); // [ -400, -650, -130 ]

// Reduce Method ➖
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // accumulator is like a snow ball
// // const balance = movements.reduce(
// //   (accumulator, value, _index, _array) => accumulator + value,0
// // );

// const balance = movements.reduce(function (accumulator, value, index, _array) {
//   console.log(` ${index}: ${accumulator} `);
//   return accumulator + value;
// }, 0);
// // 0 means start counting from 0 or start adding from 0
// console.log(balance); // 3840

// let balance2 = 0;
// for (const movement of movements) {
//   balance2 += movement;
// }
// console.log(balance); // 3840

// // Maximum value
// const maxValue = movements.reduce(
//   (accumulator, value, index, array) =>
//     accumulator < value ? (accumulator = value) : accumulator,
//   movements[0]
// );
// console.log(maxValue); // 3000
// flat and flatMap method

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // [1,2,3,4,5,6,7,8]

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat()); // Array(6) [ [ 1, 2 ], 3, 4, [ 5, 6 ], 7, 8 ]
// // flat method only goes one lvl deep as default we can make it go deeper but defining the parameter
// console.log(arrDeep.flat(2)); // Array(8) [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// // example
// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements); // contain all the array of movements
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance); // 17840

// const overallBalance2 = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance2); // 17840

// // flatMap
// // its a map()+ flat() 😉
// // DIFFERENCE is flatMap() only goes one level deep
// const overallBalance3 = accounts.flatMap((acc) => acc.movements).reduce((acc, move) => acc + move, 0);
// console.log(overallBalance3); // 17840

// we need to use them when we have nested arrays and we need to work with them 😎

// how to programmatically create and fill arrays

// // so far we only made arrays like this
// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(new Array(1, 2, 3, 4, 5, 7, 8));

// // easiest way to create arrays programmatically

// // empty array + fill method
// // weird behavior of new Array() with one arguments
// const x = new Array(4);
// console.log(x); // [ undefined, undefined, undefined, undefined ]
// // it will create a new array with 7 empty elements not [4]
// // whenever we pass in only one arguments it will create a new empty arguments with that length

// // we cant use x method for anything
// console.log(x.map(() => 5)); // [ undefined, undefined, undefined, undefined ] noting happened
// // fill method
// console.log(x.fill(1, 1, 3)); // [ undefined, 1, 1, undefined ] 🤔 we can define a start and end variable like 1,3
// console.log(x.fill(1)); // [1,1,1,1]

// //
// // it doesn't have to be an empty array
// // it will mutate the original array
// arr.fill(23, 2, 6);
// console.log(arr); // Array(7) [ 1, 2, 3, 4, 23, 23, 8 ]

// // // /// /// /// /// /// // //
// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y); // Array(7) [ 1, 1, 1, 1, 1, 1, 1 ]
// // this is way better than using new array and fill method
// const z = Array.from({ length: 7 }, (_curr, i) => i + 1);
// console.log(z); // Array(7) [ 1, 1, 1, 1, 1, 1, 1 ]

// //  we can create array from other things as the name says
// // example

// labelBalance.addEventListener("click", function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll(`.movements__value`),
//     (el) => Number(el.textContent.replace(`€`, ``))
//   );
//   console.log(movementsUI);
//   // we can do the same with spread operator but then we have to do the mapping ourself
//   const movementsUI2 = [...document.querySelectorAll(`.movements__value`)];
//   console.log(movementsUI2);
// });

// // sorting array sort()

// const owners = [`jonas`, `zach`, `adam`, `martha`];
// console.log(owners.sort());

// array practice 🎯

// Exercise 1️⃣
const bankDepositSum = accounts.map((acc) => acc.movements).flat(); // same result but we can use flat(3)
const bankDepositSum2 = accounts.flatMap((acc) => acc.movements); // same result

console.log(bankDepositSum2);

const bankDepositSum3 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0); // same result
console.log(bankDepositSum3); // 25180

// Exercise 2️⃣
// i want to count how many deposits there have been in the bank with at least 100$

// const numDeposit1000 = accounts.flatMap((acc) => acc.movements).filter((mov) => mov >= 1000).length;
const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, move) => (move >= 1000 ? ++acc : acc), 0);

console.log(numDeposit1000); // 6

// ++ operator prefix - its different than a++ - check the example above for details
let a = 10;
console.log(++a); // 11

// Exercise 3️⃣
// create an object that contains some of the deposits and of the withdrawals

const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (cur += sums.deposits) : (cur += sums.withdrawals);
      sums[cur > 0 ? `deposits` : `withdrawals`] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals); // 25180 -7340

// Exercise 4️⃣
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalizeWord = (str) => str[0].toUpperCase() + str.slice(1);
  //
  const exceptions = [`and`, `a`, `an`, `the`, `but`, `or`, `on`, `in`, `with`];
  //
  const titleCase = title
    .toLowerCase()
    .split(` `)
    .map((word) => (exceptions.includes(word) ? word : capitalizeWord(word)))
    .join(` `);
  return titleCase;
};
console.log(convertTitleCase(`this is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another title with an EXAMPLE`));

// challenge
