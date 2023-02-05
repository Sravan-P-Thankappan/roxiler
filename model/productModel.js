const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date

})

module.exports = mongoose.model('Products',productSchema)