<?php

ini_set('max_execution_time', 120000000);

if(isset($_GET['acao'])){
  switch($_GET['acao']){
    case 'buscar_docs':
      print_r(buscarDocs($_GET['cpfcnpj'],$_GET['loja']));
      //http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=buscar_docs&cpfcnpj=00005433973603&loja=2
      break;
    case 'ver_disp_tro_prod':
      print_r(verificarDisponibilidadeProdutos($_GET['doc'],$_GET['loja']));
      //http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=ver_disp_tro_prod&doc=5160&loja=2
      break;
    case 'ver_disp_tro_rev':
      print_r(verificarDisponibilidadeRevistas($_GET['doc'],$_GET['loja']));
      //http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=ver_disp_tro_rev&doc=5160&loja=2
      break;
    case 'ver_disp_tro_prom':
      print_r(verificarDisponibilidadePromocao($_GET['doc'],$_GET['loja']));
      //http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=ver_disp_tro_prom&doc=5160&loja=2
      break;
    case 'novo_buscar_docs':
      print_r(novoBuscarDocs($_GET['cpfcnpj'],$_GET['loja']));
      //http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=novo_buscar_docs&cpfcnpj=25228290000156&loja=2
      break;
    default:
      print_r('');
      //
      break;
  }
}

//function buscarDocs($cpf_cnpj,$loja){
//  require ("conexao.php");
//  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
//  $sql = "SELECT 
//    loja_origem, 
//    documento, 
//    data, 
//    hora, 
//    codigovend, 
//    doctoclie, 
//    nomeclie, 
//    totaldesc, 
//    totalacre, 
//    totalitens, 
//    totalgeral, 
//    operador, 
//    cancelado, 
//    desc_vista, 
//    alteracoes, 
//    bloqueado, 
//    notaemitida, 
//    documentos_lote
//  FROM erp_pedidos
//  WHERE doctoclie = lpad(replace(replace(replace('$cpf_cnpj','.',''),'-',''),'/',''),14,'0')
//  AND loja_origem = $loja;";
//  //echo "<pre>";print_r($sql);echo "</pre>"; exit;
//  $stmt = $conexao->prepare($sql);
//  if( $stmt->execute() ){
//    $rows['success'] = true;
//  } else {
//    $rows['success'] = false;
//    echo "<pre>";print_r($sql);echo "</pre>";
//  }
//  $rows['data'] = $stmt->fetchAll(PDO::FETCH_OBJ);
//  return json_encode($rows);  
//}

function novoBuscarDocs($cpf_cnpj,$loja){
  require ("conexao.php");
  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "select distinct on(erp_ipedidos.documento) 
  id_ipedidos, erp_ipedidos.documento, erp_ipedidos.loja_origem, produtos_num_fornecedor, produtos_num_item, doctoclie, retira_acentuacao(produtos_descricao) as produtos_descricao
  from erp_ipedidos
  inner join erp_produtos 
  on codigofab::integer = produtos_num_fornecedor
  and codigopro::integer = produtos_num_item
  inner join erp_revistas 
  on id_revista = revistas_id
  inner join erp_pedidos on erp_ipedidos.documento = erp_pedidos.documento
  where (current_date - erp_ipedidos.data) <= produtos_tempotroca
  and (current_date - erp_ipedidos.data) <= revistas_tempotroca
  and desconto = 0
  and erp_ipedidos.loja_origem = 2
  and doctoclie = '25228290000156'";
  $stmt = $conexao->prepare($sql);
  $stmt->execute();
  $linhas = $stmt->fetchAll();
  if(sizeof($linhas) > 0){
    $rows['trocavel'] = 'true';
  }
  $rows['data'] = $linhas;
  return json_encode($rows);
}

