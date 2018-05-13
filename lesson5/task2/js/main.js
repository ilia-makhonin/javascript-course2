// Объект для работы с отзывами
function Review() {
    this.idComent = 0;
    this.comments = [];
}

// Метод выводит все коментарии из файла-заглушки
Review.prototype.list = function () {
    $.ajax({
        type: "POST",
        url: "json/review.list.json",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.comments.length; i++) {
                var textComment = '<p class="comment">' + data.comments[i].text + '</p>';
                $('#review_list').append(textComment);
            }
        },
        error: function (data) {
            var textError = '<div class="error">' + data.responseText + '</div>';
            $('#review_list').append(textError);
        }
    });
};

/**
 * Метод отправляет коментарий на модерацию. Создаёт блок div в него помещает текст коментария в теге p, а также
 * создаёт кнопки Одобрить/Удалить и вешает на них события
 * @param text - текст комментария
 */
Review.prototype.add = function (text) {
    var comment = {
        "id_comment": this.idComent,
        "text": text
    };

    this.comments.push(comment);
    this.idComent++;

    var self = this;

    var commentModeration = document.createElement('p');
    commentModeration.className = 'comment_pre';
    commentModeration.innerText = text;

    var approve = document.createElement('button');
    approve.innerText = 'Одобрить';
    approve.onclick = function () {
        self.submit(comment);
        // Изменяем фон на зелёный, затем удаляем комментарий из панели админа
        $($(this).parent()).css("background", "green");

        setTimeout(function () {
            document.querySelector('#moderation_review').removeChild(this.parentNode)
        }.bind(this), 1000);
    };

    var decline = document.createElement('button');
    decline.innerText = 'Удалить';
    decline.onclick = function () {
        self.delete(comment);
        // Изменяем фон на красный, затем удаляем комментарий из панели админа
        $($(this).parent()).css("background", "red");

        setTimeout(function () {
            document.querySelector('#moderation_review').removeChild(this.parentNode)
        }.bind(this), 1000);
    };

    $($('<div />').addClass('mod_block').append(commentModeration, approve, decline)).appendTo('#moderation_review');
};

/**
 * Метод делает запрос на "сервер", а затем добавляет отзыв в ленту
 * @param comment - объект с id и текстом комментария
 */
Review.prototype.submit = function (comment) {
    $.ajax({
        type: "POST",
        url: "json/review.submit.json",
        dataType: "json",
        success: function (data) {
            if (data.result === 1) {
                $('#review_list').append($('<p />').addClass('comment').text(comment.text));
            } else {
                //------------- код ---------------
            }
        },
        error: function (data) {
            //------------- код ---------------
        }
    });
};

/**
 * Метод создаёт запрос на "сервер", затем, по id, ищет комментарий в массиве comments объекта Review и удаляет его
 * @param comment - comment - объект с id и текстом комментария
 */
Review.prototype.delete = function (comment) {
    $.ajax({
        type: "POST",
        url: "json/review.submit.json",
        dataType: "json",
        context: this,
        success: function (data) {
            if (data.result === 1) {
                for (var i = 0; i < this.comments.length; i++) {
                    if (this.comments[i].id_comment === comment.id_comment) {
                        this.comments.splice(i, 1);
                    }
                }
            } else {
                //-------------- код -------------
            }
        },
        error: function (data) {
            //-------------- код -------------
        }
    });

};

var review = new Review();

// Сразу отображаем все отзывы из json файла
review.list();

$(document).ready(function () {
    // Открыть/Закрыть панель админа
    $('#open_admin_panel').on('click', function () {
        $($(this).next()).fadeToggle();
    });

    // Отправить коммент на модерацию
    $('#send_rvw').on('click', function () {
        var $content = $('#user_review');

        // Если пользователь нечего не ввёл, то создать окно с подсказкой и удалить его через 2.5 сек
        if ($content.val() === '') {
            var $nullMsg = $('<div />').addClass('error_message').html('Сообщение не может быть пустое!');
            $('#enter_review').append($nullMsg);

            setTimeout(function () {
                $('.error_message').animate({opacity: 0.1}, 1500, function () {
                    document.querySelector('#enter_review').removeChild(this);
                });
            }, 1000);
        } else {
            // Запрос на сервер.
            $.ajax({
                type: "POST",
                url: "json/review.add.json",
                dataType: "json",
                success: function (data) {
                    if (data.result === 1) {
                        // Вызываем метод add и очищаем поле для ввода текста
                        review.add($content.val());
                        $content.val('');

                        // Всплывающее окно с текстом "Ваш отзыв был передан на модерацию", которое исчезает через 2.5 сек
                        var $successMsg = $('<div />').addClass('success_message').html(data.userMessage);
                        $('#enter_review').append($successMsg);

                        setTimeout(function () {
                            $('.success_message').animate({opacity: 0.1}, 1500, function () {
                                document.querySelector('#enter_review').removeChild(this);
                            });
                        }, 1000);
                    } else {
                        //------------- код -------------
                    }
                },
                error: function (data) {
                    //-------------- код -------------
                }
            });
        }
    });
});