'use strict';

window.onload = function () {
    // Замена кавычек
    replace();

    // Валидация формы
    document.querySelector('#send').onclick = function () {
        validate();
    }
};

function replace() {
    let text = document.querySelector('#text').textContent;

    // Шаблон замены кавычек
    let reg = /'\s|\s'/g;

    // Выделяем кавычки красным
    document.querySelector('#dist').innerHTML = text.replace(reg, '<b style=\'color: red\'>"</b>');
}

function validate() {
    // Коллекция input'ов и полей "ошибок"
    let input = document.querySelectorAll('input');
    let field = document.querySelectorAll('#form .error_form');

    // Каждый input по-отдельности
    let name = document.querySelector('input[name="user_name"]');
    let phone = document.querySelector('input[name="phone"]');
    let email = document.querySelector('input[name="email"]');

    // Шаблоны для проверки
    let validate_name = /^[а-яА-ЯёЁa-zA-Z\s]{2,20}$/i;
    let validate_phone = /\+7[0-9]{10}$/;
    let validate_email = /^[0-9a-z.\-]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

    // Сбрасываем красную рамку вокруг input'ов и подсказки
    for (let prop of input) {
        prop.style.border = 'none';
    }
    for (let err of field) {
        err.style.display = 'none';
    }
    //----------------------------------------
    if (!validate_name.test(name.value)) {
        testVal(name, field[0]);
    }
    if (!validate_phone.test(phone.value)) {
        testVal(phone, field[1]);
    }
    if (!validate_email.test(email.value)) {
        testVal(email, field[2]);
    }
    //----------------------------------------
    if (validate_name.test(name.value) && validate_phone.test(phone.value) && validate_email.test(email.value)) {

        // Отправка данных на сервер при условии, что всё валидно

    }
}

function testVal(cell, error_field) {
    // Делаем красную рамку вокруг неправильно заполненного поля
    cell.style.border = '1px solid red';
    // Отображаем подсказку
    error_field.style.display = 'block';
    event.preventDefault();
}