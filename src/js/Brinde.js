var urlbrinde = retornoUrlBrinde() + 'cpfbrinde/inserirBrindesRevista';
console.log(urlbrinde);
var dados = '';
$.ajax({
    type: "GET",
    url: urlbrinde,
    data: dados,
    dataType: "json",
    success: function (data)
    {
        console.log(data);


    }
});



var urlbrinde = retornoUrlBrinde() + "cpfbrinde/buscarUltimosBrindes";
console.log(urlbrinde);
$.get(urlbrinde, function (dataReturn12) {
    $('#brinde').html(comboxbrinde("brinde", dataReturn12, "brin_cod", "brin_desc"));  //coloco na div o retorno da requisica 
});


var valueEntrar = 0;

function Enter(event) {

    var tecla = (window.event) ? event.keyCode : e.which;

    {
        var keynum;

        if (window.event) { //IE  
            keynum = event.keyCode
        } else if (event.which) {
            keynum = event.which
        }
        if (keynum == 13) {

                    var exampleInputName2 = $('#exampleInputName2').val();

            if (exampleInputName2 === "")
            {
                alert("Por favor digite o CNPJ e CPF");
                return false;

            }



            validacao(exampleInputName2);




        }
    }

}
$(document).ready(function () {
    $("#linkAltera").click(function () {
        $("#caixaTexto").html("Este é o novo texto heehe!");
    });
});

$(function ($) {

    // No id #enviar assim que clicar executa a função
    $('#registrar').click(function () {
        var exampleInputName2 = $('#exampleInputName2').val();
        if (exampleInputName2 === "")
        {
            alert("Por favor digite o CNPJ/CPF");
            return false;

        }

        var brinde = $('#brinde').val();

        validacao(exampleInputName2, brinde, 4);



    });
});