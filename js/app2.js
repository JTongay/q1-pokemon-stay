$(function(){

paper.install( window );
window.onload = function () {
    paper.setup( 'myCanvas' );
    var pokeCount = 648;
    var $information = $('.information-page');

    var genNum;
    var pokeName = $( '#poke-name' );
    var pokePic = $( '#poke-pic' );
    var lastPoke = $( '#last-poke' );
    var nextPoke = $( '#next-poke' );
    var pokeId = $( '#poke-dex-num' );
    var $options = $( '.options' );
    var $external = $( '.external' );
    var $video = $( '#video' );
    var $type = $( '#type' );
    var $measurements = $( '#measurements' );
    var $habitat = $( '#habitat' );
    var $origin = $( '#origin' );
    var $flavor = $( '#flavor' );
    var $evoChain = $( '#evo-chain' );
    var $stats = $( '#stats' );
    var $abilities = $( '#abilities' );
    var evoChain;
    var $browse = $( '.browse' );
    var $region = $( '.region' );
    var kanto = 2
    var johto = 3
    var hoenn = 4
    var sinnoh = 5
    var unova = 6
    var kalos = 7
    var $kantoCell = $( '#kanto-cell' );
    var $johtoCell = $( '#johto-cell' );
    var $hoennCell = $( '#hoenn-cell' );
    var $sinnohCell = $( '#sinnoh-cell' );
    var $unovaCell = $( '#unova-cell' );
    var $kalosCell = $( '#kalos-cell' );
    var $pokeList = $( '.poke-list' );


    window.setInterval( function () {
      var randomPoke = Math.ceil( Math.random() * pokeCount )
        var pokemon = new Raster( {
                source: "http://veekun.com/dex/media/pokemon/dream-world/" + randomPoke + ".svg"
                    // position: view.bounds,
            } )
        console.log(pokemon);
        var $pokeBall = $('<img>');
        $pokeBall.attr("value",randomPoke);
        $pokeBall.addClass("pokeball col-md-1")
        $pokeBall.attr("src", "images/poke-ball.png");
        $('#poke-sprites').append($pokeBall)
            // get sprite size
        pokemon.scale( 0.2 );
        var hitsY = false;
        var hitSide = false;
        var x = -1;
        var y = 0;
        pokemon.onFrame = function ( event ) {
            this.rotate( 3 );
            //Y - Axis

            // something that makes hitsBottom false
            this.translate( x, y );

            if ( !hitsY ) {
                x = 1;
                y = 3;
                this.translate( x, y )
                if ( this.position._y > 800) {
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

            if(this.intersects(person)){
              console.log("hit");
              this.visible = false;
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

    $(document).on('click', '.pokeball', function(event){
      event.preventDefault();
      $information.fadeIn(1000);
      $(this).css("backgroundColor", "blue")

      var chosenOne = $(this).attr("value");
      caughtData(chosenOne);

    })

    function capitalizeFirstLetter( string ) {
         return string.charAt( 0 ).toUpperCase() + string.slice( 1 );

     }

    function videoRequest( searchTerm ) {
         var params = {
                 q: searchTerm,
                 r: "json",
                 part: "snippet",
                 key: "AIzaSyBY3xtxbg4_S1Dm748-cqwAFffIimLFjCQ",
                 maxResults: 1,
                 type: "video"
             },
             url = "https://www.googleapis.com/youtube/v3/search";
         $.getJSON( url, params, function ( data ) {

             $video.attr( "src", "https://www.youtube.com/embed/" + data.items[ 0 ].id.videoId )
         } )
     }

    function getType( array ) {
         for ( var i = 0; i < array.length; i++ ) {
             // console.log( array[ i ].type.name );
             if ( i > 1 ) {
                 $type.append( capitalizeFirstLetter( array[ 0 ].type.name ) + "&#47;" + capitalizeFirstLetter( array[ 1 ].type.name ) )
             } else {

                 $type.append( capitalizeFirstLetter( array[ i ].type.name ) )
             }


         }
     }

    function goodPokePic( num ) {
         return "http://veekun.com/dex/media/pokemon/dream-world/" + num + ".svg"
     }

    function heightConverter( height ) {
         return height * 10 + "cm";
     }

    function weightConverter( weight ) {
         return weight / 10 + "kg";
     }

    function showStats( arr ) {
         for ( var i = 0; i < arr.length; i++ ) {
             $stats.append( capitalizeFirstLetter( arr[ i ].stat.name ) + ": " + arr[ i ].base_stat + "" + "<br>" )
         }
     }

    function abilities( arr ) {
         for ( var i = 0; i < arr.length; i++ ) {
             $abilities.append( capitalizeFirstLetter( arr[ i ].ability.name ) + "<br>" )
         }
     }

  function habitatCheck( val ) {
         if ( val === null ) {
             $habitat.text( "No Entry Listed" )
         } else {
           $habitat.text(val.name)
             // return val;
         }
     }

     function caughtData(num){
       var sprites = $.ajax( {
           url: "http://pokeapi.co/api/v2/pokemon/" + num
       } )
       sprites.done( function ( data ) {
               // console.log( data );
               pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
               pokePic.attr( "src", goodPokePic( num ) )
               $type.empty()
               getType( data.types )
               $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )
               $stats.empty();
               showStats( data.stats )
               $abilities.empty();
               abilities( data.abilities )
               videoRequest( data.name + "pokemon anime" )

           } )
           // <-----------------More PokeInfo-------------------->
       $.ajax( {
           url: "http://pokeapi.co/api/v2/pokemon-species/" + num
       } ).done( function ( stuff ) {
           console.log( stuff );
           habitatCheck( stuff.habitat )

           // $habitat.text( capitalizeFirstLetter( stuff.habitat.name ) )
           $flavor.text( stuff.flavor_text_entries[ 1 ].flavor_text )
           genNum = stuff.generation.url

           $.ajax( {
               url: genNum
           } ).done( function ( things ) {
               console.log( things );
               $origin.text( capitalizeFirstLetter( things.main_region.name ) )
           } )
       } )

     }






}

})
