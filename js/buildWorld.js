function buildWorld(board){
  var x = 0, y = 0, size = 10,
      walls = [],
      floorTiles = [],
      xOffset = board[0].length/2,
      yOffset = board.length/2;

    //   camera.position = new Vector3(board[0].length/2);

    //   var ground = BABYLON.Mesh.CreateGround("ground", board[0].length*size, board.length*size, 4, scene);
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "img/floor5.jpg", board[0].length*size, board.length*size, 50, 0, 0.1, scene, false);
      ground.checkCollisions = true;
      ground.position.y = size/2;

      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.diffuseTexture = new BABYLON.Texture("img/floor5.jpg", scene);
      groundMaterial.diffuseTexture.uScale = 20;
      groundMaterial.diffuseTexture.vScale = 20;
    //   groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      ground.material = groundMaterial;
      var firstPos = false;



      var roof = BABYLON.Mesh.CreateGround("roof", board[0].length*size, board.length*size, 4, scene);
      roof.position.y = size*1.5;
      roof.rotation.x = Math.PI;

      var roofMaterial = new BABYLON.StandardMaterial("sky", scene);
      roofMaterial.diffuseTexture = new BABYLON.Texture("img/sky.jpg", scene);
      roofMaterial.diffuseTexture.uScale = 20;
      roofMaterial.diffuseTexture.vScale = 20;
    //   groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      roof.material = roofMaterial;

  board.forEach(function(yVal){
    yVal.forEach(function(xVal){
      if(xVal == '#'){
        var wall = BABYLON.Mesh.CreateBox("box" + x + y, size, scene);
        wall.position = new BABYLON.Vector3((x-xOffset) * size ,size,(y - yOffset) * size);

        wall.material = new BABYLON.StandardMaterial("texture1", scene);
        wall.material.diffuseTexture = new BABYLON.Texture("../img/wall4.jpg", scene);

        wall.checkCollisions = true;

        walls.push(wall);
    }else if (!firstPos && xVal == '_') {
        // var tile = BABYLON.Mesh.CreatePlane("tile" + x + y, size, scene);
        // tile.position = new BABYLON.Vector3((x-xOffset) * size ,size/2,(y - yOffset) * size);
        // tile.rotation.x =Math.PI/2;
        // tile.checkCollisions = true;
        // floorTiles.push(tile);
        firstPos = true;
        //camera.position = new Vector3(xVal * size, size/2 + 0.01, yVal * size);
    }
      x++;
    });
    x = 0;
    y++;
  });
  return {walls: walls, floor: floorTiles};
}
