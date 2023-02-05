
const router = require('express').Router()

const productController = require('../controller/productController')


//--------getting products from third-party api-----------

router.get('/fetchproduct',productController.fetchProducts)


//-----------getting statistics---------------------------
router.get('/statistics/:month',productController.getStatistics)


//--------------getting bar-chart------------------------
router.get('/barchart/:month',productController.getBarChart)


//--------------getting pie-chart------------------------
router.get('/piechart/:month',productController.getPieChart)





 
module.exports = router