const canvas=document.getElementById('canvas1'); //get our canvas element
const ctx=canvas.getContext('2d'); // we get our canvas context and were telling it to work with 2d contexts

canvas.width=610;
canvas.height=650;

/*
console.log(ctx); //shows our canvas settings
//we will use begin path, close path, line to and move to methods from this

ctx.beginPath();//begin making our path
//use move to to make a sub path
ctx.moveTo(300,300); //set starting x y coordinates
ctx.lineTo(350,400);//set the ending x y coordinates
ctx.lineTo(350,460);
ctx.lineTo(450,500);
//we will essentially have many line tos to define our path
// and by removing the last segment from the line, causing a movement animation
//move to and line to only define path, they dont render it
ctx.strokeStyle='red'; //set the color of our strokes
ctx.lineWidth=10; //set the width of our line
ctx.lineCap="round";
ctx.stroke();
*/

//our global settings
ctx.lineWidth=10;
//ctx.lineCap="round";

const gradient1=ctx.createLinearGradient(0,0,canvas.width,canvas.height);//we create a gradient, an invisible line starting from point 0,0 to the bottom edge of our canvas, canvas.width,canvas.height
gradient1.addColorStop('0.1','brown');
gradient1.addColorStop('0.2','pink');
gradient1.addColorStop('0.3','red');
gradient1.addColorStop('0.4','orange');
gradient1.addColorStop('0.5','yellow');
gradient1.addColorStop('0.6','green');
gradient1.addColorStop('0.7','turquoise');
gradient1.addColorStop('0.8','violet');
gradient1.addColorStop('0.9','grey');
ctx.strokeStyle=gradient1;
/*
const gradient2=ctx.createRadialGradient(canvas.width*0.5,canvas.height*0.5,30,canvas.width*0.5,canvas.height*0.5,300);//makes a radial gradient, that is a circle, were making it at the center of canvas at a circle of radius 30 to the center of canvas to an outter circle of radius 300
gradient2.addColorStop('0.1','brown');
gradient2.addColorStop('0.2','pink');
gradient2.addColorStop('0.3','red');
gradient2.addColorStop('0.4','orange');
gradient2.addColorStop('0.5','yellow');
gradient2.addColorStop('0.6','green');
gradient2.addColorStop('0.7','turquoise');
gradient2.addColorStop('0.8','violet');
gradient2.addColorStop('0.9','black');
ctx.strokeStyle=gradient2;

//the canvas pattern we will use
const patternImage=document.getElementById('patternImage');
const pattern1=ctx.createPattern(patternImage,'no-repeat');
ctx.strokeStyle=pattern1;
*/
//adding canvas shadows, which gives us the white cracks effect
ctx.shadowOffsetX=2;
ctx.shadowOffsetY=2;
ctx.shadowColor='White'

/*
//make a class for the lines
class Line{
    constructor(){
        this.startX=Math.random()*canvas.width;//random x starting point based on width
        this.startY=Math.random()*canvas.height;//random y starting point based on height
        this.endX=Math.random()*canvas.width;//random x ending point
        this.endY=Math.random()*canvas.height;//random y ending point
        this.lineWidth=Math.floor(Math.random()*15+1);//set a random line width from  1 to 16, by using floor we get non decimal values
    }
    draw(){// our draw function
        ctx.lineWidth=this.lineWidth;//set the line witdth to our Lines random value
        ctx.beginPath();
        ctx.moveTo(this.startX,this.startY);//our starting x y value
        ctx.lineTo(this.endX,this.endY);//our ending x y value
        ctx.stroke();
    }
}

const line1=new Line();
line1.draw();
*/

/*
// by adding better oop practices we can pass canvas and ctx to our methods so that they are less dependant on outter variables

//make a class for the lines
class Line{
    constructor(canvas){
        this.canvas=canvas;
        this.startX=Math.random()*canvas.width;//random x starting point based on width
        this.startY=Math.random()*canvas.height;//random y starting point based on height
        this.endX=Math.random()*canvas.width;//random x ending point
        this.endY=Math.random()*canvas.height;//random y ending point
        this.lineWidth=Math.floor(Math.random()*15+1);//set a random line width from  1 to 16, by using floor we get non decimal values
        this.hue=Math.floor(Math.random()*360);// a random hue integer value between 0 and 360
    }
    draw(context){// our draw function
        context.strokeStyle='hsl('+ this.hue +',100%,50%)' //define a random color for our line using HSL
        context.lineWidth=this.lineWidth;//set the line witdth to our Lines random value
        context.beginPath();
        context.moveTo(this.startX,this.startY);//our starting x y value
        context.lineTo(this.endX,this.endY);//our ending x y value
        context.stroke();
    }
}

//const line1=new Line(canvas);
//line1.draw(ctx);

//make an array to store our lines
const linesArray=[];
const numberOfLines=50;
for (let i=0;i<numberOfLines;i++){
    linesArray.push(new Line(canvas));//add a new line to the end of our array
}
//console.log(linesArray);
//call for each built in method and draw all the lines
linesArray.forEach(object => object.draw(ctx)); //object is used for reffering to each object inside the array, it can be replaced by any other variable name such as a=>a.draw(ctx)
*/

//by changing lines into segments and adding history of the lines in an array, we will be able to make our movement effect
// by adding better oop practices we can pass canvas and ctx to our methods so that they are less dependant on outter variables

