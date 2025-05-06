jQuery(document).ready(function(){
    var $uploadCrop,tempFilename,rawImg,imageName;

    /*$("#btnActualizar").click(function() {
        $('#tblHuellasDactilares').DataTable().ajax.reload(null, false);
       $('.search-input').val('');
        tabla.search('').columns().search('').draw();
    });*/

    /*$("#tblHuellasDactilares tbody image.foto-grid").click(function(){
        console.log("Clik en la foto "+this);
    });*/


    /*$("#btnInfoHuellas").click(function() {
        $('#ModalInfoHuellas').modal({
            backdrop: 'static',
            keyboard: true,
        });
    });*/

    /* ====================================================================================
        Se requieren las Huellas 
		- Mano derecha:   Pulgar 1, Índice 2, Medio 3, Anular 4 y Meñique 5
		- Mano izquierda: Pulgar 6, Índice 7, Medio 8, Anular 9 y Meñique 0 
	======================================================================================*/

    //Definicion para el control Croppie
    $uploadCrop = $("#img-recortar").croppie({
        enableExif: true,
        showZoomer: true,
        viewport: {
           width: 150,
           height: 190
        },
        boundary: {
            width: 250,
            height: 300
        },
        enforceBoundary: false,
    });


    //Aqui reiniciamos los controles inputs para que sea posible elegir la misma imagen nuevamente y cargarla en el croppie
    $("#input-PulgarDerecho, #input-IndiceDerecho, #input-MedioDerecho, #input-AnularDerecho, #input-MeniqueDerecho, #input-PulgarIzquierdo, #input-IndiceIzquierdo, #input-MedioIzquierdo, #input-AnularIzquierdo, #input-MeniqueIzquierdo").click(function() {
		$(this).val("");
	});


	$("#input-PulgarDerecho, #input-IndiceDerecho, #input-MedioDerecho, #input-AnularDerecho, #input-MeniqueDerecho, #input-PulgarIzquierdo, #input-IndiceIzquierdo, #input-MedioIzquierdo, #input-AnularIzquierdo, #input-MeniqueIzquierdo").on("change", function () {
		const HuellaSeleccionada = $(this).attr("data-huella");
		$("#hdHuellaSeleccionada").val(HuellaSeleccionada);

		$("#ImagenGrande").hide();
		$("#img-croppie").show();
        loadFile(this);
    });

    //Opciones del Pluigns Croppie
	$('#BtnCropPhotoFile1').on("click", function(ev) {
        $uploadCrop.croppie("result", {
            type: 'base64',
            format: 'jpeg',
            backgroundColor:'#FFF',
            quality:0.9,
            size: {width: 150, height: 190} 
        }).then(function (FotoRecortada) {
			var stringLength = FotoRecortada.length - 'data:image/jpeg;base64,'.length;
			var sizeInBytes  = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;

			var sizeKB = sizeInBytes/1024;
			var sizeMB = sizeInBytes/1048576;
            var xFotoRecortada = FotoRecortada;

			const HuellaSeleccionada = $("#hdHuellaSeleccionada").val();

			/*La imagen debe ser en formato jpg y con máximo de 120Kb*/
			if (sizeKB.toFixed(0) < 120) {
				switch (HuellaSeleccionada){
					case "PulgarDerecho":
							$("#imgPulgarDerecho").attr('src', xFotoRecortada);
                            $("#input-PulgarDerecho").attr("data-agregado", "true");
						break;
					case "IndiceDerecho":
							$("#imgIndiceDerecho").attr('src', xFotoRecortada);
							$("#input-IndiceDerecho").attr("data-agregado", "true");
						break;
					case "MedioDerecho":
							$("#imgMedioDerecho").attr('src', xFotoRecortada);
							$("#input-MedioDerecho").attr("data-agregado", "true"); 
						break;
                    case "AnularDerecho":
                            $("#imgAnularDerecho").attr('src', xFotoRecortada);
                            $("#input-AnularDerecho").attr("data-agregado", "true");
                    break;
                    case "MeniqueDerecho":
							$("#imgMeniqueDerecho").attr('src', xFotoRecortada);
							$("#input-MeniqueDerecho").attr("data-agregado", "true");
						break;
                    case "PulgarIzquierdo":
                            $("#imgPulgarIzquierdo").attr('src', xFotoRecortada);
                            $("#input-PulgarIzquierdo").attr("data-agregado", "true");
                        break;
                    case "IndiceIzquierdo":
                            $("#imgIndiceIzquierdo").attr('src', xFotoRecortada);
                            $("#input-IndiceIzquierdo").attr("data-agregado", "true");
                        break;
                    case "MedioIzquierdo":
                            $("#imgMedioIzquierdo").attr('src', xFotoRecortada);
                            $("#input-MedioIzquierdo").attr("data-agregado", "true"); 
                        break;
                    case "AnularIzquierdo":
                            $("#imgAnularIzquierdo").attr('src', xFotoRecortada);
                            $("#input-AnularIzquierdo").attr("data-agregado", "true");
                    break;
                    case "MeniqueIzquierdo":
                            $("#imgMeniqueIzquierdo").attr('src', xFotoRecortada);
                            $("#input-MeniqueIzquierdo").attr("data-agregado", "true");
                        break;
				
					default:
						console.log("No deberia entrar Aqui");
						break;
				}				
			}else{
				Swal.fire({
					icon: 'error',
					title: '¡La Huella Recortada excede el tamaño!',
					text: 'La Huella Recortada excede el tamaño de 120kb, permitido por Plataforma México'
				});
			}
        });
    });



	/*$("#btnAgregarHuellas").click(function(){
        $("#hOperacionImagenes").val('Agregar');
		$("#TituloModalHuellasDactilares").html('Agregar Huellas Dactilares');
		$('#ModalHuellasDactilares').modal({
								backdrop: 'static',
								keyboard: true,
								keyboard: false
							});
	});*/

	$(".cr-image").attr("src", "views/images/pixel.png");
    /*$('#ModalHuellasDactilares').on('shown.bs.modal', function () {
        $("#txtDescripcionExpediente").focus();
        $(".cr-image").attr("src", "06_medios/_imgs/pixel.png");
    });

    $('#ModalHuellasDactilares').on('hidden.bs.modal', function () {
        $("#form-guardar-huellas-dactilares").bootstrapValidator('resetForm', true);
        $("#imgPulgarDerecho, #imgIndiceDerecho, #imgMedioDerecho, #imgAnularDerecho, #imgMeniqueDerecho, #imgPulgarIzquierdo, #imgIndiceIzquierdo, #imgMedioIzquierdo, #imgAnularIzquierdo, #imgMeniqueIzquierdo").attr('src', "06_medios/_imgs/sin-huella.jpg");

        $("#mensajes").hide();
        $("#mensajes ul").empty();
        $(".loading").hide();
        $("#input-PulgarDerecho, #input-IndiceDerecho, #input-MedioDerecho, #input-AnularDerecho, #input-MeniqueDerecho, #input-PulgarIzquierdo, #input-IndiceIzquierdo, #input-MedioIzquierdo, #input-AnularIzquierdo, #input-MeniqueIzquierdo").attr("data-agregado", "false");        
    });*/


    $("#form-guardar-huellas-dactilares").bootstrapValidator({
        button: {
            selector: '[type="submit"]',
        },
        message: 'Este dato es requerido',
        fields: {
            txtDescripcionExpediente: {
                validators: {
                    notEmpty: {
                        message: 'La Descripcion del Expediente es requerida'
                    }
                }
            },
        },
        submitHandler: function (validator, form, submitButton) {
            let errors="";
            $("#mensajes ul").empty();
            
            let PD = $("#input-PulgarDerecho").attr("data-agregado");
            let ID = $("#input-IndiceDerecho").attr("data-agregado");
            let MD = $("#input-MedioDerecho").attr("data-agregado");
            let AD = $("#input-AnularDerecho").attr("data-agregado");
            let ND = $("#input-MeniqueDerecho").attr("data-agregado");

            let PI = $("#input-PulgarIzquierdo").attr("data-agregado");
            let II = $("#input-IndiceIzquierdo").attr("data-agregado");
            let MI = $("#input-MedioIzquierdo").attr("data-agregado");
            let AI = $("#input-AnularIzquierdo").attr("data-agregado");
            let NI = $("#input-MeniqueIzquierdo").attr("data-agregado");

            //Verificar que almenos una huella esta cargada
            errors+= (PD==="true" || ID==="true" || MD==="true" || AD==="true" || ND==="true") ?  "" : "<li>Agregue almenos una huella de la mano Derecha</li>";
            errors+= (PI==="true" || II==="true" || MI==="true" || AI==="true" || NI==="true") ?  "" : "<li>Agregue almenos una huella de la mano Izquierda</li>";

            if(errors.length > 0){
                //Mostramos los mensajes de errores de las fotografias
                $("#mensajes").show("swing");
                $("#mensajes ul").append(errors);

                //Reinicio de las validaciones del formulario
                let descripcion = $("#txtDescripcionExpediente").val();
                $('#form-guardar-huellas-dactilares').bootstrapValidator('resetForm', true);
                $("#txtDescripcionExpediente").val(descripcion);
            }else{
                if ($("#hdIdDatosGenerales").val()) {
                    $("#mensajes").hide();
                    $("#mensajes ul").empty();    
                    $(".loading").show();

                    //Se obtienen los IDs de las Imagenes a Editar
                    let xIDPulgarDerecho    = $("#IdImagenesPulgarDerecho").val();
                    let xIDIndiceDerecho    = $("#IdImagenesIndiceDerecho").val();
                    let xIDMedioDerecho     = $("#IdImagenesMedioDerecho").val();
                    let xIDAnularDerecho    = $("#IdImagenesAnularDerecho").val();
                    let xIDMeniqueDerecho   = $("#IdImagenesMeniqueDerecho").val();
                    let xIDPulgarIzquierdo  = $("#IdImagenesPulgarIzquierdo").val();
                    let xIDIndiceIzquierdo  = $("#IdImagenesIndiceIzquierdo").val();
                    let xIDMedioIzquierdo   = $("#IdImagenesMedioIzquierdo").val();
                    let xIDAnularIzquierdo  = $("#IdImagenesAnularIzquierdo").val();
                    let xIDMeniqueIzquierdo = $("#IdImagenesMeniqueIzquierdo").val();

                    //Se Obtienen las Imagenes en Base64
                    let xB64PulgarDerecho    = $("#imgPulgarDerecho").attr('src');
                    let xB64IndiceDerecho    = $("#imgIndiceDerecho").attr('src');
                    let xB64MedioDerecho     = $("#imgMedioDerecho").attr('src');
                    let xB64AnularDerecho    = $("#imgAnularDerecho").attr('src');
                    let xB64MeniqueDerecho   = $("#imgMeniqueDerecho").attr('src');
                    let xB64PulgarIzquierdo  = $("#imgPulgarIzquierdo").attr('src');
                    let xB64IndiceIzquierdo  = $("#imgIndiceIzquierdo").attr('src');
                    let xB64MedioIzquierdo   = $("#imgMedioIzquierdo").attr('src');
                    let xB64AnularIzquierdo  = $("#imgAnularIzquierdo").attr('src');
                    let xB64MeniqueIzquierdo = $("#imgMeniqueIzquierdo").attr('src');

                    let xid_grupo = Date.now();
    
                    //Agregamos los objetos al arreglo de objetos
                    //- Mano derecha:   Pulgar 1, Índice 2, Medio 3, Anular 4 y Meñique 5
		            //- Mano izquierda: Pulgar 6, Índice 7, Medio 8, Anular 9 y Meñique 0 
                    let huellas = [];
                    huellas.push({"xIdImagenes":xIDPulgarDerecho, "xB64":xB64PulgarDerecho, "xid_grupo":xid_grupo, "xgrupo":"1", "sufijo":"_pulgar_derecho"});
                    huellas.push({"xIdImagenes":xIDIndiceDerecho, "xB64":xB64IndiceDerecho, "xid_grupo":xid_grupo, "xgrupo":"2", "sufijo":"_indice_derecho"});
                    huellas.push({"xIdImagenes":xIDMedioDerecho, "xB64":xB64MedioDerecho, "xid_grupo":xid_grupo, "xgrupo":"3", "sufijo":"_medio_derecho"});
                    huellas.push({"xIdImagenes":xIDAnularDerecho, "xB64":xB64AnularDerecho, "xid_grupo":xid_grupo, "xgrupo":"4", "sufijo":"_anular_derecho"});
                    huellas.push({"xIdImagenes":xIDMeniqueDerecho, "xB64":xB64MeniqueDerecho, "xid_grupo":xid_grupo, "xgrupo":"5", "sufijo":"_menique_derecho"});
                    huellas.push({"xIdImagenes":xIDPulgarIzquierdo, "xB64":xB64PulgarIzquierdo, "xid_grupo":xid_grupo, "xgrupo":"6", "sufijo":"_pulgar_izquierdo"});
                    huellas.push({"xIdImagenes":xIDIndiceIzquierdo, "xB64":xB64IndiceIzquierdo, "xid_grupo":xid_grupo, "xgrupo":"7", "sufijo":"_indice_izquierdo"});
                    huellas.push({"xIdImagenes":xIDMedioIzquierdo, "xB64":xB64MedioIzquierdo, "xid_grupo":xid_grupo, "xgrupo":"8", "sufijo":"_medio_izquierdo"});
                    huellas.push({"xIdImagenes":xIDAnularIzquierdo, "xB64":xB64AnularIzquierdo, "xid_grupo":xid_grupo, "xgrupo":"9", "sufijo":"_anular_izquierdo"});
                    huellas.push({"xIdImagenes":xIDMeniqueIzquierdo, "xB64":xB64MeniqueIzquierdo, "xid_grupo":xid_grupo, "xgrupo":"0", "sufijo":"_menique_izquierdo"});

                    $.each(huellas, function(idobjhuella, huella){
                        setTimeout(() => {
                            //Aqui hacer un ajax para guardar cada una de las imagenes
                            //Primero un Ajax para Crear el archivo de imagen, una vez guardada insertar en la BD con otra Ajax   
                            let xIdImagenes     = huella["xIdImagenes"]; 
                            let xnombre_huella  = xid_grupo + huella["sufijo"];
                            let xHuellaB64_foto = huella["xB64"];
                                                       
                            //Aqui verificar si xB64 contiene la imagen relacionada a una huella codificada en Base64, encaso contrario omitir la carga en la BD
                            if(xHuellaB64_foto.indexOf("data:image/jpeg;base64")>=0){
                                //Aqui el Ajax para guardar uno a uno las imagenes de huellas, 
                                //Agregar solo aquellas huellas que hayan sido seleccionadas, asignar un estatus que indiquen que se han seleccionado
                                $.ajax({
                                    url: "06_medios/base64_to_image.php",
                                    type: "POST",
                                    data: {"xDirectorio":"19_IMAGENES/huellas_dactilares", "xnombre_foto":xnombre_huella, "xFotoB64_foto":xHuellaB64_foto},
                                    dataType: "JSON",
                                    success: function (resphuella) {
                                        if (resphuella.generada) {
                                            let xIdDatosGenerales  = $("#hdIdDatosGenerales").val(); //ID Datos Generales viene desde la URL mediante $_GET
                                            let xDescripcionImagen = $("#txtDescripcionExpediente").val().toUpperCase();
                                            let xIdGrupo           = huella["xid_grupo"];
                                            let xGrupo             = huella["xgrupo"]; 
                                            let xNombreHuella      = resphuella.archivo_foto;
                                            
                                            if($("#hOperacionImagenes").val() === "Agregar"){
                                                $.ajax({
                                                    url: "06_medios/bloque6_19_imagenes_cmd.php",
                                                    type: "POST",
                                                    data: {"xCMD":"GuardarHuellas", "xIdDatosGenerales":xIdDatosGenerales, "xDescripcionImagen":xDescripcionImagen, "xGrupo":xGrupo, "xIdGrupo":xIdGrupo, "xNombreHuella":xNombreHuella },
                                                    dataType: "JSON",
                                                    beforeSend: function(){

                                                    },
                                                    success: function (respuesta) {
                                                        $('#tblHuellasDactilares').DataTable().ajax.reload(null, false);
                                                    },
                                                    error: function(jqXHR, status, error) {
                                                        console.log(jqXHR, status, error);
                                                    }
                                                });/*Fin de Ajax*/
                                            }else if($("#hOperacionImagenes").val() === "Editar"){
                                                $.ajax({
                                                    url: "06_medios/bloque6_19_imagenes_cmd.php",
                                                    type: "POST",
                                                    data: {"xCMD":"EditarHuellas", "xIdImagenes":xIdImagenes, "xIdDatosGenerales":xIdDatosGenerales, "xDescripcionImagen":xDescripcionImagen, "xGrupo":xGrupo, "xIdGrupo":xIdGrupo, "xNombreHuella":xNombreHuella},
                                                    dataType: "JSON",
                                                    beforeSend: function(){
                                                        
                                                    },
                                                    success: function (respuesta) {
                                                        $('#tblHuellasDactilares').DataTable().ajax.reload(null, false);
                                                    },
                                                    error: function(jqXHR, status, error) {
                                                        console.log(jqXHR, status, error);
                                                    }
                                                });
                                            }else{
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: '¡Error!',
                                                    text: 'Error al Intentar Editar las Fotografías'
                                                });
                                            }
                                        } else {
                                            console.error("No fue posible generar el archivo de la fotografia");
                                        }                        
                                    },
                                    error: function(jqXHR, status, error) {
                                        console.log(jqXHR, status, error);
                                    }
                                });/*Fin de Ajax*/                                
                            }
                    
                            //Aqui cerrar la ventana modal una vez finalizado el proceso
                            if (idobjhuella == huellas.length-1) {
                                $('#ModalHuellasDactilares').modal('hide');
                                $('#tblHuellasDactilares').DataTable().ajax.reload(null, false);
                            }                            
                        }, 800);
                    }); 
    
                                      
                } else {
                    $("#mensajes").show("swing");
                    $("#mensajes ul").append("EL Identificadr de Datos Generales no Se cargo correctamente, pulse F5 e intente cargar nuevamente las fotos de Perfil");
                }
            }
        } //fin de submitHandler
    }); //fin de Validator




    function loadFile(input) {
        if (input.files && input.files[0]) {
            /*Verificamos que solo sean imagenes*/
            if (input.files[0].type==='image/png' || input.files[0].type==='image/jpeg') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    rawImg = e.target.result;

                    $uploadCrop.croppie("bind", {
                        url: rawImg
                    }).then(function(){
                        // console.log("jQuery bind complete");
                    });
                }

                /*Con esta comparacion evitamos el error cuando se cancela la seleccion dela imagen*/
                if (input.files[0] !== undefined) {
                    reader.readAsDataURL(input.files[0]);
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '¡Formato no Válido!',
                    text: 'Solo se permiten Archivos de Imagen con extensión .png y .jpeg'
                });
            }
        }else {
            console.log("El usuario canceló la selección de la Fotografía o el navegador no soporta la FileReader API");
        }
    }

});/*Fin de JQuery*/


