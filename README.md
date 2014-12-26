Mystify Screen Saver emulation!
===============================

> Just a quick Christmas project to amuse myself.

 I've been wanting to play with Canvas and animations for a while. I figured doing good ol' Mystify in JS would prove entertaining.

 What I didn't expect was that writing the basics, I'd spend quite a few hours tweaking and re-tweaking parameters to see what would be rendered on screen.


##The basics

 Not much in the way of libraries here. Just `RequireJS` to keep the code nice and tidy.

 The screensaver consists of a `Shape`, which has a starting color, and a list of `node`s.
 On each animation frame, the perimeter of the shape is drawn (A simple line between each node).

 Each `node` has a starting position, as well as a trajectory (speed / angle).  On each animation frame, the position will be adjusted.
 Should the `node` reach a boundary, it will bounce with some randomization to keep things interesting.

 The overall color of the shape will also change slowly as time progresses.

##Interesting Parameters

 The original Win-95 Mystify used two shapes with four nodes. I personally feel that a single shape with two nodes (A Line!)
 produces some pretty good looking results. I also opted to leave the trails in place.

 A shape will run for 20 seconds before pausing, and resetting to a new shape 5 seconds later.

 Feel free to dig in, and tweak things :)

 -Lenny

 ![Screensaver]()


