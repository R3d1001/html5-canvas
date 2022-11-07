const canvas = document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
//console.log(ctx); shows canvas and all its properties
//in the console, you can view all its properties and settings here
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
const ParticlesArray=[];//an array to store the particles
/* step 1, drawing a rectangle
window.addEventListener("resize",function(){
    //resizes the canvas whenever the user resizes the window
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    //redraws the rectangle whenever resized, else the drawing of
    //rectangle gets removed when we resize
    ctx.fillStyle="white";
    ctx.fillRect(10,10,10,10);
})
ctx.fillStyle="white";
ctx.fillRect(10,10,10,10);
*/

window.addEventListener("resize",function(){
    //resizes the canvas whenever the user resizes the window
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    //redraw whenever we resize
    //drawCircle();
})
/*
function drawCircle(){
    ctx.fillStyle="yellow"; //sets the fill color
    ctx.strokeStyle="red"; //makes it draw an outline color
    ctx.lineWidth="5" //specifies the width of stroke
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,50,0,Math.PI*2) //0 tells the start angle, 50 tells the radius
    //math.pi *2 specifies the angle in radians
    //in this case, 2 radian or 360 degrees
    ctx.fill(); //fill in the requested color
    ctx.stroke(); //outline in the requested color
}
*/
//drawCircle();
/*
function drawCircleAtMouse(){ // draws a circle at mouse location
    ctx.fillStyle="yellow"; //sets the fill color
    ctx.strokeStyle="red"; //makes it draw an outline color
    ctx.lineWidth="5" //specifies the width of stroke
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,50,0,Math.PI*2) //0 tells the start angle, 50 tells the radius
    //math.pi *2 specifies the angle in radians
    //in this case, 2 radian or 360 degrees
    ctx.fill(); //fill in the requested color
    ctx.stroke(); //outline in the requested color
}
*/
canvas.addEventListener("mousemove",function(event){
    //tracks mouse movement
    //and draws a circle wherever mouse moves
    mouse.x=event.x;
    mouse.y=event.y;
    //drawCircle();
    //drawCircleAtMouse();
})

//make a constant variable to store mouse click
const mouse={
    x:undefined,
    y:undefined,
}
//add a listenter for click, and set the mouse variables x and y based on it
/*
canvas.addEventListener("click",function(event){//we can also call it e or anything else,
    //not necessary to name it event
    mouse.x=event.x;
    mouse.y=event.y;
    console.log(event)//to see all properties of the click event
    drawCircleAtMouse()
})
*/

class Particle{ //make a particle class
    constructor(){ //mandatory constructor for the class
        //this.x=mouse.x;//makes its x be same as mouse position
        //this.y=mouse.y;//makes its y be same as mouse position
        this.x=Math.random()*canvas.width;//makes the particle be randomly assigned within canvas
        this.y=Math.random()*canvas.height;//makes the particle be randomly assigned within canvas
        this.size=Math.random()*5 +1; //assign random size from 1 to 6 pixels
        this.speedX=Math.random()*3-1.5; //horizontal speed random number
        //between plus 1.5 and -1.5
        this.speedY=Math.random()*3-1.5; //vertical speed
        //you can make a vector of speed using these two
    }
    update(){ //a method. used to change x and y coordinates based on
        //speedx and speed y
        this.x+=this.speedX;//move in x direction based on speed per update
        this.y+=this.speedY;//move in y direction based on speed per update
    }
    draw(){//draws a circle at this's location
        ctx.fillStyle="yellow"; //sets the fill color
        ctx.strokeStyle="red"; //makes it draw an outline color
        ctx.lineWidth="5" //specifies the width of stroke
        ctx.beginPath();
        ctx.arc(this.x,this.y,50,0,Math.PI*2) //0 tells the start angle, 50 tells the radius
        //math.pi *2 specifies the angle in radians
        //in this case, 2 radian or 360 degrees
        ctx.fill(); //fill in the requested color
        ctx.stroke(); //outline in the requested color
    }
}
function init(){//a function to initialize the particles
    for(let i=0;i<100;i++){
        ParticlesArray.push(new Particle());//make a new particle and add to array
    }
}
init();//initialize the particles
//console.log(ParticlesArray);//see the array made

function handleParticles(){//handles the updating and drawing of particles
    for(let i=0;i<ParticlesArray.length;i++){
        ParticlesArray[i].update();
        ParticlesArray[i].draw();
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //drawCircle();//uncoment this and the function to draw a
    //constant circle at mouse location
    //to define the rectangular area to clear

    handleParticles()

    requestAnimationFrame(animate);//causes it to recall animate function
    //which makes it do an infinite loop of it
    //and shows us only 1 circle which moves according to mouse
}
animate();//calls animation function to clear the screen and do its code