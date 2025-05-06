<?php
    session_start();

    include 'models/sesion_check.php';

    include 'template.php';
    include 'models/conexion.php';
    include 'models/catalogos.php';
    //$cat = new Catalogo($pdo);

    $parametros = array('titulo' => 'Usuarios del Sistema',
                       'scripts' => array('<link  href="views/plugins/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet">',
                                          '<script src="views/plugins/bootstrap-select/dist/js/bootstrap-select.min.js"></script>',
                                          '<script src="views/plugins/bootstrap-select/dist/js/i18n/defaults-es_ES.js"></script>',
                                          '<script src="views/plugins/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.min.js"></script>'),
                       'datatables' => 'true'
                  );

    $pagina = new Plantilla($parametros);
    $acceso_perfiles=array("SUPERADMINISTRADOR","ADMINISTRADOR");
    $pagina->limitar_acceso($acceso_perfiles);

    $pagina->pagina_inicio();
?>

<!-- ===================================================================================================== -->
<div class="panel panel-danger">
  <div class="panel-heading">
    <h3 class="panel-title">
    <i class="fa fa-users fa-lg"></i>&nbsp; Usuarios del Sistema
    </h3>
  </div>
  <div class="panel-body">
    <div style="border-bottom:1px solid #ccc; padding: 6px; margin-bottom: 4px;" class="derecha">
      <button id="btnActualizar" type="button" class="btn btn-info"><i class="fa fa-refresh"></i>&nbsp; Actualizar</button>
      <button id="btnAgregar" type="button" class="btn btn-success"><i class="fa fa-plus-circle"></i>&nbsp; Agregar &nbsp;</button>
    </div>
    <div class="table-responsive">
      <table id="tblUsuarios" class="table table-hover dataTable" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Usuario</th>
            <th class="text-left">Perfil</th>
            <th class="text-left">Área de Usuario</th>
            <th class="text-left">Correo</th>
            <th class="text-center">Teléfono</th>
            <th class="text-center">Estatus</th>
            <th class="no-sort text-center"><li class="fa fa-pencil"></li></th>
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
            <td style="padding:2px 1px 2px 1px;"><input type="text" id="7" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;" disabled></td>
            <td style="padding:2px 1px 2px 1px;"><input type="text" id="8" class="search-input mayusculas" style="width:100%; background-color: #F5F6CE;" disabled></td>
          </tr>
        </thead>
        <tfoot>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Usuario</th>
          <th class="text-left">Perfil</th>
          <th class="text-left">Área de Usuario</th>
          <th class="text-left">Correo</th>
          <th class="text-center">Teléfono</th>
          <th class="text-center">Estatus</th>
          <th class="no-sort text-center"><li class="fa fa-pencil"></li></th>
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
<div class="modal fade" id="modal-guardar-usuario" tabindex="-1" role="dialog" data-backdrop="true" data-keyboard="false">
  <form id="form-guardar-usuario" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="of">
    <div class="modal-dialog modal-xlg" style="width: 70%;">
      <div class="modal-content">
        <div class="modal-header alert-success">
          <i class="fa fa-user fa-lg"></i> &nbsp;
          <span class="titulo-modal"></span>
        </div>
        <div class="modal-body">
          <fieldset>
            <div style="border-bottom:1px solid #f4f4f4; padding: 6px;" class="derecha">
              <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
              <button id="btnGuardar" name="btnGuardar" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6">
                <input type="hidden" id="Token_CSRF" name="TokenCSRF" value="<?php echo $_SESSION['Token_CSRF']; ?>">
                <input type="hidden" id="hOperacion" name="hOperacion" value="">
                <input type="hidden" id="hIdUsuario" name="hIdUsuario" value="">

                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectbloqueado">Inicio de Sesión:</label>
                  <div class="col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-desktop"></i></span>
                      <select id="selectbloqueado" name="selectbloqueado" class="form-control selectpicker" title="-- SELECCIONE --" required>
                        <option value="NO" data-icon="fa fa-check fa-lg text-success" data-subtext="- El usuario podrá iniciar sesión">&nbsp; Permitido</option>
                        <option value="SI" data-icon="fa fa-ban fa-lg text-danger" data-subtext="- El usuario no podrá iniciar sesión">&nbsp; Bloqueado</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectPerfil">Perfil de Usuario:</label>
                  <div class="col-md-8">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-users"></i></span>
                         <select id="selectPerfil" name="selectPerfil" data-size="4" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE --">
                        </select>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtNombreCompleto">Nombre Completo:</label>
                  <div class="col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-font"></i></span>
                      <input id="txtNombreCompleto" name="txtNombreCompleto" class="form-control mayusculas" placeholder="Nombre(s)   A. Paterno   A. Materno" type="text" maxlength="90" autocomplete="off" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectArea">Área de Usuario:</label>
                  <div class="col-md-8">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-building-o"></i></span>
                         <select id="selectArea" name="selectArea" data-size="4" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE --">
                        </select>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="selectGrupoArea">Grupo de Área:</label>
                  <div class="col-md-8">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-sitemap"></i></span>
                         <select id="selectGrupoArea" name="selectGrupoArea" data-size="4" class="form-control selectpicker show-tick" data-live-search="true" title="-- SELECCIONE --">
                        </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <input type="hidden" name="htxtusuario" id="htxtusuario" class="form-control" value="">
                <input type="hidden" name="htxtcorreo" id="htxtcorreo" class="form-control" value="">
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtusuario">Usuario:</label>
                  <div class="col-md-7">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user-circle"></i></span>
                      <input id="txtusuario" name="txtusuario" class="form-control" placeholder="Usuario" type="text" maxlength="20" autocomplete="off" required>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtpassword">Contraseña:</label>
                  <div class="col-md-7">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-key"></i></span>
                      <input id="txtpassword" name="txtpassword" class="form-control" placeholder="Contraseña" type="password" maxlength="30" autocomplete="off" required>
                      <span class="input-group-addon"><input id="chkChangePassword" name="chkChangePassword" class="oculto" type="checkbox" value="SI"></span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label" for="txtcorreo">Correo electrónico:</label>
                  <div class="col-md-7">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
                      <input id="txtcorreo" name="txtcorreo" class="form-control" placeholder="Correo electrónico" type="email" maxlength="50" autocomplete="off" required>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4  control-label" for="txttelefono">Teléfono:</label>
                  <div class="col-md-7">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                      <input id="txttelefono" name="txttelefono" class="form-control" placeholder="Telefono" type="text" maxlength="10" autocomplete="off" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="modal-footer">
          <span class="loading pull-left text-default oculto" style="margin-top: 5px;"><i class="fa fa-cog fa-spin fa-lg fa-fw"></i>
            <small style="margin-bottom: -4px;">Procesando ...</small>
          </span>
          <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times-circle fa-lg"></i>&nbsp; Cancelar</button>
          <button id="btnGuardar2" name="btnGuardar2" type="submit" class="btn btn-md btn-success"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Guardar</button>
        </div>
      </div>
    </div>
  </form>
</div>
<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>