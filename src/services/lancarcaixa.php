<?php

include ("conexao.php");



switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $data = $_REQUEST ["data"];
        $loj_num = $_REQUEST ["loj_num"];
        insertCaixa($data, $loj_num);
        break;
}

function insertCaixa($data, $loj_num) {

    $rows = array('data' => array());
    $conexao = getConn();


    $sql = "INSERT INTO erp_caixa_loja_fechado( " .
           " caifec_data_caixa, loj_num, caifec_valor_total, caifec_lancado_loja, " .
           " caifec_lancado_cloud, caifec_datinc, caifec_datalt) " .
           " VALUES ('". $data ."', ". $loj_num .", (select sum(caipag_valor)::numeric(11,2) from erp_caixa_pagamento " .
           " where caipag_data_caixa::date = '". $data ."' and caipag_caixa_fechado = 0), 1, " .
           " 0, NOW(), NOW() ) ";

    /*$sql = str_replace(":dat", $data, $sql);

    $sql = str_replace(":loja_numero", $loj_num, $sql);*/

    $stmt = $conexao->prepare($sql);

    $stmt->execute();

    $rows2 = array('data' => array());
    $conexao2 = getConn();

    $sql2 = "update erp_caixa_pagamento set caipag_caixa_fechado = 1, caipag_datalt = NOW() where caipag_data_caixa = ':dat' and caipag_caixa_fechado = 0 ";

    $sql2 = str_replace(":dat", $data, $sql2);

    $stmt2 = $conexao2->prepare($sql2);

    $stmt2->execute();

    echo json_encode("SUCESSO");
}

?>
