var ArrowLine = zrender.Path.extend({
  type:'ArrowLine',
  shape:{
    from:{
      x:0,
      y:0
    },
    to:{
      x:0,
      y:0
    },
    theta:0,
    headlen:5
  },
  buildPath:function(path,shape){
    //path.beginPath();
    path.moveTo(shape.from.x,shape.from.y);
    path.lineTo(shape.to.x,shape.to.y);
    path.moveTo(shape.to.x,shape.to.y);
    path.lineTo(500,50);
    path.closePath();
  }
});

function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
    // theta夹角,headlen三角斜边长度
    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (theta) != 'undefined' ? headlen : 10;
    width = typeof (width) != 'undefined' ? width : 1;
    color = typeof (color) != 'color' ? color : '#000';
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX = fromX - topX,
        arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}

function test(fromX, fromY, toX, toY, theta, headlen){
    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (theta) != 'undefined' ? headlen : 10;
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

    var pot = {
        x1:fromX-topX,
        y1:fromY-topY,
        x2:toX+botX,
        y2:toY+botY
    };

    console.log(pot);
}
//test(4,5,30,40,45,10);
