const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/reporte-mensual', ventasController.reporteMensual);
router.get('/generar-excel', ventasController.generarExcel);

module.exports = router;
