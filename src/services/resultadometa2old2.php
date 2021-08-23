<?php
// RECEBENDO OS DADOS PREENCHIDOS DO FORMULÁRIO !

include ("conexao.php");
	//chama o arquivo de conexão com o bd

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
	
			resultadoMeta($_REQUEST['data']);
			break;
			
	}
function resultadoMeta($data){
			 
			 
$conexao = getConn();
$rows = array('data' => array());


try{
	
	$sqlfornecedor = "SELECT fv_fabricantes_id
  FROM erp_fabricantes_vinculado where (fv_vinculacao_id = 311 or fv_vinculacao_id = 485)";
  	$stmtfor = $conexao->prepare($sqlfornecedor);
	$stmtfor->execute();
$cont = 0;
$fornecedoresacessorios = "";
$row = $stmtfor->fetchAll();
          while(count($row) > $cont){
			  
	       //  echo count($row)."asd";
		     if($cont < 1){
				
				  $fornecedoresacessorios = $row[$cont]['fv_fabricantes_id'];
				
			 }
             $fornecedoresacessorios = $fornecedoresacessorios.",".$row[$cont]['fv_fabricantes_id'];
		    // echo $fornecedoresacessorios;
			 $cont++;
		  }
		  
	$sqlfornecedorrevista = "SELECT fabricantes_id FROM erp_fabricantes where fabricantes_revista = 0";
  	$stmtfor = $conexao->prepare($sqlfornecedorrevista);
	$stmtfor->execute();
$cont = 0;
$fornecedorrevista = "";
$row = $stmtfor->fetchAll();
          while(count($row) > $cont){
			  
	       //  echo count($row)."asd";
		     if($cont < 1){
				
				  $fornecedorrevista = $row[$cont]['fabricantes_id'];
				
			 }
             $fornecedorrevista = $fornecedorrevista.",".$row[$cont]['fabricantes_id'];
		    // echo $fornecedoresacessorios;
			 $cont++;
		  }	  
		   
 

	$sqlsel = "select vennomven, 

coalesce(acessoriosvalor_total_pedidos,0) as acessoriosvalor_total_pedidos,
coalesce(acessoriosvalor_total_trocas,0) as acessoriosvalor_total_trocas,
coalesce(acessoriosvalor_total,0) as acessoriosvalor_total,
coalesce(revistavalor_total_pedidos,0) as revistavalor_total_pedidos,
coalesce(revistavalor_total_trocas,0) as revistavalor_total_trocas,
coalesce(revistavalor_total,0) as revistavalor_total,
coalesce(paralelovalor_total_pedidos,0) as paralelovalor_total_pedidos,
coalesce(paralelovalor_total_trocas,0) as paralelovalor_total_trocas,
coalesce(paralelovalor_total,0) as paralelovalor_total,
coalesce(met_valrev,0) as met_valrev, 
coalesce(met_valpar,0) as met_valpar,
coalesce(met_valaces,0) as met_valaces from 
(select numero ||' - '||nome as vennomven from vendedores)vendedores left join
(select * from (
select  coalesce(q.nomven,g.nomven) as acessoriosnomven, 
coalesce(sum(q.valor_total_pedidos),0) as acessoriosvalor_total_pedidos, 
coalesce(sum(g.valor_total_trocas),0) as acessoriosvalor_total_trocas,
    sum(( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0))) as acessoriosvalor_total 

    from (
    select pedidos.codigovend ||' - '||nome as nomven,
    sum(ipedidos.qtde * prcvenda) as valor_total_pedidos
    from ipedidos  inner join
         pedidos on ipedidos.documento = pedidos.documento 
 
full join
         vendedores on numero = codigovend 
where pedidos.data ='".$data."'  and  codigofab in (".$fornecedoresacessorios.") group by  pedidos.codigovend,nome,
    pedidos.doctoclie) as q full join
    (select trocas.codigovend ||' - '||nome as nomven,
    coalesce(sum(itrocas.qtde * prcvenda),0) as valor_total_trocas
    from trocas inner join
         itrocas on trocas.documento = itrocas.documento full join
         vendedores on numero = codigovend where  trocas.data ='".$data."'  and  codigofab in (".$fornecedoresacessorios.")  group by trocas.nomeclie,trocas.codigovend,nome,
    trocas.doctoclie) as g on g.nomven = q.nomven group by coalesce(q.nomven,g.nomven) order by acessoriosvalor_total desc)acessorios)acessorios on vennomven =  acessorios.acessoriosnomven left join
    (select * from (select  coalesce(q.nomven,g.nomven) as revistanomven, 
      coalesce(sum(q.valor_total_pedidos),0) as revistavalor_total_pedidos,
      coalesce(sum(g.valor_total_trocas),0) as revistavalor_total_trocas,
    sum(( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0))) as revistavalor_total from (
    select pedidos.codigovend ||' - '||nome as nomven,
    sum(ipedidos.qtde * prcvenda) as valor_total_pedidos
    from ipedidos  inner join
         pedidos on ipedidos.documento = pedidos.documento 
 
full join
         vendedores on numero = codigovend 
where pedidos.data ='".$data."'  and  codigofab in (".$fornecedoresacessorios.") and codigofab not in (SELECT fabricantes_id
  FROM erp_fabricantes where fabricantes_revista = 0
) group by  pedidos.codigovend,nome,
    pedidos.doctoclie) as q full join
    (select trocas.codigovend ||' - '||nome as nomven,
    sum(itrocas.qtde * prcvenda) as valor_total_trocas
    from trocas inner join
         itrocas on trocas.documento = itrocas.documento full join
         vendedores on numero = codigovend where  trocas.data ='".$data."'  and  codigofab not in (".$fornecedoresacessorios.") and codigofab in (".$fornecedorrevista.") group by trocas.nomeclie,trocas.codigovend,nome,
    trocas.doctoclie) as g on g.nomven = q.nomven group by coalesce(q.nomven,g.nomven) order by revistavalor_total desc)revista)revista on vennomven = revista.revistanomven left join
    (select * from (select  coalesce(q.nomven,g.nomven) as paralelonomven, coalesce(sum(q.valor_total_pedidos),0) as paralelovalor_total_pedidos, coalesce(sum(g.valor_total_trocas),0) as paralelovalor_total_trocas,
    sum(( coalesce(q.valor_total_pedidos,0) - coalesce(g.valor_total_trocas,0))) as paralelovalor_total from (
    select pedidos.codigovend ||' - '||nome as nomven,
    sum(ipedidos.qtde * prcvenda) as valor_total_pedidos
    from ipedidos  inner join
         pedidos on ipedidos.documento = pedidos.documento 
 
full join
         vendedores on numero = codigovend 
where pedidos.data ='".$data."'  and  codigofab in (".$fornecedoresacessorios.") and codigofab not in (SELECT fabricantes_id
  FROM erp_fabricantes where fabricantes_revista = 0
) group by  pedidos.codigovend,nome,
    pedidos.doctoclie) as q full join
    (select trocas.codigovend ||' - '||nome as nomven,
    sum(itrocas.qtde * prcvenda) as valor_total_trocas
    from trocas inner join
         itrocas on trocas.documento = itrocas.documento full join
         vendedores on numero = codigovend where  trocas.data ='".$data."'  and  codigofab not in (".$fornecedoresacessorios.") and codigofab not in (".$fornecedorrevista.") group by trocas.nomeclie,trocas.codigovend,nome,
    trocas.doctoclie) as g on g.nomven = q.nomven group by coalesce(q.nomven,g.nomven) order by paralelovalor_total desc)paralelo)paralelo on vennomven = paralelo.paralelonomven left join
    (SELECT met_valrev, 
           ven_cod||' - '||nome as metnomven, met_valpar, met_valaces
  FROM metas inner join  vendedores on numero = ven_cod where met_status= 1)metas on  metas.metnomven = vennomven;";
  //
 //echo $sqlsel;
	$stmtsel = $conexao->prepare($sqlsel);
	$stmtsel->execute();
	//echo $erro;
	$rows1['data'] = $stmtsel->fetchAll(PDO::FETCH_OBJ);
     echo json_encode($rows1);
} catch (Exception $e) {
     print $e->getMessage();
 }


	
}

//mensagem que é escrita quando os dados são inseridos normalmente.
?>