<?php

include("conexao.php");

fornecedores();

function fornecedores() {

 
    $conexao = getConn();
    //$conexao = getConnGeral('192.99.210.173', 'bd_think', 'postgres','devBabitaNovo08062017');

$sql="SELECT distinct codigofab, erp_fabricantes.fabricantes_nome
  FROM ientrada
inner join erp_fabricantes on ientrada.codigofab = erp_fabricantes.fabricantes_id
where data >= current_date - 360 order by erp_fabricantes.fabricantes_nome";


//echo $sql;
 $rows = array('data' => array());

    $stmt = $conexao->prepare($sql);
    $stmt->execute();
    $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
   
    echo json_encode($rows); 

}


?>