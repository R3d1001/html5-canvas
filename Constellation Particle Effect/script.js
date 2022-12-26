const canvas = document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
//console.log(ctx); shows canvas and all its properties
//in the console, you can view all its properties and settings here
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
const ParticlesArray=[];//an array to store the particles

let hue=0;//hue variable to cycle through color spectrum

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
    //ParticlesArray.push(new Particle()); //makes a trail of particles at mouse movement
    for(let i=0;i<4;i++){//makes us spawn i particles per movement
        ParticlesArray.push(new Particle());//makes a new particle spawn when we movement
    }
})

//make a constant variable to store mouse click
const mouse={
    x:undefined,
    y:undefined,
}
//add a listenter for click, and set the mouse variables x and y based on it

canvas.addEventListener("click",function(event){//we can also call it e or anything else,
    //not necessary to name it event
    mouse.x=event.x;
    mouse.y=event.y;
    //console.log(event);//to see all properties of the click event
    //drawCircleAtMouse();
    for(let i=0;i<10;i++){//makes us spawn 10 particles per click
        ParticlesArray.push(new Particle());//makes a new particle spawn when we click
    }
})


class Particle{ //make a particle class
    constructor(){ //mandatory constructor for the class
        this.x=mouse.x;//makes its x be same as mouse position
        this.y=mouse.y;//makes its y be same as mouse position
        //this.x=Math.random()*canvas.width;//makes the particle be randomly assigned within canvas
        //this.y=Math.random()*canvas.height;//makes the particle be randomly assigned within canvas
        this.size=Math.random()*15 +1; //assign random size from 1 to 16 pixels
        this.speedX=Math.random()*3-1.5; //horizontal speed random number
        //between plus 1.5 and -1.5
        this.speedY=Math.random()*3-1.5; //vertical speed
        //you can make a vector of speed using these two
        this.color="hsl(" + hue + ",100%, 50%)";//assigns particles an individual color
    }
    update(){ //a method. used to change x and y coordinates based on
        //speedx and speed y
        this.x+=this.speedX;//move in x direction based on speed per update
        this.y+=this.speedY;//move in y direction based on speed per update
        if(this.size>0.2){//if the value becomes zero, we get an error on canvas
            // arc as -ve number for size
            this.size-=0.1; //causes the size to decrease for every animation frame
        }
    }
    draw(){//draws a circle at this's location
        //ctx.fillStyle="white"; //sets the fill color
        //ctx.strokeStyle="black"; //makes it draw an outline color
        //ctx.lineWidth="1" //specifies the width of stroke

        //ctx.fillStyle="hsl(" + hue + ",100%, 50%)";//set color using hsl,
        // i.e. hue saturation lightness
        ctx.fillStyle=this.color;//draw it based on the particles individual color
        //set via hsl method
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2) //0 tells the start angle, this.size tells the radius
        //math.pi *2 specifies the angle in radians
        //in this case, 2 radian or 360 degrees
        ctx.fill(); //fill in the requested color
        ctx.stroke(); //outline in the requested color
    }
}
/*
function init(){//a function to initialize the particles once on page load
    for(let i=0;i<100;i++){//initialize 100 particles on page load into an array
        ParticlesArray.push(new Particle());//make a new particle and add to array
    }
}
init();//initialize the particles
*/
//console.log(ParticlesArray);//see the array made

function handleParticles(){//handles the updating and drawing of particles
    for(let i=0;i<ParticlesArray.length;i++){
        ParticlesArray[i].update();
        ParticlesArray[i].draw();

        //for adding constellation effect between all particles, iterate over the array
        //and get the distance between particle i and particle j via pythogoras theorem
        for(let j=i;j<ParticlesArray.length;j++){
            const distance_x=ParticlesArray[i].x-ParticlesArray[j].x;
            const distance_y=ParticlesArray[i].y-ParticlesArray[j].y;
            const distance_between=Math.sqrt((distance_x*distance_x)+(distance_y*distance_y));
            //now use the distance variable to set a limit for the particles drawing the constellation to
            if(distance_between<50&&distance_between>15){//if less than 100 pixels
                ctx.beginPath;//begin drawing
                //define the stroke color , else itll default to black
                ctx.strokeStyle=ParticlesArray[i].color;
                //to make the line width decrease as particle size decreases do this
                //ctx.lineWidth=ParticlesArray[i].size;
                ctx.lineWidth=0.2;
                ctx.moveTo(ParticlesArray[i].x,ParticlesArray[i].y);//start from particle i
                ctx.lineTo(ParticlesArray[j].x,ParticlesArray[j].y);//go to particle j
                ctx.stroke();//draw the line
                ctx.closePath;
            }
        }
        //if statement added after for so that it calculates distance before removing the particle
        if(ParticlesArray[i].size<=0.3){//remove particles smaller than this size
            ParticlesArray.splice(i,1)// we are deleting i'th element, and the
            //number to delete is 1
            i--;//since we removed an element, we need to readjust the arrays new size
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //clears old animation comment to leave trails

    //drawCircle();//uncoment this and the function to draw a
    //constant circle at mouse location
    //to define the rectangular area to clear

    /*
    //redraw the canvas by drawing a black rectangle over it thus clearing it
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    */

    //ctx.fillStyle="rgba(0,0,0,0.02)"; //adds fade trail by reducing the opacity
    //lowering opacity reduces the fade trail
    //ctx.fillRect(0,0,canvas.width,canvas.height);

    //hue++; //increase hue per animation the higher it is the faster we cycle through
    //the color spectrum
    hue+=2;

    handleParticles();

    requestAnimationFrame(animate);//causes it to recall animate function
    //which makes it do an infinite loop of it
    //and shows us only 1 circle which moves according to mouse
}
animate();//calls animation function to clear the screen and do its code