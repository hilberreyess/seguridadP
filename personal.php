<?php
   session_start();
   include 'models/sesion_check.php';
   include 'template.php';

    $parametros = array('titulo' => 'Plantilla de Personal',
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
    //$pagina->limitar_acceso($acceso_perfiles);

    $pagina->pagina_inicio();

?>

<!-- ===================================================================================================== -->
<div class="panel panel-danger">
  <div class="panel-heading">
    <h3 class="panel-title">
    <i class="fa fa-users"></i>&nbsp; Plantilla de Personal
    </h3>
  </div>
  <div class="panel-body" style="padding:5px;">
        <div style="border-bottom:1px solid #ccc; padding: 6px;">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-search-plus fa-lg"></i>&nbsp;</span>
            <input id="txtBuscar" name="txtBuscar" class="form-control input-lg mayusculas" placeholder="Buscar por Nombre, curp o no. de empleado" type="text" minlength="5" maxlength="100" autocomplete="off" required="">
            <span class="input-group-btn">
              <button id="btnActualizar" type="button" class="btn btn-default btn-lg"><i class="fa fa-refresh"></i> Actualizar</button>
              <button id="btnAgregar" type="button" class="btn btn-success btn-lg"><i class="fa fa-user-plus"></i>&nbsp; Agregar</button>
            </span>
          </div>
        </div>

      <div class="table-responsive" style="font-size:13px; padding-top:5px;min-height:400px;">
        <table id="tablaPersonal" class="table cell-border table-hover stripe compact" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">No. ID</th>
              <th class="text-center">NOMBRE COMPLETO</th>
              <th class="text-center">CATEGORÍA</th>
              <th class="text-center">EMPRESA</th>
              <th class="text-center">FOTO</th>
              <th class="text-center">FIRMA</th>
              <th class="text-center">HUELLA</th>
              <th class="text-center">MUNICIPIO</th>
              <th class="no-sort text-center" title="Opciones"><li class="fa fa-cogs"></li></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="0" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="1" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="2" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="3" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="4" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="5" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="6" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="7" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;"></td>
              <td style="padding:2px 1px 2px 1px;"><input type="text" id="8" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;" disabled></td>
            </tr>
          </thead>
          <tfoot>
          <tr>
              <th class="text-center">ID</th>
              <th class="text-center">NOMBRE COMPLETO</th>
              <th class="text-center">FECHA NAC.</th>
              <th class="text-center">SEXO</th>
              <th class="text-center">CATEGORIA</th>
              <th class="text-center">FUNCIÓN</th>
              <th class="text-center">CARGO</th>
              <th class="text-center">MUNICIPIO</th>
              <th class="no-sort text-center" title="Opciones"><li class="fa fa-cogs"></li></th>
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
<div class="modal fade" id="modal-agregar-vacaciones" tabindex="-1" role="dialog" data-backdrop="true" data-keyboard="false">
  <form id="form-guardar-vacaciones" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="of" data-toggle="validator">
    <div class="modal-dialog modal-lg" style="width: 80%;">
      <div class="modal-content">
        <div class="modal-header alert-warning" style="font-size:18px;">
          <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times-circle text-danger"></i></button>
          <i class="fa fa-plane fa-lg"></i> &nbsp;
          <span class="titulo-modal"></span>
        </div>
        <div class="modal-body" style="padding:5px;">
          <fieldset>
            <input type="hidden" id="Token_CSRF" name="TokenCSRF" value="<?php echo $_SESSION['Token_CSRF']; ?>">
            <input type="hidden" id="hOperacionVacaciones" name="hOperacionVacaciones" value="">
            <input type="hidden" id="hIdPersonalVacaciones" name="hIdPersonalVacaciones" value="">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="border-bottom:1px solid #DDD; margin-bottom:10px; padding: 6px;">
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="margin-top:-8px;">
                <table style="font-size: 17px;">
                  <tr>
                    <td style="font-weight:bold; text-align:right;">No. de Empleado:</td>
                    <td style="padding-left:5px;color:#DBA901;"><span class="infoNoEmpleadoVacaciones"></span></td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; text-align:right;">Nombre:</td>
                    <td style="padding-left:5px;color:#DBA901;"><span class="infoNombreVacaciones"></span></td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
                <button id="btnGuardar" name="btnGuardar" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectAnnio">Año Periodo:</label>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-check-o"></i></span>
                    <select id="selectAnnio" name="selectAnnio" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE --" required>
                      <?php
                        $annio = date("Y");
                        for ($i=($annio-1); $i<=($annio+1); $i++) {
                          if ($i==$annio) {
                            echo '<option value="'.$i.'" selected>'.$i.'</option>';
                          }else{
                            echo '<option value="'.$i.'">'.$i.'</option>';
                          }
                        }
                      ?>
                    </select>
                  </div>
                </div>
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="selectPeriodo">Periodo:</label>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-check-o"></i></span>
                    <select id="selectPeriodo" name="selectPeriodo" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE --" required>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtFechaInicio">Fecha de Incio:</label>
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaInicio" name="txtFechaInicio" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly>
                  </div>
                </div>                
              </div>

              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtFechaTermina">Fecha Termina:</label>
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaTermina" name="txtFechaTermina" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtDias">Días a Disfrutar:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-minus-o"></i></span>
                    <input id="txtDias" name="txtDias" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtSePresenta">Se Presenta:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-check-o"></i></span>
                    <input id="txtSePresenta" name="txtSePresenta" class="form-control mayusculas" placeholder="" type="text" maxlength="100" autocomplete="off" value="">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectBiometricoVacaciones">Biometrico:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-barcode"></i></span>
                      <select id="selectBiometricoVacaciones" name="selectBiometricoVacaciones" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="1">SI CHECA CON BIOMETRICO</option>      
                        <option value="2">NO CHECA CON BIOMETRICO</option>                         
                      </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectDirectorVacaciones">Director:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user-circle"></i></span>
                      <select id="selectDirectorVacaciones" name="selectDirectorVacaciones" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="">-- SELECCIONE UNA OPCIÓN --</option>                            
                      </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectAutorizaVacaciones">Autorizó:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user-circle-o"></i></span>
                      <select id="selectAutorizaVacaciones" name="selectAutorizaVacaciones" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="">-- SELECCIONE UNA OPCIÓN --</option>
                            
                      </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtFechaEmision">Fecha Emisión:</label>
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaEmision" name="txtFechaEmision" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtObservaciones">Observaciones:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-commenting-o"></i></span>
                    <textarea id="txtObservaciones" name="txtObservaciones" class="form-control mayusculas" placeholder="" maxlength="20"  cols="30" rows="4" autocomplete="off" style="resize: none;"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="modal-footer alert-warning">
          <!-- Icon Loading -->
          <div class="pull-left text-danger oculto loading">
            <i class="fa fa-spinner fa-lg fa-pulse"></i>&nbsp; <span class="">Guardando ...</span>
          </div>
          <!-- Button  Guardar-->
          <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
          <button id="btnGuardar2" name="btnGuardar2" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
        </div>
      </div>
    </div>
  </form>              
</div>


<div class="modal fade" id="modal-agregar-licencias" tabindex="-1" role="dialog" data-backdrop="true" data-keyboard="false">
  <form id="form-guardar-licencias" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="of" data-toggle="validator">
    <div class="modal-dialog modal-lg" style="width:90%;">
      <div class="modal-content">
        <div class="modal-header alert-danger" style="font-size:18px;">
          <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times-circle text-danger"></i></button>
          <i class="fa fa-file-text-o fa-lg"></i> &nbsp;
          <span class="titulo-modal">Agregar Licencia Económica</span>
        </div>
        <div class="modal-body" style="padding: 5px;">
          <fieldset>
            <input type="hidden" id="Token_CSRF" name="TokenCSRF" value="<?php echo $_SESSION['Token_CSRF']; ?>">
            <input type="hidden" id="hOperacionLicencia" name="hOperacionLicencia" value="Agregar">
            <input type="hidden" id="hIdPersonalLicencia" name="hIdPersonalLicencia" value="">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"  style="border-bottom:1px solid #DDD; margin-bottom:10px; padding: 6px;">
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" style="margin-top:-8px;">
                <table style="font-size: 17px;">
                  <tr>
                    <td style="font-weight:bold; text-align:right;">No. de Empleado:</td>
                    <td style="padding-left:5px;color:#d43f3a;"><span class="infoNoEmpleadoLicencia"></span></td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; text-align:right;">Nombre:</td>
                    <td style="padding-left:5px;color:#d43f3a;"><span class="infoNombreLicencia"></span></td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right" style="vertical-align: bottom;">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
                <button id="btnGuardar" name="btnGuardar" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtFechaIngreso">Fecha de Ingreso:</label>
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaIngreso" name="txtFechaIngreso" class="form-control" placeholder="" type="text" maxlength="40" autocomplete="off" readonly>
                  </div>
                </div>                
              </div>              
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtLugarCheca">Lugar Donde Checa:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-building"></i></span>
                    <input id="txtLugarCheca" name="txtLugarCheca" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="" readonly>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtComisionado">Comisionado:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-file-text-o"></i></span>
                    <input id="txtComisionado" name="txtComisionado" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="" readonly>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtOficinaPagadora">Oficina Pagadora:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-building-o"></i></span>
                    <input id="txtOficinaPagadora" name="txtOficinaPagadora" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="" readonly>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtSueldoQuincenal">Sueldo Quincenal:</label>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-dollar" style="margin-left:2px;margin-right:2px;"></i></span>
                    <input id="txtSueldoQuincenal" name="txtSueldoQuincenal" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="" readonly>
                  </div>
                </div>                
              </div>

              <hr>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtFechaInicioLicencia">Fecha de Incia:</label>
                <div class="col-lg-5 col-md-5 col-sm-5">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaInicioLicencia" name="txtFechaInicioLicencia" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly required>
                  </div>
                </div>                
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtFechaFinLicencia">Fecha Fin:</label>
                <div class="col-lg-5 col-md-5 col-sm-5">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaFinLicencia" name="txtFechaFinLicencia" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtTotalDiasLicencia">Total de Días:</label>
                <div class="col-lg-5 col-md-5 col-sm-5">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-check-o"></i></span>
                    <input id="txtTotalDiasLicencia" name="txtTotalDiasLicencia" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" value="" readonly required>
                    <span class="input-group-addon" style="background-color:#FFF;"><span class="tDiasLicencia">DÍAS</span></span>
                  </div>
                </div>
              </div>
            </div>
               
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtLicenciaApartirDe">Lic. a partir del:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar-minus-o"></i></span>
                    <input id="txtLicenciaApartirDe" name="txtLicenciaApartirDe" class="form-control mayusculas" placeholder="" type="text" maxlength="50" autocomplete="off" value="" required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectConSueldoLicencia">Con o Sin Sueldo:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-money"></i></span>
                    <select id="selectConSueldoLicencia" name="selectConSueldoLicencia" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="CON SUELDO">CON SUELDO</option>      
                        <option value="SIN SUELDO">SIN SUELDO</option>                         
                      </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtMotivoLicencia">Motivo:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-commenting-o"></i></span>
                    <input id="txtMotivoLicencia" name="txtMotivoLicencia" class="form-control mayusculas" placeholder="" type="text" maxlength="80" autocomplete="off" value="" required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtProrrogaLicencia">Prorroga:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                    <input id="txtProrrogaLicencia" name="txtProrrogaLicencia" class="form-control mayusculas" placeholder="" type="text" maxlength="60" autocomplete="off" value="">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectDirectorLicencia">Director:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user-circle"></i></span>
                      <select id="selectDirectorLicencia" name="selectDirectorLicencia" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="00">-- SELECCIONE UNA OPCIÓN --</option>                            
                      </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectAutorizaLicencia">Autorizó:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user-circle-o"></i></span>
                      <select id="selectAutorizaLicencia" name="selectAutorizaLicencia" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="00">-- SELECCIONE UNA OPCIÓN --</option>
                      </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="txtFechaEmisionLicencia">Fecha Emisión:</label>
                <div class="col-lg-5 col-md-5 col-sm-6">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    <input id="txtFechaEmisionLicencia" name="txtFechaEmisionLicencia" class="form-control" placeholder="" type="text" maxlength="10" autocomplete="off" readonly required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label" for="selectDirectorRHLicencia">Director RH:</label>
                <div class="col-lg-9 col-md-9 col-sm-9">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user-circle"></i></span>
                      <select id="selectDirectorRHLicencia" name="selectDirectorRHLicencia" class="form-control selectpicker show-tick" data-live-search="true" required>
                        <option value="">-- SELECCIONE UNA OPCIÓN --</option>                            
                      </select>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="modal-footer alert-danger">
          <!-- Icon Loading -->
          <div class="pull-left text-danger oculto loading2">
            <i class="fa fa-spinner fa-lg fa-pulse"></i>&nbsp; <span class="">Guardando ...</span>
          </div>
          <!-- Button  Guardar-->
          <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
          <button id="btnGuardar2" name="btnGuardar2" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
        </div>
      </div>
    </div>
  </form>              
</div>


<div class="modal fade" id="ModalPreviewPDF" tabindex="-1" role="dialog"  data-keyboard="false">
  <div class="modal-dialog modal-lg" style="min-width: 80%; max-width: fit-content;">
    <div class="modal-content">
      <div class="modal-header alert-info">
        <button type="button" class="close" data-dismiss="modal" >
          <i style="color:#F00;" class="fa fa-times-circle"></i>
        </button>
        <i class="fa fa-info-circle fa-lg"></i> &nbsp; <span class="titulo-modal" style="font-size: 1.3em;"></span>
      </div>
      <div class="modal-body" style="min-height: 500px;">
        <iframe id="FramePDFjs" class="page-icon preview-pane" frameborder="0" height="500" src="" style="width: 100%;"></iframe>
      </div>
      <div class="modal-footer alert-info">
        <button type="button" class="btn btn-default btn-lg" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="ModalLoading" tabindex="-1" role="dialog"  data-backdrop="static" data-keyboard="false">
    <div style="width:100px;height:50px;position: fixed;top: 50%;left: 50%;margin-top: -100px;margin-left: -100px; color:#FFF" class="text-center">
      <i class="fa fa-spinner fa-pulse fa-4x "></i>
      <p>Generando Archivo</p>
    </div>
</div>

<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>