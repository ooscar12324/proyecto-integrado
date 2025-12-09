const express = require('express');
const cors = require('cors');

const ventasRoutes = require('./routes/ventas');
const facturasRoutes = require('./routes/facturas');
const authRoutes = require('./routes/auth'); // ← nuevo

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS BACKEND
app.use('/ventas', ventasRoutes);
app.use('/facturas', facturasRoutes);
app.use('/auth', authRoutes); // ← nuevo

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
