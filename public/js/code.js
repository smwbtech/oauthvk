window.onload = () => {
    if(!localStorage.accessToken) {
        let authButton = document.getElementById('authButton');
        authButton.classList.toggle('inactive');

        //Авторизация по щелчку на кнопку
        authButton.addEventListener('click', authButtonHandler);
    }

    else {
        let formData = new FormData();
        formData.append('accessToken', localStorage.accessToken);
        fetch('/authorized', {method: 'post', body: formData})
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err));
    }


    //Обработчик события по клику на кнопку
    function authButtonHandler(e) {
        window.location.pathname = '/auth/vk';
    }
}
