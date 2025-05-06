<?php
//require_once($_SERVER['DOCUMENT_ROOT'].'/empresas-de-seguridad-privada/config/configdb.php');


// define("DB_HOST","localhost");
// define("DB_NAME","regimen_penitenciario");
// define("DB_USER","user_plantilladp");
// define("DB_PASS","PL4nT1LLaDP#3639");

// $dsn = 'mysql:host=localhost;dbname=regimen_penitenciario';
// $user = "user_plantilladp";
// $password = "PL4nT1LLaDP#3639";

require_once($_SERVER['DOCUMENT_ROOT'].'/empresas-de-seguridad-privada/config/configdb.php');

$dsn      = 'mysql:host='.DB_HOST.';dbname='.DB_NAME;
$user     = DB_USER;
$password = DB_PASS;

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET CHARACTER SET utf8");
}catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

?>
