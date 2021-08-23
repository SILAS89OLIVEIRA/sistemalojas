



var $h = jQuery.noConflict();
var $g = jQuery.noConflict();

function descElement() {

    document.getElementById("tablemod").style.display = "block";
    //document.getElementById("tablemodTam").style.display = "none";
    document.getElementById("btnsalvar").style.display = "block";
    //document.getElementById("btnsalvarTam").style.display = "none";
}
$h("#btncancelar").click(function () {
    $h("#pagamento").val('');
    hideAllFormPagamento();
    $h('#divSobrepor').toggleClass('hide');
});

$h("#btninserir").click(function () {
    $h("#pagamento").val('');
    hideAllFormPagamento();
    $h('#divInserirSobrepor').toggleClass('hide');

});



$h("#btnfecharcaixa").click(function () {

    var caipag_data_caixa = $h("#databusca").val();
    consultaInsert(0);

    var url = retornoUrlPedidosCaixa() + 'lancarcaixa.php?data=' + caipag_data_caixa + '&loj_num=' + retornoLoja();

    console.log(url);

    $g('#loading').modal('open');
    $h.ajax({

        url: url,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {

            //$h(tablePedido).html('');
            //Chamada('tablePedido', retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + caipag_data_caixa, caipag_data_caixa);

            //$h('#divInserirSobrepor').toggleClass('hide');
            //$h('#divSobrepor').toggleClass('hide');
            //$h("#pagamento").val('');
            //hideAllFormPagamento();
            //toggleDivSobrepor(caipag_cpfcnpj, caipag_valor_total);

            $g('#loading').modal('close');
            document.getElementById("btnfecharcaixa").disabled = true;
            document.getElementById("btnsalvarobs").disabled = true;
            $h("#btncaixafechado").show();

        }, error: function (e) {
            $g('#loading').modal('close');
            alert(e);
        }
    });

});


$h("#btnsalvarobs").click(function () {

  consultaInsert(0);

});


function consultaInsert(tipo){
    
    var caipag_data_caixa = $h("#databusca").val();
    var observacao = $h("#observacao1").val();
    //observacao = observacao.replace('/', '-');
    var url = retornoUrlPedidosCaixa() + 'observacao.php?&caiobs_data_obs=' + caipag_data_caixa + '&caiobs_num_loja=' + retornoLoja() + '&caiobs_observacao=' + observacao+'&tipo='+tipo;

    console.log(url);

    $g('#loading').modal("open");
    $h.ajax({

        url: url,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {

            $g('#loading').modal('close');
           
            if(tipo === 1){
                
            var  data = html.data;

            //$h.each(html, function (key, value) {
            $h.each(html, function (key, value) {
           
             $h("#observacao1").html(html[0].caiobs_observacao);
                
            });
        }
        }, error: function (e) {
            $g('#loading').modal('close');
            alert(e);
        }
    });
    
    
    
}

$h("#desconto").click(function () {

    var descontocheck = $h('#desconto').prop('checked');
    console.log("desconto");
    var caipag_valor_total = $h("#valor").val();

    if (descontocheck === true) {

        $h("#Percentual").hide();
        $h("#ValorFinal").show();
        $h("#LabelValorFinal").show();
        $h("#LabelPercentual").hide();
        $h("#form-group-Percentual").hide();
        //$h("#LabelPercentual").show();
        $h("#Percentual").val(5);
        $h("#ValorFinal").val(tratarValor(((caipag_valor_total / 100) * 5)));


    } else {
        $h("#ValorFinal").val((0));
        $h("#Percentual").val(0);
        $h("#Percentual").hide();
        $h("#ValorFinal").hide();
        $h("#LabelValorFinal").hide();
        $h("#LabelPercentual").hide();


    }

});

$h("#acrescimo").click(function () {

    var acrescimocheck = $h('#acrescimo').prop('checked');
    console.log("acrescimo");
    var caipag_valor_total = $h("#valor").val();
    console.log(caipag_valor_total);
   
   
    if (acrescimocheck === true) {

        $h("#PercentualA").show();
        $h("#ValorFinalA").show();
        $h("#LabelValorFinalA").show();
        $h("#LabelPercentualA").show();
        $h("#LabelPercentualA").show();
        $h("#PercentualA").val(5);
         var percentualacrescimo = $h("#PercentualA").val();
          console.log(percentualacrescimo);
        $h("#ValorFinalA").val(tratarValor((((caipag_valor_total / 100) *(percentualacrescimo)))));


    } else {
        $h("#ValorFinalA").val((0));
        $h("#PercentualA").val(0);
        $h("#PercentualA").hide();
        $h("#ValorFinalA").hide();
        $h("#LabelValorFinalA").hide();
        $h("#LabelPercentualA").hide();


    }

});



