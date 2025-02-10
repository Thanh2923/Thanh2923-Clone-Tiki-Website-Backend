const express = require('express');
const brandController = require('../controllers/brandController');
const router = express.Router();

router.get('/:id', brandController.getAllBrands);


router.post('/', brandController.createBrand);


router.put('/:id', brandController.updateBrand);


router.delete('/:id', brandController.deleteBrand);

module.exports = router;
