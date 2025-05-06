jQuery(document).ready(function(){
    $("li.personal").addClass("active");

    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    var tabla=$('#tablaLicencias').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.licencias.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "6%", "targets": 0, "visible":false },
            { "width": "17%", "targets": 1 },
            { "width": "18%", "targets": 2 },
            { "width": "4%", "targets": 3 },
            { "width": "5%", "targets": 4 },
            { "width": "5%", "targets": 5 },
            { "width": "10%", "targets": 6 },
            { "width": "12%", "targets": 7 },
            { "width": "5%", "targets": 8 },
            { "width": "4%", "targets": 9 },
            { "width": "4%", "targets": 10 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(2),td:eq(3),td:eq(4),td:eq(7),td:eq(8),td:eq(9)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});
            // $('td:eq(2)', row).css({"font-weight":"bold"});
        },
        "initComplete": function (settings, json) {
            $("#tablaLicencias_filter").remove();
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
            $('#tablaLicencias').DataTable().ajax.reload(null, false);
            tabla.search('').columns().search('').draw();
        }
    });

    $("#btnActualizar").click(function() {
        $("#txtBuscar").val('');
        $('#tablaLicencias').DataTable().ajax.reload(null, false);
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

    //Cargamos los catalogos
    cat_director("00","selectDirectorLicencia");
    cat_autoriza("00", "selectAutorizaLicencia");
    cat_director_rh("00", "selectDirectorRHLicencia");


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

    $("#modal-agregar-licencias").on('shown.bs.modal', function(e) {
        
    });

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

function editar_licencia(id_permiso){
    let xtoken    = $("#Token_CSRF").val();
    let operacion = $("#hOperacion").val();

    $(".titulo-modal").html("Editando Licencia Económica");
    $("#hOperacionLicencia").val("Editar");
    $("#hIdPermiso").val(id_permiso);


    $.ajax({
        url: 'models/ajax/permisos_cmd.php',
        data: {"xCMD":"Seleccionar","xToken":xtoken,"xid_permiso":id_permiso},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {

        },
        success: function(respuesta) {
          console.log(respuesta);

          if (respuesta.obtenido) {
            let p = respuesta.permiso;

            //Asignar los datos obtenidos 
            $(".infoNoEmpleadoLicencia").html(p.num_empleado);
            $(".infoNombreLicencia").html(p.nombre_completo);
            $("#txtFechaIngreso").datepicker("setDate", p.fecha_ingreso);
            $("#txtLugarCheca").val(p.lugar_checa);
            $("#txtComisionado").val(p.comision);
            $("#txtOficinaPagadora").val(p.oficina_pagadora);
            $("#txtSueldoQuincenal").val(p.sueldo);
            $("#txtFechaInicioLicencia").datepicker("setDate", p.fecha_inicia);
            $("#txtFechaFinLicencia").datepicker("setDate", p.fecha_fin);
            $("#txtTotalDiasLicencia").val(p.total_dias);

            $("#txtLicenciaApartirDe").val(p.licencia_apartir_de);
            $("#selectConSueldoLicencia").selectpicker('val',p.con_sin_sueldo); 
            $("#selectConSueldoLicencia").selectpicker("refresh"); 
            $("#txtMotivoLicencia").val(p.motivo);
            $("#txtProrrogaLicencia").val(p.prorroga);

            $("#selectDirectorLicencia").selectpicker('val',p.id_director); 
            $("#selectDirectorLicencia").selectpicker("refresh");    
            $("#selectAutorizaLicencia").selectpicker('val',p.id_secretario); 
            $("#selectAutorizaLicencia").selectpicker("refresh");
            $("#txtFechaEmisionLicencia").datepicker("setDate", p.fecha_emision); 
            
            //Al recibir datos relacionados de las vacaciones mostrar la ventana modal
            setTimeout(() => {
                $("#modal-agregar-licencias").modal({
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
    console.log(id_personal, no_empleado, nombre_completo);

    $("#modal-busquedas").modal('hide');

    aregar_licencias(id_personal, no_empleado, nombre_completo);
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

            $('#modal-agregar-licencias').delay(500).fadeIn('fast');
            setTimeout(() => {
                $("#modal-agregar-licencias").modal({
                    backdrop: 'static',
                    keyboard: true,
                    keyboard: false
                });
            }, 300);
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
        }
    }); //Fin de Ajax
}



function imprimir_documento(id_licencia){
    $.ajax({
        url: 'views/reportes/solicitud_de_licencia_economica.pdf.php',
        data: {"xid_permiso":id_licencia},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            //Aqui mostrar ventana de cargando ...
            $(".titulo-modal").html("Imprimir Formato de Licencia Economica");

            $("#ModalLoading").modal({
                backdrop: 'static',
                keyboard: true,
                keyboard: false
            });
        },
        success: function(pdf) {
            console.info(pdf);
            
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

function cat_autoriza(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_autoriza"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.autorizadores);
          $("#"+ctrlSelect).selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectAutorizo").selectpicker('val',seleccionado);
            $("#selectAutorizo").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.error(jqXHR, status, error);
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