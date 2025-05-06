<?php
   session_start();
    //include 'models/sesion_check.php';
    include 'template.php';

    $parametros = array('titulo' => 'Personal de Empresas de Seguridad Privada',
                       'scripts' => array('<link  href="views/plugins/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">',
                                          '<script src="views/plugins/bootstrap-select/dist/js/bootstrap-select.min.js"></script>',
                                          '<script src="views/plugins/bootstrap-select/dist/js/i18n/defaults-es_ES.js"></script>',
                                          '<script src="views/plugins/moment-with-locales.js"></script>',                                          
                                          '<script src="views/plugins/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.js" type="text/javascript"></script>'),
                       'datatables' => 'true'
                  );

    $pagina = new Plantilla($parametros);
    $acceso_perfiles=array("SUPERADMINISTRADOR","ADMINISTRADOR","CAPTURISTA");
    $pagina->limitar_acceso($acceso_perfiles);

    $pagina->pagina_inicio();

?>

<!-- ===================================================================================================== -->
<div class="panel panel-danger">
  <div class="panel-heading">
    <h3 class="panel-title">
    <i class="icofont-police icofont-lg"></i>&nbsp; Personal de Empresas de Seguridad Privada
    </h3>
  </div>
  <div class="panel-body" style="padding:5px;">
      <div style="border-bottom:1px solid #ccc; padding: 6px;">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-search fa-lg"></i>&nbsp;</span>
          <input id="txtBuscar" name="txtBuscar" class="form-control input-lg mayusculas" placeholder="Buscar por No. de Empleado, Nombre o CURP" type="text" minlength="5" maxlength="100" autocomplete="off" required="">
          <span class="input-group-btn">
            <button id="btnActualizar" type="button" class="btn btn-default btn-lg"><i class="fa fa-refresh"></i> Actualizar</button>
            <button id="btnAgregar" type="button" class="btn btn-success btn-lg"><i class="fa fa-plus-circle"></i>&nbsp; Agregar</button>
          </span>
        </div>
      </div>

      <div class="table-responsive"  style="font-size:12px; padding-top:5px;min-height:400px;">
        <table id="tablaPersonal" class="table cell-border table-hover stripe compact" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">No. EMPLEADO</th>
              <th class="text-center">NOMBRE COMPLETO</th>
              <th class="text-center">SEXO</th>
              <th class="text-center">F. NACIMIENTO</th>
              <th class="text-center">CURP</th>
              <th class="text-center">CUIP</th>
              <th class="no-sort text-center" title="Editar"><li class="fa fa-edit"></li></th>
              <th class="no-sort text-center" title="Impimir"><li class="fa fa-print"></li></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="1" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="2" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="3" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="4" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="5" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="6" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="7" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="8" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
            </tr>
          </thead>
          <tfoot>
          <tr>
              <th class="text-center">ID</th>
              <th class="text-center">No. EMPLEADO</th>
              <th class="text-center">NOMBRE COMPLETO</th>
              <th class="text-center">F. NACIMIENTO</th>
              <th class="text-center">SEXO</th>
              <th class="text-center">CURP</th>
              <th class="text-center">CUIP</th>
              <th class="no-sort text-center" title="Editar"><li class="fa fa-edit"></li></th>
              <th class="no-sort text-center" title="Impimir"><li class="fa fa-print"></li></th>
            </tr>
          </tfoot>
        </table>
      </div>
  </div>
  <div class="panel-footer">
    &nbsp;
  </div>
</div>
<!-- ===================================================================================================== -->
<!-- Ventanas Modales  -->
<div class="modal fade" id="modal-busquedas" tabindex="-1" role="dialog"  data-keyboard="false">
  <div class="modal-dialog modal-lg" style="width:80%;">
    <div class="modal-content">
      <div class="modal-header alert-info">
        <button type="button" class="close" data-dismiss="modal"  title="Cerra Ventana">
          <i style="color:#F00; margin-top:4px;" class="fa fa-times-circle fa-lg"></i>
        </button>
        <i class="fa fa-user-circle fa-lg"></i> &nbsp; <span class="titulo-modal" style="font-size: 1.2em;">Búsqueda de Personal</span>
      </div>
      <div class="modal-body" style="min-height: 400px;">
        <div style="border-bottom:1px solid #ccc; padding: 6px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-search fa-lg"></i>&nbsp;</span>
            <input id="txtBuscarPersonal" name="txtBuscarPersonal" class="form-control input-lg mayusculas" placeholder="Buscar No. de Empleado, Nombre o CURP" type="text" minlength="4" maxlength="100" autocomplete="off" required="">

            <span class="input-group-btn">
              <button id="btnLimpiarBusqueda" type="button" class="btn btn-default btn-lg" title="Limpiar Búsqueda"><i class="fa fa-refresh fa-lg"></i></button>
            </span>
          </div>
        </div>

        <div id="loadingBusqueda" style="text-align:center;margin-top:40px;display:none;">
          <img src="views/images/loading.gif" alt="">
          <br>
          <p style="color:#CCC; margin-top:10px;">Cargando Datos del Personal</p>
        </div>

        <div class="table-responsive table-personal oculto" style="font-size:12px; padding-top:5px;">
          <table id="tablaPersonal" class="table cell-border table-hover stripe compact" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">No. EMPLEADO</th>
                <th class="text-center">NOMBRE/CURP</th>
                <th class="text-center">FECHA NAC./SEXO</th>
                <th class="text-center">CATEGORIA/FUNCIÓN</th>
                <th class="text-center">AREA</th>
                <th class="no-sort text-center" title="Opciones"><li class="fa fa-check-circle"></li></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="1" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="2" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="3" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="4" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="5" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
                <td style="padding:2px 1px 2px 1px;"><input type="text" id="6" class="search-input-personal mayusculas" style="width:100%; background-color: #F5F6CE;" disabled></td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">No. EMPLEADO</th>
                <th class="text-center">NOMBRE/CURP</th>
                <th class="text-center">FECHA NAC./SEXO</th>
                <th class="text-center">CATEGORIA/FUNCIÓN</th>
                <th class="text-center">AREA</th>
                <th class="no-sort text-center" title="Opciones"><li class="fa fa-check-circle"></li></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="ModalPreviewPDF" tabindex="-1" role="dialog"  data-keyboard="false">
  <div class="modal-dialog modal-lg" style="width: 60%;">
    <div class="modal-content">
      <div class="modal-header alert-info">
        <button type="button" class="close" data-dismiss="modal" >
          <i style="color:#F00;" class="fa fa-times-circle"></i>
        </button>
        <i class="fa fa-info-circle fa-lg"></i> &nbsp; <span class="titulo-modal" style="font-size: 1.3em;"></span>
      </div>
      <div class="modal-body" style="min-height: 500px;">
        <iframe id="FramePDFjs" class="page-icon preview-pane" frameborder="0" height="500" src=""
          style="width: 100%;"></iframe>
      </div>
      <div class="modal-footer alert-info">
        <button type="button" class="btn btn-default btn-lg" data-dismiss="modal"><i
            class="fa fa-times-circle fa-lg"></i>&nbsp; Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="ModalLoading" tabindex="-1" role="dialog"  data-backdrop="static"
  data-keyboard="false">
  <div
    style="width:100px;height:50px;position: fixed;top: 50%;left: 50%;margin-top: -100px;margin-left: -100px; color:#FFF"
    class="text-center">
    <i class="fa fa-spinner fa-pulse fa-4x "></i>
    <p>Generando Archivo</p>
  </div>
</div>

<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>