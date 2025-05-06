jQuery(document).ready(function(){
    //Inicializamos la Variable Global para el Control FoleUpload
    $("li.personal").addClass("active");
    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var $ControlPDFUpload = $("#FileUploadPDF");
    let urlParametros     = new URLSearchParams(window.location.search);


    var tabla=$('#tablaExpediente').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.datos-expedientes.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "5%", "targets": 0, "visible":false  },
            { "width": "30%", "targets": 1 },
            { "width": "30%", "targets": 2 },
            { "width": "5%", "targets": 3 },
            { "width": "5%", "targets": 4 },
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(2),td:eq(3),td:eq(4)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablaExpediente_filter").remove();
        }
    });//Fin de Configuración del Datatables

    /***Funciones para los filtros de la tabla***/
    $('.search-input').on( 'keyup', function () {
        var i =$(this).attr('id');
        var v =$(this).val();
        tabla.columns(i).search(v).draw();
    });

    $("#btnCancelar").click(function() {
        window.location.replace("personal.php");
    });

    $("#btnAgregar").click(function(){
        $("#hOperacion").val("Agregar");

        //Falta cargar el Archivo PDF al control FileInput
        $ControlPDFUpload.fileinput({
            language: 'es',
            uploadUrl: "views/archivos/cargar_archivo_pdf.php",
            uploadAsync: false,
            autoReplace: true,
            overwriteInitial: true,
            showUploadedThumbs: false,
            maxFileCount: 1,
            browseClass: "btn btn-primary",
            browseLabel: "Seleccionar",
            browseIcon: " <i class=\"fa fa-file-pdf-o\"></i> ",
            // initialPreview: [
            //     "<img class='kv-preview-data file-preview-image' src='http://localhost/app.kardex/views/files/kardex_ejemplo.pdf'>"
            // ],
            //initialCaption: 'Initial-Image.jpg',
            initialPreviewShowDelete: false,
            showRemove: false,
            showClose: false,
            showCaption: true,
            showUpload: false,
            required: true,
            layoutTemplates: {
                actionDelete: ''
            }, // disable thumbnail deletion
            previewFileType: "application/pdf",
            allowedFileExtensions: ["pdf"],
            showBrowse: false,
            browseOnZoneClick: true,
            initialPreviewAsData: true,
            fileActionSettings: {
                showRemove: true,
                showUpload: false,
                showZoom: true,
                showDrag: false,
                showDownload: false,
            },
            uploadExtraData: function (previewId, index) {
                var data = {
                    xid_personal    : $("#hIdPersonal").val(),
                    xid_pdf         : $("#hIdPdf").val(),
                    xid_tipo_archivo: $("#selectDocumento").val(),
                    xAleatorio      : $("#hAleatorio").val(),
                    xDirectorio     : "expediente"
                };
                return data;
            },
        }).on("filebatchselected", function (event, files) {
            //$ControlUpload.fileinput("upload");
            var xrnd = str_aleatoria(10);
            $("#hAleatorio").val(xrnd);

        }).on('fileuploaderror', function (event, data, msg) {
            // var form = data.form,
            //     files = data.files,
            //     extra = data.extra,
            //     response = data.response,
            //     reader = data.reader;
            // get message
            console.log(msg);
        });


        //Mostramos la Ventana del archivo PDF
        $(".titulo-modal").html("Agregar Archivo Digital");

        $("#ModalExpedienteDigital").modal({
                                backdrop: 'static',
                                keyboard: true,
                                keyboard: false
                            });
        
    });//Finde Agregar

    $("#btnActualizar").click(function() {
        $('#tablaExpediente').DataTable().ajax.reload(null, false);
    });

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

    $('#ModalExpedienteDigital').on('shown.bs.modal', function () {
        $("#selectDocumento").focus();
    });

    $('#ModalExpedienteDigital').on('hidden.bs.modal', function () {
        // $("#form-guardar-expediente").resetForm();
        $('#form-guardar-expediente').bootstrapValidator('resetForm', true);
        $("#selectDocumento").selectpicker('val',0);
        $("#selectDocumento").selectpicker("refresh");
        $ControlPDFUpload.fileinput('destroy');
    });

    //Cargar Catalogo de Documentos
    cat_documentos(0, "selectDocumento");

    $("#btn-eliminar-documento").click(function(){
        let xid_expediente = $("#hIdExpedienteEliminar").val();
        let xtoken = $("#Token_CSRF").val();

        $.ajax({
            url: 'models/ajax/personal_expediente_cmd.php',
            data: {"xCMD":"Eliminar", "xToken":xtoken, "xid_expediente":xid_expediente},
            type: 'POST',
            dataType: 'JSON',
            beforeSend: function () {
            
            },
            success: function (respuesta) {
                if (respuesta.actualizado) {
                    mensaje('fa-check-circle', '¡Documento Eliminado!', 'El Archivo ha sido Eliminado correctamente.', 'success');

                    /*Recargamos la Tabla para actualizar*/
                    $('#tablaExpediente').DataTable().ajax.reload(null, false);
                    $("#confirm-eliminar").modal('hide');
                } else {
                    mensaje('fa-warning', '¡Evento Inesperado!', 'Ha ocurrido un evento inesperado, si el problema persiste favor de comunicar al administrador del sistema', 'danger');
                                        
                    $('#tablaExpediente').DataTable().ajax.reload(null, false);
                    $("#confirm-eliminar").modal('hide');
                }
            },
            error: function (jqXHR, status, error) {
                console.log(jqXHR);
                console.log(status);
                console.log(error);
                $('.loading').hide();
                $('#btnGuardar1, #btnGuardar2').removeAttr("disabled");
            }
        }); //cierra ajax
    });





    /**En caso de que contenga el parametro Id_Persona*/
    if (urlParametros.has("ip")){
        let xid_personal = urlParametros.get('ip');
        let xtoken       = $("#Token_CSRF").val();
        let operacion    = $("#hOperacion").val();

        $("#hOperacion").val("Agregar");
        $("#hIdPersonal").val(xid_personal);

        $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");        

        /**Aqui agregar el Ajax para poder obtener la informacion de cada una de las tablas relacionadas y asignar los valores obtenidos en los controles del formulario */

        //Obtenemos los datos de la Tabla datos_personales 
        $.ajax({
            url: 'models/ajax/datos_personales_cmd.php',
            type: 'POST',
            data:{"xCMD":"Seleccionar", "xToken":xtoken,"xid_personal":xid_personal},
            dataType: 'json',
            success: function(respuesta) {
                if (respuesta.obtenido == true && respuesta.datos != "" && respuesta.datos.id_personal >0) {
                    let p = respuesta.datos;

                    $(".ExpedienteNombre").html(p.nombre+' '+p.apellido_paterno+' '+p.apellido_materno);
                    $(".ExpedienteCURP").html(p.curp);
                    $(".ExpedienteCUIP").html(p.cuip);

                    $("#txtNombre").val(p.nombre+' '+p.apellido_paterno+' '+p.apellido_materno);
                    $("#txtCURP").val(p.curp);
                    $("#hIdPdf").val(p.id_personal);

                }else{
                    //Mostrar mensaje de que no se encontraron datos relacionados y redirigir a la pantalla de personal
                    Swal.fire({
                        icon: 'error',
                        title: '¡Sin Datos!',
                        text: 'No se encontraron coincidencias en el registro seleccionado',
                        confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Entereado`,
                        confirmButtonColor: "#d33",
                        position: 'top',
                        customClass: {
                            htmlContainer: 'sweetalert-html-container',
                            confirmButton: 'sweetalert-custom-button'
                            
                            }
                    });

                    setTimeout(() => {
                        window.location.replace("personal.php");                       
                    }, 4000);
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        }); //Fin de Ajax

    
        //Habilitar el Boton de Guardar des pues de 5s, para asegurar que sea habilitado hasta que todo este cargado corectamente
        setInterval(() => {
            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
        }, 5000);
    }else{/** En caso de no tener el parametro de Id_Persona */        
        Swal.fire({
            icon: 'error',
            title: '¡Sin Datos!',
            text: 'Seleccione el personal para acceder al Expediente Digital',
            confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Entereado`,
            confirmButtonColor: "#d33",
            position: 'top',
            customClass: {
                htmlContainer: 'sweetalert-html-container',
                confirmButton: 'sweetalert-custom-button'
                
                }
        });
        
        setTimeout(() => {
            window.location.replace("personal.php");                       
        }, 2000);
    }

    $('#form-guardar-expediente').bootstrapValidator({
        //excluded: [':disabled'],
        button: {
            selector: '[type="submit"]',
        },
        message: 'Este dato es requerido',
        live: 'enabled',
        fields: {
            selectDocumento: {
                validators: {
                    notEmpty: { message: 'Seleccione el Tipo de Documento' }
                }
            }
        }, //fin de Campos
        submitHandler: function (validator, form, submitButton) {
            var Operacion = $('#hOperacion').val();
            var xtoken    = $("#Token_CSRF").val();

            if( $("#hAleatorio").val() != null &&  $("#hAleatorio").val() != null ){
                if (Operacion === 'Agregar') {

                    //Invocamos el Evento para la carga del Archivo PDF
                    $ControlPDFUpload.fileinput("upload").on('filebatchuploadsuccess', function(event, data) {
                        $("#hArchivoPDF").val(data.response.archivo);                       
                    });

                    setTimeout(() => {
                        $.ajax({
                            url: 'models/ajax/personal_expediente_cmd.php',
                            data: $('#form-guardar-expediente').serialize() + "&xCMD=Agregar&xToken="+xtoken,
                            type: 'POST',
                            dataType: 'JSON',
                            beforeSend: function () {
                                $('#btnGuardar1, #btnGuardar2').attr("disabled", "disabled");
                                $('.loading').show();
                            },
                            success: function (respuesta) {
                                if (respuesta.agregado) {
                                    $('#btnGuardar1,#btnGuardar2').removeAttr("disabled");
                                    $('.loading').hide();
                                    /*Mostramos Mensaje*/
                                    mensaje('fa-check-circle', '¡Archivo Agregado!', 'El Archivo ha sido agregado correctamente.', 'success');
    
                                    /*Recargamos la Tabla para actualizar*/
                                    $('#tablaExpediente').DataTable().ajax.reload(null, false);
        
                                    /*Ocultamos la ventana Modal*/
                                    $("#ModalExpedienteDigital").modal('hide');
                                } else {
                                    mensaje('fa-warning', '¡Evento Inesperado!', 'Ha ocurrido un evento inesperado, si el problema persiste favor de comunicar al administrador del sistema', 'danger');
                                            
                                    $('#btnGuardar1,#btnGuardar2').removeAttr("disabled");
                                    $('.loading').hide();
                                    $('#tablaExpediente').DataTable().ajax.reload(null, false);
                                    $("#form-guardar-expediente").resetForm();
                                    $('#form-guardar-expediente').bootstrapValidator('resetForm', true);
                                }
        
                                $('.loading').hide();
                                $('#btnGuardar1, #btnGuardar2').removeAttr("disabled");
                            },
                            error: function (jqXHR, status, error) {
                                console.log(jqXHR);
                                console.log(status);
                                console.log(error);
                                $('.loading').hide();
                                $('#btnGuardar1, #btnGuardar2').removeAttr("disabled");
                            }
                        }); //cierra ajax
    
                        $("#hAleatorio").val('');
                        $("#hArchivoPDF").val('');
                    }, 2000);    
                } else if (Operacion === 'Editar') {
                    //Invocamos el Evento para la carga del Archivo PDF
                    if ($("#hNuevoPDF").val()==="true") {
                        $ControlPDFUpload.fileinput("upload");
                    }
                }
            }else{
                console.log("Sin archivo seleccionado");
            } 
        } //fin de submitHandler
    }); //fin de Validator

}); //cierra Jquery



function cat_documentos(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_documentos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.documentos);
          $("#"+ctrlSelect).selectpicker("refresh");

          if (seleccionado != '00') {
            $("#"+ctrlSelect).selectpicker('val',seleccionado);
            $("#"+ctrlSelect).selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}   

function imprimir_pdf(archivo_pdf) {
    $(".titulo-modal").html("Mostrando Documento");     
   $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/archivos/documentos/expediente/'+archivo_pdf+'#locale=es-MX');

    //Mostramos la Ventana del archivo PDF
    $("#ModalLoading").modal('hide');

    //Mostramos la Ventana del archivo PDF
    $("#ModalPreviewPDF").modal({
        backdrop: 'static',
        keyboard: true,
        keyboard: false
    }); 
}

function eliminar_documento(xid, xdocumento){
    $("#hIdExpedienteEliminar").val(xid);
    $("#DocumentoEliminar").html(xdocumento);

    $("#confirm-eliminar").modal({
        backdrop: 'static',
        keyboard: true,
        keyboard: false
   });
}