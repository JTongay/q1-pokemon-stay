// $( function () {
//     var $browse = $( '.browse' );
//     var $region = $( '.region' );
//     var $kanto = $( '#kanto' );
//     var $johto = $( '#johto' );
//     var $hoenn = $( '#hoenn' );
//     var $sinnoh = $( '#sinnoh' );
//     var $unova = $( '#unova' );
//     var $kalos = $( '#kalos' );
//     var $kantoCell = $( '#kanto-cell' );
//     var $johtoCell = $( '#johto-cell' );
//     var $hoennCell = $( '#hoenn-cell' );
//     var $sinnohCell = $( '#sinnoh-cell' );
//     var $unovaCell = $( '#unova-cell' );
//     var $kalosCell = $( '#kalos-cell' );
//     var $pokeList = $( '.poke-list' )
//
//
//
//
//     $kanto.on( 'click', function ( event ) {
//         event.preventDefault();
//         $region.not( $kantoCell ).fadeOut( 1000 )
//         $.ajax( {
//             url: "http://pokeapi.co/api/v2/pokedex/2/"
//         } ).done( function ( data ) {
//             // console.log( data );
//             data.pokemon_entries.forEach( function ( num ) {
//                 console.log( num.entry_number );
//                 var $pokeThumb = $( '<img>' )
//                 $pokeThumb.attr( "src", "http://veekun.com/dex/media/pokemon/dream-world/" + num.entry_number + ".svg" );
//                 // $pokeThumb.attr( "href", "3.html" )
//                 $pokeThumb.addClass( "poke-pic" );
//                 $pokeList.append( $pokeThumb )
//             } )
//         } )
//     } )
//
//     $( document ).on( 'click', '.poke-pic', function () {
//         console.log( pokeNum );
//     } )
//
// } )
