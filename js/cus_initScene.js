


var renderToggle = 1;

var beginParticleNumber = 600;


var beginParticleSystem;
var beginParticleSystemPositionArray;

var randomVelocity = new Float32Array(beginParticleNumber);
var R_array = new Float32Array(beginParticleNumber);
var asinArray = new Float32Array(beginParticleNumber);



var animationGroup = {};
animationGroup.mixers = [];

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();


var pic_circle = [];



///////////////////
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFF6666);
document.body.appendChild( renderer.domElement );

// var axes = new THREE.AxisHelper(220);
// scene.add(axes);
var orbitControls = new THREE.OrbitControls(camera);
// orbitControls.autoRotate = true;
var clock = new THREE.Clock();
scene.fog = new THREE.Fog(0xffffff, 20, 200);
var light = new THREE.PointLight(0xF3F2A9);
light.position.set(-2.8,-2,-2);
scene.add(light);
var light2 = new THREE.PointLight(0xF3F2A9);
light2.position.set(2.9,-2,0);
scene.add(light2);

var globalLight = new THREE.AmbientLight( 0x404040 ); // soft white globalLight to global objects
scene.add( globalLight );


hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.7 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 0.1, 0.75 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );




var sphere = new THREE.SphereGeometry( 9, 32, 16 );
var material1 = new THREE.MeshPhysicalMaterial( {
			map: null,
			color: 0x000000,
			metalness: 0.0,
			roughness: 0,
			opacity: 0.3,
			side: THREE.BackSide,
			transparent: true,
			shading: THREE.SmoothShading,
			envMapIntensity: 1,
			premultipliedAlpha: true
		} );

var ball = new THREE.Mesh(sphere, material1);
ball.name = 'ball';	
scene.add(ball);


// loadMeshes(scene, animationGroup);


camera.position.y = 0;
camera.position.z = 20;



createParticles();
createTheMovingParticles();
createParticlesForUniverse();







function render () {


		if (pic_circle.length != 0)
		for (var i = 0; i < pic_circle.length; i++) {
			if (pic_circle[i].position.y > 5) {
				pic_circle[i].position.y -= random_V[i]*2;
			}
			pic_circle[i].rotation.y = (pic_circle[i].rotation.y + Math.random()*0.03*Math.PI)%Math.PI;
		}


		beginParticleMove();
		if (moveSeagull) {
			if (animationGroup.seagull) {
				moveSeagull(0);
			}
			if (animationGroup.seagull_2) {
				moveSeagull(1);
			}
		}
				
		if (moveDeer)	{
			if (animationGroup.deer) {
				moveDeer();
			}
		}

	// TWEEN.update();

	var delta = clock.getDelta();
	orbitControls.update(delta);
	if (animationGroup.mixers) {
		animationGroup.mixers.forEach(function  (e) {
			// if (e)
				e.update(delta);
		});
	}
	renderer.render(scene,camera);
	
	if (renderToggle == 1) 
		requestAnimationFrame(render);
	else 
		return;
}

// render();








function createTheMovingParticles() {
	var uniforms, geometry;
	var particles = beginParticleNumber;
	uniforms = {
		texture:   { value: new THREE.TextureLoader().load( "../imgs/particle2.png" ) }
	};
	var shaderMaterial = new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		blending:       THREE.AdditiveBlending,
		depthTest:      false,
		transparent:    true
	});
	var radius = 20;
	geometry = new THREE.BufferGeometry();
	var positions = new Float32Array( particles * 3 );
	var sizes = new Float32Array( particles );

	for ( var i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {
		// positions[ i3 ] = ( Math.random() * 2 - 1 ) * radius;
		var degree = Math.PI * 2 * Math.random();
		var tempRadius = Math.sqrt(getNormalDistribution(70,10));
		positions[ i3 ] = tempRadius*Math.sin(degree);
		positions[ i3 + 2 ] = tempRadius*Math.cos(degree);

		positions[ i3 + 1 ] = -7;

		randomVelocity[i] = Math.random()*0.04;
		R_array[i] = Math.pow(tempRadius, 2);
		sizes[ i ] = 0.6*Math.random();
	}
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
	beginParticleSystem = new THREE.Points( geometry, shaderMaterial );
	beginParticleSystemPositionArray = beginParticleSystem.geometry.attributes.position.array;
	scene.add( beginParticleSystem );			
	cal();

}


