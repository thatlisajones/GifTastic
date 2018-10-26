



$(document).on('click', '.cinema', function() {

    //Set variables to call API
    var cinemaSnob = $(this).html(); 

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cinemaSnob + "&api_key=cBbCEaO8r8nfWDHs4ofmgngcz68DWzvy&limit=10";


    // Ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {