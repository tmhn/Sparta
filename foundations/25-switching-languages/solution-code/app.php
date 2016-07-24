<?php

  $guesses = 10;
  $rand = mt_rand ( 0 , 10 );

  function checkGuess($guess , $number) {

    if($guess > $number) {

      echo "lower\n";
      return false;

    } else if ($guess < $number) {

      echo "higher\n";
      return false;

    } else {

      echo "correct!\n";
      return true;

    }

  }

  $correct = false;

  while(!$correct) {

    $guesses--;

    // get the input from the user
    echo "What's your guess?\n";
    $handle = fopen("php://stdin","r");
    $guess = chop(fgets($handle));

    echo strlen($guess) . "\n";

    $correct = checkGuess($guess , $rand);

    echo "$guesses guesses remaining!\n";

    if(!$guesses) {
      echo "you've run out of guesses\n";
      $correct = true;
    }

  }


?>