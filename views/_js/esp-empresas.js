jQuery(document).ready(function(){
    $("li.empresas").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaEmpresas').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.esp_empresas.php",
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
            { "width": "15%", "targets": 3 },
            { "width": "5%", "targets": 4 },
            { "width": "14%", "targets": 5 },
            { "width": "5%", "targets": 6 },
            { "width": "5%", "targets": 7 },
            { "width": "5%", "targets": 8 },
            { "width": "5%", "targets": 9 },
            { "width": "8%", "targets": 10 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(3),td:eq(5),td:eq(6),td:eq(8),td:eq(9)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablaEmpresas_filter").remove();
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
            $('#tablaEmpresas').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaEmpresas').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });


    $("#btnAgregar").click(function(){
        $(".titulo-modal").html("Agregar Empresa de Seguridad Privada");

        $("#modal-agregar-empresa").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    });


    $("#modal-agregar-empresa").on('hidden.bs.modal', function(e) {
        $("#txtBuscar").val('');
        $("#1, #2, #3, #4, #5, #6, #7, #8, #9").val('');
        $('#tablaEmpresas').DataTable().ajax.reload(null, false);
        
        $("#form-guardar-empresa").resetForm();
        $('#form-guardar-empresa').bootstrapValidator('resetForm', true);

        $("#selectTipoPermiso").selectpicker("refresh");
        $("#selectModalidad").selectpicker("refresh");
        $("#selectTipoMovimiento").selectpicker("refresh");
        $("#selectEstatusVigencia").selectpicker("refresh");
        
        $("#txtBuscar").focus();
    });
    

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

    

    //Cargamos los catalogos
    cat_tipo_permiso("00");
    $('#selectTipoPermiso').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let pIdTipoPermiso = $("#selectTipoPermiso").val();
        cat_modalidad(seleccionado='00', pIdTipoPermiso);        
    });
    cat_tipo_movimiento("00");



    // $("#modal-agregar-empresa").on('hidden.bs.modal', function(e) {        
    //     $("#form-guardar-empresa").resetForm();
    //     $("#form-guardar-empresa").bootstrapValidator('resetForm', true);

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

    //     $("#form-guardar-empresa").bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', true);
    // });

    // $("#modal-agregar-empresa").on('shown.bs.modal', function(e) {
    //     //$('#form-guardar-empresa').bootstrapValidator('resetForm', true);
    // });

    var fechas_vacaciones = $("#txtFechaInicio, #txtFechaTermina").datepicker({
        minDate: "-1y",
        maxDate: "1y",
        changeMonth: true,
        firstDay: 1,
        numberOfMonths: 1,
        currentText: true,
        dateFormat: 'dd-mm-yy',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        //['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        changeYear: true,
        beforeShowDay: $.datepicker.noWeekends,
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 100);
        },
        onSelect: function (selectedDate) {
            var option = this.id == "txtFechaInicio" ? "minDate" : "maxDate",
            instance = $(this).data("datepicker"),
            date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            fechas_vacaciones.not(this).datepicker("option", option, date);

            $('#form-guardar-empresa').bootstrapValidator('enableFieldValidators', 'txtFechaInicio', 'notEmpty', false);
            $('#form-guardar-empresa').bootstrapValidator('enableFieldValidators', 'txtFechaTermina', 'notEmpty', false);

            //Para obtener el numero de dias habiles entre dos fechas, promero recorrer el rango de las fechas y contar los dias que no sean sabado o domingo
            if (this.id === "txtFechaTermina") {
                let fechaInicio = moment($("#txtFechaInicio").val().split('-').reverse().join('-'),'YYYY-MM-DD'); //fecha en formato YYYY-MM-DD
                let fechaFin    = moment($("#txtFechaTermina").val().split('-').reverse().join('-'),'YYYY-MM-DD');
                let totalDias = 0;
                
                while(fechaInicio.isSameOrBefore(fechaFin)){
                    let diaSemana = fechaInicio.isoWeekday();

                    if(diaSemana!==6 && diaSemana!==7){
                        totalDias++;
                    }
                    fechaInicio.add(1,'days');
                }

                
                if(totalDias < 10){
                    Swal.fire({
                        icon: 'error',
                        title: '¡Atención!',
                        text: 'El total de días de Vacaciones que ha seleccionado es Menor a 10 días.',
                        confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
                        confirmButtonColor: "#d33",
                        position: 'top',
                        customClass: {
                            htmlContainer: 'sweetalert-html-container',
                            confirmButton: 'sweetalert-custom-button'
                           
                          }
                    });
                }else if(totalDias > 10 ){
                    Swal.fire({
                        icon: 'error',
                        title: '¡Atención!',
                        text: 'El total de días de Vacaciones que ha seleccionado es Mayor a 10 días.',
                        confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
                        confirmButtonColor: "#d33",
                        position: 'top',
                        customClass: {
                            htmlContainer: 'sweetalert-html-container',
                            confirmButton: 'sweetalert-custom-button'
                           
                          }
                    });
                }

                $("#txtDias").val(totalDias +' DÍAS HÁBILES'); 

                //Aqui obtener el siguiente dia de la semana despues del Ultimo dia de la fecha de vacaciones
                let SiguienteDia = fechaFin.add(1,'days'); //Siguiente dia despues de la fecha de Finalizacion del periodo de vacaciones
                let diaSemana;

                for (let dia = 1; dia <=5; dia++) {
                    diaSemana= SiguienteDia.isoWeekday();

                    if (diaSemana==1 || diaSemana==2 || diaSemana==3 || diaSemana==4 || diaSemana==5) {
                        $("#txtSePresenta").val(SiguienteDia.format('DD')+" DE "+ meses[SiguienteDia.format('M')-1] +" DE "+SiguienteDia.format('YYYY'));
                        break;
                    }else{
                        SiguienteDia.add(1,'days');
                    }                                      
                }                 
                
                $('#form-guardar-empresa').bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', false);
                $('#form-guardar-empresa').bootstrapValidator('enableFieldValidators', 'txtSePresenta', 'notEmpty', false);
            }
        }
    });

    $("#txtFechaAutoriza, #txtFechaVence").datepicker({
        inline: false,
        showButtonPanel: false,
        minDate: "-2m",
        maxDate: "1y",
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
            //$('#form-guardar-empresa').bootstrapValidator('enableFieldValidators', 'txtFechaEmision', 'notEmpty', false);
            //$('#form-guardar-empresa').bootstrapValidator('revalidateField', 'txtFechaEmision');
            //$('#form-guardar-empresa').bootstrapValidator('updateStatus', 'txtFechaEmision', 'NOT_VALIDATED').bootstrapValidator('validateField', 'txtFechaEmision');
        }
    });

    //Guardar Empresa
    $("#form-guardar-empresa").bootstrapValidator({
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
            txtEmpresa: {
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
            txtFechaAutoriza: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtFechaVence: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNumeroRegistro: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectTipoPermiso: {
                validators: {
                    notEmpty: { message: 'Seleccione el Tipo de Permiso' }
                }
            },
            selectModalidad: {
                validators: {
                    notEmpty: { message: 'Seleccione la Modalidad' }
                }
            },
            txtCedulaRegistro: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtNoExpediente: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtCaracteristica: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectTipoMovimiento: {
                validators: {
                    notEmpty: { message: 'Seleccione el Tipo de Movimiento' }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#TokenCSRF").val();
            var operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/esp_empresas_cmd.php',
                data: $("#form-guardar-empresa").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
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
                            $('#tablaEmpresas').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-empresa').modal('hide');
                            
                            mensaje('fa-check-circle','Empresa Agregada','Los datos de la empresa han sido agregados correctamente','success');
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡El RFC de la empresa ya existe!',
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
                                     $('#tablaEmpresas').DataTable().ajax.reload(null, false);
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
                        $('#tablaEmpresas').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-empresa').modal('hide');

                        if (respuesta.editado==true || respuesta.editado=='true') {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos de la empresa han sido actualizados correctamente','success');
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



function editar_empresa(id_empresa){
    let xtoken = $("#TokenCSRF").val();

    $(".titulo-modal").html("Editando Empresa de Seguridad Publica");
    $("#hOperacion").val("Editar");
    $("#hIdEmpresa").val(id_empresa);

    //Aqui un Ajax que selccione el id de la empresa para cargar los datos en la pantalla modal
    $.ajax({
        url: 'models/ajax/esp_empresas_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_empresa":id_empresa},
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
          if (respuesta.obtenido) {
            let o = respuesta.datos;

            //Asignar los datos obtenidos
            $("#txtRFC").val(o.rfc);
            $("#txtEmpresa").val(o.empresa);
            $("#txtRepresentante").val(o.representante);
            $("#txtTelefono").val(o.telefono);
            $("#txtEmail").val(o.e_mail);
            $("#txtDomicilio").val(o.domicilio);            
            $("#txtFechaAutoriza").datepicker("setDate", o.fecha_autoriza);
            $("#txtFechaVence").datepicker("setDate", o.fecha_vence);
            $("#txtNumeroRegistro").val(o.numero_registro);
            
            //Obtenemos el catalogo con un id seleccionado, pasado por parametro, al seleccionarse se genera el evento onchange que carga la nueva lista de Modalidades
            cat_tipo_permiso(o.tipo_permiso);
            //Esperamos unos segundos para que se cargue la lista de modalidades dependiendo del tipo de permiso y seleccionamos la modalidad que tiene actualmente en la base de datos
            setTimeout(() => {
                $("#selectModalidad").selectpicker('val',o.id_modalidad);
                $("#selectModalidad").selectpicker("refresh");
            }, 500);

            $("#txtCedulaRegistro").val(o.cedula_registro);
            $("#txtNoExpediente").val(o.numero_expediente);
            $("#txtCaracteristica").val(o.caracteristica);
            $("#txtSFA").val(o.sfa);
            $("#txtFolio").val(o.folio);
            $("#txtNoRegistroFolio").val(o.numero_registro);
            $("#selectTipoMovimiento").selectpicker('val',o.id_cat_vigencia);
            $("#selectTipoMovimiento").selectpicker("refresh");
            $("#txtURL").val(o.url_qr);
            $("#selectEstatusVigencia").selectpicker('val',o.estatus);
            $("#selectEstatusVigencia").selectpicker("refresh");

            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#ModalLoading").modal('hide');
                $("#modal-agregar-empresa").modal({
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

function imprimir_permiso(id_empresa) {
    $.ajax({
        url: 'views/plugins/html2pdf/permiso_empresa_pdf.php',
        data: {"xid_empresa":id_empresa},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            //Aqui mostrar ventana de cargando ...
            $(".titulo-modal").html("Imprimir Permiso de Empresa");

            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: true,
            });
        },
        success: function(pdf) {
            if (pdf.generado) {
                //Cargar el archivo PDF recien generado
                $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/reportes/pdf/'+pdf.archivo+'#locale=es-MX');
                //Ocultamos la ventana modal de Loading
                $("#ModalLoading").modal('hide');
                //Mostramos la Ventana del archivo PDF
                $("#ModalPreviewPDF").modal({
                    backdrop: 'static',
                    keyboard: true,
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '¡Error Detectado!',
                    text: 'Ha Ocurrido un error al generar el archivo. Consulte con el administrador del sistema',
                    confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Revisaré`,
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


function baja_empresa(id_empresa){
    mensaje('fa-check-circle','¡Baja!.','Agregar Instrucciones para dar de baja una empresa','info');
}

function reactivar_empresa(id_empresa){
    mensaje('fa-check-circle','¡Reactivar!.','Agregar Instrucciones para reactivar una empresa','info');
}

function mostrar_clientes(id_empresa){
    mensaje('fa-check-circle','¡Reactivar!.','Mostrar los Clientes de la Empresa','info');
}


/**Obtiene los catalogos y rellena los selects*/
function cat_tipo_permiso(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_permiso"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectTipoPermiso").empty();
          $("#selectTipoPermiso").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectTipoPermiso").empty();
          $("#selectTipoPermiso").html(respuesta.tipopermiso);
          $("#selectTipoPermiso").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectTipoPermiso").selectpicker('val',seleccionado);
            $("#selectTipoPermiso").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_modalidad(seleccionado='00', pid_tipo_permiso){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_modalidad", "xid_tipo_permiso":pid_tipo_permiso},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectModalidad").empty();
          $("#selectModalidad").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectModalidad").empty();
          $("#selectModalidad").html(respuesta.modalidades);
          $("#selectModalidad").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectModalidad").selectpicker('val',seleccionado);
            $("#selectModalidad").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_tipo_movimiento(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_movimiento"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectEstatusVigencia").empty();
          $("#selectEstatusVigencia").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectEstatusVigencia").empty();
          $("#selectEstatusVigencia").html(respuesta.movimientos);
          $("#selectEstatusVigencia").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectEstatusVigencia").selectpicker('val',seleccionado);
            $("#selectEstatusVigencia").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

