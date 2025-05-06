jQuery(document).ready(function() {
    $('#confirm-exit').on('show.bs.modal', function(e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });

    /*Con esto hacemos que todos los Dialogos Modales puedan ser arrastrados*/
    $('.modal-dialog.draggable').draggable();

    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();
    if (path == '') {
        path = 'index.php';
    }
    $('.nav > li > a[href="' + path + '"]').parent().addClass('active');

    /*Cuando una caja de texto contenga la clase mayusculas se convertira en Mayusculas*/
    $(".mayusculas").blur(function(){
        $(this).val($(this).val().toUpperCase());
    });

    jQuery.fn.resetForm = function() {
        $(this).each(function() {
            this.reset();
        });
    }

    
    // //Verificamos si hay alguna notificacion pendiente cada 30 segundos
    // var ActualizarCada = 10;//Segundos
    // //Actualizar 30 segundos
    // setInterval(function(){
    //     console.log("Aqui verificando la Cockie cada 1 minuto ...");
    //     // Getting the kittens cookie:
       

    // }, ActualizarCada*1000);



    /*Asigna Fecha y Hora en el Footer*/
    // $(".fecha").html(new Date().toLocaleDateString());
    // $(".hora").html(new Date().toLocaleTimeString());
    // $.repeat(1000, function(){ $(".hora").html(new Date().toLocaleTimeString()); });

}); /*Fin de JQuery*/



function mensaje(icono = 'fa-info-circle', titulo = 'Titulo', mensaje = 'Mensaje', color = 'info', xalign='center') {
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
            align: xalign
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

function str_aleatoria(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}