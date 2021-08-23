<?php


include ("conexao.php");



switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $tipo = $_REQUEST ["tipo"];

        $caipagcod = $_REQUEST ["caipagcod"];
        $caipag_cpfcnpj = $_REQUEST ["caipag_cpfcnpj"];
        $caipag_data_caixa = $_REQUEST ["caipag_data_caixa"];        

        if ($tipo === '0') { //buscaPagamentoCaixa
            //var urll = urlJava() + 'caixapagamento/buscaPagamentoCaixa?caipag_cpfcnpj=' + cpfcnpj + '&caipag_data_caixa=' + databusca + '&loj_num=' + retornoLoja();
            buscaPagamentoCaixa($caipag_cpfcnpj, $caipag_data_caixa);
        } else if ($tipo === '1') { //excluirCaipagcod
            //var urll = urlJava() + 'caixapagamento/excluirCaipagcod?caipagcod=' + caipag_cod;
            excluirCaipagcod($caipagcod);
        } else if ($tipo === '2') { //erpBandeirasCartao
            //var urlbandeira = urlJava() + "erpBandeirasCartao?page=1&start=0&limit=25";
            erpBandeirasCartao();
        } else if ($tipo === '3') { //erpformaPagamento
            //var urlformapagamento = urlJava() + "erpformaPagamento?page=1&start=0&limit=25&forpagtip_cod=4";
            erpformaPagamento();
        }else if ($tipo === '4') { //verificar caixa fechado
            //var urlformapagamento = urlJava() + "erpformaPagamento?page=1&start=0&limit=25&forpagtip_cod=4";
            verificarCaixa($caipag_data_caixa);
        }else if ($tipo === '5') { //lojas
            //var urlformapagamento = urlJava() + "erpformaPagamento?page=1&start=0&limit=25&forpagtip_cod=4";
            erpLojas();
        } else {
            
        }
        break;
}

function verificarCaixa($caipag_data_caixa) {

    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "select case when contagem = 0 then 0 else 
    (SELECT distinct caipag_caixa_fechado FROM erp_caixa_pagamento where caipag_data_caixa::date = ':datacaixa' order by caipag_caixa_fechado desc limit 1) 
    end as caipag_caixa_fechado from 
    (SELECT count(caipag_caixa_fechado) as contagem FROM erp_caixa_pagamento where caipag_data_caixa::date = ':datacaixa' ) a";
    
    $sql = str_replace(":datacaixa",$caipag_data_caixa,$sql);
    
    $stmt = $conexao->prepare($sql);
    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
   
    echo json_encode($rows);
}

function buscaPagamentoCaixa($caipag_cpfcnpj, $caipag_data_caixa) {

    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "SELECT caipag_cod, erp_caixa_pagamento.forpag_cod, forpag_desc, caipag_cpfcnpj, caipag_data_caixa::date, loj_num, caipag_valor, caipag_valor_restante, caipag_valor_total, caipag_num_autorizacao,caipag_num_terminal, caipag_parcelas, erp_caixa_pagamento.bancar_cod, bancar_desc, caipag_lancado_valor_total, caipag_caixa_fechado, caipag_cod_fornecedor, caipag_desconto FROM erp_caixa_pagamento left join erp_forma_pagamento on erp_forma_pagamento.forpag_cod = erp_caixa_pagamento.forpag_cod left join erp_bandeiras_cartao on erp_bandeiras_cartao.bancar_cod = erp_caixa_pagamento.bancar_cod where caipag_cpfcnpj = ':cpfcnpj' and caipag_data_caixa::date = ':datacaixa' ";

    
    $sql = str_replace(":cpfcnpj",$caipag_cpfcnpj,$sql);
    $sql = str_replace(":datacaixa",$caipag_data_caixa,$sql);
    
    $stmt = $conexao->prepare($sql);
    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);

   
    echo json_encode($rows);
}


function excluirCaipagcod($caipagcod) {
    
    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "delete from erp_caixa_pagamento where caipag_cod = :caipagcod and caipag_caixa_fechado = 0" ;

    
    $sql = str_replace(":caipagcod", $caipagcod, $sql);


    $stmt = $conexao->prepare($sql);

    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
   
    echo json_encode($rows);
}


function erpBandeirasCartao() {
    
    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "SELECT bancar_cod, bancar_desc, bancar_datinc, bancar_datalt, bancar_usuinc, bancar_usualt FROM erp_bandeiras_cartao order by bancar_cod " ;
   
    //$sql = str_replace(":caipagcod", $caipagcod, $sql);

    $stmt = $conexao->prepare($sql);
 //return "{\"success\":true, \"msg\":\"" + caipag_cod + "\"}";
    $stmt->execute();
    //$rows['msg:Sucesso!,success:true,data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);

   
    echo json_encode($rows);
}

function erpLojas() {
    
    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "SELECT loj_num, loj_nom FROM erp_lojas where loj_ativo = 1 order by loj_num " ;
   
    //$sql = str_replace(":caipagcod", $caipagcod, $sql);

    $stmt = $conexao->prepare($sql);
 //return "{\"success\":true, \"msg\":\"" + caipag_cod + "\"}";
    $stmt->execute();
    //$rows['msg:Sucesso!,success:true,data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);

   
    echo json_encode($rows);
}

function erpformaPagamento() {
    
    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "SELECT forpag_cod, forpag_desc, forpag_moeda, nat_cod, forpag_datinc, forpag_datalt, forpag_usuinc, forpag_usualt FROM erp_forma_pagamento order by forpag_cod" ;
   
    //$sql = str_replace(":caipagcod", $caipagcod, $sql);

    $stmt = $conexao->prepare($sql);

    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
   
    echo json_encode($rows);
}


?>
