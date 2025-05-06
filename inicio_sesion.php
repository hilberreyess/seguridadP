<?php
  session_start();
  if(isset($_SESSION['user_name']) && isset($_SESSION['user_name']) && isset($_SESSION['id_perfil'])){
    header("Location: panel.php");
  }
?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Inicion de Sesión</title>
    <meta charset="utf-8">
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
    
    <link rel="icon" href="favicon.ico">
    <link href="views/plugins/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="views/_css/navbar-fixed-top.css" rel="stylesheet">
    <link rel="stylesheet" media="screen" href="views/plugins/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="views/plugins/csshake/dist/csshake-horizontal.min.css">
    <script src="views/plugins/jquery/jquery-3.4.1.min.js"></script>
    <script src="views/plugins/bootstrap-3.3.7/js/bootstrap.min.js"></script>
    <script src="views/_js/ie10-viewport-bug-workaround.min.js"></script>
    <script src="views/plugins/bootstrapvalidator-0.4.5/dist/js/bootstrapValidator.min.js"></script>
    <script src="views/plugins/bootstrap-notify/bootstrap-notify.min.js" type="text/javascript" ></script>
    <link href="views/_css/template.css" rel="stylesheet">
    <link href="views/_css/index.css" rel="stylesheet">    
    <script src="views/_js/index.js?id=<?php echo rand(10,99); ?>"></script>
  </head>
  <body>
    <div class="container login-box">
      <div class="col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4 col-xs-12">
        <div class="panel panel-danger">
          <div class="panel-heading" style="padding:0px;border-bottom:0px;">
            <div class="panel-title text-center">
              <img id="LogoLogin" src="views/images/logo_login.png" class="img-responsive" alt="" style="margin:0px auto;border:1px solid #EEE;margin-top:-10px; margin-bottom: 10px;border-top-left-radius:10px;border-top-right-radius:10px;">
            </div>
          </div>
          <div style="padding:20px 10px 20px 10px;" class="panel-body">        
            <form id="F2937274F80E2F56" action="JavaScript:void(0);" method="POST" class="form-horizontal" role="form" autocomplete="of">
              <fieldset>
                <div class="form-group">
                  <div class="col-lg-12">
                    <div class="input-group">
                      <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user fa-lg"></i></span>
                      <input id="U5ED18E48" name="U5ED18E48" type="text" class="form-control input-lg" placeholder="Usuario" maxlength="30" aria-describedby="usuario" style="font-size:1.3em" required>
                    </div>
                  </div>
                </div>              

                <div class="form-group">
                  <div class="col-lg-12">
                    <div class="input-group">
                      <span class="input-group-addon view-password" id="basic-addon1"><i class="fa fa-key toggle-password"></i></span>
                      <input id="C70625151" name="C70625151" type="password" class="form-control input-lg" placeholder="Contraseña" maxlength="30" aria-describedby="password" style="font-size:1.3em" required>
                    </div>
                  </div>
                </div>

                <hr>
                <div class="form-group">
                  <div class="col-lg-7 col-md-7 col-sm-7">
                    <div class="input-group">
                      <span class="input-group-addon view-password" id="basic-addon1"><i class="fa fa-qrcode fa-lg toggle-password"></i></span>
                      <input id="txtCaptcha" name="txtCaptcha" type="text" class="form-control mayusculas" placeholder="Código" maxlength="4" aria-describedby="password" style="font-size:1.3em" required>
                    </div>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <div class="input-group">
                      <img id="imgCaptcha" src="models/captcha.php" alt="captcha" class="form-control" style="padding:0px;">
                      <span class="input-group-addon" id="reloadCaptcha">
                        <i class="fa fa-refresh fa-lg text-danger"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-lg-12">
                    <button id="btnLoging" type="submit" class="btn btn-primary btn-lg btn-block">
                    <i class="fa fa-unlock-alt fa-lg fa-lg"></i>&nbsp; Ingresar
                    </button>
                  </div>
                </div>
              </fieldset>
              <div style="text-align: center;">
                <span class="loading text-danger" style="display: none;margin:0px auto;">
                  <i class="fa fa-cog fa-spin fa-fw"></i>
                  <small style="margin-bottom: -4px;">Conectando ...</small>
                </span>
              </div>
            </form>
            <!-- Botón "Inicio sesión prueba" -->
            <div class="form-group">
              <div class="col-lg-12">
                <a href="http://127.0.0.1/esp/sesion_start.php" class="btn btn-secondary btn-lg btn-block">Inicio sesión prueba</a>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:0.1em;text-align: center;color:#888;">
        <p style="font-size:1.2em;text-align:center;color:#888;font-weight:400;padding-bottom:-15px;margin-bottom:-2px;">Sistema de Empresas de Seguridad Privada</p>
          <small>&copy; Secretaría de Seguridad Pública Guerrero</small>
        </div>
      </div>
    </div>
  </body>
</html>
