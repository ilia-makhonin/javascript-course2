'use strict';
class Menu {
    constructor(myId, myClass, myItem) {
        this.id = myId;
        this.className = myClass;
        this.items = myItem;
        this.htmlCode = ''
    }

    render(ulClass) {   // Аргумент - название класса для вложенных списков
        let result = '<ul class="' + this.className + '" id="' + this.id + '">';

        // Генерируем первый уровень меню
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem) {
                result += this.items[i].render(ulClass);
            }
        }

        result += '</ul>';
        this.htmlCode = result;
        return result;
    }
}

class MenuItem {
    constructor(href, title, item) {
        this.href = href;
        this.title = title;
        this.item = item;
    }

    render(subClass) {
        let result = `<li><a href="${this.href}">${this.title}</a>`;

        // Генерируем второй уровень меню, если переданы соответствующие аргументы
        if (this.item) {
            result += `<ul class="${subClass}">`;
            for (let i = 0; i < this.item.length; i++) {
                result += this.item[i].render();
            }
            result += `</ul></li>`;
        } else {
            result += `</li>`;
        }

        return result;
    }
}

// Класс для создания элементов подменю
class SubItem {
    constructor(href, title) {
        this.href = href;
        this.title = title;
    }
    render() {
        return `<li><a href="${this.href}">${this.title}</a></li>`;
    }
}

window.onload = function () {

    document.querySelector('#btn').addEventListener('click', function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/menu/menu.json', true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.status !== 200 || xhr.readyState !== 4) {
                return;
            }

            let myItems = JSON.parse(xhr.responseText);
            let items = [];

            function readyCell(value) {
                // Проверяем, есть ли в JSON нужные значения
                if ('subItem' in myItems[value]) {
                    let subItem = myItems[value]['subItem'];
                    let arrayItems = [];
                    for (let i = 0; i < subItem.length; i++) {
                        arrayItems.push(new SubItem(subItem[i].href,subItem[i].title));
                    }
                    return arrayItems;
                }

                // Если нет - возвращаем false
                return false;
            }

            for (let i = 0; i < myItems.length; i++) {
                items.push(new MenuItem(myItems[i].href,myItems[i].title, readyCell(i)));
            }

            let menu = new Menu('my_id','my_class',items);
            document.querySelector('#view').innerHTML = menu.render('my_sub_class');
        };

        // Удаляем кнопку, что бы избежать ошибок
        document.body.removeChild(document.querySelector('#btn'));
    });
};