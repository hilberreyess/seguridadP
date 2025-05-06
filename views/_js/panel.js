jQuery(document).ready(function(){
    $("li.panel").addClass("active");
    var meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

    $(".panel-personal").click(function(){
        let a_href = $(".panel-personal").find('a').attr('href');
        window.location.replace(a_href);
    });

    $(".panel-empresas").click(function(){
        let a_href = $(".panel-empresas").find('a').attr('href');
        window.location.replace(a_href);
    });

    $(".panel-clientes").click(function(){
        let a_href = $(".panel-clientes").find('a').attr('href');
        window.location.replace(a_href);
    });

    $(".panel-armamento").click(function(){
        let a_href = $(".panel-armamento").find('a').attr('href');
        window.location.replace(a_href);
    });

    $(".panel-vehiculos").click(function(){
        let a_href = $(".panel-vehiculos").find('a').attr('href');
        window.location.replace(a_href);
    });

    $(".panel-radios").click(function(){
        let a_href = $(".panel-radios").find('a').attr('href');
        window.location.replace(a_href);
    });
    

    //Verificar si cambio su contraseña
    $.ajax({
        url: 'models/ajax/sistema_usuarios_cmd.php',
        data: {"xCMD":"DefaultPwd","uTokenCSRF":$("#Token_CSRF").val()},
        type: 'POST',
        async: true,
        dataType: 'JSON',
        beforeSend: function(){
            
        },
        success: function(respuesta) {
            if (respuesta.cambio == "NO") {
                setTimeout(() => {
                    $("#ModalSugerencia").modal({
                        backdrop: 'static',
                        keyboard: true,
                        keyboard: false
                    });
                }, 1500);

            }
        },
        error: function(jqXHR, status, error) {
            console.log(error);
        }
    }); //Fin de Ajax 



    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"Personal","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido) {
    //             if (parseInt(respuesta.personal.ACTIVOS) > 0) {
    //                 $(".totalActivos").html(Intl.NumberFormat('en-US').format(respuesta.personal.ACTIVOS));
    //                 //$(".totalBajas").html(Intl.NumberFormat('en-US').format(respuesta.personal.BAJAS));
    //             }
    //         }else{
    //             console.log("Error ");
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax 

    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"Vacaciones","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido) {
    //             if (parseInt(respuesta.vacaciones.TOTAL) > 0) {
    //                 $(".totalVacaciones").html(Intl.NumberFormat('en-US').format(respuesta.vacaciones.TOTAL));                    
    //             }
    //         }else{
    //             console.log("Error");
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax 

    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"Licencias","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido) {
    //             if (parseInt(respuesta.licencias.TOTAL) > 0) {
    //                 $(".totalLicencias").html(Intl.NumberFormat('en-US').format(respuesta.licencias.TOTAL));
    //             }
    //         }else{
    //             console.log("Error ");
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(jqXHR, status, error);
    //     }
    // }); //Fin de Ajax 

    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"Cumpleanios","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido && respuesta.cumpleanieros.length) {
    //             let cumpleanios = respuesta.cumpleanieros;
    //             let fecha_hoy = new Date();
    //             let mes = fecha_hoy.getMonth()+1;
    //             let dia = fecha_hoy.getDate();
    //             let fila = "";
                
    //             $("#tablaCumpleanios tbody").html('');
    //             cumpleanios.forEach(function(persona, index) {
    //                 //console.log("Persona " + index + " | Nombre: " + persona.nombre_completo + " Edad: " + persona.edad)
    //                 if (dia == persona.dia && mes== persona.mes-1) {
    //                     fila ='<tr class="warning"><td class="text-center">'+(index+1)+'</td><td>'+persona.nombre_completo+'</td><td class="text-center">'+ persona.dia+" DE "+meses[persona.mes-1]+' &nbsp;&nbsp; <i class="fa fa-birthday-cake fa-1x"></i> '+persona.edad+'</td></tr>';
    //                 }else{
    //                     fila ='<tr><td class="text-center">'+(index+1)+'</td><td>'+persona.nombre_completo+'</td><td class="text-center">'+ persona.dia+" DE "+meses[persona.mes-1]+' &nbsp;&nbsp; <i class="fa fa-birthday-cake fa-1x"></i> '+persona.edad+'</td></tr>';
    //                 }

    //                 $("#tablaCumpleanios tbody").append(fila);
    //               });
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax 

    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"Vacacionistas","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido && respuesta.vacacionistas.length) {
    //             let vacacionistas = respuesta.vacacionistas;
    //             let fecha_hoy = new Date();
    //             let mes = fecha_hoy.getMonth()+1;
    //             let dia = fecha_hoy.getDate();
    //             let fila = "";

    //             $("#tablaVacacionistas tbody").html('');
    //                 vacacionistas.forEach(function(vacacion, index) {
    //                     fila ='<tr>'
    //                             +'<td class="text-center">'+(index+1)+'</td>'
    //                             +'<td>'+vacacion.nombre_completo+'</td>'
    //                             +'<td class="text-center">'+vacacion.anio+'</td>'
    //                             +'<td class="text-center">'+vacacion.periodo+'</td>'
    //                             +'<td class="text-center">'+vacacion.fecha_inicio+'</td>'
    //                             +'<td class="text-center">'+vacacion.fecha_termina+'</td>'
    //                             +'<td>'+vacacion.se_presenta+'</td>'
    //                         +'</tr>';

    //                 $("#tablaVacacionistas tbody").append(fila);
    //               });
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax 

    // $.ajax({
    //     url: 'models/ajax/panel_cmd.php',
    //     data: {"xCMD":"PermisosLicencias","xToken":$("#Token_CSRF").val()},
    //     type: 'POST',
    //     async: true,
    //     dataType: 'JSON',
    //     beforeSend: function(){
            
    //     },
    //     success: function(respuesta) {
    //         if (respuesta.obtenido && respuesta.permisos.length) {
    //             let permisos = respuesta.permisos;
    //             let fecha_hoy = new Date();
    //             let mes = fecha_hoy.getMonth()+1;
    //             let dia = fecha_hoy.getDate();
    //             let fila = "";

    //             $("#tablaConLicencias tbody").html('');
    //                 permisos.forEach(function(permiso, index) {
    //                     fila ='<tr>'
    //                             +'<td class="text-center">'+(index+1)+'</td>'
    //                             +'<td>'+permiso.nombre_completo+'</td>'
    //                             +'<td class="text-center">'+permiso.fecha_inicia+'</td>'
    //                             +'<td class="text-center">'+permiso.fecha_fin+'</td>'
    //                             +'<td class="text-center">'+permiso.total_dias+'</td>'
    //                             +'<td>'+permiso.licencia_apartir_de+'</td>'
    //                         +'</tr>';

    //                 $("#tablaConLicencias tbody").append(fila);
    //               });
    //         }
    //     },
    //     error: function(jqXHR, status, error) {
    //         console.log(error);
    //     }
    // }); //Fin de Ajax
}); //cierra Jquery