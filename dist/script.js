var steps=0;
var on=false;
var game=[]; 
game.length=20;
var rightCol;
var t;
var keyPressed=true; 
var eventStart=false;
var strict=false;
var win=false;
var stepsDone=0;
var gameStarted=false;
var on=false;
var sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var endLoop=false;

document.getElementById("onBtn").addEventListener("click", startListening);


function startListening(){

  var elem=document.getElementById("onBtn");
  var elem1=document.getElementById("startBtn");
  var elem2=document.getElementById("strictBtn");
  if(on===true){
    elem.innerHTML="OFF";
    on = false; 
  }else if(on===false){
    elem.innerHTML="ON";
    on=true;
    steps=0;
  }
  if(on===true){
  document.getElementById("startBtn").addEventListener("click", start);
  document.getElementById("strictBtn").addEventListener("click",strictManaging);
}
  if(on===false){
    elem2.style.background="#BDBDBD";
    elem1.style.background="#BDBDBD";
  }
}


function strictManaging(){
  var elem=document.getElementById("strictBtn");
  if(strict===false){
    strict=true;
  elem.style.background="#848484";
  }
  else{
    strict=false;
  elem.style.background="#BDBDBD";
  }
}
  

function start(){
  if(on===true){
  var elem=document.getElementById("startBtn");
  elem.style.background="#848484";
  }
  if(gameStarted===false){
gameStarted=true;
} 
  else if(gameStarted===true){
    steps=0;
  }
   instructions();
  gameCycle();
}
  
function instructions(){
  for(var i = 0; i < game.length; i++){ 
    
  var rand=Math.floor(Math.random() * 4)+1;
  var col;
  if(rand==1)
    col='blue';
  else  if(rand==2)
    col='green';
  else  if(rand==3)
    col='yellow';
  else  if(rand==4)
    col='red';
  game[i]=col;
    }
  
 }


function  gameCycle(){ 
  if(keyPressed===false){
    steps=1;
    keyPressed=true;
  }
 else if(steps===20){
    win=true;
  }
  else{
  steps++;
  }
    if(on===true){
      var elem=document.getElementById("screen"); 
       elem.innerHTML=steps; 
    }
   for (var i = 0; i <steps; i++) {
    setTimeout(function(x) { return function() { computersTurn(x); }; }(i), 3000*i);
}
  //////////////////////////////////////////////////////story of struggling//////
 for(var i=0;i<steps;i++){
    rightCol=game[i];
    usersTurn();
   if(keyPressed===true){  
      stepsDone++;
    if(stepsDone===steps){
      setTimeout(function(){  
      gameCycle();}, 3000);
    
  }
     
  }else if(keyPressed===false){
        elem.innerHTML="!!";
       if(strict===false){
         setTimeout(function(){  gameCycle();  }, 4000);
      }else if(strict===true){
         setTimeout(function(){  start();  }, 4000);
       }
   }
   
    }
  /////////////////////////////////////////////////////////////////
  
}


function  changingColor(col){
    
  var colNew;
  if(col=='red')
    colNew="#FA8258";
  else if(col=='blue')
    colNew="#58ACFA";
   else if(col=='yellow')
    colNew="#F3F781";
   else if(col=='green')
    colNew="#81F79F";
  return colNew;
}

function computersTurn(i){
  var col=game[i];
  var colNew=changingColor(col);
  var but= document.getElementsByClassName('Button');
  but[0].style.cursor='default';
  but[1].style.cursor='default';
  but[2].style.cursor='default';
  but[3].style.cursor='default';
if(on===true){
  soundsPlaying(col);
  timedCount(col,colNew);
}
}

function usersTurn(){
  //while(true){
  document.getElementById("red").addEventListener("click", redPressed);
  document.getElementById("blue").addEventListener("click", bluePressed);
  document.getElementById("yellow").addEventListener("click", yellowPressed);
  document.getElementById("green").addEventListener("click", greenPressed);

    //if(endloop===true)
    //  break;
  //}
}


function redPressed(){
  
soundsPlaying("red");
  var colNew=changingColor("red");
  timedCount("red",colNew);

 if(rightCol!="red"){
    keyPressed=false;
    endLoop=true;
 }
   
  else {
     endLoop=true;
    keyPressed=true;
  }
  
}

function bluePressed(){
 soundsPlaying("blue");
   var colNew=changingColor("blue");
  timedCount("blue",colNew);
  
  if(rightCol!="blue"){
    keyPressed=false;
     endLoop=true;
  }else {
    keyPressed=true;
     endLoop=true;
  }
  
  
}

function yellowPressed(){
 soundsPlaying("yellow");
   var colNew=changingColor("yellow");
  timedCount("yellow",colNew);
  
  if(rightCol!="yellow"){
    keyPressed=false;
     endLoop=true;
  }else {
    keyPressed=true;
     endLoop=true;
  }

}

function greenPressed(){
  soundsPlaying("green");
   var colNew=changingColor("green");
  timedCount("green",colNew);
  
  if(rightCol!="green"){
    keyPressed=false;
     endLoop=true;
  }else {
    keyPressed=true;
     endLoop=true;
  }
}

function timedCount(col,colNew) { 
   var elem=document.getElementById(col);
 elem.style.background=colNew;
  
    t = setTimeout(function(){  
      elem.style.background=col; }, 2000);
}

function soundsPlaying(col){
  if(col==="red")
  sound.play();
else if(col==="green")
  sound1.play();  
else if(col==="yellow")
  sound2.play(); 
else if(col==="blue")
  sound3.play(); 
  
}