var $ControlPDFUpload = $("#FileUploadPDF");

jQuery(document).ready(function(){
    $("li.ief").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaIncidencias').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.incidencias.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "5%", "targets": 0, "visible":false },
            { "width": "15%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "6%", "targets": 4 },
            { "width": "10%", "targets": 5 },
            { "width": "28%", "targets": 6 },
            { "width": "6%", "targets": 7 },
            { "width": "4%", "targets": 8 },
            { "width": "4%", "targets": 9 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(2),td:eq(3),td:eq(4),td:eq(7),td:eq(8),td:eq(9)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablaIncidencias_filter").remove();
        }
    });//Fin de Configuración del Datatables
    
    $("#txtBuscar").focus();

    /***Funciones para los filtros de la tabla***/
    $('.search-input').on( 'keyup', function () {
        var i =$(this).attr('id');
        var v =$(this).val();
        tabla.columns(i).search(v).draw();
    });

    $("#txtBuscar").keyup(function(){
        if($(this).val().length > 3){
            let buscar = $(this).val();
            tabla.search(buscar).draw();            
        }

        if($(this).val().length == 0){
            $("#txtBuscar").val('');
            $('#tablaIncidencias').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $('#tablaIncidencias').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });


    /********************************************************** */
    $("#txtBuscarPersonal").keyup(function(){
        if($(this).val().length > 3){
            let buscar = $(this).val();
            tablaPersonal.search(buscar).draw();            
        }

        if($(this).val().length == 0){
            $("#txtBuscarPersonal").val('');
            $('#tablaVacaciones').DataTable().ajax.reload(null, false);
            tablaPersonal.search('').columns().search('').draw();
        }
    });

    $("#btnLimpiarBusqueda").click(function() {
        $("#txtBuscarPersonal").val('');
        $('#tablaVacaciones').DataTable().ajax.reload(null, false);
        tablaPersonal.search('').columns().search('').draw();
        $("#txtBuscarPersonal").focus();
    });

    $("#btnBuscarPersonal").click(function() {
        if($("#txtBuscarPersonal").val().length > 3){
            let buscar = $("#txtBuscarPersonal").val();
            tablaPersonal.search(buscar).draw();            
        }
    });

    var tablaPersonal;
    $("#modal-busquedas").on('shown.bs.modal', function(e) {
        $("#loadingBusqueda").show();
        setTimeout(() => {
            $("#txtBuscarPersonal").focus();
            $("#loadingBusqueda").hide();

            tablaPersonal=$('#tablaPersonal').DataTable({
                "processing": true,
                "serverSide": true,
                "responsive":true,
                "destroy": true,
                "pageLength": 5,
                "lengthMenu": [
                    [5,10, 25, 100],
                    [5,10, 25, 100]
                ],
                "ajax": "models/ssp/ssp.personal-busquedas.php",
                "language": {
                    "url": "views/_js/Spanish.json"
                },
                "aaSorting": [[0, "desc"]],
                "columnDefs": [
                    {
                      "targets": 'no-sort',
                      "orderable": false,
                    },
                    { "width": "5%", "targets": 0 , "visible":false},
                    { "width": "6%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "8%", "targets": 3 },
                    { "width": "17%", "targets": 4 },
                    { "width": "25%", "targets": 5 },
                    { "width": "5%", "targets": 6 },
                ],
                "rowCallback": function(row, data, index) {
                    $('td:eq(0),td:eq(2),td:eq(5)', row).css({"text-align":"center"});
                    $('td', row).css({"vertical-align":"middle"});
                    // $('td:eq(2)', row).css({"font-weight":"bold"});
                },
                "initComplete": function (settings, json) {
                    $("#tablaPersonal_filter").remove();
                    $("div.table-personal div.dataTables_length").replaceWith( "&nbsp;" );
                }
            });//Fin de Configuración del Datatables
    
    
            /***Funciones para los filtros de la tabla***/
            $('.search-input-personal').on( 'keyup', function () {
                var i =$(this).attr('id');
                var v =$(this).val();
                tablaPersonal.columns(i).search(v).draw();
            });

            $(".table-personal").removeClass('oculto');
        }, 800);
    });

    $("#modal-busquedas").on('hidden.bs.modal', function(e) {
        $("#txtBuscarPersonal").val('');
        $("#1, #2, #3, #4, #5, #6").val('');
        $(".table-personal").addClass('oculto');
        tablaPersonal.clear();
        tablaPersonal.destroy();
    });

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

    $("#btnAgregar").click(function(){
        $("#modal-busquedas").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    });

    //Cargamos los catalogo
    cat_tipo_incidencias("00");

    $("#modal-agregar-incidencias").on('hidden.bs.modal', function(e) {        
        $("#form-guardar-incidencias").resetForm();
        $('#form-guardar-incidencias').bootstrapValidator('resetForm', true);

        //$ControlPDFUpload.fileinput('destroy');
        window.location.reload();
    });

    $("#modal-agregar-incidencias").on('shown.bs.modal', function(e) {
        
    });

    $("#txtFecha").datepicker({
        inline: false,
        showButtonPanel: false,
        minDate: "-30y",
        maxDate: "0",
        changeMonth: true,
        firstDay: 1,
        numberOfMonths: 1,
        currentText: true,
        dateFormat: 'dd-mm-yy',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        changeYear: true,
        beforeShowDay: $.datepicker.noWeekends,
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 100);
        },
        onSelect: function (selectedDate) {
            $('#form-guardar-incidencias').bootstrapValidator('enableFieldValidators', 'txtFecha', 'notEmpty', false);
            //$('#form-guardar-vacaciones').bootstrapValidator('revalidateField', 'txtFechaEmision');
            //$('#form-guardar-vacaciones').bootstrapValidator('updateStatus', 'txtFechaEmision', 'NOT_VALIDATED').bootstrapValidator('validateField', 'txtFechaEmision');
        }
    });



    $("#form-guardar-incidencias").bootstrapValidator({
        excluded: [':disabled'],
        button: {
            selector: '[type="submit"]',
        },
        message: 'Este valor no es valido',
        live: 'enabled',
        // feedbackIcons: {
        //     valid: 'glyphicon glyphicon-ok',
        //     invalid: 'glyphicon glyphicon-remove',
        //     validating: 'glyphicon glyphicon-refresh'
        // },
        fields: {
            txtFecha: {
                validators: {
                    notEmpty: { message: 'La Fecha es Requerida' }
                }
            },
            selectTipoIncidencia: {
                validators: {
                    notEmpty: { message: 'La Fecha Final es Requerida' }
                }
            },
            txtNoOficio: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtMotivoLicencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            FileUploadPDF: {
                validators: {
                    notEmpty: { message: 'Seleccione el Archivo PDF de la Incidencia' }
                }
            }            
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#Token_CSRF").val();
            var operacion = $("#hOperacion").val();

            //Primero Verificamos que no existe un periodo ya asignado
            $.ajax({
                url: 'models/ajax/datos_incidencias_cmd.php',
                data: $("#form-guardar-incidencias").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    $('.loading2').show();
                },
                success: function(respuesta) {
                    console.log(respuesta);

                    if (respuesta.procesado) {
                        //Se carga el archivo PDF
                        if($("#hNuevoPDF").val() == 'true' && $("#hAleatorio").val() !== ""){
                            $ControlPDFUpload.fileinput("upload");
                        }else{
                            if($("#hOperacion").val()=="Editar" && $("#hArchivoPDF").val() === "" && $("#hAleatorio").val() !== ""){
                                $ControlPDFUpload.fileinput("upload");
                            }
                        }

                        if (respuesta.comando=="Agregar") {
                            if (respuesta.procesado) {
                                setTimeout(() => {
                                    $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                                    $('.loading2').hide();
                                    $('#tablaIncidencias').DataTable().ajax.reload(null, false);
                                    $('#modal-agregar-incidencias').modal('hide');
                                }, 2000);

                            }else{
                                switch (respuesta.codigo) {
                                    case '23000':
                                        Swal.fire({
                                            icon: 'error',
                                            title: '¡Licencia Duplicada!',
                                            text: 'Ya existe un registro de solicitud de Licencia con las Fechas Seleccionadas',
                                            confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
                                            confirmButtonColor: "#d33",
                                            position: 'top',
                                            customClass: {
                                                htmlContainer: 'sweetalert-html-container',
                                                confirmButton: 'sweetalert-custom-button'
                                            }
                                        });
    
                                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                                        $('.loading2').hide();
                                        $('#tablaIncidencias').DataTable().ajax.reload(null, false);
                                        break;
    
                                    case 'NoComand':
                                        break;
    
                                    case 'NoInsert':
                                        break;
                                
                                    default:
                                        break;
                                }
                            }
                        } else if(respuesta.comando=="Editar") {
                            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                            $('.loading2').hide();
                            $('#tablaIncidencias').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-incidencias').modal('hide');
    
                            if (respuesta.procesado==true && respuesta.actualizado==1) {
                                mensaje('fa-check-circle','¡Actualizado!.','Los datos han sido actualizados correctamente','success');
                            }else{
                                mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                            }
                        }else{
                            console.info(respuesta);
                            console.log("Error no Esperado");
                        }
                    } else {
                        
                    }
                },
                error: function(jqXHR, status, error) {
                    console.warn(jqXHR, status, error);
                    $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                    $('.loading2').hide();
                }
            }); //cierra ajax


        } //fin de submitHandler
    }); //fin de Validator



}); //cierra Jquery

