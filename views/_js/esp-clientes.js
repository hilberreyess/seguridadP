jQuery(document).ready(function(){
    $("li.empresas").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablClientes').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.esp_clientes.php",
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
            { "width": "8%", "targets": 1 },
            { "width": "20%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "8%", "targets": 4 },
            { "width": "15%", "targets": 5 },
            { "width": "15%", "targets": 6 },
            { "width": "8%", "targets": 7 },
            { "width": "5%", "targets": 8 },
            // { "width": "8%", "targets": 9 },
            // { "width": "8%", "targets": 10 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(2),td:eq(3),td:eq(6),td:eq(7)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablClientes_filter").remove();
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
            $('#tablClientes').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablClientes').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });


    $("#btnAgregar").click(function(){
        $(".titulo-modal").html("Agregar Cliente de Seguridad Privada");

        $("#modal-agregar-cliente").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    });


    $("#modal-agregar-cliente").on('hidden.bs.modal', function(e) {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablClientes').DataTable().ajax.reload(null, false);
        
        $("#form-guardar-cliente").resetForm();
        $('#form-guardar-cliente').bootstrapValidator('resetForm', true);

        $("#selectEntidad").selectpicker('val',12); 
        $("#selectEntidad").selectpicker("refresh");
        $("#selectMunicipio").selectpicker("refresh");
        $("#selectTipoCliente").selectpicker("refresh");
        $("#selectEstatus").selectpicker("refresh");
        
        $("#txtBuscar").focus();
    });
    

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

  
    //Cargamos los catalogos
    cat_entidades("12");
    $('#selectEntidad').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let pIdEntidad = $("#selectEntidad").val();
        console.log(pIdEntidad)
        cat_municipios(seleccionado='00', pIdEntidad);        
    });
    cat_cliente_tipos("00");
    cat_empresa_estatus("00");

    



    // $("#modal-agregar-cliente").on('hidden.bs.modal', function(e) {        
    //     $("#form-guardar-cliente").resetForm();
    //     $("#form-guardar-cliente").bootstrapValidator('resetForm', true);

    //     //Reiniciamos los campos de fecha para que muestre la lista cmpleta de los meses
    //     fechas_vacaciones.datepicker( "option" , {
    //         minDate: "-1y",
    //         maxDate: "1y",} );


    //     $("#selectAnnio").selectpicker('val',moment().year());
    //     $("#selectAnnio").selectpicker("refresh");

    //     $("#selectPeriodo").selectpicker('val',0); 
    //     $("#selectPeriodo").selectpicker("refresh");      
        
    //     $("#selectBiometricoVacaciones").selectpicker('val',1); 
    //     $("#selectBiometricoVacaciones").selectpicker("refresh");  
        
    //     let DirectorAutoriza = $("select[name=selectDirectorVacaciones] option:first").val();
    //     $("#selectDirectorVacaciones").selectpicker('val',DirectorAutoriza); 
    //     $("#selectDirectorVacaciones").selectpicker("refresh");

    //     let QuienAutoriza= $("select[name=selectAutorizaVacaciones] option:first").val();
    //     $("#selectAutorizaVacaciones").selectpicker('val',QuienAutoriza); 
    //     $("#selectAutorizaVacaciones").selectpicker("refresh");

    //     $("#form-guardar-cliente").bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', true);
    // });

    // $("#modal-agregar-cliente").on('shown.bs.modal', function(e) {
    //     //$('#form-guardar-cliente').bootstrapValidator('resetForm', true);
    // });


    //Guardar Empresa
    $("#form-guardar-cliente").bootstrapValidator({
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
            txtRFC: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNombreCliente: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectEntidad: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectMunicipio: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtDomicilio: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtCiudad: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectTipoCliente: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtRepresentante: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtTelefono: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectEstatusVigencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            }
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#TokenCSRF").val();
            var operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/esp_clientes_cmd.php',
                data: $("#form-guardar-cliente").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    $('.loading').show();
                },
                success: function(respuesta) {
                    console.log(respuesta);

                    if (respuesta.comando=="Agregar") {
                        if (respuesta.agregado) {
                            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                            $('.loading').hide();
                            $('#tablClientes').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-cliente').modal('hide');
                            
                            mensaje('fa-check-circle','Empresa Agregada','Los datos del cliente han sido agregados correctamente','success');
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡El RFC del cliente ya existe!',
                                        text: 'Verifique que no se este duplicando el registro del cliente',
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
                                     $('#tablClientes').DataTable().ajax.reload(null, false);
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
                        $('#tablClientes').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-cliente').modal('hide');

                        if (respuesta.editado==true || respuesta.editado=='true') {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos del cliente han sido actualizados correctamente','success');
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



function editar_cliente(id_cliente){
    let xtoken = $("#TokenCSRF").val();

    $(".titulo-modal").html("Editando Cliente de Seguridad Publica");
    $("#hOperacion").val("Editar");
    $("#hIdCliente").val(id_cliente);

    //Aqui un Ajax que selccione el id de la empresa para cargar los datos en la pantalla modal
    $.ajax({
        url: 'models/ajax/esp_clientes_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_cliente":id_cliente},
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
        console.log(respuesta);

        
          if (respuesta.obtenido) {
            let o = respuesta.datos;

            //Asignar los datos obtenidos
            $("#txtRFC").val(o.rfc);
            $("#txtNombreCliente").val(o.nombre);
            $("#selectEntidad").selectpicker('val',o.id_entidad);
            $("#selectEntidad").selectpicker("refresh");
            setTimeout(() => {
                $("#selectMunicipio").selectpicker('val',o.id_municipio);
                $("#selectMunicipio").selectpicker("refresh");
            }, 500);

            $("#txtDomicilio").val(o.domicilio);
            $("#txtCiudad").val(o.ciudad);
            $("#selectTipoCliente").selectpicker('val',o.id_tipo);
            $("#selectTipoCliente").selectpicker("refresh");
            $("#txtRepresentante").val(o.contacto);
            $("#txtTelefono").val(o.telefono);
            $("#txtEmail").val(o.e_mail);
            $("#selectEstatus").selectpicker('val',o.estatus);
            $("#selectEstatus").selectpicker("refresh");

            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#ModalLoading").modal('hide');
                $("#modal-agregar-cliente").modal({
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




function baja_cliente(id_cliente){
    mensaje('fa-check-circle','¡Baja!.','Agregar Instrucciones para dar de baja una cliente','info');
}

function reactivar_cliente(id_cliente){
    mensaje('fa-check-circle','¡Reactivar!.','Agregar Instrucciones para reactivar una cliente','info');
}


/**Obtiene los catalogos y rellena los selects*/
function cat_entidades(seleccionado=12){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_entidades"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectEntidad").empty();
          $("#selectEntidad").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectEntidad").empty();
          $("#selectEntidad").html(respuesta.entidades);
          $("#selectEntidad").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectEntidad").selectpicker('val',seleccionado);
            $("#selectEntidad").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_municipios(seleccionado='00', id_entidad=12){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_municipios", "xid_entidad":id_entidad},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectMunicipio").empty();
          $("#selectMunicipio").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectMunicipio").empty();
          $("#selectMunicipio").html(respuesta.municipios);
          $("#selectMunicipio").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectMunicipio").selectpicker('val',seleccionado);
            $("#selectMunicipio").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_cliente_tipos(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_cliente_tipos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectTipoCliente").empty();
          $("#selectTipoCliente").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectTipoCliente").empty();
          $("#selectTipoCliente").html(respuesta.tipos);
          $("#selectTipoCliente").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectTipoCliente").selectpicker('val',seleccionado);
            $("#selectTipoCliente").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}
function cat_empresa_estatus(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_empresa_estatus"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectEstatus").empty();
          $("#selectEstatus").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectEstatus").empty();
          $("#selectEstatus").html(respuesta.estatus);
          $("#selectEstatus").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectEstatus").selectpicker('val',seleccionado);
            $("#selectEstatus").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}