const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no bacon?']
    },
    price: {
        type: Number,
        default: 0
    }
})


const  Product = mongoose.model('Product', ProductSchema);

module.exports = Product;