jQuery(document).ready(function(){
    $("li.radios").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaRadios').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.es_radios.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "5%", "targets": 0, "visible":false},
            { "width": "8%", "targets": 1 },
            { "width": "8%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "10%", "targets": 4 },
            { "width": "20%", "targets": 5 },
            { "width": "25%", "targets": 6 },
            { "width": "5%", "targets": 7 },
            { "width": "8%", "targets": 8 },
            { "width": "10%", "targets": 9},
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(1),td:eq(2),td:eq(3),td:eq(6),td:eq(7),td:eq(8)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});

            if (data[7]==='ACTIVO') {
            	$('td:eq(6)', row).css({"font-weight":"bold"}).addClass("text-success");
            }else{
                $('td:eq(6)', row).css({"font-weight":"bold"}).addClass("text-danger");
            }

        },
        "initComplete": function (settings, json) {
            $("#tablaRadios_filter").remove();
        }
    });//Fin de Configuración del Datatables

    
    $("#txtBuscar").focus();
    $("#hOperacion").val("Agregar");

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
            $('#tablaRadios').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaRadios').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });

    $("#btnAgregar").click(function(){
        $(".titulo-modal").html("Agregar Equipo de Radio");

        $("#modal-agregar-radio").modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    //Obtenemos los Catalogos
    cat_radio_tipos("00");
    cat_radio_marcas("00");
    cat_radio_proveedores("00");
    cat_empresas("00");

    $("#modal-agregar-radio").on('shown.bs.modal', function(e) {
      
    });

    $("#modal-agregar-radio").on('hidden.bs.modal', function(e) {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaRadios').DataTable().ajax.reload(null, false);
        
        $("#form-guardar-radio").resetForm();
        $('#form-guardar-radio').bootstrapValidator('resetForm', true);

        $("#selectTipo").selectpicker("refresh");
        $("#selectMarca").selectpicker("refresh");
        $("#selectProveedor").selectpicker("refresh");
        $("#selectEmpresa").selectpicker("refresh");
        
        $("#txtBuscar").focus();
    });

    $("#form-guardar-radio").bootstrapValidator({
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
            selectTipo: {
                validators: {
                    notEmpty: { message: 'Seleccione el Tipo de Radio' }
                }
            },
            selectMarca: {
                validators: {
                    notEmpty: { message: 'Seleccione la Marca del Radio' }
                }
            },
            txtFrecuencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNoSerie: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectProveedor: {
                validators: {
                    notEmpty: { message: 'Seleccione el Proveedor' }
                }
            },
            selectEmpresa: {
                validators: {
                    notEmpty: { message: 'Seleccione la Empresa' }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#TokenCSRF").val();
            var operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/esp_radios_cmd.php',
                data: $("#form-guardar-radio").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    $('.loading').show();
                },
                success: function(respuesta) {
                    if (respuesta.comando=="Agregar") {
                        if (respuesta.agregado) {
                            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                            $('.loading').hide();
                            $('#tablaRadios').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-radio').modal('hide');
                            
                            mensaje('fa-check-circle','Radio Agregado','Los datos del equipo de radio han sido agregados correctamente','success');
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡El Número de Serie del equipo de radio ya existe!',
                                        text: 'Verifique que no se este duplicando el registro de la emrpresa',
                                        confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
                                        confirmButtonColor: "#d33",
                                        position: 'top',
                                        customClass: {
                                            htmlContainer: 'sweetalert-html-container',
                                            confirmButton: 'sweetalert-custom-button'
                                          }
                                    });
    
                                     $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                                     $('.loading').hide();
                                     $('#tablaRadios').DataTable().ajax.reload(null, false);
                                    break;
    
                                case 'NoComand':
                                    break;
    
                                case 'NoInsert':
                                    break;
    
                                case 'NoToken':
                                    break;
                            
                                default:
                                    break;
                            }
                        }
                    } else if(respuesta.comando=="Editar") {
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading').hide();
                        $('#tablaRadios').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-radio').modal('hide');

                        if (respuesta.editado==true || respuesta.editado=='true') {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos del equipo de radio han sido actualizados correctamente','success');
                        }else{
                            mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                        }
                    }else{
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading').hide();
                        mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                        console.log("Error no Esperado");
                    }
                },
                error: function(jqXHR, status, error) {
                    console.error(jqXHR, status, error);
                    $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                    $('.loading').hide();
                }
            }); //cierra ajax

        } //fin de submitHandler
    }); //fin de Validator


    
}); //cierra Jquery


