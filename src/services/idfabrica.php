
<?php

include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			getProduto($_REQUEST['documento']);
			break;
			
	}
function getProduto($documento)

{
	$rows = array('data' => array());
	$conexao = getConn();
$sql = "SELECT documento, codigofab, codigopro, codigobas, qtde, prcbasico, 
       desconto, prcvenda, operador, data, hora, grupo, (qtde *prcvenda) as total
  FROM idfabric where documento =:docu;";

	
	$sql = str_replace(":docu",$documento,$sql);

	//echo $sql ;
$stmt = $conexao->prepare($sql);

$stmt->execute();
$rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
/*
$options = array(
    'http' => array(
        'protocol_version' => '1.0',
        'method' => 'GET'
    )
);
$context = stream_context_create($options);*/
            // Realize comunicação com o servidor
         
		// $json=json_decode(file_get_contents($rows,false,$context),true);  //Parser da resposta Json
echo json_encode($rows);
}

?>