const db = require("../db");
const ExcelJS = require("exceljs");

/* --------------------------
   REPORTE MENSUAL (JSON)
--------------------------- */
exports.reporteMensual = async (req, res) => {
  try {
    const sql = `
      SELECT 
        f.id_factura,
        c.nombre AS cliente,
        v.nombre AS vendedor,
        p.nombre AS producto,
        prov.nombre AS proveedor,
        d.costo_unitario AS costo,
        d.precio_unitario AS precio_venta,
        d.utilidad,
        ROUND((d.utilidad / d.costo_unitario) * 100, 2) AS margen
      FROM facturas f
      JOIN detalle_facturas d ON f.id_factura = d.id_factura
      JOIN productos p ON d.id_producto = p.id_producto
      JOIN clientes c ON f.id_cliente = c.id_cliente
      JOIN vendedores v ON f.id_vendedor = v.id_vendedor
      JOIN proveedores prov ON p.id_proveedor = prov.id_proveedor
      ORDER BY f.id_factura;
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (err) {
    console.error("❌ ERROR en reporte mensual:", err);
    res.status(500).json({ error: "Error cargando reporte mensual" });
  }
};


/* --------------------------
     GENERAR EXCEL
--------------------------- */
exports.generarExcel = async (req, res) => {
  try {
    const sql = `
      SELECT 
        f.id_factura,
        c.nombre AS cliente,
        v.nombre AS vendedor,
        p.nombre AS producto,
        prov.nombre AS proveedor,
        d.costo_unitario AS costo,
        d.precio_unitario AS precio_venta,
        d.utilidad,
        ROUND((d.utilidad / d.costo_unitario) * 100, 2) AS margen
      FROM facturas f
      JOIN detalle_facturas d ON f.id_factura = d.id_factura
      JOIN productos p ON d.id_producto = p.id_producto
      JOIN clientes c ON f.id_cliente = c.id_cliente
      JOIN vendedores v ON f.id_vendedor = v.id_vendedor
      JOIN proveedores prov ON p.id_proveedor = prov.id_proveedor
      ORDER BY f.id_factura;
    `;

    const [rows] = await db.query(sql);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Reporte Mensual");

    sheet.columns = [
      { header: "Factura", key: "id_factura", width: 10 },
      { header: "Cliente", key: "cliente", width: 20 },
      { header: "Vendedor", key: "vendedor", width: 20 },
      { header: "Producto", key: "producto", width: 20 },
      { header: "Proveedor", key: "proveedor", width: 20 },
      { header: "Costo", key: "costo", width: 10 },
      { header: "Precio Venta", key: "precio_venta", width: 15 },
      { header: "Utilidad", key: "utilidad", width: 10 },
      { header: "Margen %", key: "margen", width: 10 },
    ];

    rows.forEach((r) => sheet.addRow(r));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=reporte.xlsx");

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("❌ ERROR FATAL:", error);
    res.status(500).json({ error: "Error interno al generar Excel" });
  }
};
