class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1_img);
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);
    car3 = createSprite(500, 200);
    car3.addImage("car3", car3_img);
    car4 = createSprite(700, 200);
    car4.addImage("car4", car4_img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        // console.log("player index = ");
        // console.log(player.index);

        if (index === player.index) {
          //stroke(10);
          //fill("red");
          // ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;

          if (keyDown(RIGHT_ARROW) && player.index !== null) {
            cars[index - 1].x = cars[index - 1].x + 200;
          }
          if (keyDown(LEFT_ARROW) && player.index !== null) {
            cars[index - 1].x = cars[index - 1].x - 200;
          }
          //console.log(cars[index - 1].x);
          //console.log(cars[index - 1].y);

          if (World.frameCount % 75 === 0 && cars[index - 1].y > -3092) {
            mlane = createSprite(
              cars[index - 1].x,
              random(cars[index - 1].y - 200, cars[index - 1].y - 4000)
            );
            mlaneGroup.add(mlane);

            //mlane.addImage(car3_img);
            //mlane.addImage(audi_img);
            var rand = Math.round(random(1, 5));
            //console.log(rand)
            switch (rand) {
              case 1:
                mlane.addImage(bike1_img);
                mlane.scale = 0.5;

                break;
              case 2:
                mlane.addImage(audi_img);
                mlane.scale = 0.5;
                break;
              case 3:
                mlane.addImage(rolls_img);
                mlane.scale = 0.5;
                break;
              case 4:
                mlane.addImage(bmw_img);
                mlane.scale = 0.5;
              case 5:
                mlane.addImage(truck_img);
                mlane.scale = 0.5;
            }
            mlane.lifetime = 250;

            // mlane.scale = 0.8;
            // mlane.velocityY = randomNumber(4,8) +  3*World.frameCount/100;
            // mlane.lifetime = 1500/mlane.velocityY;
            // cars.add(mlane);
          }
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    //car1.depth = mlane.depth;
    if (mlaneGroup.isTouching(car1)) {
      car1.addImage("car1", crash_img);

      textSize(100);
      text("Try Again", camera.position.x - 300, camera.position.y - 70);
      player.distance = 0;
      car1.addImage("car1", car1_img);
    }

    if (mlaneGroup.isTouching(car2)) {
      car2.addImage("car2", crash_img);

      textSize(100);
      text("Try Again", camera.position.x - 300, camera.position.y - 70);
      player.distance = 0;
      car2.addImage("car2", car2_img);
    }

    if (mlaneGroup.isTouching(car3)) {
      car3.addImage("car3", crash_img);

      textSize(100);
      text("Try Again", camera.position.x - 300, camera.position.y - 70);
      player.distance = 0;
      car3.addImage("car3", car3_img);
    }
    if (mlaneGroup.isTouching(car4)) {
      car4.addImage("car4", crash_img);

      textSize(100);
      text("Try Again", camera.position.x - 300, camera.position.y - 70);
      player.distance = 0;
      car4.addImage("car4", car4_img);
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      sound.play();
      player.update();
    }

    if (player.distance > 3730) {
      gameState = 2;

      player.rank += 1;

      alert("WOW ! Your Rank Is  : " + player.rank);
      textSize(40);
      //var str = "Hello World!";
      // var result = str.fontcolor("green");
      text(
        "Congrats!!" +
          " ** " +
          player.name +
          " **  You got Rank  : " +
          player.rank,
        camera.position.x - 300,
        camera.position.y - 70
      ); //added by me
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    console.log(player.rank);
    //text("Player Rank : " + player.rank, camera.position.x, camera.position.y);
  }
}
