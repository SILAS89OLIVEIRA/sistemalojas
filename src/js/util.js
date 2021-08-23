//jQuery(document).ready(function(){
//  jQuery(".button-collapse").sideNav(); 
//});
//Number(caipag_valor_total).toFixed(2);

function urlJava() {
    //var url = "http://192.168.0.34:8082/think/webresources/";
    var url = 'http://192.99.210.173:8082/think/webresources/';
    //var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/';
    return url;
}

function retornoLoja() {

    var loja = "21";

    return  loja;
}

function retornoLojaNome() {

    var loja = "M1";

    return  loja;
}


function retornoUrlEstoque() {

    //var url = "http://192.168.21.200/sistema_lojas_v2.0/src/services/"; 

    var url = "http://localhost/sistema_lojas_v2.0/src/services/";

    return  url;
}


function retornoUrlEstoqueLoja() {

    var url = urlJava();

    return  url;
}

function retornoUrlBrinde() {

    var url = urlJava();

    return  url;

}

function retornoUrlRevista() {

    ////var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();

    var url = retornoUrlEstoque();

    return  url;
}

function retornoUrlParalelo() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();



    return  url;
}

function retornoUrlLogin() {

   // var url = "http://localhost/sistemaloja/services/";
    var url = retornoUrlEstoque();



    return  url;
}

function retornoUrlGerarItem() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();


    return  url;
}
function retornoUrlEtiqueta() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();



    return  url;
}

function retornoUrlMensal() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();



    return  url;
}
function retornoUrlBuscadados() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();


    return  url;
}
function retornoUrlItensRevista() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();
    var url = retornoUrlEstoque();


    return  url;
}
function retornoUrlItensRomaneio() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();

    var url = retornoUrlEstoque();


    return  url;
}
function retornoUrlItensVendedora() {

    //var url = "http://localhost/sistemaloja/services/";   var url = retornoUrlEstoque();

    var url = retornoUrlEstoque();


    return  url;
}
function retornoUrlPedidosCaixa() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;
}


function retornoUrlMovimentacaoLoja() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();


    return  url;
}



function retornoUrlconsultameta() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;
}

function retornoUrlConsultaProduto() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;
}


function retornoUrlCliente() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;

}
function retornoUrlFinanceiro() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;

}
function retornoUrlResponsaveis() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();


    return  url;

}
function retornoUrlReferencias() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;

}
function retornoUrlContato() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;

}
function retornoUrlEndereco() {

    //var url  ="http://localhost/sistemaloja/services/" ;

    var url = retornoUrlEstoque();

    return  url;

}


function nomeMes(mes) {

    NomeMes = new Array(12);
    NomeMes[0] = "Janeiro";
    NomeMes[1] = "Fevereiro";
    NomeMes[2] = "Março";
    NomeMes[3] = "Abril";
    NomeMes[4] = "Maio";
    NomeMes[5] = "Junho";
    NomeMes[6] = "Julho";
    NomeMes[7] = "Agosto";
    NomeMes[8] = "Setembro";
    NomeMes[9] = "Outubro";
    NomeMes[10] = "Novembro";
    NomeMes[11] = "Dezembro";

    return NomeMes[mes];
}

function tratarValor(valor) {




    casas = 2,
            separdor_decimal = ',',
            separador_milhar = '.';
    var valor_total = parseInt(valor * (Math.pow(10, casas)));
    var inteiros = parseInt(parseInt(valor * (Math.pow(10, casas))) / parseFloat(Math.pow(10, casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10, casas))) % parseFloat(Math.pow(10, casas)));
//alert(inteiros);

    if (centavos % 10 === 0 && centavos + "".length < 2) {

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
    //alert(milhares);
    inteiros = inteiros % 1000;
    if(inteiros < 0){
        
        inteiros = inteiros*-1; 
        
    }
    //alert(inteiros);
    var novoValor = "";

    if (milhares !== 0) {
        novoValor = milhares + "" + separador_milhar + "" + novoValor;
        if (inteiros === 0) {
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



function diferencaDias(data1, data2) {
    data1 = new Date(data1);
    data2 = new Date(data2);
    var dif = Date.UTC(data1.getYear(), data1.getMonth(), data1.getDate(), 0, 0, 0) - Date.UTC(data2.getYear(), data2.getMonth(), data2.getDate(), 0, 0, 0);
    return Math.abs((dif / 1000 / 60 / 60 / 24));
}
function usuCodigod() {
    var usucod = document.getElementById('usucod1').innerText;
    console.log(usucod);
    return usucod;
}


function mensagem(tipo, titulo, mensagem) {

    var retorno = "<div class='alert alert-" + tipo + "'><strong>" + titulo + " ! </strong>" + mensagem + "</div>";
    return retorno;

}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function getForValidar() {

    var url = "http://localhost/sistemaloja/services/"

//  var url = 'http://192.168.0.33:8080/think/webresources/authFornecedor/getforcod'; 
//  var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/authFornecedor/getforcod';    
    alert("Leite");
    // window.location = url;
    var dados = jQuery(this).serialize();
    var codFab;
    $.get(url, function (dataReturn) {
        console.log(dataReturn);
        codFab = dataReturn.msg;
        // var cont = 0;
        //  alert(codFab);
        if (codFab === 'null') {
            window.location.href = "loginNovo.html";
            return false;
        }

        //  return codFab;   
    });



    //alert(codFab+"Leite1");
    return codFab;
}

function getUsuForValidar() {

    var url = "http://localhost/sistemaloja/services/"

    //  var url = 'http://192.168.0.33:8080/think/webresources/authFornecedor/getusucod'; 
    //    var url = 'http://192.168.0.38:8080/ERPBABITA/webresources/authFornecedor/getusucod'; 
    console.log(url);
    // window.location = url;
    var dados = jQuery(this).serialize();
    var codUsu = "";

    $.get(url, function (dataReturn) {
        console.log(dataReturn);
        codUsu = dataReturn.msg;
        // var cont = 0;
        //  alert(codFab);
        if (codUsu === 'null') {
            window.location.href = "loginNovo.html";
            return false;
        }


    });
    //return codFab;
}


Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};