//make a class for the lines
class Line{
    constructor(canvas){
        this.canvas=canvas;
        this.x=Math.random()*canvas.width;//random x starting point based on width
        this.y=Math.random()*canvas.height;//random y starting point based on height
        this.history=[ { x:this.x, y:this.y } ];//set our starting x and y in the array, only 1 element in this array right now
        this.lineWidth=Math.floor(Math.random()*20+1);//set a random line width from  1 to 16, by using floor we get non decimal values
        this.hue=Math.floor(Math.random()*360);// a random hue integer value between 0 and 360
        this.maxLength=Math.floor(Math.random()*150+10); //our max path segment length
        //adding speeds for each segment
        //this.speedX=10;//changing speed will also adjust direction
        //this.speedY=5;//such as if speed x=2 and speed y=15 then it will go top to bottom
        this.speedX=Math.random()*1-0.5;//define a random speed between -0.5 and 0.5
        this.speedY=7;
        this.lifeSpan=this.maxLength*3;//define a timer of lifespan for each line
        this.timer=0;//we define the timer
        this.angle=0; //the angle, is in radians
        //this.curve=30;// causes a curve movement based on this curve
        this.curve=0.1;//a gradual increasing curve
        //this.vc=0.25;//increase curve by this amount each time
        this.vc=Math.random()*0.4-0.2;//increase curve by 0.2 to -0.2, - causes opposite motion each time, the velocity of the curve
        this.va=Math.random()*0.5-0.25;//the velocity of angle, set to -0.25 to 0.25 affects how fast the curve spreads out
        this.breakPoint=this.lifeSpan*0.6;//our breaking point after which va increases in our chaos statement
    }
    draw(context){// our draw function
        //context.strokeStyle='hsl('+ this.hue +',100%,50%)' //define a random color for our line using HSL
        //replaced strokeStyle from being in HSL to Gradient
        context.lineWidth=this.lineWidth;//set the line witdth to our Lines random value
        context.beginPath();
        context.moveTo(this.history[0].x,this.history[0].y);//our starting x y value from the array we get it at the 0th position
        /*
        //generate random x y values to place into the array
        for(let i=0; i<3; i++){
            this.x=Math.random()*canvas.width;//random x starting point based on width
            this.y=Math.random()*canvas.height;//random y starting point based on height
            this.history.push({ x:this.x, y:this.y })
        }
        */

        for(let i=0; i<this.history.length; i++){
            context.lineTo(this.history[i].x,this.history[i].y); //make a line to the ith positions x and y values
        }
        context.lineTo(this.endX,this.endY);//our ending x y value
        context.stroke();
    }
    update(){ //add a new segment to our line when update is called
        //this.x=Math.random()*canvas.width;//random x starting point based on width
        //this.y=Math.random()*canvas.height;//random y starting point based on height
        //this.x+=this.speedX; //causes us to move slowly
        //this.y+=this.speedY; //causes us to move slowly
        this.timer++;//increment our timer and animate lines if its less than the lifespan
        //this.angle+=0.1//increase angle by 0.1 radians
        this.angle+=this.va;
        this.curve+=this.vc;
        if(this.timer<this.lifeSpan){
            //add a function to add chaos
            /*
            if(this.timer>this.lifeSpan*0.6){//cause this much of its remaining lifespan to have chaos
                this.va*=-1.12;//causes opposite motion and broken line

            }
            */
            //optimized the code so that we dont have to calculate it multiple times
            if(this.timer>this.breakPoint){//cause this much of its remaining lifespan to have chaos
                this.va*=-1.12;//causes opposite motion and broken line

            }
            //this.x+=this.speedX +Math.floor(Math.random()*20 -10); //causes us to move slowly
            //this.y+=this.speedY +Math.floor(Math.random()*20 -10); //causes us to move slowly
            //this.x+=Math.sin(this.angle);//causes swiggly movement of the line
            this.x+=Math.sin(this.angle)* this.curve;//causes a curved swirl movement
            //this.y+=this.speedY;//more smoother movement
            //this.y+=Math.sin(this.angle)* this.curve;//causes back and forth motion
            this.y+=Math.cos(this.angle)* this.curve;//causes circular motion when combined with sin on x
            this.history.push({ x:this.x, y:this.y })//add this new segment to the array
            if(this.history.length>this.maxLength){
                this.history.shift();//removes the oldest element in our array
            }
        }
        else if(this.history.length<=1){//so that atleast 1 segment of the line exists
            this.reset();//reset it once timer is up
        }
        else{//remove segments once timer is up
            this.history.shift();
        }
    }
    reset(){
        this.x=Math.random()*canvas.width;//random x starting point based on width
        this.y=Math.random()*canvas.height;//random y starting point based on height
        this.history=[ { x:this.x, y:this.y } ];//add our resetted value to the new array
        this.timer=0;//we reset the timer
        this.angle=0;//reset angle
        this.curve=0;//reset curve
        this.va=Math.random()*0.5-0.25;//reset va so that spirals can be made once again once reset
    }
}

//const line1=new Line(canvas);
//line1.draw(ctx);

//make an array to store our lines
const linesArray=[];
const numberOfLines=50;
for (let i=0;i<numberOfLines;i++){
    linesArray.push(new Line(canvas));//add a new line to the end of our array
}
//console.log(linesArray);
//call for each built in method and draw all the lines

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //draw line

    linesArray.forEach(line => {
        line.draw(ctx)
        line.update()
    }); //object is used for reffering to each object inside the array, it can be replaced by any other variable name such as a=>a.draw(ctx)

    //update line
    requestAnimationFrame(animate);//call animate parent functiona again, creates a repeating animation
    //console.log("animating");
}
animate();