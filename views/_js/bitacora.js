jQuery(document).ready(function(){
    $("li.administracion").addClass("active");

	var tabla=$('#tblBitacora').DataTable({
        "processing": true,
        "serverSide": true,
        "responsive":true,
        "ajax": "models/ssp/ssp.sistema-bitacora.php",
        "language": {
            "url": "views/_js/Spanish.json"
        },
        "aaSorting": [[0, "desc"]],
        "columnDefs": [
            {
              "targets": 'no-sort',
              "orderable": false,
            },
            { "width": "8%", "targets": 0 },
            { "width": "8%", "targets": 1 },
            { "width": "8%", "targets": 2 },
            { "width": "8%", "targets": 3 },
            { "width": "8%", "targets": 4 },
            { "width": "40%", "targets": 5 },
            { "width": "10%", "targets": 6 }
        ],
        "rowCallback": function(row, data, index) {
            $('td:eq(0),td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(6),td:eq(7)', row).css({"text-align":"center"});
            $('td:eq(3)', row).css({"font-weight":"bold"});
        },

    });//Fin de Configuración del Datatables

    /***Funciones para los filtros de la tabla***/
    $('.search-input').on( 'keyup change', function () {
        var i =$(this).attr('id');
        var v =$(this).val();
       tabla.columns(i).search(v).draw();
    });

	$("#btnActualizar").click(function() {
        $('#tblBitacora').DataTable().ajax.reload(null, false);
        
        /*Borramos el filtro de la tabla*/
        $('.search-input').val('');
        tabla.search('').columns().search('').draw();
    });

}); //cierra Jquery