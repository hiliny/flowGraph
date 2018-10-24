var SHAPE_COLOR = '#bbe0e3'; // 流程节点的填充色
var SHAPE_LINE_COLOR = '#89a4a7'; //流程的节点的外框线色
var ACTIVE_COLOR = '#0000EE'; //激活节点的外框颜色
var SHAPE_RECT_WIDTH = 100; // 流程节点的宽度
var SHAPE_RECT_HEIGHT = 40; //流程节点的高度
var LINE_WIDTH = 2; //流程节点的框线宽度
var nodeCache = []; //流程节点的全局缓存
var lineCache = []; //全局缓存连接线对象
var currentNode = null; //当前的选中节点
var checkedNode = false; //是否点击选中了节点
var isAddingLine = false; //是否正在添加连接线
var linePosition = []; //划线的起止点

// 主线流程
var divContainer = document.getElementById("main");
var zr = zrender.init(divContainer, null, {
    renderer: 'canvas',
    devicePixelRatio: 2
});
var domNode = document.getElementById("addNode"),
    domLine = document.getElementById("addLine"),
    delNode = document.getElementById("delNode");

var tmp = new ArrowLine({
  shape:{
    x1:50,
    y1:50,
    x2:400,
    y2:400,
  },
  style: {
      stroke: SHAPE_LINE_COLOR,
      lineWidth: LINE_WIDTH,
      lineCap: 'butt'
  },
  draggable: true,
  onclick:function(){
    this.attr({
        style: {
            stroke: ACTIVE_COLOR
        }
    });
    currentNode = this;
    checkedNode = true;
  }
});
zr.add(tmp);
nodeCache.push(tmp);

// 点击canvas容器，取消激活节点
zr.on('click', function () {
    if (!currentNode) return;
    if (checkedNode) return checkedNode = false;
    currentNode.attr({
        style: {
            stroke: SHAPE_LINE_COLOR
        }
    });
    currentNode = null;
});
zr.on('mousedown', function (e) {
    if (isAddingLine) {
        linePosition.push({
            x: e.offsetX,
            y: e.offsetY
        });
    }
});
zr.on('mouseup', function (e) {
    if (!isAddingLine) return;
    linePosition.push({
        x: e.offsetX,
        y: e.offsetY
    });
    var line = createLine.apply(this, linePosition);
    zr.add(line);
    linePosition.length = 0;
    isAddingLine = false;
    disableDraggable(nodeCache, true);
});
/**
 * 辅助函数
 */
// 添加节点事件
domNode.addEventListener('click', function () {
    var txt = document.getElementById('nodeTxt').value,
        shape = createShape(txt);
    nodeCache.push(shape);
    shape.on('click', function (ev) {
        this.attr({
            style: {
                stroke: ACTIVE_COLOR
            }
        });
        currentNode = this;
        checkedNode = true;
    });
    zr.add(shape);
});
//添加连接线事件
domLine.addEventListener('click', function () {
    isAddingLine = true;
    disableDraggable(nodeCache, false);
});
//删除节点
delNode.addEventListener('click', function () {
    deleteNode();
});
// 创建流程节点函数
function createShape(nodeName) {
    var shape = new zrender.Rect({
        shape: {
            x: 50,
            y: 50,
            width: SHAPE_RECT_WIDTH,
            height: SHAPE_RECT_HEIGHT
        },
        style: {
            fill: SHAPE_COLOR,
            stroke: SHAPE_LINE_COLOR,
            lineWidth: LINE_WIDTH,
            truncate: {
                outerWidth: 100
            },
            text: nodeName || '新节点'
        },
        draggable: true
    });
    return shape;
}
//创建线性节点
function createLine(a, b) {
    a = a || {
        x: 10,
        y: 10
    };
    b = b || {
        x: 60,
        y: 60
    };
    var line = new zrender.Line({
        shape: {
            x1: a.x,
            y1: a.y,
            x2: b.x,
            y2: b.y
        },
        style: {
            stroke: SHAPE_LINE_COLOR,
            lineWidth: LINE_WIDTH,
            lineCap: 'butt'
        },
        draggable: true
    });
    nodeCache.push(line);
    line.on('click', function (ev) {
        this.attr({
            style: {
                stroke: ACTIVE_COLOR
            }
        });
        currentNode = this;
        checkedNode = true;
    });
    zr.add(line);
    return line;
}
//删除选中节点
function deleteNode() {
    var len = nodeCache.length - 1;
    if (!currentNode) return;
    for (var i = len; i >= 0; i--) {
        if (nodeCache[i] == currentNode) {
            nodeCache.splice(i, 1);
            currentNode.off('click');
            zr.remove(currentNode);
            currentNode = null;
            break;
        }
    }
}
// 禁用图形节点的拖动功能
function disableDraggable(nodes, useAble) {
    nodes.forEach(function (node) {
        node.attr({
            draggable: useAble
        });
    });
}
