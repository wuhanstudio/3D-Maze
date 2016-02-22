  window.addEventListener('DOMContentLoaded', function() {
      canvas = document.getElementById('renderCanvas');
      engine = new BABYLON.Engine(canvas, true);

      scene = createScene();

      engine.runRenderLoop(function() {
          scene.render();
      });

      window.addEventListener('resize', function() {
        engine.resize();
      });




      //board = processFile();
      board = makeMaze(30,30);

      buildWorld(board);

      var cameraJump = function() {
		var cam = scene.cameras[0];

		cam.animations = [];

		var a = new BABYLON.Animation(
		    "a",
		    "position.y", 20,
		    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		// Animation keys
		var keys = [];
		keys.push({ frame: 0, value: cam.position.y });
		keys.push({ frame: 10, value: cam.position.y + 5 });
		keys.push({ frame: 20, value: cam.position.y });
		a.setKeys(keys);

		var easingFunction = new BABYLON.CircleEase();
		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
		a.setEasingFunction(easingFunction);

		cam.animations.push(a);



		scene.beginAnimation(cam, 0, 20, false);
	};

    var canJump = true;

      window.onkeypress = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          if (canJump && key == 32) {
             cameraJump();
             canJump = false;
             setTimeout(function () {
                 canJump = true;
             }, 1000);
         }else{
            //console.log(key + " pressed");
          }
      };


  });
