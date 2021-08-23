var $jx = jQuery.noConflict();
$jx(document).ready(function () {

    Chamada3();

    var dataa = new Date();
    var ano = dataa.getFullYear();

    var i = 0;
    
    var anoArr = []; 
    for (i = 0; i < 4; i++) {
        ano = ano - 1;
        anoArr[i] = ano
        console.log(ano)
    }

    console.log('---------------------------------------------------------')
    console.log(anoArr)

    function Chamada3(id, urll) {


        var url = retornoUrlconsultameta() + 'consultameta.php?status=1';


        $jx.ajax({
            //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
            url: url,
            type: "GET",
            dataType: "json",
            // data : "param-no",
            success: function (html) {
                // var fat = $jx('.'+id);
                var fat1 = $jx('#tablemeta');
                var sql = "";

                sql = sql + ('<table id="tablemeta2" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th>CÓD.</th><th>NOME</th><th>DATA INÍCIAL</th><th> DATA FINAL</th><th>VALOR REVISTA MENSAL</th><th>VALOR PARALELO MENSAL</th><th>VALOR ACESSÓRIO MENSAL</th><th>STATUS</th></tr></thead>');

                cont = 1;
                cont2 = 1;
                var html = html.data;
                $jx.each(html, function (key, value) {

                    if (cont > 1) {


                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

                //	fat.append("</table>")	
                sql = sql + ("</table>");
                fat1.empty();


                fat1.append(sql);


            }, error: function (e) {
                alert(e);
            }
        });
    }
    ;
    var urlvendedora = retornoUrlItensVendedora() + 'vendedores.php';

    var dados = '';
    $jx.ajax({
        type: "GET",
        url: urlvendedora,
        data: dados,
        dataType: "json",
        success: function (data)
        {
            console.log(data);

            $jx('#metvend').html(comboxvalorvendedora("metvend", data, "numero", "nome"));  //coloco na div o retorno da requisica 
        }
    });




    $jx("#bntmet").click(function () {
        var dados = jQuery(this).serialize();




        var vendedora = $jx('#metvend').val();
        var revista = $jx('#metrev').val();
        var paralelo = $jx('#metpara').val();
        var acessorio = $jx('#metacess').val();
        var total = $jx('#metatotal').val();
        revista = revista.replace(',', '.');
        paralelo = paralelo.replace(',', '.');
        acessorio = acessorio.replace(',', '.');
        total = total.replace(',', '.');


        var dataini = $jx('#datepicker10').val();

        var datafim = $jx('#datepicker11').val();
        cont = 1;
        cont2 = 1;

        $jx("#metpara").val('');
        $jx("#metrev").val('');
        $jx("#metvend").val('');
        $jx("#metacess").val('');
        $jx("#datepicker10").val('');
        $jx("#datepicker11").val('');
        if (dataini === "") {

            alert("Data inicial é obrigatório");
            return false;
        }
        if (datafim === "") {

            alert("Data final é obrigatório");
            return false;
        }

        var dataini2 = dataini;
        var datainiDia = dataini2.split('/')[0];
        var datainiMes = dataini2.split('/')[1];
        var datainiAno4 = dataini2.split('/')[2];
        dataini = datainiAno4 + "-" + datainiMes + "-" + datainiDia;

        var datafim2 = datafim;
        var datafim2Dia = datafim2.split('/')[0];
        var datafim2Mes = datafim2.split('/')[1];
        var datafim2Ano4 = datafim2.split('/')[2];
        datafim = datafim2Ano4 + "-" + datafim2Mes + "-" + datafim2Dia;

        if (vendedora === '0' || vendedora === null || vendedora === '') {

            alert("Selecione Vendedora, obrigatório!!");
            return false;
        }
        console.log(vendedora);

        if (revista === '0' || revista === null || revista === '') {

            revista = 0;
        }
        console.log(revista);

        if (paralelo === '0' || paralelo === null || paralelo === '') {

            paralelo = 0;
        }
        console.log(paralelo);

        if (acessorio === '0' || acessorio === null || acessorio === '') {

            acessorio = 0;

        }

        if (total === null || total === '') {

            alert("Total é obrigatório");

        }
        console.log(acessorio);



        var url = retornoUrlItensVendedora() + 'cadastrometa.php?codvend=' + vendedora + '&valmetpar=' + paralelo + '&valmetrev=' + revista + '&valmetaces=' + acessorio + '&periodoini=' + dataini + '&periodofim=' + datafim + '&usuario=1&total=' + total;
        console.log(url);

        $jx.ajax({
            //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
            url: url,
            type: "GET",
            dataType: "json",
            // data : "param-no",
            success: function (html) {
                // var fat = $jx('.'+id);
                var fat1 = $jx('#tablemeta');
                var sql = "";

                sql = sql + ('<table id="tablemeta2" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th>CÓD.</th><th>NOME</th><th>DATA INÍCIAL</th><th> DATA FINAL</th><th>VALOR REVISTA MENSAL</th><th>VALOR COLEÇÃO MENSAL</th><th>VALOR ACESSÓRIO MENSAL</th><th>STATUS</th></tr></thead>');

                cont = 1;
                cont2 = 1;
                var html = html.data;
                $jx.each(html, function (key, value) {

                    if (cont > 1) {


                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

                //	fat.append("</table>")	
                sql = sql + ("</table>");
                fat1.empty();

                fat1.append(sql);


            }, error: function (e) {
                alert(e);
            }
        });




    });

    $jx("#vinculado").change(function () {


        var dados = jQuery(this).serialize();

        var vinculado = $jx("input[name='tipo']:checked").val();

        console.log(vinculado);



        var url = retornoUrlconsultameta() + 'consultameta.php?status=' + vinculado;





        console.log(url);

        $jx.ajax({
            //"http://192.168.0.251:8082/ERPBABITA-1.0/webresources/com.babita.modeller.viewvendasfaturamento"
            url: url,
            type: "GET",
            dataType: "json",
            // data : "param-no",
            success: function (html) {
                // var fat = $jx('.'+id);
                var fat1 = $jx('#tablemeta');
                var sql = "";

                sql = sql + ('<table id="tablemeta2" class="responsive-table table bordered highlight input-sm striped"><thead class=\"blue darken-1 white-text\"><tr class="success"><th>CÓD.</th><th>NOME</th><th>DATA INÍCIAL</th><th> DATA FINAL</th><th>VALOR REVISTA MENSAL</th><th>VALOR PARALELO MENSAL</th><th>VALOR ACESSÓRIO MENSAL</th><th>STATUS</th></tr></thead>');

                cont = 1;
                cont2 = 1;
                var html = html.data;
                $jx.each(html, function (key, value) {

                    if (cont > 1) {


                        sql = sql + ("<tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr></tbody>");

                        cont = 1;
                        cont2++;
                    } else {
                        sql = sql + ("<tbody><tr><td>" + cont2 + "</td><td>" + value.ven_cod + " - " + value.nome + "</td><td>" + value.met_periodo_ini + "</td><td>" + value.met_periodo_fim + "</td><td>" + tratarValor(value.met_valrevmen) + "</td><td>" + tratarValor(value.met_valparmen) + "</td><td>" + tratarValor(value.met_valacesmen) + "</td><td>" + value.status + "</td></tr>");

                        cont = 2;
                        cont2++;
                    }

                });

                //	fat.append("</table>")	
                sql = sql + ("</table>");
                fat1.empty();

                fat1.append(sql);


            }, error: function (e) {
                alert(e);
            }
        });

    });
});

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode : e.which;

    if ((tecla > 47 && tecla < 58) || tecla === 44)
        return true;
    else {
        if (tecla == 8 || tecla == 0)
            return true;
        else
            return false;
    }
}