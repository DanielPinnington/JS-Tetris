const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
  [0,0,0], //0,0,0 here as it's easier to determine middle row.
  [1,1,1], //This 2d array represents a tetris shape.
  [0,1,0],
];

function collides(arena, player){
    const[m, o] = [player.matrix, player.pos];
      for(let y = 0; y < m.length; ++y){
        for(let x = 0; x < m[y].length; ++x){
          if(m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0){
            return true;
      }
    }
  }
      return false;
}

function createMatrix(w, h){
  const matrix = [];
  while(h--){
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function draw(){
  context.fillStyle = '#000';
  context.fillRect(0,0,canvas.width, canvas.height);

  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset){
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0){
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0){
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerRotate(dir){ //Player Rotation
const pos = player.pos.x;
let offset = 1;
  rotate(player.matrix, dir);
  while(collides(arena, player)){
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if(offset > player.matrix[0].length){
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function rotate(matrix, dir){
  for(let y = 0; y < matrix.length; ++y){
    for(let x = 0; x < y; ++x){
      [
        matrix[x][y], //Switching the X and Y
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }
  if(dir > 0){
    matrix.foreach(row => row.reverse());
  } else{
    matrix.reverse();
  }
}
let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function playerDrop(){
  player.pos.y++;
  if(collides(arena, player)){
    player.pos.y--;
    merge(arena, player);
    playerReset();
  }
  dropCounter = 0; //resetting counter as we dont want another drop to happen immediately
}

function playerMove(dir){
  player.pos.x += dir;
  if(collides(arena, player)){
    player.pos.x -= dir;
  }
}

function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

function createPiece(type){
  if(type === 'T'){
    return[
      [0,0,0], //0,0,0 here as it's easier to determine middle row.
      [1,1,1], //This 2d array represents a tetris shape.
      [0,1,0],
    ];
  } else if(type === 'O'){
    return[
      [1,1], //0,0,0 here as it's easier to determine middle row.
      [1,1], //This 2d array represents a tetris shape.
    ];
  }else if(type === 'L'){
    return[
    [0,1,0], //0,0,0 here as it's easier to determine middle row.
    [0,1,1], //This 2d array represents a tetris shape.
    [0,1,1],
  ];
  }else if(type === 'J'){
    return[
    [0,1,0], //0,0,0 here as it's easier to determine middle row.
    [0,1,1], //This 2d array represents a tetris shape.
    [1,1,0],
  ];
}else if(type === 'I'){
  return[
  [0,1,0, 0], //0,0,0 here as it's easier to determine middle row.
  [0,1,0, 0], //This 2d array represents a tetris shape.
  [0,1,0, 0],
];
} else if(type === 'S'){
      return[
      [0,1,1], //0,0,0 here as it's easier to determine middle row.
      [1,1,0], //This 2d array represents a tetris shape.
      [0,0,0],
    ];
  }
  else if(type === 'Z'){
        return[
        [1,1,0], //0,0,0 here as it's easier to determine middle row.
        [0,1,1], //This 2d array represents a tetris shape.
        [0,0,0],
      ];
    }
}

function playerReset(){
  const pieces = 'ILJOTSZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
                 (player.matrix[0].length / 2 | 0);

                 if(collides(arena, player)){
                   arena.forEach(row => row.fill(0)); //Starts the game over again once reaches the top
                   window.location.href = 'youLostPage.html';
                   element.appendChild("<h1> You Lost!!! </h1>");
                 }
}
const arena = createMatrix(20, 20);
console.log(arena); console.table(arena);

const player = {
  pos: {x: 5, y: 5},
  matrix: createPiece('T'),
}

function resetGame(){

}


document.addEventListener('keydown', event =>{
  if       (event.keyCode == 37 || event.keyCode == 65){ //Moving the shape left
    playerMove(-1);
  } else if(event.keyCode == 39 || event.keyCode == 68){ //Moving the shape right
    playerMove(1);
  } else if(event.keyCode == 40 || event.keyCode == 83){ //Moving shape down
    playerDrop();
  } else if (event.keyCode == 81){
    playerRotate(-1);
  } else if(event.keyCode == 87) {
    playerRotate(1);
  }{

  }
  console.log(event);

});
update();
