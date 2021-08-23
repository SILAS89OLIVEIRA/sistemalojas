
<?php

include ("conexao.php");
//chama o arquivo de conexão com o bd
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getProduto($_REQUEST['dataini'], $_REQUEST['datafim']);
        break;
}

function getProduto($datini, $datfim) {

    $rows = array('data' => array());
    $conexao = getConn();
    $sql = "SELECT tipo, documento, data, hora, codigovend, operador, vendedores.nome
    FROM cancelamentos
    left join vendedores on  vendedores.numero = codigovend ";

    $sqlWhere = " where data::date between ':datini' and ':datfim' order by data desc";
    $sqlWhere = str_replace(":datini", $datini, $sqlWhere);
    $sqlWhere = str_replace(":datfim", $datfim, $sqlWhere);

    $sql = $sql . $sqlWhere;

    $stmt = $conexao->prepare($sql);

    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($rows);
}

?>