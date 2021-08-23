
<?php

function getConn()
{
 try {
   return  new PDO("pgsql:host=192.168.0.251 dbname=bd_babita user=postgres password=09182736");
 } catch (PDOException  $e) {
    print $e->getMessage();
 }
}
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			getProduto($_REQUEST['data'],$_REQUEST['loja']);
			break;
			
	}
function getProduto($data,$loja)

{
	$conexao = getConn();

$sql = "select coalesce(q.doctoclie,g.doctoclie) as docto_cli, coalesce(q.nomeclie,g.nomeclie) as nome_cli, q.valor_total_pedidos, g.valor_total_trocas, " .
    "( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0)) as valor_total from (" .
    "select erp_pedidos.nomeclie," .
    "sum(erp_pedidos.totalgeral) as valor_total_pedidos,".
    "erp_pedidos.doctoclie " .
    "from erp_pedidos where erp_pedidos.data =:dat and erp_pedidos.loja_origem:lo group by  nomeclie," .
    "erp_pedidos.doctoclie) as q full join " .
    "(select erp_trocas.nomeclie," .
    "sum(erp_trocas.totalgeral) as valor_total_trocas," .
    "erp_trocas.doctoclie " .
    "from erp_trocas where  erp_trocas.data =:dat and erp_trocas.loja_origem=:lo  group by erp_trocas.nomeclie,".
    "erp_trocas.doctoclie) as g on g.doctoclie = q.doctoclie;";

$stmt = $conexao->prepare($sql);
$stmt->bindParam("lo",$loja);
$stmt->bindParam("dat",$data);
$stmt->execute();
$produto = $stmt->fetchObject();

$rs = $produto;

while($row = $rs->fetch(PDO::FETCH_OBJ)){ 

   echo $row -> docto_cli;

}


echo json_encode($produto);
}

?>