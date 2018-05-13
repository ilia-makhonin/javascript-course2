'use strict';

// Первое задание
$('#tabs_select .tab').on('click', function () {
    // Проверяем: активна ли вкладка
    if (!$(this).hasClass('active')) {
        // Если нет, то удаляем стили у старой и добавляем их новую
        $('#tabs_select .active').removeClass('active');
        $(this).addClass('active');
        // Открываем соответствующий блок с контентом, а старый скрываем
        $('#tabs_content .tab_show').removeClass('tab_show');
        $($('#tabs_content').children('.tab_content')[$(this).index()]).addClass('tab_show');
    }
});

// Аккордеон
$('#accordeon .accordeon_header').on('click', function () {
    $('#accordeon .accordeon_body').not($(this).next()).slideUp('slow');
    $(this).next().slideToggle('slow');
});

// Второе задание
$.ajax({
    // Создаём и отправляем ajax-запрос
    url: "./city.json",
    dataType: "json",
    async: true,

    success: function (data) {
        // Генерируем блок select в пункты вставляем города из массива json
        let select = '<select id="city_list">';
        for (let i = 0; i < data.length; i++) {
            select += '<option value="' + i + '">' + data[i] + '</option>';
        }
        select += '</select>';

        $('#select_city label').append(select);
    },

    error: function (data) {
        // Если произошла ошибка: создаём блок, помещаем в него текст ошибки
       $($('<div>').css({
           width: "300px",
           height: "90px",
           background: "red",
           opacity: "0.7",
           position: "absolute",
           left: "60%",
           top: "70px",
           zIndex: "3"
        }).html(data.responseText)).appendTo('#auto');
    }
});

// Третье задание
$('#enter_city').keyup(function () {
    let $value = $(this).val();

    // При каждом нажатии на клавиши считываем значение тега input

    $.ajax({
        // Формеруем и отправляем ajax-запрос
        url: "./city.json",
        dataType: "json",
        async: true,

        success: function (data) {
            let option = '';
            for (let i = 0; i < data.length; i++) {
                // Проверяем наличие введённых символов в названиях городов и выбираем соответствующие
                if (search(data[i], $value)) {
                    option += '<option value="' + data[i] + '">';
                }
            }
            $('#list_selected').html('');
            $('#list_selected').append(option);
        }
    });
});

// Функция для нахождения всех соответствий
function search(value, search) {
    value = value.toLowerCase();
    search = search.toLowerCase();

    if (search === '') return false;
    for (let i = 0; i < search.length; i++) {
        let position = value.indexOf(search[i]);
        if (position === -1) return false;
    }
    return true;
}