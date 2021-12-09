const jwt = require('jsonwebtoken')
const {constants} = require('../constants/index')
const bcrypt = require('bcrypt');
const Controller = require('./controller')
const helpers = require('../utils/helpers')
const model = helpers.loadModel('user')
class UserController extends Controller {
    constructor() {
        super()
        this.Register.bind(this)
    }

    Home(req, res, next) {
        res.send('Login success')
    }
    
    
    async Login (req, res, next) {
        const body = req.body;
        if(!body.password) {
            next(new Error('Password is required'))
        }
        if(!body.email) {
            next(new Error('Email is requried'))
        }
        const user = await model.findOne({email: body.email}, 'password salt');
        if(!user) {
            next(new Error('Authentication failed'))
        }
        const hashPassword = bcrypt.hashSync(body.password, user.salt);
        console.log(hashPassword, user.password)
        if(hashPassword != user.password) {
            next(new Error('Authentication failed'))
        }
        const token = jwt.sign({'_id': user._id}, constants.JWT_SECRETE, {})
        res.json({token: token})
    }

    Register(req, res, next) {
        try {
            const body = req.body;
            const password = body.password
            let salt = "";
            bcrypt.genSalt(constants.PASSWORD_SALT_ROUNDS).then(generated_salt => {
                salt = generated_salt
                return bcrypt.hash(password, salt)
            }).then(hash => {
                body.password = hash;
                body.salt = salt;
                model.create(body, (err, doc) => {
                    if(err) {
                        next(err);
                        return;
                    }
                    res.json(doc)
                })
            })
        }
        catch(err) {
            throw new Error(err.message)
        }
    }

    checkPassswordStrength(passsword) {
        return { 'success': true }
    }
}

module.exports = UserController;