function Basket(id) {
    this.id = id;
    this.countGoods = 0; // Количество товаров в корзине
    this.amount = 0; // Общая стоимость товаров
    this.basketItems = []; // Товары, которые находятся в корзине

    this.getBasket();
}

/**
 * Отрисовка корзины
 * @param root - jQuety элемент
 */
Basket.prototype.render = function (root) {
    var basketDiv = $('<div />',{
        id:this.id,
        text:'Корзина'
    });

    var basketItemsDiv = $('<div />',{
        id:this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

/**
 * Получение товаров с сервера (из JSON файла)
 */
Basket.prototype.getBasket = function () {
    var appendId = '#'+this.id+'_items';

    // Способ 1
    // var self = this;

    $.get({
        url:'./basket.json',
        dataType:'json',
        context:this, // Способ 2
        success:function (data) {
            // console.log(this);
            var basketData = $('<div />',{
                id:'basket_data'
            });
            this.countGoods = data.basket.length;
            this.amount = data.amount;

            // Вывод информации в DOM
            basketData.appendTo(appendId);

            // Перерисовка корзины
            this.refresh();
        },
        error:function (error) {
            console.log('error',error)
        }
    })
};

/**
 * Функция добавления товара в корзину
 * @param idProduct - id товара
 * @param price - цена товара
 */
Basket.prototype.add = function (idProduct, price) {
    var basketItem = {
        "id_product":idProduct,
        "price":price
    };

    this.countGoods++;
    this.amount += price;
    this.basketItems.push(basketItem);

    // Перерисовка корзины
    this.refresh();
};

Basket.prototype.remove = function (idProduct, price) {
    if (this.basketItems.length) {
        for (var i = 0; i < this.basketItems.length; i++) {
            if (this.basketItems[i].id_product == idProduct) {
                this.basketItems.splice(i, 1);
                this.countGoods--;
                this.amount -= price;
                this.refresh();
                break;
            }
        }
    }
};

/**
 * Перерисовка корзины
 */
Basket.prototype.refresh = function () {
    var basketDataDiv = $('#basket_data');
    basketDataDiv.empty();
    basketDataDiv.append('<p>Всего товаров: '+this.countGoods+'</p>');
    basketDataDiv.append('<p>Сумма: '+this.amount+'</p>');
};

// -----------------------------------------------------------------------------------------------

$(document).ready(function () {
    var basket = new Basket('basket');
    basket.render('#basket_wrapper');

    $('.good_bue').on('click',function () {
        var idProduct = parseInt($(this).attr('data-id'));
        var price = parseInt($(this).parent().find('.product-price').text());
        basket.add(idProduct,price);
        console.log(basket);
    });

    $('.delete_product').on('click', function () {
        var idProduct = parseInt($(this).parent().find('.good_bue').attr('data-id'));
        var price = parseInt($(this).parent().find('.product-price').text());
        basket.remove(idProduct, price);
        console.log(basket);
    });
});