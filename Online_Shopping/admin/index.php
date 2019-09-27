<?php
error_reporting(1);
include("config.php");
$name=$_REQUEST['t1'];
$pass=$_REQUEST['p1'];

if($_REQUEST['sub'])
 {
 $sel=mysql_query("select name,pass from details where name='$name'");
 $arr=mysql_fetch_array($sel);
 if($arr['name']==$name and $arr['pass']==$pass)
   {
   session_start();
   $_SESSION['eid']=$name;
  header("location:home.php");
  }
  else
   {
     $er="name and password do not match";
	 }
}	 
?>
<html>
<head>
<script>
function nam()
{
  var nam=/^[a-zA-Z]{4,15}$/;
   if(document.f1.t1.value.search(nam)==-1)
    {
	 alert("enter correct name");
	 document.f1.t1.focus();
	 return false;
	 }
	} 
		function pass()
	{
	var pass=/^[a-zA-Z0-9-_]{6,16}$/;
   if(document.f1.p1.value.search(pass)==-1)
    {
	 alert("enter correct pass");
	 document.f1.p1.focus();
	 return false;
	 }
	 }
	 
	 	
function vali()
{
  var nam=/^[a-zA-Z]{4,15}$/;
  var pass=/^[a-zA-Z0-9-_]{6,16}$/;
	 if(document.f1.t1.value.search(nam)==-1)
    {
	 alert("enter correct name");
	 document.f1.t1.focus();
	 return false;
	 }
	  else if(document.f1.p1.value.search(pass)==-1)
    {
	 alert("enter correct pass");
	 document.f1.p1.focus();
	 return false;
	 }
	 	 else 
	{
	 return true;
	 }
	 }
	
</script>
</head>
<body background="usepics/p3.jpg">
<!--<div><center><img src="pics/logo.jpg" height="150"></center></div>
<div>
<div style="width:35%;float:left"><marquee behavior="scroll" direction="left" bgcolor="#99CCFF" height="50"><font size="+3" color="#000000"><b>New Services on GMail...</b></font></marquee><br/>
<center><img src="pics/buzz_video.gif"></center><br/><b>Google Buzz in Gmail</b>

Share updates, photos, videos and more right inside of Gmail. Start conversations about the things you find interesting. Learn more at buzz.google.com or in the Help Center.<br/>
<center><img src="pics/priority-inbox-video.gif"></center><br/><b>Get through your email faster with Priority Inbox</b>

Email is great, except when there’s too much of it. Priority Inbox automatically identifies your important messages and separates them out from everything else, so you can focus on what really matters. Learn more<br/>
<center><img src="pics/cell.jpg"></center><br/><b>Mobile access</b>
Get Gmail on your mobile phone. Learn more  </div>
<div style="width:64%;float:right">-->
<div><br><h1 align="center"><font face="Courier New, Courier, monospace">ADMINISTRATOR LOGIN</font></h1>
</div>

<br><br><br><br><br>
<div style="width:100%;float:left" align="center" >
<center><fieldset style="background:#FFFFFF;width:300;height:130">
<br>
<table width="200" border="0" align="center">
<form method="post" name="f1" onSubmit="return vali()">
<tr><td colspan="2"><?php echo "<font color='red'>$er</font>";?></td></tr>
  <tr>
    <td width="81">UserName:</td>
    <td width="103"><label>
      <input name="t1" type="text" id="t1" onChange="return nam()">
    </label></td>
  </tr>
  <tr>
    <td>Password:</td>
    <td><input name="p1" type="password" id="p1" onChange="return pass()"></td>
  </tr>
 
  <tr>
    <td colspan="2" align="center"><label>
      <input name="sub" type="submit" id="sub" value="Login">
    </label></td>
   
  </form>
</table>
</fieldset></center>
</div>


<!--<div style="width:100%;float:left"><center><b>Copyright&copy;Priya Gupta</b></center></div>
</div>-->

</body>
</html>