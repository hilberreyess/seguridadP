jQuery(document).ready(function(){
    $("li.armamento").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaArmamento').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.esp_armas.php",
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
            { "width": "8%", "targets": 1 },
            { "width": "8%", "targets": 2 },
            { "width": "8%", "targets": 3 },
            { "width": "8%", "targets": 4 },
            { "width": "8%", "targets": 5 },
            { "width": "8%", "targets": 6 },
            { "width": "30%", "targets": 7 },
            { "width": "10%", "targets": 8 },
            { "width": "10%", "targets": 9 },
            { "width": "10%", "targets": 10 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(7),td:eq(8),td:eq(9)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablaArmamento_filter").remove();
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
            $('#tablaArmamento').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaArmamento').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });

    $("#txtBuscarPersonal").keyup(function(){
        if($(this).val().length > 3){
            let buscar = $(this).val();
            tablaArmamento.search(buscar).draw();            
        }

        if($(this).val().length == 0){
            $("#txtBuscarPersonal").val('');
            $('#tablaArmamento').DataTable().ajax.reload(null, false);
            tablaArmamento.search('').columns().search('').draw();
        }
    });

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

    $("#btnAgregar").click(function(){
        $(".titulo-modal").html("Agregar Armamento de Seguridad Privada");

        $("#modal-agregar-armamento").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    });
    
    //Obtenemos los Catalogos
    cat_arma_tipos("00");
    cat_arma_marcas("00");
    cat_arma_modelos("00");
    cat_arma_calibres("00");
    cat_empresas("00");    

    $("#modal-agregar-armamento").on('shown.bs.modal', function(e) {
        $("#txtMatricula").focus();
    });

    $("#modal-agregar-armamento").on('hidden.bs.modal', function(e) {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaArmamento').DataTable().ajax.reload(null, false);
        
        $("#form-guardar-armamento").resetForm();
        $('#form-guardar-armamento').bootstrapValidator('resetForm', true);
        
        $("#txtBuscar").focus();
    });



    $("#form-guardar-armamento").bootstrapValidator({
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
            txtMatricula: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectTipo: {
                validators: {
                    notEmpty: { message: 'Seleccione el Año' }
                }
            },
            selectMarca: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            selectModelo: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            selectCalibre: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            txtFolioSedena: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectEmpresa: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#TokenCSRF").val();
            var operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/esp_armas_cmd.php',
                data: $("#form-guardar-armamento").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
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
                            $('#tablaArmamento').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-armamento').modal('hide');
                            
                            mensaje('fa-check-circle','Arma Agregada','Los datos del arma han sido agregados correctamente','success');
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡El Arma con la Matricula que intenta agregar ya existe!',
                                        text: 'Verifique que no se este duplicando el registro del arma',
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
                                     $('#tablaArmamento').DataTable().ajax.reload(null, false);
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
                        $('#tablaArmamento').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-armamento').modal('hide');

                        if (respuesta.editado==true || respuesta.editado=='true') {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos del arma han sido actualizados correctamente','success');
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


function editar_arma(id_arma){
    let xtoken = $("#TokenCSRF").val();

    $(".titulo-modal").html("Editando Armamento");
    $("#hOperacion").val("Editar");
    $("#hIdArma").val(id_arma);

    $.ajax({
        url: 'models/ajax/esp_armas_cmd.php',
        data: {"xCMD":"Seleccionar", "xToken":xtoken, "xid_arma":id_arma},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: false,
            }); 
        },
        success: function(respuesta) {
            let o = respuesta.datos;

            //Asignar los datos obtenidos
            $("#txtMatricula").val(o.matricula);            
            $("#selectTipo").selectpicker('val',o.id_tipo);
            $("#selectTipo").selectpicker("refresh");
            $("#selectMarca").selectpicker('val',o.id_marca);
            $("#selectMarca").selectpicker("refresh");            
            $("#selectModelo").selectpicker('val',o.id_modelo);
            $("#selectModelo").selectpicker("refresh");
            $("#selectCalibre").selectpicker('val',o.id_calibre);
            $("#selectCalibre").selectpicker("refresh");
            $("#txtFolioSedena").val(o.folio);
            $("#selectEmpresa").selectpicker('val',o.id_empresa);
            $("#selectEmpresa").selectpicker("refresh");

            setTimeout(() => {
                $("#ModalLoading").modal('hide');
                $("#modal-agregar-armamento").modal({
                    backdrop: 'static',
                    keyboard: false
                });  
            }, 300);
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax

}



function cat_arma_tipos(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_arma_tipos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectTipo").empty();
          $("#selectTipo").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectTipo").empty();
          $("#selectTipo").html(respuesta.tipos);
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

function cat_arma_marcas(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_arma_marcas"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectMarca").empty();
          $("#selectMarca").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectMarca").empty();
          $("#selectMarca").html(respuesta.marcas);
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

function cat_arma_modelos(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_arma_modelos"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectModelo").empty();
          $("#selectModelo").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectModelo").empty();
          $("#selectModelo").html(respuesta.modelos);
          $("#selectModelo").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectModelo").selectpicker('val',seleccionado);
            $("#selectModelo").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_arma_calibres(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_arma_calibres"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectCalibre").empty();
          $("#selectCalibre").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectCalibre").empty();
          $("#selectCalibre").html(respuesta.calibres);
          $("#selectCalibre").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectCalibre").selectpicker('val',seleccionado);
            $("#selectCalibre").selectpicker("refresh");
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





