let fps = 50;
let canvas;
let widthX = 50;
let heightY = 50;

// src images characters 
let characterSrc = ['../images/indy.png','../images/mummy.png']

//heroe class
class Heroe{
  constructor(x,y,src){
    this.x = x;
    this.y = y;
    this.speed = 50;
    this.key = false;
    this.src = src;
  }
  drawCharacter(){
    let imgCharacter = new Image();
    imgCharacter.src = this.src;
    ctx.drawImage(imgCharacter, this.x, this.y);
  }
  marginColision(x,y) {
    let colision;
    board[y][x] == 0 ? colision = true : colision = false;
    return colision;
  }
  up(){
    if(this.marginColision(this.x/widthX, this.y/heightY-1) == false && this.y > 0 ){
      this.y -= this.speed;
      this.logicaKey();
    }
    if(board[this.y/50][this.x/widthX]>=10){
      let tileNumber = board[this.y/heightY][this.x/widthX];
      this.showProject(tileNumber);
      board[this.y/50-1][this.x/widthX] == 0 ? this.y += this.speed : this.y -= this.speed;
    } 
  }
  down(){
    if(this.marginColision(this.x/widthX, this.y/heightY+1) == false && this.y < 450){
      this.y += this.speed;
      this.logicaKey();
    }
    if(board[this.y/heightY][this.x/widthX]>=10){
      let tileNumber = board[this.y/heightY][this.x/widthX];
      this.showProject(tileNumber);
      board[this.y/heightY+1][this.x/widthX] == 0 ? this.y -= this.speed : this.y += this.speed;
    } 
  }
  right(){
    if(this.marginColision(this.x/widthX+1, this.y/heightY) == false && this.x < 700){
      this.x += this.speed;
      this.logicaKey();
      this.openDoor();
      if(board[this.y/heightY][this.x/widthX]>=10){
        let tileNumber = board[this.y/heightY][this.x/widthX];
        this.showProject(tileNumber);
        board[this.y/heightY][this.x/widthX+1] == 0 ? this.x -= this.speed : this.x += this.speed;
      } 
    }
  }
  left(){
    if(this.marginColision(this.x/widthX-1, this.y/heightY) == false && this.x > 0){
      this.x -= this.speed;
      this.logicaKey();
      this.openDoor();
    }
    if(board[this.y/heightY][this.x/widthX]>=10){
      let tileNumber = board[this.y/heightY][this.x/widthX];
      this.showProject(tileNumber);
      board[this.y/heightY][this.x/widthX-1] == 0 ? this.x += this.speed : this.x -= this.speed;
    }
  }

  logicaKey(){
    if(board[this.y/heightY][this.x/widthX] === 3){
      this.key = true;
      board[this.y/heightY][this.x/widthX]=2;
    }
  }
  openDoor(){
    if(this.key == true && board[this.y/heightY][this.x/widthX] == 1){
      board[this.y/heightY][this.x/widthX] = 2;
      board[this.y/heightY][this.x/widthX+1] = 2;
    } else if(this.key == false && board[Math.floor(this.y/50)][Math.floor(this.x/50)] == 1) {
      console.log(this.key);
      console.log(this.x);
      console.log(this.y);
      let doorAlert = document.getElementById('door-container');
      doorAlert.style.display = 'block';
      this.x -=this.speed;
    }
  }
  showProject(tileNumber){
      fetch('./js/portfolios.json')
      .then(response => response.json())
      .then(portfolio => {
          const imagenGrande = document.getElementById('imagen-grande');
          const descripcion = document.getElementById('descripcion-proyecto');
          const title = document.getElementById('title');
          const portfolioLink = document.getElementById('live-deploy');
          const gitHubLink = document.getElementById('github-deploy');
          title.innerText = portfolio[tileNumber].title;
          imagenGrande.src = portfolio[tileNumber].imagen;
          descripcion.innerHTML = portfolio[tileNumber].descripcion;
          portfolioLink.href = portfolio[tileNumber].enlace;
          gitHubLink.href = portfolio[tileNumber].github;
          document.getElementById('imagen-descripcion-container').style.display = 'block';
      })
  }
  
  hitenemy(x,y){
    if(this.x == x && this.y ==y){
      this.death();
    }
  }
  death(){
    this.x = 50;
    this.y = 50;
    this.key = false;
    board[8][3] = 3;
    board[1][8] = 1;
  }
}

