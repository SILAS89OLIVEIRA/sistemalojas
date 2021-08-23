<?php

include ("conexao.php");



switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        //$caipagcod = $_REQUEST ["caipagcod"];
        $forpag_cod = $_REQUEST ["forpag_cod"];
        $caipag_cpfcnpj = $_REQUEST ["caipag_cpfcnpj"];
        $caipag_data_caixa = $_REQUEST ["caipag_data_caixa"];
        $caipag_valor = $_REQUEST ["caipag_valor"];
        $caipag_valor_total = $_REQUEST ["caipag_valor_total"];
        $caipag_num_autorizacao = $_REQUEST ["caipag_num_autorizacao"];
        $caipag_num_terminal = $_REQUEST ["caipag_num_terminal"];
        $caipag_parcelas = $_REQUEST ["caipag_parcelas"];
        $bancar_cod = $_REQUEST ["bancar_cod"];
        $caipag_cod_fornecedor = $_REQUEST ["caipag_cod_fornecedor"];
        $desconto = $_REQUEST ["desconto"];
        $caipag_loja_parceira = $_REQUEST ["caipag_loja_parceira"];
        $caipag_nomeclie = $_REQUEST ["caipag_nomeclie"];
        $loj_num = $_REQUEST ["loj_num"];
        $caipag_express = $_REQUEST ["caipag_express"];
        $caipag_datacartao = $_REQUEST ["caipagdata"];
        $caipag_horacartao = $_REQUEST ["caipaghora"];
        $caipag_frete = $_REQUEST ["caipagfrete"];
        $desconto_valor = $_REQUEST ["descontovalor"];
        $loja_parceira_cartao = $_REQUEST ["lojaparceiracartao"];
        $caipag_cpfcnpj_cartao = $_REQUEST ["caipag_cpfcnpj_cartao"];  
        $caipag_acrescimo = $_REQUEST ["caipag_acrescimo"];
        $caipag_valor_acrescimo = $_REQUEST ["caipag_valor_acrescimo"];
        $caipag_fab_defeito = $_REQUEST ["caipag_fab_defeito"];
        
        
        

        insertPagamento($forpag_cod, $caipag_cpfcnpj, $caipag_data_caixa, $caipag_valor, $caipag_valor_total, $caipag_num_autorizacao, $caipag_num_terminal,$caipag_parcelas, $bancar_cod, 
                $caipag_cod_fornecedor, $desconto, $caipag_loja_parceira, $caipag_nomeclie, $loj_num, $caipag_express,$caipag_datacartao,$caipag_horacartao,$caipag_frete,$desconto_valor,$loja_parceira_cartao,$caipag_cpfcnpj_cartao,$caipag_acrescimo,$caipag_valor_acrescimo,$caipag_fab_defeito);
        break;
}



function insertPagamento($forpag_cod, $caipag_cpfcnpj, $caipag_data_caixa, $caipag_valor, $caipag_valor_total, $caipag_num_autorizacao,$caipag_num_terminal, $caipag_parcelas, $bancar_cod, 
        $caipag_cod_fornecedor, $desconto, $caipag_loja_parceira, $caipag_nomeclie, $loj_num, $caipag_express,$caipag_datacartao,$caipag_horacartao,$caipag_frete,$desconto_valor,$loja_parceira_cartao,$caipag_cpfcnpj_cartao, $caipag_acrescimo,$caipag_valor_acrescimo,$caipag_fab_defeito) {

    $rows = array('data' => array());
    $conexao = getConn();

    //$caipag_valor = str_replace(',', '.', $caipag_valor);
    //$caipag_valor_total = str_replace(',', '.', $caipag_valor_total);

 //  echo $caipag_frete;
   $sql = "INSERT INTO erp_caixa_pagamento(forpag_cod, caipag_cpfcnpj, caipag_data_caixa, 
caipag_valor, caipag_valor_total, caipag_num_autorizacao,caipag_num_terminal, caipag_parcelas, "
            . "bancar_cod, caipag_cod_fornecedor, caipag_desconto, caipag_loja_parceira, caipag_nomeclie, caipag_caixa_fechado,caipag_datinc, caipag_datalt, loj_num, caipag_express,
			caipag_data_cartao, caipag_hora_cartao,caipag_frete,caipag_valor_desconto,caipag_loja_parceira_cartao, caipag_cpfcnpj_cartao,caipag_acrescimo,caipag_valor_acrescimo,caipag_fab_defeito) VALUES (" . $forpag_cod . ", '" . $caipag_cpfcnpj . "','" . $caipag_data_caixa . "', "
            . "" . $caipag_valor . ", " . $caipag_valor_total . ", '" . $caipag_num_autorizacao . "','" . $caipag_num_terminal . "', " .
 $caipag_parcelas . "," . $bancar_cod . ", " . $caipag_cod_fornecedor . ", " . $desconto . ", '" . 
$caipag_loja_parceira . "' , '" . $caipag_nomeclie . "' , 0, NOW(), NOW(), " . $loj_num . ", " . $caipag_express . "". ", '" . $caipag_datacartao . "' , '" . $caipag_horacartao . "', ".$caipag_frete.",".$desconto_valor.", ".$loja_parceira_cartao.", '".$caipag_cpfcnpj_cartao."', " . $caipag_acrescimo . ",".$caipag_valor_acrescimo.",'" . $caipag_fab_defeito . "')";

//echo $sql;

    $stmt = $conexao->prepare($sql);

    $stmt->execute();

    
    echo json_encode("SUCESSO");
}

?>
