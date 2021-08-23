<?php
// RECEBENDO OS DADOS PREENCHIDOS DO FORMULÁRIO !

include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
		
	
			vendedores();
			break;
			
	}
function vendedores(){
			 
			 
$conexao = getConn();


try{
	
	//$erro = $stmt->error;

	$sqlsel = "SELECT id, numero, UPPER(nome) as nome
  FROM vendedores order by nome;
";
  
	$stmtsel = $conexao->prepare($sqlsel);
	$stmtsel->execute();
	//echo $erro;
	$rows = $stmtsel->fetchAll(PDO::FETCH_OBJ);
     echo json_encode($rows);
} catch (Exception $e) {
     print $e->getMessage();
 }


	
}

//mensagem que é escrita quando os dados são inseridos normalmente.
?>