function editar_incidencia(id_incidencia){
    let xtoken    = $("#Token_CSRF").val();
    let operacion = $("#hOperacion").val();

    $(".titulo-modal").html("Editando Incidencia de Personal");
    $("#hOperacion").val("Editar");
    $("#hIdIncidencia").val(id_incidencia);

    $.ajax({
        url: 'models/ajax/datos_incidencias_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_incidencia":id_incidencia},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {

        },
        success: function(respuesta) {
           console.log(respuesta);
          if (respuesta.obtenido) {
            let p = respuesta.incidencia;

            //Asignar los datos obtenidos 
            $(".infoNoEmpleado").html(p.num_empleado);
            $(".infoNombre").html(p.nombre_completo);
            $("#txtFecha").datepicker("setDate", p.fecha);
            $("#selectTipoIncidencia").selectpicker('val',p.id_tipo_incidencia); 
            $("#selectTipoIncidencia").selectpicker("refresh");
            $("#txtNoOficio").val(p.no_oficio);
            $("#txtMotivo").val(p.motivo_incidencia);
            
            $("#hIdPersonal").val(p.id_personal);
            $("#hArchivoPDF").val(p.documento_pdf);

            //Configuracion del File Input para mostrar el Documento Existente, poder eliminarlo y cargar uno nuevo
            $ControlPDFUpload.fileinput({
                language: 'es',
                uploadUrl: "views/archivos/cargar_archivo_pdf.php",
                uploadAsync: false,
                autoReplace: true,
                overwriteInitial: true,
                showUploadedThumbs: false,
                maxFileCount: 1,
                browseClass: "btn btn-primary",
                browseLabel: " Seleccionar",
                browseIcon: " <i class=\"fa fa-file-pdf-o\"></i> ",
                initialPreview: [
                    'views/archivos/documentos/incidencias/'+p.documento_pdf
                ],
                initialPreviewConfig: [
                    {type: 'pdf', description: "<h5>Archivo PDF</h5>", size: 3072}
                ],
                //initialCaption: 'Initial-Image.jpg',
                initialPreviewShowDelete: false,
                showRemove: true,
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
                        xid_tipo_archivo: $("#selectTipoIncidencia").val(),
                        xAleatorio      : $("#hAleatorio").val(),
                        xDirectorio     : "incidencia"
                    };
                    return data;
                },
            }).on("filebatchselected", function (event, files) {
                //$ControlUpload.fileinput("upload");
                var xrnd = str_aleatoria(10);
                $("#hAleatorio").val(xrnd);
                $("#hNuevoPDF").val(false);
            }).on('fileclear', function(event) {
                console.log("fileclear");
                $("#hArchivoPDF").val("");
                $("#form-guardar-incidencias").bootstrapValidator('enableFieldValidators', 'FileUploadPDF', true, 'notEmpty');

            }).on('fileuploaderror', function (event, data, msg) {
                var form = data.form,
                    files = data.files,
                    extra = data.extra,
                    response = data.response,
                    reader = data.reader;
                console.log('File upload error');
                // get message
                console.log(msg);
            }).on('fileuploaded', function (event, data, id, index) {
                console.log(data);
                $("#hArchivoPDF").val(true);
            });


            
            $("#form-guardar-incidencias").bootstrapValidator('enableFieldValidators', 'FileUploadPDF', false, 'notEmpty');
            
            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#modal-agregar-incidencias").modal({
                    backdrop: 'static',
                    keyboard: true,
                    keyboard: false
                });
            }, 300);          
          }else{
            Swal.fire({
                icon: 'error',
                title: '¡Error Detectado!',
                text: 'Ha Ocurrido un error inesperado al recuperar los datos de la Vaciones Seleccionada. Si elproblema persiste, consulte con el administrador del sistema',
                confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Entereado`,
                confirmButtonColor: "#d33",
                position: 'top',
                customClass: {
                    htmlContainer: 'sweetalert-html-container',
                    confirmButton: 'sweetalert-custom-button'
                    
                    }
            });
          }            
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function seleccionar_personal(id_personal, no_empleado, nombre_completo){
    $("#modal-busquedas").modal('hide');
    aregar_incidencia(id_personal, no_empleado, nombre_completo);
}

function aregar_incidencia(id_personal, no_empleado, nombre_completo){
    let FechaHoy = moment(); 
    $(".titulo-modal").html("Agregar Incidencia de Personal");
    $("#hOperacion").val("Agregar");
    $("#hIdPersonal").val(id_personal);
    $(".infoNoEmpleado").html(no_empleado);
    $(".infoNombre").html(nombre_completo);
    $("#txtFecha").datepicker("setDate", FechaHoy.format('DD-MM-YYYY'));

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
        browseLabel: " Seleccionar",
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
                xid_tipo_archivo: $("#selectTipoIncidencia").val(),
                xAleatorio      : $("#hAleatorio").val(),
                xDirectorio     : "incidencia"
            };
            return data;
        },
    }).on("filebatchselected", function (event, files) {
        //$ControlUpload.fileinput("upload");
        var xrnd = str_aleatoria(10);
        $("#hAleatorio").val(xrnd);
        $("#hNuevoPDF").val(true);

    }).on('fileuploaderror', function (event, data, msg) {
        var form = data.form,
            files = data.files,
            extra = data.extra,
            response = data.response,
            reader = data.reader;
        console.log('File upload error');
        // get message
        console.log(msg);
    }).on('fileuploaded', function (event, data, id, index) {
        console.log(data);
        $("#hArchivoPDF").val(true);
    });
    
    //Mostramos la Ventana Modal
    setTimeout(() => {
        $("#modal-agregar-incidencias").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    }, 300);
}

function imprimir_documento(documento_pdf){
    if (documento_pdf.trim().length !== 0) {
        $(".titulo-modal").html("Documento de Incidencia");

        $("#ModalLoading").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });

        setTimeout(() => {
            //Cargar el archivo PDF recien generado
            $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/archivos/documentos/incidencia/'+documento_pdf+'#locale=es-MX');
            //Ocultamos la ventana modal de Loading
            $("#ModalLoading").modal('hide');
            //Mostramos la Ventana del archivo PDF
            $("#ModalPreviewPDF").modal({
                backdrop: 'static',
                keyboard: true,
                keyboard: false
            });
        }, 1000);        
    }else{
        Swal.fire({
            icon: 'error',
            title: '¡Error Inesperado!',
            text: 'Ha Ocurrido un error al obtener el archivo. Consulte con el administrador del sistema',
            confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
            confirmButtonColor: "#d33",
            position: 'top',
            customClass: {
                htmlContainer: 'sweetalert-html-container',
                confirmButton: 'sweetalert-custom-button'
                
                }
        });
    }
}

function cat_tipo_incidencias(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_incidencias"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectTipoIncidencia").empty();
          $("#selectTipoIncidencia").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectTipoIncidencia").empty();
          $("#selectTipoIncidencia").html(respuesta.incidencias);
          $("#selectTipoIncidencia").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectTipoIncidencia").selectpicker('val',seleccionado);
            $("#selectTipoIncidencia").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}