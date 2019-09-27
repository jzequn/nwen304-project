<?php
session_start();
$name=$_SESSION['eid'];
include("config.php");

$img=$_FILES['file']['tmp_name'];
$desc=$_REQUEST['text'];
$catg=$_REQUEST['sel'];
$subcatg=$_REQUEST['sel2'];
if($_REQUEST['sub'])
  {
    if(mysql_query("delete from items where catg='$catg' and subcatg='$subcatg' "))
	   {
	   
		
	    echo "item deleted successfully";
		}
	else
	 {
	   echo "item is not deleted";
	   }
	}   
		 
?>

<style type="text/css">
<!--
.style3 {font-size: 18px; font-weight: bold; }
-->
</style>
<body>
<br><br><br>
<center><font color="#660066" size="+2">Delete Item</font></center>
<br><br><br>
<form method="post" enctype="multipart/form-data">
<table align="center">
<tr><td><span class="style3">Category:</span></td>
<td><select name="sel">
  <option value="men" selected>men</option>
  <option value="women">women</option>
  <option value="kids">kids</option>
</select></td>
</tr>
<tr><td><span class="style3"> Sub Category:</span></td>
<td><select name="sel2">
  <option value="Casual Shirts" selected>Casual Shirts</option>
  <option value="jeans">jeans</option>
  <option value="T-shirts">T-shirts</option>
  <option value="Footwear">Footwear</option>
  <option value="Shorts">Shorts</option>
  <option value="watches">watches</option>
    <option value="Dresses">Dresses</option>
  <option value="Churidar Suits">Churidar Suits</option>
  <option value="kurtas">Kurtas</option>
  <option value="Sandals">Sandals</option>
  <option value="Office Wear">Office Wear</option>
  <option value="Artificial Jewellery">Artificial Jewellery</option>
  <option value="Baby Apparel">Baby Apparel</option>
  <option value="Girls  Apparel">Girls  Apparel</option>
  <option value="Boys  Apparel">Boys  Apparel</option>
  <option value="Kids Toys">Kids Toys</option>
</select></td>
</tr>
<tr>
<td><span class="style3">Image:</span></td>
<td><input name="file" type="file"></td></tr>
<tr>
<td><span class="style3">Description:</span></td>
<td><textarea name="text" cols="35" rows="6"></textarea></td></tr>
<tr><td  colspan="2" align="center"><input name="sub" type="submit"></td></tr>
</table></form>
</body>
