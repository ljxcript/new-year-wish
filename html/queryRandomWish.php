<?php

	$fetchNumber = $_GET['fetchN'];



	$con = mysql_connect("localhost", "root", "host-Network-sysutw");
	if (!$con){
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("wish", $con);

	$result = mysql_query("SELECT * FROM wish_list  ORDER BY RAND() LIMIT ".$fetchNumber);


	echo "{";
	$index = 0;
	while($row = mysql_fetch_array($result))
	  {
		  $index = $index+1;
		  echo "wish".$index.":";
		  echo "{id:".$row['id'].", wish:'".$row['wish'] . "'," ."image:'". $row['imageName'] . "'," ."date:'". $row['date'];
		  echo "'},";
	  }
	mysql_close($con);
	echo "totalWish:".$fetchNumber."}";
?>