$h("#btnsalvarpag").click(function () {

    var caipag_cpfcnpj = $h('#divSobrepor').attr('cpfcnpj');

    var nome_cliente = $h('#divSobrepor').attr('nomeclie');

    var express = "0";

    var caipag_fab_defeito = $h("#defeito").val();
   // alert(caipag_fab_defeito);

    var expresscheck = $h('#express').prop('checked');
    console.log(expresscheck);
    if (expresscheck == true) {
        express = "1";
    }

    //console.log('nome_cliente0:'+nome_cliente);

    var caipag_data_caixa = $h("#databusca").val();
    var datacartao = $h("#datacartao").val();
    var horacartao = $h("#horacartao").val();
    var lojas1 = $h("#lojas1").val();
    var forpag_cod = $h("#pagamento").val();
    //var caipag_cpfcnpj = $h("#caipag_cpfcnpj").val();
    //var caipag_data_caixa = $h("#caipag_data_caixa").val();
    
    

    var caipag_valor_total = $h("#valorTotal").val();
    caipag_valor_total = caipag_valor_total.replace('R$ ', '');

    caipag_valor_total = Number(caipag_valor_total).toFixed(2);

    var caipag_valor = $h("#valor").val();

    console.log(caipag_valor);

    var desconto = "0";

    var descontocheck = $h('#desconto').prop('checked');
    console.log(descontocheck);
    
   
    if (descontocheck == true) {
        //desconto = parseFloat((((parseFloat(($h('#ValorFinal').val()))*100))/parseFloat(caipag_valor))); 
        desconto = 5; 
    }
    
    console.log(desconto);
    
    var acrescimo = "0";

    var acrescimocheck = $h('#acrescimo').prop('checked');
    console.log(acrescimocheck);
    
   
    if (acrescimocheck == true) {
        acrescimo = "5"; 
    }
    
    console.log(acrescimo);

    var valorFalta1 = $h('#divSobrepor').attr('valorFalta');
    valorFalta1 = valorFalta1.replace('R$ ', '');

    valorFalta1 = Number(valorFalta1).toFixed(2);

    console.log(valorFalta1);

    var opt = $h('#pagamento').val();
    console.log(opt);

   //   alert(caipag_valor);
    if (caipag_valor === '') {
        if (opt === '15') { //DIFERENÇA DE TROCA
            caipag_valor = valorFalta1;
        } else if (opt === '16') { //COBRANÇA INDEVIDA
            caipag_valor = valorFalta1;
                 } else if (opt === '22') { //FRETE
            caipag_valor = valorFalta1;
        } else if (opt === '20') {
             caipag_valor = valorFalta1;
        } else {
            caipag_valor = caipag_valor.replace(',', '.');
        }
 // alert(caipag_valor);
        /*if (caipag_valor_total < 0) {
         caipag_valor = caipag_valor_total;
         }else{
         caipag_valor = valorFalta1;
         }*/
    } else {

        //caipag_valor = caipag_valor.replace('.', '');
        caipag_valor = caipag_valor.replace(',', '.');
    }

    if (opt === '9') { //VENDA CASADA
        var creditodebito = $h('#creditodebito').val();
        console.log(creditodebito);
        if (creditodebito === 'C') {
            //faço nada, continua valor positivo
        } else if (creditodebito === 'D') {
            caipag_valor = caipag_valor * -1;
        } else {
            alert("FAVOR SELECIONAR UM TIPO VÁLIDO!");
            return null;
        }

    } else if (opt === '18') { //AJUSTE PEDIDO/TROCA
        var creditodebito = $h('#creditodebito').val();
        console.log(creditodebito);
        if (creditodebito === 'C') {
            //faço nada, continua valor positivo
        } else if (creditodebito === 'D') {
            caipag_valor = caipag_valor * -1;
            
        } else {
            alert("FAVOR SELECIONAR UM TIPO VÁLIDO!", 4000, 'red');
            return null;
        }
    }


    var caipag_num_autorizacao = $h("#numauto").val();
    var caipag_num_terminal = $h("#numterminal").val();
    var caipag_parcelas = $h("#parcelas").val();
    
    if (opt === '2') {

        if (caipag_parcelas === '' || caipag_parcelas === '0') {
            if (retornoLoja() === '2') {
                alert("Atenção, Quantidade de Parcelas não foi inserido!", 4000, 'yellow');
            } else {
                alert("Numero de parcelas nao informado! Favor verificar!!!");
                return null;
            }
        }

    }    

    
    
    if (caipag_parcelas === '' || caipag_parcelas === '0') {
        caipag_parcelas = 1;
    }
    if(caipag_parcelas > 10){
        alert("NUMERO MAXIMO DE PARCELAS ATINGIDO, FAVOR VERIFICAR!", 4000, 'red');
        return null;
    }
    var bancar_cod = $h("#bandeira").val();
    console.log('bancar_cod:' + bancar_cod);
    if (bancar_cod === '' || bancar_cod === 'PA' || bancar_cod === null) {
        bancar_cod = 0;
    }
    
    if (opt === '2' || opt === '3') {

        if (bancar_cod === 0 || caipag_num_autorizacao === '' || caipag_num_autorizacao === '0' || caipag_num_terminal === '' || caipag_num_terminal === '0') {
            if (retornoLoja() === '2') {
                alert("Atenção, Bandeira não foi inserido!", 4000, 'yellow');
            } else {
                alert("Bandeira, NSU CARTÃO (CV) ou Nº EST. CARTÃO estão vazios! Favor verificar!!!");
                return null;
            }
        }

    }
    
    var caipag_cod_fornecedor = $h("#codfor").val();
    if (caipag_cod_fornecedor === '') {
        caipag_cod_fornecedor = 0;
    }


    var valorFalta = $h('#divSobrepor').attr('valorFalta');

    var resto = subtracao(valorFalta, caipag_valor);

    resto = Number(resto).toFixed(2);
    //console.log(resto);

    if (resto < -0.02) {
        alert("ATENÇÃO, valor informado maior que o valor total!", 4000);
        //return false;
    } /*else if (resto > -0.02 && resto < 0.02) {
     alert("ENTREI AQUI 1");
     document.getElementById("btninserir").disabled = true;
     }*/
    var numero_cheques = $h("#numcheques").val();
    if (numero_cheques === '') {
        numero_cheques = 1;
    }

    var caipag_loja_parceira = $h("#lojas").val();
    if (caipag_loja_parceira === '' || caipag_loja_parceira === 'PA' || caipag_loja_parceira === null) {
        caipag_loja_parceira = '';
    }
    
        var caipag_loja_parceira_cartao = $h("#lojas1").val();
    if (caipag_loja_parceira_cartao === '' || caipag_loja_parceira_cartao === 'PA' || caipag_loja_parceira_cartao === null) {
        caipag_loja_parceira_cartao = '';
    }


    var opt = $h('#pagamento').val();
    console.log("opt:" + opt);


   /* if (opt === '2' || opt === '3' || opt === '9' || opt === '11' || opt === '12' || opt === '13') {

        if (caipag_num_autorizacao === '' || caipag_num_autorizacao === '0') {
            if (retornoLoja() === '2') {
                alert("Atenção, Nº Documento/Autorização não foi inserido!", 4000, 'yellow');
            } else {
                alert("Nº Documento/Autorização obrigatório! Favor verificar.", 4000, 'red');
                return null;
            }
        }

    }

        if (opt === '2' || opt === '3' || opt === '9' || opt === '11' || opt === '12' || opt === '13') {

        if (caipag_num_terminal === '' || caipag_num_terminal === '0') {
            if (retornoLoja() === '2') {
                alert("Atenção, Nº Documento/Autorização não foi inserido!", 4000, 'yellow');
            } else {
                alert("Nº Documento/Autorização obrigatório! Favor verificar.", 4000, 'red');
                return null;
            }
        }

    }*/
    
    
    if(opt === '21'){
        
        caipag_valor = 0.01;
        
    }

    if (caipag_valor === '') {

        alert("Campor valor obrigatório! Favor verificar.", 4000, 'red');
        return null;

    }
    if(numero_cheques > 30){
        alert("NUMERO MAXIMO DE CHEQUES ATINGIDO, FAVOR VERIFICAR!", 4000, 'red');
        return null;
    }

    if (numero_cheques > 1) {

        inserirPagamentoRecursivo(numero_cheques, forpag_cod, caipag_cpfcnpj, caipag_data_caixa, caipag_valor, caipag_valor_total, caipag_num_autorizacao, caipag_num_terminal,
                caipag_parcelas, bancar_cod, caipag_cod_fornecedor, desconto, caipag_loja_parceira, nome_cliente, retornoLoja(), express);
    $h("#descontovalor").val(''); $h("#acrescimovalor").val('');
    } else {
        //console.log('nome_cliente:'+nome_cliente);
        var frete = $h('#frete').val();
          if (frete === '' || frete  === 'PA' || frete  === null) {
        frete  = 0;
    }
    
    var descontovalor = 0;
            
            if (descontocheck == true) {     
            descontovalor =    $h('#ValorFinal').val();
         if (descontovalor === '' || descontovalor  === null) {
        descontovalor  = 0;
    } else {
        
         descontovalor = descontovalor.replace(',', '.'); 
    }
            }
    if(caipag_loja_parceira_cartao === 'Loja:'){
        
        caipag_loja_parceira_cartao = '0';
        
    }
 
 
 
    console.log(caipag_loja_parceira_cartao);
    

    
var cpfcnpjcartao1 = $h("#cpfcnpjcartao1").val();


    var acrescimovalor = 0;
            
            if (acrescimocheck === true) {     
            acrescimovalor =  $h('#ValorFinalA').val();
                 if (acrescimovalor === '' || acrescimovalor  === null) {
       acrescimovalor  = 0;
    } else {
        
         acrescimovalor = acrescimovalor.replace(',', '.'); 
    }
}

if(opt === '21'){
        
        caipag_valor = 0.01;
        
    }
            
        var urlformapagamento = retornoUrlPedidosCaixa() +
                'pedidoscaixapagamento.php?forpag_cod=' + forpag_cod + '&caipag_cpfcnpj=' + caipag_cpfcnpj + '&caipag_data_caixa=' + caipag_data_caixa + '&caipag_valor=' + caipag_valor +
                '&caipag_valor_total=' + caipag_valor_total + '&caipag_num_autorizacao=' + caipag_num_autorizacao + '&caipag_num_terminal=' + caipag_num_terminal+ '&caipag_parcelas=' + caipag_parcelas +
                '&bancar_cod=' + bancar_cod + '&caipag_cod_fornecedor=' + caipag_cod_fornecedor + '&desconto=' + desconto + '&caipag_loja_parceira=' + caipag_loja_parceira +
                '&caipag_nomeclie=' + nome_cliente + '&loj_num=' + retornoLoja() + '&caipag_express=' + express+'&caipagdata='+datacartao+'&caipaghora='+horacartao+'&caipagfrete='+frete+'&descontovalor='+descontovalor+'&lojaparceiracartao='+caipag_loja_parceira_cartao+'&caipag_cpfcnpj_cartao='+cpfcnpjcartao1+'&caipag_acrescimo='+acrescimo+'&caipag_valor_acrescimo='+acrescimovalor+'&caipag_fab_defeito='+caipag_fab_defeito;     

        console.log(urlformapagamento);
         console.log('urlformapagamento');

        $g('#loading').modal('open');
        $h.ajax({

            url: urlformapagamento,
            type: "GET",
            dataType: "json",
            //data : "param-no",
            success: function (html) {

                $h(tablePedido).html('');
                Chamada('tablePedido', retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + caipag_data_caixa, caipag_data_caixa);

                $h('#divInserirSobrepor').toggleClass('hide');
                $h('#divSobrepor').toggleClass('hide');
                $h("#pagamento").val('');
                $h("#descontovalor").val('');
                hideAllFormPagamento();
                //console.log('nome_cliente1:'+nome_cliente);
                toggleDivSobrepor(caipag_cpfcnpj, caipag_valor_total, nome_cliente);

                $g('#loading').modal('close');

            }, error: function (e) {
                $g('#loading').modal('close');
                alert(e);
            }
        });
    }
});

function inserirPagamentoRecursivo(numero_cheques, forpag_cod, caipag_cpfcnpj, caipag_data_caixa, caipag_valor, caipag_valor_total, caipag_num_autorizacao, caipag_num_terminal, caipag_parcelas,
        bancar_cod, caipag_cod_fornecedor, desconto, caipag_loja_parceira, nome_cliente, loj_num, caipag_express, caipag_cpfcnpj_cartao,caipag_acrescimo,caipag_valor_acrescimo) {

    for (var i = numero_cheques; i > 0; i--) {
        console.log('numero_cheques>' + i);
        var urlformapagamento = retornoUrlPedidosCaixa() +
                'pedidoscaixapagamento.php?forpag_cod=' + forpag_cod + '&caipag_cpfcnpj=' + caipag_cpfcnpj + '&caipag_data_caixa=' + caipag_data_caixa + '&caipag_valor=' + caipag_valor +'&caipag_valor_total=' + caipag_valor_total +'&caipag_num_autorizacao=' + caipag_num_autorizacao + '&caipag_num_terminal=' + caipag_num_terminal + '&caipag_parcelas=' + caipag_parcelas +'&bancar_cod=' + bancar_cod + '&caipag_cod_fornecedor=' + caipag_cod_fornecedor + '&desconto=' + desconto + '&caipag_loja_parceira=' + caipag_loja_parceira +'&caipag_nomeclie=' + nome_cliente + '&loj_num=' + loj_num +'&caipag_express=' + caipag_express+"" + '&caipagdata=0&caipaghora=0&caipagfrete=' +  0+'&descontovalor='+0+'&lojaparceiracartao='+0+'&caipag_cpfcnpj_cartao='+0+'&caipag_acrescimo='+0+'&caipag_valor_acrescimo='+0;
        ;



        console.log(urlformapagamento);

        //$g('#loading').modal('open');
        $h.ajax({

            url: urlformapagamento,
            type: "GET",
            dataType: "json",
            //data : "param-no",
            success: function (html) {

                //$g('#loading').modal('close');
                numero_cheques--;
                //inserirPagamentoRecursivo(numero_cheques - 1, forpag_cod, caipag_cpfcnpj, caipag_data_caixa, caipag_valor, caipag_valor_total, caipag_num_autorizacao, caipag_parcelas, bancar_cod, caipag_cod_fornecedor, desconto);

            }, error: function (e) {
                //$g('#loading').modal('close');
                alert(e);
            }
        });
    }

    sleep(6666);
    $h(tablePedido).html('');
    $h('#divInserirSobrepor').toggleClass('hide');
    $h('#divSobrepor').toggleClass('hide');
    $h("#pagamento").val('');
    hideAllFormPagamento();

    var urll = retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + caipag_data_caixa;

    console.log(urll);

    $h.ajax({

        url: urll,
        type: "GET",
        dataType: "json",
        // data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            var fat1 = $h('#' + 'tablePedido');
            var sql = "";
            //fat.append('<table class="table table-bordered table-hover table-striped"><thead><tr><th>CpfCnpj</th><th>Cliente</th><th>Valor Pedidos</th><th>Valor Trocas</th><th>Valor Total</th></tr></thead>');
            sql = sql + ('<table id="tablePedido" class="table"><thead class=\"bg-primary text-white\"><tr class="success"><th></th><th>CPF/CNPJ</th><th>CLIENTE DOCUMENTO</th><th>TOTAL</th><th>LANÇAR</th><th>LANÇADO</th></tr></thead>');
            console.log(urll);
            cont = 1;
            cont2 = 1;
            $h.each(html, function (key, value) {
                //console.log(value.caixa);
                var digitado = "<i class='small material-icons red-text'>clear</i>";
                if (value.caixa === 1) {
                    digitado = "<i class='small material-icons green-text'>check</i>";
                }
                var cpfcnpj = "";
                cpfcnpj = value.docto_cli;
                var nome_cliente = "";
                if (value.nome_cli !== null && value.nome_cli !== '') {
                    nome_cliente = value.nome_cli;
                    nome_cliente = nome_cliente.substring(0, 30);
                }
                if (value.docto_cli === null) {

                } else {
                    var valor_total1 = value.valor_total;
                    valor_total1 = Number(valor_total1).toFixed(2);
                    if (cont > 1) {


                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + value.valor_total + "\", \"" + nome_cliente + "\")'><i class='small material-icons'>attach_money</i></a></td><td>" + digitado + "</td></tr></tbody>");
                        //fat.append("<tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {

                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + value.valor_total + "\", \"" + nome_cliente + "\")'><i class='small material-icons'>attach_money</i></a></td><td>" + digitado + "</td></tr>");

                        //fat.append("<tbody><tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr>");
                        cont = 2;
                        cont2++;
                    }
                }

            });

            //  fat.append("</table>")  
            sql = sql + ("</table>");
            fat1.append(sql);
            //console.log('nome_cliente3:'+nome_cliente);
            toggleDivSobrepor(caipag_cpfcnpj, caipag_valor_total, nome_cliente);
            chamada4(caipag_data_caixa);


            //console.log(sql)
        }, error: function (e) {
            alert(e);
        }
    });
    return;

}

