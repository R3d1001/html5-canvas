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
   //Effect Settings
   //size is calculated by a ternary operator in the form
   //condition to evaluate ? run this if true : run this if false;
   let size=canvas.width<canvas.height ? canvas.width*0.3:canvas.height*0.3;
   const maxLevel=5;//how many max levels we want to run in our function keeping it const so that it does not get randomized
   const branches=2;//the number of branches we want from the main branch
   let sides=5;
   let spread=0.5;//the angle spread of each branch
   let scale=0.5;//tells the scale we want each subbranch to change by
   let color="hsl("+Math.random()*360+",100%,50%)";//tells the color we want it to be in hsl format, Math.random()*360 tells us to take a random color
   //ctx.lineWidth=10;//sets the width of the lines
   ctx.lineCap="round";//makes the lines round

   let lineWidth=Math.floor(Math.random()*10)+10;//set it a random value

   const randomButton=document.getElementById("randomizeButton");//get our randomizing button
   const resetButton=document.getElementById("resetButton");//get our resetting button

   const slider_Spread=this.document.getElementById("spread");//get our spreads id
   const label_Slider=document.querySelector("[for='spread']");//get our label which we made for spread
   slider_Spread.addEventListener("change",function(e){
    //console.log(e.target.value);//we can see our slider and its value attribute which we need, we can see that its a string and not a number so conversion needed
    spread=e.target.value;//make our spread the value in slider
    updateSliders();//update the slider when its value changes
    drawFractal();
   })

   const slider_Sides=this.document.getElementById("sides");//get our sides id
   const label_Sides=document.querySelector("[for='sides']");//get our label which we made for sides
   slider_Sides.addEventListener("change",function(e){
    sides=e.target.value;//make our sides the value in slider
    updateSliders();//update the slider when its value changes
    drawFractal();
   })

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
        ctx.scale(scale,scale)

        ctx.save();
        ctx.rotate(spread);
        //so that it calls itself incrementingly recursively
        drawBranch(level+1);
        ctx.restore();

        ctx.save();
        //by changing spread to -spread, we do for the other side too
        //ctx.save();//by saving here we can redo for the other side too
        //the settings which changes our next lines
        ctx.rotate(-spread);

        //so that it calls itself incrementingly recursively
        drawBranch(level+1);
        ctx.restore();
        ctx.restore();
    }

   }

   lineWidth=Math.floor(Math.random()*10)+10;
   function drawFractal(){
    ctx.clearRect(0,0,canvas.width,canvas.height);//to clear the previous fractal
    ctx.save();

    ctx.lineWidth=lineWidth;
    ctx.strokeStyle=color;//the color we want it
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(1,1);
    ctx.rotate(0);
    for(let i=0;i<sides;i++){
        ctx.rotate((Math.PI*2)/sides);
        drawBranch(0);
    }
    ctx.restore();
    randomButton.style.backgroundColor=color;//change color of random button based on current color
   }
   drawFractal();

   //our randomize button changes the following settings
   function randomizeFractal(){
    lineWidth=Math.floor(Math.random()*10)+10;
    sides=Math.floor(Math.random()*9)+2;//random value between 2 and 9, flooring so that we get an integer value
    spread=(Math.random()*2.9)+0.1;//random value between 0.1 and 3
    scale=(Math.random()*0.2)+0.4;;//random value between 0.4 and 0.6
    color="hsl("+Math.random()*360+",100%,50%)";

    drawFractal();//draw the updated fractal
   }
   //our random buttons click executed functions
   randomButton.addEventListener("click",function(){
    randomizeFractal();
    updateSliders();
    drawFractal();

   });

   function resetFractal(){
    //for reset button, to reset the fractal if distorted too much
    sides=5;
    spread=0.7;
    scale=0.5;
    color="hsl("+Math.random()*360+",100%,50%)";
    lineWidth=15;
   }
   resetButton.addEventListener("click",function(){
    resetFractal();
    updateSliders();
    drawFractal();
   })


   function updateSliders(){
    //update the sliders whenever we change them inside via randomize
    slider_Spread.value=spread;
    label_Slider.innerText="Spread: "+Number(spread).toFixed(2);//tells us to bring up to 2 decimal places when showing, we use Number() to convert the stirng type to a number
    slider_Sides.value=sides;
    label_Sides.innerText="Sides : "+sides;
   }
   updateSliders();//so that slider values and labels are updated on page load
});