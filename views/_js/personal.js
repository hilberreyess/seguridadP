jQuery(document).ready(function(){
    $("li.personal").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaPersonal').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.personal.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "5%", "targets": 0 },
            { "width": "20%", "targets": 1 },
            { "width": "8%", "targets": 2 },
            { "width": "5%", "targets": 3 },
            { "width": "12%", "targets": 4 },
            { "width": "10%", "targets": 5 },
            { "width": "15%", "targets": 6 },
            { "width": "15%", "targets": 7 },
            { "width": "10%", "targets": 8 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(2),td:eq(3),td:eq(8),td:eq(9)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        initComplete: function (settings, json) {
            $("#tablaPersonal_filter").remove();
        }
    });//Fin de Configuración del Datatables

    /***Funciones para los filtros de la tabla***/
    $('.search-input').on( 'keyup', function () {
        var i =$(this).attr('id');
        var v =$(this).val();
       tabla.columns(i).search(v).draw();
    });

    $("#txtBuscar").focus();

    $("#ModalPreviewPDF").on('hidden.bs.modal', function(e) {
        //Agregamos el css para evitar que la tabla se reduzca al momento de cerrar la ventana del pdf      
        $("body").css({"padding-right":"0px"});
    });

    //Cargamos los catalogos
    cat_periodo("00");
    cat_director("00","selectDirectorVacaciones");
    cat_delegado_adtvo("00", "selectAutorizaVacaciones");

    $("#txtBuscar").keyup(function(){
        if($(this).val().length > 3){
            let buscar = $(this).val();
            tabla.search(buscar).draw();            
        }

        if($(this).val().length == 0){
            $("#txtBuscar").val('');
            $('#tablaPersonal').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

	$("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $('#tablaPersonal').DataTable().ajax.reload(null, false);
        tabla.search('').columns().search('').draw();
    });

  
    $("#modal-agregar-vacaciones").on('hidden.bs.modal', function(e) {        
        $("#form-guardar-vacaciones").resetForm();
        $('#form-guardar-vacaciones').bootstrapValidator('resetForm', true);

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

        $('#form-guardar-vacaciones').bootstrapValidator('enableFieldValidators', 'txtDias', 'notEmpty', true);
    });

    $("#modal-agregar-vacaciones").on('shown.bs.modal', function(e) {
        //$('#form-guardar-vacaciones').bootstrapValidator('resetForm', true);
    });


    $("#btnAgregar").click(function(){
        window.location.replace("personal-datos.php");
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
                    console.log("Dia Semana:"+diaSemana);

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
            console.log(selectedDate);
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
            selectDirector: {
                validators: {
                    notEmpty: { message: 'Seleccione el Director' }
                }
            },
            selectAutorizo: {
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
                    console.log(respuesta);
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
   

    /**
     * ======================================================================
     *                  EMISION DE LICENCIAS ECONOMICAS
     * ======================================================================
     */

    $("#txtFechaIngreso").datepicker({
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
            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtFechaIngreso', 'notEmpty', false);
            //$('#form-guardar-vacaciones').bootstrapValidator('revalidateField', 'txtFechaEmision');
            //$('#form-guardar-vacaciones').bootstrapValidator('updateStatus', 'txtFechaEmision', 'NOT_VALIDATED').bootstrapValidator('validateField', 'txtFechaEmision');
        }
    });

    var fechas_licencia = $("#txtFechaInicioLicencia, #txtFechaFinLicencia").datepicker({
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
            var option = this.id == "txtFechaInicioLicencia" ? "minDate" : "maxDate",
            instance = $(this).data("datepicker"),
            date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            fechas_licencia.not(this).datepicker("option", option, date);

            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtFechaInicioLicencia', 'notEmpty', false);
            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtFechaFinLicencia', 'notEmpty', false);

            //Para obtener el numero de dias habiles entre dos fechas, promero recorrer el rango de las fechas y contar los dias que no sean sabado o domingo
            if (this.id === "txtFechaFinLicencia") {
                let fechaInicio = moment($("#txtFechaInicioLicencia").val().split('-').reverse().join('-'),'YYYY-MM-DD'); //fecha en formato YYYY-MM-DD
                let fechaFin    = moment($("#txtFechaFinLicencia").val().split('-').reverse().join('-'),'YYYY-MM-DD');
                let totalDias = 0;

                $("#txtLicenciaApartirDe").val(fechaInicio.format('DD')+" DE "+ meses[fechaInicio.format('M')-1] +" DE "+fechaInicio.format('YYYY'));

                while(fechaInicio.isSameOrBefore(fechaFin)){
                    let diaSemana = fechaInicio.isoWeekday();

                    if(diaSemana!==6 && diaSemana!==7){
                        totalDias++;
                    }

                    fechaInicio.add(1,'days');
                }


                if(totalDias == 0 || totalDias == 1){
                    $("#txtTotalDiasLicencia").val(totalDias);
                    $(".tDiasLicencia").html("DÍA");
                }else{
                    $("#txtTotalDiasLicencia").val(totalDias);
                    $(".tDiasLicencia").html("DÍAS");

                    if(totalDias > 3){
                        Swal.fire({
                            icon: 'error',
                            title: '¡Atención!',
                            text: 'El total de días de Licencia Económica seleccionado es Mayor a 3 días.',
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
            }

            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtTotalDiasLicencia', 'notEmpty', false);
            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtLicenciaApartirDe', 'notEmpty', false);
        }
    });
    
    cat_director("00","selectDirectorLicencia");
    cat_delegado_adtvo("00", "selectAutorizaLicencia");
    cat_director_rh("00", "selectDirectorRHLicencia");

    $("#txtFechaEmisionLicencia").datepicker({
        inline: false,
        showButtonPanel: false,
        minDate: "-3m",
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
            $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtFechaEmisionLicencia', 'notEmpty', false);
            //$('#form-guardar-vacaciones').bootstrapValidator('revalidateField', 'txtFechaEmision');
            //$('#form-guardar-vacaciones').bootstrapValidator('updateStatus', 'txtFechaEmision', 'NOT_VALIDATED').bootstrapValidator('validateField', 'txtFechaEmision');
        }
    });

    $("#modal-agregar-licencias").on('hidden.bs.modal', function(e) {        
        $("#form-guardar-licencias").resetForm();
        $('#form-guardar-licencias').bootstrapValidator('resetForm', true);

        // $("#selectAnnio").selectpicker.val(1); 
        // $("#selectAnnio").selectpicker("refresh");
        
        $("#selectConSueldoLicencia").selectpicker('val','CON SUELDO'); 
        $("#selectConSueldoLicencia").selectpicker("refresh");
        
        
        let DirectorAutoriza = $("select[name=selectDirectorLicencia] option:first").val();
        $("#selectDirectorLicencia").selectpicker('val',DirectorAutoriza); 
        $("#selectDirectorLicencia").selectpicker("refresh");

        let QuienAutoriza= $("select[name=selectAutorizaLicencia] option:first").val();
        $("#selectAutorizaLicencia").selectpicker('val',QuienAutoriza); 
        $("#selectAutorizaLicencia").selectpicker("refresh");
        

        // $('#form-guardar-licencias').bootstrapValidator('revalidateField', 'txtTotalDiasLicencia', 'notEmpty', false);
        // $('#form-guardar-licencias').bootstrapValidator('enableFieldValidators', 'txtLicenciaApartirDe', 'notEmpty', false);

        //window.location.reload();

    });

    /*
    $("#form-guardar-licencias").bootstrapValidator({
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
            txtFechaInicioLicencia: {
                validators: {
                    notEmpty: { message: 'La Fecha Inicial es Requerida' }
                }
            },
            txtFechaFinLicencia: {
                validators: {
                    notEmpty: { message: 'La Fecha Final es Requerida' }
                }
            },
            txtTotalDiasLicencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtLicenciaApartirDe: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtMotivoLicencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectDirectorLicencia: {
                validators: {
                    notEmpty: { message: 'Seleccione el Director' }
                }
            },
            selectAutorizaLicencia: {
                validators: {
                    notEmpty: { message: 'Seleccione quien Autoriza' }
                }
            },
            txtFechaEmisionLicencia: {
                validators: {
                    notEmpty: {
                        message: 'La Fecha de Emisión es Requerida'
                    }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#Token_CSRF").val();
            var operacion = $("#hOperacionLicencia").val();

            //Primero Verificamos que no existe un periodo ya asignado
            $.ajax({
                url: 'models/ajax/permisos_cmd.php',
                data: $("#form-guardar-licencias").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    $('.loading2').show();
                },
                success: function(respuesta) {
                    if (respuesta.agregado) {
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading2').hide();
                        $('#tablaPersonal').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-licencias').modal('hide');

                        //Aqui mostrar la pantalla del PDF de la Licencia para imprimir
                        console.log(respuesta);

                        let xid_permiso   = respuesta.id_permiso;
                        let xid_personal  = respuesta.id_personal;
                        let xfecha_inicia = respuesta.fecha_inicia;
                        let xfecha_fin    = respuesta.fecha_fin;

                        $.ajax({
                            url: 'views/reportes/solicitud_de_licencia_economica.pdf.php',
                            data: {"xid_permiso":xid_permiso},
                            type: 'POST',
                            dataType: 'JSON',
                            beforeSend: function() {
                                //Aqui mostrar ventana de cargando ...
                                $(".titulo-modal").html("Imprimir Formato de Solicitud de Licencia");

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
                                console.log(jqXHR, status, error);
                            }
                        }); //Fin de Ajax                        
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
                                 $('.loading').hide();
                                 $('#tablaPersonal').DataTable().ajax.reload(null, false);
                                break;

                            case 'NoComand':
                                break;

                            case 'NoInsert':
                                break;

                            case 'ExcesoDias':
                                    let nombre_personal = $(".infoNombreLicencia").html();
                                    Swal.fire({
                                        icon: 'error',
                                        title: '¡Limite Maximo de Dias!',
                                        text: nombre_personal +' Ha superado el número máximo de dias otorgados de Licencias Económicas (9 dias)',
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
                                    $('#tablaPersonal').DataTable().ajax.reload(null, false);
                                    $("#modal-agregar-licencias").modal('hide');
                                break;
                        
                            default:
                                break;
                        }
                    }
                },
                error: function(jqXHR, status, error) {
                    console.warn(jqXHR, status, error);
                    $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                    $('.loading').hide();
                }
            }); //cierra ajax


        } //fin de submitHandler
    }); //fin de Validator
    */


    $("#form-guardar-licencias").bootstrapValidator({
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
            txtFechaInicioLicencia: {
                validators: {
                    notEmpty: { message: 'La Fecha Inicial es Requerida' }
                }
            },
            txtFechaFinLicencia: {
                validators: {
                    notEmpty: { message: 'La Fecha Final es Requerida' }
                }
            },
            txtTotalDiasLicencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtLicenciaApartirDe: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            txtMotivoLicencia: {
                validators: {
                    notEmpty: { message: 'Este campo es requerido' }
                }
            },
            selectDirectorLicencia: {
                validators: {
                    notEmpty: { message: 'Seleccione el Director' }
                }
            },
            selectAutorizaLicencia: {
                validators: {
                    notEmpty: { message: 'Seleccione quien Autoriza' }
                }
            },
            txtFechaEmisionLicencia: {
                validators: {
                    notEmpty: {
                        message: 'La Fecha de Emisión es Requerida'
                    }
                }
            },
        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            var xtoken    = $("#Token_CSRF").val();
            var operacion = $("#hOperacionLicencia").val();

            //Primero Verificamos que no existe un periodo ya asignado
            $.ajax({
                url: 'models/ajax/permisos_cmd.php',
                data: $("#form-guardar-licencias").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    $('.loading2').show();
                },
                success: function(respuesta) {
                    console.log(respuesta);

                    if (respuesta.comando=="Agregar") {
                        if (respuesta.agregado) {
                            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                            $('.loading2').hide();
                            $('#tablaLicencias').DataTable().ajax.reload(null, false);                       
                            $('#modal-agregar-licencias').modal('hide');

                            let xid_permiso   = respuesta.id_permiso;
                            let xid_personal  = respuesta.id_personal;
                            let xfecha_inicia = respuesta.fecha_inicia;
                            let xfecha_fin    = respuesta.fecha_fin;

                            $.ajax({
                                url: 'views/reportes/solicitud_de_licencia_economica.pdf.php',
                                data: {"xid_permiso":xid_permiso},
                                type: 'POST',
                                dataType: 'JSON',
                                beforeSend: function() {
                                    //Aqui mostrar ventana de cargando ...
                                    $(".titulo-modal").html("Imprimir Formato de Solicitud de Licencia");

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
                                    console.error(jqXHR, status, error);
                                }
                            }); //Fin de Ajax                        
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
                                    $('#tablaLicencias').DataTable().ajax.reload(null, false);
                                    break;

                                case 'NoComand':
                                    break;

                                case 'NoInsert':
                                    break;

                                case 'ExcesoDias':
                                        let nombre_personal = $(".infoNombreLicencia").html();
                                        Swal.fire({
                                            icon: 'error',
                                            title: '¡Limite Maximo de Dias!',
                                            text: nombre_personal +' Ha superado el número máximo de dias otorgados de Licencias Económicas (9 dias)',
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
                                        $('#tablaLicencias').DataTable().ajax.reload(null, false);
                                        $("#modal-agregar-licencias").modal('hide');
                                    break;
                            
                                default:
                                    break;
                            }
                        }
                    } else if(respuesta.comando=="Editar") {
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading2').hide();
                        $('#tablaLicencias').DataTable().ajax.reload(null, false);                       
                        $('#modal-agregar-licencias').modal('hide');

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
                    console.warn(jqXHR, status, error);
                    $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                    $('.loading2').hide();
                }
            }); //cierra ajax


        } //fin de submitHandler
    }); //fin de Validator

}); //cierra Jquery


function imprimir_ficha(id){
    $(".titulo-modal").html("Imprimir");

    $("#ModalLoading").modal({
          backdrop: 'static',
          keyboard: true,
          keyboard: false
    });

    setTimeout(() => {
        //Cargamos el Archivo PDF recien Generado
        //$("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/reportes/archivos/'+respuesta.nombre_archivo+'?locale=es-MX');
        $("#FramePDFjs").attr('src','views/plugins/pdfjs-2.3.2/web/viewer.php?file=../../../../views/reportes/ficha_datos_personales.pdf?locale=es-MX');
        //Ocultamos la ventana modal de Loading
        $("#ModalLoading").modal('hide');
        //Mostramos la Ventana del archivo PDF
        $("#ModalPreviewPDF").modal({
            backdrop: 'static',
            keyboard: true,
            keyboard: false
        });
    }, 1500);

    
}

function editar_personal(id_persona){
    var xtoken    = $("#Token_CSRF").val();
    console.log(id_persona);

    setTimeout(() => {
        window.location.replace("personal-datos.php?ip="+id_persona);
    }, 500);

    // $.ajax({
    //     url: 'models/ajax/personas_en_refugios_cmd.php',
    //     data: {"xCMD":"Seleccionar","xIdPersona":id_persona, "xToken":xtoken},
    //     type: 'POST',
    //     dataType: 'JSON',
    //     beforeSend: function() {
    //        $("#ModalLoading").modal({backdrop: 'static', keyboard: true, keyboard: false});
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido) {
    //             var p = respuesta.persona; 
                
    //             $("#hOperacion").val('Editar');              
    //             $("#hIdPersona").val(id_persona);
    //             $("#txtRefugio").val(p.refugio);
    //             $("#txtNombreCompleto").val(p.nombre_completo);
    //             $("#txtEdad").val(p.edad);
    //             $("#selectSexo").val(p.sexo).change();
    //             $("#txtColoniarescate").val(p.colonia_rescatada);
    //             $("#txtDomicilio").val(p.domicilio_persona);
    //             $("#txtOrigenResidencia").val(p.origen_residencia);
    //             $("#selectEstadoSalud").val(p.estatus_medico).change();
    //             $("#txtTelefonoContacto").val(p.telefono_contacto);

    //             $("#ModalLoading").modal('hide');
    //         }else{
    //             console.log("Error ");
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax 


    $(".titulo-modal").html("Editando Solicitud");
	$("#modal-agregar").modal({
                                show:true,
                                backdrop: 'static',
                                keyboard: false
                            });

}

function agregar_vacaciones(id_personal, no_empleado, nombre_completo){
    let FechaHoy = moment(); 
    $(".titulo-modal").html("Asignar Vacaciones");
    $("#hOperacionVacaciones").val("Agregar");
    $("#hIdPersonalVacaciones").val(id_personal);
    $(".infoNoEmpleadoVacaciones").html(no_empleado);
    $(".infoNombreVacaciones").html(nombre_completo);
    $("#txtFechaEmision").datepicker("setDate", FechaHoy.format('DD-MM-YYYY'));


    $("#modal-agregar-vacaciones").modal({
        show:true,
        backdrop: 'static',
        keyboard: false
    });
}

function aregar_licencias(id_personal, no_empleado, nombre_completo){
    let FechaHoy = moment(); 
    $(".titulo-modal").html("Asignar Licencia Económica");
    $("#hOperacionLicencia").val("Agregar");
    $("#hIdPersonalLicencia").val(id_personal);
    $(".infoNoEmpleadoLicencia").html(no_empleado);
    $(".infoNombreLicencia").html(nombre_completo);
    $("#txtFechaEmisionLicencia").datepicker("setDate", FechaHoy.format('DD-MM-YYYY'));

    $.ajax({
        url: 'models/ajax/personal_cmd.php',
        data: {"xCMD":"DatosPersonal", "xid_personal":id_personal, "xToken":$("#Token_CSRF").val()},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
         
        },
        success: function(respuesta) {
          let p = respuesta.datos;   
          let sueldoFormateado = new Intl.NumberFormat('es-MX').format(p.sueldo);      

          $("#txtFechaIngreso").datepicker("setDate", p.fecha_ingreso.split("-").reverse().join("-"));
          $("#txtLugarCheca").val(p.lugar_checa);
          $("#txtComisionado").val(p.comision);
          $("#txtOficinaPagadora").val(p.pagadora);
          $("#txtSueldoQuincenal").val(sueldoFormateado);

          $("#modal-agregar-licencias").modal({
            show:true,
            backdrop: 'static',
            keyboard: false
          });
        },
        error: function(jqXHR, status, error) {
            console.log(jqXHR, status,error);
        }
    }); //Fin de Ajax
}


function expediente_digital(id_persona){
    console.log(id_persona);

    setTimeout(() => {
        window.location.replace("personal-expediente.php?ip="+id_persona);
    }, 500);
    
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
            console.log(error);
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
            console.log(error);
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

function cat_director_rh(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_director_rh"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.directoresrh);
          $("#"+ctrlSelect).selectpicker("refresh");

        //   if (seleccionado != '00') {
        //     $("#selectAutorizo").selectpicker('val',seleccionado);
        //     $("#selectAutorizo").selectpicker("refresh");
        //   }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}