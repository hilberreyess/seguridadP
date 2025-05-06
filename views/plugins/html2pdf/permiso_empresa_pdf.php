<?php
/**
 * Html2Pdf Library - example
 *
 * HTML => PDF converter
 * distributed under the OSL-3.0 License
 *
 * @package   Html2pdf
 * @author    Laurent MINGUET <webmaster@html2pdf.fr>
 * @copyright 2023 Laurent MINGUET
 * 
 */

@session_start();
date_default_timezone_set('America/Mexico_City');

require_once $_SERVER['DOCUMENT_ROOT']."/empresas-de-seguridad-privada/views/plugins/html2pdf/autoload.php";

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;


try {
    $xid_empresa = base64_decode(base64_decode($_POST['xid_empresa']));
    
    $RutaDirectorio   = $_SERVER['DOCUMENT_ROOT']."/empresas-de-seguridad-privada/views/reportes/pdf/";
    $NombreArchivoPDF = "permiso_empresa_".uniqid().".pdf";

    ob_start();
    include('permiso_empresa_html.php');
    $ContenidoHTML = ob_get_clean();
    
    $html2pdf = new HTML2PDF('L', 'Letter', 'es', true, 'UTF-8', array(0, 0, 0, 0));
    $html2pdf->pdf->SetAuthor('empresas-de-seguridad-privada.gob.mx');
    $html2pdf->pdf->SetTitle($NombreArchivoPDF);
    $html2pdf->pdf->SetSubject('Licencias de Conducir del Estado de Guerrero');
    $html2pdf->pdf->SetKeywords('Aviso de Privacidad de Datos Personales');
    $html2pdf->pdf->SetDisplayMode('fullpage');
    
    #Agregar Opciones de Seguridad
    #$html2pdf->pdf->SetProtection($permissions, $userPass, $ownerPass, $mode, $pubkeys);
    //$html2pdf->pdf->SetProtection(array('print', 'modify', 'copy', 'extract', 'assemble', 'print-high', 'owner'), 'mi_password', 'C4Guerro#36039', 3, null);
    $html2pdf->writeHTML($ContenidoHTML);

    /*Verificamos la existencia del directorio*/
    // if (!is_dir($RutaDirectorio)) {
    //     mkdir($RutaDirectorio);
    //     $html2pdf->Output($RutaDirectorio."/".$NombreArchivoPDF, 'F');
    // }else{
    //     $html2pdf->Output($RutaDirectorio."/".$NombreArchivoPDF, 'F');
    // }

    $html2pdf->output($RutaDirectorio.$NombreArchivoPDF, 'F');

    //$html2pdf->output('my_doc.pdf');


    $ajax_respuesta["generado"] = true;
    $ajax_respuesta["ruta"]     = $RutaDirectorio;	
    $ajax_respuesta["archivo"]  = $NombreArchivoPDF;

    echo json_encode($ajax_respuesta);
} catch (Html2PdfException $e) {
    $html2pdf->clean();

    $formatter = new ExceptionFormatter($e);

    $ajax_respuesta["generado"] = false;
    $ajax_respuesta["error"]    = "NoPDF";
    $ajax_respuesta["mensaje"]  = $formatter->getHtmlMessage();  
    echo json_encode($ajax_respuesta); 
}