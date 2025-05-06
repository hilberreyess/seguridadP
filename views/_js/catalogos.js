function cat_areas(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_areas"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.areas);
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

function cat_biometrico(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_biometrico"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.biometricos);
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

function cat_categorias(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_categorias"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.categorias);
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

function cat_checador(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_checador"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.checadores);
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


function cat_corporacion(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_corporacion"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.corporaciones);
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

function cat_dependencia(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_dependencia"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.dependencias);
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


function cat_entidades(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_entidades"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.entidades);
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


function cat_estado_civil(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_estado_civil"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.estadosciviles);
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


function cat_genero(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_genero"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.generos);
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

function cat_horarios(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_horarios"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.horarios);
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


function cat_motivo_baja(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_motivo_baja"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.motivos);
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


function cat_municipios(seleccionado='00', xid_entidad, ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_municipios", "xid_entidad":xid_entidad},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.municipios);
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


function cat_nacionalidad(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_nacionalidad"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.nacionalidades);
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

function cat_nivel_estudios(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_nivel_estudios"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.nivelesestudios);
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

function cat_nivel_mando(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_nivel_mando"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.nivelesmando);
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

function cat_periodo(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_periodo"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.periodos);
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

function cat_plaza(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_plaza"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.plazas);
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

function cat_regiones(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_regiones"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.regiones);
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


function cat_secretario(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_secretario"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.secretarios);
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

function cat_estatus(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_estatus"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.estatus);
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

function cat_estatus_estudios(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_estatus_estudios"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.estatusestudios);
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


function cat_tipo_funciones(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_funciones"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.tiposfunciones);
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

function cat_tipo_referencia(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_referencia"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.tiposreferencias);
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

function cat_tipo_relacion(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_relacion"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.tiposrelaciones);
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


function cat_tipo_sangre(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_tipo_sangre"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.tipossangre);
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

function cat_usuarios_perfiles(seleccionado='00', ctrlSelect){
    $.ajax({
        url: 'models/ajax/ajax_get_catalogos.php',
        data: {"xCMD":"cat_usuarios_perfiles"},
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).selectpicker("refresh");
        },
        success: function(respuesta) {
          $("#"+ctrlSelect).empty();
          $("#"+ctrlSelect).html(respuesta.usuariosperfiles);
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


/**Catalogos Personalizados */
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