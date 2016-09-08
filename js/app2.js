paper.install( window );
window.onload = function () {
    paper.setup( 'myCanvas' );
    var pokeSprite = document.getElementById( "poke-sprites" )
    var pokeCount = 386;
    for ( var i = 1; i < pokeCount; i++ ) {
        var createSprite = document.createElement( "img" );
        createSprite.setAttribute( "src", "http://veekun.com/dex/media/pokemon/dream-world/" + i + ".svg" )
        createSprite.setAttribute( "class", "poke-pic" )
        createSprite.setAttribute( "id", "poke-num" + i )
        createSprite.setAttribute( "style", "width:'20' height:'20'" )
        pokeSprite.appendChild( createSprite )
            // var pokemon = new Raster( "poke-num" + i )
            // pokemon.scale( 0.2 )
            // pokemon.position = view.center
            // pokemon.onFrame = function ( event ) {
            //     this.rotate( 3 )
            // }
    }



    window.setInterval( function () {
        var pokemon = new Raster( {
                source: "http://veekun.com/dex/media/pokemon/dream-world/" + Math.floor( Math.random() * pokeCount ) + ".svg"
                    // position: view.bounds,
            } )
            // get sprite size
        pokemon.scale( 0.1 );
        var hitsY = false;
        var hitSide = false;
        var x = 1;
        var y = 1;
        pokemon.onFrame = function ( event ) {
            this.rotate( 3 );
            //Y - Axis

            // something that makes hitsBottom false
            this.translate( x, y );

            if ( !hitsY ) {
                x = 1;
                y = 2;
                this.translate( x, y )
                console.log( 'yo' );
                if ( this.position._y > 800 ) {
                    hitsY = !hitsY;
                }
            } else {
                x = -1;
                y = -5;
                this.translate( x, y )

                if ( this.position._y < 0 ) {
                    hitsY = !hitsY;
                }
            }

            if ( !hitSide ) {
                x = 5;
                y = 5;
                this.translate( x, y )

                if ( this.position._x > 1000 ) {
                    hitSide = !hitSide
                }
            } else {
                x = -5;
                y = -5;
                this.translate( x, y )

                if ( this.position._x < 0 ) {
                    hitSide = !hitSide
                }
            }

            //X - Axis
            // if ( this.position._x > 1000 ) {
            //     hitSide = true
            // }
            //
            // if ( !this.position._x || this.position._x < 0 ) {
            //     notSide = true;
            // }
            //
            // if ( hitSide ) {
            //     this.translate( 0, 5 )
            //     this.translate( 5, 0 )
            // } else if ( notSide ) {
            //     this.translate( 0, -5 )
            //     this.translate( -5, 0 )
            // }
        }

    }, 5000 )

    var person = new Raster( "person" )
    person.position = view.center
    person.scale( 0.2 )
    person.onFrame = function ( event ) {
        // raster.position = view.center

        if ( Key.isDown( "d" ) ) {
            this.translate( 5, 0 );
        }
        if ( Key.isDown( "w" ) ) {
            this.translate( 0, -5 );
        }
        if ( Key.isDown( "a" ) ) {
            this.translate( -5, 0 );
        }
        if ( Key.isDown( "s" ) ) {
            this.translate( 0, 5 );
        }
        if ( Key.isDown( 'right' ) ) {
            this.rotate( 5 );
        }
        if ( Key.isDown( 'left' ) ) {
            this.rotate( -5 );
        }
        if ( Key.isDown( 'down' ) ) {
            this.scale( 1.1 );
        }
        if ( Key.isDown( 'up' ) ) {
            this.scale( 0.9 );
        }
    }




}
