jQuery(document).ready(function(){
 $("li.administracion").addClass("active");

 var tabla=$('#tblUsuarios').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.sistema-usuarios.php",
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
			{ "width": "20%", "targets": 1 },
			{ "width": "10%", "targets": 2 },
			{ "width": "10%", "targets": 3 },
            { "width": "20%", "targets": 4 },
			{ "width": "15%", "targets": 5 },
			{ "width": "10%", "targets": 6 },
			{ "width": "4%", "targets": 7 },
			{ "width": "4%", "targets": 8 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(5),td:eq(6),td:eq(7)', row).css({"text-align":"center"});
            $('td', row).css({"vertical-align":"middle"});

            if (data[7]==='SI') {
            	$('td:eq(6)', row).html('<li class="fa fa-ban fa-lg" title="Bloqueado para iniciar sesión"></li>').css({"font-weight":"bold"}).addClass("text-danger");
            }else{
            	$('td:eq(6)', row).html('<li class="fa fa-check-circle fa-lg" title="Permitido iniciar sistema">').css({"font-weight":"bold"}).addClass("text-success");
            }
        }
		});//Fin de Configuración del Datatables


    /***Funciones para los filtros de la tabla***/
    $('.search-input').on( 'keyup change', function () {
        var i =$(this).attr('id');
        var v =$(this).val();
       tabla.columns(i).search(v).draw();
    });

	$("#btnActualizar").click(function() {
        $('#tblUsuarios').DataTable().ajax.reload(null, false);
        /*Borramos el filtro de la tabla*/
        $('.search-input').val('');
        tabla.search('').columns().search('').draw();
    });



    $("#btnAgregar").click(function(){
        cat_usuarios_perfiles("00");
        cat_area_usuario("00");

        $("#modal-guardar-usuario").modal({
                                    show:true,
                                    backdrop: 'static',
                                    keyboard: false
                                });

        $(".titulo-modal").html("Agregar Nuevo Usuario");
        $("#hOperacion").val("Agregar");
        $("#hIdUsuario").val("");
        $("#selectbloqueado").selectpicker('val','NO');
        $("#selectperfil").selectpicker('val',0);

        $("#selectbloqueado").focus();

        // $("#DivAsignarPwd").hide();
        // $(".titulo-modal").html("Agregar Nuevo Usuario");
        // $("#txtpassword").attr('readonly', false);
        // $("#hOperacion").val('VDNCbFFXUmtWWE55');
    });


  $('#modal-guardar-usuario').on('shown.bs.modal', function () {
    if ($("#hOperacion").val() === "Editar") {
        $('#form-guardar-usuario').bootstrapValidator('enableFieldValidators', 'txtpassword', false,'notEmpty');
    }else{
        $('#form-guardar-usuario').bootstrapValidator('enableFieldValidators', 'txtpassword', true,'notEmpty');
    }
  });

/*Limpiamos todos los campos del formulario*/
  $('#modal-guardar-usuario').on('hidden.bs.modal', function () {
    $("#form-guardar-usuario").resetForm();
    $('#form-guardar-usuario').bootstrapValidator('resetForm', true);

    $("#chkChangePassword").hide();
  });

/*Aqui instrucciones para cuando el administrador quiera cambiar la contraseña del usuario*/
$("#chkChangePassword").change(function(){
    if ($(this).is(':checked')) {
        $("#txtpassword").removeAttr("readonly");
        $("#txtpassword").val("").focus();
        $('#form-guardar-usuario').bootstrapValidator('enableFieldValidators', 'txtpassword', true,'notEmpty');
    }else{
        $("#txtpassword").attr("readonly","readonly");
        $("#txtpassword").val("");
        $('#form-guardar-usuario').bootstrapValidator('enableFieldValidators', 'txtpassword', false,'notEmpty');
    }
});

$('#selectArea').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    let pid_area_usuario = $("#selectArea").val();

    cat_grupo_area("00",pid_area_usuario);       
});



