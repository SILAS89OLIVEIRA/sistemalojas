<?php

include ("conexao.php");
//chama o arquivo de conexão com o bd

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getProduto($_REQUEST['data']);
        break;
}

function getProduto($data) {
    $conexao = getConn();
    $sql =  "select  sum(q.valor_total_pedidos) as valor_total_pedidos, sum(g.valor_total_trocas) as valor_total_trocas, " .
            "sum(( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0))) as valor_total from (" .
            "select pedidos.nomeclie," .
            "sum(pedidos.totalgeral) as valor_total_pedidos," .
            "pedidos.doctoclie " .
            "from pedidos where pedidos.data =':dat'  group by  nomeclie," .
            "pedidos.doctoclie) as q full join " .
            "(select trocas.nomeclie," .
            "sum(trocas.totalgeral) as valor_total_trocas," .
            "trocas.doctoclie " .
            "from trocas where  trocas.data =':dat'   group by trocas.nomeclie," .
            "trocas.doctoclie) as g on g.doctoclie = q.doctoclie;";


    $sql = str_replace(":dat", $data, $sql);
    //$sql = str_replace(":lo",$loja,$sql);
    //echo $sql ;
    $stmt = $conexao->prepare($sql);

    $stmt->execute();
    $produto = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($produto);
}

?>