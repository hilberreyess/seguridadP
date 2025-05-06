<?php
class Plantilla
{
    private $_titulo;
    private $_scripts;
    private $_footer;
    private $_datatables;

 	public function __construct($params){
		$this->_titulo     = $params['titulo'];
		$this->_scripts    = ( isset($params['scripts']) ) ? $params['scripts'] : null;
		$this->_footer     = ( isset($params['footer']) )  ? $params['footer']  : true;
		$this->_datatables = ( isset($params['datatables']) )  ? $params['datatables']  : false;
    }

    public function html_inicio(){
		echo '<!DOCTYPE html><html lang="es">';
	}

	public function head_inicio(){
		echo '<head>';
    }

    public function title_page(){
	    echo '<title>'. $this->_titulo .'</title>';
	}

    public function meta_tags(){
	    echo '<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	    <meta name="description" content="Sistema de Empresas de Seguridad Privada">
	    <meta name="subject" content="Subdirección de Software y Bases de Datos">
	    <meta name="author" content="Ing. Marco Antonio González Martinez | marcoglz@c4guerrero.gob.mx">
	    <meta name="robots" content="noindex, nofollow">
	    <meta name="googlebot" content="noindex, nofollow">
	    <meta name="classification" content="Private">
	    <meta name="copyright" content="2024">
	    <meta name="reply-to" content="software@c4guerrero.gob.mx">
	    <link rel="icon" href="favicon.ico">';
	}

	public function scripts_head(){
		echo '<link href="views/plugins/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
		    <link href="views/_css/ie10-viewport-bug-workaround.css" rel="stylesheet">
		    <link href="views/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" media="screen">
			<link href="views/plugins/icofont/icofont.min.css" rel="stylesheet">
		    <link href="views/_css/template.css?id='.rand(10,99).'" rel="stylesheet">
		    <link href="views/_css/'.str_replace('.php','.css',basename($_SERVER['PHP_SELF'])).'?id='.rand(10,99).'" rel="stylesheet">';
	}


	public function head_fin(){
		echo '</head>';
	}

	public function body_inicio(){
		echo '<body>';
	}


