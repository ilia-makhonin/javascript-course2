'use strict';

// Первое задание

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

$('#tabs_select .tab').on('click', function () {
    if (!$(this).hasClass('active')) {
        $('#tabs_select .active').removeClass('active');
        $(this).addClass('active');
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
    url: "./city.json",
    dataType: "json",
    async: true,

    success: function success(data) {
        var select = '<select id="city_list">';
        for (var i = 0; i < data.length; i++) {
            select += '<option value="' + i + '">' + data[i] + '</option>';
        }
        select += '</select>';

        $('#select_city label').append(select);
    },

    error: function error(data) {
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
    var $value = $(this).val();

    $.ajax({
        url: "./city.json",
        dataType: "json",
        async: true,

        success: function success(data) {
            var option = '';
            for (var i = 0; i < data.length; i++) {
                if (search(data[i], $value)) {
                    option += '<option value="' + data[i] + '">';
                }
            }
            $('#list_selected').html('');
            $('#list_selected').append(option);
        }
    });
});

function search(value, search) {
    value = value.toLowerCase();
    search = search.toLowerCase();

    if (search === '') return false;
    for (var i = 0; i < search.length; i++) {
        var position = value.indexOf(search[i]);
        if (position === -1) return false;
    }
    return true;
}