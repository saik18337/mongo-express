const Controller = require('./controller')

class CartController extends Controller {
    constructor() {
        super()
    }

    create(req, res, next) {
        res.send('Product Added to cart ')
    }

    details(req, res, next)  {
        res.send('Cart details')
    }

    update(req, res, next)  {
        res.send('Cart updated');
    }
}

module.exports = CartController;