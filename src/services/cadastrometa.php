<?php
// RECEBENDO OS DADOS PREENCHIDOS DO FORMULÁRIO !

include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
		
		
        $valmetpar = $_REQUEST["valmetpar"];
        $valmetrev = $_REQUEST["valmetrev"];
        $valmetaces = $_REQUEST["valmetaces"];
        $periodoini = $_REQUEST["periodoini"];
        $periodofim = $_REQUEST["periodofim"];
		$usuario = $_REQUEST["usuario"];
		$codvend = $_REQUEST["codvend"];
		$total = $_REQUEST["total"];
	//http://localhost/cadastrometa.php?codvend=165&valmetpar=12&valmetrev=1251&valmetaces=125&periodoini=2016-05-05&periodofim=2016-05-02&usuario=1
	
			insertMeta($codvend,
        $valmetpar,
        $valmetrev,
        $valmetaces,
        $periodoini,
         $periodofim,
		 $usuario,
		 $total);
			break;
			
	}
function insertMeta($codvend,
        $valmetpar,
        $valmetrev,
        $valmetaces,
        $periodoini,
         $periodofim,
		 $usuario,
		 $total){
			 
			 
$conexao = getConn();
$rows = array('data' => array());

        $valmetpar1 = str_replace(',','.',$valmetpar);
		//echo $valmetpar1;
        $valmetrev1 = str_replace(',','.',$valmetrev);
		//echo $valmetrev1;
        $valmetaces1 = str_replace(',','.',$valmetaces);
	//	echo $valmetaces1;
	        $total = str_replace(',','.',$total);
	//	echo $total;
		
$sql = "INSERT INTO metas(
            met_periodo_ini, met_periodo_fim, met_valrevmen, met_datinc, 
            met_usuinc, met_usualt, met_datalt, ven_cod, met_valparmen, met_valacesmen,met_total)
    VALUES ('".$periodoini."', '".$periodofim."','".$valmetrev1."',now(), 
           ".$usuario.",".$usuario.", now(),".$codvend.",".$valmetpar1.", ".$valmetaces1.",".$total.");
";

//

$stmt = $conexao->prepare($sql);
$stmt->execute();
	
$sqlupdate1 = "UPDATE metas set met_valrev = ROUND(met_valrevmen/quantosdiasmesnovoperiodo(1,30,(date_part('month','".$periodoini."'::date))::varchar, date_part('year','".$periodoini."'::date)::varchar)),
                 met_valpar = ROUND(met_valparmen/quantosdiasmesnovoperiodo(1,30,(date_part('month','".$periodoini."'::date))::varchar, date_part('year','".$periodoini."'::date)::varchar)),              
                 met_valaces = ROUND(met_valparmen/quantosdiasmesnovoperiodo(1,30,(date_part('month','".$periodoini."'::date))::varchar, date_part('year','".$periodoini."'::date)::varchar))
WHERE ven_cod=".$codvend." and date_part('month',met_periodo_ini) =  date_part('month','".$periodoini."'::date)
and date_part('year',met_periodo_ini) =  date_part('year','".$periodoini."'::date); ";


	//echo $sqlupdate1 ;
$stmtupdate1 = $conexao->prepare($sqlupdate1);
$stmtupdate1->execute();
	
$sqlupdate = "UPDATE metas
   SET  met_status=0
 WHERE met_cod < (SELECT met_cod
  FROM metas where ven_cod=".$codvend."and met_datinc::date <=now()  and met_status=1 order by met_cod desc limit 1
) and ven_cod=".$codvend." and met_status=1 and date_part('month',met_periodo_ini) =  date_part('month','".$periodoini."'::date));";


	//echo $sqlupdate ;
$stmtupdate = $conexao->prepare($sqlupdate);
$stmtupdate->execute();


try{
	
	//$erro = $stmt->error;

	
	$sqlsel = "SELECT   met_valacesmen ,
  met_valrevmen ,
  met_valparmen,met_cod, TO_CHAR(met_periodo_ini,'DD-MM-YYYY') as met_periodo_ini, TO_CHAR(met_periodo_fim, 'DD-MM-YYYY') as met_periodo_fim, met_valrev, met_datinc, 
       met_usuinc, met_usualt, met_datalt, ven_cod, met_valpar, met_total,met_valaces,nome,case when(met_status = 0) then 'DESATIVADO' else 'ATIVADO' end as status
  FROM metas a inner join 
        vendedores b on a.ven_cod = b.numero  WHERE met_status = 1  and date_part('month',met_periodo_ini) =  date_part('month','".$periodoini."'::date))  order by met_cod desc;";
    
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