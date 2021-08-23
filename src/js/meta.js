       
	   $(document).ready(function(){
		  
		   var lista = retornaParametros();
		   console.log(lista);
		  // alert(lista.loja);
		   loja = lista.loja;
		   if(loja > 0){
			   
              loja = loja;
              $("#lojas").hide();			  
		   
		 
		   

		     $(function() {
                      Metis.MetisProgress();
                    });


		   carregamentoMeta(loja);
		   carregamentoMetaTotal(loja);
		   carregamentoMetaTotalVendedora(loja);
		   carregamentoMetaTotalVendedoraAcessorio(loja);
	 }else{
		 
       $.ajax({

 
        url: "../services/lojas.php",
        type: "GET",
        dataType: "json",
        //data : "param-no",
        success: function (html) {
            // var fat = $('.'+id);
            //var fat1 = $('.'+id);

            $('#lojas').html(comboxvalorLoja("lojas", html, "loj_num", "loj_nom"));
           

        }, error: function (e) {
            alert(e);
        }
    });
	
	 };
	 	
	   });
	   
$('#btnFiltrarVendaDiaria').click(function(){
	  var lista = retornaParametros();
		   console.log(lista);
		  // alert(lista.loja);
		   loja = lista.loja;
		  
carregamentoMeta(loja);
carregamentoMetaTotal(loja);
carregamentoMetaTotalVendedora(loja);
carregamentoMetaTotalVendedoraAcessorio(loja);

 Metis.MetisProgress();
    $(function() {
                      Metis.MetisProgress();
                    });
});

