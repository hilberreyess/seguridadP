<?php
    sleep(1);
    session_start();
    date_default_timezone_set("America/Mexico_City");

    // Datos de ejemplo para la simulación
    $usr     = 'juanperez';  // Usuario simulado
    $pwd     = 'contraseña123';  // Contraseña simulada
    $captcha = 'captcha_valido';  // Captcha simulado
    $xip_cliente = $_SERVER['REMOTE_ADDR'];  // IP del cliente

    // Simulación de un Captcha válido
    $_SESSION["CaptchaLogin"] = 'captcha_valido';

    // Verificación de captcha
    if ($captcha != $_SESSION["CaptchaLogin"]) {
        $ajax_respuesta["acceso"]  = false;
        $ajax_respuesta["codigo"]  = '0000000000';
        $ajax_respuesta["captcha"] = $_SESSION["CaptchaLogin"];

        echo json_encode($ajax_respuesta);
    } else {
        if (empty($usr) || empty($pwd) || empty($captcha)) {
            $ajax_respuesta["acceso"] = false;
            $ajax_respuesta["codigo"] ='0000000000';

            echo json_encode($ajax_respuesta);
        } else {
            // Simulación de la consulta a la base de datos
            // Supongamos que se encontró un usuario
            $usuario = (object) [
                'id_usuario' => 1,
                'id_usuario_perfil' => 1,
                'usuario_perfil' => 'SUPERADMINISTRADOR',
                'id_area_usuario' => 101,
                'bloqueado' => 'NO',
                'usr_nombre_completo' => 'Juan Pérez',
                'usr_name' => 'juanperez',
                'usr_mail' => 'juanperez@empresa.com',
                'usr_telefono' => '555-1234',
                'usr_pass' => sha1('contraseña123'),
            ];

            // Verificación si el usuario existe
            if ($usuario) {
                // Verificación de contraseña
                if ($usuario->usr_pass === sha1($pwd)) {
                    // Establecer las variables de sesión
                    $_SESSION['applicacion']      = "PlantillaDePersonal";
                    $_SESSION["id_usuario"]       = $usuario->id_usuario;
                    $_SESSION["id_perfil"]        = $usuario->id_usuario_perfil;
                    $_SESSION["usuario_perfil"]   = $usuario->usuario_perfil;  
                    $_SESSION["id_area_usuario"]  = $usuario->id_area_usuario;
                    $_SESSION["nombre_completo"]  = $usuario->usr_nombre_completo;
                    $_SESSION["user_name"]        = $usuario->usr_name;
                    $_SESSION["user_mail"]        = $usuario->usr_mail;
                    $_SESSION["user_phone"]       = $usuario->usr_telefono;

                    // Otras configuraciones
                    $_SESSION["presentation"] = true;
                    $_SESSION["print"]        = true;
                    $_SESSION["download"]     = false;

                    // Identificador de aplicación
                    $_SESSION['user_app']  = md5($usuario->usr_name ."|PlantillaDePersonal");

                    // Generación de token para CSRF
                    $hora = date('H:i');
                    $session_id = session_id();
                    $token = hash('sha256', uniqid().$session_id.$_SESSION["id_usuario"]);
                    $_SESSION["Token_CSRF"] = $token;

                    // Registro en bitácora (simulado)
                    $sqlBitacora = "INSERT INTO sys_bitacora (usuario, operacion, detalles, ip_cliente) 
                                    VALUES(:usr,'Login','El Usuario Inicio Sesión Correctamente',:xip_cliente)";
                    // Simula el registro de la bitácora
                    // $bitacora = $pdo->prepare($sqlBitacora);
                    // $bitacora->bindParam(':usr', $usr, PDO::PARAM_STR);
                    // $bitacora->bindParam(':xip_cliente', $xip_cliente, PDO::PARAM_STR);
                    // $bitacora->execute();

                    // Respuesta exitosa
                    $ajax_respuesta["acceso"] = true;
                    $ajax_respuesta["info"]   = $_SESSION;
                    $ajax_respuesta["codigo"] = '0A7AB51C74';

                    echo json_encode($ajax_respuesta);

                    header('Location: panel.php');
                } else {
                    // Contraseña incorrecta
                    $ajax_respuesta["acceso"] = false;
                    $ajax_respuesta["codigo"] = '48041FDC64';

                    echo json_encode($ajax_respuesta);
                }
            } else {
                // Usuario no existe
                $ajax_respuesta["acceso"] = false;
                $ajax_respuesta["codigo"] = 'CE1F1E2618';

                echo json_encode($ajax_respuesta);
            }
        }
    }
?>