//Create array of cinema search phrases	
$(document).ready(function() {

  var topics = ["Fritz Lang", "Who's Afraid of Virginia Woolf", "Sophia Loren", "Cabinet of Dr. Caligari", "La Dolce Vita", "Charles Laughton", "Buster Keaton", "Marlon Brando", "James Dean",  "The Passion of Joan of Arc", "Murnau Sunrise", "Double Indemnity"];	

  // Create buttons for items in array
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('cinema');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

// When a button is clicked...
$(document).on('click', '.cinema', function() {

    var cinemaSnob = $(this).html(); 
    console.log(cinemaSnob);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cinemaSnob + "&api_key=cBbCEaO8r8nfWDHs4ofmgngcz68DWzvy&limit=10";
    console.log(queryURL);

    // Set Ajax call for each button
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        console.log(results);
        
        //Clear div before adding new GIFs
        $('#movies-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Pulling ratings for each movie
        var rating = results[j].rating;
            // console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#movies-view').prepend(displayRated);
  } // end for loop

}); // end

        //Still then animate
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //end of on click function

      }); //end of document on click 

          //add new button to array
        $(document).on('click', '#add-movie', function(){
            if ($('#movie-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); // end click function