jQuery(document).ready(function(){
    $("#U5ED18E48").val = "";
    $("#U5ED18E48").focus();    
    $("#C70625151").val = "";

    $("#U5ED18E48").blur(function() {
    	var texto=$(this).val();
    	$(this).val(texto.replace(/[\+\-\*\=\?\>\<\'\|\s]/g, ''));
    });

    $("#C70625151").blur(function() {
    	var texto=$(this).val();
    	$(this).val(texto.replace(/[\+\-\*\=\?\>\<\'\|\s]/g, ''));
    });

	$(".mayusculas").blur(function(){
        $(this).val($(this).val().toUpperCase());
    });

    $(document).on('click', 'form button[type=submit]', function(e) {
		if ($("#U5ED18E48").val() === '' || $("#C70625151").val() === '' || $("#txtCaptcha").val() === '') {
			/*Agregamos la animación*/
			$("div.login-box").addClass("shake-horizontal");

			/*Asignamos efecto de Vibración en los navegadores que lo soportan*/
			var PuedeVibrar = "vibrate" in navigator;
				if(PuedeVibrar){
			 		navigator.vibrate(300);
				}

			var t = setInterval(function(){
	            	$("div.login-box").removeClass("shake-horizontal");
	            	clearInterval(t);
    			}, 300);

			mensaje('fa-warning','¡Error!','Debe ingresar el <strong>Usuario</strong>, la <strong>Contraseña</strong> y el <strong>Código.</strong>','danger');

			$("#U5ED18E48").focus();  
		}
	});


	$("#reloadCaptcha").on("click", function (){
		// img = document.getElementById("imgCaptcha");
		// img.src="models/captcha.php?id=" + Math.random();
		$("#imgCaptcha").attr("src", "./models/captcha.php");
	});

	$(".view-password").on("click", function (){
		if($(".toggle-password").hasClass("fa-key")){
		   $(".toggle-password").removeClass("fa-key").addClass("fa-eye");
		   $("#C70625151").prop("type", "text");
		}else{
		   $(".toggle-password").removeClass("fa-eye").addClass("fa-key");
		   $("#C70625151").prop("type", "password");
		}
	});


$("#F2937274F80E2F56").bootstrapValidator({
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
        U5ED18E48: {
            validators: {
                notEmpty: {
                    message: 'El Nombre de Usuario es requerido'
                }
            }
        },
        C70625151: {
            validators: {
                notEmpty: {
                    message: 'La Contraseña de Usuario es requerida'
                }
            }
        },
		txtCaptcha: {
            validators: {
                notEmpty: {
                    message: 'El Código es requerido'
                }
            }
        }
    }, //fin de Campos
    submitHandler: function (validator, form, submitButton) {
		$.ajax({
			url: 'models/validar_usuario.php',
			data: $("#F2937274F80E2F56").serialize(),
			type: 'POST',
			dataType: 'JSON',
			beforeSend: function(){
				$("#btnLoging").attr("disabled", "disabled");
				$(".loading").show();
			},
			success: function(respuesta) {
				if (respuesta.acceso) {
					if (respuesta.codigo === '0A7AB51C74') {
							mensaje('fa-check-circle','¡Acceso Correcto!','Acceso Autorizado','success');
							$("#btnLoging").removeAttr("disabled");					            
							$(".loading").hide();
							$('#U5ED18E48').val('');
							$('#C70625151').val('');

							/*Redirecciona al inicio de session*/
							setTimeout(() => {
								window.location.replace("panel.php");
							}, 1000);
					}
				} else {
					switch (respuesta.codigo){
						case '0000000000':
						case 'NoCaptcha':
						case 'CE1F1E2618':
						case '48041FDC64':
								mensaje('fa-warning','¡Error!','Verifique que el <strong>Usuario</strong>, la <strong>Contraseña</strong> y el <strong>Código de Seguridad</strong> sean correctos','danger');
								$("#btnLoging").removeAttr("disabled");
								$(".loading").hide();
								$('#U5ED18E48').val('');
								$('#C70625151').val('');
								$('#U5ED18E48').focus();

								$("div.login-box").addClass("shake-horizontal");
								var t = setInterval(function(){
									$("div.login-box").removeClass("shake-horizontal");
									clearInterval(t);
								}, 300);
								$("#imgCaptcha").attr("src", "models/captcha.php?id=" + Math.random());
								$('#F2937274F80E2F56').bootstrapValidator('resetForm', true);
							break;	        		
						case '1F9B805784':
								mensaje('fa-warning','Usuario Bloqueado','Por razones de seguridad la cuenta ha sido <strong>Bloqueada</strong>. <br><small><strong>¡Contacte al Administrador del Sistema!</strong></smal>','danger');
								$("#btnLoging").removeAttr("disabled");
								$(".loading").hide();
								$('#U5ED18E48').val('');
								$('#C70625151').val('');
								$('#U5ED18E48').focus();

								$("div.login-box").addClass("shake-horizontal");
								var t = setInterval(function(){
									$("div.login-box").removeClass("shake-horizontal");
									clearInterval(t);
								}, 300);
								$("#imgCaptcha").attr("src", "models/captcha.php?id=" + Math.random());
								$('#F2937274F80E2F56').bootstrapValidator('resetForm', true);
							break;
					}
				}							
			},
			error: function(jqXHR, status, error){
				console.log(jqXHR, status, error);
				mensaje('fa-exclamation-triangle','Acceso no autorizado.','Ha ocurrido un evento inesperado','danger');
				$("#btnLoging").removeAttr("disabled");          
				$(".loading").hide();	            
				$('#U5ED18E48').val('');
				$('#C70625151').val('');
				$('#U5ED18E48').focus();
			}
		});//fin de Ajax 
  	}//fin de submitHandler
}); //fin de Validator


}); //cierra Jquery




function mensaje(icono = 'fa-info-circle', titulo = 'Titulo', mensaje = 'Mensaje', color = 'info') {
    $.notify({
        icon: 'fa ' + icono + ' fa-lg',
        title: '&nbsp; <span style="font-size:16px;font-weight:bold;margin-bottom:16px;">' + titulo + '</span><br>',
        message: '<span style="font-size:16px;">' + mensaje + '</strong>'
    }, {
        delay: 1500,
        element: 'body',
        position: null,
        type: color,
        z_index: 9000,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center"
        },
        animate: {
            enter: 'animated zoomInDown',
            exit: 'animated zoomOutUp'
        }
    });
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cero_pad(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}


function reloadCaptcha(){
	console.log("Recargar Captcha ..");

	var dataString = 'index=1';
	var url = "models/captcha.php"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		html = this.responseText;
		if (html!=1){
			document.getElementById('divcaptcha').innerHTML = html;
		}
		}
	};
	xhttp.open("POST", url, true);
	xhttp.send();

}