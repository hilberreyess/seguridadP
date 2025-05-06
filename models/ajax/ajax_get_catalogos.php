<?php
	session_start();
	date_default_timezone_set("America/Mexico_City");

	require_once($_SERVER['DOCUMENT_ROOT']. "/empresas-de-seguridad-privada/models/conexion.php");

	/*Obtenemos la Variable del comando a ejecutar*/
	$cmd = $_POST['xCMD'];

    try {
		/*Verificamos que exista el comando a ejecutar*/
		if(!isset($cmd) || empty($cmd)){
			$ajax_respuesta["error"] = "NoData";
			echo json_encode($ajax_respuesta);
		}else{
			/*=================================================================*/
			/*Aqui instrucciones de cada comando que interaccionara con el usuario del sistema*/
			switch ($cmd) {
				case "cat_area_usuario":
					$areas = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_area_usuario, area_usuario
						FROM cat_area_usuario
						ORDER BY id_area_usuario ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$areas .='<option value="' . $row['id_area_usuario'].'">'.$row['area_usuario']. '</option>';
							}
						}

						$ajax_respuesta["areas"] = $areas;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_arma_calibres":
					$calibres = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_calibre, calibre
						FROM cat_arma_calibres
						ORDER BY id_calibre ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$calibres .='<option value="' . $row['id_calibre'].'">'.$row['calibre']. '</option>';
							}
						}

						$ajax_respuesta["calibres"] = $calibres;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_arma_marcas":
					$marcas = "";
					try {
						$sql = "SELECT HIGH_PRIORITY id_marca, marca, C_CLASE, C_MODELO, C_MARCA, C_MARCA_SN, estatus
						FROM cat_arma_marcas
						ORDER BY id_marca ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$marcas .='<option value="' . $row['id_marca'].'">'.$row['marca']. '</option>';
							}
						}

						$ajax_respuesta["marcas"] = $marcas;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_arma_modelos":
					$modelos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_modelo, modelo, C_CALIBRE, C_MODELO, C_MODELO_SN
						FROM cat_arma_modelos
						ORDER BY id_modelo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$modelos .='<option value="' . $row['id_modelo'].'">'.$row['modelo']. '</option>';
							}
						}

						$ajax_respuesta["modelos"] = $modelos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_arma_tipos":
					$tipos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo, tipo
						FROM cat_arma_tipos
						ORDER BY id_tipo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipos .='<option value="' . $row['id_tipo'].'">'.$row['tipo']. '</option>';
							}
						}

						$ajax_respuesta["tipos"] = $tipos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_cargos":
					$cargos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY C_CARGO_E, DESCRIPCION, TIPO_PER
						FROM cat_cargos
						ORDER BY C_CARGO_E ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$cargos .='<option value="' . $row['C_CARGO_E'].'">'.$row['DESCRIPCION']. '</option>';
							}
						}

						$ajax_respuesta["cargos"] = $cargos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_cliente_estatus":
					$estatus = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_estatus, estatus
						FROM cat_cliente_estatus
						ORDER BY id_estatus ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$estatus .='<option value="' . $row['id_estatus'].'">'.$row['estatus']. '</option>';
							}
						}

						$ajax_respuesta["estatus"] = $estatus;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_cliente_tipos":
					$tipos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo, tipo
						FROM cat_cliente_tipos
						ORDER BY id_tipo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipos .='<option value="' . $row['id_tipo'].'">'.$row['tipo']. '</option>';
							}
						}

						$ajax_respuesta["tipos"] = $tipos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_empresa_estatus":
					$estatus = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_estatus, estatus
						FROM cat_empresa_estatus
						ORDER BY id_estatus ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$estatus .='<option value="' . $row['id_estatus'].'">'.$row['estatus']. '</option>';
							}
						}

						$ajax_respuesta["estatus"] = $estatus;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_empresa_modalidad":
					$modalidad = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_modalidad, modalidad
						FROM cat_empresa_modalidad
						ORDER BY id_modalidad ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$modalidad .='<option value="' . $row['id_modalidad'].'">'.$row['modalidad']. '</option>';
							}
						}

						$ajax_respuesta["modalidades"] = $modalidad;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_empresa_tipo_permiso":
					$tipo_permiso = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo_permiso, tipo_permiso
						FROM cat_empresa_tipo_permiso
						ORDER BY id_tipo_permiso ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipo_permiso .='<option value="' . $row['id_tipo_permiso'].'">'.$row['tipo_permiso']. '</option>';
							}
						}

						$ajax_respuesta["tipo_permiso"] = $tipo_permiso;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_empresa_vigencia":
					$vigencia = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_vigencia, vigencia
						FROM cat_empresa_vigencia
						ORDER BY id_vigencia ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$vigencia .='<option value="' . $row['id_vigencia'].'">'.$row['vigencia']. '</option>';
							}
						}

						$ajax_respuesta["vigencias"] = $vigencia;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_entidades":
					$entidades = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_entidad, id_pais, entidad, abreviatura
						FROM cat_entidades
						ORDER BY id_entidad ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$entidades .='<option value="' . $row['id_entidad'].'">'.$row['entidad']. '</option>';
							}
						}

						$ajax_respuesta["entidades"] = $entidades;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_estado_civil":
					$estados_civiles = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_estado_civil, estado_civil
						FROM cat_estado_civil
						ORDER BY id_estado_civil ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$estados_civiles .='<option value="' . $row['id_estado_civil'].'">'.$row['estado_civil']. '</option>';
							}
						}

						$ajax_respuesta["estadosciviles"] = $estados_civiles;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_motivo_baja":
					$motivos_baja = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_motivo_baja, motivo_baja
						FROM cat_motivo_baja
						ORDER BY id_motivo_baja ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$motivos_baja .='<option value="' . $row['id_motivo_baja'].'">'.$row['motivo_baja']. '</option>';
							}
						}

						$ajax_respuesta["motivosbaja"] = $motivos_baja;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_municipios":
					$municipios = "";

					$xid_entidad = $_POST["xid_entidad"];
					try {
						$sql = "SELECT HIGH_PRIORITY id_municipio, municipio, id_entidad, id_region
						FROM cat_municipios
						WHERE id_entidad=:xid_entidad
						ORDER BY id_municipio ASC";
						$stmt = $pdo->prepare($sql);
						$stmt->bindParam(':xid_entidad', $xid_entidad, PDO::PARAM_INT);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$municipios .='<option value="' . $row['id_municipio'].'">'.$row['municipio']. '</option>';
							}
						}

						$ajax_respuesta["municipios"] = $municipios;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_paises":
					$paises = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_pais, pais
						FROM cat_paises
						ORDER BY id_pais ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$paises .='<option value="' . $row['id_pais'].'">'.$row['pais']. '</option>';
							}
						}

						$ajax_respuesta["paises"] = $paises;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_parentesco":
					$parentescos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_parentesco, id_tipo_referencia, parentesco
						FROM cat_parentesco
						ORDER BY id_parentesco ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$parentescos .='<option value="' . $row['id_parentesco'].'">'.$row['parentesco']. '</option>';
							}
						}

						$ajax_respuesta["parentescos"] = $parentescos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_radio_marcas":
					$radio_marcas = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_marca, marca_radio
						FROM cat_radio_marcas
						ORDER BY id_marca ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$radio_marcas .='<option value="' . $row['id_marca'].'">'.$row['marca_radio']. '</option>';
							}
						}

						$ajax_respuesta["radiomarcas"] = $radio_marcas;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_radio_proveedores":
					$radio_proveedores = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_proveedor, proveedor
						FROM cat_radio_proveedores
						ORDER BY id_proveedor ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$radio_proveedores .='<option value="' . $row['id_proveedor'].'">'.$row['proveedor']. '</option>';
							}
						}

						$ajax_respuesta["radioproveedores"] = $radio_proveedores;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_radio_tipos":
					$radio_tipos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo, tipo_radio
						FROM cat_radio_tipos
						ORDER BY id_tipo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$radio_tipos .='<option value="' . $row['id_tipo'].'">'.$row['tipo_radio']. '</option>';
							}
						}

						$ajax_respuesta["radiotipos"] = $radio_tipos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_regiones":
					$regiones = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_region, region
						FROM cat_regiones
						ORDER BY id_region ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$regiones .='<option value="' . $row['id_region'].'">'.$row['region']. '</option>';
							}
						}

						$ajax_respuesta["regiones"] = $regiones;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_sexo":
					$sexos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_sexo, sexo, abreviatura
						FROM cat_sexo
						ORDER BY id_sexo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$sexos .='<option value="' . $row['id_sexo'].'">'.$row['sexo']. '</option>';
							}
						}

						$ajax_respuesta["sexos"] = $sexos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;




				

				case "cat_tipo_referencia":
					$tipo_referencia = "";

					try {
						$sql = "SELECT HIGH_PRIORITY cat_tipo_referencia, tipo_referencia
						FROM cat_tipo_referencia
						ORDER BY cat_tipo_referencia ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipo_referencia .='<option value="' . $row['cat_tipo_referencia'].'">'.$row['tipo_referencia']. '</option>';
							}
						}

						$ajax_respuesta["tiporeferencia"] = $tipo_referencia;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_tipo_sangre":
					$tipo_sangre = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo_sangre, tipo_sangre
						FROM cat_tipo_sangre
						ORDER BY id_tipo_sangre ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipo_sangre .='<option value="' . $row['id_tipo_sangre'].'">'.$row['tipo_sangre']. '</option>';
							}
						}

						$ajax_respuesta["tiposangre"] = $tipo_sangre;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_usuarios_perfiles":
					$usuarios_perfiles = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_usuario_perfil, usuario_perfil
						FROM cat_usuarios_perfiles
						ORDER BY id_usuario_perfil ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$usuarios_perfiles .='<option value="' . $row['id_usuario_perfil'].'">'.$row['usuario_perfil']. '</option>';
							}
						}

						$ajax_respuesta["usuariosperfiles"] = $usuarios_perfiles;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;


				case "cat_usuario_estatus":
					$usuarios_estatus = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_estatus, estatus
						FROM cat_usuario_estatus
						ORDER BY id_estatus ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$usuarios_estatus .='<option value="' . $row['id_estatus'].'">'.$row['estatus']. '</option>';
							}
						}

						$ajax_respuesta["usuariosestatus"] = $usuarios_estatus;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_usuario_perfiles":
					$usuario_perfiles = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_perfil, perfil
						FROM cat_usuario_perfiles
						ORDER BY id_perfil ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$usuario_perfiles .='<option value="' . $row['id_perfil'].'">'.$row['perfil']. '</option>';
							}
						}

						$ajax_respuesta["usuarioperfiles"] = $usuario_perfiles;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;				

				case "cat_vehiculo_marcas":
					$vehiculo_marcas = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_marca, marca, estatus
						FROM cat_vehiculo_marcas
						ORDER BY id_marca ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$vehiculo_marcas .='<option value="' . $row['id_marca'].'">'.$row['marca']. '</option>';
							}
						}

						$ajax_respuesta["vehiculomarcas"] = $vehiculo_marcas;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_vehiculo_tipos":
					$vehiculo_tipos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo, tipo_vehiculo
						FROM cat_vehiculo_tipos
						ORDER BY id_tipo ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$vehiculo_tipos .='<option value="' . $row['id_tipo'].'">'.$row['tipo_vehiculo']. '</option>';
							}
						}

						$ajax_respuesta["vehiculotipos"] = $vehiculo_tipos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;



				case "cat_tipo_permiso":
					$tipo_permiso = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_tipo_permiso, tipo_permiso
						FROM cat_tipo_permiso
						ORDER BY id_tipo_permiso ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$tipo_permiso .='<option value="' . $row['id_tipo_permiso'].'">'.$row['tipo_permiso']. '</option>';
							}
						}

						$ajax_respuesta["tipopermiso"] = $tipo_permiso;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_modalidad":
					$modalidades = "";

					$xid_tipo_permiso = $_POST["xid_tipo_permiso"];
					try {
						$sql = "SELECT HIGH_PRIORITY id_modalidad, modalidad, id_tipo_permiso
						FROM cat_modalidad
						WHERE id_tipo_permiso=:xid_tipo_permiso
						ORDER BY id_modalidad ASC";
						$stmt = $pdo->prepare($sql);
						$stmt->bindParam(':xid_tipo_permiso', $xid_tipo_permiso, PDO::PARAM_INT);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$modalidades .='<option value="' . $row['id_modalidad'].'">'.$row['modalidad']. '</option>';
							}
						}

						$ajax_respuesta["modalidades"] = $modalidades;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_tipo_movimiento":
					$movimientos = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_cat_vigencia, movimiento
						FROM cat_tipo_movimiento
						ORDER BY id_cat_vigencia ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$movimientos .='<option value="' . $row['id_cat_vigencia'].'">'.$row['movimiento']. '</option>';
							}
						}

						$ajax_respuesta["movimientos"] = $movimientos;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;



				case "cat_empresas":
					$empresas = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_empresa, empresa
						FROM esp_empresas
						ORDER BY empresa ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$empresas .='<option value="' . $row['id_empresa'].'">'.$row['empresa']. '</option>';
							}
						}

						$ajax_respuesta["empresas"] = $empresas;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;

				case "cat_empresa_estatus":
					$estatus = "";

					try {
						$sql = "SELECT HIGH_PRIORITY id_estatus, estatus
						FROM cat_empresa_estatus
						ORDER BY id_estatus ASC";
						$stmt = $pdo->prepare($sql);

						if($stmt->execute()){
							while($row = $stmt->fetch()) {
								$estatus .='<option value="' . $row['id_estatus'].'">'.$row['estatus']. '</option>';
							}
						}

						$ajax_respuesta["estatus"] = $estatus;
						echo json_encode($ajax_respuesta);
					} catch (Exception $e) {
						$ajax_respuesta["error"] = $e->getMessage();
						echo json_encode($ajax_respuesta);
					}
				break;


				

				/*=================================================================*/
			}/*Fin de switch*/
		}/*Fin de else*/
	} catch (Exception $e) {
		$ajax_respuesta["error"] = $e->getMessage();
		echo json_encode($ajax_respuesta);
	}
?>