function vista_previa(url_image, grupo){
    let titulo_huella;
    switch (grupo) {
        case '1':
            titulo_huella="<strong>Grupo: 1</strong> - PULGAR DERECHO";
            break;
        case '2':
            titulo_huella="<strong>Grupo: 2</strong> - INDICE DERECHO";
        break;    
        case '3':
            titulo_huella="<strong>Grupo: 3</strong> - MEDIO DERECHO";
        break;
        case '4':
            titulo_huella="<strong>Grupo: 4</strong> - ANULAR DERECHO";
            break;
        case '5':
            titulo_huella="<strong>Grupo: 5</strong> - MEÑIQUE DERECHO";
        break;    
        case '6':
            titulo_huella="<strong>Grupo: 6</strong> - PULGAR IZQUIERDO";
        break;
        case '7':
            titulo_huella="<strong>Grupo: 7</strong> - INDICE IZQUIERDO";
            break;
        case '8':
            titulo_huella="<strong>Grupo: 8</strong> - MEDIO IZQUIERDO";
        break;    
        case '9':
            titulo_huella="<strong>Grupo: 9</strong> - ANULAR IZQUIERDO";
        break;
        case '0':
            titulo_huella="<strong>Grupo: 0</strong> - MEÑIQUE IZQUIERDO";
        break;
    }

    //$(".modal-title").html(titulo_huella);
    $("#imgVistaPrevia").attr("src", url_image);
    //$("#ModalVistaPrevia").modal({keyboard:true, keyboard:true});
}



