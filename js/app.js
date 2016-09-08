$( function () {


    //Variabal Declarations
    var genNum;
    // var pokeNum = 1;
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
    var $kanto = $( '#kanto' );
    var $johto = $( '#johto' );
    var $hoenn = $( '#hoenn' );
    var $sinnoh = $( '#sinnoh' );
    var $unova = $( '#unova' );
    var $kalos = $( '#kalos' );
    var $kantoCell = $( '#kanto-cell' );
    var $johtoCell = $( '#johto-cell' );
    var $hoennCell = $( '#hoenn-cell' );
    var $sinnohCell = $( '#sinnoh-cell' );
    var $unovaCell = $( '#unova-cell' );
    var $kalosCell = $( '#kalos-cell' );
    var $pokeList = $( '.poke-list' )


    // <---------------Landing Page Stuff-------------->
    $( document ).on( 'click', '.show-options', function () {
        $options.fadeIn( 1000 )
    } )

    // <----------------PokeInfo Page Stuff------------>
    // infoPage( pokeNum )

    // $.ajax( {
    //     url: genNum
    // } ).done( function ( things ) {
    //     console.log( things );
    // } )


    //Click Events
    $( document ).on( 'click', '#last-poke', function () {
        pokeNum--;
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon/" + pokeNum
        } ).done( function ( data ) {
            pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
                // pokePic.attr( "src", data.sprites.front_default )
            pokePic.attr( "src", goodPokePic( pokeNum ) )
            $type.empty()
            getType( data.types )
            $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )
            $stats.empty()
            showStats( data.stats )
            $abilities.empty()
            abilities( data.abilities )
            videoRequest( data.name + "pokemon anime" )

        } )

        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon-species/" + pokeNum
        } ).done( function ( stuff ) {
            habitatCheck( stuff.habitat )
            $habitat.text( capitalizeFirstLetter( stuff.habitat.name ) )
            $flavor.text( stuff.flavor_text_entries[ 1 ].flavor_text )
            genNum = stuff.generation.url

            $.ajax( {
                url: genNum
            } ).done( function ( things ) {
                // console.log( things );
                $origin.text( capitalizeFirstLetter( things.main_region.name ) )
            } )
        } )

        // $.ajax( {
        //     url: genNum
        // } ).done( function ( things ) {
        //     console.log( things );
        // } )


    } );
    $( document ).on( 'click', '#next-poke', function () {
        pokeNum++
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon/" + pokeNum
        } ).done( function ( data ) {
            pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
                // pokePic.attr( "src", data.sprites.front_default )
            pokePic.attr( "src", goodPokePic( pokeNum ) )
            $type.empty()
            getType( data.types )
            $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )
            $stats.empty();
            showStats( data.stats )
            $abilities.empty()
            abilities( data.abilities )
            videoRequest( data.name + "pokemon anime" )


        } )


        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon-species/" + pokeNum
        } ).done( function ( stuff ) {
            habitatCheck( stuff.habitat )
            $habitat.text( capitalizeFirstLetter( stuff.habitat.name ) )
            $flavor.text( stuff.flavor_text_entries[ 1 ].flavor_text )
            genNum = stuff.generation.url

            $.ajax( {
                url: genNum
            } ).done( function ( things ) {
                // console.log( things );
                $origin.text( capitalizeFirstLetter( things.main_region.name ) )
            } )

        } )

        // $.ajax( {
        //     url: genNum
        // } ).done( function ( things ) {
        //     console.log( things );
        // } )

    } )

    //<--------Page 4 Stuff----------->
    $kanto.on( 'click', function ( event ) {
        event.preventDefault();
        $region.not( $kantoCell ).fadeOut( 1000 )
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokedex/2/"
        } ).done( function ( data ) {
            var pokeNumbers = data.pokemon_entries
            for ( var i = 0; i < pokeNumbers.length; i++ ) {
                var $pokeThumb = $( '<img>' )
                $pokeThumb.attr( "src", "http://veekun.com/dex/media/pokemon/dream-world/" + pokeNumbers[ i ].entry_number + ".svg" );
                $pokeThumb.attr( "id", pokeNumbers[ i ].entry_number )
                $pokeThumb.addClass( "poke-pic" );
                $pokeList.append( $pokeThumb )
                    // console.log( $pokeThumb );

            }
        } )
    } )

    $( document ).on( 'click', '.poke-pic', function ( event ) {
        event.preventDefault()
        var chosen = $( this ).attr( "id" );
        console.log( chosen );
        // console.log( "what the fuck" );
        $( '.information-page' ).show()
        infoPage( chosen )
    } )


    //<----------Helper Functions---------------->
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
        if ( val == false ) {
            return "No Entry Listed"
        } else {
            return val;
        }
    }

    function infoPage( num ) {
        var sprites = $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon/" + num
        } )
        sprites.done( function ( data ) {
                // console.log( data );
                pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
                    // pokePic.attr( "src", data.sprites.front_default )
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
            $habitat.text( capitalizeFirstLetter( stuff.habitat.name ) )
            $flavor.text( stuff.flavor_text_entries[ 1 ].flavor_text )
            genNum = stuff.generation.url

            $.ajax( {
                url: genNum
            } ).done( function ( things ) {
                // console.log( things );
                $origin.text( capitalizeFirstLetter( things.main_region.name ) )
            } )
        } )

        return num;
    }




} )


//<---Revisit this------------->

// evoChain = stuff.evolution_chain.url
// $.ajax( {
//     url: evoChain
// } ).done( function ( things ) {
//     //Final Stage
//     console.log( things.chain.evolves_to[ 0 ].evolves_to[ 0 ].species.name );
//     //Medium Stage
//     console.log( things.chain.evolves_to[ 0 ].species.name );
//     var medStage = things.chain.evolves_to[ 0 ].species.name;
//     var finalStage = things.chain.evolves_to[ 0 ].evolves_to[ 0 ].species.name
//     $evoChain.text( capitalizeFirstLetter( medStage ) + capitalizeFirstLetter( finalStage ) )
//
// } )