	public function menu(){
	    echo '<nav class="navbar navbar-custom navbar-fixed-top">
			      <div class="container navbar-custom-width">
			        <div class="navbar-header">
			          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			            <span class="sr-only">Toggle navigation</span>
			            <span class="icon-bar"></span>
			            <span class="icon-bar"></span>
			            <span class="icon-bar"></span>
			          </button>
			          <a class="navbar-brand" href="panel.php" style="padding-top:2px;padding-buttom:5px;">
					 	 <img src="views/images/logoGuerreroEscudo_25.png" class="img-responsive" alt="logo" style="width:160px;">
			          </a>
			        </div>

			        <div id="navbar" class="navbar-collapse collapse">
			          <ul class="nav navbar-nav">
			            <!-- Menu de lado Izquierdo -->
						<!-- <li><a href="panel.php"><i class="fa fa-home fa-lg"></i>&nbsp; Panel</a></li> -->
						
						<li class="dropdown empresas">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-building-alt icofont-lg"></i>&nbsp; Empresas <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Plantilla del Empresas</li>
			               		<li><a href="esp-empresas.php"><i class="icofont-building-alt icofont-lg"></i>&nbsp; Plantilla de Empresas</a></li>
		                		<li role="separator" class="divider"></li>
								<li class="dropdown-header">Plantilla de Clientes</li>
		                		<li><a href="esp-clientes.php"><i class="fa fa-users fa-lg"></i>&nbsp; Plantilla de Clientes</a></li>
							</ul> 
			            </li>
						<li class="dropdown personal">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-police icofont-lg"></i>&nbsp; Personal <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Plantilla del Personal</li>
			               		<li><a href="esp-personal.php"><i class="icofont-police icofont-lg"></i>&nbsp; Plantilla de Personal</a></li>
		                		<li role="separator" class="divider"></li>
								<li class="dropdown-header">Reingresos del Personal</li>
		                		<li><a href="#"><i class="fa fa-refresh fa-lg"></i>&nbsp; Reingresos de Personal</a></li>
							</ul>
			            </li>
						<li class="dropdown armamento">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-pistol icofont-flip-horizontal icofont-lg"></i>&nbsp; Armamento <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Inventario de Armamento</li>
			               		<li><a href="esp-armamento.php"><i class="icofont-pistol icofont-flip-horizontal icofont-lg"></i>&nbsp; Inventario de Armamento</a></li>
		                		<li role="separator" class="divider"></li>
								<li class="dropdown-header">Asignación de Armamento</li>
		                		<li><a href="#"><i class="fa fa-check-circle-o"></i>&nbsp; Asignación de Armamento</a></li>
							</ul>
			            </li>

						
						<!-- 
						<li class="dropdown vehiculos">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-police-car icofont-lg"></i>&nbsp; Vehiculos <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Inventario de Vehiculos</li>
			               		<li><a href="esp-vehiculos.php"><i class="icofont-police-car icofont-lg"></i>&nbsp; Inventario de Vehículos</a></li>
							</ul>
			            </li>
						<li class="dropdown radios">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-wifi-router icofont-lg"></i>&nbsp; Radios <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Inventario de Radios</li>
			               		<li><a href="esp-radios.php"><i class="icofont-wifi-router icofont-lg"></i>&nbsp; Inventario de Radios</a></li>
							</ul>
			            </li>
						-->


						<li class="dropdown reportes">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-file-excel icofont-lg"></i>&nbsp; Catálogo
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Gestion del Catálogo</li>
			               		<li><a href="esp-catalogo.php"><i class="fa fa-file-excel-o"></i>&nbsp; Gestion del Catálogo</a></li>
							</ul>
			            </li>';

					if ($_SESSION["id_area_usuario"]==3 && $_SESSION["id_grupo_usuario"]==5) {
						echo '
						<li class="dropdown ief">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="fa fa-address-card-o fa-lg"></i>&nbsp; I E F <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
								<li class="dropdown-header">Incidencias del Personal</li>
		                		<li><a href="incidencias.php"><i class="fa fa-user-times"></i>&nbsp; Incidencias</a></li>
								
								<li role="separator" class="divider"></li>
								<li class="dropdown-header">Evaluaciones del Personal</li>
		                		<li><a href="evaluaciones.php"><i class="fa fa-check-square-o"></i>&nbsp; Evaluaciones</a></li>

								<li role="separator" class="divider"></li>
								<li class="dropdown-header">Formación del Personal</li>
		                		<li><a href="formacion.php"><i class="fa fa-graduation-cap"></i>&nbsp; Formación</a></li>

							</ul>
			            </li>';
					}

					echo '
						<li class="dropdown ayuda">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-info-circle icofont-lg"></i>&nbsp; Ayuda <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
							|<li class="dropdown-header">Manual de Usuario</li>
		                		<li><a href="manual.php"><i class="fa fa-file-text-o"></i>&nbsp; Manual de Usuario</a></li>
								<li role="separator" class="divider"></li>
								<li class="dropdown-header">Soporte Técnico</li>
		                		<li><a href="soporte.php"><i class="fa fa-file-text-o"></i>&nbsp; Soporte Técnico</a></li>
								<li role="separator" class="divider"></li>								
								<li class="dropdown-header">Acerca del Sistema</li>
		                		<li><a href="acerca.php"><i class="fa fa-file-text-o"></i>&nbsp; Acerca del Sistema</a></li>
							</ul>
			            </li>

			          </ul>

			          <ul class="nav navbar-nav navbar-right">';

			        if ($_SESSION["id_perfil"]==1 || $_SESSION["id_perfil"]==2) {
			           echo '
						<li class="dropdown administracion">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-computer icofont-lg"></i>&nbsp; Administración <span class="caret"></span>
			              </a>
			              	<ul class="dropdown-menu">
			              		<li class="dropdown-header">Administrar Cuentas de Usuarios</li>
			               		<li><a href="usuarios.php"><i class="fa fa-users"></i>&nbsp; Usuarios del Sistema</a></li>
		                		<li role="separator" class="divider"></li>
			              		<li class="dropdown-header">Bitácora de Actividades</li>
		                		<li><a href="bitacora.php"><i class="fa fa-list-ul"></i>&nbsp; Bitácora de Actividades</a></li>
							</ul>
			            </li>
						
						<li class="dropdown usuario">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="icofont-user icofont-lg"></i>&nbsp;&nbsp; '.$_SESSION["user_name"].' <span class="caret"></span>
			              </a>
			              <ul class="dropdown-menu">
			                <li class="dropdown-header">Cambiar la contraseña de mi Usuario</li>
			                <li><a href="cambiar-contrasena.php"><i class="fa fa-key"></i>&nbsp; Cambiar Contraseña</a></li>
			                <li role="separator" class="divider"></li>
			                <li class="dropdown-header">Cerrar la Sesión de mi Usuario</li>
			                <li><a id="exit" data-href="models/logout_system.php" data-toggle="modal" data-target="#confirm-exit"><i class="fa fa-power-off"></i>&nbsp;&nbsp; Salir del Sistema</a></li>
			              </ul>
			            </li>';
					}elseif($_SESSION["id_perfil"]==3){
						echo '						
						<li class="dropdown usuario">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                <i class="fa fa-user fa-lg fa-space-right"></i>&nbsp;&nbsp; '.$_SESSION["user_name"].' <span class="caret"></span>
			              </a>
			              <ul class="dropdown-menu">
			                <li class="dropdown-header">Cambiar la contraseña de mi Usuario</li>
			                <li><a href="cambiar-contrasena.php"><i class="fa fa-key"></i>&nbsp; Cambiar Contraseña</a></li>
			                <li role="separator" class="divider"></li>
			                <li class="dropdown-header">Cerrar la Sesión de mi Usuario</li>
			                <li><a id="exit" data-href="models/logout_system.php" data-toggle="modal" data-target="#confirm-exit"><i class="fa fa-power-off"></i>&nbsp;&nbsp; Salir del Sistema</a></li>
			              </ul>
			            </li>';
					}

					echo 
			          '</ul>
			        </div>
			     </div>
			</nav>';
	}