// enemy class
class Enemy {
  constructor(x,y,src){
    this.x = x;
    this.y = y;
    this.right = true;
    this.down = true;
    this.src = src;
  }
  drawCharacter(){
    let imgCharacter = new Image();
    imgCharacter.src = this.src;
    ctx.drawImage(imgCharacter, this.x, this.y);
  }
  moveH(speed){
    let positionX = Math.floor(this.x/widthX);
    if(this.right == true){
      board[this.y/heightY][positionX +1] != 0 ? this.x += speed : this.right = false;
      indy.hitenemy(positionX*50,this.y);
    } else{
      board[this.y/heightY][positionX] != 0 ? this.x -= speed : this.right = true;
      indy.hitenemy(positionX*50,this.y);
    }
  }
  moveV(speed){
    let positionY = Math.floor(this.y/heightY);
    if(this.down == true){
      board[positionY+1][this.x/widthX] != 0 ? this.y += speed : this.down = false;
      indy.hitenemy(this.x,(positionY+1)*50);
      indy.hitenemy(this.x,positionY*50);
    } else{
      board[positionY][this.x/widthX] != 0 ? this.y -= speed : this.down = true;
      indy.hitenemy(this.x,(positionY+1)*50);
      indy.hitenemy(this.x,positionY*50);
    }
  }
}
// Creating Characters 
// Creating hero
let indy = new Heroe(50,50,characterSrc[0]);

// Creating enemies
let enemy1 = new Enemy(100,200,characterSrc[1]);
let enemy2 = new Enemy(300,50,characterSrc[1]);

// Tiles creating images
let pathabsolute = 'https://devjldp.github.io'
let wall = new Image();
wall.src = pathabsolute+'/images/wall.png'
let door = new Image();
door.onload = () =>{
  console.log("Imagen Cargada")
}
door.src = pathabsolute+'/images/door.png'
let path = new Image();
path.onload = () =>{
  console.log("Imagen Cargada")
}
path.src = pathabsolute+'/images/path3.png'
let key = new Image();
key.onload = () =>{
  console.log("Imagen Cargada")
}
key.src = pathabsolute+'/images/key.png'

let images = {
  10 : 'weddingTile',
  11: 'mycalculatortile'
}

// Function to draw a tile
const drawTileImage = (key,i,j) => {
  let image = new Image();
  let src = '../images/';
  key >= 10 ? src += 'portfolios/' : null;
  image.src = src + images[key]+'.png';
  ctx.drawImage(image, j*heightY, i*widthX);
}




// Board: Matrix, every element is a tile
// 0: wall  1: door  2: path  3: key  >=10: projects

let board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,1,0,0,0,2,10,0],
  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
  [0,0,2,0,0,0,2,0,0,2,2,2,2,0,0],
  [0,0,2,2,2,0,2,0,0,0,0,11,0,0,0],
  [0,2,2,0,0,0,0,2,2,2,0,2,2,2,0],
  [0,0,2,0,0,0,2,2,0,0,0,0,0,2,0],
  [0,0,2,0,0,0,2,0,0,2,0,2,0,2,0],
  [0,2,2,3,0,2,2,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

// pintar el escenario usando el array 

const drawBoard = () => {
  for(let i=0; i<10;i++){
    for(let j = 0; j<15; j++){
      if (board[i][j] == 0){
        const relativeUrl = '../images/wall.png';
        const absoluteUrl = new URL(relativeUrl, window.location.href).href;
        console.log('Ruta Absoluta:', absoluteUrl);
        ctx.drawImage(wall,j*heightY, i*widthX)
      }else if (board[i][j] == 1){
        ctx.drawImage(door,j*heightY, i*widthX)
      }else if (board[i][j] == 2){
        ctx.drawImage(path,j*heightY, i*widthX)
      }else if (board[i][j] == 3){
        ctx.drawImage(key,j*heightY, i*widthX)
      }else if(board[i][j] >= 10){
        let key = board[i][j];       
        drawTileImage(key,i,j);
        
      } 
    }
  }
}




const cerrarBtn = document.getElementById('cerrar-btn');
const hidePortfolio = () => document.getElementById('imagen-descripcion-container').style.display = 'none';
/* close button */
cerrarBtn.addEventListener('click', () => hidePortfolio());

const btnClue = document.getElementById('btn-clue');
btnClue.addEventListener('click',() => {
  document.getElementById('door-container').style.display = 'none';
});

window.addEventListener("DOMContentLoaded", (event) => {
  miCanvas = document.getElementById('miCanvas');
  ctx = miCanvas.getContext('2d');
  // This function updates the initialize method by calling another method.
  setInterval(() => {
    principal();
  },1000/fps);
})



const principal = () => {
  borrarCanvas();
  drawBoard();
  indy.drawCharacter();
  enemy1.drawCharacter()
  enemy1.moveH(1);
  enemy2.drawCharacter();
  enemy2.moveV(1);
  

}

const borrarCanvas = () => {
  miCanvas.width = 750;
  miCanvas.height = 500;
}


document.addEventListener('keydown',(e) => {
  e.key == 'ArrowUp' ? indy.up() : 
  (e.key == 'ArrowDown' ? indy.down() :
  (e.key == 'ArrowRight' ? indy.right() :
  (e.key == 'ArrowLeft' ? indy.left() : '')));
})

