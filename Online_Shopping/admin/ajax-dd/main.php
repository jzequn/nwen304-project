<html>
<body>

<script type="text/javascript">
function AjaxFunction(cat_id)
{
var httpxml;
try
  {
  // Firefox, Opera 8.0+, Safari
  httpxml=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
		  try
   			 		{
   				 httpxml=new ActiveXObject("Msxml2.XMLHTTP");
    				}
  			catch (e)
    				{
    			try
      		{
      		httpxml=new ActiveXObject("Microsoft.XMLHTTP");
     		 }
    			catch (e)
      		{
      		alert("Your browser does not support AJAX!");
      		return false;
      		}
    		}
  }
function stateck() 
    {
    if(httpxml.readyState==4)
      {

var myarray=eval(httpxml.responseText);
// Before adding new we must remove previously loaded elements
for(j=document.testform.subcat.options.length-1;j>=0;j--)
{
document.testform.subcat.remove(j);
}


for (i=0;i<myarray.length;i++)
{
var optn = document.createElement("OPTION");
optn.text = myarray[i];
optn.value = myarray[i];
document.testform.subcat.options.add(optn);

} 
      }
    }
	var url="dd.php";
url=url+"?cat_id="+cat_id;
url=url+"&sid="+Math.random();
httpxml.onreadystatechange=stateck;
httpxml.open("GET",url,true);
httpxml.send(null);
  }
</script>

<form name="testform" method='POST' action='mainck.php'>Name:<input type=text name=fname>
Select first one <select name=cat onChange="AjaxFunction(this.value);">
<option value=''>Select One</option>
<?php
require "config.php";// connection to database 
$q=mysql_query("select * from category ");
while($n=mysql_fetch_array($q)){
echo "<option value=".$n['cat_id'].">".$n['category']."</option>";
}

?>
</select>

<select name=subcat>

</select>
<input type=submit value=submit>
</form>

</body>
</html>