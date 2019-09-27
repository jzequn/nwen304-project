<?php
session_start();
$name=$_SESSION['eid'];
include("config.php");
$catg=$_REQUEST['cat'];
$subcatg=$_REQUEST['subcat'];
if($_REQUEST['sub'])
{
 echo "<script>location.href='home.php?view=$catg & view1=$subcatg'</script>";
}

  
?><head>
<script>
function showUser(str)
{
if (str=="")
{
document.getElementById("txtHint").innerHTML="";
return;
}

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}



xmlhttp.onreadystatechange=function()
{
if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
document.getElementById("subcat").innerHTML=xmlhttp.responseText;
}
}
//alert(str);
xmlhttp.open("GET","dd.php?q="+str,true);
xmlhttp.send();
}

</script>

</head>


<style type="text/css">
<!--
.style4 {
	font-size: 18px;
	font-weight: bold;
}
-->
</style>
<body>
<br><br><br>
<center><font color="#660066" size="+3">View All</font></center>
<br><br>
<center><fieldset style="width:50%">
<form  name="testform" method="post" enctype="multipart/form-data" >

<table align="center">
<tr><td width="118"><span class="style4">Category:</span></td>

<td width="281"><select name=cat onChange="showUser(this.value)">
  <option value=''>Select One</option>
 <?php
require "config.php";// connection to database 
$q=mysql_query("select * from category ");
while($n=mysql_fetch_array($q)){
echo "<option value=".$n['cat_id'].">".$n['category']."</option>";
}
?>

</select></td>
</tr>

<tr><td><span class="style4"> Sub Category:</span></td>
<td><select name=subcat id="subcat">

</select></td>
</tr>
<br>
<br>
<tr><td colspan="2" align="center"><input  name="sub" type="submit" value="View" ></td></tr>
</table>
</form>
</fieldset></center>
</body>