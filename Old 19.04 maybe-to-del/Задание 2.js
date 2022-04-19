// console.log('Hello world!');
// /*
// Стиль lowerCamelCase
// let - пусть
// значение переменной =(оператор присвоения) значение другой переменной
// */

//  let myLifeStyle = "frilance",
//     myAge = "36",
//     mySun = "theBest"

// console.log(myLifeStyle);

// let userColorEyes
// userColorEyes = 'Цвет глаз пользовотелей';

// console.log(userColorEyes);
// let user;
// let userName;
// userName = 'вася';
// user = userName;
// console.log(user)

// let user = 'Vasia' ;

// const  BlocSize = 14 + 50;

// if (true) {
//     var size =15;
// }

// console.log(size);

// let username12;

// console.log(typeof username12)

// console.log(username12)

// типы данных
// undefined
// null
// Boolean
// Bigint
// String
// Symbol
// Object
// function

// ________________Операторы_______________
// Базовые (математические)
//  унарные
// бинарные

// Операторы сравнения
// Логическте операторы

//  РЕОКМЕНДАЦИИ для меня

// регулярные выражения

// для HTML accessability

// let willYouMarryMe = true;

// if (willYouMarryMe)
// {
//     console.log(':)1212)');
// }
// else
// {
//     console.log('sfssdf');
// }

//                                 trueOrFalse
// let trueOrFalse = 58 > 18;
// console.log(trueOrFalse);

//                                     Number
// let userAge = 20;
// let userHeight = 1.83;
// console.log(userAge)
// console.log(typeof userAge)
// console.log(userHeight)
// console.log(typeof userHeight )

//                                     Infinity
// let getInfinity = -50 / 0;
// console.log(getInfinity)
// console.log(typeof getInfinity)

//                                         Nan
// let getNon = 'фрилансер' / 10;
// console.log(getNon
// )
// console.log(typeof getNon)

//bigInt

// const bigInteger = 12391827398172498239576289346509237465098273450987203452n;
// console.log(typeof bigInteger)

//STRING

// let userAge = 36;
// let userInfo = `Возраст ${userAge}`;
// console.log(userInfo)

//OBJECTS

// let userInfo = {
//     name: 'ФРилансер по жизни',
//     age: 36
// }
// console.log(userInfo);
// console.log(typeof userInfo);

//Symbole

// let id = Symbol('id')
// console.log(typeof id);

// let userSize = "45" / "8"
// console.log(typeof userSize);

// console.log('558' > 22++)

// if console log

// let message = "Hi freeelancer!!!";

// if (2>1) {
//     console.log(message);
// }

// let message = "Hello Pawel!!";

// let number1 = 5;
// let number2 = 5

// if (number1 === number2) {
//     console.log(message);
// }

// let message = "Hello Pawel!!";
// if (2 < 1) console.log(message)

// else {console.log('not complite')}

// ВОПРОСЫ К АРСЕНИЮ
// что по поводу переменная++  и ++переменная

// ЦИКЛ FOR FOR FOR

// for (начало;условаие;шаг)  {
//     тут будет выполняться код

// }

// for (let num = 0; num < 5; num++) {
//     console.log(num);
// }

// let num = 0;
// for (; num < 5;) {
//     console.log(num)
// num++;
// }

// for (let num = 0; num < 5; num++) {
//     console.log(num);
//     if (num == 2) break;
// }

// console.log (`Всем спасибо все своюодны num = ${num}`);

// num = 0;

// for (; num < 5; num++) {

//     if (num == 2) continue;
//        console.log(num);
//     }

// firstFor: for (let num = 0; num < 2; num++)  {
// for (let size = 0;size <3; size++){
//         if (size ==2) {
//             break firstFor;
//         }
//         console.log(size+'пример с брейк и метками');
//     }
// }

// for (num = 1; num < 6; num++) {
//     console.log(num);
// }

// num = 0;
// while(num < 3 ) {
//     console.log(num);
//     num++
// }

// for (let num = 0; num < 3; num++) {

//     for (let size = 0; size < 3; size++) {
//         if (size == 1)
//         {break}
//             console.log(size);
//     }

// }

