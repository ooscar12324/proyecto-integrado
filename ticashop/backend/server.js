const express = require('express');
const cors = require('cors');
const ventasRoutes = require('./routes/ventas');
const facturasRoutes = require('./routes/facturas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ventas', ventasRoutes);
app.use('/facturas', facturasRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