function editar_radio(id_radio){
    let xtoken = $("#TokenCSRF").val();

    $(".titulo-modal").html("Editando Equipo de Radio");
    $("#hOperacion").val("Editar");
    $("#hIdRadio").val(id_radio);

    $.ajax({
        url: 'models/ajax/esp_radios_cmd.php',
        data: {"xCMD":"Seleccionar", "xToken":xtoken, "xid_radio":id_radio},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: false,
            }); 
        },
        success: function(respuesta) {
            if (respuesta.obtenido) {
                let o = respuesta.datos;
    
                //Asignar los datos obtenidos
                $("#selectTipo").selectpicker('val',o.id_tipo);
                $("#selectTipo").selectpicker("refresh");
                $("#selectMarca").selectpicker('val',o.id_marca);
                $("#selectMarca").selectpicker("refresh");
                $("#txtFrecuencia").val(o.frecuencia);
                $("#txtNoSerie").val(o.numero_serie);
                $("#selectProveedor").selectpicker('val',o.id_proveedor);
                $("#selectProveedor").selectpicker("refresh");
                $("#selectEmpresa").selectpicker('val',o.id_empresa);
                $("#selectEmpresa").selectpicker("refresh");
    
                //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
                setTimeout(() => {
                    $("#ModalLoading").modal('hide');
                    $("#modal-agregar-radio").modal({
                        backdrop: 'static',
                        keyboard: false
                    });  
                }, 300);          
            }else{
            Swal.fire({
                icon: 'error',
                title: '¡Error Detectado!',
                text: 'Ha Ocurrido un error inesperado al recuperar los datos del equipo de radio. Si elproblema persiste, consulte con el administrador del sistema',
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


function cat_radio_tipos(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_radio_tipos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
        $("#selectTipo").empty();
        $("#selectTipo").selectpicker("refresh");
        },
        success: function(respuesta) {
        $("#selectTipo").empty();
        $("#selectTipo").html(respuesta.radiotipos);
        $("#selectTipo").selectpicker("refresh");

        if (seleccionado != '00') {
            $("#selectTipo").selectpicker('val',seleccionado);
            $("#selectTipo").selectpicker("refresh");
        }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_radio_marcas(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_radio_marcas"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $("#selectMarca").empty();
            $("#selectMarca").selectpicker("refresh");
        },
        success: function(respuesta) {
            $("#selectMarca").empty();
            $("#selectMarca").html(respuesta.radiomarcas);
            $("#selectMarca").selectpicker("refresh");

            if (seleccionado != '00') {
            $("#selectMarca").selectpicker('val',seleccionado);
            $("#selectMarca").selectpicker("refresh");
            }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_radio_proveedores(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_radio_proveedores"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $("#selectProveedor").empty();
            $("#selectProveedor").selectpicker("refresh");
        },
        success: function(respuesta) {
            $("#selectProveedor").empty();
            $("#selectProveedor").html(respuesta.radioproveedores);
            $("#selectProveedor").selectpicker("refresh");

            if (seleccionado != '00') {
            $("#selectProveedor").selectpicker('val',seleccionado);
            $("#selectProveedor").selectpicker("refresh");
            }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_empresas(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_empresas"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $("#selectEmpresa").empty();
            $("#selectEmpresa").selectpicker("refresh");
        },
        success: function(respuesta) {
            $("#selectEmpresa").empty();
            $("#selectEmpresa").html(respuesta.empresas);
            $("#selectEmpresa").selectpicker("refresh");

            if (seleccionado != '00') {
            $("#selectEmpresa").selectpicker('val',seleccionado);
            $("#selectEmpresa").selectpicker("refresh");
            }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}