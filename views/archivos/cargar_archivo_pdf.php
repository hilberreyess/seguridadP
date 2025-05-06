<?php
session_start();
// ini_set('upload_max_filesize', '10M');
// ini_set('post_max_size', '10M');
// ini_set('max_input_time', 300);
// ini_set('max_execution_time', 300);

sleep(1);
/*Getting file name*/
	$filename         = $_FILES['FileUploadPDF']['name']; //Obtiene el nombre del Archivo seleccionada en el inptfile	
	$xid_personal     = base64_decode(base64_decode(trim($_POST['xid_personal'])));
	$xid_tipo_archivo = trim($_POST['xid_tipo_archivo']);
	$xaleatorio       = trim($_POST['xAleatorio']);
	$xdirectorio      = trim($_POST['xDirectorio']);
	
	// $xid_documento = base64_decode(base64_decode($_POST['pIdFile']));
	//$xarchivo_pdf = strtoupper(uniqid());
	$xarchivo_pdf    =  str_pad($xid_personal, 5, "0", STR_PAD_RIGHT).'_'.str_pad($xid_tipo_archivo, 3, "0", STR_PAD_RIGHT).'_'.$xaleatorio;

	//Verificamos si hay informacion en las variables
	if (isset($filename)) {
		$directorio    = "./documentos/".$xdirectorio."/";
		$ext = '.'.strtolower(pathinfo($_FILES['FileUploadPDF']['name'], PATHINFO_EXTENSION));
		$NombreArchivo = $xarchivo_pdf.$ext;
		//$img_size      = round($_FILES['FileUploadPDF']['size']/1024);	
		

	    /*Verificar si el directorio con el ID del Municipio Existe, Si NO existe crearlo*/
		if(!is_dir($directorio)){
		    mkdir($directorio, 0755, true);
		}

		$RutaCompleta = $directorio.$NombreArchivo;
		$FileType     = strtolower(pathinfo($RutaCompleta,PATHINFO_EXTENSION));

		if ($FileType == "pdf") {
			if(move_uploaded_file($_FILES['FileUploadPDF']['tmp_name'],$RutaCompleta)==TRUE){
				$ajax_respuesta["guardado"] = true;
				$ajax_respuesta["archivo"] = $NombreArchivo;

				$ajax_respuesta["guardado"]   = true;
				$ajax_respuesta["archivo"]    = $NombreArchivo;
				$ajax_respuesta["extension"]  = $ext;
				$ajax_respuesta["directorio"] = $directorio;
				$ajax_respuesta["fileType"]   = $FileType;

				echo json_encode($ajax_respuesta);
			}else{
				$ajax_respuesta["guardado"] = false;
				echo json_encode($ajax_respuesta);
			}
		}else{
			$ajax_respuesta["guardado"] = false;
			$ajax_respuesta["error"] = "No hay Archivo";
			echo json_encode($ajax_respuesta);
		}
	}else{
		$ajax_respuesta["guardado"] = false;
		$ajax_respuesta["error"] = "No hay datos";
		echo json_encode($ajax_respuesta);
	}



?>