/**
 * Created by lmarkus on 12/25/14.
 *
 * A Shape is a set of nodes, joined by lines.
 * It mutates slightly as time goes on (Color and position)
 */
define(function (require) {

    var NodeFactory = require('node');


    var Shape = function Shape(ctx, config) {
        //2D Context for drawing
        this.ctx = ctx;

        //Initial RGB Color of this shape.
        this.colors = [
            parseInt(Math.random() * 256, 10),
            parseInt(Math.random() * 256, 10),
            parseInt(Math.random() * 256, 10)
        ];

        //How fast colors change
        this.singleColorSpeed = config.singleColorSpeed || 5;


        //Populate the nodes in this shape
        this.nodes = [];
        this.numberOfNodes = config.numberOfNodes || 5;
        this.perimeterLength = this.numberOfNodes > 2 ? this.numberOfNodes : 1;
        this.nf = new NodeFactory(config.nodeConfig);
        for (var i = 0; i < this.numberOfNodes; i++) {
            this.addNode(null);
        }
    };

    /**
     * Add a node to the shape
     * @param node
     */
    Shape.prototype.addNode = function addNode(node) {
        node = node || this.nf.newNode();
        this.nodes.push(node);
    };

    /**
     * Move all nodes by one frame
     */
    Shape.prototype.step = function step() {

        //Update shape color.
        this.colors = this.colors.map(function (c) {

            var newColor = c + this.singleColorSpeed;

            //Reverse color change direction, to avoid abrupt changes.
            if (newColor < 0 || newColor > 255) {
                this.singleColorSpeed = -this.singleColorSpeed;
                newColor += this.singleColorSpeed;
            }

            return newColor;
        }.bind(this));

        //Update node position
        this.nodes.forEach(function (node) {
            node.step()
        });
    };

    /**
     * Draw a line between two nodes in the shape
     * @param a
     * @param b
     */
    Shape.prototype.drawLine = function drawLine(a, b) {
        var ctx = this.ctx;
        ctx.strokeStyle = 'rgb(' + this.colors.join(',') + ')';
        ctx.beginPath();
        ctx.moveTo(a.position.x, a.position.y);
        ctx.lineTo(b.position.x, b.position.y);
        ctx.stroke();
    };

    /**
     * Draw shape perimeter
     */
    Shape.prototype.draw = function draw() {

        //Micro-optimization :)
        if(this.perimeterLength===1){
            this.drawLine(this.nodes[0], this.nodes[1]);
            return;
        }

        for (var i = 0; i < this.perimeterLength; i++) {
            this.drawLine(this.nodes[i], this.nodes[(i + 1) % this.perimeterLength]);
        }
    };


    /**
     * Logging utility method
     * @returns {string}
     */
    Shape.prototype.toString = function toString() {
        var ret = this.nodes.map(function (n) {
            return '[' + JSON.stringify(n.position) + ']';
        });

        return this.colors + '@' + ret.join('->')
    };

    return Shape;
});