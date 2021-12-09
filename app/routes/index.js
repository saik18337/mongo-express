module.exports = (express, app) => {
    const router = express.Router();
    const cartRoutes = require('./cart')
    const productRoutes = require('./product')
    const userRoutes = require('./user')

    const routes = [
        {
            'prefix': '/product',
            'route': productRoutes(express)
        },
        {
            'prefix': '/cart',
            'route': cartRoutes(express)
        },
        {
            'prefix': '/',
            'route': userRoutes(express)
        }
    ];


    routes.forEach((singleRoute)=> {
        const { route, prefix  } = singleRoute;
        console.log(prefix)
        app.use(prefix, route)
    });
}