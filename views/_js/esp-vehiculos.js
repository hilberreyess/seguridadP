jQuery(document).ready(function(){
    $("li.vehiculos").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaVehiculos').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.es_vehiculos.php",
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
            { "width": "10%", "targets": 1 },
            { "width": "8%", "targets": 2 },
            { "width": "8%", "targets": 3 },
            { "width": "8%", "targets": 4 },
            { "width": "8%", "targets": 5 },
            { "width": "10%", "targets": 6 },
            { "width": "10%", "targets": 7 },
            { "width": "5%", "targets": 8 },
            { "width": "30%", "targets": 9 },
            { "width": "5%", "targets": 10 },
            { "width": "4%", "targets": 11 }
        ],
        "rowCallback": function(row, data, index) {
           $('td:eq(0),td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7),td:eq(9),td:eq(10),td:eq(11)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            //$('td:eq(2)', row).css({"font-weight":"bold"});

            //Es Bindado
            if (data[8]==='SI') {
            	$('td:eq(7)', row).html('<i class="icofont-safety icofont-lg"></i> '+data[8]).css({"font-weight":"bold"}).addClass("text-success");
            }

            //Estatus de INACTIVO
            if (data[10]==='ACTIVO') {
            	$('td:eq(9)', row).css({"font-weight":"bold"}).addClass("text-success");
            }else{
                $('td:eq(9)', row).css({"font-weight":"bold"}).addClass("text-danger");
            }
        },
        "initComplete": function (settings, json) {
            $("#tablaVehiculos_filter").remove();
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
            $('#tablaVehiculos').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaVehiculos').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });

    $("#btnAgregar").click(function(){
        $(".titulo-modal").html("Agregar Vehículo");

        $("#modal-agregar-vehiculo").modal({
            backdrop: 'static',
            keyboard: false
        });
    });



    cat_empresas("00");
    cat_vehiculo_tipos("00");
    cat_vehiculo_marcas("00");


    $("#modal-agregar-vehiculo").on('hidden.bs.modal', function(e) {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaVehiculos').DataTable().ajax.reload(null, false);
        
        $("#form-guardar-vehiculo").resetForm();
        $('#form-guardar-vehiculo').bootstrapValidator('resetForm', true);

        $("#selectTipoVehiculo").selectpicker("refresh");
        $("#selectMarca").selectpicker("refresh");
        $("#selectEmpresa").selectpicker("refresh");
        $("#selectEsBlindado").selectpicker("refresh");
        $("#selectEstatusVigencia").selectpicker("refresh");
        
        $("#txtBuscar").focus();
    });
    

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });


    $("#form-guardar-vehiculo").bootstrapValidator({
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
            selectTipoVehiculo: {
                validators: {
                    notEmpty: { message: 'Seleccione el Año' }
                }
            },
            selectMarca: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            txtModelo: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtColor: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNoPlacas: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNoSerie: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtMatricula: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectEmpresa: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            selectEsBlindado: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            }           
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#TokenCSRF").val();
            var operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/esp_vehiculos_cmd.php',
                data: $("#form-guardar-vehiculo").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
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
                            $('#tablaVehiculos').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-vehiculo').modal('hide');
                            
                            mensaje('fa-check-circle','Vehículo Agregado','Los datos del vehículo han sido agregados correctamente','success');
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡El Vehículo con el Número de Serie que intenta agregar ya existe!',
                                        text: 'Verifique que no se este duplicando el registro del Vehículo',
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
                                     $('#tablaVehiculos').DataTable().ajax.reload(null, false);
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
                        $('#tablaVehiculos').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-vehiculo').modal('hide');

                        if (respuesta.editado==true || respuesta.editado=='true') {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos del vehículo han sido actualizados correctamente','success');
                        }else{
                            mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                        }
                    }else{
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading').hide();
                        mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                        console.info(respuesta);
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




function editar_vehiculo(id_vehiculo){
    console.info(id_vehiculo);
    let xtoken = $("#TokenCSRF").val();

    $(".titulo-modal").html("Editando Vehículo");
    $("#hOperacion").val("Editar");
    $("#hIdVehiculo").val(id_vehiculo);

    $.ajax({
        url: 'models/ajax/esp_vehiculos_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_vehiculo":id_vehiculo},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            //$('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: false,
            });  
        },
        success: function(respuesta) {
            console.info(respuesta);

          if (respuesta.obtenido) {
            let o = respuesta.datos;

            //Asignar los datos obtenidos
            $("#selectTipoVehiculo").selectpicker('val',o.id_tipo);
            $("#selectMarca").selectpicker('val',o.id_marca);
            $("#txtModelo").val(o.modelo);
            $("#txtColor").val(o.color);
            $("#txtNoPlacas").val(o.placas);
            $("#txtNoSerie").val(o.numero_serie);
            $("#txtNumeroMotor").val(o.numero_motor);
            $("#txtDomicilio").val(o.domicilio);
            $("#selectEmpresa").selectpicker('val',o.id_empresa);

            $("#selectEsBlindado").selectpicker('val',o.es_blindado);
            $("#txtPropietario").val(o.propietario);
            $("#txtEmpresaBlindaje").val(o.empresa_blindaje);
            $("#txtNivelBlindaje").val(o.nivel_blindaje);
            $("#selectEstatusVigencia").selectpicker('val',o.estatus);
            
            // //Obtenemos el catalogo con un id seleccionado, pasado por parametro, al seleccionarse se genera el evento onchange que carga la nueva lista de Modalidades
            // cat_tipo_permiso(o.tipo_permiso);
            // //Esperamos unos segundos para que se cargue la lista de modalidades dependiendo del tipo de permiso y seleccionamos la modalidad que tiene actualmente en la base de datos
            // setTimeout(() => {
            //     $("#selectModalidad").selectpicker('val',o.id_modalidad);
            //     $("#selectModalidad").selectpicker("refresh");
            // }, 500);

            // $("#txtCedulaRegistro").val(o.cedula_registro);
            // $("#txtNoExpediente").val(o.numero_expediente);
            // $("#txtCaracteristica").val(o.caracteristica);
            // $("#txtSFA").val(o.sfa);
            // $("#txtFolio").val(o.folio);
            // $("#txtNoRegistroFolio").val(o.numero_registro);
            // $("#selectTipoMovimiento").selectpicker('val',o.id_cat_vigencia);
            // $("#selectTipoMovimiento").selectpicker("refresh");
            // $("#txtURL").val(o.url_qr);
            // $("#selectEstatusVigencia").selectpicker('val',o.estatus);
            // $("#selectEstatusVigencia").selectpicker("refresh");

            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#ModalLoading").modal('hide');
                $("#modal-agregar-vehiculo").modal({
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





function cat_vehiculo_tipos(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_vehiculo_tipos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectTipoVehiculo").empty();
          $("#selectTipoVehiculo").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectTipoVehiculo").empty();
          $("#selectTipoVehiculo").html(respuesta.vehiculotipos);
          $("#selectTipoVehiculo").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectTipoVehiculo").selectpicker('val',seleccionado);
            $("#selectTipoVehiculo").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_vehiculo_marcas(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_vehiculo_marcas"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectMarca").empty();
          $("#selectMarca").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectMarca").empty();
          $("#selectMarca").html(respuesta.vehiculomarcas);
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