var $g = jQuery.noConflict();

jQuery(document).ready(function($){
  //validarUsuario();
    $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown({
    constrainWidth: false,
    hover: true,
    belowOrigin: true,
  });
 

  $g('.datepicker').datepicker(function(){
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
 
 $('ul.tabs').tabs();
  $('.modal').modal({
    dismissible: true,
  });
  $('select').material_select();  



});

function retornaParametros() {
  var result = {},
  keyValuePairs = location.search.slice(1).split("&");
  console.log(window.location.href);
  keyValuePairs.forEach(function(keyValuePair) {
    keyValuePair = keyValuePair.split('=');
    result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
  });
  return result;
}

function urlPadrao(){
  //var url = 'http://179.184.216.106:8085/acompanhamento/';
  var url = 'http://192.99.210.173/acompanhamento/acompanhamento_app/principal/login.html';
  //var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/';


  var valores = retornaParametros();
  if(valores.operando !== undefined || valores.operando !== 'undefined' || valores.operando !== null || valores.operando !== 'null' || valores.operando !== ''){
    if(valores.operando === 'local'){
      url = 'http://192.168.0.34:8085/acompanhamento/';
      console.log(url);
    }
  }
  return url;
}

function urlPadraoJava(){
  //var url = 'http://179.184.216.106::8082/think/webresources/';
  var url = 'http://192.99.210.173:8082/think/webresources/';
  //var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/';

  var valores = retornaParametros();
  if(valores.operando !== undefined || valores.operando !== 'undefined' || valores.operando !== null || valores.operando !== 'null' || valores.operando !== ''){
    if(valores.operando === 'local'){
      url = 'http://192.168.0.34:8082/think/webresources/';
      console.log(url);
    }
  }
  return url;
}

function urlCloud(){
  var url = 'http://192.99.210.173:8082/think/webresources/';
  //var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/';

  return url;
}

Number.prototype.format = function(n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
  num = this.toFixed(Math.max(0, ~~n));
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function alterarSenha(){
  $('#loading').modal('open');
  var codUsu = $('.userView .codUsu').html();
  console.log(codUsu);
  var confsenha = $('#confsenha').val();
  var url = urlCloud() + 'usuario/trocarsenhaporusucod/'+codUsu+'/'+confsenha+'/'+codUsu;
  console.log(url);
  var dados = '';
  $.ajax({
    type: "GET",
    url: url,
    data: dados,
    dataType: "json",
    success: function(data){
      $('#loading').modal('close');
      $('#confsenha').val("");
      $('#senhanova').val("");
      console.log(data);
      Materialize.toast('Senha alterada com sucesso!', 2000);
      return data;
    },
    error: function(data){
      $('#loading').modal('close');
      console.log(data);
      Materialize.toast('Não foi possível alterar a senha, favor entrar em contato com a Think.', 5000);
      return data;
    }
  });
}

function limparalterarsenha() {
  $('#alterarsenha').empty();
}

function marcarMenu(){
  $('.side-nav li a').each(function() {
    var atual = location.href.split("/").slice(-1);
    atual = atual[0].split("?");
    //console.log(atual);
    if($(this).attr('href') == atual[0]){
      console.log($(this).attr('href'));
      $(this).addClass('active');
    }
  });
}

$('#formHash').submit(function(event){
  var url = urlPadrao() + 'services/gerarHash.php';
  var values = $(this).serialize();
  $.post( url, values, function( data, status ) {
    //alert("Data: " + data + "\nStatus: " + status);
    if(status === 'success'){
      $('#resposta .resultado').html(data);
    } else {
      $('#resposta .resultado').html("Não foi possível gerar o seu hash, tente novamente ou entre em contato com o desenvolvedor.");
    }
    $('#resposta').removeClass('hide');
  });
  event.preventDefault();
});

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
  c = isNaN(c = Math.abs(c)) ? 2 : c, 
  d = d == undefined ? "." : d, 
  t = t == undefined ? "," : t, 
  s = n < 0 ? "-" : "", 
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
  j = (j = i.length) > 3 ? j % 3 : 0;
 return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

 