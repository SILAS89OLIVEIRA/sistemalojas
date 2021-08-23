


$(document).ready(function () {
    filtrarEstoque();


    var urlbrinde = urlJava() + "erprevistas/buscaUltimasRevistas/12";
    console.log(urlbrinde);
    $.get(urlbrinde, function (dataReturn12) {
        $('#revistaNum').html(comboxultimasrevistas("revistaNum", dataReturn12, "revNumRev", "revNom"));  //coloco na div o retorno da requisica 
    });


    $("#btnFltros").click(function () {
        var seta = $('#btnFltros').children();
        seta.toggleClass('down');
        $('#btnFltros').toggleClass('btn-shadow');
        $('#headerProcessos').toggleClass('title-shadow');
        $('#formFiltros').slideToggle("slow");
    });

    $("#for").keypress(function (e) {
        console.log(e.keyCode);

        if (e.keyCode === 13) {
            filtrarEstoque();
        }

    });
    $("#pag").keypress(function (e) {
        console.log(e.keyCode);

        if (e.keyCode === 13) {
            filtrarEstoque();
        }
    });
    $("#item").keypress(function (e) {
        console.log(e.keyCode);

        if (e.keyCode === 13) {
            filtrarEstoque();
        }
    });
    $("#festqor").keypress(function (e) {
        console.log(e.keyCode);

        if (e.keyCode === 13) {
            filtrarEstoque();
        }
    });
});

