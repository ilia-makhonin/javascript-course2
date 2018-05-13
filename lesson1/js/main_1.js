//------------------------- Первое задание ----------------------------

function Menu(myId, myClass, myItem) {
    this.id = myId;
    this.className = myClass;
    this.items = myItem;
    this.htmlCode = ''
}

Menu.prototype.render = function () {
    var result = '<ul class="' + this.className + '" id="' + this.id + '">';

    for (var i = 0; i < this.items.length; i++){
        if (this.items[i] instanceof MenuItem){
            result += this.items[i].render();
        }
    }
    result +='</ul>';
    this.htmlCode = result;
    return result;
};


// Первое задание. Удаление всего меню сразу или его пунктов по-отдельности

Menu.prototype.remove = function () {
    // Удаляет один элемент меню (один элемент списка ul)
    // Создаём кнопку, устанавливаем ей атрибуты, задаём стили

    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Delete section');
    submit.style.margin = '0 16px';
    document.body.appendChild(submit);

    // Добавляем событие

    submit.onclick = function () {
        var ul = document.querySelector('ul');

        // Проверяем, есть ли её "пункты меню", и если есть удаляем один

        if (ul.querySelectorAll('li').length !== 0) {
            ul.removeChild(document.querySelector('li'));
        }
    };

    // Удаляет контейнер div полностью
    // Создаём кнопку 'Delete container'

    var button = document.createElement('button');
    button.innerHTML = 'Delete container';
    document.body.appendChild(button);

    // Вешаем на неё событие

    button.onclick = function () {
        document.body.removeChild(document.querySelector('#m1'));

        // Убираем кнопку, которая удаляет пункты меню
        document.body.removeChild(document.querySelector('input'));
        document.body.removeChild(document.querySelector('button'));
    };
};

function MenuItem(href, title) {
    this.href = href;
    this.title = title;
}

MenuItem.prototype.render = function () {
    return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
};

var menu1 = new Menu('my','my',[
    new MenuItem('/','Главная'),
    new MenuItem('/about','О нас'),
    new MenuItem('/contacts','Контакты'),
//            new Menu('my','my',[])
]);

window.onload = function () {
    document.querySelector('#m1').innerHTML = menu1.render();
    menu1.remove();
};