$h("#btnsairpag").click(function () {
    hideAllFormPagamento();
    $h("#pagamento").val('');
    $h('#divInserirSobrepor').toggleClass('hide');
});

$h("#btnvisualizar").click(function () {

    var caipag_data_caixa = $h("#databusca").val();

    console.log(retornoUrlPedidosCaixa() + "relatorios/fechamentocaixa.php?&sql=" + caipag_data_caixa);
    window.open(retornoUrlPedidosCaixa() + "relatorios/fechamentocaixa.php?&sql=" + caipag_data_caixa);

});



function subtracao(valor1, valor2) {
    //console.log("valor1:" + valor1 + " valor2:" + valor2);
    return (Number(valor1) - Number(valor2)).toFixed(2);
}

function soma(valor1, valor2) {
    return (Number(valor1) + Number(valor2)).toFixed(2);
}

function excluirCaipagcod(caipag_cod, cpfcnpj, valor_total, nome_cliente) {

    var urll = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=1&caipagcod=' + caipag_cod + '&caipag_cpfcnpj=&caipag_data_caixa=';

    //console.log(urll);
    var dados = "";

    $h.ajax({
        url: urll,
        type: "GET",
        data: dados,
        dataType: "json",
        // data : "param-no",
        success: function (data) {

            var caipag_data_caixa = $h("#databusca").val();

            $h(tablePedido).html('');
            Chamada('tablePedido', retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + caipag_data_caixa, caipag_data_caixa);

            $h('#divSobrepor').toggleClass('hide');

            document.getElementById("btninserir").disabled = false;
            document.getElementById("btnfecharcaixa").disabled = true;
            console.log('nome_cliente4:'+nome_cliente);
            toggleDivSobrepor(cpfcnpj, valor_total, nome_cliente);

        }, error: function (e) {
            alert(e);
        }
    });




}

/*function toggleDivInserirSobrepor(cpfcnpj, valor_total) {
 
 
 }*/



function toggleDivSobrepor(cpfcnpj, valor_total, nomeclie) {


    $h('#divSobrepor').attr('cpfcnpj', cpfcnpj);
    $h('#divSobrepor').attr('nomeclie', nomeclie);
    
    console.log('nome_cliente5:'+nomeclie);

    //alert(valor_total);
    //valor_total = valor_total.replace('.', '');
    valor_total = valor_total.replace(',', '.');

    /* var total = subtracao(valor_total, 10.5);
     
     alert(total);*/

    $h("#valorTotal").val('R$ ' + valor_total);

    //$h("#valorFalta").val('R$ ' + total);

    var databusca = $h("#databusca").val();
    $h('#tablePagamento').html("");

    //alert(databusca);
    //var urll = "http://192.168.0.38:8080/ERPBABITA/webresources/caixapagamento/buscaPagamentoCaixa?caipag_cpfcnpj=10525231617&caipag_data_caixa=2017-09-04&loj_num=5";
    //
    //TIPO 0 = BUSCA PAGAMENTO CAIXA
    var urll = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=0&caipagcod=&caipag_cpfcnpj=' + cpfcnpj + '&caipag_data_caixa=' + databusca;

    console.log(urll);
    var dados = "";
    var caixa_digitado = 0.00;

    $h.ajax({
        type: "GET",
        url: urll,
        data: dados,
        dataType: "json",
        success: function (data) {
            // var fat = $h('.'+id);
            //var fat1 = $h('#' + id);
            var sql = "";
            //fat.append('<table class="table table-bordered table-hover table-striped"><thead><tr><th>CpfCnpj</th><th>Cliente</th><th>Valor Pedidos</th><th>Valor Trocas</th><th>Valor Total</th></tr></thead>');
            //sql = sql + ('<table id="tablePedido" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th></th><th>CPF/CNPJ</th><th>CLIENTE DOCUMENTO</th><th>TOTAL</th><th>LANÇAR</th><th>LANÇADO</th></tr></thead>');
            //console.log(urll);
            sql = sql + ('<table id="tablePagamento" class="table"><thead class=\"bg-primary text-white\"><tr class="success"><th></th><th>CPF/CNPJ</th><th>PAGAMENTO</th><th>Nº DOC/AUT.</th><th>BANDEIRA</th><th>PARCELAS</th><th>VALOR</th><th>DESCONTO</th><th>EXCLUIR</th></tr></thead>');

            cont = 1;
            cont2 = 1;
            data = data.data;

            //$h.each(html, function (key, value) {
            $h.each(data, function (key, value) {
                //console.log(value);
                var cpfcnpj = "";
                cpfcnpj = value.caipag_cpfcnpj;
                //console.log(cpfcnpj);
                if (value.caipag_cpfcnpj === null && value.caipag_cod === null) {

                } else {
                    var num_auto = value.caipag_num_autorizacao;
                    if (num_auto === '') {
                        num_auto = '-';
                    }
                    var bandeira = value.bancar_desc;
                    var bancar_cod = value.bancar_cod;
                    if (bancar_cod === 0) {
                        bandeira = '-';
                    }
                    var desconto = value.caipag_desconto;
                    if (desconto === '0.00') {
                        desconto = 'NÃO';
                    } else {
                        desconto = 'SIM';
                    }
                    if (cont > 1) {

                        sql = sql + ("<tbody><tr><td class='id_hide'>" + value.caipag_cod + "</td><td>" + cont2 + "</td><td>" + value.caipag_cpfcnpj + "</td><td>" + value.forpag_desc + "</td><td style='text-align: center;'>" + num_auto + "</td><td style='text-align: center;'>" + bandeira + "</td><td style='text-align: center;'>" + value.caipag_parcelas + "</td><td>" + value.caipag_valor + "</td><td style='text-align: center;'>" + desconto + "</td><td><a href='javascript:void(0)'><i class='small material-icons' onclick='excluirCaipagcod(" + value.caipag_cod + ", \"" + cpfcnpj + "\", \"" + valor_total + "\" , \"" + nomeclie + "\")'>clear</i></a></td></tr></tbody>");

                        //sql = sql + ("<tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + value.nome_cli.substring(0, 30) + "</td><td>" + tratarValor(value.valor_total) + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + tratarValor(value.valor_total) + "\")'><i class='small material-icons'>add_shopping_cart</i></a></td><td>0</td></tr></tbody>");
                        //fat.append("<tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr></tbody>");
                        cont = 1;
                        cont2++;
                        //console.log(value.caipag_valor);
                        caixa_digitado = soma(caixa_digitado, value.caipag_valor);
                    } else {
                        sql = sql + ("<tbody><tr><td class='id_hide'>" + value.caipag_cod + "</td><td>" + cont2 + "</td><td>" + value.caipag_cpfcnpj + "</td><td>" + value.forpag_desc + "</td><td style='text-align: center;'>" + num_auto + "</td><td style='text-align: center;'>" + bandeira + "</td><td style='text-align: center;'>" + value.caipag_parcelas + "</td><td>" + value.caipag_valor + "</td><td style='text-align: center;'>" + desconto + "</td><td><a href='javascript:void(0)'><i class='small material-icons' onclick='excluirCaipagcod(" + value.caipag_cod + " , \"" + cpfcnpj + "\", \"" + valor_total + "\", \"" + nomeclie + "\")'>clear</i></a></td></tr></tbody>");

                        //sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + value.nome_cli.substring(0, 30) + "</td><td>" + tratarValor(value.valor_total) + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + tratarValor(value.valor_total) + "\")'><i class='small material-icons'>add_shopping_cart</i></a></td><td>0</td></tr>");
                        //fat.append("<tbody><tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr>");
                        cont = 2;
                        cont2++;
                        //console.log(value.caipag_valor);
                        caixa_digitado = soma(caixa_digitado, value.caipag_valor);
                    }
                }

            });
            //console.log("caixa_digitado:" + caixa_digitado);
            //console.log("valor_total:" + valor_total);
            //valor_total = valor_total.replace('.', '');
            //valor_total = valor_total.replace(',', '.');
            if (caixa_digitado === 0) {
                //alert(valor_total);
                $h("#valorFalta").val('R$ ' + valor_total);
            } else {
                //alert(valor_total);
                //alert(caixa_digitado);
                valor_total = subtracao(valor_total, caixa_digitado);
                $h("#valorFalta").val('R$ ' + valor_total);
            }
            $h('#divSobrepor').attr('valorFalta', valor_total);
            if (valor_total > -0.03 && valor_total < 0.03) {
                //alert("ENTREI AQUI 2");
              //  document.getElementById("btninserir").disabled = true;
            }
            var fat1 = $h('#tablePagamento');
            //  fat.append("</table>")  
            sql = sql + ("</table>");
            fat1.append(sql);
            $h(".id_hide").hide();
            $h('#divSobrepor').toggleClass('hide');
            chamada4(databusca);
            //console.log(sql)
        }, error: function (e) {
            alert(e);
        }
    });
}


