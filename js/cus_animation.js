var moveSeagull = moveSeagullClosure();
var moveDeer = moveDeerClosure();


function moveDeerClosure() {
	var motionIncrement = 0.03;
	var rotationIncrement = 0.2;
	var deerDelta = +0.2;
	var r = 5;
	var direction = 1;
	return function() {
		var d = animationGroup["deer"];

		var x = d.position.x;
		var z = d.position.z;
		var tempR = d.rotation.y;

		if (direction == 1) {
			d.position.x = x+motionIncrement;
			if (x > 5) {
				if (tempR < 0) {

					d.rotation.y = tempR+Math.PI/180;
					d.position.z -= motionIncrement;
				} else {
					direction = 2;
				}

			}
		} 
		if (direction == 2) {
			d.position.z = z-motionIncrement;
			if (z < - 4) {
				if (tempR < Math.PI/2) {
					d.rotation.y = tempR+Math.PI/180;
					d.position.x -= motionIncrement;
				} else {
					direction = 3;
				}
			}
		}

		if (direction == 3) {
			d.position.x = x-motionIncrement;
			if (x < -4.5) {
				if (tempR < Math.PI) {
					d.rotation.y = tempR+Math.PI/180;
					d.position.z += motionIncrement;
				} else {
					direction = 4;
				}
			}
		}

		if (direction == 4) {
			d.position.z = z + motionIncrement;
			if (z > 3.5) {
				if (tempR < Math.PI/2*3) {
					d.rotation.y = tempR+Math.PI/180;
					d.position.x += motionIncrement;					
				} else {
					direction = 1;
					d.rotation.y = -1.57;
				}
			}
		}
	}

}


function moveSeagullClosure() {
	var motionIncrement = [1,1];
	var rotationIncrement = [0.5, 0.5];
	var seagullDelta = [+0.4, -0.8];
	var seagullDirection = [1, -1];
	var seagullName = ["seagull", "seagull_2"];

	return function moveSeagull(i) {
			var s = animationGroup[seagullName[i]];
			var r = 4;
			var degree = Math.PI *  (motionIncrement[i] <<1) / 360;
			motionIncrement[i] = (motionIncrement[i] + seagullDelta[i]) % 360;
			var x = -1 * r * Math.sin(degree);
			var z = -1 * r * Math.cos(degree);
			var y = 6 * Math.sin(degree) * seagullDirection[i];
			rotationIncrement[i] = (rotationIncrement[i] + 0.008 * seagullDirection[i]) % 20;
			s.rotation.y = rotationIncrement[i];
			s.position.set(x, y, z);
		}
}