$("#form-guardar-usuario").bootstrapValidator({
    // excluded: [':disabled'],
    button: {
        selector: '[type="submit"]',
    },
    message: 'Este valor es requerido',
    live: 'enabled',
    // feedbackIcons: {
    //     valid: 'glyphicon glyphicon-ok',
    //     invalid: 'glyphicon glyphicon-remove',
    //     validating: 'glyphicon glyphicon-refresh'
    // },
    fields: {
        selectbloqueado: {
            validators: {
                notEmpty: { message: 'Seleccione si el usuario puede iniciar sesión' }
            }
        },
        selectPerfil: {
            validators: {
                notEmpty: { message: 'Seleccione el Perfil' }
            }
        },
        selectArea: {
            validators: {
                notEmpty: { message: 'Seleccione el Área' }
            }
        },
        selectGrupoArea: {
            validators: {
                notEmpty: { message: 'Seleccione el Grupo' }
            }
        },
        txtNombreCompleto: {
            validators: {
                notEmpty: { message: 'El Nombre Completo es requerido' },
                stringLength: {
                    enabled: true,
                    min: 12,
                    max: 90,
                    message: 'Ingrese el nombre completo'
                }
            }
        },
        txtusuario: {
            validators: {
                notEmpty: { message: 'El nombre de usuario es requerido' },
                stringLength: {
                    enabled: true,
                    min: 5,
                    max: 20,
                    message: 'Ingrese 5 caracteres como minimo'
                }
            }
        },
        txtpassword: {
            validators: {
                notEmpty: { message: 'La contraseña del usuario es requerida' },
                stringLength: {
                    enabled: true,
                    min: 5,
                    max: 30,
                    message: 'Ingrese 5 caracteres como minimo'
                }
            }
        },
        txtcorreo: {
            validators: {
                notEmpty: { message: 'Ingrese un correo electronico' },
                emailAddress: {
                    message: 'El correo electronico no tiene un formato válido'
                }
            }
        },
        txttelefono: {
            validators: {
                notEmpty: { message: 'El número telefonico es requerido' },
                stringLength: {
                    enabled: true,
                    min: 10,
                    max: 10,
                    message: 'Ingrese los 10 digitos de su teléfono movil'
                },
                digits: {
                  message: 'El formato del número telefonico no es correcto'
                }
            }
        }
    }, //fin de Campos
    submitHandler: function (validator, form, submitButton) {
        var xtoken = $("#Token_CSRF").val();

        if ($("#hOperacion").val() ==="Agregar") {
            console.log("Intentando Agregar "+$("#hOperacion").val());
            $.ajax({
                url: 'models/ajax/sistema_usuarios_cmd.php',
                data: $("#form-guardar-usuario").serialize()+"&xCMD=Agregar&uTokenCSRF="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function(){
                    $("#btnGuardar,#btnGuardar2").attr("disabled", "disabled");
                    $(".loading").show();
                },
                success: function(respuesta) {
                    console.log(respuesta);
                    if (respuesta.agregado) {
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading').hide();
                        /*Mostramos Mensaje*/
                        mensaje('fa-check-circle', '¡Usuario Agregado!', 'El usuario ha sido agregado correctamente.', 'success');
                        /*Recargamos la Tabla para actualizar*/
                        $("#tblUsuarios").DataTable().ajax.reload(null, false);
                        /*Reiniciamos el Formulario*/
                        $("#form-guardar-usuario").resetForm();
                        $('#form-guardar-usuario').bootstrapValidator('resetForm', true);

                        /*Ocultamos la ventana Modal*/
                        $("#modal-guardar-usuario").modal('hide');

                        // GenerarReporte(DataString, NameReport);
                        $("html, body").animate({
                            scrollTop: 0
                        }, 600);
                    } else if(respuesta.agregado === false){
                        switch(respuesta.codigo){
                            case 'UserExist':
                                /*Mostramos Mensaje*/
                                mensaje('fa-exclamation-triangle', '¡El Usuario ya Existe!', 'El nombre de usuario que intenta agregar ya fue asignado a otro usuario. Intento con otro nombre de usuario.', 'danger');
                                $("#txtusuario").focus();
                                $('.loading').hide();
                            break;
                            case 'MailExist':
                                /*Mostramos Mensaje*/
                                mensaje('fa-exclamation-triangle', '¡El correo ya Existe!', 'El correo electronico que intenta agregar ya se encuentra registrado. Agregue el correo peronal del usuario.', 'danger');
                                $("#txtcorreo").focus();
                                $('.loading').hide();
                            break;
                            case 'Fail':
                                mensaje('fa-exclamation-triangle','¡Error Inesperado!.','Ha ocurrido un evento inesperado. No fue posible agregar la información del usuario.','danger');
                                $('.loading').hide();
                            break;
                        }
                    }
                },
                error: function(jqXHR, status, error){
                    console.log(jqXHR, status, error);
                    mensaje('fa-exclamation-triangle','¡Evento Inesperado!.','Ha ocurrido un evento inesperado. Lamentamos este inconveniente.','danger');
                    $("#btnGuardar,#btnGuardar2").attr("disabled", "disabled");
                    $('.loading').hide();
                }
           });//fin de Ajax

        }else if($("#hOperacion").val() === "Editar"){
            $.ajax({
                url: 'models/ajax/sistema_usuarios_cmd.php',
                data: $("#form-guardar-usuario").serialize()+"&xCMD=Editar&uTokenCSRF="+xtoken,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function(){
                    $("#btnGuardar,#btnGuardar2").attr("disabled", "disabled");
                    $(".loading").show();
                },
                success: function(respuesta) {                    
                    if (respuesta.editado) {
                        $('#btnGuardar,#btnGuardar2').removeAttr("disabled");
                        $('.loading').hide();
                        /*Mostramos Mensaje*/
                        mensaje('fa-check-circle', '¡Usuario Editado!', 'La información del usuario ha sido editada correctamente.', 'success');
                        /*Recargamos la Tabla para actualizar*/
                        $("#tblUsuarios").DataTable().ajax.reload(null, false);
                        /*Reiniciamos el Formulario*/
                        $("#form-guardar-usuario").resetForm();
                        $('#form-guardar-usuario').bootstrapValidator('resetForm', true);

                        /*Ocultamos la ventana Modal*/
                        $("#modal-guardar-usuario").modal('hide');

                        // GenerarReporte(DataString, NameReport);
                        $("html, body").animate({
                            scrollTop: 0
                        }, 600);
                    } else if(respuesta.editado === false){
                        switch(respuesta.codigo){
                            case 'UserExist':
                                /*Mostramos Mensaje*/
                                mensaje('fa-exclamation-triangle', '¡El Usuario ya Existe!', 'El nombre de usuario que intenta agregar ya fue asignado a otro usuario. Intento con otro nombre de usuario.', 'danger');
                                $("#txtusuario").focus();
                                $('.loading').hide();
                            break;
                            case 'MailExist':
                                /*Mostramos Mensaje*/
                                mensaje('fa-exclamation-triangle', '¡El correo ya Existe!', 'El correo electronico que intenta agregar ya se encuentra registrado. Agregue el correo peronal del usuario.', 'danger');
                                $("#txtcorreo").focus();
                                $('.loading').hide();
                            break;
                            case 'Fail':
                                mensaje('fa-exclamation-triangle','¡Error Inesperado!.','Ha ocurrido un evento inesperado. No fue posible agregar la información del usuario.','danger');
                                $('.loading').hide();
                            break;
                        }
                    }
                },
                error: function(jqXHR, status, error){
                    console.log(jqXHR, status, error);
                    mensaje('fa-exclamation-triangle','¡Evento Inesperado!.','Ha ocurrido un evento inesperado. Lamentamos este inconveniente.','danger');
                    $("#btnGuardar,#btnGuardar2").attr("disabled", "disabled");
                    $('.loading').hide();
                }
           });//fin de Ajax
        }

    }//fin de submitHandler
}); //fin de Validator


}); //cierra Jquery

