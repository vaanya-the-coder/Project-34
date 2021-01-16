//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dog1;

function preload()
{
  dog1 = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dog1);
  dog.scale = 0.5;
  database = firebase.database();
  var foodStock = database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    //dog.scale = 0.5;
  }

  drawSprites();
  //add styles here
  textSize(20);
  text("Food Remaining :"+ foodS,250,100);
  text("Note: Press UP_ARROW Key to feed the dog milk!",50,50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=20;
  }
  else{
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}