function editar_huellas_dactilares(id_h1, id_h2, id_h3, id_h4, id_h5, id_h6, id_h7, id_h8, id_h9, id_h0){
    let id_huellas = [];
    id_huellas.push(id_h1);
    id_huellas.push(id_h2);
    id_huellas.push(id_h3);
    id_huellas.push(id_h4);
    id_huellas.push(id_h5);
    id_huellas.push(id_h6);
    id_huellas.push(id_h7);
    id_huellas.push(id_h8);
    id_huellas.push(id_h9);
    id_huellas.push(id_h0);


    id_huellas.forEach(xid_imagen => {
        $.ajax({
            url: "06_medios/bloque6_19_imagenes_cmd.php",
            type: "POST",
            data: {"xCMD":"Seleccionar", "xIdImagen":xid_imagen, "xDirectorio":"huellas_dactilares"},
            dataType: "JSON",
            beforeSend: function(){
                
            },
            success: function (respuesta) {
                let img = respuesta.datos;
                $("#hOperacionImagenes").val("Editar");

                if (respuesta.obtenido) {
                    $("#hdIdDatosGenerales").val(img.ID_DATOS_GENERALES);
                    $("#txtDescripcionExpediente").val(img.DESIMA);

                    //Aqui agregar una opcion para identificar si es Edicion 
                    let ruta_imagen = "";

                    switch (img.GRUPO) {                        
                        case '1':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgPulgarDerecho").attr("src", respuesta.imagenB64);
                            $("#input-PulgarDerecho").attr("data-agregado", "true");
                            $("#IdImagenesPulgarDerecho").val(img.ID_IMAGENES);
                        break;
                        case '2':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgIndiceDerecho").attr("src", respuesta.imagenB64);
                            $("#input-IndiceDerecho").attr("data-agregado", "true");
                            $("#IdImagenesIndiceDerecho").val(img.ID_IMAGENES);
                        break;
                        case '3':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgMedioDerecho").attr("src", respuesta.imagenB64);
                            $("#input-MedioDerecho").attr("data-agregado", "true");
                            $("#IdImagenesMedioDerecho").val(img.ID_IMAGENES);
                        break;
                        case '4':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgAnularDerecho").attr("src", respuesta.imagenB64);
                            $("#input-AnularDerecho").attr("data-agregado", "true");
                            $("#IdImagenesAnularDerecho").val(img.ID_IMAGENES);
                        break;
                        case '5':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgMeniqueDerecho").attr("src", respuesta.imagenB64);
                            $("#input-MeniqueDerecho").attr("data-agregado", "true");
                            $("#IdImagenesMeniqueDerecho").val(img.ID_IMAGENES);
                        break;


                        case '6':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgPulgarIzquierdo").attr("src", respuesta.imagenB64);
                            $("#input-PulgarIzquierdo").attr("data-agregado", "true");
                            $("#IdImagenesPulgarIzquierdo").val(img.ID_IMAGENES);
                        break;
                        case '7':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgIndiceIzquierdo").attr("src", respuesta.imagenB64);
                            $("#input-IndiceIzquierdo").attr("data-agregado", "true");
                            $("#IdImagenesIndiceIzquierdo").val(img.ID_IMAGENES);
                        break;
                        case '8':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgMedioIzquierdo").attr("src", respuesta.imagenB64);
                            $("#input-MedioIzquierdo").attr("data-agregado", "true");
                            $("#IdImagenesMedioIzquierdo").val(img.ID_IMAGENES);
                        break;
                        case '9':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgAnularIzquierdo").attr("src", respuesta.imagenB64);
                            $("#input-AnularIzquierdo").attr("data-agregado", "true");
                            $("#IdImagenesAnularIzquierdo").val(img.ID_IMAGENES);
                        break;
                        case '0':
                            ruta_imagen ='06_medios/19_IMAGENES/huellas_dactilares/'+img.imagen_local;
                            $("#imgMeniqueIzquierdo").attr("src", respuesta.imagenB64);
                            $("#input-MeniqueIzquierdo").attr("data-agregado", "true");
                            $("#IdImagenesMeniqueIzquierdo").val(img.ID_IMAGENES);
                        break;
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error al recuperar la huella!',
                        text: 'Hubo un error al intentar recuperar la huella del grupo: '+img.GRUPO+ '. Cierre esta pantalla e intente editar nuevamente.'
                    });
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        });/*Fin de Ajax*/
    });


    //$("#TituloModalHuellasDactilares").html('Editando las Huellas Dactilares');
    /*$('#ModalHuellasDactilares').modal({
                            backdrop: 'static',
                            keyboard: true,
                            keyboard: false
                        });*/
}