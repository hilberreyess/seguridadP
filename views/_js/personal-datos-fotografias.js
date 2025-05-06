jQuery(document).ready(function(){
    let perfil_foto = "";

    //Estas opciones son para foto dependiendo el origen deseado
    $(".btnGroup-select-photo").click(function(){
        var origen_foto =  $(this).data("value");

        if(origen_foto=="FotoFilePI" || origen_foto=="FotoFilePF" || origen_foto=="FotoFilePD"){
            let TituloFotografia = "";

            switch (origen_foto) {
                case "FotoFilePI":
                    TituloFotografia="Perfil Izquierdo";
                    perfil_foto = "pi";
                    break;
                case "FotoFilePF":
                    TituloFotografia="Perfil Frente";
                    perfil_foto = "pf";
                    break;
                case "FotoFilePD":
                    TituloFotografia="Perfil Derecho";
                    perfil_foto = "pd";
                    break;
            }

            $("#ModalFotografiaArchivo").modal({
                                        show:true,
                                        backdrop: 'static',
                                        keyboard: true
                                    });
            $(".modal-title").html("Seleccionar Fotografia Desde un Archivo");
            $(".titulo-foto").html(TituloFotografia);

            $(this).attr("disabled","disabled");

            //Deshabilitar el boton d guardar cuando este en la Ficha de Fotografias
            $("btnGuardar").attr("disabled", "disabled");
        }
    });


    $('#ModalFotografiaArchivo').on('hidden.bs.modal', function () {
      $(".btnGroup-select-photo").removeAttr("disabled");

      //Limpiamos los controles una vez cerrada la ventana modal
      $(".img-foto-fotografiaFile-cropped").attr("src","views/images/sin-fotografia.jpg");
      $(".detalles-fotografiaFile").html("");
      $("#BtnCropPhotoFile").attr("disabled","disabled");
      reinicializa_croppie_contanier();
    });


    //Instrucciones para Croppie
    $("#BtnCropPhotoFile").attr("disabled","disabled");

    var $uploadCrop,tempFilename,rawImg,imageName;

    $uploadCrop = $("#PhotoFileSelected").croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 180,
           height: 230
        },
        boundary: {
            width: 250,
            height: 250
        },
        enforceBoundary: false,
    });

    $("#fileFotografiaFrente").on("change", function () {
        var input_file_name = $(this)[0].name;
        imageName = "."+input_file_name.replace(/_/g,"-");
        $("#BtnCropPhotoFile").removeAttr("disabled");
        readFile(this);
    });

    
    $('#BtnCropPhotoFile').on("click", function (ev) {
        $uploadCrop.croppie("result", {
            type: 'base64',
            format: 'jpeg',
            backgroundColor:'#FFF',
            quality:1,
            size: {width: 200, height: 260} //Estilo Pasaporte
        }).then(function (FotografiaRecortada) {
            var sizeBits = FotografiaRecortada.length;
            var sizeKB = sizeBits/1000;
            var sizeMB = sizeBits/1000000;

            var xImagen = FotografiaRecortada;

            $(".detalles-fotografiaFile").html("");
            $(".detalles-fotografiaFile").append("<li><strong>Tamaño:</strong> "+sizeKB.toFixed(2)+" KB</li>");
            $(".detalles-fotografiaFile").append("<li><strong>Tamaño:</strong> "+sizeMB.toFixed(2)+" MB</li>");
            $(".detalles-fotografiaFile").append("<li><strong>Ancho:</strong> 200px</li>");
            $(".detalles-fotografiaFile").append("<li><strong>Alto:</strong> 260px</li>");
            $(".detalles-fotografiaFile").append("<li><strong>Formato:</strong> jpg</li>");           
            
            /*Asignamos la Fotografia en la imagen correspondiente*/
            $(".img-foto-fotografiaFile-cropped").attr('src', xImagen); 
            $(".img-fotografia-preview-"+perfil_foto).attr('src', xImagen);
            

            /*Asignar el valor para identificar si se selecciono alguna fotografia*/
            switch (perfil_foto) {
                case "pi":
                    $("#hFotografiaPI").val(xImagen);
                    break;
            
                case "pf":
                    $("#hFotografiaPF").val(xImagen);
                    break;

                case "pd":
                    $("#hFotografiaPD").val(xImagen);
                    break;
            }


            /*#####################################################################################*/
            /*Guardar Imagen Via Ajax la Imagen seleccionada*/
            // $.ajax({
            //     url: "models/ajax/ajax_upload_photo.php",
            //     type: "POST",
            //     data: {"xToken":xToken,"xDirectorio":"fotografias","xIdPersonal":xIdPersonal, "xImagen":xImagen},
            //     dataType: "JSON",
            //     success: function (respuesta) {
            //         console.log(respuesta);

            //         if (respuesta.uploaded) {
            //           console.log("Fotografia guardada correctamente");
            //           $("#hFotoSeleccionada").val("SI");  

            //           //Aqui mensaje de Fotografia guardada Correctamente

            //         }           
            //     },
            //     error: function(jqXHR, status, error) {
            //        console.log(jqXHR, status, error);
            //     }
            // });/*Fin de Ajax*/
            /*#####################################################################################*/


        });
    });


    function readFile(input) {
        if (input.files && input.files[0]) {
            /*Verificamos que solo sean imagenes*/
            if (input.files[0].type==='image/png' || input.files[0].type==='image/jpeg') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    rawImg = e.target.result;

                    $uploadCrop.croppie("bind", {
                        url: rawImg
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


function reinicializa_croppie_contanier(){
    $('#PhotoFileSelected').removeClass('ready');
    $("#PhotoFileSelected").html("");
    $uploadCrop = null;

    $uploadCrop = $('#PhotoFileSelected').croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 180,
           height: 230
        },
        boundary: {
            width: 250,
            height: 250
        },
        enforceBoundary: false,
    });
}