const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');

router.post('/pago', facturasController.registrarPago);
router.get('/notificaciones', facturasController.chequearVencidas);
router.get('/generar-excel-completo', facturasController.generarExcelCompleto);

module.exports = router;
