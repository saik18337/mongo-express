const Controller = require('./controller');
const helpers = require('../utils/helpers')
const model = helpers.loadModel('product')


class ProductController extends Controller {
    model;
    constructor() {
        super()
    }
    
    listing(req, res, next) {
        try {
            const data = model.find({}, (err, data) => {
                if(err) throw new Error('Internal server error')
                res.json(data)
            });
        }
        catch(err) {
            throw new Error(err.message);
        }
    }

    create(req, res, next) {
        const body = req.body;
        if(!body.name) {
            //throw new Error('Name is required')
        }
        if(body.price < 0) {
            throw new Error('Price should be greater than 0')
        }
        model.create(body, (err, doc) => {
            if(err) {
                throw new Error(err._message || 'Error while creating record')
            }
            res.json(doc)
        })
    }

    details(req, res, next)  {
        const id = req.params.id
        if(!id) {
            throw new Exception('Id is missing')
        }
        model.find({_id: id}, (err, data) => {
            if(err) throw new Error('Errror while fetching data')
            res.json(data);
        });
    }

    update(req, res, next)  {
        const body = req.body;
        model.update({_id: req.params.id}, { $set:body }, (err, doc, data) => {
            if(err) throw new Error('Error while updating record')
            res.json(doc)
        })
    }


    delete(req, res, next)  {
        const body = req.body;
        model.deleteOne({_id: req.params.id}, (err, doc, data) => {
            if(err) throw new Error('Error while deleting record')
            res.json(doc)
        })
    }
}

module.exports = ProductController;