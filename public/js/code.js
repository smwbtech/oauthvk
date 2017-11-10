window.onload = () => {
    if(!localStorage.oauth) {
        let authButton = document.getElementById('authButton');
        authButton.classList.toggle('inactive');

        //Авторизация по щелчку на кнопку
        authButton.addEventListener('click', authButtonHandler);
    }


    //Обработчик события по клику на кнопку
    function authButtonHandler(e) {
        window.location.pathname = '/auth/vk';
    }
}
