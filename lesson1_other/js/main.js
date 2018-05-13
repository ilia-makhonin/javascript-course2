class Hamburger {
    constructor(item) {
        this.size = item[0];
        this.filling = item[1];
        this.topping = item[2];

        this._price = 0;
        this._calories = 0;
    }
	
	// Расчитываем цену и количество калорий

    calculation() {
        this._price = this.size.price + this.filling.price + this.topping.price;
        this._calories = this.size.calories + this.filling.calories + this.topping.calories;
    }

    get priceSum() {
        return this._price;
    }

    get caloriesSum() {
        return this._calories;
    }
}

class HamConstructor {
	// Класс, который создаёт базовые свойства гамбургера (размер, начинки и т.д.)
    constructor(size, price, calories) {
        this.size = size;
        this.price = price;
        this.calories = calories;
    }
}

function generation(hamburgerSize, hamburgerFilling, hamburgerTopping) {
	// Создаём все возможные свойства гамургера
    const big = new HamConstructor('Большой', 100, 40);
    const small = new HamConstructor('Маленький', 50, 20);
    const cheese = new HamConstructor('Сыр', 10, 20);
    const salad = new HamConstructor('Салат', 20, 5);
    const potatoes = new HamConstructor('картофель', 15, 10);
    const mayonnaise = new HamConstructor('Майонез', 20, 5);
    const seasoning = new HamConstructor('Приправа', 15, 0);

    let param = [];
	
	// Создаём массив в зависимости от того, что выбрал пользователь
    param[0] = (hamburgerSize === 'big') ? big : small;
    param[1] = (hamburgerFilling === 'cheese') ? cheese : (hamburgerFilling === 'salad') ? salad : potatoes;
    param[2] = (hamburgerTopping === 'mayonnaise') ? mayonnaise : seasoning;

    return param;
}


//  Обработчик select'ов
function change(value) {
    let select = document.getElementById(value).options;
    let indexOption = select.selectedIndex;
    return select[indexOption].value;
}

window.onload = function () {
    document.querySelector('#send').onclick = function () {
		
		// Новый объект класс "Hamburger" с параметрами, которые выбрал пользователь
        let hamburger = new Hamburger(generation(
            change('size'),
            change('filling'),
            change('topping')
        ));

        hamburger.calculation();
		
		// Выводим цену и количество калорий
        document.querySelector('#price').innerHTML = `Цена: ${hamburger.priceSum} руб.`;
        document.querySelector('#calories').innerHTML = `Калории ${hamburger.caloriesSum} ккал.`;
    }
};