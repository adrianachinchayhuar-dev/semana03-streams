const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Validar la ruta solicitada
  if (req.url === '/reporte') {
    try {
      // 1. Configurar cabeceras HTTP para forzar la descarga de Excel
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="reporte_ventas.xlsx"'
      );

      // 2. Crear el libro de trabajo de ExcelJS conectado en memoria a la respuesta HTTP (res)
      const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
        stream: res
      });

      // 3. Crear hoja "Ventas"
      const worksheet = workbook.addWorksheet('Ventas');

      // 4. Configurar cabeceras de columnas
      worksheet.columns = [
        { header: 'Producto', key: 'producto', width: 25 },
        { header: 'Cantidad', key: 'cantidad', width: 15 },
        { header: 'Precio', key: 'precio', width: 15 }
      ];

      // 5. Agregar al menos 20 filas de datos de ejemplo
      for (let i = 1; i <= 20; i++) {
        worksheet.addRow({
          producto: `Producto ${i}`,
          cantidad: Math.floor(Math.random() * 50) + 1,
          precio: parseFloat((Math.random() * 100 + 10).toFixed(2))
        });
      }

      // 6. Cerrar de forma segura la hoja y el stream en memoria
      worksheet.commit();
      await workbook.commit();
    } catch (error) {
      console.error('Error al generar el Excel en memoria:', error);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Error interno al procesar el reporte.');
      }
    }
  } else {
    // Mensaje por defecto para cualquier otra ruta
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Visita /reporte para descargar el Excel');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});