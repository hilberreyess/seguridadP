<?php
session_start();
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
$table = "esp_personal";
$primaryKey = "id_personal";

require("ssp.customized.class.php");
require_once($_SERVER["DOCUMENT_ROOT"]. "/empresas-de-seguridad-privada/config/configdb.php");

  $sql_details = array(
          "host" => DB_HOST,
          "db"   => DB_NAME,
          "user" => DB_USER,
          "pass" => DB_PASS,
        );

  $columns = array(

    array('db' => 'CONCAT_WS("<br>",CONCAT(`a`.`no_empleado`) ,`a`.`id_personal`)', 'dt' => 0,'as'=>'num_empleado','field' => 'no_empleado','formatter'=>function($d,$row){
       return $d;
    }),
    array('db' => 'CONCAT_WS("<br>",CONCAT_WS(" ",`a`.`nombre`,`a`.`apellido_paterno`,`a`.`apellido_materno`))', 'dt' => 1,'as'=>'nombre_completo','field' => 'nombre_completo','formatter'=>function($d,$row){
       return $d;
    }),
    array('db' => '`a`.`fecha_nacimiento`', 	'dt'=>2, 'field'=>'fecha_nacimiento'),
	array('db' => '`a`.`CLAVE_SEXO`',		'dt'=>3, 'field'=>'CLAVE_SEXO'),
    array('db' => '`a`.`rfc`', 				'dt'=>4, 'field'=>'rfc'),
    array('db' => '`a`.`clave_elector`', 		'dt'=>5, 'field'=>'clave_elector'),
    array('db' => '`a`.`cuip`', 				'dt'=>6, 'field'=>'cuip'),
    array('db' => '`a`.`id_personal`', 		'dt'=>7, 'field' => 'id_personal','formatter'=>function($d, $row){
       return '<button type="submit" class="btn btn-success" onclick="editar_esp_empresas('."'".base64_encode(base64_encode($d))."'".');" title="Editar"><i class="fa fa-pencil"></i></button>';
    }),
    array('db' => '`a`.`id_personal`', 'dt' => 8, 'field' => 'id_personal','formatter'=>function($d, $row){
       return '<button type="submit" class="btn btn-primary" onclick="imprimir_documento('."'".str_pad($d,7,"0",STR_PAD_LEFT)."','".$row["anio"]."','".$row["id_periodo"]."'".');" title="Imprimir"><i class="fa fa-print"></i></button>';
    }),
  );

  $joinQuery = "FROM `esp_personal` AS `a`";
              
  
  echo json_encode(
      SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraCondition)
  );