window.addEventListener("load",function(){//the code runs once all assets(html,style,imgs etc) have loaded
    const canvas=this.document.getElementById("canvas1");
    const ctx=canvas.getContext("2d");//creates instance of builtin canvas 2d api to hold all canvas drawing methods and settings
    canvas.width=window.innerWidth;
    canvas.height=this.window.innerHeight;

    /*
    //code is read from top down, so any drawings before this will not be affected by these transformations
    ctx.save();//all code below this is acted upon the shapes drawn here, saves the transformations and fillstyle linewidth etc
    ctx.fillStyle="green";
    ctx.translate(100,100);//translates our img to specific coordinates, rotate will be from this specific coordinate
    ctx.scale(0.5,0.5);//scales the image by this factor
    ctx.rotate(-0.1);//rotate from top left by default
    //rotate, translate, and scale if applied multiple times, do not override the previous ones, rather they add up
    ctx.translate(60,60);

    ctx.fillRect(0,0,500,500);
    ctx.restore();//after this any shapes drawn will not be affected by the above translations
    ctx.fillStyle="red";
    ctx.fillRect(0,0,100,100);//unaffected by the transformations
    */
   /*
   let size=200;
   let sides=8;//number of sides we want in our lines shape
   ctx.save();

   ctx.translate(canvas.width/2,canvas.height/2);//we are now at the center
   ctx.scale(1,1);//sets the scale
   ctx.rotate(0);//sets the rotation it is in radians
   ctx.lineWidth=10;//sets the width of the lines
   ctx.lineCap="round";//makes the lines round
   for(let i=0;i<sides;i++){
    ctx.beginPath();//start drawing
    ctx.moveTo(0,0);
    ctx.lineTo(size,0);
    ctx.stroke();
    ctx.rotate(Math.PI*2/sides);//rotate this many radian degrees
    //ctx.scale(0.9,0.9);//causes upcoming lines to be scaled down which proceduraly adds up
    //ctx.translate(30,40);//causes them to translate by this which proceduraly adds up
   }

   ctx.restore();
   */
   let size=200;
   let sides=5;
   let maxLevel=5;//how many max levels we want to run in our function
   let spread=0.5;//the angle spread of each branch
   let branches=2;//the number of branches we want from the main branch
   let scale=0.5;//tells the scale we want each subbranch to change by
   let color="hsl("+Math.random()*360+",100%,50%)";//tells the color we want it to be in hsl format, Math.random()*360 tells us to take a random color
   ctx.lineWidth=10;//sets the width of the lines
   ctx.lineCap="round";//makes the lines round

   //for adding a shadow
   ctx.shadowColor="rgba(0,0,0,0.7)";
   ctx.shadowOffsetX=10;
   ctx.shadowOffsetY=5;
   ctx.shadowBlur=10


   function drawBranch(level){//draw line, rotate canvas, call itself again to draw another segment
    //level tells us which level it is currently drawing
    //break when it reaches the max level
    if(level>maxLevel){
        return;
    }

    ctx.beginPath();//start drawing
    ctx.moveTo(0,0);
    ctx.lineTo(size,0);
    ctx.stroke();

    for(let i=0;i<branches;i++){

        ctx.save();//by saving here we can redo for the other side too
        //the settings which changes our next lines
        ctx.translate(size-(size/branches)*i,0);//we tell it to translate by this ammount
        //if we want them move move along and grow from the other end, we do ctx.translate(size-(size/branches)*i,0); and remove size- for vice versa
        ctx.rotate(spread);
        ctx.scale(scale,scale)

        //so that it calls itself incrementingly recursively
        drawBranch(level+1);
        ctx.restore();

        //by changing spread to -spread, we do for the other side too
        ctx.save();//by saving here we can redo for the other side too
        //the settings which changes our next lines
        ctx.translate(size-(size/branches)*i,0);
        ctx.rotate(-spread);
        ctx.scale(scale,scale)

        //so that it calls itself incrementingly recursively
        drawBranch(level+1);
        ctx.restore();
    }

   }

   function drawFractal(){
    ctx.save();
    ctx.strokeStyle=color;//the color we want it
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(1,1);
    ctx.rotate(0);
    for(let i=0;i<sides;i++){
        ctx.rotate((Math.PI*2)/sides);
        drawBranch(0);
    }
    ctx.restore();
   }
   drawFractal();
});