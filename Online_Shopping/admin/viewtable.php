<?php
session_start();
$name=$_SESSION['eid'];
include("config.php");
$catg=$_REQUEST['view'];
$subcatg=$_REQUEST['view1'];

   $sel=mysql_query("select * from items where catg='$catg' and subcatg='$subcatg'");
    while($arr=mysql_fetch_array($sel))
   {
   $i=$arr['itemno'];
      echo "<form method='post'><table border='1' align='center'>
   <tr><td><font size='+1'><b>Item</b></font></td>
   <td><font size='+1'><b>Description</b></font></td></tr>";
   echo "<tr>
   <tr><td><img src='itempics/$i.jpg' height='200' width='200'></td>
   <td><b>Item No:</b>".$arr['itemno'].
   "<br><b>Price:</b>Rs&nbsp;".$arr['price'].
   "<br><b>Description:</b>".$arr['desc'].
   "<br><br><input type='checkbox' name='c1[]' value='$arr[dat]'/><b>Delete</b>
   </td>
   </tr></table>";
   

	
    }
		echo "<center><input type='submit' name='del' value='Delete'/></center></form>";
	
	if($_REQUEST['del'])
  {
    $c=$_REQUEST['c1'];
	if($c!=NULL)
	  {
	    $flag=0;
		foreach($c as $c1)
		  {
		  $sel=mysql_query("select * from items where dat='$c1'");
		  $arr=mysql_fetch_array($sel);
		  $catg=$arr['catg'];
		  $subcatg=$arr['subcatg'];
		  $img=$arr['img'];
		  $itemno=$arr['itemno'];
		  $price=$arr['price'];
		  $desc=$arr['desc'];
		  $t=date("d-m-y h-i-s");
		  
		   mysql_query("insert into trash values('$catg','$subcatg','$img','$itemno','$price','$desc','$t')");
		    mysql_query("delete from items where dat='$c1'");
		   $flag=1;
		   }
		   if($flag==1)
		     {
			   echo "<font size='+2'>item deleted successfully</font>";
			  }
			  else
			   {
			     echo "<font size='+2'>item is not deleted</font>";
				 }
		  }
		  else
		    {
			  echo "<font size='+2'>please select a checkbox</font>";
			 }
	 }	
 
  ?>