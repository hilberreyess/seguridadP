jQuery(document).ready(function(){
 
 $(".btnGroup-select-huella").click(function(){
        if ($(this).is('[disabled=""]') || $(this).is('[disabled=disabled]')) {
            console.log("Esta Deshabilitado");            
        } else {
            var origen_huella =  $(this).data("value");

            if (origen_huella=="HuellaDevice") {
                console.log("Falta realizar pruebas con un dispositivo");  
            }else if(origen_huella=="HuellaFile"){
                $("#ModalHuellaArchivo").modal({
                                        show:true,
                                        backdrop: 'static',
                                        keyboard: true
                                    });
                $(".modal-title").html("Seleccionar la Huella desde un archivo");

                $(this).attr("disabled","disabled");
            }
        }        
    });

 	$('#ModalHuellaArchivo').on('hidden.bs.modal', function () {
        $(".archivo-huella").removeAttr("disabled"); //Solo deshabilitamos la opcion de firma por archivo


       //Limpiamos los controles una vez cerrada la ventana modal
      // $(".img-firma-cropped").attr("src","views/images/sin-firma.jpg");
      // $(".detalles-imagen-huella").html("");
      // $("#BtnCropFirmaFile").attr("disabled","disabled");
      // reinicializa_croppie_contanierw();
    });

     //Instrucciones para Croppie
    $("#BtnCropHuellaFile").attr("disabled","disabled");

    var $uploadCrop3,tempFilename3,rawImg3,imageName3;

    $uploadCrop3 = $("#HuellaFileSelected").croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 150,
           height: 200
        },
        boundary: {
            width: 200,
            height: 250
        },
        enforceBoundary: false,
    });

    $("#fileHuella").on("change", function () {
        var input_file_name = $(this)[0].name; //Nombre del Boton

        imageName3 = "."+input_file_name.replace(/_/g,"-");
        $("#BtnCropHuellaFile").removeAttr("disabled");
        readFile3(this);
    });

    $('#BtnCropHuellaFile').on("click", function (ev) {
        $uploadCrop3.croppie("result", {
            type: 'base64',
            format: 'jpeg',
            backgroundColor:'#FFF', //Color de Fondo al Cortar la imagen fuera de tamaño
            quality:1,
            size: {width: 150, height: 200} //Estilo Pasaporte
        }).then(function (HuellaRecortada) {
            var sizeBits = HuellaRecortada.length;
            var sizeKB = sizeBits/1000;
            var sizeMB = sizeBits/1000000;

            var xToken      = $("#Token_CSRF").val();
            var xIdPersonal = $("#hIdPersonal").val();
            var xImagen     = HuellaRecortada;

            var xFoto       = imageName3.replace(".","");

            $(".detalles-imagen-huella").html("");
            $(".detalles-imagen-huella").append("<li><strong>Tamaño:</strong> "+sizeKB.toFixed(2)+" KB</li>");
            $(".detalles-imagen-huella").append("<li><strong>Tamaño:</strong> "+sizeMB.toFixed(2)+" MB</li>");
            $(".detalles-imagen-huella").append("<li><strong>Ancho:</strong> 150px</li>");
            $(".detalles-imagen-huella").append("<li><strong>Alto:</strong> 200px</li>");
            $(".detalles-imagen-huella").append("<li><strong>Formato:</strong> jpg</li>");           
            

            /*Asignamos la Fotografia en la imagen correspondiente*/
            $(".img-huella-cropped, .img-huella-preview").attr("src",xImagen);

            /*#####################################################################################*/
            /*Guardar Imagen Via Ajax la Imagen seleccionada*/
            $.ajax({
                url: "models/ajx_upload_photo.php",
                type: "POST",
                data: {"xToken":xToken,"xDirectorio":"huellas","xIdPersonal":xIdPersonal, "xImagen":xImagen},
                dataType: "JSON",
                success: function (respuesta) {
                    if (respuesta.uploaded) {
                       console.log("Huella guardada correctamente");
                       $("#hHellaSeleccionada").val("SI");    
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

    function readFile3(input) {
        if (input.files && input.files[0]) {
                /*Verificamos que solo sean imagenes*/
                if (input.files[0].type==='image/png' || input.files[0].type==='image/jpeg') {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        rawImg3 = e.target.result;

                        $uploadCrop3.croppie("bind", {
                            url: rawImg3
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