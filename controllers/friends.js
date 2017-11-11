const Vkapi = require('node-vkapi');

module.exports = (res, token, profile, page) => {
    let vkapi = new Vkapi({
        accessToken: token,
    });
    vkapi.call('friends.get', {
        order: 'random',
        count: 5,
        fields: 'nickname,domain,photo_50'
    })
    .then( (friends) => {
        res.render(page, {
            redirect: true,
            profile: profile,
            accessToken: token,
            friends: friends});
    })
    .catch( (err) => console.log(err));
}
