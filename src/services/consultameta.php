<?php
// RECEBENDO OS DADOS PREENCHIDOS DO FORMULÁRIO !

include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
	
	//http://localhost/cadastrometa.php?codvend=165&valmetpar=12&valmetrev=1251&valmetaces=125&periodoini=2016-05-05&periodofim=2016-05-02&usuario=1
	
			consultatMeta($_REQUEST['status']);
			break;
			
	}
function consultatMeta($status){
			 
			 
$conexao = getConn();
$rows = array('data' => array());


try{
	
	
	$sqlsel = "SELECT   met_valacesmen ,
  met_valrevmen ,
  met_valparmen,met_cod, TO_CHAR(met_periodo_ini,'DD-MM-YYYY') as met_periodo_ini, TO_CHAR(met_periodo_fim, 'DD-MM-YYYY') as met_periodo_fim, met_valrev, met_datinc, 
       met_usuinc, met_usualt, met_datalt, ven_cod, met_valpar, met_valaces,nome,case when(met_status = 0) then 'DESATIVADO' else 'ATIVADO' end as status
  FROM metas a inner join 
        vendedores b on a.ven_cod = b.numero  where met_status = ".$status." order by met_cod desc;";
		
	
	$stmtsel = $conexao->prepare($sqlsel);
	$stmtsel->execute();
	//echo $erro;
	$rows['data'] = $stmtsel->fetchAll(PDO::FETCH_OBJ);
     echo json_encode($rows);
} catch (Exception $e) {
     print $e->getMessage();
 }


	
}

//mensagem que é escrita quando os dados são inseridos normalmente.
?>