//                                 // функции

//  function имя(параметры) {
//     //  тело(код функции)
//  }

//  function showMessage() {
//      console.log('Cjj,otyb')
//  }

//  showMessage();

//  let userInfo = {
//      name: "Vasily",
//      age: 30,
//      "likes javascript": true,
//  };

//  console.log(userInfo);
//  console.log(userInfo.name);
//  console.log(userInfo.['likes javascript']);

// let admin = "Jon"
// let name = admin
// aler

// const sayHello = document.querySelectorAll("[data-say-hi]");
// const answer = sayHello.getAttribute;
// console.log(answer)

// const elemOne = document.querySelector('[data-say-hi]');
// const attr = elemOne.getAttribute('data-say-hi');
// console.log(attr);

// const answer2 = document.querySelector("ul")
// const answer3 = answer2.lastElementChild
// console.log(answer3.textContent)

// const aaa = document.getElementsByTagName("li")[1]
// console.log(aaa.textContent)

// const bbb = document.querySelectorAll('li')
// for (const elem of bbb) {
//     const elemContent = elem.textContent
//     if (elemContent === "321") {
//         console.log(elemContent)
//     }
// }
// console.log(bbb)

// const answer4 = document.getElementsByClassName("like")
// console.log(answer4)

// const elem = document.querySelectorAll('.like');
// console.log(elem);

// const list = document.querySelector("ul");
// list.insertAdjacentHTML(
//     "beforeend",
//     "<li>123</li>",

//     Дан массив целых чисел.

// Возвращает массив, где первый элемент — это количество положительных чисел, а второй элемент — сумма отрицательных чисел. 0 не является ни положительным, ни отрицательным.

// Если вход представляет собой пустой массив или имеет значение null, верните пустой массив.

// Пример
// Для ввода [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15] вы должны вернуть [10, -65].
// )

const mainForm = document.forms.main;
const fname = mainForm.fname;
const lname = mainForm.lname;
const deliverySelect = mainForm.delivery;
const checkBox = mainForm.rules;
const btn = mainForm.btn;
const contact = mainForm.contact;

mainForm.addEventListener("submit", function (event) {
  if (checkBox.checked === false) {
    alert("Поставь галочку а то не получишь 1 000 000 000");
    btn.disabled = false;
  } else {
    console.log("Имя: ", fname.value);
    console.log("Фамилия: ", lname.value);
    console.log("Способ связи", contact.value);
    console.log("Пункт", deliverySelect.value);
  }
});

let a = [1, 2, 3, 4, 5, -11, -12, -14 - 100];
// let c = a.filter(function(i,) {
//     return  (i>0);
// })

// console.log(c)s

// let c = a.reduce((sum,i) {
//     return sum + i} 0)
                                                Задача номер 2
const users = [
  {
    name: "Pasha",
    age: 34,
    salary: 100000,
    currency: "£",
  },
  { name: "Ars", age: 40, salary: 1000000, currency: "BTC" },
];

const obj = users[0];
console.log(users.keys);

const wrapper = document.createElement("div");

const main = document.getElementById("forExample");

for (let i = 0; i < users.length; i++) {
  const row = document.createElement("div");
  row.className = 'row'
  const name = document.createElement("div");
  name.append(users[i].name);
  const age = document.createElement("div");
  age.append(users[i].age);
  const salary = document.createElement("div");
  salary.append(`${users[i].salary} ${users[i].currency}`);
  row.append(name);
  row.append(age);
  row.append(salary);
  wrapper.append(row);
}
main.append(wrapper)


// console.log(users.length)
// console.log(users[0])
// const forExample = document.getElementById('forExample');
// var newArr = Array.from(users)
// newArr.toString
// console.log(newArr)

// for (let i = 0; i <= users.length - 1; i++) {
//     users[i].toString;
// 	console.log(users[i]);
//     console.log(typeof(users[1]))
// }

// forExample.insertAdjacentHTML('afterend', '<div id="ctwo">two</div>');

//     Pasha | 34 | 100000 £
// Ars | 40 | 1000000 BTC
// users.map(({id, age, group}) => `\n${id} ${age} ${group}`).join('')
