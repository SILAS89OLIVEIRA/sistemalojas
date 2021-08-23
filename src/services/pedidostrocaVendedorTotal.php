
<?php

include ("conexao.php");

	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			getProduto($_REQUEST['data']);
			break;
			
	}
function getProduto($data)

{

$conexao = getConn();
$sql = "select  coalesce(q.nomven,g.nomven) as nomven, sum(q.valor_total_pedidos) as valor_total_pedidos, sum(g.valor_total_trocas) as valor_total_trocas,
    sum(( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0))) as valor_total from (
    select pedidos.codigovend ||' - '||nome as nomven,
    sum(pedidos.totalgeral) as valor_total_pedidos,
    pedidos.doctoclie ,
	pedidos.codigovend
    from pedidos 
left join
         vendedores on numero = codigovend 
where pedidos.data =':dat'  group by  pedidos.codigovend,nome,
    pedidos.doctoclie) as q full join
    (select trocas.codigovend ||' - '||nome as nomven,
    sum(trocas.totalgeral) as valor_total_trocas,
    trocas.doctoclie,
	trocas.codigovend
    from trocas left join
         vendedores on numero = codigovend where  trocas.data =':dat'   group by trocas.nomeclie,trocas.codigovend,nome,
    trocas.doctoclie) as g on q.codigovend = g.codigovend and q.doctoclie = g.doctoclie group by coalesce(q.nomven,g.nomven) order by valor_total desc;";

	
	$sql = str_replace(":dat",$data,$sql);
	//$sql = str_replace(":lo",$loja,$sql);
	//echo $sql ;
$stmt = $conexao->prepare($sql);

$stmt->execute();
$produto = $stmt->fetchAll(PDO::FETCH_OBJ);

echo json_encode($produto);
}

?>