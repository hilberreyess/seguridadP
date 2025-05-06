jQuery(document).ready(function(){
/* ###############################################
 Aqui las Instricciones parea manejar  la CAMARA
 ################################################### */
let perfil_foto = "";

//Aqui instrucciones para encender la Camara Web
//Inicializamos las opciones para la Webcam
var WebcamOptions = {
    //live preview size
    width: 260,
    height: 230,
      
    //device capture size
    dest_width: 640,
    dest_height: 480,
      
    //final cropped size
    crop_width: 640,
    crop_height: 480,
      
    //format and quality
    image_format: 'jpeg',
    jpeg_quality: 100,

    flip_horiz: true,
    fps: 30,
    force_flash: false
};


//Listar los dispositivos de Video
// navigator.mediaDevices.enumerateDevices().then(function (devices) {
//     for(var i = 0; i < devices.length; i ++){
//         var device = devices[i];
//         if (device.kind === 'videoinput') {
//             console.log(device.deviceId, device.label);
//         }
//     };
// });




$(".btnGroup-select-photo").click(function(){
    var origen_foto =  $(this).data("value");

    if(origen_foto=="FotoWebcamPI" || origen_foto=="FotoWebcamPF" || origen_foto=="FotoWebcamPD") {
        let TituloFotografia = "";

        switch (origen_foto) {
            case "FotoWebcamPI":
                TituloFotografia="Perfil Izquierdo";
                perfil_foto = "pi";
                break;
            case "FotoWebcamPF":
                TituloFotografia="Perfil Frente";
                perfil_foto = "pf";
                break;
            case "FotoWebcamPD":
                TituloFotografia="Perfil Derecho";
                perfil_foto = "pd";
                break;
        }

        $("#ModalFotografiaWebcam").modal({
                                    show:true,
                                    backdrop: 'static',
                                    keyboard: true
                                });
        $(".modal-title").html("Seleccionar Fotografia de la Cámara Web");
        $(".titulo-foto").html(TituloFotografia);

        $(this).attr("disabled","disabled");
                
        $(".btn-snapshot, .btn-snapshot").removeAttr("disabled");
        Webcam.set(WebcamOptions);
        Webcam.attach('#camara_web');               
    }
});


    $("#btnActivarCamara").click(function(){
        if ($(this).hasClass("btn-default")) {
            $(this).removeClass("btn-default").addClass("btn-success").html('<i class="fa fa-power-off fa-lg"></i>&nbsp; Apagar Cámara');
            $(".btn-snapshot, .btn-snapshot").removeAttr("disabled");
            Webcam.set(WebcamOptions);
            Webcam.attach('#camara_web');
        }else{
            $(this).removeClass("btn-success").addClass("btn-default").html('<i class="fa fa-power-off fa-lg"></i>&nbsp; Encender Cámara');;
            $(".btn-snapshot, .btn-snapshot").attr("disabled","disabled");
            Webcam.reset();
        }  
    });


    $('#ModalFotografiaWebcam').on('hidden.bs.modal', function () {
      $(".btnGroup-select-photo").removeAttr("disabled");

      //Limpiamos los controles una vez cerrada la ventana modal
      $(".img-foto-fotografiaWC-cropped").attr("src","views/images/sin-fotografia.jpg");
      $(".detalles-fotografiaWC").html("");

      $("#BtnCropFotoCamara").attr("disabled","disabled");
      
      //Apagamos la camara al cerrar la ventana modal
       $("#btnActivarCamara").removeClass("btn-success").addClass("btn-default").html('<i class="fa fa-power-off fa-lg"></i>&nbsp; Encender Cámara');;
       $(".btn-snapshot, .btn-snapshot").attr("disabled","disabled");
       Webcam.reset();

      reinicializa_croppie_contanier_camara();

    });


    //Instrucciones para Croppie
    $("#BtnCropFotoCamara").attr("disabled","disabled");

    var $uploadCropWC,tempFilenameWC,rawImgWC,imageNameWC;

    $uploadCropWC = $("#PhotoFCamaraSelected").croppie({
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

    //Aqui llamar a la funcion Take_Snapshop() para capturar la fotografia desde la camara web
    $("#btnTakeSnapShot").click(function(){
        take_snapshot();
    });
    

    $('#BtnCropFotoCamara').on("click", function (ev) {
        $uploadCropWC.croppie("result", {
            type: 'base64',
            format: 'jpeg',
            backgroundColor:'#FFF',
            size: {width: 200, height: 260} //Estilo Pasaporte
        }).then(function (FotoFrenteRecortada) {
            var sizeBits = FotoFrenteRecortada.length;
            var sizeKB = sizeBits/1000;
            var sizeMB = sizeBits/1000000;

            var xToken = $("#Token_CSRF").val();
            var xIdFFH = $("#hIdFFH").val();
            var xImagen = FotoFrenteRecortada;

            $(".detalles-fotografiaWC").html("");
            $(".detalles-fotografiaWC").append("<li><strong>Tamaño:</strong> "+sizeKB.toFixed(2)+" KB</li>");
            $(".detalles-fotografiaWC").append("<li><strong>Tamaño:</strong> "+sizeMB.toFixed(2)+" MB</li>");
            $(".detalles-fotografiaWC").append("<li><strong>Ancho:</strong> 200px</li>");
            $(".detalles-fotografiaWC").append("<li><strong>Alto:</strong> 260px</li>");
            $(".detalles-fotografiaWC").append("<li><strong>Formato:</strong> jpg</li>");            

            /*Asignamos la Fotografia en la imagen correspondiente*/
            $(".img-foto-fotografiaWC-cropped").attr('src', xImagen);  
            $(".img-fotografia-preview-"+perfil_foto).attr('src', xImagen);      

            /*#####################################################################################*/
            /*Guardar Imagen Via Ajax la Imagen seleccionada*/
            $.ajax({
                url: "models/ajax_upload_photo.php",
                type: "POST",
                data: {"xToken":xToken,"xDirectorio":"fotos","xIdFFH":xIdFFH, "xImagen":xImagen},
                dataType: "JSON",
                success: function (respuesta) {
                    if (respuesta.uploaded) {
                       console.log("Fotografia guardada correctamente");
                       $("#hFotoSeleccionada").val("SI"); 
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
}); //cierra Jquery


    function take_snapshot() {
        // preload shutter audio clip
        var shutter = new Audio();
        var shutter = $("#shutter-sound")[0];
        shutter.play();

        Webcam.snap( function(data_uri) {
        $('#PhotoFCamaraSelected').removeClass('ready');
        $("#PhotoFCamaraSelected").html("");
        $uploadCropWC=null;

        $uploadCropWC = $("#PhotoFCamaraSelected").croppie({
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
      

        $uploadCropWC.croppie('bind', {
            url: data_uri
        }).then(function(){
            console.log('jQuery bind complete');
        });

        $("#BtnCropFotoCamara").removeAttr("disabled");
        });         
    }




function reinicializa_croppie_contanier_camara(){
    $('#PhotoFCamaraSelected').removeClass('ready');
    $("#PhotoFCamaraSelected").html("");
    $uploadCropWC=null

    $uploadCropWC = $('#PhotoFCamaraSelected').croppie({
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