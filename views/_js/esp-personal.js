jQuery(document).ready(function(){
    $("li.personal").addClass("active");


    var tabla=$('#tablaPersonal').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.esp_personal.php",
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
            { "width": "18%", "targets": 2 },
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7),td:eq(9),td:eq(10)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
        },
        "initComplete": function (settings, json) {
            $("#tablaVacaciones_filter").remove();
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
            $('#tablaVacaciones').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $('#tablaVacaciones').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
        $("#txtBuscar").focus();
    });



    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });
	
	$("#btnAgregar").click(function(){
        window.location.replace("personal-datos.php");
    });

    /*$("#btnAgregar").click(function(){
        $("#modal-busquedas").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    });*/

    //Cargamos los catalogos
    cat_periodo("00");
    cat_director("00","selectDirectorVacaciones");
    cat_delegado_adtvo("00", "selectAutorizaVacaciones");


    $("#modal-agregar-vacaciones").on('hidden.bs.modal', function(e) {        
        $("#form-guardar-vacaciones").resetForm();
        $("#form-guardar-vacaciones").bootstrapValidator('resetForm', true);

        //Reiniciamos los campos de fecha para que muestre la lista cmpleta de los meses
        fechas_vacaciones.datepicker( "option" , {
            minDate: "-1y",
            maxDate: "1y",} );


        $("#selectAnnio").selectpicker('val',moment().year());
        $("#selectAnnio").selectpicker("refresh");

        $("#selectPeriodo").selectpicker('val',0); 
        $("#selectPeriodo").selectpicker("refresh");      
        
        $("#selectBiometricoVacaciones").selectpicker('val',1); 
        $("#selectBiometricoVacaciones").selectpicker("refresh");  
        
        let DirectorAutoriza = $("select[name=selectDirectorVacaciones] option:first").val();
        $("#selectDirectorVacaciones").selectpicker('val',DirectorAutoriza); 
        $("#selectDirectorVacaciones").selectpicker("refresh");

        let QuienAutoriza= $("select[name=selectAutorizaVacaciones] option:first").val();
        $("#selectAutorizaVacaciones").selectpicker('val',QuienAutoriza); 
        $("#selectAutorizaVacaciones").selectpicker("refresh");

        $("#form-guardar-vacaciones").bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', true);
    });

    $("#modal-agregar-vacaciones").on('shown.bs.modal', function(e) {
        //$('#form-guardar-vacaciones').bootstrapValidator('resetForm', true);
    });

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

            $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtFechaInicio', 'notEmpty', false);
            $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtFechaTermina', 'notEmpty', false);

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
                
                $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', false);
                $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtSePresenta', 'notEmpty', false);
            }
        }
    });

    $("#txtFechaEmision").datepicker({
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
            $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtFechaEmision', 'notEmpty', false);
            //$('#form-guardar-vacaciones').bootstrapValidator('revalidateField', 'txtFechaEmision');
            //$('#form-guardar-vacaciones').bootstrapValidator('updateStatus', 'txtFechaEmision', 'NOT_VALIDATED').bootstrapValidator('validateField', 'txtFechaEmision');
        }
    });

    $("#form-guardar-vacaciones").bootstrapValidator({
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
            selectAnnio: {
                validators: {
                    notEmpty: { message: 'Seleccione el Año' }
                }
            },
            selectPeriodo: {
                validators: {
                    notEmpty: { message: 'Seleccione el Periodo' }
                }
            },
            txtDias: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtSePresenta: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtFechaInicio: {
                validators: {
                    notEmpty: { message: 'La Fecha Inicial es Requerida' }
                }
            },
            txtFechaTermina: {
                validators: {
                    notEmpty: { message: 'La Fecha Final es Requerida' }
                }
            },
            selectDirectorVacaciones: {
                validators: {
                    notEmpty: { message: 'Seleccione el Director' }
                }
            },
            selectAutorizaVacaciones: {
                validators: {
                    notEmpty: { message: 'Seleccione quien Autoriza' }
                }
            },
            txtFechaEmision: {
                validators: {
                    notEmpty: {
                        message: 'La Fecha de Emisión es Requerida'
                    }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#Token_CSRF").val();
            var operacion = $("#hOperacionVacaciones").val();

            $.ajax({
                url: 'models/ajax/vacaciones_cmd.php',
                data: $("#form-guardar-vacaciones").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
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
                            $('#tablaVacaciones').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-vacaciones').modal('hide');
    
                            //Aqui mostrar la pantalla del PDF de las vacaciones para imprimir
                            let id_vacacion = respuesta.id_vacacion;
                            let annio       = respuesta.annio;
                            let periodo = respuesta.periodo;
    
                            $.ajax({
                                url: 'views/reportes/solicitud_de_vacaciones.pdf.php',
                                data: {"xid_vacacion":id_vacacion, "xannio":annio, "xperiodo":periodo},
                                type: 'POST',
                                dataType: 'JSON',
                                beforeSend: function() {
                                    //Aqui mostrar ventana de cargando ...
                                    $(".titulo-modal").html("Imprimir Formato de Vacaciones");
    
                                    $("#ModalLoading").modal({
                                        backdrop: 'static',
                                        keyboard: true,
                                        keyboard: false
                                    });
                                },
                                success: function(pdf) {
                                    if (pdf.generado) {
                                        //Cargar el archivo PDF recien generado
                                        $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/reportes/pdf/'+pdf.nombre_archivo+'#locale=es-MX');
                                        //Ocultamos la ventana modal de Loadingd
                                        $("#ModalLoading").modal('hide');
                                        //Mostramos la Ventana del archivo PDF
                                        $("#ModalPreviewPDF").modal({
                                            backdrop: 'static',
                                            keyboard: true,
                                            keyboard: false
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
                                    console.log(error);
                                }
                            }); //Fin de Ajax                        
                        }else{
                            switch (respuesta.codigo) {
                                case '23000':
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡Periodo de Vacaciones Duplicado!',
                                        text: 'Ya existe un registro de vacaciones con el año y periodo seleccionado',
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
                                     $('#tablaVacaciones').DataTable().ajax.reload(null, false);
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
                        $('#tablaVacaciones').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-vacaciones').modal('hide');

                        if (respuesta.editado==true && respuesta.actualizado==1) {
                            mensaje('fa-check-circle','¡Actualizado!.','Los datos han sido actualizados correctamente','success');
                        }else{
                            mensaje('fa-exclamation-triangle','¡Sin Cambios!.','Ningun dato fue modificado','warning');
                        }
                    }else{
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

function editar_vacaciones(id_vacaciones){
    let xtoken    = $("#Token_CSRF").val();

    $(".titulo-modal").html("Editando Vacaciones");
    $("#hOperacionVacaciones").val("Editar");
    $("#hIdVacaciones").val(id_vacaciones);
    

    //Aqui un Ajax que selccione el id de las vacaciones para cargar los datos en la pantalla modal
    $.ajax({
        url: 'models/ajax/vacaciones_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_vacaciones":id_vacaciones},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {

        },
        success: function(respuesta) {
          if (respuesta.obtenido) {
            let v = respuesta.vacacion;

            //Asignar los datos obtenidos 
            $(".infoNoEmpleadoVacaciones").html(v.num_empleado);

            $(".infoNombreVacaciones").html(v.nombre_completo);

            $("#selectAnnio").selectpicker('val', v.anio);
            $("#selectAnnio").selectpicker("refresh");
    
            $("#selectPeriodo").selectpicker('val',v.id_periodo); 
            $("#selectPeriodo").selectpicker("refresh");      

            $("#txtFechaInicio").datepicker("setDate", v.fecha_inicio);

            $("#txtFechaTermina").datepicker("setDate", v.fecha_termina);

            $("#txtDias").val(v.dias);

            $("#txtSePresenta").val(v.se_presenta);

            $("#selectBiometricoVacaciones").selectpicker('val',v.id_biometrico); 
            $("#selectBiometricoVacaciones").selectpicker("refresh"); 

            $("#selectDirectorVacaciones").selectpicker('val',v.id_director); 
            $("#selectDirectorVacaciones").selectpicker("refresh");
    
            $("#selectAutorizaVacaciones").selectpicker('val',v.id_delegado); 
            $("#selectAutorizaVacaciones").selectpicker("refresh");

            $("#txtFechaEmision").datepicker("setDate", v.fecha_emision);
            
            $("#txtObservaciones").val(v.observaciones);
            
            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#modal-agregar-vacaciones").modal({
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
    let FechaHoy = moment(); 
    $(".titulo-modal").html("Asignar Vacaciones");
    $("#hOperacionVacaciones").val("Agregar");
    $("#hIdPersonalVacaciones").val(id_personal);
    $(".infoNoEmpleadoVacaciones").html(no_empleado);
    $(".infoNombreVacaciones").html(nombre_completo);
    $("#txtFechaEmision").datepicker("setDate", FechaHoy.format('DD-MM-YYYY'));

    $("#modal-busquedas").modal('hide');

    setTimeout(() => {
        $("#modal-agregar-vacaciones").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    }, 300);
}

function imprimir_documento(pid_vacacion, pannio, pperiodo){
    $.ajax({
        url: 'views/reportes/solicitud_de_vacaciones.pdf.php',
        data: {"xid_vacacion":pid_vacacion, "xannio":pannio, "xperiodo":pperiodo},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            //Aqui mostrar ventana de cargando ...
            $(".titulo-modal").html("Imprimir Formato de Vacaciones");

            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: true,
                keyboard: false
            });
        },
        success: function(pdf) {
            if (pdf.generado) {
                //Cargar el archivo PDF recien generado
                $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/reportes/pdf/'+pdf.nombre_archivo+'#locale=es-MX');
                //Ocultamos la ventana modal de Loading
                $("#ModalLoading").modal('hide');
                //Mostramos la Ventana del archivo PDF
                $("#ModalPreviewPDF").modal({
                    backdrop: 'static',
                    keyboard: true,
                    keyboard: false
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

function cat_periodo(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_periodo"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectPeriodo").empty();
          $("#selectPeriodo").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectPeriodo").empty();
          $("#selectPeriodo").html(respuesta.periodos);
          $("#selectPeriodo").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectPeriodo").selectpicker('val',seleccionado);
            $("#selectPeriodo").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}

function cat_director(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_director"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.directores);
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

function cat_delegado_adtvo(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_delegado_adtvo"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.delegados);
          $("#"+ctrlSelect).selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectAutorizo").selectpicker('val',seleccionado);
            $("#selectAutorizo").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}