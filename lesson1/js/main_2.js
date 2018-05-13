'use strict';

class Menu {
    constructor(myId, myClass, myItem) {
        this.id = myId;
        this.className = myClass;
        this.items = myItem;
        this.htmlCode = '';
    }

    render(count) {
        let result = '<ul class="' + this.className + '" id="' + this.id + '">';

        if (this.items[count] instanceof MenuItem){
            result += this.items[count].subRender();
        }

        result +='</ul>';

        this.htmlCode = result;
        return result;
    }
    
    remove() {
        let button = document.createElement('button');
        button.innerHTML = 'Delete container';
        document.body.appendChild(button);

        button.onclick = function () {
            document.body.removeChild(document.querySelector('#m2'));
            document.body.removeChild(this);
        };
    }
}

class MenuItem {
    constructor(href, title, subItems) {
        this.href = href;
        this.title = title;
        this.subItems = subItems;
    }

    render() {
        return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
    }

    subRender() {
        let result = '';

        for (let i = 0; i < this.subItems.length; i++){
            if (this.subItems[i] instanceof SubItems){
                result += this.subItems[i].cellRender();
            }
        }

        return result;
    }
}

class SubItems {
    constructor(href, title) {
        this.href = href;
        this.title = title;
    }

    cellRender() {
        return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
    }
}

class SubMenu extends Menu {
    constructor(myId, myClass, myItem) {
        super(myId, myClass, myItem);
    }

    render() {
        let result = '<ul class="' + this.className + '" id="' + this.id + '">';

        for (let i = 0; i < this.items.length; i++){
            if (this.items[i] instanceof MenuItem){
                result += this.items[i].render() + super.render(i);
            }
        }
        result +='</ul>';

        this.htmlCode = result;
        return result;
    }
}


let subMenu = new SubMenu('My_ID', 'My_Class', [
        new MenuItem('/','Главная', [
            new SubItems('/c', 'Компания'),
            new SubItems('/t', 'Команда')
        ]),
        new MenuItem('/about','О нас', [
            new SubItems('/m', 'Как нас найти'),
            new SubItems('h', 'Наша история')
        ]),
        new MenuItem('/contacts','Контакты', [
            new SubItems('/ph', 'Телефоны'),
            new SubItems('/oth', 'Другие способы связи')
        ])
    ]);

window.onload = function () {
    document.querySelector('#m2').innerHTML = subMenu.render();
    subMenu.remove();
};