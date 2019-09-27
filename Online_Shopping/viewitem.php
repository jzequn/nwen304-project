<?php
include("config.php");
$itemno=$_REQUEST['itemno'];

   $sel=mysql_query("select * from items where itemno='$itemno'");
    while($arr=mysql_fetch_array($sel))
   {
   $i=$arr['itemno'];
      echo "<br><form method='post'>
	  <center><h2><font face='Lucida Handwriting' size='+1' color='#CC99CC'>".$arr['desc']."</font></h2><br><br>
	<fieldset style='width:80%'><table border='0' >";
  
   echo "<tr>
   <tr><td><img src='itempics/$i.jpg' height='300' width='300'></td>
   <td><b><font face='Comic sans MS' size='+1'>Item No:</b>".$arr['itemno'].
   "<br><b>Price:</b>Rs&nbsp;".$arr['price'].
   "<br><b>Product Details:<br></b>".$arr['info'].
   " </font><br><br><a href='index.php?con=12 & itemno=$i'><img src='images/MetalPlakDa5new.gif' width='70' height='20'/></a>  </td>
   </tr></table></fieldset></center>";
    }
	?>