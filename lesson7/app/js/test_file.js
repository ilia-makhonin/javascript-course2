"use strict";

console.log('Gulp работает');
console.log('---------- Тест ----------');

function rand() {
    var random = Math.round(Math.random() * 100);
    console.log(random);
}

rand();
rand();

document.querySelector('.logotype').onclick = function () {
    var block = document.createElement('div');
    block.className = 'bloc_element';
    block.innerText = 'Здесь находится краткое описание компании и т.д.';
    document.querySelector('.header').appendChild(block);

    setTimeout(function () {
        document.querySelector('.header').removeChild(document.querySelector('.bloc_element'));
    }, 1500);
};



