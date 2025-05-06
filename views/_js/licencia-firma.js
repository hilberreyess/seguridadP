jQuery(document).ready(function(){   

    $(".btnGroup-select-firma").click(function(){
        if ($(this).is('[disabled=""]') || $(this).is('[disabled=disabled]')) {
            console.log("Esta Deshabilitado");            
        } else {
            var origen_firma =  $(this).data("value");

            if (origen_firma=="FirmaDevice") {
                console.log("Falta realizar pruebas con un dispositivo");  
            }else if(origen_firma=="FirmaFile"){
                $("#ModalFirmaArchivo").modal({
                                        show:true,
                                        backdrop: 'static',
                                        keyboard: true
                                    });
                $(".modal-title").html("Seleccionar la Firma desde un archivo");

                $(this).attr("disabled","disabled");
            }
        }        
    });

    $('#ModalFirmaArchivo').on('hidden.bs.modal', function () {
        $(".archivo-firma").removeAttr("disabled"); //Solo deshabilitamos la opcion de firma por archivo

       //Limpiamos los controles una vez cerrada la ventana modal
      $(".img-firma-cropped").attr("src","views/images/sin-firma.jpg");
      $(".detalles-imagen-firma").html("");
      $("#BtnCropFirmaFile").attr("disabled","disabled");
      reinicializa_croppie_contanierw();
    });

     //Instrucciones para Croppie
    $("#BtnCropFirmaFile").attr("disabled","disabled");

    var $uploadCrop2,tempFilename2,rawImg2,imageName2;

    $uploadCrop2 = $("#FirmaFileSelected").croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 350,
           height: 160
        },
        boundary: {
            width: 400,
            height: 200
        },
        enforceBoundary: false,
    });

    $("#fileFirma").on("change", function () {
        var input_file_name = $(this)[0].name; //Nombre del Boton

        imageName2 = "."+input_file_name.replace(/_/g,"-");
        $("#BtnCropFirmaFile").removeAttr("disabled");
        readFile2(this);
    });

    $('#BtnCropFirmaFile').on("click", function (ev) {
        $uploadCrop2.croppie("result", {
            type: 'base64',
            format: 'jpeg',
            backgroundColor:'#FFF', //Color de Fondo al Cortar la imagen fuera de tamaño
            quality:1,
            size: {width: 350, height: 160} //Estilo Pasaporte
        }).then(function (FirmaRecortada) {
            var sizeBits = FirmaRecortada.length;
            var sizeKB = sizeBits/1000;
            var sizeMB = sizeBits/1000000;

            var xToken = $("#Token_CSRF").val();
            var xIdFFH = $("#hIdFFH").val();
            var xImagen = FirmaRecortada;

            var xFoto   = imageName2.replace(".","");

            $(".detalles-imagen-firma").html("");
            $(".detalles-imagen-firma").append("<li><strong>Tamaño:</strong> "+sizeKB.toFixed(2)+" KB</li>");
            $(".detalles-imagen-firma").append("<li><strong>Tamaño:</strong> "+sizeMB.toFixed(2)+" MB</li>");
            $(".detalles-imagen-firma").append("<li><strong>Ancho:</strong> 350px</li>");
            $(".detalles-imagen-firma").append("<li><strong>Alto:</strong> 160px</li>");
            $(".detalles-imagen-firma").append("<li><strong>Formato:</strong> jpg</li>");           
            

            /*Asignamos la Fotografia en la imagen correspondiente*/
            $(".img-firma-cropped, .img-firma-preview").attr("src",xImagen);

            /*#####################################################################################*/
            /*Guardar Imagen Via Ajax la Imagen seleccionada*/
            $.ajax({
                url: "models/ajx_upload_photo.php",
                type: "POST",
                data: {"xToken":xToken,"xDirectorio":"firmas","xIdFFH":xIdFFH, "xImagen":xImagen},
                dataType: "JSON",
                success: function (respuesta) {
                    if (respuesta.uploaded) {
                       console.log("Firma guardada correctamente");
                       $("#hFirmaeleccionada").val("SI");  
                    }                    
                },
                error: function(jqXHR, status, error) {
                   console.log(jqXHR);
                   console.log(status);
                   console.log(error);
                }
            });/*Fin de Ajax*/
            /*#####################################################################################*/


        });
    });


    function readFile2(input) {
        if (input.files && input.files[0]) {
                /*Verificamos que solo sean imagenes*/
                if (input.files[0].type==='image/png' || input.files[0].type==='image/jpeg') {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        rawImg2 = e.target.result;

                        $uploadCrop2.croppie("bind", {
                            url: rawImg2
                        }).then(function(){
                            console.log("jQuery bind complete");
                        });
                    }

                    /*Con esta comparacion evitamos el error cuando se cancela la seleccion dela imagen*/
                    if (input.files[0] !== undefined) {
                        reader.readAsDataURL(input.files[0]);
                    }
            }else{
                mensaje('fa-info-circle', '¡Formato no Válido!', 'Solo se permiten Archivos de Imagen con extensión .png y .jpeg', 'danger');
            }
        }else {
            console.log("El usuario canceló la selección de la Fotografía o el navegador no soporta la FileReader API");
        }
    }




}); //cierra Jquery


function reinicializa_croppie_contanierw(){
    $('#FirmaFileSelected').removeClass('ready');
    $("#FirmaFileSelected").html("");
    $uploadCrop2=null

    $uploadCrop2 = $("#FirmaFileSelected").croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 350,
           height: 160
        },
        boundary: {
            width: 400,
            height: 200
        },
        enforceBoundary: false,
    });
}