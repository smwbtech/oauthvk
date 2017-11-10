let formData = new FormData();
formData.append('accessToken', localStorage.accessToken);
fetch('/authorized', {method: 'post', body: formData})
.then( (res) => {
    res.text()
    .then( (html) => document.write(html))
})
.catch( (err) => console.log(err))
