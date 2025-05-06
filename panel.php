<?php
   session_start();
    include 'models/sesion_check.php';
    include 'template.php';

    $parametros = array('titulo' => 'Panel de Inicio',
                       'scripts' => array(),
                       'datatables' => 'false'
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
      <i class="fa fa-home fa-lg"></i>&nbsp; Panel Principal
    </h3>
  </div>
  <div class="panel-body" style="min-height: 500px;">
    <div class="row">
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
        <div class="panel panel-default panel-empresas">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-5">
                <i class="icofont icofont-building-alt icofont-5x"></i>
              </div>
              <div class="col-xs-7  text-center">
                <p class="announcement-heading totalEmpresas" style="font-size:1.5em;">0000</p>
                <p class="announcement-text">Empresas</p>
              </div>
            </div>
          </div>
          <a href="esp-empresas.php">
            <div class="panel-footer announcement-bottom">
              <div class="row">
                <div class="col-xs-10">
                  Plantilla de Empresas
                </div>
                <div class="col-xs-2 text-right">
                  <i class="fa fa-arrow-circle-right fa-lg"></i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
        <input type="hidden" id="Token_CSRF" name="TokenCSRF" value="<?php echo $_SESSION['Token_CSRF']; ?>">
        <div class="panel panel-default panel-personal">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-5">
                <i class="icofont icofont-police icofont-5x"></i>
              </div>
              <div class="col-xs-7 text-center">
                <p class="announcement-heading totalActivos" style="font-size:1.5em;">0000</p>
                <p class="announcement-text">Personal Activo</p>
              </div>
            </div>
          </div>
          <a href="esp-personal.php">
            <div class="panel-footer announcement-bottom">
              <div class="row">
                <div class="col-xs-10">
                  Plantilla de Personal
                </div>
                <div class="col-xs-2 text-right">
                  <i class="fa fa-arrow-circle-right fa-lg"></i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
        <div class="panel panel-default panel-clientes">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-5">
                <i class="fa fa-users fa-5x"></i>
              </div>
              <div class="col-xs-7 text-center">
                <p class="announcement-heading totalClientes" style="font-size:1.5em;">0000</p>
                <p class="announcement-text">Clientes</p>
              </div>
            </div>
          </div>
          <a href="#">
            <div class="panel-footer announcement-bottom">
              <div class="row">
                <div class="col-xs-10">
                  Plantilla de Clientes
                </div>
                <div class="col-xs-2 text-right">
                  <i class="fa fa-arrow-circle-right fa-lg"></i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
        <div class="panel panel-default panel-armamento">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-5">
                <i class="icofont-pistol icofont-flip-horizontal icofont-5x"></i>
              </div>
              <div class="col-xs-7 text-center">
                <p class="announcement-heading totalArmamento" style="font-size:1.5em;">0000</p>
                <p class="announcement-text">Armamento</p>
              </div>
            </div>
          </div>
          <a href="esp-armamento.php">
            <div class="panel-footer announcement-bottom">
              <div class="row">
                <div class="col-xs-10">
                  Plantilla de Armamento
                </div>
                <div class="col-xs-2 text-right">
                  <i class="fa fa-arrow-circle-right fa-lg"></i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      </div>
      
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        Mostrar las empresas que han expirado su Fecha de Autorización y las Proximas Empresas a caducar, Avisar un mes antes 
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        Agregar Notas y recordatorios de los usuarios
      </div>
    </div>

  </div>
  <div class="panel-footer">
    &nbsp;
  </div>
</div>

<!-- ===================================================================================================== -->
<!-- Ventanas Modales  -->

<div class="modal fade" id="ModalSugerencia" tabindex="-1" role="dialog"  data-keyboard="false">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header alert-danger">
        <button type="button" class="close" data-dismiss="modal" >
          <i style="color:#F00;" class="fa fa-times-circle"></i>
        </button>
        <i class="fa fa-warning fa-lg"></i> &nbsp; <span class="titulo-modal" style="font-size:1.4em;">Se sugiere Cambio de Contraseña</span>
      </div>
      <div class="modal-body text-center" style="min-height:400px;">
        <i class="fa fa-warning text-danger" style="font-size:5em;"></i>

        <p style="margin-top:1em; font-size:2em; text-align:justify;">
          Se ha detectado que no ha cambiado su contraseña que le fue asignada, por razones de seguridad se sugiere cambiarla mediante ingresando a la opción <a href="cambiar-contrasena.php">Cambiar Contraseña</a>.
        </p> 

        <br>
        <p style="text-align:justify;">Atención: Si decide no cambiar la contraseña actual, podrá continuar trabajando de manera normal, pero este mensaje continuará mostrandose.</p>
      </div>
      <div class="modal-footer alert-danger">
        <button type="button" class="btn btn-default btn-lg" data-dismiss="modal"><i
            class="fa fa-times-circle fa-lg"></i>&nbsp; Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- ===================================================================================================== -->
<?php $pagina->pagina_fin(); ?>