$h(document).ready(function () {



    window.onload = chamada2("0");

    hideAllFormPagamento();

    var urlformapagamento = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=3&caipagcod=&caipag_cpfcnpj=&caipag_data_caixa=';

    console.log(urlformapagamento);

    $g('#loading').modal('open');
    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urlformapagamento,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);

            $h('#pagamento').html(comboxvalorpagamento("pagamento", html, "forpag_cod", "forpag_desc"));
            $g('#loading').modal('close');

        }, error: function (e) {
            alert(e);
        }
    });


    var urlbandeira = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=2&caipagcod=&caipag_cpfcnpj=&caipag_data_caixa=';

    $g('#loading').modal('open');
    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urlbandeira,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);

            $h('#bandeira').html(comboxvalorbandeira("bandeira", html, "bancar_cod", "bancar_desc"));
            $g('#loading').modal('close');

        }, error: function (e) {
            alert(e);
        }
    });

    var urllojas = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=5&caipagcod=&caipag_cpfcnpj=&caipag_data_caixa=';

    $g('#loading').modal('open');
    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urllojas,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);

            $h('#lojas').html(comboxvalorlojas("lojas", html, "loj_num", "loj_nom"));
            $g('#loading').modal('close');

        }, error: function (e) {
            alert(e);
        }
    });
  $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urllojas,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);

            $h('#lojas1').html(comboxvalorlojas1("lojas", html, "loj_num", "loj_nom"));
            $g('#loading').modal('close');

        }, error: function (e) {
            alert(e);
        }
    });

    

    var urlformapagamento = retornoUrlPedidosCaixa() + 'pedidostrocacaixadefeito.php?codigofab=';

    console.log(urlformapagamento);

    $g('#loading').modal('open');
    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urlformapagamento,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);

            $h('#defeito').html(comboxfornecedordefeito("defeito", html, "", ""));
            $g('#loading').modal('close');

        }, error: function (e) {
            alert(e);
        }
    });

    $h('.datepicker').datepicker({
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
        closeOnClear: true,
           showButtonPanel:true,


    });


    $h("#btnFltros").click(function () {
        var seta = $h('#btnFltros').children();
        seta.toggleClass('down');
        $h('#btnFltros').toggleClass('btn-shadow');
        $h('#headerProcessos').toggleClass('title-shadow');
        $h('#formFiltros').slideToggle("slow");
    });


    $h("#btnFiltrar").click(function () {
        $h('#loading').modal('open');
        var seta = $h('#btnFltros').children();
        seta.toggleClass('down');
        $h('#btnFltros').toggleClass('btn-shadow');
        $h('#headerProcessos').toggleClass('title-shadow');
        $h('#formFiltros').slideToggle("slow");

        $h(tablePedido).html('');
        //$h(tabelatroca1).html('');
        $h("#databusca").val($h('#dataInicio').val());

        chamada2($h('#dataInicio').val());
        $h('#loading').modal('close');
consultaInsert(1);
    });

    $h("#dataInicio").keypress(function (e) {
        //console.log(e.keyCode);
        if (e.keyCode === 13) {
            $h(tablePedido).html('');
            //$h(tabelatroca1).html('');
            chamada2($h('#dataInicio').val());
        }
    });
    
      consultaInsert(1);
});

