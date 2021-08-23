<?php 
 function getConn()
{
 try {
   return  new PDO("pgsql:host=192.168.21.100 dbname=bd_prontaentrega user=postgres password=super");
 } catch (PDOException  $e) {
    print $e->getMessage();
 }
}
 ?>

<?php 
/* function getConnInterna()
{
 try {
  return  new PDO("pgsql:host=192.168.0.250  dbname=bd_logistica user=postgres password=09182736"); 
 } catch (PDOException  $e) {
    print $e->getMessage();
    echo   $e->getMessage();
 }
}
*/

 function getConnGeral($ip, $nombanco, $user,$senha)
{
 try {
   return  new PDO("pgsql:host=".$ip." dbname=".$nombanco." user=".$user." password=".$senha);

 } catch (PDOException  $e) {
    print $e->getMessage();
 }
}
 ?>

