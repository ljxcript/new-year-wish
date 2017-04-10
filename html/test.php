<?php
	$data = $_POST['data'];  
	$unique_name = $_POST['filename'];
	$encodedData = str_replace(' ','+',$data);  
	$image=base64_decode($encodedData);    
	$filename = '../upload_imgs/'.$unique_name.'.png';    
        $fp = fopen($filename, 'w') or die("failedOpen");
        fwrite($fp, $image);  
        fclose($fp);

	echo 'success'; 
?>