function Chamada(id, urll, data_escolhida) {

    $h("#databusca").val(data_escolhida);

    var caixa_fechado = "0";

    var urlcaixa = retornoUrlPedidosCaixa() + 'pedidoscaixa.php?tipo=4&caipagcod=&caipag_cpfcnpj=&caipag_data_caixa=' + data_escolhida + '';
    console.log(urlcaixa);
    var dados = "";

    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urlcaixa,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (data) {
            data = data.data;

            $h.each(data, function (key, value) {

                console.log(value.caipag_caixa_fechado);
                //alert(value.caipag_caixa_fechado);
                if (value.caipag_caixa_fechado === 1) {
                    caixa_fechado = "1";
                    $h("#caixafechado").val("1");
document.addEventListener("DOMContentLoaded", function(event) {
                    document.getElementById("btnfecharcaixa").disabled = false;
                    $h("#btncaixafechado").show();});

                } else {
                    document.addEventListener("DOMContentLoaded", function(event) {
                    document.getElementById("btnfecharcaixa").disabled = true;
                    $h("#btncaixafechado").hide();

                    $h("#caixafechado").val("0");
                    });
                }

            });
            //alert(caixa_fechado);
            //aqui alimento a table pedidos
            console.log(urll);
            $h.ajax({
                //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
                url: urll,
                type: "GET",
                dataType: "json",
                // data : "param-no",
                success: function (html) {
                    // var fat = $h('.'+id);
                    var fat1 = $h('#' + id);
                    var sql = "";
                    //fat.append('<table class="table table-bordered table-hover table-striped"><thead><tr><th>CpfCnpj</th><th>Cliente</th><th>Valor Pedidos</th><th>Valor Trocas</th><th>Valor Total</th></tr></thead>');
                    sql = sql + ('<table id="tablePedido" class="table"><thead class=\"bg-primary text-white\"><tr class="success"><th></th><th>CPF/CNPJ</th><th>CLIENTE DOCUMENTO</th><th>TOTAL</th><th>LANÇAR</th><th>LANÇADO</th></tr></thead>');
                    console.log(urll);
                    cont = 1;
                    cont2 = 1;
                    $h.each(html, function (key, value) {
                        //console.log(value.caixa);
                        var digitado = "<i class='small material-icons text-danger'>clear</i>";
                        if (value.caixa === 1) {
                            digitado = "<i class='small material-icons text-success'>check</i>";
                        }
                        var cpfcnpj = "";
                        cpfcnpj = value.docto_cli;
                        var nome_cliente = "";
                        if (value.nome_cli !== null && value.nome_cli !== '') {
                            nome_cliente = value.nome_cli;
                            nome_cliente = nome_cliente.substring(0, 30);
                        }
                        //console.log('nome_cliente15:'+nome_cliente);
                        if (value.docto_cli === null) {

                        } else {
                            var valor_total1 = value.valor_total;
                            valor_total1 = Number(valor_total1).toFixed(2);
                            if (cont > 1) {

                                if (caixa_fechado === "0") {
                                    sql = sql + ("<tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + value.valor_total + "\", \"" + nome_cliente + "\")'><i class='small material-icons text-primary'>attach_money</i></a></td><td>" + digitado + "</td></tr></tbody>");
                                    //fat.append("<tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr></tbody>");
                                } else {
                                    sql = sql + ("<tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><i class='small material-icons text-primary'>attach_money</i></td><td>" + digitado + "</td></tr></tbody>");
                                }
                                cont = 1;
                                cont2++;
                            } else {
                                if (caixa_fechado === "0") {
                                    sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><a href='javascript:void(0)' onclick='toggleDivSobrepor(\"" + cpfcnpj + "\", \"" + value.valor_total + "\", \"" + nome_cliente + "\")'><i class='small material-icons text-primary'>attach_money</i></a></td><td>" + digitado + "</td></tr>");
                                } else {
                                    sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + cpfcnpj + "</td><td>" + nome_cliente + "</td><td>" + valor_total1 + "</td><td><i class='small material-icons text-primary'>attach_money</i></td><td>" + digitado + "</td></tr>");
                                }
                                //fat.append("<tbody><tr><td>"+value.cpfCnpj+"</td><td>"+value.nomeCliente+"</td><td>"+value.valorPedidos+"</td><td>"+value.valorTrocas+"</td><td>"+value.valorTotal+"</td></tr>");
                                cont = 2;
                                cont2++;
                            }
                        }

                    });

                    //  fat.append("</table>")  
                    sql = sql + ("</table>");
                    fat1.append(sql);
                    chamada4(data_escolhida);
                    //console.log(sql)
                }, error: function (e) {
                    alert(e);
                }
            });

        }, error: function (e) {
            alert(e);
        }
    });
}
;


function chamada2(data_escolhida) {

    var data = "";
    //console.log("data_escolhida:" + data_escolhida);
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
    //console.log(retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + data);
    Chamada('tablePedido', retornoUrlPedidosCaixa() + 'pedidostrocacaixa.php?data=' + data, data);

}

function chamada4(data_escolhida) {

    /*var dataa = new Date();
     var ano = dataa.getFullYear();
     var dia = dataa.getDate();
     var mes = dataa.getMonth() + 1;
     
     
     
     var data = ano + '-' + mes + '-' + dia;*/
    //var data = '2017-07-12';  
    Chamada3('', retornoUrlPedidosCaixa() + 'pedidoscaixaTotal.php?data=' + data_escolhida);
    //ChamadaVend('tabelatroca', retornoUrlPedidosCaixa() + 'pedidostrocaVendedorTotal.php?data=' + data_escolhida);

}
function Chamada3(id, urll) {

    $h.ajax({
        //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
        url: urll,
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $h('.'+id);
            //var fat1 = $h('.'+id);
            var sql = "";

            var valor_total = Number(html[0].valor_total).toFixed(2);
            var valor_total_digitado = Number(html[0].valor_total_digitado).toFixed(2);

            var resto = subtracao(valor_total, valor_total_digitado);

            resto = Number(resto).toFixed(2);

            //console.log("valor_total:" + valor_total);

            if ((resto > -1.00 && resto < 1.00) && valor_total !== '0.00') {
                //alert("entrei");
                var caipag_data_caixa = $h("#databusca").val();
                console.log('caipag_data_caixa:' + caipag_data_caixa);

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;

                console.log('today:' + today);

                if ($h("#caixafechado").val() === "0" && caipag_data_caixa !== today) {
                    document.getElementById("btnfecharcaixa").disabled = false;
                    $h("#btncaixafechado").hide();

                } else {
                    
                    if (caipag_data_caixa === today) {
                        document.getElementById("btnfecharcaixa").disabled = true;
                        $h("#btncaixafechado").hide();
                    } else {
                        document.getElementById("btnfecharcaixa").disabled = true;
                        $h("#btncaixafechado").show();
                    }
                }
            }


            document.getElementById("valor_total_pedidos").value = valor_total;

            document.getElementById("valor_total_trocas").value = valor_total_digitado;

            var databusca = $h("#databusca").val();

            var datainiAno = databusca.split('-')[0];
            var datainiMes = databusca.split('-')[1];
            var datainidia = databusca.split('-')[2];
            databusca = datainidia + "/" + datainiMes + "/" + datainiAno;

            document.getElementById("data_caixa").value = databusca;

        }, error: function (e) {
            alert(e);
        }
    });
}
;

