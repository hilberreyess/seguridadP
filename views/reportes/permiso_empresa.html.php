<?php
    session_start();
    date_default_timezone_set("America/Mexico_City");    
    include_once("../../models/conexion.php");
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- <link href="https://fonts.cdnfonts.com/css/dough" rel="stylesheet"> -->

    <?php
        $data = file_get_contents('header_reportes.jpg');
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    ?>
    <style>
        /**
    Establezca los márgenes de la página en 0, por lo que el pie de página y el encabezado
    puede ser de altura y anchura completas.
    **/
        @page {
            margin: 0cm 0cm;
            font-family: Arial, Helvetica, sans-serif;
            /* font-family:'Times New Roman', Times, serif; */
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 2cm;
            margin-left: 1cm;
            margin-right: 1cm;
            margin-bottom: 2cm;
        }

        /** Definir las reglas del encabezado **/
        header {
            position: fixed;
            top: 0.5cm;
            left: 0cm;
            right: 0cm;
            height: 2cm;

            /** Estilos extra personales **/
            /* background-color: #03a9f4; */
            /* background-image: url('header_reportes.jpg'); */
            /* background-image: url(<?php echo $base64 ?>); */
            color:#888;
            text-align:justify;
            vertical-align: top;
        }

        /** Definir las reglas del pie de página **/
        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 2.3cm;

            /** Estilos extra personales **/
            font-size: 12px;
            color: #CCC;
            text-align: justify;
            vertical-align: middle;
        }

        .contenido {
            /** Estilos extra personales **/
            margin-top: 1.2cm;
            text-align: justify;

        }
    </style>
</head>
<body>
    <header>
        <?php
            $rutaImagen = "../images/header_reportes_2.png";
            $imagenBase64 = "data:image/png;base64," . base64_encode(file_get_contents($rutaImagen));
        ?>
        <div style="height:90px;">
            <img src="<?php echo $imagenBase64 ?>" style="height: 100px"; />
        </div>
    </header>

    <!-- Envuelva el contenido de su PDF dentro de una etiqueta principal -->
    <div class="contenido">
        <div style="font-size:9px;text-align:justify;vertical-align:top;overflow-wrap:anywhere;margin-top:30px;">La presente información es de carácter confidencial y reservado para esta Dependencia, de conformidad con lo dispuesto en los artículos 6 inciso A) fracciones I y II de la Constitución Política de los Estados Unidos Mexicanos, 40 fracción XXI, 110 tercer párrafo de laley General del Sistema Nacional de Seguridad Pública, 113 fracciones I, V, VII,XIII y 116 de la Ley General de Transparencia y Acceso a la Información Pública, 2,3,6,9,16,23, y 163 fracciones II y IV de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados, por lo que se debe de manejar con las reservas y confidencialidad de las Leyes señaladas, por lo que el manejo y resguardo de esta información queda bajo su más estructa responsabilidad.</div>
    </div class="contenido">    

    <footer>
        <?php
            $data = file_get_contents('../images/grecas_gobierno_gro.png');
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        ?>

        <div style="height:25px; background-image:url(<?php echo $base64 ?>); background-size:100%; width:96%;margin:0px auto;">
            
        </div>
        <div style="width:75%; margin:0px auto;font-size:11px;margin-top:4px;">
            Recinto de las oficinas del Poder Ejecutivo del Estado, Edificio Costa Grande Primer Piso, Boulevard René Juárez Cisneros No. 62, col. Ciudad de los Servicios, C.P. 39074, Chilpancingo, Guerrero. Tel. 7474716325.
        </div>
                
    </footer>
</body>
</html>