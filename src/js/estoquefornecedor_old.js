$(document).ready(function () {
  preencherFornecedores();
  filtrarEstoque();
  $("#btnFltros").click(function () {
    var seta = $('#btnFltros').children();
    seta.toggleClass('down');
    $('#btnFltros').toggleClass('btn-shadow');
    $('#headerProcessos').toggleClass('title-shadow');
    $('#formFiltros').slideToggle("slow");
  });
  $("#for").keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      filtrarEstoque();
    }
  });
});

function filtrarEstoque() {
  var $j = jQuery.noConflict();
  var dados = '';
  var cod_fornecedor = $('#for').val();
  cod_fornecedor = cod_fornecedor.toString();
  cod_fornecedor = cod_fornecedor.split(' - ')[0];
  $("#for").html(cod_fornecedor);
  if (cod_fornecedor === '0' || cod_fornecedor === null || cod_fornecedor === '' || cod_fornecedor === undefined) {
    cod_fornecedor = '';
  }
  var url = 'http://192.99.210.173:8082/think/webresources/erpFornecedoresEstoque/posicaoEstoqueLoja?loja_num=' + retornoLoja() + '&page=1&for_num=' + cod_fornecedor;
  $.ajax({
    type: "GET",
    url: url,
    data: dados,
    dataType: "json",
    success: function (data) {
      var totalpagina;
      var pagina = (data.total / 25);
      pagina = parseInt(pagina);
      if (pagina > 6) {
        pagina = 7;
        totalpagina = (data.total / 25);
      } else if (pagina > 0 && pagina < 7) {
        pagina = (data.total / 25);
        totalpagina = pagina;
      } else if (pagina === 0) {
        totalpagina = 1;
        pagina = 1;
      }
      $(".menu").html('<ul id="pagination-demo" class="pagination-sm"></ul>');
      $j('#pagination-demo').twbsPagination({
        totalPages: totalpagina,
        visiblePages: pagina,
        onPageClick: function (event, page) {
          $('#page-content').text('Page ' + page);
          var url = 'http://192.99.210.173:8082/think/webresources/erpFornecedoresEstoque/posicaoEstoqueLoja?loja_num=' + retornoLoja() + '&page=' + page + '&for_num=' + cod_fornecedor;
          console.log(url);
          $.ajax({
            type: "GET",
            url: url,
            data: dados,
            dataType: "json",
            success: function (data) {
              var pagina = (data.total / 25);
              pagina = parseInt(pagina);
              if (pagina > 6) {
                pagina = 7;
                totalpagina = (data.total / 25);
              } else if (pagina > 0 && pagina < 7) {
                pagina = (data.total / 25);
                totalpagina = pagina;
              } else if (pagina === 0) {
                totalpagina = 1;
                pagina = 1;
              }
              data = data.data;
              var fat1 = $('#tabelaid');
              var sql = "";
              if (page > 1) {
                cont = ((page - 1) * 25) + 1;
                cont2 = ((page - 1) * 25) + 1;
              } else {
                cont = 1;
                cont2 = 1;
              }
              $.each(data, function (key, values) {
                if (cont > 1) {
                  sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigo + "-" + values.nome_fornecedor + "</td><td>" + values.qtd_estoque_total + "</td><td>R$ " + tratarValor(values.preco_total) + "</td></tr>");
                  cont = 1;
                  cont2++;
                } else {
                  sql = sql + ("<tr><td>" + cont2 + "</td><td>" + values.codigo + "-" + values.nome_fornecedor + "</td><td>" + values.qtd_estoque_total + "</td><td>R$ " + tratarValor(values.preco_total) + "</td></tr>");
                  cont = 2;
                  cont2++;
                }
              });
              fat1.empty();
              fat1.append(sql);
            }
          });
        }
      });
    },
    error: function(data){
      console.log(data);
    }
  });
  var url = 'http://192.99.210.173:8082/think/webresources/erpFornecedoresEstoque/posicaoEstoqueLojaTOTAL?loja_num=' + retornoLoja();
  console.log(url);
  $.ajax({
    type: "GET",
    url: url,
    data: dados,
    dataType: "json",
    success: function (data) {
      console.log(data.data[0]);
      var valores = data.data[0];
      var dataAtt = valores.dat_inc;
      var horaAtt = valores.hora_inc;
      var totalEst = valores.total_estoque;
      var totalVal = tratarValor(valores.total_valor);
      $('#hora').html('HORA: '+horaAtt);
      $('#data').html('DATA: '+dataAtt);
      $('#total-estq').val(totalEst);
      $('#total-venda').val('R$ '+totalVal);
    },
    error: function(data){
      console.log(data);
    }
  });
}

function preencherFornecedores(){
  var url = 'http://192.99.210.173:8082/think/webresources/erpFornecedoresEstoque/posicaoEstoqueLoja?loja_num=' + retornoLoja() + '&page=1&for_num=';
  var obj = gerarObjeto(url, 'codigo', 'nome_fornecedor', 'autocomplete');
  gerarAutocomplete('#for', obj);
}

function gerarObjeto(url, campoValor, campoNome, tipo){
  var myObj = {};
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    success: function (data) {
      var dados;
      try {
        dados = $.parseJSON(data).data;
      } catch(e) {
        dados = data.data;
      }
      $.each(dados, function(key, values){        
        nomeValor = values[campoValor]+' - '+values[campoNome];
        if(tipo === 'select'){          
          numeroValor = values[campoValor];
        } else {
          numeroValor = null;
        }
        myObj[nomeValor] = numeroValor;
      });   
    },
    error: function(data){
      myObj['error'] = data;
    }
  });
  return myObj;
}

function gerarAutocomplete(inputId, data){
  $('.autocomplete-content.dropdown-content').remove();
  $(inputId).autocomplete({
    data: data,
  });
}