function cat_almacenes(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_almacenes"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectAlmacen").empty();
          $("#selectAlmacen").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectAlmacen").empty();
          $("#selectAlmacen").html(respuesta.almacenes);
          $("#selectAlmacen").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectAlmacen").selectpicker('val',seleccionado);
            $("#selectAlmacen").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}

function cat_usuarios_perfiles(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_usuarios_perfiles"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectPerfil").empty();
          $("#selectPerfil").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectPerfil").empty();
          $("#selectPerfil").html(respuesta.usuariosperfiles);
          $("#selectPerfil").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectPerfil").selectpicker('val',seleccionado);
            $("#selectPerfil").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}

function cat_area_usuario(seleccionado='00'){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_area_usuario"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectArea").empty();
          $("#selectArea").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectArea").empty();
          $("#selectArea").html(respuesta.areasusuarios);
          $("#selectArea").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectArea").selectpicker('val',seleccionado);
            $("#selectArea").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}

function cat_grupo_area(seleccionado='00', pid_area_usuario){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_grupo_area", "xid_area_usuario":pid_area_usuario},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#selectGrupoArea").empty();
          $("#selectGrupoArea").selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#selectGrupoArea").empty();
          $("#selectGrupoArea").html(respuesta.grupoarea);
          $("#selectGrupoArea").selectpicker("refresh");

          if (seleccionado != '00') {
            $("#selectGrupoArea").selectpicker('val',seleccionado);
            $("#selectGrupoArea").selectpicker("refresh");
          }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax
}

