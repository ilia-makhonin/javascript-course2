window.onload = function () {
    document.querySelector('#form_send').onclick = function () {
        event.preventDefault();

        alert('Отправлено!');

        document.querySelector('#user_name').value = '';
        document.querySelector('#user_phone').value = '';
        document.querySelector('#user_comment').value = '';
    };


};