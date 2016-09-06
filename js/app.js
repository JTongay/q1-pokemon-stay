$( function () {


    //Variabal Declarations
    var pokeNum = 1;
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

    var sprites = $.ajax( {
        url: "http://pokeapi.co/api/v2/pokemon/" + pokeNum
    } )

    function species( pokeNum ) {
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon-species/" + pokeNum
        } )
    }


    // <---------------Landing Page Stuff-------------->
    $( document ).on( 'click', '.show-options', function () {
        $options.fadeIn( 1000 )
    } )

    // <----------------PokeInfo Page Stuff------------>
    sprites.done( function ( data ) {
        // console.log( data );
        pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
        pokePic.attr( "src", data.sprites.front_default )
        $type.empty()
        getType( data.types )
        $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )

    } )
    species( pokeNum ).done( function ( stuff ) {
        console.log( stuff );
        console.log( pokeNum );
    } )

    //Click Events
    $( document ).on( 'click', '#last-poke', function () {
        pokeNum--;
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon/" + pokeNum
        } ).done( function ( data ) {
            pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
            pokePic.attr( "src", data.sprites.front_default )
            $type.empty()
            getType( data.types )
            $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )

        } )
        species( pokeNum ).done( function ( stuff ) {
            console.log( stuff );
            console.log( pokeNum );
        } )


    } );
    $( document ).on( 'click', '#next-poke', function () {
        pokeNum++
        $.ajax( {
            url: "http://pokeapi.co/api/v2/pokemon/" + pokeNum
        } ).done( function ( data ) {
            pokeName.text( capitalizeFirstLetter( data.name ) + " #" + data.game_indices[ 0 ].game_index )
            pokePic.attr( "src", data.sprites.front_default )
            $type.empty()
            getType( data.types )
            $measurements.text( heightConverter( data.height ) + " " + weightConverter( data.weight ) )

        } )
        species( pokeNum ).done( function ( stuff ) {
            console.log( stuff );
            console.log( pokeNum );
        } )

        // $.ajax( {
        //     url: "http://pokeapi.co/api/v2/pokemon-species/" + pokeNum
        // } ).done( function ( stuff ) {
        //     console.log( stuff );
        //     console.log( pokeNum );
        // } )

    } )


    //<----------Helper Functions---------------->
    function capitalizeFirstLetter( string ) {
        return string.charAt( 0 ).toUpperCase() + string.slice( 1 );

    }

    // function videoRequest( searchTerm ) {
    //     var params = {
    //             q: searchTerm,
    //             r: "json",
    //             part: "snippet",
    //             key: "AIzaSyBY3xtxbg4_S1Dm748-cqwAFffIimLFjCQ",
    //             maxResults: 1,
    //             type: "video"
    //         },
    //         url = "https://www.googleapis.com/youtube/v3/search";
    //     $.getJSON( url, params, function ( data ) {
    //         console.log( data );
    //     } )
    // }

    function getType( array ) {
        for ( var i = 0; i < array.length; i++ ) {
            // console.log( array[ i ].type.name );
            $type.append( array[ i ].type.name )

        }
    }

    function heightConverter( height ) {
        return height * 10 + "cm";
    }

    function weightConverter( weight ) {
        return weight / 10 + "kg";
    }








} )
