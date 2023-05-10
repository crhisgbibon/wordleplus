<?php

namespace App\Models;

use App\Models\WordlePlusFragmentsModel;

class WordleProcessModel
{
  function __construct()
  {
    $this->session = \Config\Services::session();
    $this->wordsRemaining = [];
    if(!$this->session->has('dictionary')) $this->session->set('dictionary', '3');

    $this->qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","A", "S", "D", "F", "G", "H", "J", "K", "L", "?","Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
    $this->alphabet = array("Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M");
  }

  public function ScoreArray($rankArray)
  {
    $wordResult = [];
    
    $letterCount = [];
    
    $twoLetterScore1 = [];
    $twoLetterScore2 = [];
    $twoLetterScore3 = [];
    $twoLetterScore4 = [];
    
    $threeLetterScore1 = [];
    $threeLetterScore2 = [];
    $threeLetterScore3 = [];
    
    $highScore = 0;
    
    $tLen = count($rankArray);
    $aLen = count($this->alphabet);
    
    for($i = 0; $i < 26; $i++)
    {
      array_push($letterCount, 0);
    }
    
    for($i = 0; $i < $tLen; $i++)
    {
      for($t = 0; $t < 5; $t++)
      {
        $thisLetter = $rankArray[$i][0][$t];
        for($a = 0; $a < $aLen; $a++)
        {
          if($thisLetter === $this->alphabet[$a])
          {
            $letterCount[$a]++;
          }
        }
      }
      
      $oneTwo = $rankArray[$i][0][0] . $rankArray[$i][0][1];
      $twoThree = $rankArray[$i][0][1] . $rankArray[$i][0][2];
      $threeFour = $rankArray[$i][0][2] . $rankArray[$i][0][3];
      $fourFive = $rankArray[$i][0][3] . $rankArray[$i][0][4];
      
      $oneTwoThree = $rankArray[$i][0][0] . $rankArray[$i][0][1] . $rankArray[$i][0][2];
      $twoThreeFour = $rankArray[$i][0][1] . $rankArray[$i][0][2] . $rankArray[$i][0][3];
      $threeFourFive = $rankArray[$i][0][2] . $rankArray[$i][0][3] . $rankArray[$i][0][4];
      
      // oneTwo
      $len = count($twoLetterScore1);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($twoLetterScore1[$f]->get_fragment() === $oneTwo)
        {
          $twoLetterScore1[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($oneTwo, 1);
        array_push($twoLetterScore1, $f1);
      }
      
      // twoThree
      $len = count($twoLetterScore2);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($twoLetterScore2[$f]->get_fragment() === $twoThree)
        {
          $twoLetterScore2[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($twoThree, 1);
        array_push($twoLetterScore2, $f1);
      }
      
      // threeFour
      $len = count($twoLetterScore3);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($twoLetterScore3[$f]->get_fragment() === $threeFour)
        {
          $twoLetterScore3[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($threeFour, 1);
        array_push($twoLetterScore3, $f1);
      }
      
      // fourFive
      $len = count($twoLetterScore4);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($twoLetterScore4[$f]->get_fragment() === $fourFive)
        {
          $twoLetterScore4[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($fourFive, 1);
        array_push($twoLetterScore4, $f1);
      }
      
      // oneTwoThree
      $len = count($threeLetterScore1);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($threeLetterScore1[$f]->get_fragment() === $oneTwoThree)
        {
          $threeLetterScore1[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($oneTwoThree, 1);
        array_push($threeLetterScore1, $f1);
      }
      
      // twoThreeFour
      $len = count($threeLetterScore2);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($threeLetterScore2[$f]->get_fragment() === $twoThreeFour)
        {
          $threeLetterScore2[$f]->increment_total();
          $valid = false;
        }
      }
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($twoThreeFour, 1);
        array_push($threeLetterScore2, $f1);
      }
      
      // threeFourFive
      $len = count($threeLetterScore3);
      $valid = true;
      for($f = 0; $f < $len; $f++)
      {
        if($threeLetterScore3[$f]->get_fragment() === $threeFourFive)
        {
          $threeLetterScore3[$f]->increment_total();
          $valid = false;
        }
      }
      
      if($valid)
      {
        $f1 = new WordlePlusFragmentsModel($threeFourFive, 1);
        array_push($threeLetterScore3, $f1);
      }
    }
  
    for($i = 0; $i < $tLen; $i++)
    {
      $wordScore = 0;
      $used = [];
      
      for($t = 0; $t < 5; $t++)
      {
        $thisLetter = $rankArray[$i][0][$t];
        $duplicate = false;
        $uLen = count($used);
        if($uLen > 0)
        {
          for($u = 0; $u < $uLen; $u++)
          {
            if($thisLetter === $used[$u])
            {
              $duplicate = true;
            }
          }
        }
        if($duplicate) continue;
        for($a = 0; $a < $aLen; $a++)
        {
          if($thisLetter === $this->alphabet[$a])
          {
            $wordScore = $wordScore + $letterCount[$a];
          }
        }
        array_push($used, $thisLetter);
      }
      
      $oneTwoT = $rankArray[$i][0][0] . $rankArray[$i][0][1];
      $twoThreeT = $rankArray[$i][0][1] . $rankArray[$i][0][2];
      $threeFourT = $rankArray[$i][0][2] . $rankArray[$i][0][3];
      $fourFiveT = $rankArray[$i][0][3] . $rankArray[$i][0][4];
      
      $oneTwoThreeT = $rankArray[$i][0][0] . $rankArray[$i][0][1] . $rankArray[$i][0][2];
      $twoThreeFourT = $rankArray[$i][0][1] . $rankArray[$i][0][2] . $rankArray[$i][0][3];
      $threeFourFiveT = $rankArray[$i][0][2] . $rankArray[$i][0][3] . $rankArray[$i][0][4];
      
      $len = count($twoLetterScore1);
      for($f = 0; $f < $len; $f++)
      {
        if($oneTwoT === $twoLetterScore1[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore1[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore2);
      for($f = 0; $f < $len; $f++)
      {
        if($twoThreeT === $twoLetterScore2[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore2[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore3);
      for($f = 0; $f < $len; $f++)
      {
        if($threeFourT === $twoLetterScore3[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore3[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore4);
      for($f = 0; $f < $len; $f++)
      {
        if($fourFiveT === $twoLetterScore4[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore4[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore1);
      for($f = 0; $f < $len; $f++)
      {
        if($oneTwoThreeT === $threeLetterScore1[$f]->get_fragment())
        {
          $wordScore = $wordScore + $threeLetterScore1[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore2);
      for($f = 0; $f < $len; $f++)
      {
        if($twoThreeFourT === $threeLetterScore2[$f]->get_fragment())
        {
          $wordScore = $wordScore + $threeLetterScore2[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore3);
      for($f = 0; $f < $len; $f++)
      {
        if($threeFourFiveT === $threeLetterScore3[$f]->get_fragment())
        {
          $wordScore = $wordScore + $threeLetterScore3[$f]->get_total();
          break;
        }
      }
      
      $wordReturn = array($rankArray[$i][0], $wordScore);
      if($wordScore > $highScore) $highScore = $wordScore;
      array_push($wordResult, $wordReturn);
    }
    
    $rLen = count($wordResult);
    
    for($i = 0; $i < $rLen; $i++)
    {
      $score = $wordResult[$i][1];
      $percent = (100 / $highScore) * $score;
      $percent = round($percent, 2);
      $wordResult[$i][1] = $percent;
    }
    
    return $wordResult;
  }

  public function Evaluate($guess, $answer)
  {
    $guessToArray = str_split($guess);
    $answerToArray = str_split($answer);
    $resultArray = array(-1, -1, -1, -1, -1);
    
    for($i = 0; $i < 5; $i++)
    {
      // if known position
      if($answerToArray[$i] === $guessToArray[$i])
      {
        $resultArray[$i] = 2;
      }
      else
      {
        // filter check - answer = empty or erect, guess = peers
        // if not known but in array then is wrong position
        if(in_array($guessToArray[$i], $answerToArray))
        {
          // positions in answer array where the letter occurs
          $numOfLetterInAnswer = array_keys($answerToArray, $guessToArray[$i]);
          // positions in guess array where letter occurs
          $numOfLetterInGuess = array_keys($guessToArray, $guessToArray[$i]);
          $answerCount = count($numOfLetterInAnswer);
          $guessCount = count($numOfLetterInGuess);
          
          //print_r("Wrong position letter: " . $guessToArray[$i] . "\n");
          //print_r($answerCount . "\n");
          //print_r($guessCount . "\n");
          
          // if there are more of the letter in the guess than the answer
          if($guessCount > $answerCount)
          {
            // loop through the guessletters and remove any direct matches first (green must stay green even if last)
            $matchCount = 0;
            for($g = 0; $g < $guessCount; $g++)
            {
              // mark positions that are matches 
              
              if($guessToArray[$numOfLetterInGuess[$g]] === $answerToArray[$numOfLetterInGuess[$g]])
              {
                $numOfLetterInGuess[$g] = -1;
                $matchCount++;
              }
            }
            
            $answerCount -= $matchCount;
            $guessCount -= $matchCount;
            // remainder should be non matching letters so return 1 for within count and -1 for those above
            // if more than answercount return -1
            
            // loop through the array of positions where guess letter appears
            $counter = 0;
            for($g = 0; $g < $guessCount; $g++)
            {
              // skip if the letter has been saved as green
              if($numOfLetterInGuess[$g] != -1)
              {
                if($counter < $answerCount)
                {
                  $resultArray[$numOfLetterInGuess[$g]] = 1;
                }
                else
                {
                  break;
                }
                $counter++;
              }
            }
          }
          else
          {
            // if guesscount is the same or less than answer count then no need to check anything
            $resultArray[$i] = 1;
          }
        }
      }
    }
    return $resultArray;
  }

  public function FilterList($wordArray, $answer, $guessList)
  {
    /*
    solve for raise
    first guess will be rates
    
    known letters should be r a -1 -1 -1
    excluded letters should be t
    wrong letters should be e/3 s/4
    */
    
    // remove first word which is last guess
    $wordArray[0] = null;
    
    // convert the answer into an array and get its length (should be 5)
    $aArray = str_split($answer);
    $aLen = count($aArray);
    
    $excludedLetters = array();
    $knownLetters = array("-1", "-1", "-1", "-1", "-1");
    $knownLettersByPosition = array();
    
    // length of remaining wordsRemaining
    $wLength = count($wordArray);
    if($wLength === 0) return;
    
    // number of guesses to date
    $gLength = count($guessList);
    if($gLength === 0) return;
    
    // loop through guesses already made to populate known/excluded/wrong letters arrays

    for($i = 0; $i < $gLength; $i++)
    {
      // get individual letters of each guess
      $l_1 = $guessList[$i][0];
      $l_2 = $guessList[$i][1];
      $l_3 = $guessList[$i][2];
      $l_4 = $guessList[$i][3];
      $l_5 = $guessList[$i][4];
      
      // convert them into an array to search through
      $guessArray = array($l_1, $l_2, $l_3, $l_4, $l_5);
      //print_r($guessArray);
      
      // loop through the answer
      // if the answer matches with the guess letter then it is a known letter
      for($v = 0; $v < 5; $v++)
      {
        if($aArray[$v] === $guessArray[$v])
        {
          $knownLetters[$v] = $guessArray[$v];
        }
      }
      
      // check the letter is neither in the answer or already in excluded letters
      // if so then add to excluded letters
      if(!in_array($l_1, $aArray))
      {
        if(!in_array($l_1, $excludedLetters)) array_push($excludedLetters, $l_1);
      }
      if(!in_array($l_2, $aArray))
      {
        if(!in_array($l_2, $excludedLetters)) array_push($excludedLetters, $l_2);
      }
      if(!in_array($l_3, $aArray))
      {
        if(!in_array($l_3, $excludedLetters)) array_push($excludedLetters, $l_3);
      }
      if(!in_array($l_4, $aArray))
      {
        if(!in_array($l_4, $excludedLetters)) array_push($excludedLetters, $l_4);
      }
      if(!in_array($l_5, $aArray))
      {
        if(!in_array($l_5, $excludedLetters)) array_push($excludedLetters, $l_5);
      }
      
      // set up wrong position array
      // if letters are not excluded or known they must be wrong position?
      
      // loop through guessed words and check if they are not in either of two lists
      for($v = 0; $v < 5; $v++)
      {
        if(!in_array($guessArray[$v], $excludedLetters))
        {
          if(!in_array($guessArray[$v], $knownLetters))
          {
            // store each out of place letter and the location it was in
            $entry = array($guessArray[$v], $v);
            array_push($knownLettersByPosition, $entry);
          }
        }
      }
    }
    
    $kCount = count($knownLetters);
    $eCount = count($excludedLetters);
    $pCount = count($knownLettersByPosition);
    
    for($w = 1; $w < $wLength; $w++)
    {
      $eliminate = false;
      
      // validate against known letters
      if($kCount > 0)
      {
        for($k = 0; $k < $kCount; $k++)
        {
          if($knownLetters[$k] != "-1")
          {
            if($knownLetters[$k] != $wordArray[$w][0][$k])
            {
              $eliminate = true;
            }
          }
        }
      }
      
      // convert word we are checking into an array
      $wordArr = str_split($wordArray[$w][0]);
      
      // validate against excluded letters
      if($eCount > 0)
      {
        for($e = 0; $e < $eCount; $e++)
        {
          if(in_array($excludedLetters[$e], $wordArr))
          {
            $eliminate = true;
          }
        }
      }
      
      // validate against wrong pos
      if($pCount > 0)
      {
        // loop through wrong postion letters - [0] is the letter and [1] is the position to avoid
        for($e = 0; $e < $pCount; $e++)
        {
          // first check if the letter does contain the letter, otherwise void
          if(!in_array($knownLettersByPosition[$e][0], $wordArr))
          {
            $eliminate = true;
          }
          else
          {
            // if it does contain the letter, check it isn't at the wrong pos, otherwise void
            $returnKeys = array_keys($wordArr, $knownLettersByPosition[$e][0]);
            // loop through returnKeys and confirm none of the indexes match with wrong position
            $returnCount = count($returnKeys);
            for($r = 0; $r < $returnCount; $r++)
            {
              if($returnKeys[$r] === $knownLettersByPosition[$e][1])
              {
                $eliminate = true;
              }
            }
          }
        }
      }
      
      if($eliminate === true)
      {
        $wordArray[$w] = null;
      }
    }
    
    // remove null values and re-index remainder
    $wordArray = array_filter($wordArray);
    $wordArray = array_values($wordArray);
    
    return $wordArray;
  }
}