
<?php
include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			getProduto($_REQUEST['dataini'],$_REQUEST['datafim'],$_REQUEST['cpf'],$_REQUEST['fornecedor'],$_REQUEST['codvendedor'],$_REQUEST['nomclie']);
			break;
			
	}
function getProduto($datini,$datfim,$cpf,$codfab,$codven,$nomclie)

{
	
		$rows = array('data' => array());
	$conexao = getConn();
$sql = "SELECT distinct  entradas.documento, entradas.data, entradas.hora, codigovend, totaldesc, totalitens, totalgeral, entradas.operador, cancelado, alteracoes, 
bloqueado, tipo, origem,vendedores.nome from entradas inner join 
                                      ientrada on ientrada.documento = entradas.documento inner join vendedores on  vendedores.numero = codigovend ";


$sqlWhere = "where entradas.data>=':datini' and entradas.data<=':datfim' ";
$sqlWhere =  str_replace(":datini",$datini,$sqlWhere);
$sqlWhere =  str_replace(":datfim",$datfim,$sqlWhere);
 $sqlCpf ="";
  $sqlnome ="";
  $sqlcodvend ="";
  $sqlfor = "";
  
if($cpf > 0){

    $sqlCpf = " and doctoclie ilike '%+:cpf+%' ";
	$sqlCpf = str_replace(":cpf",$cpf,$sqlCpf);
	
}

if($codfab > 0){
	
     $sqlfor= " and codigofab = :codfab ";
	 $sqlfor = str_replace(":codfab",$codfab,$sqlfor);
	
}

if(strlen($nomclie) > 1){
	
     $sqlnome= " and nomeclie ilike '%:nomecli%'  ";
	 $sqlnome = str_replace(":nomecli",$nomclie,$sqlnome);
	
}

if($codven > 0){
	
     $sqlcodvend= " and codigovend::varchar ilike '%:codigoven%'  ";
	 $sqlcodvend = str_replace(":codigoven",$codven,$sqlcodvend);
	
}

$sql = $sql.$sqlWhere.$sqlCpf.$sqlcodvend.$sqlfor.$sqlnome;

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