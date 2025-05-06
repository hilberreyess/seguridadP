jQuery(document).ready(function(){
    $("li.personal").addClass("active");
    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    let urlParametros = new URLSearchParams(window.location.search);

    $("#btnCancelar").click(function() {
        window.location.replace("esp-personal.php");
    });

    $("#btnAgregar").click(function(){
        window.location.replace("personal-datos.php");
    });

    /**Detecta Cambio de Tab */
    // $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    //     e.preventDefault();
    //     let urltab = $(this).attr("href");
        
    //     if (urltab==="#DatosPersonales" || urltab ==="#Fotografias") {
    //         $("#btnGuardar").attr("disabled", "disabled"); 
    //     } else {
    //         $("#btnGuardar").removeAttr("disabled"); 
    //     }
    // });

    
    /*Carga de Catalogos del Formulario de Datos Personales */
    cat_estado_civil(seleccionado='00', "selectEstadoCivil");
    cat_tipo_sangre(seleccionado='00', "selectTipoSangre");
    cat_nacionalidad(seleccionado='1', "selectNacionalidad");
    cat_entidades(seleccionado='12', "selectEntidadNacimiento");
    cat_municipios(seleccionado='00', '12', "selectMunicipioNacimiento");
    cat_estatus(seleccionado='00', "selectEstatus");

    /*Carga de Catalogos del Formulario de Datos Personales */
    cat_entidades(seleccionado='12', "selectEntidadDomicilio");
    cat_municipios(seleccionado='00', '12', "selectMunicipioDomicilio");   

    /*Carga de Catalogos del Formulario de Formacion Academica */
    cat_nivel_estudios(seleccionado='00', "selectNivelEstudios");
    cat_estatus_estudios(seleccionado='00', "selectEficienciaTerminal");

    /*Carga de Catalogos del Formulario de Adscripcion Laboral */
    cat_tipo_funciones(seleccionado='00', "selectTipoFuncion");
    //cat_dependencia(seleccionado='00', "selectDependencia");
	esp_empresas(seleccionado='00', "selectDependencia");
    cat_areas(seleccionado='00', "selectArea");
    cat_categorias(seleccionado='00', "selectCategoria");
    cat_plaza(seleccionado='00', "selectTipoPlaza");
    cat_nivel_mando(seleccionado='00', "selectNivelMando");
    cat_corporacion(seleccionado='00', "selectCentroTrabajo");
    cat_entidades(seleccionado='12', "selectEntidadAdscripcion");
    cat_municipios(seleccionado='00', '12', "selectMunicipioAdscripcion");
    cat_horarios(seleccionado='00', "selectHorario");
    cat_checador(seleccionado='00', "selectTipoChecador");
    
    /**Inicializamos los controles */
    $("#txtFechaNacimiento").datepicker({
        inline: false,
        showButtonPanel: false,
        // minDate: "-80y",
        // maxDate: "-16y",
        yearRange: "-80:-16",
        autoSize: true,
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
        // beforeShowDay: $.datepicker.noWeekends,
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 100);
        },
        onSelect: function (selectedDate) {
            $('#form-guardar-personal').bootstrapValidator('enableFieldValidators', 'txtFechaNacimiento', 'notEmpty', false);
        }
    });

    $('#selectEntidadNacimiento').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let pEntidadNacimiento = $("#selectEntidadNacimiento").val();
        //Asignamos los Municipios de la Entidad Seleccionada
        cat_municipios(seleccionado='00', pEntidadNacimiento, "selectMunicipioNacimiento");        
    });

    $('#selectEntidadDomicilio').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let pEntidadDimicilio = $("#selectEntidadDomicilio").val();
        //Asignamos los Municipios de la Entidad Seleccionada
        cat_municipios(seleccionado='00', pEntidadDimicilio, "selectMunicipioDomicilio");        
    });

    $('#selectEntidadAdscripcion').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let pEntidadDimicilio = $("#selectEntidadAdscripcion").val();
        //Asignamos los Municipios de la Entidad Seleccionada
        cat_municipios(seleccionado='00', pEntidadDimicilio, "selectMunicipioAdscripcion");        
    });


    /**Aqui verificar Antes si existe la CURP, para advertir al usuario */
    $("#txtCURP").focusout(function(){
        let xtoken    = $("#Token_CSRF").val();
        let operacion = $("#hOperacion").val();
        let xCURP     = $("#txtCURP").val();

        /**Verifica si la CURP Existe solo en caso de Agregar */
        if (operacion == "Agregar") {
            $.ajax({
                url: 'models/ajax/personal_cmd.php',
                type: 'POST',
                data:{"xCMD":"ExisteCURP", "xToken":xtoken, "xCURP":xCURP},
                dataType: 'json',
                success: function(respuesta) {
                    if (respuesta.existe) {
                        let p = respuesta.persona;
    
                        Swal.fire({
                            icon: 'error',
                            title: '¡CURP Registrada!',
                            html: 'Se ha detectado que la CURP que intenta agregar ya Existe en la Base de Datos, asignada a: <strong>'+p.nombre_completo+'</strong>, verfique antes de continuar para evitar duplicar los Datos Personales.',
                            confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Enterado`,
                            confirmButtonColor: "#d33",
                            position: 'top',
                            width: 500,
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
        }        
    });


    $("#txtFechaIngreso").datepicker({
        inline: false,
        showButtonPanel: false,
        // minDate: "-40y",
        maxDate: "c",
        yearRange: "-40:c",
        autoSize: true,
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
        // beforeShowDay: $.datepicker.noWeekends,
        beforeShow: function() {
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 100);
        },
        onSelect: function (selectedDate) {
            $('#form-guardar-personal').bootstrapValidator('enableFieldValidators', 'txtFechaIngreso', 'notEmpty', false);
        }
    });

    

    /**En caso de que contenga el parametro Id_Persona se considera como una edicion */
    if (urlParametros.has("ip")){
        let xid_personal=urlParametros.get('ip');
        let xtoken    = $("#Token_CSRF").val();
        let operacion = $("#hOperacion").val();

        $("#hOperacion").val("Editar");
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
                if (respuesta.obtenido == true && respuesta.datos != false) {
                    let p = respuesta.datos;
                    $("#txtCURP").val(p.curp);
                    $("#txtNombre").val(p.nombre);
                    $("#txtApellidoPaterno").val(p.apellido_paterno);
                    $("#txtApellidoMaterno").val(p.apellido_materno);
                    $("#txtFechaNacimiento").datepicker("setDate", p.fecha_nacimiento);                    
                    $("#selectSexo").selectpicker('val',p.id_genero); 
                    $("#selectSexo").selectpicker("refresh");
                    $("#txtRFC").val(p.rfc);
                    $("#txtCUIP").val(p.cuip);
                    $("#txtFolioINE").val(p.folio_ine);
                    $("#txtNoCartilla").val(p.matricula_cartilla);
                    $("#txtNoLicencia").val(p.licencia_conducir);
                    $("#txtNoPasaporte").val(p.pasaporte);
                    $("#txtCorreoPersonal").val(p.correo_personal);
                    $("#txtCorreoLaboral").val(p.correo_laboral);
                    $("#selectEstadoCivil").selectpicker('val',p.id_estado_civil); 
                    $("#selectEstadoCivil").selectpicker("refresh");
                    $("#selectTipoSangre").selectpicker('val',p.id_tipo_sangre); 
                    $("#selectTipoSangre").selectpicker("refresh");
                    $("#selectNacionalidad").selectpicker('val',p.id_nacionalidad); 
                    $("#selectNacionalidad").selectpicker("refresh");
                    $("#selectEntidadNacimiento").selectpicker('val',p.id_entidad); 
                    $("#selectEntidadNacimiento").selectpicker("refresh");          
                    $("#txtLugarNacimiento").val(p.lugar_nac);
                    $("#selectEstatus").selectpicker('val',p.id_estatus); 
                    $("#selectEstatus").selectpicker("refresh");

                    setTimeout(() => {
                        $("#selectMunicipioNacimiento").selectpicker('val',p.id_municipio); 
                        $("#selectMunicipioNacimiento").selectpicker("refresh");
                    }, 1000); 
                } else {
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

        //Obtenemos los datos de la Tabla datos_domicilios 
        $.ajax({
            url: 'models/ajax/datos_domicilios_cmd.php',
            type: 'POST',
            data:{"xCMD":"Seleccionar", "xToken":xtoken, "xid_personal":xid_personal},
            dataType: 'json',
            success: function(respuesta) {
                console.log(respuesta);
                if (respuesta.obtenido == true && respuesta.datos != false) {
                    let d = respuesta.datos;

                    $("#selectEntidadDomicilio").selectpicker('val',d.id_entidad); 
                    $("#selectEntidadDomicilio").selectpicker("refresh");

                    setTimeout(() => {
                        $("#selectMunicipioDomicilio").selectpicker('val',d.id_municipio); 
                        $("#selectMunicipioDomicilio").selectpicker("refresh");
                    }, 1000);

                    $("#txtCiudadLocalidadDomicilio").val(d.ciudad);
                    $("#txtColoniaDomicilio").val(d.colonia);
                    $("#txtCalleDomicilio").val(d.calle);
                    $("#txtNoExteriorDomicilio").val(d.n_exterior);
                    $("#txtNoInteriorDomicilio").val(d.n_interior);
                    $("#txtEntreCalle1").val(d.entre_calle1);
                    $("#txtEntreCalle2").val(d.entre_calle2);
                    $("#txtCodigoPostal").val(d.cod_postal);
                    $("#txtMovil").val(d.tel_movil);
                    $("#txtTelefonoFijo").val(d.tel_fijo);
                } else {
                    //Mostrar mensaje de que no se encontraron datos relacionados y redirigir a la pantalla de personal
                    
                    //Si no hay datos no hacer nada
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        }); //Fin de Ajax
        
        //Obtenemos los datos de la Tabla datos_adscripcion
        $.ajax({
            url: 'models/ajax/datos_adscripciones_cmd.php',
            type: 'POST',
            data:{"xCMD":"Seleccionar", "xToken":xtoken, "xid_personal":xid_personal},
            dataType: 'json',
            success: function(respuesta) {               
                if (respuesta.obtenido == true && respuesta.datos != false) {
                    let a = respuesta.datos;
                    
                    $("#txtNoEmpleado").val(a.num_empleado);
                    $("#txtFechaIngreso").datepicker("setDate", a.fecha_ingreso); 
                    $("#txtCargoPuesto").val(a.cargo);
                    $("#selectTipoFuncion").selectpicker("val",a.id_tipo_funcion); 
                    $("#selectTipoFuncion").selectpicker("refresh");
                    $("#selectDependencia").selectpicker("val",a.id_dependencia); 
                    $("#selectDependencia").selectpicker("refresh");
                    $("#selectArea").selectpicker("val",a.id_area); 
                    $("#selectArea").selectpicker("refresh");
                    $("#selectCategoria").selectpicker("val",a.id_categoria); 
                    $("#selectCategoria").selectpicker("refresh");
                    $("#selectTipoPlaza").selectpicker("val",a.id_plaza); 
                    $("#selectTipoPlaza").selectpicker("refresh");
                    $("#selectNivelMando").selectpicker("val",a.id_nivel_mando); 
                    $("#selectNivelMando").selectpicker("refresh");
                    $("#selectCentroTrabajo").selectpicker("val",a.id_corporacion); 
                    $("#selectCentroTrabajo").selectpicker("refresh");
                    $("#selectEntidadAdscripcion").selectpicker("val",a.id_entidad); 
                    $("#selectEntidadAdscripcion").selectpicker("refresh");
                    setTimeout(() => {
                        $("#selectMunicipioAdscripcion").selectpicker("val",a.id_municipio); 
                        $("#selectMunicipioAdscripcion").selectpicker("refresh");
                    }, 1000);                    
                    $("#selectHorario").selectpicker("val",a.id_horario); 
                    $("#selectHorario").selectpicker("refresh");
                    $("#txtSueldo").val(a.sueldo);
                    $("#txtLugarCheca").val(a.lugar_checa);
                    $("#txtComisionado").val(a.comision);                    
                    $("#txtOficinaPagadora").val(a.pagadora);
                    $("#selectTipoChecador").selectpicker("val",a.id_checador); 
                    $("#selectTipoChecador").selectpicker("refresh");                   
                } else {
                    //Mostrar mensaje de que no se encontraron datos relacionados y redirigir a la pantalla de personal
                    
                    //Si no hay datos no hacer nada
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        }); //Fin de Ajax

        //Obtenemos los datos de la Tabla datos_formacion_academica
        $.ajax({
            url: 'models/ajax/datos_formacion_academica_cmd.php',
            type: 'POST',
            data:{"xCMD":"Seleccionar", "xToken":xtoken, "xid_personal":xid_personal},
            dataType: 'json',
            success: function(respuesta) {
                if (respuesta.obtenido == true && respuesta.datos != false) {
                    let f = respuesta.datos;
                    
                    $("#selectNivelEstudios").selectpicker('val',f.id_nivel_estudios); 
                    $("#selectNivelEstudios").selectpicker("refresh");
                    $("#selectEficienciaTerminal").selectpicker('val',f.id_estatus_estudio); 
                    $("#selectEficienciaTerminal").selectpicker("refresh");
                    $("#txtInstitucion").val(f.institucion);
                    $("#txtCarrera").val(f.carrera);
                    $("#txtEspecialidad").val(f.especialidad);
                    $("#txtCCT").val(f.cct);
                    $("#txtDocumentoObtenido").val(f.documento);
                    $("#txtNoFolioDocumento").val(f.folio);
                    $("#txtPromedio").val(f.promedio);
                    $("#txtNoCedulaProfesional").val(f.n_cedula);                   
                } else {
                    //Mostrar mensaje de que no se encontraron datos relacionados y redirigir a la pantalla de personal
                    
                    //Si no hay datos no hacer nada
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        }); //Fin de Ajax

        /*Aqui falta asignar las Fotografias en caso de Existir*/
        $.ajax({
            url: 'models/ajax/datos_fotografias_cmd.php',
            type: 'POST',
            data:{"xCMD":"Seleccionar", "xToken":xtoken, "xid_personal":xid_personal},
            dataType: 'json',
            success: function(respuesta) {
                if (respuesta.obtenido == true && respuesta.fotos != false) {
                    let f = respuesta.fotos;

                    if(f.fotografia_perfil_derecho){
                        let fotoPD = "views/archivos/fotografias/"+f.fotografia_perfil_derecho;
                        $(".img-fotografia-preview-pd").attr("src",fotoPD);
                    }

                    if(f.fotografia_perfil_frente){
                        let fotoPF = "views/archivos/fotografias/"+f.fotografia_perfil_frente;
                        $(".img-fotografia-preview-pf").attr("src",fotoPF);
                    }

                    if(f.fotografia_perfil_izquierdo){
                        let fotoPI = "views/archivos/fotografias/"+f.fotografia_perfil_izquierdo;
                        $(".img-fotografia-preview-pi").attr("src",fotoPI);
                    }                   
                } else {
                    //Mostrar mensaje de que no se encontraron datos relacionados y redirigir a la pantalla de personal
                    //Si no hay datos no hacer nada
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
            }
        }); //Fin de Ajax 

        /*Habilitar el Boton de Guardar des pues de 6s, para asegurar que sea habilitado hasta que todo este cargado corectamente*/
        setInterval(() => {
            $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
        }, 6000);
    }else{/** En caso de no tener el parametro de Id_Persona se considera como Nuevo regostro */
        let operacion =  $("#hOperacion").val();

        if (operacion == "Editar") {
            $("#hOperacion").val("Agregar");
            $("hIdPersonal").val('');
            
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
            }, 2000);
        }
    }


    $("#form-guardar-personal").bootstrapValidator({
        excluded: [':disabled'],
        button: {
            selector: '[type="submit"]',
        },
        message: 'Este campo es requerido',
        live: 'enabled',
        fields: {
            /**Datos Personales Izquierda*/
            txtCURP: {
                validators: {
                    notEmpty:{message:'Este campo es requerido'},
                }
            },
            txtNombre: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            txtApellidoPaterno: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            // txtApellidoMaterno: {
            //     validators:{notEmpty:{message:'Este campo es requerido'}}
            // },
            txtFechaNacimiento: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            selectSexo: {
                validators: {notEmpty: {message:'Seleccione una opcion'}}
            },
            txtRFC: {
                validators: {
                    notEmpty:{message:'Este campo es requerido'},
                    // regexp: {
                    //     regexp: /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i,  // /^[a-z\s]+$/i,  Solo letras y espacios
                    //     message: 'The full name can consist of alphabetical characters and spaces only'
                    // }
                }
            },
            txtCorreoPersonal: {
                validators: {
                    emailAddress: {
                        message: 'El correo electronico no tiene un formato válido'
                    }
                }
            },
            txtCorreoLaboral: {
                validators: {
                    emailAddress: {
                        message: 'El correo electronico no tiene un formato válido'
                    }
                }
            },
            selectEstadoCivil: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectNacionalidad: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectEntidadNacimiento: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectMunicipioNacimiento: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectEstatus: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            /**Domicilio Izquierda*/
            selectEntidadDomicilio: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectMunicipioDomicilio: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            txtCodigoPostal: {
                validators: {
                    stringLength: {
                        enabled: true,
                        min: 5,
                        max: 5,
                        message: 'Ingrese los 5 digitos del codigo postal'
                    },
                    digits: {
                      message: 'El formato del codigo postal no es correcto'
                    }
                }
            },
            txtMovil: {
                validators: {
                    stringLength: {
                        enabled: true,
                        min: 10,
                        max: 10,
                        message: 'Ingrese los 10 digitos del teléfono movil'
                    },
                    digits: {
                      message: 'El formato del número telefonico no es correcto'
                    }
                }
            },
            txtTelefonoFijo: {
                validators: {
                    stringLength: {
                        enabled: true,
                        min: 10,
                        max: 10,
                        message: 'Ingrese los 10 digitos del teléfono movil'
                    },
                    digits: {
                      message: 'El formato del número telefonico no es correcto'
                    }
                }
            },
            /**Datos de Formacion Academica */
            selectNivelEstudios: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectEficienciaTerminal: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            txtInstitucion: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },

            /** Datos de Adscripción */
            txtNoEmpleado: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            txtFechaIngreso: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            txtCargoPuesto: {
                validators:{notEmpty:{message:'Este campo es requerido'}}
            },
            
            selectTipoFuncion: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectDependencia: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectArea: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectCategoria: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectTipoPlaza: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectNivelMando: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectCentroTrabajo: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectEntidadAdscripcion: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectMunicipioAdscripcion: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectHorario: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            selectTipoChecador: {
                validators:{notEmpty:{message: 'Seleccione una opción'}}
            },
            custom:{
                validators: {
                    notEmpty: {message: 'The password is required and cannot be empty'},
                    callback:{
                        message: 'The password is not valid',
                        callback: function(value, validator, $field){
                            if (value === ''){
                                return true;
                            }
                        }
                    }
                }
            }

        }, //fin de Campos
        submitHandler: function(validator, form, submitButton) {
            let xtoken    = $("#Token_CSRF").val();
            let operacion = $("#hOperacion").val();

            $.ajax({
                url: 'models/ajax/datos_personales_cmd.php',
                data: $("#form-guardar-personal").serialize()+"&xCMD="+operacion+"&xToken="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#btnGuardar,#btnGuardar2').attr("disabled", "disabled");
                    //$('.loading').show();
                    $("#ModalLoading").modal({
                        backdrop: 'static',
                        keyboard: true,
                        keyboard: false
                    });
                },
                success: function(respuesta) {
                    console.log(respuesta);
                    if (operacion=="Agregar") {
                        /* Si fue agregado los Datos Personales */
                        if (respuesta.agregado_dp) {
                            mensaje('fa-check-circle', '¡Datos Personales!', 'Los Datos Personales han sido guardados correctamente.', 'success', 'right');

                            /* Si fue agregado la Datos del Domicilio */
                            if (respuesta.agregado_dd) {
                                mensaje('fa-check-circle', '¡Datos Domicilio!', 'Los Datos de Domicilio han sido guardados correctamente.', 'success', 'right');
                            } else {
                                mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al agregar los Datos del Domicilio.', 'danger');
                            }

                            /* Si fue agregado la Formación Academica */
                            if (respuesta.agregado_df) {
                                mensaje('fa-check-circle', '¡Datos Formación!', 'Los Datos de Formación Academica han sido guardados correctamente.', 'success', 'right');
                            } else {
                                mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al agregar los datos de Formación Academica.', 'danger', 'right');
                            }

                            /* Si fue agregado la Adscripcion Laboral */
                            if (respuesta.agregado_da) {
                                mensaje('fa-check-circle', '¡Datos Adscripción!', 'Los Datos de Adscripción Laboral han sido guardados correctamente.', 'success', 'right');
                            } else {
                                mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al agregar los datos de Adscripción Laboral.', 'danger', 'right');
                            }

                            /* Si fue agregado las Fotografias */
                            if (respuesta.agregado_fotos) {
                                mensaje('fa-check-circle', '¡Fotografías!', 'El registro de fotografías ha sido agregada correctamente.', 'success', 'right');
                            }

                            /** Aqui redireccionar a la pantalla del Listado de Personal */
                            setTimeout(() => {
                                $("#modal-busquedas").modal('hide');
                                window.location.replace("personal.php");                       
                            }, 5000);
                        } else {
                            switch (respuesta.codigo) {
                                case "PersonaExiste":
                                    mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al agregar los Datos Personales.', 'danger', 'right');

                                        Swal.fire({
                                            icon: 'error',
                                            title: '¡Personal Duplicado!',
                                            text: 'Se ha detectado que la CURP o Nombre del Personal que intenta agregar ya Existe, Verfique antes de Agregar para evitar duplicidad.',
                                            confirmButtonText: `<i class="fa fa-thumbs-up fa-lg"></i>&nbsp; OK, Entereado`,
                                            confirmButtonColor: "#d33",
                                            position: 'top',
                                            customClass: {
                                                htmlContainer: 'sweetalert-html-container',
                                                confirmButton: 'sweetalert-custom-button'
                                                
                                                }
                                        });
                                    break;
                            
                                default:
                                    mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al agregar Datos Personales.', 'danger');
                                    break;
                            }
                        }                        
                    } else if(operacion=="Editar"){
                        //Aqui agregar la Actualizacion de los Datos en Cada tabla y mostrar el mensaje de actualizacion, en caso de haber error en una actualizacion tambien mostrar
                         /* Si fue editado la Datos del Datos Personales */
                         if (respuesta.editado_dp) {
                            mensaje('fa-check-circle', '¡Datos Personales!', 'Los Datos Personales han sido actualizados correctamente.', 'success', 'right');
                        } else {
                            mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al editar los Datos Personales.', 'danger');
                        }

                         /* Si fue editado la Datos del Domicilio */
                         if (respuesta.editado_dd) {
                            mensaje('fa-check-circle', '¡Datos de Domicilio!', 'Los Datos de Domicilio han sido actualizados correctamente.', 'success', 'right');
                        } else {
                            mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al editar los Datos del Domicilio.', 'danger');
                        }

                         /* Si fue editado la Datos de Formacion Academica */
                         if (respuesta.editado_df) {
                            mensaje('fa-check-circle', '¡Datos de Formación Academica!', 'Los Datos de Formación Academica han sido actualizados correctamente.', 'success', 'right');
                        } else {
                            mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al editar los Datos Datos de Formación Academica.', 'danger');
                        }

                         /* Si fue editado la Datos de Adscripción Laboral */
                         if (respuesta.editado_da) {
                            mensaje('fa-check-circle', '¡Datos de Adscripción Laboral!', 'Los Datos de  Adscripción Laboral han sido actualizados correctamente.', 'success', 'right');
                        } else {
                            mensaje('fa-exclamation-triangle', '¡Error Inesperado!', 'Ha ocurrido un Error inesperado al editar los Datos de Adscripción Laboral.', 'danger');
                        }


                        /* Si fue agregado las Fotografias */
                         if (respuesta.editado_fpd) {
                            mensaje('fa-check-circle', '¡Fotografía Derecho!', 'La Fotografía del Perfil Derecho ha sido agregada correctamente.', 'success', 'right');
                        }

                        if (respuesta.editado_fpf) {
                            mensaje('fa-check-circle', '¡Fotografía Frente!', 'La Fotografía del Perfil Frente ha sido agregada correctamente.', 'success', 'right');
                        }

                        if (respuesta.editado_fpi) {
                            mensaje('fa-check-circle', '¡Fotografía Izquierda!', 'La Fotografía del Perfil Izquierda ha sido agregada correctamente.', 'success', 'right');
                        }

                        setTimeout(() => {
                            $("#modal-busquedas").modal('hide');
                            window.location.replace("personal.php");                       
                        }, 2000);                        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: '¡Acción NO Permitida!',
                            text: 'Acción NO Permitida, solo se Permite Agregar y Editar. Consulte con el Administrador del Sistema',
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