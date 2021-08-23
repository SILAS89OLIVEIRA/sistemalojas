<?php
include "conexao.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $datini = $_REQUEST["datini"];
        $datfim = $_REQUEST["datfim"];
        $loja = $_REQUEST["loja"];
        vendaMeta($datini,$datfim,$loja);
}


function vendaMeta($datini,$datfim,$loja){
	
	$conexao = getConn();
		 
/*	$sql = "select * 
	from (select 
case when(loj_cod >33) then 'OUTROS' else (case when(erp_meta_vendedora.rev_cod < revista1) then 'OUTROS' else coalesce(erp_revistas.rev_nom,'OUTROS') end) end as rev_nom, 
case when(loj_cod >33) then 0 else (case when(erp_meta_vendedora.rev_cod < revista1) then 0 else coalesce(erp_meta_vendedora.rev_cod,0) end) end as produtos_revista, 
--coalesce(erp_meta_vendedora.ven_cod,codigovend) as codigovend, --coalesce(erp_vendedores.ven_nome,meta_vendas_total.ven_nome) as ven_nome, 
sum(valor) as venda, 
coalesce((sum(metven_valdiaria)),0) as meta , 
case when(coalesce((sum(metven_valdiaria)-sum(valor)),0) < 0) then ((coalesce((sum(metven_valdiaria)-sum(valor)),0))*-1) else (coalesce((sum(metven_valdiaria)-sum(valor)),0)) end as falta , 
coalesce((((sum(valor)*100)/((case when((sum(metven_valdiaria)) = 0) then 1 else (sum(metven_valdiaria)) end)))::numeric(10,2)),0) as porcentagemvenda, 
coalesce(((((sum(metven_valdiaria)-sum(valor))*100)/(case when((sum(metven_valdiaria)) = 0) then 1 else (sum(metven_valdiaria)) end))::numeric(10,2)),0) as procentagemfalta 
from 
(select sum(metven_valdiaria) as metven_valdiaria,metven_datini,ven_cod,loj_cod,rev_cod from erp_meta_vendedora where metven_datini>='".$datini."' and metven_datini<='".$datfim."' 
group by ven_cod,loj_cod,rev_cod,metven_datini ) as erp_meta_vendedora 
full join meta_vendas_total on erp_meta_vendedora.ven_cod = codigovend and loja_origem = loj_cod and data = metven_datini and case when(loj_cod >33) then 0 else (case when(erp_meta_vendedora.rev_cod < ((select distinct rev_cod from erp_meta_vendedora where metven_datini>='".$datini."' and metven_datini<='".$datfim."' and rev_cod >0 order by rev_cod limit 1))) then 0 else coalesce(erp_meta_vendedora.rev_cod,0) end) end = (case when(loj_cod >33) then 0 else (case when(meta_vendas_total.produtos_revista < ((select distinct rev_cod  from erp_meta_vendedora where metven_datini>='".$datini."' and metven_datini<='".$datfim."' and rev_cod >0 order by rev_cod limit 1))) then 0 else coalesce(meta_vendas_total.produtos_revista,0) end) end)
left join erp_revistas on rev_num_rev = erp_meta_vendedora.rev_cod 
left join erp_vendedores on erp_meta_vendedora.ven_cod = ven_numero,
(select distinct rev_cod as revista1 from erp_meta_vendedora where metven_datini>='".$datini."' and metven_datini<='".$datfim."' and rev_cod >0 order by rev_cod limit 1)revista1
where (data >='".$datini."' or metven_datini >='".$datini."') and (data <='".$datfim."' or metven_datini <='".$datfim."') 
and (loja_origem =".$loja." or loj_cod =".$loja.")
group by 
case when(loj_cod >33) then 'OUTROS' else (case when(erp_meta_vendedora.rev_cod < revista1) then 'OUTROS' else coalesce(erp_revistas.rev_nom,'OUTROS') end) end,
case when(loj_cod >33) then 0 else (case when(erp_meta_vendedora.rev_cod < revista1) then 0 else coalesce(erp_meta_vendedora.rev_cod,0) end) end,
revista1, 
loj_cod 
order by  case when(loj_cod >33) then 0 else (case when(erp_meta_vendedora.rev_cod < revista1) then 0 else coalesce(erp_meta_vendedora.rev_cod,0) end) end desc)a
";
*/
$sql = "select   case when((produtos_revista) > 2) then 'COLEÇÃO' else case when(produtos_revista = 1) then 'REVISTA REGULAR' else 'REVISTA PLUS' end end as rev_nom,coalesce((((((venda-meta)*-1)*100)/((case when((meta) = 0) then 1 else ((meta)) end)))::numeric(10,2)),0) as procentagemfalta, 
 coalesce(((((venda)*100)/((case when((meta) = 0) then 1 else ((meta)) end)))::numeric(10,2)),0) as porcentagemvenda,
((venda-meta)*-1) as falta,
 * from (
 select  produtos_revista,sum(venda) as venda, sum(meta) as meta from (
select * from (
 select 

 case when((rev_cod) > 2) then 'COLEÇÃO' else case when(rev_cod = 1) then 'REVISTA REGULAR' else 'REVISTA PLUS' end end as rev_nom,
 coalesce(rev_cod,0) as produtos_revista,
 
  
coalesce(sum(valor),0) as venda, 
metven_valdiaria as meta,
   case when(coalesce((metven_valdiaria-sum(valor)),0) < 0) then ((coalesce(metven_valdiaria-sum(valor),0))*-1) else (coalesce(metven_valdiaria-sum(valor),0)) end as falta
 from (select sum(metven_valdiaria) as metven_valdiaria,


   loj_cod,
   rev_cod
  
  from erp_meta_vendedora where metven_datini>='".$datini."' and metven_datini<='".$datfim."' and loj_cod=".$loja." group 
  by loj_cod,rev_cod) as erp_meta_vendedora 
full join meta_vendas_total on  loja_origem =".$loja." and data>='".$datini."' and data<='".$datfim."' and rev_cod = produtos_revista 

where 
 (loj_cod =".$loja.") group by metven_valdiaria,rev_cod)a)b group by produtos_revista)a";
 
//echo  $sql;
	    $sqlconsulta = $conexao->prepare($sql);
        $sqlconsulta->execute();
  
		$rows = array('data' => array());
        $rows['data'] = $sqlconsulta->fetchAll(PDO::FETCH_OBJ);
		echo  json_encode($rows);
	
}

?>