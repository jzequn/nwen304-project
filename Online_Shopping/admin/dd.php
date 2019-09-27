<?php
$cat_id=$_GET['cat_id'];
require "config.php";
$q=$_GET["q"];

$sql="SELECT * FROM subcategory WHERE cat_id ='$q'";

$result = mysql_query($sql);

 


while($row = mysql_fetch_array($result))
{
echo "<option>" . $row['subcategory'] . "</option>";
}
//echo "</select>";
?>