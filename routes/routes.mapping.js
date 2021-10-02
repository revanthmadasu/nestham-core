const indexRouter = require('./index');
const usersRouter = require('./users');
const routes = [
    {
        url:'/',
        router: indexRouter
    },
    {
        url:'/users',
        router: usersRouter
    }
];
module.exports = routes;