	public function contenido_inicio(){
		echo '<!-- Modal de Cirrre de Sesión -->
        <div class="modal fade" id="confirm-exit" data-keyboard="true" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header alert-danger">
                        <i class="fa fa-power-off fa-lg"></i> &nbsp; <strong>Cerrar Sessión</strong>
                    </div>
                    <div class="modal-body text-center" style="font-size:1.5em;">
                        ¿Desea Realmente Salir del Sistema?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close fa-lg"></i>&nbsp; No, Cancelar</button>
                        <a id="btnSalir" class="btn btn-danger btn-ok"><i class="fa fa-power-off fa-lg"></i>&nbsp; Si, Salir</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Termina modal de Cierre de Sesion -->


        <div class="container container-custom-width">';
	}

	public function scripts_footer(){
	    echo '<!-- ============================================================================================================================= -->
	     	<script src="views/plugins/jquery/jquery-3.4.1.min.js"></script>
	     	<script src="views/plugins/jQueryUI/jquery-ui.min.js" type="text/javascript"></script>
			<script src="views/plugins/bootstrap-3.3.7/js/bootstrap.min.js"></script>
		    <script src="views/_js/ie10-viewport-bug-workaround.js"></script>

		    <!--[if lt IE 9]>
		    <script src="views/_js/html5shiv/3.7.3/html5shiv.min.js"></script>
		    <script src="views/_js/respond/1.4.2/respond.min.js"></script>
		    <![endif]-->

			<script src="views/plugins/sha1.min.js" type="text/javascript" ></script>
			<script src="views/plugins/base64.min.js" type="text/javascript" ></script>';

			echo '<!-- Plugins Bootstrap Notify - Notificaciones en ventanas flotantes -->
			<script src="views/plugins/bootstrap-notify/bootstrap-notify.min.js" type="text/javascript" ></script>

			<script src="views/plugins/sweetalert2/dist/sweetalert2.min.js"></script>
			<link href="views/plugins/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">

			<script src="views/_js/template.js?id='.rand(10,99).'" type="text/javascript" ></script>';

			if($this->_datatables==true){
            	echo '
		          <!-- DataTables -->
	            <script src="views/plugins/Datatables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
		         <link href="views/plugins/Datatables/DataTables-1.10.18/css/jquery.dataTables.min.css" rel="stylesheet">

	            <script src="views/plugins/Datatables/DataTables-1.10.18/js/dataTables.jqueryui.min.js"></script>
	            <link href="views/plugins/Datatables/DataTables-1.10.18/css/jquery-ui-1.12.0.smoothness/jquery-ui.min.css" rel="stylesheet">
	            <link href="views/plugins/Datatables/DataTables-1.10.18/css/dataTables.jqueryui.min.css" rel="stylesheet">
	            ';
		    }

		    if (count($this->_scripts) > 0) {
		            foreach( $this->_scripts as $script )
		                echo $script;
		        }

        echo '<script src="views/_js/'.str_replace('.php','.js',basename($_SERVER['PHP_SELF'])).'?id='.rand(10,99).'" type="text/javascript"></script>';
	}

	public function body_fin(){
		echo '</body>';
	}

	public function html_fin(){
		echo '</html>';
	}


    public function pagina_inicio(){
		$this->html_inicio();
        	$this->head_inicio();
        		$this->title_page();
        		$this->meta_tags();
        		$this->scripts_head();
        	$this->head_fin();

        	$this->body_inicio();
        		$this->menu();
        		$this->contenido_inicio();
    }

    public function pagina_fin(){
				$this->contenido_fin();
				$this->footer();
				$this->scripts_footer();
			$this->body_fin();
    	$this->html_fin();
    }

	public function contenido_fin(){
		echo '</div>';
	}

	public function footer(){
        if($this->_footer==true){
    		echo '<footer>
          <div style="margin-top: 12px;">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4  hidden-xs text-left">
              <i class="fa fa-copyrights"></i>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center" style="font-size:14px;">
				Administración de Empresas de Seguridad Privada
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4  hidden-xs text-right">
              <i class="fa fa-user"></i> <small>'.$_SESSION["nombre_completo"].'</small>
            </div>
          </div>
        </footer>';
        }
	}

	 //Funcion para limitar los accesos de los usurarios al escribir la url directa
    public function limitar_acceso($perfiles){
        if (!in_array(strtoupper($_SESSION["usuario_perfil"]), $perfiles)) {
		    session_unset();
		    $_SESSION = array();
		    session_destroy();
            header("Location: index.php");
        }
    }

	public function limitar_area($id_areas){
        if (!in_array(strtoupper($_SESSION["id_area_usuario"]), $id_areas)) {
		    session_unset();
		    $_SESSION = array();
		    session_destroy();
            header("Location: index.php");
        }
    }

	public function limitar_grupo($id_grupos){
        if (!in_array(strtoupper($_SESSION["id_grupo_usuario"]), $id_grupos)) {
		    session_unset();
		    $_SESSION = array();
		    session_destroy();
            header("Location: index.php");
        }
    }
}//Fin de la Clase Plantilla

?>