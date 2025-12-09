const db = require("../db");
const ExcelJS = require("exceljs");

// 1️⃣ Chequear facturas
exports.chequearVencidas = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM facturas");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener facturas" });
  }
};

// 2️⃣ Generar Excel completo
exports.generarExcelCompleto = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.id_factura, f.id_cliente, f.id_vendedor, f.fecha_emision, f.fecha_vencimiento,
             f.estado, f.total, f.fecha_creacion,
             d.id_detalle, d.id_producto, d.cantidad, d.precio_unitario,
             d.costo_unitario, d.utilidad
      FROM facturas f
      JOIN detalle_facturas d ON f.id_factura = d.id_factura
    `);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Facturas Detalle");

    sheet.columns = [
      { header: "ID Factura", key: "id_factura", width: 12 },
      { header: "ID Cliente", key: "id_cliente", width: 12 },
      { header: "ID Vendedor", key: "id_vendedor", width: 12 },
      { header: "Fecha Emisión", key: "fecha_emision", width: 15 },
      { header: "Fecha Venc.", key: "fecha_vencimiento", width: 15 },
      { header: "Estado", key: "estado", width: 12 },
      { header: "Total", key: "total", width: 12 },
      { header: "Fecha Creación", key: "fecha_creacion", width: 20 },
      { header: "ID Detalle", key: "id_detalle", width: 12 },
      { header: "ID Producto", key: "id_producto", width: 12 },
      { header: "Cantidad", key: "cantidad", width: 10 },
      { header: "Precio Unitario", key: "precio_unitario", width: 12 },
      { header: "Costo Unitario", key: "costo_unitario", width: 12 },
      { header: "Utilidad", key: "utilidad", width: 12 },
    ];

    rows.forEach((f) => sheet.addRow(f));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="facturas_detalle.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generando Excel completo de facturas");
  }
};

// 3️⃣ Registrar pago
exports.registrarPago = async (req, res) => {
  const { id_factura } = req.body;

  if (!id_factura) {
    return res.status(400).json({ error: "id_factura es requerido" });
  }

  try {
    await db.query(
      "UPDATE facturas SET estado = 'pagado' WHERE id_factura = ?",
      [id_factura]
    );
    res.json({ message: `Factura ${id_factura} marcada como pagada` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar pago" });
  }
};
