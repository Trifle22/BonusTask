'use strict';

let autorizeButton = document.querySelector('.autorize');
let registerButton = document.querySelector('.register');
let regexRU = /^[?!,.а-яА-ЯёЁ]/;
let regexEN = /^[a-zA-Z0-9._]/;
let regexPassword = /^[a-zA-Z0-9]/;
let months = {
  1: 'января',
  2: 'Февраля',
  3: 'Марта',
  4: 'Апреля',
  5: 'Мая',
  6: 'Июня',
  7: 'Июля',
  8: 'Августа',
  9: 'Сентября',
  0: 'Октября',
  11: 'Ноября',
  12: 'Декабря',
}

let users = [];

registerButton.addEventListener('click', function() {
  let FirstNameAndLastName, login, password, regDate, regTime;
  do {
    FirstNameAndLastName = prompt('Введите имя и фамилию пользователя через пробел');
  } while (
    FirstNameAndLastName === null ||
    !FirstNameAndLastName.match(regexRU) || 
    FirstNameAndLastName.match(/ /g).length !== 1
  );
  do {
    login = prompt('Введите логин');
  } while (
  !login.match(regexEN) ||
  login === null);
  do {
    password = prompt('Введите пароль');
  }
  while (
  !password.match(regexPassword) ||
  password === null);
  let userArray = FirstNameAndLastName.split(' ');
  regDate = new Date().toLocaleDateString();
  regTime = new Date().toLocaleTimeString();
  let newUser = {
    'fistName' : userArray[0],
    'lastName' : userArray[1],
    'login' : login,
    'password' : password,
    'regDate' : `${regDate.slice(0,2)} ${months[regDate.slice(3,4)]} ${regDate.slice(6)} г., ${regTime}`
  };
  users.push(newUser);
});