function buscarDocs($cpf_cnpj,$loja){
  require ("conexao.php");
  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "SELECT 
    documento 
  FROM erp_pedidos
  WHERE doctoclie = lpad(replace(replace(replace('$cpf_cnpj','.',''),'-',''),'/',''),14,'0')
  AND loja_origem = $loja;";
  //echo "<pre>";print_r($sql);echo "</pre>"; exit;
  $stmt = $conexao->prepare($sql);
  $stmt->execute();
  $linhas = $stmt->fetchAll();
  $docs = [];
  foreach($linhas as $linha){
    $docs[] = $linha[0];
  }
  //echo "<pre>";print_r($docs);echo "</pre>";
  $docsTrocaveis = [];
  foreach($docs as $doc){
    //echo "<pre>";print_r(verificarDisponibilidadeProdutos($doc,$loja));echo "</pre>";
    if(verificarDisponibilidadeProdutos($doc,$loja) == 'true'){
      //echo "<pre>";print_r(verificarDisponibilidadeRevistas($doc,$loja));echo "</pre>";
      if(verificarDisponibilidadeRevistas($doc,$loja) == 'true'){
        //echo "<pre>";print_r(verificarDisponibilidadePromocao($doc,$loja));echo "</pre>";
        if(verificarDisponibilidadePromocao($doc,$loja) == 'true'){
          $docsTrocaveis[] = $doc;
          $rows['trocavel'] = 'true';
        }
      }
    }
  }
  $rows['data'] = $docsTrocaveis;
  return json_encode($rows);  
}

function listarDocs($doc,$loja){
  //require ("conexao.php");
  //$conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "select id_ipedidos, documento, loja_origem, produtos_num_fornecedor, produtos_num_item 
  from erp_ipedidos
  inner join erp_produtos 
  on codigofab::integer = produtos_num_fornecedor
  and codigopro::integer = produtos_num_item
  where (current_date - data) <= produtos_tempotroca
  and documento = $doc
  and loja_origem = $loja
  ";
  $stmt = $conexao->prepare($sql);
  if($stmt->execute()){
    $rows['success'] = true;
    $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
    $rows['data'] = $dados;
  } else {
    $rows['success'] = false;
    echo "<pre>";print_r($sql);echo "</pre>";
  }
  return json_encode($rows); 
}

function verificarDisponibilidadeProdutos($doc,$loja){
  //require ("conexao.php");
  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "select id_ipedidos, documento, loja_origem, produtos_num_fornecedor, produtos_num_item 
  from erp_ipedidos
  inner join erp_produtos 
  on codigofab::integer = produtos_num_fornecedor
  and codigopro::integer = produtos_num_item
  where (current_date - data) <= produtos_tempotroca
  and documento = $doc
  and loja_origem = $loja
  ";
  $stmt = $conexao->prepare($sql);
  $status = 'false';
  if( $stmt->execute() ){
    $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
    if(sizeof($dados) > 0){
      $status = 'true';
      //print_r($dados);
    }
  }
  return $status; 
}

function verificarDisponibilidadeRevistas($doc,$loja){
  //require ("conexao.php");
  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "select id_ipedidos, documento, loja_origem, revistas_id 
  from erp_ipedidos
  inner join erp_revistas 
  on id_revista = revistas_id
  where (current_date - data) <= revistas_tempotroca
  and documento = $doc
  and loja_origem = $loja
  ";
  $stmt = $conexao->prepare($sql);
  $status = 'false';
  if( $stmt->execute() ){
    $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
    if(sizeof($dados) > 0){
      $status = 'true';
      //print_r($dados);
    }
  }
  return $status;
}

function verificarDisponibilidadePromocao($doc,$loja){
  //require ("conexao.php");
  $conexao = getConnGeral('192.168.0.251','bd_babita','postgres','//DevTecBab09182736!//');
  $sql = "select id_ipedidos, documento, loja_origem
  from erp_ipedidos
  where desconto = 0
  and documento = $doc
  and loja_origem = $loja
  ";
  $stmt = $conexao->prepare($sql);
  $status = 'false';
  if( $stmt->execute() ){
    $dados = $stmt->fetchAll(PDO::FETCH_OBJ);
    if(sizeof($dados) > 0){
      $status = 'true';
      //print_r($dados);
    }
  }
  return $status;
}

?>