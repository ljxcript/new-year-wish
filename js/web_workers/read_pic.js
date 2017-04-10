

onmessage = function (e) {
	var reader = new FileReader();
	var result = e.data;

	reader.readAsDataURL(result);
	reader.onload = function() {

		postMessage(reader.result);

	}

}
