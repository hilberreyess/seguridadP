<?php
   session_start();
   include 'models/sesion_check.php';
   include 'template.php';

    $parametros = array('titulo' => 'Catálogo de Armas',
                       'scripts' => array('<link  href="views/plugins/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">',
                                          '<script src="views/plugins/bootstrap-select/dist/js/bootstrap-select.min.js"></script>',
                                          '<script src="views/plugins/bootstrap-select/dist/js/i18n/defaults-es_ES.js"></script>',
                                          '<script src="views/plugins/moment-with-locales.js"></script>',
                                          '<link href="views/plugins/jquery-ui-1.9.2/css/ui-smoothness/jquery-ui.min.css" rel="stylesheet">',
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
    <i class="fa fa-shield"></i>&nbsp; Catálogo de Armas Registradas
    </h3>
  </div>
  <div class="panel-body" style="padding:5px;">
        <div style="border-bottom:1px solid #ccc; padding: 6px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-search-plus fa-lg"></i>&nbsp;</span>
            <input id="txtBuscar" name="txtBuscar" class="form-control input-lg mayusculas" placeholder="Buscar por matrícula, folio o empresa" type="text" minlength="3" maxlength="100" autocomplete="off" required>
            <span class="input-group-btn">
              <button id="btnActualizar" type="button" class="btn btn-default btn-lg"><i class="fa fa-refresh"></i> Actualizar</button>
              <button id="btnAgregar" type="button" class="btn btn-success btn-lg"><i class="fa fa-plus-circle"></i>&nbsp; Registrar Arma</button>
            </span>
          </div>
        </div>

      <div class="table-responsive" style="font-size:13px; padding-top:5px;min-height:400px;">
        <table id="tablaArmas" class="table cell-border table-hover stripe compact" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">MATRÍCULA</th>
              <th class="text-center">FOLIO</th>
              <th class="text-center">EMPRESA</th>
              <th class="text-center">TIPO</th>
              <th class="text-center">MODELO</th>
              <th class="text-center">CALIBRE</th>
              <th class="text-center">MUNICIONES</th>
              <th class="text-center">ESTRIAMIENTO</th>
              <th class="text-center">ESTATUS</th>
              <th class="no-sort text-center" title="Opciones"><i class="fa fa-cogs"></i></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="0" class="search-input" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="1" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="2" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="3" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="4" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="5" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="6" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="7" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="8" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="9" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">MATRÍCULA</th>
              <th class="text-center">FOLIO</th>
              <th class="text-center">EMPRESA</th>
              <th class="text-center">TIPO</th>
              <th class="text-center">MODELO</th>
              <th class="text-center">CALIBRE</th>
              <th class="text-center">MUNICIONES</th>
              <th class="text-center">ESTRIAMIENTO</th>
              <th class="text-center">ESTATUS</th>
              <th class="no-sort text-center" title="Opciones"><i class="fa fa-cogs"></i></th>
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

<!-- Modal para agregar/editar armas -->
<div class="modal fade" id="modal-arma" tabindex="-1" role="dialog" data-backdrop="true" data-keyboard="false">
  <form id="form-arma" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="off" data-toggle="validator">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header alert-danger" style="font-size:18px;">
          <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times-circle text-danger"></i></button>
          <i class="fa fa-shield fa-lg"></i> &nbsp;
          <span class="titulo-modal">Nueva Arma</span>
        </div>
        <div class="modal-body" style="padding:5px;">
          <fieldset>
            <input type="hidden" id="Token_CSRF" name="TokenCSRF" value="<?php echo $_SESSION['Token_CSRF']; ?>">
            <input type="hidden" id="hOperacion" name="hOperacion" value="agregar">
            <input type="hidden" id="hIdArma" name="hIdArma" value="">
            
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectEmpresa">Empresa:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-building"></i></span>
                    <select id="selectEmpresa" name="selectEmpresa" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE EMPRESA --" required>
                      <?php
                        // Aquí deberías incluir las empresas desde tu base de datos
                        // Ejemplo:
                        // $empresas = obtener_empresas_desde_bd();
                        // foreach($empresas as $empresa) {
                        //   echo '<option value="'.$empresa['id_empresa'].'">'.$empresa['nombre_empresa'].'</option>';
                        // }
                        echo '<option value="1">SEGURIDAD PRIVADA DEL NORTE</option>';
                        echo '<option value="2">PROTECCIÓN INTEGRAL S.A.</option>';
                        echo '<option value="3">GUARDIANES CORPORATIVOS</option>';
                      ?>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectTipoArma">Tipo de Arma:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-shield"></i></span>
                    <select id="selectTipoArma" name="selectTipoArma" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE TIPO --" required>
                      <?php
                        // Aquí deberías incluir los tipos de armas desde tu base de datos
                        // Ejemplo:
                        // $tipos = obtener_tipos_armas_desde_bd();
                        // foreach($tipos as $tipo) {
                        //   echo '<option value="'.$tipo['id_tipo'].'">'.$tipo['tipo'].'</option>';
                        // }
                        echo '<option value="1">PISTOLA</option>';
                        echo '<option value="2">REVOLVER</option>';
                        echo '<option value="3">ESCOPETA</option>';
                        echo '<option value="4">RIFLE</option>';
                      ?>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectModeloArma">Modelo:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-tag"></i></span>
                    <select id="selectModeloArma" name="selectModeloArma" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE MODELO --" required>
                      <?php
                        // Aquí deberías incluir los modelos de armas desde tu base de datos
                        // Ejemplo:
                        // $modelos = obtener_modelos_armas_desde_bd();
                        // foreach($modelos as $modelo) {
                        //   echo '<option value="'.$modelo['id_modelo'].'">'.$modelo['modelo'].'</option>';
                        // }
                        echo '<option value="1">GLOCK 17</option>';
                        echo '<option value="2">BERETTA 92</option>';
                        echo '<option value="3">COLT 1911</option>';
                        echo '<option value="4">SMITH & WESSON M&P</option>';
                      ?>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectCalibre">Calibre:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-bullseye"></i></span>
                    <select id="selectCalibre" name="selectCalibre" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE CALIBRE --" required>
                      <?php
                        // Aquí deberías incluir los calibres desde tu base de datos
                        // Ejemplo:
                        // $calibres = obtener_calibres_desde_bd();
                        // foreach($calibres as $calibre) {
                        //   echo '<option value="'.$calibre['id_calibre'].'">'.$calibre['calibre'].'</option>';
                        // }
                        echo '<option value="1">9mm</option>';
                        echo '<option value="2">.45 ACP</option>';
                        echo '<option value="3">.38 Special</option>';
                        echo '<option value="4">.40 S&W</option>';
                      ?>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtMatricula">Matrícula:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-barcode"></i></span>
                    <input id="txtMatricula" name="txtMatricula" class="form-control mayusculas" placeholder="Matrícula del arma" type="text" maxlength="50" autocomplete="off" required>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtFolio">Folio:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-file-text-o"></i></span>
                    <input id="txtFolio" name="txtFolio" class="form-control mayusculas" placeholder="Folio del arma" type="text" maxlength="50" autocomplete="off" required>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtMuniciones">Municiones:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-circle"></i></span>
                    <input id="txtMuniciones" name="txtMuniciones" class="form-control mayusculas" placeholder="Tipo de municiones" type="text" maxlength="50" autocomplete="off">
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtEstriamiento">Estriamiento:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-circle-o"></i></span>
                    <input id="txtEstriamiento" name="txtEstriamiento" class="form-control mayusculas" placeholder="Tipo de estriamiento" type="text" maxlength="50" autocomplete="off">
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectEstatus">Estatus:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-check-circle"></i></span>
                    <select id="selectEstatus" name="selectEstatus" class="form-control selectpicker show-tick" required>
                      <option value="1" selected>ACTIVA</option>
                      <option value="0">INACTIVA</option>
                      <option value="2">EN MANTENIMIENTO</option>
                      <option value="3">BAJA</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="modal-footer alert-danger">
          <!-- Icon Loading -->
          <div class="pull-left text-danger oculto loading">
            <i class="fa fa-spinner fa-lg fa-pulse"></i>&nbsp; <span class="">Guardando ...</span>
          </div>
          <!-- Button  Guardar-->
          <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
          <button id="btnGuardarArma" name="btnGuardarArma" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
        </div>
      </div>
    </div>
  </form>              
</div>

<!-- Script para manejar la funcionalidad -->
<script>
$(document).ready(function() {
    // Inicializar DataTable
    var tablaArmas = $('#tablaArmas').DataTable({
        "ajax": {
            "url": "controllers/armas_controller.php?accion=listar",
            "type": "POST",
            "data": {TokenCSRF: '<?php echo $_SESSION['Token_CSRF']; ?>'}
        },
        "columns": [
            {"data": "id_arma", "className": "text-center"},
            {"data": "matricula", "className": "text-center"},
            {"data": "folio", "className": "text-center"},
            {"data": "empresa_nombre", "className": "text-center"},
            {"data": "tipo_nombre", "className": "text-center"},
            {"data": "modelo_nombre", "className": "text-center"},
            {"data": "calibre_nombre", "className": "text-center"},
            {"data": "municiones", "className": "text-center"},
            {"data": "estriamiento", "className": "text-center"},
            {"data": "estatus", "className": "text-center", 
             "render": function(data, type, row) {
                switch(data) {
                    case '0': return '<span class="label label-danger">INACTIVA</span>';
                    case '1': return '<span class="label label-success">ACTIVA</span>';
                    case '2': return '<span class="label label-warning">EN MANTENIMIENTO</span>';
                    case '3': return '<span class="label label-default">BAJA</span>';
                    default: return '<span class="label label-info">DESCONOCIDO</span>';
                }
             }},
            {"data": null, "className": "text-center", 
             "render": function(data, type, row) {
                return '<div class="btn-group">' +
                       '<button class="btn btn-xs btn-primary btn-editar" title="Editar"><i class="fa fa-pencil"></i></button>' +
                       '<button class="btn btn-xs btn-info btn-historial" title="Historial"><i class="fa fa-history"></i></button>' +
                       '</div>';
             }}
        ],
        "order": [[1, "asc"]],
        "language": {
            "url": "views/plugins/datatables/Spanish.json"
        }
    });
    
    // Aplicar búsqueda por columnas
    $('#tablaArmas thead tr:eq(1) td').each(function(i) {
        $('input', this).on('keyup change', function() {
            if (tablaArmas.column(i).search() !== this.value) {
                tablaArmas.column(i).search(this.value).draw();
            }
        });
    });
    
    // Botón Agregar
    $('#btnAgregar').click(function() {
        $('#hOperacion').val('agregar');
        $('#hIdArma').val('');
        $('#form-arma')[0].reset();
        $('.titulo-modal').text('Registrar Nueva Arma');
        $('#modal-arma').modal('show');
    });
    
    // Botón Editar
    $('#tablaArmas').on('click', '.btn-editar', function() {
        var data = tablaArmas.row($(this).parents('tr')).data();
        $('#hOperacion').val('editar');
        $('#hIdArma').val(data.id_arma);
        $('#selectEmpresa').val(data.id_empresa);
        $('#selectEmpresa').selectpicker('refresh');
        $('#selectTipoArma').val(data.id_tipo);
        $('#selectTipoArma').selectpicker('refresh');
        $('#selectModeloArma').val(data.id_modelo);
        $('#selectModeloArma').selectpicker('refresh');
        $('#selectCalibre').val(data.id_calibre);
        $('#selectCalibre').selectpicker('refresh');
        $('#txtMatricula').val(data.matricula);
        $('#txtFolio').val(data.folio);
        $('#txtMuniciones').val(data.municiones);
        $('#txtEstriamiento').val(data.estriamiento);
        $('#selectEstatus').val(data.estatus);
        $('#selectEstatus').selectpicker('refresh');
        $('.titulo-modal').text('Editar Arma: ' + data.matricula);
        $('#modal-arma').modal('show');
    });
    
    // Botón Historial
    $('#tablaArmas').on('click', '.btn-historial', function() {
        var data = tablaArmas.row($(this).parents('tr')).data();
        mostrarMensaje('info', 'Función de historial para el arma ' + data.matricula + ' aún no implementada');
    });
    
    // Guardar arma
    $('#form-arma').submit(function(e) {
        e.preventDefault();
        
        var formData = $(this).serialize();
        
        $('.loading').removeClass('oculto');
        $('#btnGuardarArma').prop('disabled', true);
        
        $.ajax({
            url: 'controllers/armas_controller.php?accion=guardar',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if(response.estado) {
                    tablaArmas.ajax.reload(null, false);
                    $('#modal-arma').modal('hide');
                    mostrarMensaje('success', response.mensaje);
                } else {
                    mostrarMensaje('error', response.mensaje);
                }
            },
            complete: function() {
                $('.loading').addClass('oculto');
                $('#btnGuardarArma').prop('disabled', false);
            }
        });
    });
    
    // Actualizar tabla
    $('#btnActualizar').click(function() {
        tablaArmas.ajax.reload();
        mostrarMensaje('info', 'Tabla de armas actualizada');
    });
    
    // Función para mostrar mensajes
    function mostrarMensaje(tipo, mensaje) {
        var icono = '';
        var clase = '';
        
        switch(tipo) {
            case 'success':
                icono = 'fa-check-circle';
                clase = 'alert-success';
                break;
            case 'error':
                icono = 'fa-times-circle';
                clase = 'alert-danger';
                break;
            case 'info':
                icono = 'fa-info-circle';
                clase = 'alert-info';
                break;
            default:
                icono = 'fa-info-circle';
                clase = 'alert-info';
        }
        
        var html = '<div class="alert ' + clase + ' alert-dismissible" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">' +
                   '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                   '<h4><i class="icon fa ' + icono + '"></i> ' + (tipo == 'success' ? 'Éxito!' : (tipo == 'error' ? 'Error!' : 'Información')) + '</h4>' +
                   mensaje +
                   '</div>';
        
        $('body').append(html);
        
        setTimeout(function() {
            $('.alert').alert('close');
        }, 5000);
    }
    
    // Cargar modelos según tipo de arma seleccionado
    $('#selectTipoArma').change(function() {
        var idTipo = $(this).val();
        
        if(idTipo) {
            $.ajax({
                url: 'controllers/armas_controller.php?accion=cargar_modelos',
                type: 'POST',
                data: {id_tipo: idTipo, TokenCSRF: '<?php echo $_SESSION['Token_CSRF']; ?>'},
                dataType: 'json',
                success: function(response) {
                    if(response.estado) {
                        $('#selectModeloArma').empty();
                        $.each(response.modelos, function(key, value) {
                            $('#selectModeloArma').append('<option value="' + value.id_modelo + '">' + value.modelo + '</option>');
                        });
                        $('#selectModeloArma').selectpicker('refresh');
                    }
                }
            });
        }
    });
});
</script>

<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>