function LancarCaixa(doctocli) {
    //console.log(doctocli.toString());
    //alert("dcto:" + doctocli.toString());
}

function hideAllFormPagamento() {

    $h("#valor").hide();
    $h("#form-group-valor").hide();
    $h("#LANA").show();
    $h("#frete").hide();
    $h("#labelFrete").hide();
    $h("#valor").val('');
    $h("#frete").val('');
    $h("#numauto").val('');
    $h("#numterminal").val('');
    //$h("#bandeira").val('');
    $h("#parcelas").val('');
    $h("#codfor").val('');
    $h("#numcheques").val('');
     $h("#Percentual").hide();
        $h("#ValorFinal").hide();
 $h("#LabelValorFinal").hide();
  $h("#LabelPercentual").hide();
  $h("#labelcpf").hide();
 

    $h('#bandeira').val('PA');
    $h('#lojas').val('PA');
    $h('#creditodebito').val('PA');

    $h("#desconto").prop("checked", false);
    $h("#express").prop("checked", false);

     $h("#Percentual").hide();
        $h("#ValorFinal").hide();
 $h("#LabelValorFinal").hide();
  $h("#LabelPercentual").hide();
  
       $h("#PercentualA").hide();
        $h("#ValorFinalA").hide();
 $h("#LabelValorFinalA").hide();
  $h("#LabelPercentualA").hide();
  
    $h("#form-group-acrescimo").hide();
    $h("#form-group-Desconto").hide();
    $h("#form-group-Express").hide();

    $h("#temporeal").hide();


    $h("#form-group-lojas").hide();
    $h("#form-group-creditodebito").hide();
    $h("#form-group-numauto").hide();
    $h("#form-group-numterminal").hide();
    $h("#form-group-cpfcnpjcartao").hide();
    $h("#cpfcnpjcartao").hide();
    $h("#cpfcnpjcartao1").hide();  
    $h("#form-group-bandeira").hide();
    $h("#form-group-for-defeito").hide();
    $h("#defeito").hide();
    $h("#form-group-parcelas").hide();
    $h("#form-group-codfor").hide();
    $h("#form-group-numcheques").hide();
    document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btnsalvarpag").disabled = true;
    document.getElementById("btninserir").disabled = false;
    });
}

