var $h = jQuery.noConflict();

$(document).ready(function () {

//alert(tratarValor(-5252.56) );
    window.onload = chamada2("0");

    $h('.datepicker').pickadate({
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione o mês',
        labelYearSelect: 'Selecione o ano',
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fechar',
        format: 'dd/mm/yyyy',
        closeOnSelect: true,
        closeOnClear: true
    });

    $("#btnFltros").click(function () {
        var seta = $('#btnFltros').children();
        seta.toggleClass('down');
        $('#btnFltros').toggleClass('btn-shadow');
        $('#headerProcessos').toggleClass('title-shadow');
        $('#formFiltros').slideToggle("slow");
    });


    $("#btnFiltrar").click(function () {
        var seta = $('#btnFltros').children();
        seta.toggleClass('down');
        $('#btnFltros').toggleClass('btn-shadow');
        $('#headerProcessos').toggleClass('title-shadow');
        $('#formFiltros').slideToggle("slow");
        
        $h(tablePedido).html('');
        $h(tabelatroca1).html('');
        chamada2($('#dataInicio').val());
    });

    $("#dataInicio").keypress(function (e) {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            $h(tablePedido).html('');
            $h(tabelatroca1).html('');
            chamada2($('#dataInicio').val());
        }
    });
});

function Chamada(id, urll, data_escolhida) {

    $.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urll,
        type: "GET",
        dataType: "json",
        // data : "param-no",
        success: function (html) {
            // var fat = $('.'+id);
            var fat1 = $('#' + id);
            var sql = "";
            //fat.append('<table class="table table-bordered table-hover table-striped"><thead><tr><th>CpfCnpj</th><th>Cliente</th><th>Valor Pedidos</th><th>Valor Trocas</th><th>Valor Total</th></tr></thead>');
            sql = sql + ('<table id="tablePedido" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>CPF/CNPJ</th><th>CLIENTE DOCUMENTO</th><th> PEDIDOS</th><th>TROCAS</th><th>TOTAL</th></tr></thead>');
            //console.log(urll);
            cont = 1;
            cont2 = 1;
            $.each(html, function (key, value) {
                //     console.log(value);
                if (cont > 1) {


                    sql = sql + ("<tr><td>" + cont2 + "</td><td>" + value.docto_cli + "</td><td>" + value.nome_cli.substring(0, 30) + "</td><td>" + tratarValor(value.valor_total_pedidos) + "</td><td>" + tratarValor(value.valor_total_trocas) + "</td><td>" + tratarValor(value.valor_total)+ "</td></tr></tbody>");
                    //fat.append("<tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr></tbody>");
                    cont = 1;
                    cont2++;
                } else {
                    sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + value.docto_cli + "</td><td>" + value.nome_cli.substring(0, 30) + "</td><td>" + tratarValor(value.valor_total_pedidos) + "</td><td>" + tratarValor(value.valor_total_trocas) + "</td><td>" +tratarValor(value.valor_total) + "</td></tr>");
                    //fat.append("<tbody><tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr>");
                    cont = 2;
                    cont2++;
                }

            });

            //	fat.append("</table>")	
            sql = sql + ("</table>");
            fat1.append(sql);
            chamada4(data_escolhida);
            //console.log(sql)
        }, error: function (e) {
            alert(e);
        }
    });


}
;

function ChamadaVend(id, urll) {

    $.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urll,
        type: "GET",
        dataType: "json",
        // data : "param-no",
        success: function (html) {
            // var fat = $('.'+id);
            var fat1 = $('#' + id);
            var sql = "";
            //fat.append('<table class="table table-bordered table-hover table-striped"><thead><tr><th>CpfCnpj</th><th>Cliente</th><th>Valor Pedidos</th><th>Valor Trocas</th><th>Valor Total</th></tr></thead>');
            sql = sql + ('<table id="tabelatroca1" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>VENDEDOR</th><th>PEDIDO</th><th> TROCA</th><th>TOTAL</th></tr></thead>');
            console.log(urll);
            cont = 1;
            cont2 = 1;
            $.each(html, function (key, value) {
                console.log(value);
                if (cont > 1) {


                    sql = sql + ("<tr><td>" + cont2 + "</td><td>" + value.nomven + "</td><td>" + tratarValor(value.valor_total_pedidos) + "</td><td>" + tratarValor(value.valor_total_trocas) + "</td><td>" + tratarValor(value.valor_total) + "</td></tr></tbody>");
                    //fat.append("<tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr></tbody>");
                    cont = 1;
                    cont2++;
                } else {
                    sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + value.nomven + "</td><td>" + tratarValor(value.valor_total_pedidos) + "</td><td>" + tratarValor(value.valor_total_trocas) + "</td><td>" + tratarValor(value.valor_total) + "</td></tr>");
                    //fat.append("<tbody><tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr>");
                    cont = 2;
                    cont2++;
                }

            });

            //	fat.append("</table>")	
            sql = sql + ("</table>");
            fat1.append(sql);

            //console.log(sql)
        }, error: function (e) {
            alert(e);
        }
    });


}
;

function chamada2(data_escolhida) {

    var data = "";
    console.log("data_escolhida:" + data_escolhida);
    if (data_escolhida === "0") {

        var dataa = new Date();
        var ano = dataa.getFullYear();
        var dia = dataa.getDate();
        var mes = dataa.getMonth() + 1;

        data = ano + '-' + mes + '-' + dia;

    } else {
        var dataini2 = data_escolhida;
        var datainiDia = dataini2.split('/')[0];
        var datainiMes = dataini2.split('/')[1];
        var datainiAno4 = dataini2.split('/')[2];
        dataini = datainiAno4 + "-" + datainiMes + "-" + datainiDia;

        data = dataini;
    }
    // var data = '2017-07-12';  
    console.log(retornoUrlPedidosCaixa() + 'pedidostroca.php?data=' + data);
    Chamada('tablePedido', retornoUrlPedidosCaixa() + 'pedidostroca.php?data=' + data, data);

}

function chamada4(data_escolhida) {

    /*var dataa = new Date();
     var ano = dataa.getFullYear();
     var dia = dataa.getDate();
     var mes = dataa.getMonth() + 1;
     
     
     
     var data = ano + '-' + mes + '-' + dia;*/
    //var data = '2017-07-12';  
    Chamada3('', retornoUrlPedidosCaixa() + 'pedidostrocaTotal.php?loja=8&data=' + data_escolhida);
    ChamadaVend('tabelatroca', retornoUrlPedidosCaixa() + 'pedidostrocaVendedorTotal.php?data=' + data_escolhida);

}
function Chamada3(id, urll) {

    $.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urll,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $('.'+id);
            //var fat1 = $('.'+id);
            var sql = "";

            document.getElementById("valor_total_pedidos").value = tratarValor(html[0].valor_total_pedidos);

            document.getElementById("valor_total_trocas").value = tratarValor(html[0].valor_total_trocas);
            document.getElementById("valor_total").value = tratarValor(html[0].valor_total);

        }, error: function (e) {
            alert(e);
        }
    });
}
;

