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
        formData.append('profile', localStorage.profile);
        fetch('/authorized', {method: 'post', body: formData})
        .then( (res) => {
            res.text()
            .then( (html) => {
                let divContent = document.getElementById('content');
                content.innerHTML = html;
            })
        })
        .catch( (err) => console.log(err));
    }


    //Обработчик события по клику на кнопку
    function authButtonHandler(e) {
        window.location.pathname = '/auth/vk';
    }
}