function carregamentoMetaTotal(loja) {
	   
	
	     if(loja > 0){
			  
			  loja = loja; 
			   
		   }else{
			    
		      loja = $("#lojas").val();
			   
		   }
		   
      var data1 = $('#dataInicio').val().replace(/\//g, "-");
	  var data2 = $('#dataFim').val().replace(/\//g, "-");
	//  alert(data2);
	    if(data1 === undefined || data1 === 'undefined' || data1=== null ||data1=== 'null' || data1=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data1 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		   data1val = data1.split('-');
           data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
		  
	  }
	  
	 if(data2 === undefined || data2 === 'undefined' || data2=== null ||data2=== 'null' || data2=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data2 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		  data2val = data2.split('-');
          data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
		  
	  }
	  
    
	  var corpo = ""; 
	 
	  var urlperfil = "../services/meta_total.php?datini="+data1+"&datfim="+data2+"&loja="+loja;
	  
	  console.log(urlperfil);
	   $.get(urlperfil, function (dataReturn) {
		   
		 

  //          console.log(dataReturn)
   dataReturn = jQuery.parseJSON(dataReturn);
var ven_nome2 = '';
var cont = 0;
$.each(dataReturn.data, function (key, values) {
cont++;
var falta = 0;
var meta =  tratarValor((Number(values.meta).toFixed(2)));
 var procentagemfalta = values.procentagemfalta;
if((Number(values.falta)) < 1){
	
	falta = meta; 
	procentagemfalta = 100;
	
}else{
	
		falta =  tratarValor((Number(values.falta).toFixed(2))); 
	    var procentagemfalta = values.procentagemfalta;
	
}
var rev_nom = values.rev_nom;
var produtos_revista = values.produtos_revista; 
var codigovend = values.codigovend;
var ven_nome = values.ven_nome;
var venda = tratarValor((Number(values.venda).toFixed(2)));
 

var porcentagemvenda = values.porcentagemvenda;


if(meta === null || meta === 'null' ||meta === '')
{ meta = 0; 
}
if(venda === null || venda === 'null'||venda === '')
{ venda = 0; 
}
if(falta === null || falta === 'null' || falta === '')
{ 
falta = meta; 
}
if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
{ porcentagemvenda = 100; 
}
if(procentagemfalta === null || procentagemfalta === 'null'||procentagemfalta === '')
{
	procentagemfalta = 0; 
}
var porcentagemvenda2 =porcentagemvenda ;
var procentagemfalta2= procentagemfalta;


if(Number(porcentagemvenda) > 80){
	
	porcentagemvenda2 = 80;
}

if(Number(procentagemfalta) <20){
	
	procentagemfalta2 = 20;
}

if(Number(porcentagemvenda) > 100){
	
	porcentagemvenda2 = 100;
}
if(Number(porcentagemvenda) < 15){
	
	porcentagemvenda2 = 15;
}

if(Number(procentagemfalta) > 85){
	
	procentagemfalta2 = 85;
}




     if(cont > 1){ 
	
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%' ><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%' ><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>";
	 }else{
		 corpo = corpo +"<div class='row'><div class='col-lg-12'><div class='box'>";
		
		corpo = corpo + "<header class='bg-blue text-white'><h5>Totais</h5></header>";
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div><script>$(function() { Metis.MetisProgress();});</script>";
		 
		 
		 
	 }






  





//}

        });
		
		 $('#novo_total').html(corpo);
	});
}

function carregamentoMetaTotalRevista(loja) {
	   
	
	     if(loja > 0){
			  
			  loja = loja; 
			   
		   }else{
			    
		      loja = $("#lojas").val();
			   
		   }
		   
      var data1 = $('#dataInicio').val().replace(/\//g, "-");
	  var data2 = $('#dataFim').val().replace(/\//g, "-");
	//  alert(data2);
	    if(data1 === undefined || data1 === 'undefined' || data1=== null ||data1=== 'null' || data1=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data1 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		   data1val = data1.split('-');
           data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
		  
	  }
	  
	 if(data2 === undefined || data2 === 'undefined' || data2=== null ||data2=== 'null' || data2=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data2 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		  data2val = data2.split('-');
          data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
		  
	  }
	  
    
	  var corpo = ""; 
	 
	  var urlperfil = "../services/meta_total.php?datini="+data1+"&datfim="+data2+"&loja="+loja;
	  
	  console.log(urlperfil);
	   $.get(urlperfil, function (dataReturn) {
		   
		 

  //          console.log(dataReturn)
   dataReturn = jQuery.parseJSON(dataReturn);
var ven_nome2 = '';
var cont = 0;
$.each(dataReturn.data, function (key, values) {
cont++;
var falta = 0;
var meta =  tratarValor((Number(values.meta).toFixed(2)));
 var procentagemfalta = values.procentagemfalta;
if((Number(values.falta)) < 1){
	
	falta = meta; 
	procentagemfalta = 100;
	
}else{
	
		falta =  tratarValor((Number(values.falta).toFixed(2))); 
	    var procentagemfalta = values.procentagemfalta;
	
}
var rev_nom = values.rev_nom;
var produtos_revista = values.produtos_revista; 
var codigovend = values.codigovend;
var ven_nome = values.ven_nome;
var venda = tratarValor((Number(values.venda).toFixed(2)));
 

var porcentagemvenda = values.porcentagemvenda;


if(meta === null || meta === 'null' ||meta === '')
{ meta = 0; 
}
if(venda === null || venda === 'null'||venda === '')
{ venda = 0; 
}
if(falta === null || falta === 'null' || falta === '')
{ 
falta = meta; 
}
if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
{ porcentagemvenda = 100; 
}
if(procentagemfalta === null || procentagemfalta === 'null'||procentagemfalta === '')
{
	procentagemfalta = 0; 
}
var porcentagemvenda2 =porcentagemvenda ;
var procentagemfalta2= procentagemfalta;


if(Number(porcentagemvenda) > 80){
	
	porcentagemvenda2 = 80;
}

if(Number(procentagemfalta) <20){
	
	procentagemfalta2 = 20;
}

if(Number(porcentagemvenda) > 100){
	
	porcentagemvenda2 = 100;
}
if(Number(porcentagemvenda) < 15){
	
	porcentagemvenda2 = 15;
}

if(Number(procentagemfalta) > 85){
	
	procentagemfalta2 = 85;
}




     if(cont > 1){ 
	
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress col-lg-12'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%' ><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%' ><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>";
	 }else{
		 corpo = corpo +"<div class='row'><div class='col-lg-12'><div class='box'>";
		
		corpo = corpo + "<header class='bg-blue text-white'><h5>Totais</h5></header>";
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div><script>$(function() { Metis.MetisProgress();});</script>";
		 
		 
		 
	 }
//}



        });
		
		 $('#novo_total').html(corpo);
	});
}



function carregamentoMetaTotalVendedora(loja) {
	   
	
	     if(loja > 0){
			  
			  loja = loja; 
			   
		   }else{
			    
		      loja = $("#lojas").val();
			   
		   }
		   
      var data1 = $('#dataInicio').val().replace(/\//g, "-");
	  var data2 = $('#dataFim').val().replace(/\//g, "-");
	//  alert(data2);
	    if(data1 === undefined || data1 === 'undefined' || data1=== null ||data1=== 'null' || data1=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data1 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		   data1val = data1.split('-');
           data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
		  
	  }
	  
	 if(data2 === undefined || data2 === 'undefined' || data2=== null ||data2=== 'null' || data2=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data2 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		  data2val = data2.split('-');
          data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
		  
	  }
	  
    
	  var corpo = ""; 
	 
	  var urlperfil = "../services/meta_vendedora.php?datini="+data1+"&datfim="+data2+"&loja="+loja;
	  console.log(urlperfil);
	   $.get(urlperfil, function (dataReturn) {
		   
		 

  //          console.log(dataReturn)
   dataReturn = jQuery.parseJSON(dataReturn);
var ven_nome2 = '';
var cont = 0;
$.each(dataReturn.data, function (key, values) {
cont++;
var falta = 0;
var meta =  tratarValor((Number(values.meta).toFixed(2)));
 var procentagemfalta = values.procentagemfalta;
if((Number(values.falta)) < 1){
	
	falta = meta; 
	procentagemfalta = 100;
	
}else{
	
		falta =  tratarValor((Number(values.falta).toFixed(2))); 
	    var procentagemfalta = values.procentagemfalta;
	
}
var rev_nom = values.rev_nom;
var produtos_revista = values.produtos_revista; 
var codigovend = values.codigovend;
var ven_nome = values.ven_nome;
var venda = tratarValor((Number(values.venda).toFixed(2)));
 

var porcentagemvenda = values.porcentagemvenda;


if(meta === null || meta === 'null' ||meta === '')
{ meta = 0; 
}
if(venda === null || venda === 'null'||venda === '')
{ venda = 0; 
}
if(falta === null || falta === 'null' || falta === '')
{ 
falta = meta; 
}
if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
{ porcentagemvenda = 100; 
}
if(procentagemfalta === null || procentagemfalta === 'null'||procentagemfalta === '')
{
	procentagemfalta = 0; 
}
var porcentagemvenda2 =porcentagemvenda ;
var procentagemfalta2= procentagemfalta;


if(Number(porcentagemvenda) > 80){
	
	porcentagemvenda2 = 80;
}

if(Number(procentagemfalta) <20){
	
	procentagemfalta2 = 20;
}

if(Number(porcentagemvenda) > 100){
	
	porcentagemvenda2 = 100;
}
if(Number(porcentagemvenda) < 15){
	
	porcentagemvenda2 = 15;
}

if(Number(procentagemfalta) > 85){
	
	procentagemfalta2 = 85;
}




     if(cont > 1){ 
	
		corpo = corpo + "<div class='col-lg-2'>"+codigovend+" - "+ven_nome+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%' ><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%' ><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>";
	 }else{
		 corpo = corpo +"<div class='row'><div class='col-lg-12'><div class='box'>";
		
		corpo = corpo + "<header class='bg-blue text-white'><h5>Totais</h5></header>";
		corpo = corpo + "<div class='col-lg-2'>"+codigovend+" - "+ven_nome+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div><script>$(function() { Metis.MetisProgress();});</script>";
		 
		 
		 
	 }
//}

        });
		
		 $('#novo_vendedoras_total').html(corpo);
	});
}

function carregamentoMetaTotalVendedoraAcessorio(loja) {
	   
	
	     if(loja > 0){
			  
			  loja = loja; 
			   
		   }else{
			    
		      loja = $("#lojas").val();
			   
		   }
		   
      var data1 = $('#dataInicio').val().replace(/\//g, "-");
	  var data2 = $('#dataFim').val().replace(/\//g, "-");
	//  alert(data2);
	    if(data1 === undefined || data1 === 'undefined' || data1=== null ||data1=== 'null' || data1=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data1 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		   data1val = data1.split('-');
           data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
		  
	  }
	  
	 if(data2 === undefined || data2 === 'undefined' || data2=== null ||data2=== 'null' || data2=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data2 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		  data2val = data2.split('-');
          data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
		  
	  }
	  
    
	  var corpo = ""; 
	 
	  var urlperfil = "../services/meta_acessorio.php?datini="+data1+"&datfim="+data2+"&loja="+loja;
	  console.log(urlperfil);
	   $.get(urlperfil, function (dataReturn) {
		   
		 

  //          console.log(dataReturn)
   dataReturn = jQuery.parseJSON(dataReturn);
var ven_nome2 = '';
var cont = 0;
$.each(dataReturn.data, function (key, values) {
cont++;
var falta = 0;
var meta =  tratarValor((Number(values.meta).toFixed(2)));
 var procentagemfalta = values.procentagemfalta;
if((Number(values.falta)) < 1){
	
	falta = meta; 
	procentagemfalta = 100;
	
}else{
	
		falta =  tratarValor((Number(values.falta).toFixed(2))); 
	    var procentagemfalta = values.procentagemfalta;
	
}
var rev_nom = values.rev_nom;
var produtos_revista = values.produtos_revista; 
var codigovend = values.codigovend;
var ven_nome = values.ven_nome;
var venda = tratarValor((Number(values.venda).toFixed(2)));
 

var porcentagemvenda = values.porcentagemvenda;


if(meta === null || meta === 'null' ||meta === '')
{ meta = 0; 
}
if(venda === null || venda === 'null'||venda === '')
{ venda = 0; 
}
if(falta === null || falta === 'null' || falta === '')
{ 
falta = meta; 
}
if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
{ porcentagemvenda = 100; 
}
if(procentagemfalta === null || procentagemfalta === 'null'||procentagemfalta === '')
{
	procentagemfalta = 0; 
}
var porcentagemvenda2 =porcentagemvenda ;
var procentagemfalta2= procentagemfalta;


if(Number(porcentagemvenda) > 80){
	
	porcentagemvenda2 = 80;
}

if(Number(procentagemfalta) <20){
	
	procentagemfalta2 = 20;
}

if(Number(porcentagemvenda) > 100){
	
	porcentagemvenda2 = 100;
}
if(Number(porcentagemvenda) < 15){
	
	porcentagemvenda2 = 15;
}

if(Number(procentagemfalta) > 85){
	
	procentagemfalta2 = 85;
}




     if(cont > 1){ 
	
		corpo = corpo + "<div class='col-lg-2'>"+codigovend+" - "+ven_nome+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%' ><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%' ><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>";
	 }else{
		 corpo = corpo +"<div class='row'><div class='col-lg-12'><div class='box'>";
		
		corpo = corpo + "<header class='bg-blue text-white'><h5>Totais Acessórios</h5></header>";
		corpo = corpo + "<div class='col-lg-2'>"+codigovend+" - "+ven_nome+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div><script>$(function() { Metis.MetisProgress();});</script>";
		 
		 
		 
	 }
//}

        });
		
		 $('#novo_vendedoras_acessorio').html(corpo);
	});
}
	
function carregamentoMeta(loja) {
	   
	  
 
	  if(loja > 0){
			  
			  loja = loja; 
			   
		   }else{
			    
		      loja = $("#lojas").val();
			   
		   }
		   
        var data1 = $('#dataInicio').val().replace(/\//g, "-");
	  var data2 = $('#dataFim').val().replace(/\//g, "-");
	    if(data1 === undefined || data1 === 'undefined' || data1=== null ||data1=== 'null' || data1=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data1 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		   data1val = data1.split('-');
           data1 = data1val[2]+'-'+data1val[1]+'-'+data1val[0];
		  
	  }
	  
	 if(data2 === undefined || data2 === 'undefined' || data2=== null ||data2=== 'null' || data2=== ''){
		  
		    var dataa = new Date();
			var ano = dataa.getFullYear();
			var dia = dataa.getDate();
			var mes = dataa.getMonth() + 1;
            var data2 = ano + '-' + mes + '-' + dia;
		  
	  }else{
		  
		  data2val = data2.split('-');
          data2 = data2val[2]+'-'+data2val[1]+'-'+data2val[0];
		  
	  }
	
	  var corpo = ""; 
	
	 // data1 = '2018-03-01';
	//  data2 = '2018-03-31';
	
	  
	  
	  var urlperfil = "../services/meta.php?datini="+data1+"&datfim="+data2+"&loja="+loja;
	  console.log(urlperfil);
	   $.get(urlperfil, function (dataReturn) {

  //          console.log(dataReturn)
   dataReturn = jQuery.parseJSON(dataReturn);
var ven_nome2 = '';
var cont = 0;
$.each(dataReturn.data, function (key, values) {
cont++;
var falta = 0;
var meta =  tratarValor((Number(values.meta).toFixed(2)));
 var procentagemfalta = values.procentagemfalta;
if((Number(values.falta)) < 1){
	
	falta = meta; 
	procentagemfalta = 100;
	
}else{
	
		falta =  tratarValor((Number(values.falta).toFixed(2))); 
	    var procentagemfalta = values.procentagemfalta;
	
}
var rev_nom = values.rev_nom;
var produtos_revista = values.produtos_revista; 
var codigovend = values.codigovend;
var ven_nome = values.ven_nome;
var venda = tratarValor((Number(values.venda).toFixed(2)));
 

var porcentagemvenda = values.porcentagemvenda;


if(meta === null || meta === 'null' ||meta === '')
{ meta = 0; 
}
if(venda === null || venda === 'null'||venda === '')
{ venda = 0; 
}
if(falta === null || falta === 'null' || falta === '')
{ 
falta = meta; 
}
if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
{ porcentagemvenda = 100; 
}
if(procentagemfalta === null || procentagemfalta === 'null'||procentagemfalta === '')
{
	procentagemfalta = 0; 
}
var porcentagemvenda2 =porcentagemvenda ;
var procentagemfalta2= procentagemfalta;


if(Number(porcentagemvenda) > 80){
	
	porcentagemvenda2 = 80;
}

if(Number(procentagemfalta) <20){
	
	procentagemfalta2 = 20;
}

if(Number(porcentagemvenda) > 100){
	
	porcentagemvenda2 = 100;
}
if(Number(porcentagemvenda) < 15){
	
	porcentagemvenda2 = 15;
}

if(Number(procentagemfalta) > 85){
	
	procentagemfalta2 = 85;
}


//console.log(rev_nom);
//console.log(produtos_revista);
//console.log(codigovend);
//console.log(ven_nome);
//console.log(venda);
//console.log(meta);
//console.log(falta);
//console.log(porcentagemvenda);
//console.log(procentagemfalta);



if(ven_nome2 === ven_nome){
	//	alert(ven_nome2 +" - "+ven_nome+" Sair "+cont);
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>";
	
}else{
	//alert(ven_nome2 +" - "+ven_nome+" Entrei "+cont);
         ven_nome2 = ven_nome;
      
		corpo = corpo +"<div class='row'><div class='col-lg-12'><div class='box'>";
		 
		corpo = corpo + "<header class='bg-blue text-white'><h5>"+codigovend+" - "+ ven_nome+"</h5></header>";
		corpo = corpo + "<div class='col-lg-2'>"+rev_nom+"</div><div class='progress'>";
		corpo = corpo + "<div class='progress-bar bg-success' style='width:"+porcentagemvenda2+"%'><span class=''>R$ "+venda +" - ("+porcentagemvenda+"%)</span></div>";
		corpo = corpo + "<div class='progress-bar bg-danger' style='width:"+procentagemfalta2+"%'><span class=''>R$ "+falta+" - ("+procentagemfalta+" %)</span></div></div>"

}

        });
		
		 $('#novo').html(corpo);
		 
	});
}



	   function tratarValor(valor) {




    casas = 2,
            separdor_decimal = ',',
            separador_milhar = '.';
    var valor_total = parseInt(valor * (Math.pow(10, casas)));
    var inteiros = parseInt(parseInt(valor * (Math.pow(10, casas))) / parseFloat(Math.pow(10, casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10, casas))) % parseFloat(Math.pow(10, casas)));


    if (centavos % 10 == 0 && centavos + "".length < 2) {

        if (centavos >= 0) {
            centavos = centavos + "0";
        } else {
            centavos = centavos * (-1);

        }



    } else if (centavos < 10) {



        if (centavos >= 0) {
            centavos = "0" + centavos;
        } else {
            centavos = centavos * (-1);

        }

    }

    var milhares = parseInt(inteiros / 1000);
    inteiros = inteiros % 1000;

    var novoValor = "";

    if (milhares > 0) {
        novoValor = milhares + "" + separador_milhar + "" + novoValor;
        if (inteiros == 0) {
            inteiros = "000";
        } else if (inteiros < 10) {
            inteiros = "00" + inteiros;
        } else if (inteiros < 100) {
            inteiros = "0" + inteiros;
        }
    }
    novoValor += inteiros + "" + separdor_decimal + "" + centavos;

    if (novoValor === "null") {
        valorTotalTotal = 0, 00;
    }
    return  novoValor;
}