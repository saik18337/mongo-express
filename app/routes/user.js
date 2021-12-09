const helpers = require('../utils/helpers')
module.exports = (express) => {
    const router = express.Router()
    const userController = helpers.loadController('user')
    router.post('/login', userController.Login);
    router.post('/register', userController.Register);
    
    router.use('/', helpers.authenticateUser)

    router.get('/', userController.Home);
    return router;
}