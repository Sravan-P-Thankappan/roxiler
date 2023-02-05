
const productModel = require('../model/productModel')
const axios = require('axios')

let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'septemper', 'october', 'november', 'december']

function index(month) {

    let i = months.findIndex((el) => {
        return el === month
    })

    return i


}





module.exports = {

    fetchProducts: (req, res) => {

        axios.get(process.env.api).then((response) => {

            // console.log(response.data)
            const products = response.data

            productModel.find().then((data) => {

                if (data.length === 0) {

                    console.log(data)

                    productModel.create(products).then(() => {

                        res.status(200).json({ message: 'products added' })
                    })
                        .catch((er) => {

                            res.status(500).json({ message: er.message })
                        })
                }

                else {
                    res.status(200).json({ message: 'Products already exists' })
                }

            })
                .catch((er) => {

                    res.status(500).json({ message: er.message })

                })

        })
            .catch((er) => {
                console.log(er)
            })
    },




    getStatistics: (req, res) => {


        let month = req.params.month

        const i = index(month.toLowerCase()) + 1

        if (i === 0) return res.status(400).json({ message: 'Month is invalid' })

        productModel.aggregate([

            {
                $project: {
                    id: 1, title: 1, price: 1, description: 1, category: 1, image: 1, sold: 1, mon: {
                        $month: '$dateOfSale'
                    }

                }

            },

            { $match: { mon: i } },

            {
                $group: {
                    _id: "$mon",

                    sold_count: {
                        $sum:
                        {
                            $cond:
                                [
                                    {
                                        $eq:
                                            ['$sold', true]
                                    }, 1, 0
                                ]
                        }
                    },

                    unsold_count: {

                        $sum:
                        {
                            $cond:
                                [
                                    {
                                        $eq:
                                            ['$sold', false]
                                    }, 1, 0
                                ]
                        }
                    },

                    totalSaleAmount: {
                        $sum:
                        {
                            $cond:
                                [
                                    {
                                        $eq:
                                            ['$sold', true]
                                    }, '$price', 0
                                ]
                        }
                    },
                }
            }
        ])
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((er) => {
                res.status(500).json({ message: er.message })
            })

    },



    getBarChart: (req, res) => {

        let month = req.params.month

        const i = index(month.toLowerCase()) + 1

        if (i === 0) return res.status(400).json({ message: 'Month is invalid' })

        productModel.aggregate([

            {
                $project: {
                    id: 1, title: 1, price: 1, description: 1, category: 1, image: 1, sold: 1, mon: {
                        $month: '$dateOfSale'
                    }

                }

            },

            { $match: { mon: i } },

            {
                $group: {
                    _id:
                    {
                        $cond: [
                            { $and: [{ $gte: ["$price", 0] }, { $lte: ['$price', 100] }] }, '0-100',

                            {
                                $cond: [
                                    { $and: [{ $gte: ["$price", 101] }, { $lte: ['$price', 200] }] }, '101-200',


                                    {
                                        $cond: [
                                            { $and: [{ $gte: ["$price", 201] }, { $lte: ['$price', 300] }] }, '201-300',

                                            {
                                                $cond: [
                                                    { $and: [{ $gte: ["$price", 301] }, { $lte: ['$price', 400] }] }, '301-400',

                                                    {
                                                        $cond: [
                                                            { $and: [{ $gte: ["$price", 401] }, { $lte: ['$price', 500] }] }, '401-500',

                                                            {
                                                                $cond: [
                                                                    { $and: [{ $gte: ["$price", 501] }, { $lte: ['$price', 600] }] }, '501-600',

                                                                    {
                                                                        $cond: [
                                                                            { $and: [{ $gte: ["$price", 601] }, { $lte: ['$price', 700] }] }, '601-700',

                                                                            {
                                                                                $cond: [
                                                                                    { $and: [{ $gte: ["$price", 701] }, { $lte: ['$price', 800] }] }, '701-800',

                                                                                    {
                                                                                        $cond: [
                                                                                            { $and: [{ $gte: ["$price", 801] }, { $lte: ['$price', 900] }] }, '801-900',

                                                                                            '900-above'


                                                                                        ]
                                                                                    }

                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },
                    total_Product_between_price_range: { $sum: 1 }
                }
            }

        ])
            .then((data) => {

                res.status(200).json(data)
            })
            .catch((er) => {

                res.status(500).json({ message: er.message })
            })

    },



    getPieChart: (req, res) => {


        let month = req.params.month

        const i = index(month.toLowerCase()) + 1

        if (i === 0) return res.status(400).json({ message: 'Month is invalid' })

        productModel.aggregate([

            {
                $project: {
                    id: 1, title: 1, price: 1, description: 1, category: 1, image: 1, sold: 1, mon: {
                        $month: '$dateOfSale'
                    }

                }

            },

            { $match: { mon: i } },

            { $group: { _id: '$category', total_product_in_this_category: { $sum: 1 } } }
        ])
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((er) => {
                res.status(500).json({ message: er.message })
            })

    },



}