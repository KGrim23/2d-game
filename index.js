//import platform from "./assets";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1670;
canvas.height = 880;
const gravity = 0.6;

//player
class Player {
  constructor() {
    this.position = {
      x: 20,
      y: 100
    };
    this.velocity = {
      x: 0,
      y: 0
    };

    this.width = 100;
    this.height = 100;
    this.image = document.getElementById("player");
  }

  //canvas draw
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

//platforms
class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    };
    this.width = 300;
    this.height = 40;
    this.image = document.getElementById("platform1");
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const player = new Player();
const platforms = [
  new Platform({ x: 0, y: 840, }),
  new Platform({ x: 0, y: 800, }),
  new Platform({ x: 300, y: 840 }),
  new Platform({ x: 600, y: 840 }),
  new Platform({ x: 900, y: 840 }),
  new Platform({ x: 1000, y: 840 }),
  new Platform({ x: 1600, y: 840 }),
  new Platform({ x: 1900, y: 840 }),
  new Platform({ x: 2200, y: 840 }),
  new Platform({ x: 2500, y: 840 }),
  new Platform({ x: 2800, y: 840 }),
  new Platform({ x: 3100, y: 840 }),
//double layer
  new Platform({ x: 300, y: 800 }),
  new Platform({ x: 600, y: 800 }),
  new Platform({ x: 900, y: 800 }),
  new Platform({ x: 1000, y: 800 }),
  new Platform({ x: 1600, y: 800 }),
  new Platform({ x: 1900, y: 800 }),
  new Platform({ x: 2200, y: 800 }),
  new Platform({ x: 2500, y: 800 }),
  new Platform({ x: 2800, y: 800 }),
  new Platform({ x: 3100, y: 800 }),

  new Platform({ x: 450, y: 500 }),
  new Platform({ x: 800, y: 200 }),
  new Platform({ x: 1280, y: 600 }),
  new Platform({ x: 1500, y: 300 }),
  new Platform({ x: 1800, y: 400 }),
  new Platform({ x: 2100, y: 200 }),
  new Platform({ x: 2300, y: 600 }),
  new Platform({ x: 2500, y: 800 }),
  new Platform({ x: 2700, y: 200 }),
  new Platform({ x: 3000, y: 600 })
];

//boxes
class Box {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    };
    this.width = 100;
    this.height = 100;
    this.image = document.getElementById("boxes");
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
const boxes = [
  new Box({ x: 100, y: 100 }),
  new Box({ x: 100, y: 200 }),
  new Box({ x: 100, y: 300 }),
  new Box({ x: 100, y: 400 }),
  new Box({ x: 100, y: 500 }),
  new Box({ x: 100, y: 600 }),

]

//keys
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
};

let scoreOffSet = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  platforms.forEach((platform) => {
    platform.draw()
  })
  player.update();
  if (keys.right.pressed && player.position.x < 410) {
    player.velocity.x = 5;
  }
    else if (keys.left.pressed && player.position.x > 100){
      player.velocity.x = -5
    }
    else {
        player.velocity.x = 0
    if (keys.right.pressed) {
        scoreOffSet -= 5;
        platforms.forEach((platform) => {
        platform.position.x -= 5;
      })
    } 
    else if (keys.left.pressed) {
        scoreOffSet += 5;
        platforms.forEach((platform) => {
          platform.position.x += 5;
        })
      }
    }
  


  // platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.position.y = platform.position.y - player.height;
      player.velocity.y = 0;
    }
  });
  //win condition
  if (scoreOffSet > 2000) {
    console.log("you win");
  }
}

//key assignment
animate();
window.addEventListener("keydown", ({ keyCode }) => {
  //console.log(keyCode);
  switch (keyCode) {
    case 65: //a left
      keys.left.pressed = true; // player.velocity.x -= 5;
      break;
    case 83: //s down
      player.velocity.y = 0;
      break;
    case 68: //d right
      keys.right.pressed = true; //player.velocity.x += 1;
      break;
    case 87: //w up - jump
      player.velocity.y -= 5;
      break;
  }
});

//click events
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65: //a left
      keys.left.pressed = false; // player.velocity.x -= 5;
      break;
    case 83: //s down
      player.velocity.y = 0;
      break;
    case 68: //d right
      keys.right.pressed = false; //player.velocity.x = 0;
      break;
    case 87: //w up
      player.velocity.y += 5;
      break;
  }
});
