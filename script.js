'use strict';

const autorizeButton = document.querySelector('.autorize');
const registerButton = document.querySelector('.register');
const regexRU = /^[?!,.а-яА-ЯёЁ]/;
const regexEN = /^[a-zA-Z0-9._]/;
const regexPassword = /^[a-zA-Z0-9]/;
const usersList = document.querySelector('.users-list');
const helloUser = document.querySelector('.hello-user');

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
};

let users = [];

function render() {
  let usersLocalStorage = localStorage.getItem('users') !== null ?  JSON.parse(localStorage.getItem('users')) : [];
  usersList.textContent = '';
  usersLocalStorage.forEach(function(item) {
    let userElement = 
    `<li class="user">Имя: 
    ${item.firstName}, 
    фамилия: 
    ${item.lastName}, 
    зарегистрирован: 
    ${item.regDate},
    <button class="delete-user">Удалить пользователя</button>
    </li>`;
    usersList.insertAdjacentHTML('beforeend', userElement);
  });
}

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
    'firstName' : userArray[0],
    'lastName' : userArray[1],
    'login' : login,
    'password' : password,
    'regDate' : 
    `${regDate.slice(0,2)} ${months[regDate.slice(4,5)]} ${regDate.slice(6)} г., ${regTime}`
  };
  if (localStorage.users) {
    let localStorageUsers = JSON.parse(localStorage.users);
    localStorageUsers.push(newUser);
    localStorage.users = JSON.stringify(localStorageUsers);
  } else {
    let users = [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
  render();
});

usersList.addEventListener('DOMNodeInserted', () => {
  const usersElements = document.querySelectorAll('.user');
  usersElements.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      const target = e.target;
      if (target.className === 'delete-user') {
        let usersLocalStorage = JSON.parse(localStorage.getItem('users'));
        usersLocalStorage.splice(i,1);
        localStorage.users = JSON.stringify(usersLocalStorage);
        render();
      }
    });
  });

});

autorizeButton.addEventListener('click', () => {
  let login;
  let password;
  do {
    login = prompt('Введите логин');
  } while (!login.match(regexEN) || login === null);
  do {
    password = prompt('Введите пароль');
  } while (!password.match(regexPassword) || password === null);
  let localStorageUsers = JSON.parse(localStorage.users);
  localStorageUsers.forEach(item => {
    if (item.login === login && item.password === password) {
      helloUser.textContent = `Привет ${item.firstName}`;
    } else {
      alert('Пользователь не найден');
    }
  });
});

render();

