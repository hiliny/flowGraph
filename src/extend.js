var ArrowLine = zrender.Path.extend({
  type:'ArrowLine',
  shape:{
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    theta:30,
    headlen:10
  },
  buildPath:function(path,shape){
    path.moveTo(shape.x1,shape.y1);
    path.lineTo(shape.x2,shape.y2);
    var pos = this.getArrowDot(shape);
    path.moveTo(shape.x2,shape.y2);
    path.lineTo(pos[0],pos[1]);
    path.moveTo(shape.x2,shape.y2);
    path.lineTo(pos[2],pos[3]);
    path.closePath();
  },
  getArrowDot:function(shape){
    var theta = shape.theta,
        headlen = shape.headlen,
        fromX = shape.x1,
        fromY = shape.y1,
        toX = shape.x2,
        toY = shape.y2;
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    var arrowX1 = toX + topX,
        arrowY1 = toY + topY;
    var arrowX2 = toX + botX;
    var arrowY2 = toY + botY;
    return [arrowX1,arrowY1,arrowX2,arrowY2];
  }
});
