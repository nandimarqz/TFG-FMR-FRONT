import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './css/Card.css'

export default function ExportToPDF({ data, tableName,subject, unity, stage }) {
  const handleExportPDF = () => {
   if(tableName === "Incidencias"){
     // Crea un nuevo documento PDF
    const doc = new jsPDF();

    // Configura la posición inicial del contenido
    let y = 20;

    // Agrega el título de la tabla
    doc.setFontSize(18);
    doc.text(`Tabla de ${tableName} `, 10, y);
    y += 10;

    // Crea un array de encabezados de columna
    const headers = ['Id', 'Fecha', 'Descripción', 'Estado', 'Tipo', 'Observación'];

    // Crea un array de filas de la tabla
    const tableData = data.map((row) => [
      row.id,
      row.created_at,
      row.description,
      row.status,
      row.type,
      row.observation,
    ]);

    // Agrega la tabla al documento
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: y,
    });

    // Guarda el archivo PDF con el nombre especificado
    doc.save(`${tableName}.pdf`);
   }else if(tableName === 'Revisiones'){

        // Create a new document PDF
        const doc = new jsPDF();

        // Configure the initial position for the content
        let y = 20;
    
        // Add the table title
        doc.setFontSize(18);
        doc.text(`Tabla de ${tableName}`, 10, y);
        y += 10;
    
        // Create an array of column headers
        const headers = ['Curso', 'Asignatura', 'Etapa', 'Profesor'];
    
        // Create an array of table rows
        const tableData = data.map((row) => [
          row.unity_name,
          row.subject_name,
          row.review_type,
          row.name
        ]);
    
        // Add the table to the document using autoTable
        doc.autoTable({
          head: [headers],
          body: tableData,
          startY: y,
        });
    
        // Save the PDF file with the specified name
        doc.save(`${tableName}.pdf`);

   }else if(tableName === "Revision Alumnos"){

           // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Configurar la posición inicial del contenido
    let y = 20;

    // Agregar el título de la tabla
    doc.setFontSize(18);
    doc.text(`Tabla de ${tableName}`, 10, y);
    if(subject != null){
      y += 10;
      doc.text(`Asignatura: ${subject} `, 10, y);
    }
    if(unity != null){
      y += 10;
      doc.text(`Curso: ${unity} `, 10, y);
    }
    if(stage != null){
      y += 10;
      doc.text(`Estapa: ${stage} `, 10, y);
    }
    y += 10;

    // Crear un array de encabezados de columna
    const headers = ['Alumno', 'Estado', 'Observación'];

    // Crear un array de filas de la tabla
    const tableData = data.map((row) => [
      row.name + ', ' + row.surnames,
      row.status,
      row.observation,
    ]);

    // Agregar la tabla al documento usando autoTable
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: y,
    });

    // Guardar el archivo PDF con el nombre especificado
    doc.save(`${tableName}.pdf`);

   }else if(tableName ==="Usuarios"){

       // Crear un nuevo documento PDF
       const doc = new jsPDF();

       // Configurar la posición inicial del contenido
       let y = 20;
   
       // Agregar el título de la tabla
       doc.setFontSize(18);
       doc.text(`Tabla de ${tableName}`, 10, y);
       y += 10;
   
       // Crear un array de encabezados de columna
       const headers = ['Id', 'Nombre', 'Email'];
   
       // Crear un array de filas de la tabla
       const tableData = data.map((row) => [row.id, row.name, row.email]);
   
       // Agregar la tabla al documento usando autoTable
       doc.autoTable({
         head: [headers],
         body: tableData,
         startY: y,
       });
   
       // Guardar el archivo PDF con el nombre especificado
       doc.save(`${tableName}.pdf`);

   }
  };

  return (
    <div className='mb-3'>
      <input type='button' className="btn btn-primary mx-auto mt-2" href="#" onClick={handleExportPDF} value={"Exportar Tabla a PDF"}/>
    </div>
  );
}