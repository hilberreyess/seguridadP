<?php
//session_start();

class Catalogo
{
	private $_db;

	function __construct($pdo) {
		$this->_db = $pdo;
	}

/* =================================================================
   Funciones para obtener los catalogos agregados por Base de Datos
   ================================================================= */
	public function cat_usuarios_perfiles($seleccionado=0){
		try {
			$sql = "SELECT HIGH_PRIORITY * FROM cat_usuarios_perfiles ORDER BY id_usuario_perfil ASC";
			$select_cat = $this->_db->prepare($sql);

			$this->_OptionsCatPerfiles='';
			if($select_cat->execute() ) {
				while($row = $select_cat->fetch()) {
					if ($seleccionado==$row['id_usuario_perfil']) {
						$this->_OptionsCatPerfiles .='<option value="' . $row['id_usuario_perfil'].'" selected>'.$row['usuario_perfil']. '</option>';
					} else {
						$this->_OptionsCatPerfiles .='<option value="' . $row['id_usuario_perfil'].'">'.$row['usuario_perfil']. '</option>';
					}
				}
			} else {
				return $select_cat->errorInfo();
			}
		} catch (Exception $e) {
			return $e->getMessage;
		}

		return $this->_OptionsCatPerfiles;
	} /*Fin del Catalogo*/	

	public function cat_municipios($seleccionado=0){
		try {
			$sql = "SELECT HIGH_PRIORITY id_municipio, municipio FROM cat_municipios";
			$select_cat = $this->_db->prepare($sql);

			$this->_OptionsCatMunicipios='';
			if($select_cat->execute() ) {
				while($row = $select_cat->fetch()) {
					if ($seleccionado==$row['id_municipio']) {
						$this->_OptionsCatMunicipios .='<option value="' . $row['id_municipio'].'" selected>'.$row['municipio']. '</option>';
					} else {
						$this->_OptionsCatMunicipios .='<option value="' . $row['id_municipio'].'">'.$row['municipio']. '</option>';
					}
				}
			} else {
				return $select_cat->errorInfo();
			}
		} catch (Exception $e) {
			return $e->getMessage;
		}

		return $this->_OptionsCatMunicipios;
	} /*Fin del Catalogo*/

	public function cat_municipios2($seleccionado=0){
		try {
			$sql = "SELECT HIGH_PRIORITY id_municipio,cve_entidad,LPAD(cve_municipio,2,'0') AS cve_municipio,municipio_nombre FROM cat_municipios WHERE cve_entidad=12";
			$select_cat = $this->_db->prepare($sql);

			$this->_OptionsCatMunicipios='';
			if($select_cat->execute() ) {
				while($row = $select_cat->fetch()) {
					if ($seleccionado==$row['cve_municipio']) {
						$this->_OptionsCatMunicipios .='<option value="' . $row['cve_municipio'].'" selected>'.$row['municipio_nombre']. '</option>';
					} else {
						$this->_OptionsCatMunicipios .='<option value="' . $row['cve_municipio'].'">'.$row['municipio_nombre']. '</option>';
					}
				}
			} else {
				return $select_cat->errorInfo();
			}
		} catch (Exception $e) {
			return $e->getMessage;
		}

		return $this->_OptionsCatMunicipios;
	} /*Fin del Catalogo*/




	public function cat_municipios_uno($seleccionado=0){
		try {
			$sql = "SELECT HIGH_PRIORITY id_municipio,cve_entidad,LPAD(cve_municipio,2,'0') AS cve_municipio,municipio_nombre FROM cat_municipios WHERE cve_entidad=12";
			$select_cat = $this->_db->prepare($sql);

			$this->_OptionsCatMunicipios='';
			if($select_cat->execute() ) {
				while($row = $select_cat->fetch()) {
					if ($seleccionado==$row['cve_municipio']) {
						$this->_OptionsCatMunicipios .='<option value="' . $row['cve_municipio'].'" selected>'.$row['municipio_nombre']. '</option>';
					}
				}
			} else {
				return $select_cat->errorInfo();
			}
		} catch (Exception $e) {
			return $e->getMessage;
		}

		return $this->_OptionsCatMunicipios;
	} /*Fin del Catalogo*/





	function __destruct() { }

}