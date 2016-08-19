$(function(){


  var film;
  var keys = ["tagline" , "release_date"];
  var currentBlur = 50;
  var timer;

  setupGame();

  function setupGame() {

    loadFilms();

    // event listeners
    $('#clue_button').click(nextClue);
    $("#answer_button").click(guess);

  }

  function loadFilms() {
   $.get('https://api.themoviedb.org/3/discover/movie?api_key=96dba57da0352392b78ff39b3bba3bd8' , function(data){

      films = data.results;

      film = films[0];

      nextFilm();

   });
  }

 function nextFilm() {

    
    var letters = film.original_title.split("");

    $(letters).each(function(index, letter){

        var spacer = $("<span></span>");

        if(letter != " ") {
          spacer.addClass('underline');
        }

        $("#spacers").append(spacer);

    });

    $("#film img").attr('src' , "https://image.tmdb.org/t/p/w1280" + film.backdrop_path);

    timer = setInterval(nextClue ,100);

 }

 function nextClue() {

    currentBlur -= 0.2;

    if(currentBlur < 0) {

      clearInterval(timer);
      setBlur(0);

    } else  {

      setBlur(currentBlur);

    }
    

 }

 function guess() {

    var guess = $("#guess").val();

    if(guess.toLowerCase() == film.original_title.toLowerCase()) {
      
      alert('correct');

    } else {
      alert("wrong! you're out!");
    }

 }

 function setBlur(blur) {

    var blurValue = 'blur(' + blur + 'px)';
    $("#poster").css({
       'filter'         : blurValue,
       '-webkit-filter' : blurValue,
       '-moz-filter'    : blurValue,
       '-o-filter'      : blurValue,
       '-ms-filter'     : blurValue
    });

 }

});