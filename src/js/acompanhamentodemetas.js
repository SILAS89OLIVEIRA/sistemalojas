var $g = jQuery.noConflict();

jQuery(document).ready(function($){
  //validarUsuario();
 




  $( function() {
   $( ".datepicker" ).datepicker();
        labelMonthNext = 'Próximo mês',
        labelMonthPrev = 'Mês anterior',
        labelMonthSelect = 'Selecione o mês',
        labelYearSelect =  'Selecione o ano',
        monthsFull = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        toda = 'Hoje',
        clear = 'Limpar',
        close = 'Fechar',
        format = 'dd/mm/yyyy',
        closeOnSelect = true,
        closeOnClear = true
    });
    var dataa = new Date();
    var ano = dataa.getFullYear();
    var dia = dataa.getDate();
    var mes = dataa.getMonth() + 1;
  var data = ano + '-' + mes + '-' + dia;
   carregarVendasPeriodo(data, data);
});

$g(function(){
  $g(".datepicker").datepicker({
    showButtonPanel:true
  });
});




        


//var urlMetas = urlJava()+"vendasMetasLojas/";
var urlMetas = "http://192.99.210.173:8082/think/webresources/vendasMetasLojas/";
//console.log(urlMetas);
var metaTotal = 0;
var vendaTotal = 0;
var diferencaTotal = 0;

