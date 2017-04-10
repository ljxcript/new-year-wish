
onmessage = function(e) {
    var img = e.data[0].replace(/^data:image\/(png|jpg);base64,/, "");

    var xhr = new XMLHttpRequest();
    // xhr.addEventListener("progress", updateProgress, false);
    xhr.open("POST", "http://localhost/html/test.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("data="+img+"&filename="+e.data[1]);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == 'success') {
                postMessage(xhr.responseText);
            } else {
                postMessage('failed');
            }
                
        }
    }


    // function updateProgress(evt) {
    //     console.log('computing progress');
    //     if (evt.lengthComputable) {
    //         var percentComplete = evt.loaded / evt.total;
    //         postMessage(percentComplete);
    //     } else {
    //         console.log("can not compute the percentage");
    //     }
    // }

}


