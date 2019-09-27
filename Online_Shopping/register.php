<?php
include("config.php");
$title=$_REQUEST['sel1'];
$fname=$_REQUEST['t1'];
$lname=$_REQUEST['t2'];
$gen=$_REQUEST['r1'];
$id=$_REQUEST['t3'];
$pass=$_REQUEST['p1'];
$phone=$_REQUEST['t5'];
$add=$_REQUEST['t6'];
$city=$_REQUEST['t7'];
$coun=$_REQUEST['t8'];
$dob=$_REQUEST['t9'];
if($_REQUEST['sub'])
{
$sel=mysql_query("select id from register where id='$id' ");
$arr=mysql_fetch_array($sel);

if($arr['id']!=$id)
  {
   if(mysql_query("insert into register values('$title','$fname','$lname','$gen','$id','$pass','$phone','$add','$city','$coun','$dob')"))
	   {
	      
	     echo "<script>location.href='index.php?con=13 & wel=$id'</script>";
	   }
	 }
else 
{
echo "user already exists";
}

}
?>
<html>
<head>
<script>
function fnam()
{
  var fnam=/^[a-zA-Z]{4,15}$/;
   if(document.f1.t1.value.search(fnam)==-1)
    {
	 alert("enter correct  first name");
	 document.f1.t1.focus();
	 return false;
	 }
	} 
	 
	 function lnam()
{
  var lnam=/^[a-zA-Z]{4,15}$/;
   if(document.f1.t2.value.search(lnam)==-1)
    {
	 alert("enter correct last name");
	 document.f1.t2.focus();
	 return false;
	 }
	} 
	 
function email()
{
 var email=/^[a-zA-Z0-9-_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
   if(document.f1.t3.value.search(email)==-1)
    {
	 alert("enter correct email");
	 document.f1.t3.focus();
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
	function phone()
	{
	var phn=/^[0-9]{9,14}$/;
  if(document.f1.t5.value.search(phn)==-1)
    {
	 alert("enter correct phone no");
	 document.f1.t5.focus();
	 return false;
	 }
	 }
	
	function add()
	{
	var add=/^[a-zA-Z0-9- ]{10,150}$/;
  if(document.f1.t6.value.search(add)==-1)
    {
	 alert("enter correct address");
	 document.f1.t6.focus();
	 return false;
	 }
	 }
	 
	 function city()
	 {
	 var city=/^[a-zA-Z]{5,30}$/;
	 if(document.f1.t7.value.search(city)==-1)
    {
	 alert("enter correct city");
	 document.f1.t7.focus();
	 return false;
	 }
	
	 }
	  function coun()
	 {
	 var city=/^[a-zA-Z]{5,30}$/;
	 if(document.f1.t8.value.search(city)==-1)
    {
	 alert("enter correct country");
	 document.f1.t8.focus();
	 return false;
	 }
	
	 }
	
function vali()
{
  var nam=/^[a-zA-Z]{4,15}$/;
   var email=/^[a-zA-Z0-9-_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    var pass=/^[a-zA-Z0-9-_]{6,16}$/;
	 	var phn=/^[0-9]{9,14}$/;
	  var add=/^[a-zA-Z0-9 ]{10,150}$/;
	  var city=/^[a-zA-Z]{5,30}$/;
	  
   if(document.f1.t1.value.search(nam)==-1)
    {
	 alert("enter correct  first name");
	 document.f1.t1.focus();
	 return false;
	 }
	 	 
  else if(document.f1.t2.value.search(nam)==-1)
    {
	 alert("enter correct last name");
	 document.f1.t2.focus();
	 return false;
	 }
 
  else if(document.f1.t3.value.search(email)==-1)
    {
	 alert("enter correct login name");
	 document.f1.t3.focus();
	 return false;
	 }
	 
	
	
   else if(document.f1.p1.value.search(pass)==-1)
    {
	 alert("enter correct pass");
	 document.f1.p1.focus();
	 return false;
	 }
	 
	
	  else if(document.f1.t5.value.search(phn)==-1)
    {
	 alert("enter correct phone no");
	 document.f1.t5.focus();
	 return false;
	 }
	 
	
  else if(document.f1.t6.value.search(add)==-1)
    {
	 alert("enter correct address");
	 document.f1.t6.focus();
	 return false;
	 }
	
	 
	 
	 
	else if(document.f1.t7.value.search(city)==-1)
    {
	 alert("enter correct city");
	 document.f1.t7.focus();
	 return false;
	 }
	 
		else if(document.f1.t8.value.search(city)==-1)
    {
	 alert("enter correct country");
	 document.f1.t8.focus();
	 return false;
	 }
	 
	 else 
	{
	 return true;
	 }
	 }
	
	 
</script> 
</head>
<body>


<div><br/><center><h2><font face="Lucida Handwriting" size="+1" color="#00CCFF">Register Yourself</font></h2></center></div>
<div>
<div style="width:25%;float:right">
<br><br><br><br><br>
<img src="usepics/7.jpg">
</div>
<br><br>
<center><div style="width:70%;float:right" align="center">
<fieldset style="background:#CC99CC;width:50%">
<br><br>
<form method="post" name="f1" onSubmit="return vali()">
<table width="366" border="0" align="center">

  <tr>
    <td><div align="center"><strong><font size="+1" face="Comic Sans MS">Title:</font></strong></div></td>
    <td><label>
      <select name="sel1" id="sel1">
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
      </select>
    </label></td>
  </tr>
  <tr>
    <td width="164"><div align="center"><font size="+1" face="Comic Sans MS"><b> First&nbsp;Name:</b></font></div></td>
    <td width="192">
      
        <input name="t1" type="text" id="t1" onChange="return fnam()">    </td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><strong>Last name:</strong></font></div></td>
    <td><input name="t2" type="text" id="t2" onChange="return lnam()" ></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><b>&nbsp;Gender:</b> </font></div></td>
    <td><input name="r1" type="radio" value="male">
      <strong>Male</strong>
        <input name="r1" type="radio" value="female">
        <strong>Female</strong></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><b>&nbsp;Enter Email : </b></font></div></td>
    <td><input name="t3" type="text" id="t3" onChange="return email()"></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><b>&nbsp;Choose a  Password:</b> </font></div></td>
    <td><input name="p1" type="text" id="p1" onChange="return pass()"></td>
  </tr>
  <tr> <td><div align="center"><font size="+1" face="Comic Sans MS"><b>Phone no: </b></font></div></td>
    <td><input name="t5" type="text" id="t5" onChange="return phone()"></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><strong>Address:</strong></font></div></td>
    <td><label>
      <textarea name="t6" id="t6" value="return add()"></textarea>
    </label></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><strong>City:</strong></font></div></td>
    <td><input name="t7" type="text" id="t7" onChange="return city()"></td>
  </tr>
  <tr>
    <td><div align="center"><font size="+1" face="Comic Sans MS"><strong>Country:</strong></font></div></td>
    <td><input name="t8" type="text" id="t8" onChange="return coun()"></td>
  </tr>
  <tr>
    <td><div align="center"><strong><font size="+1" face="Comic Sans MS">Date of Birth: </font></strong></div></td>
    <td><label>
      <input name="t9" type="text" id="t9">
    </label></td>
  </tr>
  <tr>
    <td colspan="2"><label><br>
    <center>
      <input name="sub" type="submit" id="sub" value="Create my Account">
    </center>
    </label></td>
    </tr>
 
</table>
 </form>
</fieldset>
</div>
</center>

</div>

</body>
</html>