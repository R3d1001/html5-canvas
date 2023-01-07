const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext("2d");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

ctx.lineWidth="10"
ctx.strokeStyle="blue";
ctx.fillStyle="red";

function drawShape(x,y,radius,inset,n){//function for drawing the shape
    //inset is the inner radius ratio, n is the number of sides

    ctx.beginPath();
    ctx.save();//creates a snapshot of current global canvas settings
    ctx.translate(x,y);//translates ourself to the center of the mousemovement
    ctx.moveTo(0,0-radius);//as the center after translating will now be reffered to 0,0 as we translated

    for(let i=0;i<n;i++){
        //draws line from outter to inner, then from inner to outter and then the next iteration takes place
        ctx.rotate(Math.PI/n);
        ctx.lineTo(0,0 - (radius*inset));
        ctx.rotate(Math.PI/n);
        ctx.lineTo(0,0 - radius);
    }
    ctx.restore();//reset the canvas settings to before the save methods call
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

}
//drawShape(100,100,100,0.5,6);//so that the function runs once on pageload
window.addEventListener("mousemove",function(e){
    drawShape(e.x,e.y,100,0.5,6);
})