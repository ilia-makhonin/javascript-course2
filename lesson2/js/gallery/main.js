'use strict';
let link = document.querySelectorAll('.link');
let xhr = new XMLHttpRequest();

document.querySelector('#glr').onclick = function () {
    document.querySelector('#table').style.display = 'block';

    xhr.open('GET', 'js/gallery/type.json', true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            // JSON набор ссылок
            let imgJson = JSON.parse(xhr.responseText);
            for (let i = 0; i < link.length; i++) {
                let img = document.createElement('img');
                // Генерируем миниатюры
                img.setAttribute('src', imgJson[0][i]);
                // Вешаем ссылки на полноразмерные картинки
                link[i].setAttribute('href', imgJson[1][i]);
                link[i].appendChild(img);
            }
        }
    };

    // Удаляем кнопку, что бы избежать ошибок
    document.querySelector('.gallery').removeChild(document.querySelector('#glr'));
};