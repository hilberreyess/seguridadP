<?php
@session_start();
date_default_timezone_set('America/Mexico_City');


require_once $_SERVER['DOCUMENT_ROOT']."/empresas-de-seguridad-privada/views/plugins/html2pdf/autoload.php";

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

$RutaDirectorio   = $_SERVER['DOCUMENT_ROOT']."/empresas-de-seguridad-privada/views/reportes/pdf/";
$NombreArchivoPDF = "pruebas_".uniqid().".pdf";


$html2pdf = new \Spipu\Html2Pdf\Html2Pdf('P', 'A4', 'en');
$html2pdf->writeHTML('<h1>HelloWorld</h1>This is my first page');
//$html2pdf->output();
$html2pdf->output($RutaDirectorio.$NombreArchivoPDF, 'F');


$ajax_respuesta["generado"] = true;
$ajax_respuesta["ruta"]     = $RutaDirectorio;	
$ajax_respuesta["archivo"]  = $NombreArchivoPDF;

echo json_encode($ajax_respuesta);


?>

