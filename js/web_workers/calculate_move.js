


onmessage = function(e) {
	var scene = e.data[0];
	var camera = e.data[1];

	function render () {
		postMessage([scene, camera]);
		requestAnimationFrame(render);
	}

	render();
}
