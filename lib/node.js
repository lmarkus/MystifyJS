/**
 * Created by lmarkus on 12/25/14.
 * A node is a vertex in a shape.
 * It has a starting position, as well as speed in each dimension, which allows us to calculate the rate of movement.
 *
 * It must obey the bounds of the canvas. Upon reaching a boundary, it will bounce, altering it's angle slightly.
 */
define(function (require) {

    //Maybe next year I'll do 3D :)
    var dimensions = ['x', 'y'];

    var Node = function Node(config) {
        config = config || {};

        //Position
        this.position = config.position || {x: 0, y: 0};

        //Direction/Speed
        this.speed = config.speed || {x: 50, y: 50};

        //Bounds
        this.bounds = config.bounds || {x: {min: 0, max: 500}, y: {min: 0, max: 500}};

    };

    /**
     * Animation step forward
     */
    Node.prototype.step = function step() {

        //Step forward in each dimension
        dimensions.forEach(function (d) {
            var newPos = this.position[d] + this.speed[d];

            //If we hit the wall, reverse direction. (Bounce)
            if (newPos < this.bounds[d].min || newPos > this.bounds[d].max) {
                this.speed[d] = -this.speed[d];
                newPos += this.speed[d];

                //Minor randomization to avoid predictable bounces.
                this.speed[d] += (parseInt(Math.random()) * 5) - 10;
            }

            //Potential bug here, where speed > overall field size;
            this.position[d] = newPos;
        }.bind(this));

    };

    var NodeFactory = function NodeFactory(config) {
        config = config || {};

        //Constrain movement so we know where to bounce
        this.bounds = config.bounds || {x: {min: 0, max: 1000}, y: {min: 0, max: 500}};

        //Set speed limits
        this.speed = config.speed || {x: 10, y: 10};

    };

    /**
     * Return a random position within the bounds
     * @returns {{}}
     */
    NodeFactory.prototype.randomPos = function randomPos() {
        var pos = {};
        dimensions.forEach(function (d) {
            pos[d] = parseInt((Math.random() * (this.bounds[d].max - this.bounds[d].min)) + this.bounds[d].min, 10);
        }.bind(this));

        return pos;
    };

    NodeFactory.prototype.newNode = function newNode() {
        return new Node({
            position: this.randomPos(),
            bounds: this.bounds
        });
    };

    return NodeFactory;
});
