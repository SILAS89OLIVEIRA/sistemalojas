$(document).ready(function(){
  $('select').material_select();
  var pedidostroca = [];
});


$('#formBuscaDocs').submit(function(e){
  e.preventDefault();
  var cpfcnpj = $('#formBuscaDocs #cpfcnpj').val();
  var loja = $('#formBuscaDocs #loja').val();
  buscaDocs(cpfcnpj,loja);
});

function buscaDocs(cpfcnpj,loja){
  var url = "http://192.168.0.34/sistemaloja/services/trocaitens.php?acao=novo_buscar_docs&cpfcnpj="+cpfcnpj+"&loja=2";
  $.ajax({
    type: "GET",
    url: url,
    data: '',
    dataType: "json",
    success: function(data){
      pedidostroca = [];
      $('#tabelaDocumentos').html('');
      console.log(data);
      if(data.trocavel === 'true'){
        $.each(data.data, function(key, values){
          console.log(values);
          $('#tabelaDocumentos').append('<tr class="item" id="item_'+values.id_ipedidos+'"><td>'+values.documento+'</td><td>'+values.id_ipedidos+'</td><td>'+values.produtos_num_item+' - '+values.produtos_descricao+'</td></tr>');
        });
      } else {
        $('#tabelaDocumentos').html('<tr><td colspan="3"><h5>Não há itens trocáveis para este CPF/CNPJ.</td></tr></h5>');
      }
    },
    error: function(data){
      console.log(data);
    }
  });
}

function lerCodigoBarras(elem){
  var codbarras = $('#'+elem).val();
  //console.log(codbarras);
  $('tr.item').each(function(){
    //console.log(this.id);
    //console.log('item_'+codbarras);
    if(this.id === 'item_'+codbarras){
      //console.log(pedidostroca);
      $(this).addClass('validado');
      if($.inArray(codbarras, pedidostroca) !== -1){
        console.log(codbarras+' já existe no array!');
      } else {
        pedidostroca.push(codbarras);
      }
    }
  });
}

