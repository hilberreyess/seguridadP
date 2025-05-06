jQuery(document).ready(function(){
var xtoken = $("#Token_CSRF").val();
$("li.usuario").addClass("active");

	$("#txtPasswordNow,#txtNewPassword,#txtConfirmNewPassword").val('');
	$("#txtPasswordNow").focus();

	$.ajax({
		url:'models/ajax/sistema_usuarios_cmd.php',
		data:{"xCMD":"Perfil","hOperacion":"Perfil","uTokenCSRF":xtoken},
		type:'POST',
		dataType:'JSON',
		beforeSend : function(){

		},
		success : function(respuesta) {
			if (respuesta.obtenido){
				var usr =  respuesta.info;
				$("span.nombre_completo").html(usr.usr_nombre_completo);
				$("span.perfil_usuario").html(usr.usuario_perfil);
				$("span.user_name").html(usr.usr_name);
				$("span.user_mail").html(usr.usr_mail);
				$("span.user_phone").html(usr.usr_telefono);				
			}else{
				console.log("Ha ocurrido un eveneto inesperado"+status);
			}
		},
		error : function(jqXHR, status, error) {
			console.log(error);
			mensaje('fa-exclamation-triangle','Error!.','Ha ocurrido un evento inesperado','danger');
		}
	});//cierra ajax



/*Funcion que permite mostrar la contraseña de un control tip password*/
$(".view-password1").on("click", function (){
	if($(".toggle-password1").hasClass("fa-key")){
	   $(".toggle-password1").removeClass("fa-key").addClass("fa-eye");
	   $("#txtPasswordNow").prop("type", "text");
	}else{
	   $(".toggle-password1").removeClass("fa-eye").addClass("fa-key");
	   $("#txtPasswordNow").prop("type", "password");
	}
});

$(".view-password2").on("click", function (){
	if($(".toggle-password2").hasClass("fa-key")){
	   $(".toggle-password2").removeClass("fa-key").addClass("fa-eye");
	   $("#txtNewPassword").prop("type", "text");
	}else{
	   $(".toggle-password2").removeClass("fa-eye").addClass("fa-key");
	   $("#txtNewPassword").prop("type", "password");
	}
});

$(".view-password3").on("click", function (){
	if($(".toggle-password3").hasClass("fa-key")){
	   $(".toggle-password3").removeClass("fa-key").addClass("fa-eye");
	   $("#txtConfirmNewPassword").prop("type", "text");
	}else{
	   $(".toggle-password3").removeClass("fa-eye").addClass("fa-key");
	   $("#txtConfirmNewPassword").prop("type", "password");
	}
});




$("#frm-cambiar-contrasenia").bootstrapValidator({
    // Only disabled elements are excluded
    // The invisible elements belonging to inactive tabs must be validated
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
        txtPasswordNow: {
            validators: {
                notEmpty: {
                    message: 'La contraseña Actual es Requerida'
                }
            }
        },
	    txtNewPassword: {
	            validators: {
	            	notEmpty: {
	                    message: 'La Nueva Contraseña es Requerida'
	                },
	                identical: {
	                    field: 'txtConfirmNewPassword',
	                    message: 'La Nueva Contraseña y la Confirmación de Contraseña no Coinciden'
	                }
	            }
	        },
        txtConfirmNewPassword: {
        	notEmpty: {
                    message: 'La confirmación de Nueva Contraseña es Requerida'
            },
            validators: {
            	notEmpty: {
                    message: 'La contraseña Actual es Requerida'
                },
                identical: {
                    field: 'txtNewPassword',
                    message: 'La Nueva Contraseña y la Confirmación de Contraseña no Coinciden'
                }
            }
        }
    }, //fin de Campos
    submitHandler: function (validator, form, submitButton) {
			$.ajax({
					url:'models/ajax/sistema_usuarios_cmd.php',
					data:{"xCMD":"CambiarPass","uTokenCSRF":xtoken,"txtPasswordNow":$("#txtPasswordNow").val(),"txtNewPassword":$("#txtNewPassword").val()},
					type:'POST',
					dataType:'JSON',
					beforeSend : function(){

					},
					success : function(respuesta) {
						if (respuesta.actualizado) {
							mensaje('fa-check-circle','Contraseña Actualizada','Su contraseña de inicio de sesión se ha cambiado con éxito.','success');

							$("#txtPasswordNow,#txtNewPassword,#txtConfirmNewPassword").val('');
							$("#txtPasswordNow").focus();

							//Aqui redireccionar
							setInterval(function(){
				            	window.location.replace("models/logout_system.php");
				            }, 1000);
						}else{
							switch(respuesta.codigo){
								case 'PasswordActualNoMatch':
									mensaje('fa-exclamation-triangle', '¡Ingrese otra Contraseña!', 'La <strong>la contraseña actual</strong> ingresada no es la correcta.', 'danger');
									$("#txtPasswordNow,#txtNewPassword,#txtConfirmNewPassword").val('');
									$("#txtPasswordNow").focus();
	                                $('.loading').hide();
								break;
								case 'PasswordNowEqual':
									mensaje('fa-exclamation-triangle','Atención','La <strong>la contraseña actual</strong> y la <strong>la nueva contraseña</strong> deben ser diferentes.','danger');
									$("#txtPasswordNow,#txtNewPassword,#txtConfirmNewPassword").val('');
									$("#txtPasswordNow").focus();
	                                $('.loading').hide();
								break;
							}
						}
					},
					error : function(jqXHR, status, error) {
						mensaje('fa-exclamation-triangle','Error!.','Ha ocurrido un evento inesperado','danger');
					}
			});//cierra ajax
  	}//fin de submitHandler
}); //fin de Validator


}); //cierra Jquery