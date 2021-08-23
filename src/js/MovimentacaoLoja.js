var $a = jQuery.noConflict();

$(document).ready(function () {

    $("button").click(function () {
        var dados = jQuery(this).serialize();

        //console.log("asdasd");
        var tipo = $("input[name='tipo2']:checked").val();
        var fornecedor = $('#fornecedor').val();
        var vendedor = $('#vendedor').val();
        var nomeClie = $('#nomeClie').val();
        var cpfClie = $('#cpfClie').val();


        if (tipo === undefined || tipo === null || tipo === '') {
            alert("Selecione, uma das opções!!!");
            return false;
        }
        //console.log(tipo);
        var dataini = $('#datepicker3').val();

        var datafim = $('#datepicker4').val();
        cont = 1;
        cont2 = 1;
        //console.log(dataini);
        //console.log(datafim);

        if (dataini === "") {
            alert("Data inicial é obrigatório");
            return false;
        }
        if (datafim === "") {
            alert("Data final é obrigatório");
            return false;
        }

        var dataini2 = dataini;
        var datainiDia = dataini2.split('/')[0];
        var datainiMes = dataini2.split('/')[1];
        var datainiAno4 = dataini2.split('/')[2];
        dataini = datainiAno4 + "-" + datainiMes + "-" + datainiDia;

        var datafim2 = datafim;
        var datafim2Dia = datafim2.split('/')[0];
        var datafim2Mes = datafim2.split('/')[1];
        var datafim2Ano4 = datafim2.split('/')[2];
        datafim = datafim2Ano4 + "-" + datafim2Mes + "-" + datafim2Dia;

        var dias = diferencaDias(dataini, datafim);
        console.log(dias);

        if (dias > 120) {
            alert("Selecione um periodo de até 4 meses.");
            return false;
        }


        if (fornecedor === '0' || fornecedor === null || fornecedor === '') {
            fornecedor = 0;
        }

        if (vendedor === '0' || vendedor === null || vendedor === '') {
            vendedor = 0;
        }

        if (nomeClie === '0' || nomeClie === null || nomeClie === '') {
            nomeClie = 0;
        }

        if (cpfClie === '0' || cpfClie === null || cpfClie === '') {
            cpfClie = 0;
        }

        var url = "";

        var tipoo = tipo;

        var fat2 = $('#table2');
        fat2.append("");

        if (tipo === '0') {

            url = retornoUrlMovimentacaoLoja() + 'entradas.php?dataini=' + dataini + '&datafim=' + datafim + '&cpf=' + cpfClie + '&fornecedor=' + fornecedor + '&codvendedor=' + vendedor + '&nomclie=' + nomeClie;

        } else if (tipo === '1') {
            //      window.open('http://192.168.0.31/pedidos.php?dataini='+dataini+'&datafim='+datafim+'&cpf='+cpfClie+'&fornecedor='+fornecedor+'&codvendedor='+vendedor+'&nomclie='+nomeClie);

            url = retornoUrlMovimentacaoLoja() + 'pedidos.php?dataini=' + dataini + '&datafim=' + datafim + '&cpf=' + cpfClie + '&fornecedor=' + fornecedor + '&codvendedor=' + vendedor + '&nomclie=' + nomeClie;

            // alert('http://192.168.0.31/pedidos.php?dataini='+dataini+'&datafim='+datafim+'&cpf='+cpfClie+'&fornecedor='+fornecedor+'&codvendedor='+vendedor+'&nomeClie='+nomeClie,tipo);

        } else if (tipo === '2') {
            url = retornoUrlMovimentacaoLoja() + 'trocas.php?dataini=' + dataini + '&datafim=' + datafim + '&cpf=' + cpfClie + '&fornecedor=' + fornecedor + '&codvendedor=' + vendedor + '&nomclie=' + nomeClie;
        } else if (tipo === '4') {

            url = retornoUrlMovimentacaoLoja() + 'dfabrica.php?dataini=' + dataini + '&datafim=' + datafim + '&cpf=' + cpfClie + '&fornecedor=' + fornecedor + '&codvendedor=' + vendedor + '&nomclie=' + nomeClie;
        } else if (tipo === '5') {

            url = retornoUrlMovimentacaoLoja() + 'cancelamentos.php?dataini=' + dataini + '&datafim=' + datafim;
        }
        
        $a('#loading').modal('open');
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            data: dados,
            dataType: "json",
            success: function (data)
            {
                console.log(data);

                data = data.data;

                var fat1 = $('#table1');
                var sql = "";
                cont = 1;
                cont2 = 1;

                if (tipoo === '4') {

                    sql = sql + ('<table class="table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr class="success"><th></th><th>DOCUMENTO</th><th>DESTINO</th><th>ITENS</th><th>DESCONTO</th><th>TOTAL</th><th>TIPO</th><th>VENDEDOR</th><th>DATA</th><th>HORA</th></tr></thead>');

                    $.each(data, function (key, values) {

                        if (cont > 1) {

                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a><td>" + (values.destino).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + values.totaldesc + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + values.tipo + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr></tbody>");

                            cont = 1;
                            cont2++;

                        } else {
                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a><td>" + (values.destino).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + values.totaldesc + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + values.tipo + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr>");

                            cont = 2;
                            cont2++;
                        }
                    });
                }
                if (tipoo === '0') {

                    sql = sql + ('<table class="table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr class="success"><th></th><th>DOCUMENTO</th><th>VENDEDOR</th><th>ITENS</th><th>TOTAL</th><th>DATA</th><th>HORA</th></tr></thead>');
                    $.each(data, function (key, values) {

                        if (cont > 1) {

                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr></tbody>");

                            cont = 1;
                            cont2++;
                        } else {
                            sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr>");

                            cont = 2;
                            cont2++;
                        }
                    });

                } else if (tipoo === '1') {

                    sql = sql + ('<table class="table table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr class="success"><th></th><th>DOC</th><th>CPF/CNPJ</th><th>NOME CLIENTE</th><th>ITENS</th><th>DESC</th><th>ACRÉSC</th><th>TOTAL</th><th>VENDEDOR</th><th>DATA</th><th>HORA</th></tr></thead>');

                    $.each(data, function (key, values) {

                        if (cont > 1) {

                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + values.doctoclie + "</td><td>" + ((values.nomeclie).substring(0, 15)).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totaldesc) + "</td><td>" + tratarValor(values.totalacre) + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr></tbody>");

                            cont = 1;
                            cont2++;
                        } else {
                            sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + values.doctoclie + "</td><td>" + ((values.nomeclie).substring(0, 15)).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totaldesc) + "</td><td>" + tratarValor(values.totalacre) + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr>");

                            cont = 2;
                            cont2++;
                        }

                    });

                } else if (tipoo === '2') {
                    sql = sql + ('<table class="table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr class="success"><th></th><th>DOC</th><th>CPF/CNPJ</th><th>NOME CLIENTE</th><th>ITENS</th><th>DESC</th><th>ACRÉSC</th><th>TOTAL</th><th>VENDEDOR</th><th>DATA</th><th>HORA</th></tr></thead>');

                    $.each(data, function (key, values) {

                        if (cont > 1) {

                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + values.doctoclie + "</td><td>" + ((values.nomeclie).substring(0, 15)).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totaldesc) + "</td><td>" + tratarValor(values.totalacre) + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr></tbody>");

                            cont = 1;
                            cont2++;
                        } else {
                            sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td><a href='#' onclick=chamadasFilas(" + tipoo + "," + values.documento + ")>" + values.documento + "</a></td><td>" + values.doctoclie + "</td><td>" + ((values.nomeclie).substring(0, 15)).toUpperCase() + "</td><td>" + values.totalitens + "</td><td>" + tratarValor(values.totaldesc) + "</td><td>" + tratarValor(values.totalacre) + "</td><td>" + tratarValor(values.totalgeral) + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr>");

                            cont = 2;
                            cont2++;

                        }
                    });
                } else if (tipoo === '5') {

                    sql = sql + ('<table class="table table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr class="success"><th></th><th>DOCUMENTO</th><th>TIPO</th><th>VENDEDOR</th><th>DATA</th><th>HORA</th></tr></thead>');

                    $.each(data, function (key, values) {

                        if (cont > 1) {

                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#'>" + values.documento + "</a><td>" + values.tipo + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr></tbody>");

                            cont = 1;
                            cont2++;

                        } else {
                            sql = sql + ("<tr><td>" + cont2 + "</td><td><a href='#'>" + values.documento + "</a><td>" + values.tipo + "</td><td>" + (values.nome).toUpperCase() + "</td><td>" + values.data + "</td><td>" + values.hora + "</td></tr>");

                            cont = 2;
                            cont2++;
                        }
                    });
                }

                sql = sql + ("</table>");
                fat1.empty();
                var fat1 = $('#table1');

                fat1.append(sql);
                //chamada4();
                //console.log(sql);
                $a('#loading').modal('close');
            }
        });
        //$a('#loading').modal('close');
        return false;
    });
});


