const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '123',
    database: 'ticashop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🟢 Probar conexión una sola vez al iniciar
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Conexión a MySQL establecida correctamente');
        connection.release();
    } catch (err) {
        console.error('❌ Error al conectar con MySQL:', err);
    }
})();

module.exports = db;
