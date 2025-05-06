<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
$table = "datos_personales";
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
    array('db' => '`t`.`id_personal`', 'dt'=>0, 'field'=>'id_personal'),
    array('db' => 'CONCAT_WS(" ",`t`.`nombre`,`t`.`apellido_paterno`,`t`.`apellido_materno`)', 'dt' => 1,'as'=>'NOMBRE_COMPLETO','field' => 'NOMBRE_COMPLETO','formatter'=>function($d,$row){
      return $d;
    }),
    array('db' => 'DATE_FORMAT(`t`.`fecha_nacimiento`, "%d-%m-%Y")', 'dt' => 2,'as'=>'fecha_nacimiento','field' => 'fecha_nacimiento','formatter'=>function($d,$row){
      return $d;
    }),
    array('db' => '`g`.`genero`', 'dt'=>3, 'field'=>'genero'),
    array('db' => '`c`.`categoria`', 'dt'=>4, 'field'=>'categoria'),
    array('db' => '`f`.`tipo_funcion`', 'dt'=>5, 'field'=>'tipo_funcion'),
    array('db' => '`a`.`cargo`', 'dt'=>6, 'field'=>'cargo'),
    array('db' => '`m`.`municipio`', 'dt'=>7, 'field'=>'municipio'), 
    array('db' => '`t`.`id_personal`', 'dt' => 8, 'field' => 'id_personal','formatter'=>function($d, $row){
      return '<div class="dropdown" style="padding:2px;">
              <button type="submit" class="btn btn-primary btn-md dropdown-toggle" data-toggle="dropdown" onclick="" title="Opciones de Personal">
                <i class="fa fa-cogs"></i>&nbsp; Opciones<span class="caret"></span>
              </button>
              <ul class="dropdown-menu" style="min-width:130px;top:92%;padding:8px;background-color:#dfdfdf;">
                <!--<li>
                  <button type="submit" class="btn btn-primary btn-md btn-block text-left btnImprimir" onclick="imprimir_ficha('."'".base64_encode(base64_encode($d))."'".');" style="text-align:left;" title="Imprimir Ficha">
                    <i class="fa fa-print"></i>&nbsp; Ficha
                  </button>
                </li> -->               
                <li>
                  <button type="submit" class="btn btn-warning btn-md  btn-block btnVacaciones" onclick="agregar_vacaciones('."'".base64_encode(base64_encode($d))."','".$row['num_empleado']."','".$row['NOMBRE_COMPLETO']."'".');" style="text-align:left; margin-top:4px;" title="Agregar Vacaciones">
                    <i class="fa fa-plane"></i>&nbsp; Vacaciones
                  </button>
                </li>
                <li>
                  <button type="submit" class="btn btn-danger btn-md  btn-block btnLicencias" onclick="aregar_licencias('."'".base64_encode(base64_encode($d))."','".$row['num_empleado']."','".$row['NOMBRE_COMPLETO']."'".');" style="text-align:left; margin-top:4px;padding-bottom:4px;" title="Agregar Licencias">
                    <i class="fa fa-file-text-o"></i>&nbsp; Licencias
                  </button>
                </li>
                <li>
                  <button type="submit" class="btn btn-primary btn-md  btn-block btnLicencias" onclick="expediente_digital('."'".base64_encode(base64_encode($d))."'".');" style="text-align:left; margin-top:4px;padding-bottom:4px;" title="Expediente Digital">
                    <i class="fa fa-folder-open"></i>&nbsp; Expediente
                  </button>
                </li>
                <li>
                  <button type="submit" class="btn btn-success btn-md btn-block btnEditar" onclick="editar_personal('."'".base64_encode(base64_encode($d))."'".');" style="text-align:left; margin-top:4px;" title="Editar Datos Personales">
                    <i class="fa fa-user-circle"></i>&nbsp; Datos
                  </button>
                </li>
            </div>';
    }),
    array('db' => '`a`.`num_empleado`', 'dt'=>9, 'field'=>'num_empleado'),
    array('db' => '`t`.`curp`', 'dt'=>10, 'field'=>'curp')
);

$joinQuery = "FROM `datos_personales` AS `t`
              LEFT JOIN `datos_adscripciones` AS `a` ON (`t`.`id_personal` = `a`.`id_personal`)
              LEFT JOIN `cat_genero` AS `g` ON (`t`.`id_genero` = `g`.`id_genero`)
              LEFT JOIN `cat_categorias` AS `c` ON (`c`.`id_categoria` = `a`.`id_categoria`)
              LEFT JOIN `cat_tipo_funciones` AS `f` ON (`f`.`id_tipo_funcion` = `a`.`id_tipo_funcion`)
              LEFT JOIN `cat_municipios` AS `m` ON (`m`.`id_municipio` = `a`.`id_municipio` AND `m`.`id_entidad`=12)";


if ($_SESSION["id_perfil"] == 3 || $_SESSION["id_perfil"] == 4) {
  $extraCondition = "`t`.`id_area_usuario`=".$_SESSION["id_area_usuario"];
}

echo json_encode(
  SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraCondition)
);