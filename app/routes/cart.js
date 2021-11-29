const helpers = require('../utils/helpers')
module.exports = (express) => {
    router = express.Router();
    const cart = helpers.loadController('cart')
    router.get('/', cart.create)
    
    router.get('/:id', ( cart.details))

    router.post('/', cart.create)

    router.put('/',  cart.update)

    return router
}