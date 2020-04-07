const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(0,0,canvas.width, canvas.height);

const matrix = [
  [0,0,0], //0,0,0 here as it's easier to determine middle row.
  [1,1,1], //This 2d array represents a tetris shape.
  [0,1,0],
];

function draw(){
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

const player = {
  pos: {x: 5, y: 5},
  matrix: matrix,
}

draw();