function esconderFiltros (){
    $('.filtros').addClass('hide');

}


function liberarFiltros (){
    $('.filtros').removeClass('hide');
}

function diferencaDias(data1, data2) {
    data1 = new Date(data1);
    data2 = new Date(data2);
    var dif = Date.UTC(data1.getYear(), data1.getMonth(), data1.getDate(), 0, 0, 0) - Date.UTC(data2.getYear(), data2.getMonth(), data2.getDate(), 0, 0, 0);
    return Math.abs((dif / 1000 / 60 / 60 / 24));
}

function chamadasFilas(tipoo, documento) {
    var dados = jQuery(this).serialize();

    var tipo = tipoo;
    var $j = jQuery.noConflict();
    $j('#modalMovimentacao').modal('open');
    
    $('#modalTitleMovLoj').html("Itens do Pedido " + documento);
    var url = "";

    if (tipoo === 0) {

        url = retornoUrlMovimentacaoLoja() + 'ientradas.php?documento=' + documento;

    } else if (tipoo === 1) {
        //      window.open('http://192.168.0.31/pedidos.php?dataini='+dataini+'&datafim='+datafim+'&cpf='+cpfClie+'&fornecedor='+fornecedor+'&codvendedor='+vendedor+'&nomclie='+nomeClie);

        url = retornoUrlMovimentacaoLoja() + 'ipedidos.php?documento=' + documento;

        // alert('http://192.168.0.31/pedidos.php?dataini='+dataini+'&datafim='+datafim+'&cpf='+cpfClie+'&fornecedor='+fornecedor+'&codvendedor='+vendedor+'&nomeClie='+nomeClie,tipo);

    } else if (tipoo === 2) {

        url = retornoUrlMovimentacaoLoja() + 'itrocas.php?documento=' + documento;

    } else if (tipoo === 4) {

        url = retornoUrlMovimentacaoLoja() + 'idfabrica.php?documento=' + documento;

    }

    console.log(url);
    $a('#loading').modal('open');
    $.ajax({
        type: "GET",
        url: url,
        data: dados,
        dataType: "json",
        success: function (data)
        {
            //console.log(data);
            data = data.data;
            //console.log(data);
            var fat1 = $('#table2');
            var sql = "";
            cont = 1;
            cont2 = 1;

            if (tipoo === 4) {

                sql = sql + ('<table class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>FORNECEDORES</th><th>PRODUTO</th><th>DESC.BÁSICA</th><th>QTDE</th><th>PREÇO</th><th>DESCONTO</th><th>VENDA</th><th>TOTAL</th><th>HORA</th></tr></thead>');

                $.each(data, function (key, values) {

                    //console.log("Leite");
                    if (cont > 1) {

                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;

                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

            }
            if (tipoo === 0) {
                sql = sql + ('<table class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>FORNECEDORES</th><th>PRODUTO</th><th>DESC.BÁSICA</th><th>QTDE</th><th>PREÇO</th><th>DESCONTO</th><th>VENDA</th><th>TOTAL</th><th>HORA</th></tr></thead>');
                $.each(data, function (key, values) {

                    if (cont > 1) {

                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

            } else if (tipoo === 1) {
                sql = sql + ('<table class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>FORNECEDORES</th><th>PRODUTO</th><th>DESC.BÁSICA</th><th>QTDE</th><th>PREÇO</th><th>DESCONTO</th><th>ACRÉSCIMO</th><th>VENDA</th><th>TOTAL</th><th>HORA</th></tr></thead>');

                $.each(data, function (key, values) {

                    if (cont > 1) {

                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.acrescimo) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.acrescimo) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

            } else if (tipoo === 2) {
                sql = sql + ('<table class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>FORNECEDORES</th><th>PRODUTO</th><th>DESC.BÁSICA</th><th>QTDE</th><th>PREÇO</th><th>DESCONTO</th><th>ACRÉSCIMO</th><th>VENDA</th><th>TOTAL</th><th>HORA</th></tr></thead>');

                $.each(data, function (key, values) {

                    if (cont > 1) {

                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.acrescimo) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigofab + "</td><td>" + values.codigopro + "</td><td>" + values.codigobas + "</td><td>" + values.qtde + "</td><td>" + tratarValor(values.prcbasico) + "</td><td>" + tratarValor(values.desconto) + "</td><td>" + tratarValor(values.acrescimo) + "</td><td>" + tratarValor(values.prcvenda) + "</td><td>" + tratarValor(values.total) + "</td><td>" + values.hora + "</td></tr>");

                        cont = 2;
                        cont2++;

                    }
                });

            }

            sql = sql + ("</table>");
            fat1.empty();
            fat1.append(sql);
            $a('#loading').modal('close');
            //console.log(sql);
        }
    });


}