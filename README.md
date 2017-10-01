# The Very Amazing Frogger Clone

## Introduction

Can you do it?  Can you get past the nasty ol' ladybirds and jump in the river?

## Code Samples

The ladybird!  Look at how she moves!  So smooth.
~~~~
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
        this.x = -20;
    }
    this.x += this.speed * dt;
    //collision detection part 1 - bug and player occupying same row?
    if (this.y == playerY) {
        // collision detection part 2 - close?
        // first we round up the bug's x-axis position...
        var range = ((Math.round(this.x) - playerX));
        console.log(range);
        //...then see if it's within a reasonable range of the player.
        if (range > -75 && range < 80) {
            //if it is, we reset the player's position (and collision detection position)
            player.x = 200;
            player.y = 390;
            playerX = null;
            playerY = null;
            //...start a new wave
            newWave();
        }
    }
};
~~~~

## Installation

Open index.html to start the game.

You're safe at the bottom, but watch out if you get close to those ladybirds!

They're venomous!

The have antennaed children like you for breakfast!

The aim of the game is to get to the water.

Use the Arrow Keys to control your character.

Post about it on FaceBook!

Drink a room-temp lemonade.

You've had a long day.
