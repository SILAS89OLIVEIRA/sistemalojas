<?php

include ("conexao.php");



switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $caiobs_data_obs = $_REQUEST ["caiobs_data_obs"];
        $caiobs_num_loja = $_REQUEST ["caiobs_num_loja"];
        $caiobs_observacao = $_REQUEST ["caiobs_observacao"];
        $tipo = $_REQUEST["tipo"];

        if($tipo == 1){

        consulta($caiobs_data_obs, $caiobs_num_loja,1);
        }else{

        insertCaixa($caiobs_data_obs, $caiobs_num_loja, $caiobs_observacao);
        }
break;
}

function insertCaixa($caiobs_data_obs, $caiobs_num_loja, $caiobs_observacao) {

    $rows = array('data' => array());
    $conexao = getConn();

    $rows = consulta($caiobs_data_obs, $caiobs_num_loja, $caiobs_observacao,0);
    $sql = "";

    if(count($rows) > 0){
     
      $sql="update erp_caixa_obs set caiobs_observacao='".$caiobs_observacao."',caiobs_datalt=now() where caiobs_data_obs='".$caiobs_data_obs."'";
    
  }else{
    $sql = "INSERT INTO erp_caixa_obs(caiobs_datainc, caiobs_datalt,caiobs_num_loja, caiobs_observacao, caiobs_data_obs)
    VALUES (NOW(),NOW(),'".$caiobs_num_loja."','".$caiobs_observacao."', '".$caiobs_data_obs."')";
}
//echo  $sql;

    $stmt = $conexao->prepare($sql);

    $stmt->execute();


    echo json_encode("SUCESSO");
}

function consulta($caiobs_data_obs, $caiobs_num_loja,$tipo) {

    $rows = array('data' => array());
    $conexao = getConn();


    $sql = "select * from erp_caixa_obs where caiobs_data_obs='".$caiobs_data_obs."'";

//echo  $sql;

    $stmt = $conexao->prepare($sql);

    $stmt->execute();
     $rows = $stmt->fetchAll(PDO::FETCH_OBJ);

if($tipo == 0){
  
   return $rows;
    
 }else{

echo json_encode( $rows); 
}
    
}

?>
