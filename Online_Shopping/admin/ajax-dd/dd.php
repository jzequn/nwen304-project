<?php
$cat_id=$_GET['cat_id'];
require "config.php";
$q=mysql_query("select * from subcategory where cat_id='$cat_id'");
echo mysql_error();
$myarray=array();
$str="";
while($nt=mysql_fetch_array($q)){
$str=$str . "\"$nt[subcategory]\"".",";
}
$str=substr($str,0,(strLen($str)-1)); // Removing the last char , from the string
echo "new Array($str)";

?>