function createParticles() {
	var particleSystem;
	var particles = 500;
	var uniforms = {
		texture:   { value: new THREE.TextureLoader().load( "../imgs/particle2.png" ) }
	};
	var shaderMaterial = new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		blending:       THREE.AdditiveBlending,
		depthTest:      false,
		transparent:    true
	});
	var radius = 7;
	var geometry = new THREE.BufferGeometry();
	var positions = new Float32Array( particles * 3 );
	var sizes = new Float32Array( particles );
	for ( var i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {
		positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
		positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
		positions[ i3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;
		sizes[ i ] = 0.8*Math.random();
	}






	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
	particleSystem = new THREE.Points( geometry, shaderMaterial );
	scene.add( particleSystem );


}



var strings = [];

var floating_wish_contents = [];

var random_V = [];

setTimeout("add_floating_wishes()", 4000);

setInterval("add_floating_wishes()", 15000);

function add_floating_wishes() {
		var radius = 7;
		for (var i = 0; i < strings.length-1; i++) {

			scene.remove(scene.getObjectByName(i));
		}
		strings = [];
		floating_wish_contents = [];
		pic_circle = [];
		random_V = [];
	    $.get('http://'+ip+'/html/queryRandomWish.php',
		{fetchN: 10},function(data) {
			var obj = eval("("+data+")");
			for (var i in obj) {
				strings.push(obj[i].image+".png");
				floating_wish_contents.push(obj[i].wish);
			}
			if (strings.length > 1) {
				var geo = new THREE.CircleGeometry( 0.755555, 13 );

				for (var i = 0; i < strings.length-1; i++) {


					var txt = new THREE.TextureLoader().load( "../upload_imgs/"+strings[i]);
					var pic_Material = new THREE.MeshBasicMaterial( {
						color: 0xF4F6AF,
						shading: THREE.SmoothShading,
						transparent: true,
						opacity: 0.9,
						map: txt,
						side: THREE.DoubleSide
					} );

					var mesh = new THREE.Mesh(geo, pic_Material);
					mesh.position.x = ( Math.random() * 2 - 1 ) * radius;
					mesh.position.y = Math.random() * 3 + 13;
					mesh.position.z = ( Math.random() * 2 - 1 ) * radius;
					mesh.rotation.y = Math.random()*Math.PI;
					var s = Math.random()*0.2+0.9;
					mesh.scale.set(s,s,s);
					pic_circle.push(mesh);
					mesh.name = i;
					scene.add(mesh);
					random_V.push(Math.random());
				}	
			}		
	});


}
//$(document).on("tap",onMouseDown);
//$(document).click(onMouseDown);



document.addEventListener('touchstart', onMouseDown, false);

function onMouseDown(event) {
        
//	event.preventDefault();
        mouse.x = +(event.touches[0].pageX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
//	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( pic_circle );
	if (intersects.length > 0) {
		var obj = intersects[0].object;
		obj.scale.set(1,1,1);
		var index = parseInt(obj.name);
		var wish = floating_wish_contents[index];
		var imgPath = strings[index];
		$("#detail-wish-image").attr('src', "http://"+ip+"/upload_imgs/"+imgPath);
		$("#detail-wish-txt").text(wish);
		$("#detail-wish-wrapper").show();
		outer_button_toggle();
                document.removeEventListener('touchstart',onMouseDown);
	}
}





function cal() {
	for ( var i = 0, i3 = 0; i < beginParticleNumber; i ++, i3 += 3 ) {
		asinArray[i] = Math.acos(beginParticleSystemPositionArray[i3]/Math.sqrt(R_array[i]));

	}
}



function beginParticleMove() {

	for ( var i = 0, i3 = 0; i < beginParticleNumber; i ++, i3 += 3 ) {
		var r = randomVelocity[i];
		beginParticleSystemPositionArray[i3] = Math.cos(asinArray[i])*Math.sqrt(R_array[i])*Math.pow(-1, i);
		beginParticleSystemPositionArray[i3+2] = Math.sin(asinArray[i])*Math.sqrt(R_array[i])*Math.pow(-1, i);
		asinArray[i] += r;
	}

	beginParticleSystem.geometry.attributes.position.needsUpdate = true;
}







function createParticlesForUniverse() {
	var uniforms, geometry;
	var particles = 5000;
	uniforms = {
		texture:   { value: new THREE.TextureLoader().load( "../imgs/particle2.png" ) }
	};
	var shaderMaterial = new THREE.ShaderMaterial( {
		uniforms:       uniforms,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		blending:       THREE.AdditiveBlending,
		depthTest:      false,
		transparent:    true
	});
	var radius = 20;
	geometry = new THREE.BufferGeometry();
	var positions = new Float32Array( particles * 3 );
	var sizes = new Float32Array( particles );
	for ( var i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {
		positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
		positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
		positions[ i3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;

		sizes[ i ] = 0.6*Math.random();
	}
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
	particleSystem = new THREE.Points( geometry, shaderMaterial );
	scene.add( particleSystem );


}


///////////////////////////////////
//---------------------------------
//tool functions
function getNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}

//----------------------------------
////////////////////////////////////
