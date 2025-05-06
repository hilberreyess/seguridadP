<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);


include 'models/sesion_check.php';
include 'template.php';

$parametros = array('titulo' => 'Cambia contraseña de mi Usuario',
 'scripts' => array('<script src="views/plugins/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.min.js"></script>')
);

$pagina = new Plantilla($parametros);
$acceso_perfiles=array("SUPERADMINISTRADOR","ADMINISTRADOR","CAPTURISTA");
$pagina->limitar_acceso($acceso_perfiles);

$pagina->pagina_inicio();
?>

<!-- ===================================================================================================== -->
<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-offset-3 col-sm-6 col-xs-12">
  <div class="panel panel-danger">
    <div class="panel-heading">
      <h3 class="panel-title">
        <i class="fa fa-key fa-lg"></i>&nbsp; Cambiar contraseña de mi Usuario
      </h3>
    </div>
    <div class="panel-body">
      <div class="alert alert-danger text-justify" style="margin-bottom: 0px;font-size: 16px;">
        <li class="fa fa-exclamation-triangle fa-lg"></li> Al actualizar la contraseña, el sistema finalizará la sesión actual del usuario y se solicitará la nueva contraseña. Se recomienda anotar y guardar la contraseña en un lugar seguro.</strong>.
      </div>
      <br>

      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td class="col-xs-4 text-right"><strong>Nombre:</strong></td><td><span class="nombre_completo"></span></td>
              </tr>
              <tr>
                <td class="col-xs-4 text-right"><strong>Perfil:</strong></td><td><span class="perfil_usuario"></span></td>
              </tr>
              <tr>
                <td class="col-xs-4 text-right"><strong>Usuario:</strong></td><td><span class="user_name"></span></td>
              </tr>
              <tr>
                <td class="col-xs-4 text-right"><strong>Correo:</strong></td><td><span class="user_mail"></span></td>
              </tr>
              <tr>
                <td class="col-xs-4 text-right"><strong>Teléfono:</strong></td><td><span class="user_phone"></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <form id="frm-cambiar-contrasenia" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="off" data-toggle="validator">
          <fieldset>
            <input type="hidden" name="Token_CSRF" id="Token_CSRF" class="form-control" value="<?php echo $_SESSION["Token_CSRF"]; ?>">

            <div class="form-group">
              <div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-12">
                <div class="input-group">
                  <span class="input-group-addon view-password1" title="Click para mostrar la contraseña ingresada."><i class="fa fa-key fa-lg toggle-password1"></i></span>
                  <input id="txtPasswordNow" name="txtPasswordNow"  type="password" class="form-control" placeholder="Contraseña Actual" maxlength="80" autocomplete="off" required>
                </div>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-12">
                <div class="input-group">
                  <span class="input-group-addon view-password2" title="Click para mostrar la contraseña ingresada."><i class="fa fa-key fa-lg toggle-password2"></i></span>
                  <input id="txtNewPassword" name="txtNewPassword" type="password" class="form-control" placeholder="Nueva Contraseña" maxlength="80" autocomplete="off" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-12">
                <div class="input-group">
                  <span class="input-group-addon view-password3" title="Click para mostrar la contraseña ingresada."><i class="fa fa-key fa-lg toggle-password3"></i></span>
                  <input id="txtConfirmNewPassword" name="txtConfirmNewPassword" type="password" class="form-control" placeholder="Confirmar Nueva Contraseña" maxlength="80" autocomplete="off" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-1 col-md-10 col-sm-offset-1 col-sm-10 col-xs-12">
                <button type="submit" name="btn-cambiar-contrasenia" id="btn-cambiar-contrasenia" class="btn btn-round btn-success btn-block">
                  <i class="fa fa-key fa-lg"></i>&nbsp; Cambiar Contraseña
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="panel-footer">
      <span class="loading pull-left text-default oculto"><i class="fa fa-cog fa-spin fa-lg fa-fw"></i>
        <small style="margin-bottom: -4px;">Procesando ...</small>
      </span>
      &nbsp;
    </div>
  </div>
</div>



<!-- ===================================================================================================== -->
<!-- Ventanas Modales  -->
<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>