function filtrarEstoque() {

    var $j = jQuery.noConflict();

    var dados = jQuery(this).serialize();
    console.log("teste");
    var cod_fornecedor = $('#for').val();
    var rev_numpag = $('#pag').val();
    var item = $('#item').val();
    var menor_igual_estq = $('#estq').val();
    var revistaNum = $('#revistaNum').val();
    var referencia = $('#referencia').val();

    $("#for").html(cod_fornecedor);
    $("#pag").html(rev_numpag);
    $("#item").html(item);
    $("#estq").html(menor_igual_estq);
    $("#referencia").html(referencia);
    //$("#revistaNum").html(revistaNum);

    if (cod_fornecedor === '0' || cod_fornecedor === null || cod_fornecedor === '') {
        cod_fornecedor = 0;
    }

    if (rev_numpag === '0' || rev_numpag === null || rev_numpag === '') {

        rev_numpag = 0;
    }

    if (item === '0' || item === null || item === '') {

        item = 0;
    }

    if (menor_igual_estq === '0' || menor_igual_estq === null || menor_igual_estq === '') {

        menor_igual_estq = 10000;

    }

    if (revistaNum === '0' || revistaNum === null || revistaNum === '' || revistaNum === 'PA') {

        revistaNum = 0;
    }
    
    if (referencia === '0' || referencia === null || referencia === '' || referencia === 'PA') {

        referencia = 0;
    }


    var url = "retornoUrlEstoqueLoja()+'erpviewEstoqueLoja/buscaProdutos/'+retornoLoja()+'/'+cod_fornecedor+'/'+item+'/'+menor_igual_estq+'/'+rev_numpag+'/0/50'";

    //console.log(url);

    var totalEstoqueFiltro = 0;
    var totalValEstoqueFiltro = 0.00;

    var url = retornoUrlEstoqueLoja() + 'erpviewEstoqueLoja/buscaProdutos/' + retornoLoja() + '/' + cod_fornecedor + '/' + item + '/' + menor_igual_estq + '/' + rev_numpag + '/0/' + revistaNum + '/' + referencia;;
    //var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/'+ 'erpviewEstoqueLoja/buscaProdutos/' + retornoLoja() + '/' + cod_fornecedor + '/' + item + '/' + menor_igual_estq + '/' + rev_numpag + '/0/' + revistaNum;
    console.log(url);

    $.ajax({
        type: "GET",
        url: url,
        data: dados,
        dataType: "json",
        success: function (data)
        {
            //	console.log(data);

            if (data.success === 'False' || data.success === false) {

                var fat1 = $('#tabelaid');
                fat1.empty();
                fat1.append('');
                alert("A pesquisa não retornou nenhum registro!", 3000, 'red');
                return false;
            }
            var totalpagina;

            // função para de sucesso
            //console.log(data);

            var pagina = (data.total / 25);
            pagina = parseInt(pagina);
            console.log(pagina);

            // função para de sucesso
            if (pagina > 6) {
                console.log("Pagina Leite" + pagina);
                pagina = 7;
                totalpagina = (data.total / 25);

            } else if (pagina > 0 && pagina < 7) {

                pagina = (data.total / 25);
                totalpagina = pagina;

            } else if (pagina === 0) {

                console.log("Pagina 2 " + pagina);
                totalpagina = 1;
                pagina = 1;

            }
            $(".menu").html('<ul id="pagination-demo" class="pagination-sm"></ul>');

            $j('#pagination-demo').twbsPagination({
                totalPages: totalpagina,
                visiblePages: pagina,
                onPageClick: function (event, page) {

                    $('#page-content').text('Page ' + page);


                    var url = urlJava() + 'erpviewEstoqueLoja/buscaProdutos/' + retornoLoja() + '/' + cod_fornecedor + '/' + item + '/' + menor_igual_estq + '/' + rev_numpag + '/' + page + '/' + revistaNum + '/' + referencia;
                    console.log(url);
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: dados,
                        dataType: "json",
                        success: function (data)
                        {



                            if (data.success === 'False' || data.success === false) {

                                var fat1 = $('#tabelaid');
                                fat1.empty();
                                fat1.append('');
                                Materialize.toast("A pesquisa não retornou nenhum registro!", 3000, 'red');
                                return false;
                            }

                            var pagina = (data.total / 25);

                            pagina = parseInt(pagina);
                            console.log(pagina);
                            // função para de sucesso
                            if (pagina > 6) {
                                console.log("Pagina Leite" + pagina);
                                pagina = 7;
                                totalpagina = (data.total / 25);

                            } else if (pagina > 0 && pagina < 7) {

                                pagina = (data.total / 25);
                                totalpagina = pagina;

                            } else if (pagina === 0) {


                                totalpagina = 1;
                                pagina = 1;
                                console.log("Pagina 2 " + pagina);

                            }
                            //$("#menu").html('GABRIEL LEITE');



                            data = data.data;
                            var fat1 = $('#tabelaid');
                            var sql = "";
                            if (page > 1) {
                                cont = ((page - 1) * 25) + 1;
                                cont2 = ((page - 1) * 25) + 1;
                            } else {
                                cont = 1;
                                cont2 = 1;
                                var data2 = "";
                                var hora2 = "01:00";

                            }
                            var totalEstoque = 0;
                            var totalVenda = 0;

                            //data = data.data;
                            sql = sql + ('<table class="table bordered highlight input-sm striped"><thead class=\"bg-primary darken-1 text-white\"><tr><th></th><th>FORNECEDOR</th><th>PRODUTO</th><th>REF.</th><th>TAMANHO</th><th>PÁG.</th><th>ESTQ.LOJA</th><th>PREÇO</th><th>QTD.LOGÍSTICA</th></tr></thead>');

                            $.each(data, function (key, values) {

                                //console.log(data);

                                data2 = values.est_datinc;

                                hora2 = values.hora;


                                var data3 = data2;
                                var dataDia = data3.split('-')[2];
                                var dataMes = data3.split('-')[1];
                                var dataAno4 = data3.split('-')[0];
                                data2 = dataDia + "/" + dataMes + "/" + dataAno4;

                                if (cont > 1) {

                                    cont = 1;
                                    cont2++;
                                    totalEstoqueFiltro = totalEstoqueFiltro + values.qtd_estoque_loja;
                                    totalValEstoqueFiltro = totalValEstoqueFiltro + values.preco_venda * values.qtd_estoque_loja;

                                    estoqueLogistica = values.qtd_estoque_logistica;
                                    if (estoqueLogistica === null) {
                                        estoqueLogistica = 0;
                                    }
                                    
                                    produtosskucliente = values.produtos_sku_cliente;
                                    if (produtosskucliente === null) {
                                        produtosskucliente = '-';
                                    }

                                    sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigo_fornecedor + "-" + values.nome_fornecedor + "</td><td>" + values.item + "-" + values.produtos_descricao + "</td><td>" + produtosskucliente + "</td><td>" + values.tam_nom + "</td><td>" + values.pagina + "</td><td>" + values.qtd_estoque_loja + "</td><td>" + tratarValor(values.preco_venda) + "</td><td>" + estoqueLogistica + "</td></tr></tbody>");

                                    cont = 1;
                                    cont2++;
                                } else {
                                    totalEstoqueFiltro = totalEstoqueFiltro + values.qtd_estoque_loja;
                                    totalValEstoqueFiltro = totalValEstoqueFiltro + values.preco_venda * values.qtd_estoque_loja;

                                    estoqueLogistica = values.qtd_estoque_logistica;
                                    if (estoqueLogistica === null) { 
                                        estoqueLogistica = 0;
                                    }
                                    
                                    produtosskucliente = values.produtos_sku_cliente;
                                    if (produtosskucliente === null) {
                                        produtosskucliente = '-';
                                    }

                                    sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigo_fornecedor + "-" + values.nome_fornecedor + "</td><td>" + values.item + "-" + values.produtos_descricao + "</td><td>" + produtosskucliente + "</td><td>" + values.tam_nom + "</td><td>" + values.pagina + "</td><td>" + values.qtd_estoque_loja + "</td><td>" + tratarValor(values.preco_venda) + "</td><td>" + estoqueLogistica + "</td></tr>");

                                    cont = 2;
                                    cont2++;
                                }

                            });
                            console.log(totalEstoqueFiltro);
                            console.log(totalValEstoqueFiltro);
                            var url = urlJava() + 'erpviewEstoqueLoja/buscaProdutos/' + retornoLoja() + '/' + cod_fornecedor + '/' + item + '/' + menor_igual_estq + '/' + rev_numpag + '/0/' + revistaNum + '/' + referencia;;
                            console.log(url);
                            $.ajax({
                                type: "GET",
                                url: url,
                                data: dados,
                                dataType: "json",
                                success: function (data)
                                {

                                    totalEstoqueFiltro = 0;
                                    totalValEstoqueFiltro = 0.00;
                                    console.log(data);
                                    $.each(data.data, function (key, values) {
                                        totalEstoqueFiltro = totalEstoqueFiltro + values.qtd_estoque_loja;
                                        totalValEstoqueFiltro = totalValEstoqueFiltro + (values.preco_venda * values.qtd_estoque_loja);

                                    });
                                    console.log(totalEstoqueFiltro);
                                    console.log(totalValEstoqueFiltro);
                                    sql = sql + ("</table>");
                                    fat1.empty();

                                    fat1.append(sql);
                                    //chamada4();
                                    $("#data").html("DATA:  " + data2);
                                    $("#hora").html("HORA:  " + hora2);
                                    document.getElementById("totalestq").value = totalEstoqueFiltro;
                                    document.getElementById("totalvenda").value = tratarValor(totalValEstoqueFiltro);
                                    console.log(data2);
                                    console.log(hora2)
                                    document.getElementById("data").value = data2;
                                    document.getElementById("hora").value = hora2;

                                }
                            });



                            //	fat.append("</table>")	

                            //     document.getElementById("data").value = data2;
                            //    document.getElementById("hora").value = hora2;
                            //console.log(sql);
                            //$k('#loading').modal('close');
                        }
                    });
                    //$k('#loading').modal('close');
                }

            });

            /*data = data.data;
             var fat1 = $('#tabelaid');
             var sql = "";
             cont = 1;
             cont2 = 1;
             var totalEstoque = 0;
             var totalVenda = 0;
             
             var data2 = "";
             var hora2 = "01:00";
             
             //data = data.data;
             sql = sql + ('<table class="table display table table-bordered table-hover table-striped table-condensed input-sm"><thead><tr><th></th><th>FORNECEDOR</th><th>PRODUTO</th><th>TAMANHO</th><th>PÁG.</th><th>ESTQ.LOJA</th><th>PREÇO</th><th>QTD.LOGÍSTICAA</th></tr></thead>');
             $.each(data, function (key, values) {
             
             data2 = values.est_datinc;
             
             hora2 = values.hora;
             
             if (cont > 1) {
             
             
             totalEstoque = totalEstoque + values.qtd_estoque_loja;
             totalVenda = totalVenda + (values.preco_venda * values.qtd_estoque_loja);
             estoqueLogistica = values.qtd_estoque_logistica;
             if (estoqueLogistica === null) {
             estoqueLogistica = 0;
             }
             
             sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigo_fornecedor + "-" + values.nome_fornecedor + "</td><td>" + values.item + "-" + values.produtos_descricao + "</td><td>" + values.tam_nom + "</td><td>" + values.pagina + "</td><td>" + values.qtd_estoque_loja + "</td><td>" + tratarValor(values.preco_venda) + "</td><td>" + estoqueLogistica + "</td></tr></tbody>");
             
             cont = 1;
             cont2++;
             } else {
             totalEstoque = totalEstoque + values.qtd_estoque_loja;
             estoqueLogistica = values.qtd_estoque_logistica;
             if (estoqueLogistica === null) {
             estoqueLogistica = 0;
             }
             
             totalVenda = totalVenda + (values.preco_venda * values.qtd_estoque_loja);
             sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + values.codigo_fornecedor + "-" + values.nome_fornecedor + "</td><td>" + values.item + "-" + values.produtos_descricao + "</td><td>" + values.tam_nom + "</td><td>" + values.pagina + "</td><td>" + values.qtd_estoque_loja + "</td><td>" + tratarValor(values.preco_venda) + "</td><td>" + estoqueLogistica + "</td></tr>");
             
             cont = 2;
             cont2++;
             }
             
             });
             
             //	fat.append("</table>")	
             sql = sql + ("</table>");
             fat1.empty();
             
             fat1.append(sql);*/
            //chamada4();
            //$k('#loading').modal('close');

        }
    });
}