<?php
// include autoloader
require_once '../plugins/dompdf/autoload.inc.php';

$xid_empresa = base64_decode(base64_decode($_POST['xid_empresa']));

$nombre_archivo_pdf = "permiso_".$xid_empresa."_".crc32(time()).".pdf";

//Cuando el archivo con contenido html, se tiene que mandar a buffer antes renderizarlo al dompdf
ob_start();
require_once('permiso_empresa.html.php');
$html = ob_get_contents();
ob_end_clean();

// reference the Dompdf namespace
use Dompdf\Dompdf;

// Introducimos HTML de prueba
//$html =  file_get_contents('./prueba1.html.php', true); //'<h1>Hola mundo!</h1>';
 
// Instanciamos un objeto de la clase DOMPDF.
$pdf = new DOMPDF();
 
// Definimos el tamaño y orientación del papel que queremos.
//"letter" => array(0,0,612.00,792.00)
//Papel: tamaño carta (21.59 cm x 27.94 cm (8 1/2” x 11”). 
//Márgenes: Cada borde de la hoja debe tener 2.54 cm de margen. 
//Sangría: Al iniciar un párrafo debe aplicarse sangría en la primera línea de 5 espacios, con respecto al borde de la hoja. 
//El tipo de letra a utilizar deberá ser Times New Roman 12pt.
$pdf->set_paper("letter", "portrait");

$pdf->set_option("isPhpEnabled", true);
 
// Cargamos el contenido HTML.
$pdf->load_html($html);

// Renderizamos el documento PDF.
$pdf->render();
     
//Guardamos el Archivo PDF en una ruta del servidor.
$archivo_generado = $pdf->output();
file_put_contents('pdf/'.$nombre_archivo_pdf, $archivo_generado);

//Enviamos el Archivo PDF al navegador para dercargar.
//$pdf->stream('Ejemplo1.pdf');

//Mostrar el archivo PDf en el navegador
// $pdf->stream("Ejemplo1.pdf", [
//     'compress' => true,
//     'Attachment' => false,
// ]);

$ajax_respuesta["generado"] = true;
$ajax_respuesta["nombre_archivo"] = $nombre_archivo_pdf;

echo json_encode($ajax_respuesta);
exit(0);
?>