function editar_usuario(id){
    var xtoken  = $("#Token_CSRF").val();
    $("#hOperacion").val("Editar");

    /*Obtener la informacion del Usuario*/
    $.ajax({
        url:'models/ajax/sistema_usuarios_cmd.php',
        data:{"xCMD":"Seleccionar","uTokenCSRF":xtoken,"xId":id},
        type:'POST',
        dataType:'JSON',
        beforeSend : function(){

        },
        success : function(respuesta) {
            if (respuesta.obtenido){
                /*Asignamos los valores a cada uno de los elementos del formulario*/
                var usr =  respuesta.info;
                $("#hIdUsuario").val(usr.id_usuario);
                $("#selectbloqueado").selectpicker('val',usr.bloqueado);
                cat_usuarios_perfiles(usr.id_usuario_perfil);
                $("#txtNombreCompleto").val(usr.usr_nombre_completo);
                cat_area_usuario(usr.id_area_usuario);

                setTimeout(() => {
                    cat_grupo_area(usr.id_grupo, usr.id_area_usuario);
                }, 1200);

                $("#htxtusuario").val(Base64.encode(Base64.encode(usr.usr_name)));
                $("#htxtcorreo").val(Base64.encode(Base64.encode(usr.usr_mail)));
                $("#txtusuario").val(usr.usr_name);
                $("#txtpassword").val('');
                $("#txtpassword").attr('readonly', true);
                $("#txtcorreo").val(usr.usr_mail);
                $("#txttelefono").val(usr.usr_telefono);

                $("#chkChangePassword").show();

                /*Mostramos la modal del usuario*/
                $("#modal-guardar-usuario").modal({
                    show:true,
                    backdrop: 'static',
                    keyboard: false
                });
                
                $(".titulo-modal").html("Editando el Usuario - [ "+usr.usr_name+" ]");
            }else{
                console.log("Ha ocurrido un eveneto inesperado"+status);
            }
        },
        error : function(jqXHR, status, error) {
            mensaje('fa-exclamation-triangle','Error!.','Ha ocurrido un evento inesperado','danger');
            console.log(error);
        }
    });//cierra ajax
}


