window.onload = function () {
    // Если поле пустое то используется эффект "bounce"
    document.querySelector('#send').onclick = function () {
        event.preventDefault();

        var user_name = $('#user_name');
        var user_phone = $('#user_phone');
        var user_email = $('#user_email');
        var user_date = $('#date');

        if (user_name.val() === '') {
            user_name.effect("bounce", 1000);
        }

        if (user_phone.val() === '') {
            user_phone.effect("bounce", 1000);
        }

        if (user_email.val() === '') {
            user_email.effect("bounce", 1000);
        }

        if (user_date.val() === '') {
            user_date.effect("bounce", 1000);
        }
    };

    // Календарь для ввода даты рождения
    $('#date').datepicker({
        firstDay: 1,
        changeYear: true,
        yearRange:'1950:2018',
        dateFormat: "dd.mm.yy",
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ['Январь','Февряль','Март','Апрель','Май','Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    });

    // Перетаскиваемые элементы (товары)
    $('.product').draggable({
        opacity: 0.5,
        scroll: true,
        helper: "clone",
        distance: 20
    });

    // Принимающий блок (корзина)
    $('#product_block').droppable({
        accept: function (el) {
            return el.hasClass("product");
        },
        tolerance: "touch",
        drop: function(event, ui) {
            // Кладём в карзину новый продукт
            var $product = $(ui)[0].draggable;
            var $price = $($($product).find('.price')).find('span').text();
            var $name = $($product).find('.header_product').text();
            $(this)
                .append($('<div />').addClass('basket_prod')
                    .append(
                        $('<span />').text('Название: ' + $name),
                        $('<span />').text('Цена: ' + $price + '$')
                    ));

            // Считаем общую стоимость
            var contentAmount = parseInt($('#amount').find('span').text());
            var amount = contentAmount + parseInt($price);
            document.querySelector('#amount span').innerHTML = amount;
        }
    });

    // Диалоговое окно (хотел сделать подобие чата, но не успел)
    $('#chat').on('click', function () {
        $('.contact').append($('<div />', {title: "Chat"}).addClass('chat'));
        $('.chat').dialog();
    });
};


