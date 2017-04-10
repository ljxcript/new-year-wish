	

function loadMeshes(scene, animationGroup) {

	var jsLoader = new THREE.JSONLoader();


	jsLoader.load('../js/meshes/mesh_tushuguan.js',function(geometry, material) {
		geometry.mergeVertices();

		var mirror_Material = new THREE.MeshPhongMaterial( {
			color: 0x3287E7,
			shading: THREE.FlatShading,
			transparent: true,
			opacity: 0.7
		} );
		var wall_Material = new THREE.MeshPhongMaterial( {
			color: 0xEDAE5F,
			shading: THREE.FlatShading
		} );
		var light_mirror_Material = new THREE.MeshPhongMaterial( {
			color: 0x86D5E7,
			shading: THREE.FlatShading
		} );
		var haijunlan_Material = new THREE.MeshPhongMaterial( {
			color: 0x4169E1,
			shading: THREE.FlatShading,
			opacity: 0.9,
			transparent: true
		} );
		var windowMaterial = new THREE.MeshPhongMaterial( {
			color: 0x3287E7,
			shading: THREE.FlatShading,
			opacity: 1.0,
			transparent: true
		} );
		var greyMaterial = new THREE.MeshPhongMaterial({
			color:0xE7E7E7,
			shading: THREE.FlatShading
		});
		var greenMaterial = new THREE.MeshPhongMaterial({
			color:0x6495ED,
			shading: THREE.FlatShading
		});
		var blackMirrorMaterial = new THREE.MeshPhongMaterial({
			color:0x000000,
			shading: THREE.FlatShading,
			transparent: true,
			opacity: 0.6
		})
		material[0] = wall_Material;
		material[1] = greyMaterial;
		material[2] = windowMaterial;
		material[3] = haijunlan_Material;
		material[4] = light_mirror_Material;
		material[5] = mirror_Material;
		material[6] = greenMaterial;
		material[7] = blackMirrorMaterial;
		myMaterial = [material[0],material[1],material[2],material[3],material[4],material[5],material[6],material[7]];
		meM = new THREE.MultiMaterial(myMaterial);
		var lib = new THREE.Mesh(geometry,meM);
		lib.scale.set(0.70,0.70,0.70);
		// lib.rotation.y = 0.5;
		lib.rotation.x = Math.PI;
		lib.position.y = -5;
		lib.name = 'lib';
		scene.add(lib);


		maxProgressValue += 18;
	});


	jsLoader.load('../js/meshes/mesh_tree22.js',function(geometry,material){
		geometry.mergeVertices();
		var greenMaterial = new THREE.MeshLambertMaterial( {
			color: 0x556B2F,
			shading: THREE.FlatShading,
			transparent: true,
			opacity: 0.9
		} );

		var brownMaterial = new THREE.MeshLambertMaterial( {
			color: 0x0F0401,   
			shading: THREE.FlatShading
		} );

		material[1] = greenMaterial;
		material[0] = brownMaterial;

		var treeMaterial = new THREE.MultiMaterial(material);
		var snowTree = new THREE.Mesh(geometry,treeMaterial);
		var pos_X = [+2.50,   +1.00,   +2.50,  +0.00];
		var pos_Y = [-3.80,   -3.80,   -3.80,  -3.80];
		var pos_Z = [+2.70,   +3.00,   -2.00,  -3.00];


		var scale_X = [+0.30,  +0.30,  +0.33,  +0.35];
		var scale_Y = [+0.70,  +0.80,  +0.80,  +0.90];
		var scale_Z = [+0.30,  +0.30,  +0.33,  +0.35];
		for (var j = 0; j < 4; j++) {
			var k = snowTree.clone();
			k.rotation.y = Math.random()*Math.PI;
			k.position.set(pos_X[j]*2, pos_Y[j],  pos_Z[j]*2);
			k.scale.set(scale_X[j], scale_Y[j], scale_Z[j]);
			k.name = "tree"+j;
			scene.add(k);

		}

		maxProgressValue += 9;

	});



	jsLoader.load( "../js/meshes/mesh_deer.js", function( geometry, material) {
	
		var backSkinMaterial = new THREE.MeshLambertMaterial({
		 	 color: 0xF2DFC1, 
		 	 // specular: 0xffffff,
		 	 morphTargets: true,
		 	 side: THREE.DoubleSide,
			 shading: THREE.SmoothShading
		});


		var hornMaterial = new THREE.MeshLambertMaterial({
		 	 color: 0xEAB164, 
		 	 // specular: 0xffffff,
		 	 morphTargets: true,
		 	 side: THREE.DoubleSide,
			 shading: THREE.SmoothShading,
			 transparent:true,
			 opacity: 0.8
		});		

		var innerSkinMaterial = new THREE.MeshLambertMaterial({
		 	 color: 0xF2DFC1, 
		 	 // specular: 0xffffff,
		 	 morphTargets: true,
		 	 side: THREE.DoubleSide,
			 shading: THREE.SmoothShading
		});

		var footMaterial = new THREE.MeshLambertMaterial( {
		     color: 0x666666, 
		     // specular: 0xffffff,
		     morphTargets: true,
		     side: THREE.DoubleSide,
			 shading: THREE.SmoothShading,
			 transparent:true,
			 opacity:0.8
		} );

		material[0] = backSkinMaterial;
		material[1] = innerSkinMaterial;
		material[2] = footMaterial;
		material[3] = hornMaterial;
		var deerMaterial = new THREE.MultiMaterial(material);
		var mesh = new THREE.Mesh(geometry, deerMaterial);
		mesh.name = 'deer';
		mesh.position.set(0, -5, 7);
		mesh.scale.set(0.18,0.18,0.18);
		mesh.rotation.y = -Math.PI/2;
		scene.add(mesh);
		var mixer = new THREE.AnimationMixer(mesh);
		animationGroup.deer = mesh;
		animationGroup.mixers.push(mixer);
		var ac = mixer.clipAction(geometry.animations[0]);
	 	ac.setEffectiveWeight(1);
		ac.setLoop(THREE.LoopRepeat,3000);
	 	ac.play();

		maxProgressValue += 14;
	});

	jsLoader.load( "../js/meshes/mesh_seagullFinal.js", function( geometry,material ) {
	
		var whiteMaterial = new THREE.MeshPhongMaterial( {
		 	 color: 0xffffdd, 
		 	 specular: 0xffffff,
		 	 morphTargets: true,
			 shading: THREE.FlatShading
		} );

		var mouthMaterial = new THREE.MeshPhongMaterial( { 
			 color: 0xe7bf2b,
			 specular: 0xffffff,
			 morphTargets: true,
			 shading: THREE.FlatShading
		} );

		var feathermaterial = new THREE.MeshPhongMaterial( {
		     color: 0x666666, 
		     specular: 0xffffff,
		     morphTargets: true,
			 shading: THREE.FlatShading,
			 transparent:true,
			 opacity:0.8
		} );

		material[0] = whiteMaterial;
		material[1] = mouthMaterial;
		material[2] = feathermaterial;
		var seagullMaterial = new THREE.MultiMaterial(material);

		var mesh = new THREE.Mesh( geometry, seagullMaterial);
		var mesh_2 = mesh.clone();

		mesh.name = "seagull";
		mesh_2.name = "seagull_2";

		var s = 0.1;
		var s_2 = 0.05;

		mesh.scale.set( s, s, s );
		mesh.position.set(8, 6, 4);

		mesh_2.scale.set(s_2,s_2,s_2);
		mesh_2.position.set(-10,8,4);

		animationGroup.seagull = mesh;
		animationGroup.seagull_2 = mesh_2;

		scene.add(mesh);
		scene.add(mesh_2);

		var mixer = new THREE.AnimationMixer(mesh);
		var mixer_2 = new THREE.AnimationMixer(mesh_2);
		animationGroup.mixers.push(mixer);
		animationGroup.mixers.push(mixer_2);
		
		var ac = mixer.clipAction(geometry.animations[0]);
	 	ac.setEffectiveWeight(1);
		ac.setLoop(THREE.LoopRepeat,1000);
	 	ac.play();
		var ac_2 = mixer_2.clipAction(mesh_2.geometry.animations[0]);
	 	ac_2.setEffectiveWeight(1);
		ac_2.setLoop(THREE.LoopRepeat,1000);
		ac_2.play();


		maxProgressValue += 8;
	} );


	jsLoader.load('../js/meshes/mesh_tree2.js',function(geometry,material){

		geometry.mergeVertices();

		var greenMaterial = new THREE.MeshLambertMaterial( {
			color: 0x556B2F,
			shading: THREE.FlatShading
		} );
		var whiteMaterial = new THREE.MeshLambertMaterial( {
			color: 0xA3F7BF,
			shading: THREE.FlatShading
		} );

		var brownMaterial = new THREE.MeshLambertMaterial( {
			color: 0x0F0401,   
			shading: THREE.FlatShading
		} );

		material[0] = greenMaterial;
		material[1] = whiteMaterial;
		material[2] = brownMaterial;

		var treeMaterial = new THREE.MultiMaterial(material);
		var snowTree = new THREE.Mesh(geometry,treeMaterial);

		var pos_X = [-2.50,  -1.00,  -2.50,  -1.50];
		var pos_Y = [-3.50,  -3.50,  -3.50,  -3.50];
		var pos_Z = [+1.00,  +3.00,  -2.00,  -3.00];

		var scale_X = [+0.31,  +0.33,  +0.34,  +0.33];
		var scale_Y = [+0.60,  +0.70,  +0.50,  +0.60];
		var scale_Z = [+0.30,  +0.30,  +0.33,  +0.35];

		for (var j = 0; j < 4; j++) {

			var k = snowTree.clone();
			k.rotation.y = Math.random()*Math.PI;
			k.position.set(pos_X[j]*2, pos_Y[j], pos_Z[j]*2);
			k.scale.set(scale_X[j], scale_Y[j], scale_Z[j]);
			scene.add(k);

		}
		maxProgressValue += 9;
	});

}
