//------------------------ Третье задание ----------------------------------

function Hamburger (size, stuffing) {
    this.size = size[0];
    this.stuffing = stuffing[0];
    this.topping = [];
    this.prise = size[1] + stuffing[1];
    this.calories = size[2] + stuffing[2];

}

Hamburger.SIZE_SMALL = ['Маленький', 50, 20];
Hamburger.SIZE_LARGE = ['Большой', 100, 40];
Hamburger.STUFFING_CHEESE = ['Сыр', 10, 20];
Hamburger.STUFFING_SALAD = ['Салат', 20, 5];
Hamburger.STUFFING_POTATO = ['Картофель', 15, 10];
Hamburger.TOPPING_MAYO = ['Майонез', 20, 5];
Hamburger.TOPPING_SPICE = ['Приправа', 15, 0];

Hamburger.prototype.addTopping = function (topping) {
    for (var i = 0; i < this.topping.length; i++) {
        if (this.topping[i] === topping[0]) return 'Error';
    }
    this.topping.push(topping[0]);
    this.prise += topping[1];
    this.calories += topping[2];
};

Hamburger.prototype.removeTopping = function (topping) {
    for (var i = 0; i < this.topping.length; i++) {
        if (this.topping[i] === topping[0]) {
            this.topping.splice(i, 1);
            this.prise -= topping[1];
            this.calories -= topping[2];
        }
    }
    return 'Error';
};

Hamburger.prototype.getToppings = function () {
    return 'Добавки в гамбургере: ' + this.topping;
};

Hamburger.prototype.getSize = function () {
    return 'Гамбургер ' + this.size;
};

Hamburger.prototype.getStuffing = function () {
    return 'Начинка гамбургера: ' + this.stuffing;
};

Hamburger.prototype.calculatePrice = function () {
    return 'Цена гамбургера ' + this.prise + ' р.';
};

Hamburger.prototype.calculateCalories = function () {
    return 'Калорийность: ' + this.calories;
};

    /*
     * Представляет информацию об ошибке в ходе работы с гамбургером.
     * Подробности хранятся в свойстве message.
     * @constructor
     */

function HamburgerException() {
    //-------------------------
}


(function () {

    var size = prompt('Большой или маленикий гамбургер?', 'большой');
    var stuffing = prompt('С сыром, салатом или картофелем?', 'сыр');
    size.toLowerCase();
    stuffing.toLowerCase();

    if (size === 'большой') {
        size = Hamburger.SIZE_LARGE;
    } else {
        size = Hamburger.SIZE_SMALL;
    }

    if (stuffing === 'сыр') {
        stuffing = Hamburger.STUFFING_CHEESE;
    } else if (stuffing === 'салат') {
        stuffing = Hamburger.STUFFING_SALAD;
    } else {
        stuffing = Hamburger.STUFFING_POTATO;
    }

    var hamburger = new Hamburger(size, stuffing);


    alert(hamburger.getToppings());
    alert(hamburger.getSize());
    alert(hamburger.getStuffing());
    alert(hamburger.calculateCalories());
    alert(hamburger.calculatePrice());
})();