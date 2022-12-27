const canvas=document.getElementById("canvas1");
//set up 2d context object to change canvas settings and call all built in methods
const ctx=canvas.getContext("2d");
//set width and height to cover browser window
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Symbol{
    //for making the individual symbols which will rain down and managing them
    constructor(x,y,fontSize,canvasHeight){
        //choose a charcter from this whenver jumping to a new position
        this.characters="アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //this.characters="10"; alternate 01 binary characters list, uncomment and comment the above line to use
        this.x=x;
        this.y=y;
        this.fontSize=fontSize;
        this.canvasHeight=canvasHeight;
        //a random character selected from the characters string
        this.text="";
    }
    draw(context){ //specifies which canvas we want to draw on
        //randomise current character and draw in canvas at a specific position
        //math.floor removes decimals, and we get a random and multiply it by the size of characters array to get a random character from it
        this.text=this.characters.charAt(Math.floor(Math.random()*this.characters.length));

        //takes 3 arguments, text we want to draw, and x and y we multiply by fontsize so that they sit nicely below each other
        context.fillText(this.text,this.x*this.fontSize,this.y*this.fontSize);
        //math random makes it so that our columns all have different heights since they reset at different paces this way
        if(this.y*this.fontSize>this.canvasHeight&&Math.random()>0.97){
            //reset back to top position if they are falling below canvas height
            this.y=0;
        }
        else{
            this.y+=1;//increment y so that we move downwards along the canvas
        }
    }
    invert(){
        //TODO
        //when called, changes characters from 01 to the specifiedand vice versa
        if(!this.characters.length==2){
            this.characters="01";
        }
        else{
            this.characters="アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
    }
}


class Effect{
    //the main wrapper for the entire rain effect, all of the symbols at once
    constructor(canvasWidth,canvasHeight){
        //since it needs to be aware of the width and height of canvas
        //so it can spread symbols all around the canvas area
        this.canvasWidth=canvasWidth;
        this.canvasHeight=canvasHeight;
        this.fontSize=25;
        this.columns=this.canvasWidth/this.fontSize;//calculate number of columns
        this.symbols=[];//an array to hold all symbol objects
        this.#initialize();
    }
    #initialize(){//# means its private
        //initiliaze every columns symbol at i of the array with the symbol class
        //creates a symbol for each column that falls down
        for(let i=0;i<this.columns;i++){
            //start from (i,0) and set the fontsize and canvas height as specified
            this.symbols[i]=new Symbol(i,0,this.fontSize,this.canvasHeight);
        }
    }
}

const effect=new Effect(canvas.width,canvas.height);
//for setting up fps
let lastTime=0;
const fps=30;//we want this many frames per second, lower reduces our performance usage
const nextFrame=1000/fps; //1000 milli seconds, ie. 1 second divided by our fps
let timer=0;//for accumilating delta time, when it reaches the threshold, animate next frame and reset itself to 0 and start counting again
//delta time is the difference in milliseconds of the previous animation frame and the current animation frame

function animate(timeStamp){
    //request animation frames has a timestamp variable which we pass
    const deltaTime=timeStamp-lastTime;
    lastTime=timeStamp;//so that we can use for the next loop

    //add an if condition so that we can enable our fps
    if (timer>nextFrame) {

        //our animate function that runs and creates our animation
        //for adding a fade effect, draw a semi transparent rectangle over it
        ctx.fillStyle="rgba(0,0,0,0.05)";
        ctx.textAlign="center";//makes the text more even as there are japanese characters
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#0aff0a";//set shade of the text
        //monospace characters occupy the same ammount of horizontal space
        ctx.font=effect.fontSize+"px monospace";
        //call draw method of each symbol
        effect.symbols.forEach(Symbol=>Symbol.draw(ctx));
        timer=0;

    }
    else{
        timer+=deltaTime;
    }

    //for creating endless animation loop
    requestAnimationFrame(animate);
}
animate(0);