$g('#btnFiltrarVendaDiaria').click(function(){
  var data1 = $g('#dataInicio').val().replace(/\//g, "-");
  data1val = data1.split('-');
  data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
  var data2 = $g('#dataFim').val().replace(/\//g, "-");
  data2val = data2.split('-');
  data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
  carregarVendasPeriodo(data1, data2);

});

function verificaMeta(){
  $g.each($g('.linha'), function(){
    var pct = $g(this).children('.porcentagem').html();
    var thisdif = $g(this).children('.diferenca').html();
    console.log(thisdif);
	console.log(parseInt(pct));

	
	if((parseInt(pct)) < 95){
    
		$g(this).children('.atingiumeta').html("Não")
      $g(this).addClass('bg-red');
      $g(this).removeClass('bg-green');
	  $g(this).removeClass('bg-yellow');
	  

    }
	
	
	if((parseInt(pct)) >= 95){
		
	$(this).children('.atingiumeta').html("Quase");
    $(this).addClass('bg-yellow');
    $(this).removeClass('bg-green');
	$(this).removeClass('bg-red');
	
	
	}
	 	if((parseInt(pct)) >= 100){
      $(this).children('.atingiumeta').html("Sim")
      $(this).addClass('bg-green');
      $(this).removeClass('bg-red');
	  $(this).removeClass('bg-yellow');
	  
    }
//alert(pct);

  });
}


function carregarVendasDiarias(){


   

  $('#loading').modal('open');
  url = urlMetas + "buscaVendasDia";
  	console.log(url);
  $.ajax({
    type: "GET",
    url: url,
    data: '',
    dataType: "json",
    success: function(data) {
      vendaTotal = 0;
      metaTotal = 0;
      console.log(data);      
      $('#metas tbody').html('');
      var tabela = '';      
      $.each(data.data, function(key, values){        
        if(values.loja_num !== 99){
          
          console.log(url);
          console.log(values.total);
          console.log(values.total.formatMoney(2, ',', '.'));
          
          if(values.lojas_nome === null || values.lojas_nome === 'null'){ values.lojas_nome = '-'; }
          if(values.meta_diaria === null || values.meta_diaria === 'null'){ values.meta_diaria = 0; }
          if(values.diferenca_valor === null || values.diferenca_valor === 'null'){ values.diferenca_valor = 0; }
          if(values.falta_porcent === null || values.falta_porcent === 'null'){ values.falta_porcent = 0; }
          if(values.total === null || values.total === 'null'){ values.total = 0; }
          if(values.data_atualiza === null || values.data_atualiza === 'null'){ values.data_atualiza = '-'; }
          if(values.hora_atualiza === null || values.hora_atualiza === 'null'){ values.hora_atualiza = '-'; }                
          if(values.data_atualiza !== '-'){
            var dataformatada = values.data_atualiza.split('-');
            values.data_atualiza = dataformatada[2]+'/'+dataformatada[1]+'/'+dataformatada[0];
          }
          metaTotal += values.meta_diaria; 
          vendaTotal += values.total;         
          var linha = '<tr class="bg-green accent-1 linha">'+
            '<td class="bg-primary">'+values.lojas_nome+'</td>'+
            '<td class="dinheiro meta">'+values.meta_diaria.formatMoney(2, ',', '.')+'</td>'+
            '<td class="dinheiro totalvenda">'+values.total.formatMoney(2, ',', '.')+'</td>'+
            '<td class="dinheiro diferenca">'+values.diferenca_valor.formatMoney(2, ',', '.')+'</td>'+
            '<td class="porcentagem">'+values.falta_porcent+'</td>'+
            '<td class="atingiumeta">-</td>'+
            '<td>'+values.data_atualiza+' - '+values.hora_atualiza+'</td>'+
          '</tr>';
          tabela += linha;        
        }        
      });
      $('#metaAtualMostrando').html('diárias');
      $('#metas tbody').html(tabela);
      carregarValoresTotais();
      verificaMeta();     
      $g('#loading').modal('close');
    },
    error: function(data){
      console.log(data);
      $g('#loading').modal('close');
      $('#falha').modal('open');
    }
  });
}





function carregarValoresTotais(data1, data2){
  $g('#loading').modal('open');
  url = urlMetas + "buscaMetaMensalTotal?data_ini="+data1+"&data_fim="+data2;
  console.log(url);
  $g.ajax({
    type: "GET",
    url: url,
    data: '',
    dataType: "json",
    success: function(data) {
      console.log(data);
      $g('#totais tbody').html('');
      var tabela = '';
      $g.each(data.data, function(key, values){
        if(values.loja_num !== 99){
          if(values.meta_diaria === null || values.meta_diaria === 'null'){ values.meta_diaria = 0; }
          if(values.meta_mensal === null || values.meta_mensal === 'null'){ values.meta_mensal = 0; }
          diferencaTotal = vendaTotal - metaTotal;
          var periodo = 'Hoje';
          if($g("#dataInicio").val() !== "" && $g("#dataFim").val() !== ""){
            periodo = $g("#dataInicio").val()+' a '+$g("#dataFim").val();
          }
          
          var linha = '<tr class="bg-light lighten-3 text-center">'+
            '<td>'+periodo+'</td>'+
            '<td class="dinheiro"><span id="valorTotalMeta">'+metaTotal.formatMoney(2, ',', '.')+'</span></td>'+
            '<td class="dinheiro"><span id="valorTotalVenda">'+vendaTotal.formatMoney(2, ',', '.')+'</span></td>'+
            '<td class="dinheiro"><span id="valorTotalDiferenca">'+diferencaTotal.formatMoney(2, ',', '.')+'</span></td>'+
            '<td><span id="valorTotalPorcentagem">'+ ((vendaTotal / metaTotal) * 100).toFixed(2) +'</span> %</td>'+
//            '<td class="dinheiro"><span id="valorTotalMetaMensal">'+values.meta_mensal.formatMoney(2, ',', '.')+'</span></td>'+
          '</tr>';
          tabela += linha;
          console.log(vendaTotal / values.meta_diaria);
          $g('#valorTotalMetaMensal').html(values.meta_mensal.formatMoney(2, ',', '.'));
        }
      });
      $g('#totais tbody').html(tabela);
      $g('#loading').modal('close');
    },
    error: function(data){
      console.log(data);
      $g('#loading').modal('close');
      $('#falha').modal('open');
    }
  });
}


function carregarVendasPeriodo(data1, data2){
  $g('#loading').modal('open');
  url = urlMetas + "buscaVendasPeriodo?data_ini="+data1+"&data_fim="+data2;
  console.log(url);
  $g.ajax({
    type: "GET",
    url: url,
    data: '',
    dataType: "json",
    success: function(data) {      
      metaTotal = 0;
      vendaTotal = 0;
      diferencaTotal = 0;      
      console.log(data);
      $g('#metas tbody').html('');
      var tabela = '';
      $g.each(data.data, function(key, values){
        if(values.loja_num !== 99){
          if(values.lojas_nome === null || values.lojas_nome === 'null'){ values.lojas_nome = '-'; }
          if(values.meta_diaria === null || values.meta_diaria === 'null'){ values.meta_diaria = 0; }
          if(values.diferenca_valor === null || values.diferenca_valor === 'null'){ values.diferenca_valor = 0; }
          if(values.falta_porcent === null || values.falta_porcent === 'null'){ values.falta_porcent = 0; }
          if(values.total === null || values.total === 'null'){ values.total = 0; }
          if(values.data_atualiza === null || values.data_atualiza === 'null'){ values.data_atualiza = '-'; }
          if(values.hora_atualiza === null || values.hora_atualiza === 'null'){ values.hora_atualiza = '-'; }    
          if(values.data_atualiza !== '-'){
            var dataformatada = values.data_atualiza.split('-');
            values.data_atualiza = dataformatada[2]+'/'+dataformatada[1]+'/'+dataformatada[0];
          }
          metaTotal += values.meta_diaria;
          vendaTotal += values.total;
          diferencaTotal += values.diferenca_valor;          
          var linha = '<tr class="bg-green linha text-center">'+
            '<td class="fix bg-primary text-white">'+values.lojas_nome+'</td>'+
            '<td class="dinheiro meta">'+values.meta_diaria.formatMoney(2, ',', '.')+'</td>'+
            '<td class="dinheiro totalvenda">'+values.total.formatMoney(2, ',', '.')+'</td>'+
            '<td class="dinheiro diferenca">'+values.diferenca_valor.formatMoney(2, ',', '.')+'</td>'+
            '<td class="porcentagem">'+values.falta_porcent+'</td>'+
            '<td class="atingiumeta">-</td>'+
            '<td>'+values.data_atualiza+' - '+values.hora_atualiza+'</td>'+
          '</tr>';
          tabela += linha;
        }
      });
      $g('#metaAtualMostrando').html('periódicas');
      $g('#metas tbody').html(tabela);
      carregarValoresTotais(data1, data2);
      verificaMeta();
      $g('#loading').modal('close');
    },
    error: function(data){
      console.log(data);
      $g('#loading').modal('close');
      $('#falha').modal('open');
    }
  });
};


              
                      $g(function(){ 
                                $g("#nav").load("./nav.html");
                                $g("#side").load("./side.html");
                       });
                 
           




