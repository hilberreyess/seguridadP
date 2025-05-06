<?php
	if ($_SERVER['SERVER_NAME'] == 'localhost' && $_SERVER['SERVER_ADDR'] == '::1' ) {
		define("DB_HOST","localhost");
		define("DB_NAME","empresas_seguridad_privada");
		define("DB_USER","root");
		define("DB_PASS","qwer");
	}else{
		define("DB_HOST","localhost");
		define("DB_NAME","empresas_seguridad_privada");
		define("DB_USER","root");
		define("DB_PASS","qwer");
	}
?>+