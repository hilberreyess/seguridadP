<?php
	session_start();
	date_default_timezone_set("America/Mexico_City");

	/*Importamos las funciones de descifrado*/
	require_once($_SERVER['DOCUMENT_ROOT']. "/empresas-de-seguridad-privada/models/conexion.php");

	/*Obtenemos la Variable del comando a ejecutar*/
	$cmd = $_POST['xCMD'];

    try {
    		/*Verificamos que exista un a peticion segura*/
			if ($_SESSION["Token_CSRF"]===$_POST['uTokenCSRF']){
				/*Verificamos que exista el comando a ejecutar*/
				if(!isset($cmd) || empty($cmd)){
					$ajax_respuesta["error"] = "NoData";
					echo json_encode($ajax_respuesta);
				}else{
				/*=================================================================*/
					/*Aqui instrucciones de cada comando que interaccionara con el usuario del sistema*/
					switch ($cmd) {
						case "Agregar":
								sleep(1);
								/*Variables recibidas por el Metodo $_POST*/
								$xid_usuario          = $_POST["hIdUsuario"];
								//$xconsecutivo       = $_POST[""];
								$xid_usuario_perfil   = $_POST["selectPerfil"];
								$xid_area_usuario     = $_POST["selectArea"];
								$xid_grupo            = $_POST["selectGrupoArea"];
								$xbloqueado           = $_POST["selectbloqueado"];
								$xusr_nombre_completo = $_POST["txtNombreCompleto"];
								$xusr_name            = $_POST["txtusuario"];
								$xusr_mail            = $_POST["txtcorreo"];
								$xusr_pass            = sha1($_POST["txtpassword"]); //Ciframos con SHA1 la contraseña
								//$xuser_code         = $_POST[""];
								$xusr_telefono        = $_POST["txttelefono"];
								$xagregado_por        = $_SESSION['user_name'];


								/*Verificamos si el usuario ya se encuentra registrado*/
                                $sql_usr_exist= "SELECT HIGH_PRIORITY * FROM sys_usuarios WHERE usr_name=:xusr_name LIMIT 1";
                                $usr_exist = $pdo->prepare($sql_usr_exist);
                                $usr_exist->bindParam(':xusr_name', $xusr_name, PDO::PARAM_STR);
                                $usr_exist->execute();

                                if ($usr_exist->rowCount()>=1){
                                    $ajax_respuesta["agregado"] = false;
                                    $ajax_respuesta["codigo"] = "UserExist";

                                    echo json_encode($ajax_respuesta);
                                }else{
                                    //Verificar si el correo electronico ya está registrado
                                    $sql_mail_exist= "SELECT HIGH_PRIORITY * FROM sys_usuarios WHERE usr_mail=:xusr_mail LIMIT 1";
                                    $mail_exist = $pdo->prepare($sql_mail_exist);
                                    $mail_exist->bindParam(':xusr_mail', $xusr_mail, PDO::PARAM_STR);
                                    $mail_exist->execute();

                                    if ($mail_exist->rowCount()>=1){
                                        $ajax_respuesta["agregado"] = false;
                                        $ajax_respuesta["codigo"] = "MailExist";

                                        echo json_encode($ajax_respuesta);
                                    }else{
                                    	/*Si el nombre de usuario y correo no existen en la BD, entonces procederemos a registrar en nuevo usuario*/
                                		try {
                                            $sql_insert= "INSERT INTO sys_usuarios(id_usuario_perfil, id_area_usuario, id_grupo,  bloqueado, usr_nombre_completo, usr_name, usr_mail, usr_pass, usr_telefono, agregado_por) 
                                            VALUES(:xid_usuario_perfil, :xid_area_usuario, :xid_grupo, :xbloqueado, :xusr_nombre_completo, :xusr_name, :xusr_mail, :xusr_pass, :xusr_telefono, :xagregado_por)";

                                            $usr_add = $pdo->prepare($sql_insert);
                                            $usr_add->bindParam(':xid_usuario_perfil', $xid_usuario_perfil, PDO::PARAM_INT);
											$usr_add->bindParam(':xid_area_usuario', $xid_area_usuario, PDO::PARAM_INT);
											$usr_add->bindParam(':xid_grupo', $xid_grupo, PDO::PARAM_INT);
                                            $usr_add->bindParam(':xbloqueado', $xbloqueado, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xusr_nombre_completo', $xusr_nombre_completo, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xusr_name', $xusr_name, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xusr_mail', $xusr_mail, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xusr_pass', $xusr_pass, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xusr_telefono', $xusr_telefono, PDO::PARAM_STR);
                                            $usr_add->bindParam(':xagregado_por', $xagregado_por, PDO::PARAM_STR);
                                            $usr_add->execute();

                                            $isAdd = $usr_add->rowCount();

                                            if ($isAdd > 0) {
												$ajax_respuesta["agregado"] = true;
												$ajax_respuesta["rcount"] = $isAdd;

												echo json_encode($ajax_respuesta);
                                            } else {
                                                $ajax_respuesta["agregado"] = false;
                                            }
                                        }catch (Exception $e) {
											$ajax_respuesta["agregado"] = false;
											$ajax_respuesta["codigo"] = "Fail";
											$ajax_respuesta["error"]    = $e->getMessage();
                                            echo json_encode($ajax_respuesta);
                                        }
                                    }
                                }

                            //echo json_encode($ajax_respuesta);
							break;
						case "Editar":
								sleep(1);
								/*Variables recibidas por el Metodo $_POST*/
								$xid_usuario          = $_POST["hIdUsuario"];
								$xid_usuario_perfil   = $_POST["selectPerfil"];
								$xid_area_usuario     = $_POST["selectArea"];
								$xid_grupo            = $_POST["selectGrupoArea"];
								$xbloqueado           = $_POST["selectbloqueado"];
								$xusr_nombre_completo = $_POST["txtNombreCompleto"];
								$xusr_name            = $_POST["txtusuario"];
								$xusr_mail            = $_POST["txtcorreo"];
								$xusr_telefono        = $_POST["txttelefono"];
								$xusr_pass            = sha1($_POST["txtpassword"]); //Ciframos con SHA1 la contraseña
								$chkCambiarPass       = ($_POST['chkChangePassword']=="SI") ? "SI" : "NO" ;
								
								$xquien_agrego        = $_SESSION['usr_name'];
								$xfecha_edicion       = date("Y-m-d H:i:s");

								/*Aqui falta verificar si el mismo usuario esta modificando los valores de su Perfil*/
								// if ($_SESSION["id_usuario_perfil"]==1 || $_SESSION["id_usuario_perfil"]==2) {

								// }
								/*Comparar si se esta bloqeuando asi mismo*/


								/*Compara si se esta asignando un perfil con menos privilegios*/


								/*Vefificamos si se desea asignar una nueva contraseña al usuario*/
								if ($chkCambiarPass === "SI") {
									/*Actualizamos la informacion del usuario cambiando la contraseña*/
										try {
											$sql_update = "UPDATE sys_usuarios
															SET  id_usuario_perfil=:xid_usuario_perfil, id_area_usuario=:xid_area_usuario, id_grupo=:xid_grupo, bloqueado=:xbloqueado,usr_nombre_completo=:xusr_nombre_completo, usr_name=:xusr_name,usr_mail=:xusr_mail,usr_pass=:xusr_pass,usr_telefono=:xusr_telefono,fecha_edicion=:xfecha_edicion
															WHERE id_usuario=:xid_usuario";

											$usr_edit = $pdo->prepare($sql_update);

											$usr_edit->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_STR);
											$usr_edit->bindParam(':xid_usuario_perfil', $xid_usuario_perfil, PDO::PARAM_INT);
											$usr_edit->bindParam(':xid_area_usuario', $xid_area_usuario, PDO::PARAM_INT);
											$usr_edit->bindParam(':xid_grupo', $xid_grupo, PDO::PARAM_INT);
											$usr_edit->bindParam(':xbloqueado', $xbloqueado, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_nombre_completo', $xusr_nombre_completo, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_name', $xusr_name, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_mail', $xusr_mail, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_pass', $xusr_pass, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_telefono', $xusr_telefono, PDO::PARAM_STR);
											$usr_edit->bindParam(':xfecha_edicion', $xfecha_edicion, PDO::PARAM_STR);
											$usr_edit->execute();

											$actualizado = $usr_edit->rowCount();

											if ($actualizado) {
												$ajax_respuesta["editado"] = true;
											} else {
												$ajax_respuesta["editado"] = false;
											}

											//echo json_encode($ajax_respuesta);
										} catch (Exception $e) {
											$ajax_respuesta["editado"] = false;
											$ajax_respuesta["errorMessage"] = $e->getMessage();

											if (strpos($e->getMessage(), 'usr_name')) {
											    $ajax_respuesta["error"] = "usrExist";
											}

											if (strpos($e->getMessage(), 'usr_mail')) {
											    $ajax_respuesta["error"] = "mailExist";
											}

										}

										echo json_encode($ajax_respuesta);
								}else{
									/*Actualizamos informacion del usuario sin cambiar la contraseña*/
										try {
											$sql_update = "UPDATE sys_usuarios
															SET  id_usuario_perfil=:xid_usuario_perfil, id_area_usuario=:xid_area_usuario, id_grupo=:xid_grupo, bloqueado=:xbloqueado,usr_nombre_completo=:xusr_nombre_completo,usr_name=:xusr_name,usr_mail=:xusr_mail,usr_telefono=:xusr_telefono,fecha_edicion=:xfecha_edicion
															WHERE id_usuario=:xid_usuario";

											$usr_edit = $pdo->prepare($sql_update);

											$usr_edit->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_STR);
											$usr_edit->bindParam(':xid_usuario_perfil', $xid_usuario_perfil, PDO::PARAM_INT);
											$usr_edit->bindParam(':xid_area_usuario', $xid_area_usuario, PDO::PARAM_INT);
											$usr_edit->bindParam(':xid_grupo', $xid_grupo, PDO::PARAM_INT);
											$usr_edit->bindParam(':xbloqueado', $xbloqueado, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_nombre_completo', $xusr_nombre_completo, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_name', $xusr_name, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_mail', $xusr_mail, PDO::PARAM_STR);
											$usr_edit->bindParam(':xusr_telefono', $xusr_telefono, PDO::PARAM_STR);
											$usr_edit->bindParam(':xfecha_edicion', $xfecha_edicion, PDO::PARAM_STR);
											$usr_edit->execute();

											$actualizado = $usr_edit->rowCount();

											if ($actualizado) {
												$ajax_respuesta["editado"] = true;
											} else {
												$ajax_respuesta["agregado"] = false;
											}

											echo json_encode($ajax_respuesta);
										} catch (Exception $e) {
											$ajax_respuesta["editado"] = false;
											$ajax_respuesta["errorMessage"] = $e->getMessage();

											if (strpos($e->getMessage(), 'usr_name')) {
											    $ajax_respuesta["error"] = "usrExist";
											}

											if (strpos($e->getMessage(), 'usr_mail')) {
											    $ajax_respuesta["error"] = "mailExist";
											}

											echo json_encode($ajax_respuesta);
										}
								}

							break;

						case "Seleccionar":
								/*Obtenemos las variables por $_POST && $_GET*/
								$xid_usuario = $_POST['xId'];
								$ajax_respuesta["id"]=$xid_usuario;

								/*Consultamos la información del usuario seleccionado*/
								$sql_usr = "SELECT HIGH_PRIORITY *
										FROM sys_usuarios u
										WHERE id_usuario=:xid_usuario
										LIMIT 1";

								$select_usr = $pdo->prepare($sql_usr);
								$select_usr->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_STR);
								$select_usr->execute();
								$usuario = $select_usr->fetchObject();

								$ajax_respuesta["obtenido"] = true;
								$ajax_respuesta["info"] = $usuario;

								echo json_encode($ajax_respuesta);
							break;

						case "CambiarPass":
								sleep(1);
								$xid_usuario = $_SESSION["id_usuario"];
								$xActual_pass = sha1($_POST["txtPasswordNow"]);
								$xNuevo_pass  = sha1($_POST["txtNewPassword"]);

								try {
									/*Obtener información de la contraseña actual para compararla si es la misma*/
									$sql_usr = "SELECT HIGH_PRIORITY u.usr_pass
												FROM sys_usuarios u
												WHERE u.id_usuario=:xid_usuario
												LIMIT 1";

									$select_usr = $pdo->prepare($sql_usr);
									$select_usr->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_STR);
									$select_usr->execute();
									$usuario = $select_usr->fetchObject();


									/*Verificamos que la contraseña actual sea la correcta, ára evitar cambios de contraseña sin autorización*/
									if ($usuario->usr_pass === $xActual_pass) {

										/*Verificamos que la nueva contraseña sea diferente a la actual*/
										if ($usuario->usr_pass != $xNuevo_pass) {
											/*Asignar la nueva contraseña*/
											$sql_user_update = "UPDATE sys_usuarios SET usr_pass=:xNuevo_pass, fecha_password=NOW() WHERE id_usuario=:xid_usuario";
											$update_pass = $pdo->prepare($sql_user_update);
											$update_pass->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_INT);
											$update_pass->bindParam(':xNuevo_pass', $xNuevo_pass, PDO::PARAM_STR);
											$update_pass->execute();

											if($update_pass->rowCount()>=1){
												$ajax_respuesta["actualizado"] = true;
											}else{
												$ajax_respuesta["actualizado"] = false;
												$ajax_respuesta["codigo"] = "NoUpdate";
											}
										}else{
											$ajax_respuesta["actualizado"] = false;
											$ajax_respuesta["codigo"] = "PasswordActualEqual";
										}
									}else{
										$ajax_respuesta["actualizado"] = false;
										$ajax_respuesta["codigo"] = "PasswordActualNoMatch";
									}

									echo json_encode($ajax_respuesta);
								} catch (Exception $e) {
									$ajax_respuesta["error"] = $e->getMessage();
									echo json_encode($ajax_respuesta);
								}
							break;

						case "Perfil":
								$xid_usuario = $_SESSION["id_usuario"];

								try {
							    	/*Consultamos la información del usuario seleccionado*/
									$sql_usr = "SELECT HIGH_PRIORITY u.id_usuario,u.id_usuario_perfil,p.usuario_perfil,u.bloqueado,
												u.usr_nombre_completo,u.usr_name,u.usr_mail,u.usr_telefono,u.fecha_registro,u.fecha_edicion
												FROM sys_usuarios u
												JOIN cat_usuarios_perfiles p ON p.id_usuario_perfil=u.id_usuario_perfil
												WHERE u.id_usuario=:xid_usuario
												LIMIT 1";

									$select_usr = $pdo->prepare($sql_usr);
									$select_usr->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_INT);
									$select_usr->execute();
									$usuario = $select_usr->fetchObject();

									$ajax_respuesta["obtenido"] = true;
									$ajax_respuesta["info"] = $usuario;
									$ajax_respuesta["id"] = $xid_usuario;

									echo json_encode($ajax_respuesta);
								} catch (Exception $e) {
									$ajax_respuesta["error"] = $e->getMessage();
									echo json_encode($ajax_respuesta);
								}
							break;

							case "DefaultPwd":
								$xid_usuario = $_SESSION["id_usuario"];

								try {
							    	/*Consultamos la información del usuario seleccionado*/
									$sql_usr = "SELECT IF(ISNULL(fecha_password), 'NO', 'SI') AS cambio_pwd
												FROM sys_usuarios 
												WHERE id_usuario=:xid_usuario";

									$select_usr = $pdo->prepare($sql_usr);
									$select_usr->bindParam(':xid_usuario', $xid_usuario, PDO::PARAM_INT);
									$select_usr->execute();
									$usuario = $select_usr->fetchObject();

									$ajax_respuesta["cambio"] = $usuario->cambio_pwd;

									echo json_encode($ajax_respuesta);
								} catch (Exception $e) {
									$ajax_respuesta["error"] = $e->getMessage();
									echo json_encode($ajax_respuesta);
								}
							break;
					}
				/*=================================================================*/
				}
			/*Fin de Peticion Seguro CSRF*/
			}else{
				$ajax_respuesta["xcsrf"] = true;
				$ajax_respuesta["error"] ="Token no válido";
				echo json_encode($ajax_respuesta);
			}

	} catch (Exception $e) {
		$ajax_respuesta["error"] = $e->getMessage();
		echo json_encode($ajax_respuesta);
	}

?>