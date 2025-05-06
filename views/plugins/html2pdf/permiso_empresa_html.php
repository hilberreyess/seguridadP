<?php
    // session_start();
    // date_default_timezone_set("America/Mexico_City"); 
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

    $dias =  array("DOMINGO","LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES","SÁBADO");
    $meses = array("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");

    $sql= "SELECT e.id_empresa, e.empresa, e.rfc, e.domicilio, e.representante, e.numero_registro, e.telefono, e.correo, 
        tp.tipo_permiso, cm.modalidad, DATE_FORMAT(e.fecha_autoriza,'%d-%m-%Y') AS fecha_autoriza, 
        DATE_FORMAT(e.fecha_vence,'%d-%m-%Y') AS fecha_vence, e.cedula_registro, e.numero_expediente, e.clave, 
        e.estatus, e.sfa, e.folio, e.caracteristica, e.n_registro_f, e.id_cat_vigencia, e.url_qr, e.observaciones
        FROM esp_empresas e
        LEFT JOIN cat_empresa_modalidad cm ON e.id_modalidad=cm.id_modalidad
        LEFT JOIN cat_empresa_tipo_permiso tp ON e.tipo_permiso=tp.id_tipo_permiso
        WHERE e.id_empresa=:xid_empresa
        LIMIT 1";

    $seleccionar = $pdo->prepare($sql);
    $seleccionar->bindValue(':xid_empresa', $xid_empresa, PDO::PARAM_INT);
    $seleccionar->execute();
    $totalrows = $seleccionar->rowCount();
    $empresa = $seleccionar->fetchObject();

//    echo $empresa->id_empresa . "<br>";
//    echo $empresa->empresa . "<br>";
//    echo $empresa->rfc . "<br>";
//    echo $empresa->numero_registro . "<br>";
//    echo $empresa->url_qr . "<br>";


?>

<style type="text/css">
        .tabla-h{
            font-size: 25px;
            height: 30px;
            line-height:35px;
            vertical-align:middle;
            background: #DDD;
            border-bottom: 1px solid #1C1C1C;
        }
        p{padding: 0px !important;}

        .tabla-contenedora{border-collapse: collapse;}

        .negrita{font-weight:bold;}

        .campo{
            width:180px;
            height: 25px;
            vertical-align: top;
            /* line-height: 25px; */
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            padding-right: 5px;
            /* border: 1px solid #DDD; */
            /*border-left: none;
            border-right: none;*/
        }

        .contenido{
            width: 860px;
            height: 25px;
            font-size: 16px;
            vertical-align:top;
            /* line-height: 35px; */
            text-align: left;
            padding-left: 5px;
            /* border: 1px solid #DDD; */
        }
    </style>



<page backtop="6mm" backbottom="6mm" backleft="6mm" backright="6mm" backimg="../../images/formato_revalidacion.jpg" >

    <!-- <div style="width:1080px;font-size:24px;border:1px solid red; position:absolute; margin-left:-2px; margin-top:80px;text-align:center;">
        fffff
    </div> -->

    <div style="width:1000px;font-size:22px;font-weight:bold;position:absolute; margin-left:39px; margin-top:120px;text-align:center;">
        Con fundamento en el artículo 151 de la Ley número 179 del Sistema de Seguridad Pública del Estado Libre y Soberano de Guerrero
    </div>

    <div style="width:250px;font-size:27px;font-weight:bold;position:absolute; margin-left:39px; margin-top:200px;text-align:left;color:#0B0B61">
        SFA: <?php echo $empresa->sfa; ?>
    </div>

    <div style="width:250px;font-size:27px;font-weight:bold;position:absolute; margin-left:800px; margin-top:200px;text-align:right;color:#0B0B61">
        FOLIO: <?php echo $empresa->folio; ?>
    </div>

    <div style="width:1000px;font-size:22px;font-weight:bold;position:absolute; margin-left:39px; margin-top:260px;text-align:center;">
        Para prestar Servicios de Seguridad Privada en el Estado de Guerrero, a favor de la empresa:
    </div>

    <table class="tabla-contenedora" style="position:absolute; margin-left:4px; margin-top:300px;">
        <tr>
            <td style="width:1060px;font-size:32px;line-height:30px; font-weight:bold;position:absolute;margin-left:39px; margin-top:300px;text-align:center;color:#0B0B61;">
            <?php echo $empresa->empresa; ?>
            </td>
        </tr>
        <tr>
            <td style="border-top:none; padding-top:15px;margin:-2px;text-align: center;">
                <table style="border-collapse: collapse;">
                    <tbody>
                    <tr>
                        <td class="campo negrita">MODALIDAD:</td>
                        <td class="contenido"><?php echo $empresa->modalidad; ?></td>
                    </tr>
                    <tr>
                        <td class="campo negrita">CARACTERÍSTICA:</td>
                        <td class="contenido"><?php echo $empresa->caracteristica; ?></td>
                    </tr>
                    <tr>
                        <td class="campo negrita">DOMICILIO:</td>
                        <td class="contenido"><?php echo $empresa->domicilio; ?></td>
                    </tr>
                    <tr>
                        <td class="campo negrita">VIGENCIA:</td>
                        <td class="contenido"><?php echo $empresa->fecha_vence; ?></td>
                    </tr>
                    <tr>
                        <td class="campo negrita">NO. DE REGISTRO:</td>
                        <td class="contenido"><?php echo $empresa->numero_registro; ?></td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
    


    <table class="tabla-contenedora" style="position:absolute; margin-left:4px; margin-top:530px;">
        <tr>
            <td style="width:1060px;font-size:20px;line-height:30px; font-weight:bold;position:absolute;margin-left:39px;text-align:center;">
                CHILPANCINGO, GRO., A 18 DE DICIEMBRE DE 2024.
            </td>
        </tr>
        <tr>
            <td style="width:1060px;font-size:20px;line-height:30px; font-weight:bold;position:absolute;margin-left:39px;text-align:center;color:#0B0B61;">
                EL SECRETARIO DE SEGURIDAD PÚBLICA DEL ESTADO.
            </td>
        </tr>

        <tr>
            <td style="width:1060px;font-size:22px;line-height:30px; font-weight:bold;position:absolute;margin-left:39px;text-align:center;color:#0B0B61;padding-top:100px;">
            MTRO. JOSUÉ BARRÓN SEVILLA
            </td>
        </tr>
    </table>



    <div style="width:140px;position:absolute; margin-left:2px; margin-top:570px;">
        <qrcode value="<?php echo $empresa->url_qr; ?>" ec="M" style="width:35mm; background-color:white; color:black;border:none;"></qrcode>
    </div>

    <div  style="width:160px;position:absolute; margin-left:900px; margin-top:625px;">
        <barcode dimension="1D" type="C128" value="<?php echo $empresa->n_registro_f; ?>" label="label" style="width:40mm; height:15mm; color: #000; font-size:4mm"></barcode>
    </div>
</page>