'use strict';

window.onload = function () {
    // Замена кавычек
    replace();

    // Валидация формы
    document.querySelector('#send').onclick = function () {
        validate();
    };
};

function replace() {
    var text = document.querySelector('#text').textContent;

    // Шаблон замены кавычек
    var reg = /'\s|\s'/g;

    // Выделяем кавычки красным
    document.querySelector('#dist').innerHTML = text.replace(reg, '<b style=\'color: red\'>"</b>');
}

function validate() {
    // Коллекция input'ов и полей "ошибок"
    var input = document.querySelectorAll('input');
    var field = document.querySelectorAll('#form .error_form');

    // Каждый input по-отдельности
    var name = document.querySelector('input[name="user_name"]');
    var phone = document.querySelector('input[name="phone"]');
    var email = document.querySelector('input[name="email"]');

    // Шаблоны для проверки
    var validate_name = /^[а-яА-ЯёЁa-zA-Z\s]{2,20}$/i;
    var validate_phone = /\+7[0-9]{10}$/;
    var validate_email = /^[0-9a-z.\-]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

    // Сбрасываем красную рамку вокруг input'ов и подсказки
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            prop.style.border = 'none';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = field[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var err = _step2.value;

            err.style.display = 'none';
        }
        //----------------------------------------
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

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