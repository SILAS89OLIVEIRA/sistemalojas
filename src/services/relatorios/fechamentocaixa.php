<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
include_once('class/tcpdf/tcpdf.php');
include_once("class/PHPJasperXML.inc.php");
include_once ('setting.php');


//$loja = $_GET["loja"];
$sql = $_GET["sql"];

//$sql = " where caipag_data_caixa = '". $sql ."' order by forpag_desc, caipag_nomeclie ";


$PHPJasperXML1 = simplexml_load_file("fechamentocaixa.jrxml");
$PHPJasperXML = new PHPJasperXML();
//$PHPJasperXML->debugsql=true;

//$PHPJasperXML->arrayParameter=array("loja"=>$loja); 
$PHPJasperXML->arrayParameter=array("sql"=>$sql); 
$PHPJasperXML->xml_dismantle($PHPJasperXML1);


$PHPJasperXML->transferDBtoArray($server,$user,$pass,$db, "psql");

//error_reporting(E_ALL);

$PHPJasperXML->outpage("I");    //page output method I:standard output  D:Download file



?>
