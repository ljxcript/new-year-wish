<?php
	$data = $_POST['data'];  
	$unique_name = $_POST['imageName'];
	$wish_time = $_POST['time'];


        if ( strpos($data, "drop") == FALSE && strpos($unique_name,"drop") ==FALSE  && strpos($wish_time, "drop") == FALSE) {
	    if (!$unique_name) {
	  	exit(); 
	    } else {
	    	$con = mysql_connect("localhost", "root", "host-Network-sysutw");
	    	if (!$con){
			die('Could not connect: ' . mysql_error());
	    	}   

	    	mysql_select_db("wish", $con);
                

#                mysql_query("update wish_list set wish = '".data."' where id = 24;";       
	    	mysql_query("INSERT INTO wish_list  (wish, imageName, date) 
	    	VALUES ( '".$data."', '".$unique_name."', '".$wish_time."')");


	    	mysql_close($con);

	    	echo 'success'; 
       	    }
       } else {
            exit();
       }

?>
