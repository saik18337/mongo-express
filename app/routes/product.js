const helpers = require('../utils/helpers')
module.exports = (express) => {
    router = express.Router();
    const product = helpers.loadController('product')

    router.get('/', product.listing)
    
    router.get('/:id', ( product.details))

    router.post('/', product.create)

    router.put('/:id',  product.update)

    router.delete('/:id',  product.delete)  

    return router
}