$h('#form-group-formapagamento').change(function () {

    var opt = $h('#pagamento').val();

    hideAllFormPagamento();


    if (opt === '1') { //DINHEIROdocument.getElementById("btnsalvarpag").disabled = true; 
        $h("#form-group-Desconto").show();
        $h("#frete").hide();
        $h("#form-group-frete").hide();
        $h("#labelFrete").hide();
        $h("#form-group-Express").hide();
        $h("#express").hide();
        $h("#form-group-defeito").hide();
        $h("#valor").show();
        $h("#form-group-valor").show();
      
  
        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
         //   $h("#form-group-Express").show();
        //}

        document.getElementById("btnsalvarpag").disabled = false;


    } else if (opt === '2') { //CARTÃO CREDITO
        //alert('cartao credito')
        $h("#form-group-acrescimo").show();
        $h("#form-group-numauto").show();
         $h("#form-group-numterminal").show();
        $h("#form-group-bandeira").show();
        $h("#form-group-parcelas").show();
        $h("#frete").hide();
        $h("#form-group-frete").hide();
        $h("#labelFrete").hide();
         $h("#form-group-cpfcnpjcartao").show();
       $h("#cpfcnpjcartao").show();
       $h("#cpfcnpjcartao1").show();  
         $h("#form-group-defeito").hide();
        $h("#temporeal").show();
         $h("#valor").show();
        $h("#form-group-valor").show();

        if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
            $h("#form-group-Express").show();
        }

        document.getElementById("btnsalvarpag").disabled = false;

        alteraLabelAutorizacaoDocumento('NSU CARTÃO (CV): ');

    } else if (opt === '3') { //CARTÃO DEBITO

        $h("#form-group-numauto").show();
         $h("#form-group-numterminal").show();
        $h("#form-group-bandeira").show();
        $h("#temporeal").show();
         $h("#frete").hide();
        $h("#form-group-frete").show();
        $h("#labelFrete").hide();
        $h("#form-group-cpfcnpjcartao").show();
        $h("#form-group-defeito").hide();
   $h("#valor").show();
        $h("#form-group-valor").show();

        
        
        document.getElementById("btnsalvarpag").disabled = false;

        if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
            $h("#form-group-Express").show();
        }

        alteraLabelAutorizacaoDocumento('NSU CARTÃO (CV): ');

    } else if (opt === '4') { //CHEQUE
         $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-Desconto").show();
        $h("#form-group-Desconto").show();
        $h("#Percentual").hide();
        $h("#ValorFinal").hide();
        $h("#LabelValorFinal").hide();
        $h("#LabelPercentual").hide();
                $h("#frete").hide();
        $h("#form-group-frete").hide();
         $h("#labelFrete").hide();
$h("#form-group-defeito").hide();
        $h("#form-group-numcheques").show();
        document.getElementById("btnsalvarpag").disabled = false;

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
         //   $h("#form-group-Express").show();
        //}

        alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');

    } else if (opt === '5') { //DEPOSITO
         $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-numauto").show();
        $h("#form-group-Desconto").show();
        $h("#form-group-Desconto").show();
        $h("#Percentual").hide();
        $h("#ValorFinal").hide();
        $h("#LabelValorFinal").hide();
        $h("#LabelPercentual").hide();
                      $h("#frete").hide();
        $h("#form-group-frete").hide();
         $h("#labelFrete").hide();
         $h("#form-group-defeito").hide();
        document.getElementById("btnsalvarpag").disabled = false;

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
        //}

        alteraLabelAutorizacaoDocumento('BANCO: ');

    } else if (opt === '9') { //VENDA CASADA
         $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-lojas").show();
        $h("#form-group-creditodebito").show();
        $h("#form-group-numauto").show();
        $h("#frete").hide();
        $h("#form-group-frete").hide();
        $h("#labelFrete").hide();
        alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        $h("#form-group-defeito").hide();

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
      //  }

        document.getElementById("btnsalvarpag").disabled = false;

    } else if (opt === '11') { //VALE CLIENTE
         $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-numauto").show();
        alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        document.getElementById("btnsalvarpag").disabled = false;

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
        //}

    } else if (opt === '12') { //VALE CHEQUE
         $h("#valor").show();
        $h("#form-group-valor").show();
           $h("#form-group-Desconto").show();
        $h("#form-group-Desconto").show();
        $h("#Percentual").hide();
        $h("#ValorFinal").hide();
        $h("#LabelValorFinal").hide();
        $h("#LabelPercentual").hide();
                $h("#frete").hide();
        $h("#form-group-frete").hide();
         $h("#labelFrete").hide();
         $h("#form-group-defeito").hide();

     
        
        $h("#form-group-numauto").show();
        alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        document.getElementById("btnsalvarpag").disabled = false;

       // if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
       // }

    } else if (opt === '13') { //VALE FORNECEDOR
         $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-numauto").show();
        $h("form-group-codfor").hide();
        $h("#form-group-Percentual").hide();
        $h("#form-group-PercentualA").hide();
        $h("#form-group-ValorFinalA").hide();
        $h("#form-group-Venda_FinalA").hide();
        $h("#form-group-Valor_Final").hide();
        $h("#form-group-codfor").show();
            $h("#LabelPercentual").hide();
            $h("#LabelPercentualA").hide();
             $h("#Percentual").hide();
                  $h("#frete").hide();
        $h("#form-group-frete").hide();
        $h("#labelFrete").hide();
        $h("#LabelValorFinal").hide();
         $h("#LabelValorFinalA").hide();
         $h("#form-group-defeito").hide();
        alteraLabelAutorizacaoDocumento('Nº AUTORIZAÇÃO: ');
        document.getElementById("btnsalvarpag").disabled = false;

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
           // $h("#form-group-Express").show();
        //}

    } else if (opt === '14') { //VALE FUNCIONARIO
         $h("#valor").show();
        $h("#form-group-valor").show();

        document.getElementById("btnsalvarpag").disabled = false;
        $h("#form-group-defeito").hide();

       // if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
     //   }

    } else if (opt === '15') { //DIFERENÇA DE TROCA
        $h("#valor").hide();
        //$h("#form-group-numauto").show();
        //alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        $h("#labelValor").hide();
        document.getElementById("btnsalvarpag").disabled = false;
        $h("#form-group-defeito").hide();

       // if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
           // $h("#form-group-Express").show();
       // }
        
           } else if (opt === '20') { //DIFERENÇA DE TROCA
        $h("#valor").hide();
        
        $h("#labelValor").hide();
          document.getElementById("btnsalvarpag").disabled = false;

    } else if (opt === '16') { //COBRANÇA INDEVIDA
        $h("#valor").hide();
        $h("#labelValor").hide();
        //$h("#form-group-numauto").show();
        //alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        document.getElementById("btnsalvarpag").disabled = false;
        
          } else if (opt === '21'||opt === '22') { //FRETE
        $h("#valor").hide();
        $h("#labelValor").hide();
        //$h("#form-group-numauto").show();
        //alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        document.getElementById("btnsalvarpag").disabled = false;

       // if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
           // $h("#form-group-Express").show();
        //}

    } else if (opt === '17') { //CREDITO CLIENTE
   $h("#valor").show();
        $h("#form-group-valor").show();
        document.getElementById("btnsalvarpag").disabled = false;

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
            //$h("#form-group-Express").show();
        //}

    } else if (opt === '18') { //AJUSTE PEDIDO/TROCA
   $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-creditodebito").show();

        document.getElementById("btnsalvarpag").disabled = false;

       // if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
          //  $h("#form-group-Express").show();
       // }

    } else if (opt === '19') { //CREDITO DEFEITO

        document.getElementById("btnsalvarpag").disabled = false;
           $h("#valor").show();
        $h("#form-group-valor").show();
        $h("#form-group-numauto").show();
        alteraLabelAutorizacaoDocumento('Nº DOCUMENTO: ');
        $h("#form-group-for-defeito").show();
        $h("#defeito").show();

        //if (retornoLoja() === '2') { //SE FOR B2 HABILITA O CHECK EXPRESS
            //$h("#form-group-Express").show();
        //}

    } else {
        hideAllFormPagamento();
        document.getElementById("btnsalvarpag").disabled = true;
    }
    /*var check = $h("input[name='tipo3']:checked").val();
     if (check === '1') {
     $h("#form-group-revista").show();
     $h("#form-group-desc-basica").show();
     $h("#form-group-nome-prod").show();
     $h("#form-group-filtrar").show();
     $h("#form-group-ref-for").show();
     $h("#divDescBasConAutocomplete").show();
     $h("#form-group-cod-fornecedor").hide();
     
     $h("#conprodfor").val('');
     $h('#nomprod').val('');
     $h('#descBasConAutocomplete').val('');
     $h("#descitem").val('');
     $h("#refFor").val('');
     
     $h('#tableConProd tbody').html('');
     
     console.log($h("#form-group-cod-fornecedor"));
     } else {
     $h("#form-group-cod-fornecedor").show();
     $h("#form-group-desc-basica").show();
     $h("#divDescBasConAutocomplete").show();
     $h("#form-group-nome-prod").show();
     $h("#form-group-filtrar").show();
     $h("#form-group-ref-for").show();
     $h("#form-group-revista").hide();
     
     $h("#conprodfor").val('');
     $h("#descitem").val('');
     $h('#nomprod').val('');
     $h('#descBasConAutocomplete').val('');
     $h("#refFor").val('');
     
     $h('#tableConProd tbody').html('');
     }*/

});


function comboxfornecedordefeito(titulo, data, id, nome) {
    var combox = "<option></option>";
    var data = data.data;
    $h.each(data, function (key, values) {
        //console.log(values);
        combox = combox + "<option value=" + values.codigofab + ">" + values.fabricantes_nome +  "-" + values.codigofab + "</option>";
           });
    //console.log(combox);
    return combox;
}


function comboxvalorpagamento(titulo, data, id, nome) {
    var combox = "<option></option>";
    var data = data.data;
    $h.each(data, function (key, values) {
        //console.log(values);
        combox = combox + "<option value=" + values.forpag_cod + ">" + values.forpag_desc + "</option>";
    });
    //console.log(combox);
    return combox;
}

function comboxvalorbandeira(titulo, data, id, nome) {
    var combox = "<option></option>";
    var data = data.data;

    $h.each(data, function (key, values) {
        //$h.each(data, function (key, values) {
        combox = combox + "<option value=" + values.bancar_cod + ">" + values.bancar_cod + " - " + values.bancar_desc + "</option>";
    });
    //console.log(combox);
    return combox;
}


function comboxvalorlojas(titulo, data, id, nome) {
    var combox = "<option></option>";
    var data = data.data;

    $h.each(data, function (key, values) {
        //$h.each(data, function (key, values) {
        combox = combox + "<option value=" + values.loj_num + ">" + values.loj_nom + "</option>";
    });
    //console.log(combox);
    return combox;
}
function comboxvalorlojas1(titulo, data, id, nome) {
    var combox = "<option>Loja:</option>";
    var data = data.data;

    $h.each(data, function (key, values) {
        //$h.each(data, function (key, values) {
        combox = combox + "<option value=" + values.loj_num + ">" + values.loj_nom + "</option>";
    });
    //console.log(combox);
    return combox;
}


function alteraLabelAutorizacaoDocumento(texto) {
    document.getElementById("labelAutorizacaoDocumento").innerHTML = texto;
}


