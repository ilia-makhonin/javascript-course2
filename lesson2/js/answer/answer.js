'use strict';
document.querySelector('#answer').onclick = function () {
    let xhr = new XMLHttpRequest();

    // Рандомный выбор ответа
    let random = Math.random() > .5 ? 'js/answer/answer1.json' : 'js/answer/answer2.json';

    xhr.open('GET', random, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let result = JSON.parse(xhr.responseText);
            let answer = document.querySelector('#result');
            let par = document.querySelector('#result p');

            if (result.result === 'success') {
                // При "хорошем" ответе
                answer.style.background = 'green';
                par.innerHTML = 'SUCCESS!'
                //...
            } else if (result.result === 'error') {
                // При ошибке
                answer.style.background = 'red';
                par.innerHTML = 'ERROR!'
                //...
            }
            console.log(result);
        }
    };
};




