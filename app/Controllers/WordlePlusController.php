<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use CodeIgniter\Files\File;

use App\Models\WordlePlusModel;
use App\Models\WordlePlusFragmentsModel;

class WordlePlusController extends BaseController
{

  function __construct()
  {
    $this->qwerty = array();
    $this->alphabet = array();
    
    $this->w1 = array();
    $this->w2 = array();
    $this->w3 = array();
    $this->w4 = array();
    $this->w5 = array();
    $this->w6 = array();
    $this->w7 = array();
    $this->w8 = array();
    $this->w9 = array();
    
    $this->wordsRemaining = array();

    $this->Start();
  }

  private function Boot(int $dictionary)
  {
    $this->wordsRemaining = array();
    if($dictionary === 1) {
      $this->wordsRemaining = $this->w1;
    }
    if($dictionary === 2) {
      $this->wordsRemaining = $this->w2;
    }
    if($dictionary === 3) {
      $this->wordsRemaining = $this->w3;
    }
    if($dictionary === 4) {
      $this->wordsRemaining = $this->w4;
    }
    if($dictionary === 5) {
      $this->wordsRemaining = $this->w5;
    }
    if($dictionary === 6) {
      $this->wordsRemaining = $this->w6;
    }
    if($dictionary === 7) {
      $this->wordsRemaining = $this->w7;
    }
    if($dictionary === 8) {
      $this->wordsRemaining = $this->w8;
    }
    if($dictionary === 9) {
      $this->wordsRemaining = $this->w9;
    }
  }

  private function Start()
  {
    $file1 = WRITEPATH . 'words/1000F.txt';
    $file2 = WRITEPATH . 'words/10000F.txt';
    $file3 = WRITEPATH . 'words/20000F.txt';

    $file4 = WRITEPATH . 'words/english1F.txt';
    $file5 = WRITEPATH . 'words/english2F.txt';
    $file6 = WRITEPATH . 'words/wordsF.txt';

    $file7 = WRITEPATH . 'words/allwordsF.txt';
    $file8 = WRITEPATH . 'words/wordleListF.txt';
    $file9 = WRITEPATH . 'words/wordleList2F.txt';

    $this->w1 = $this->ConvertRankedFileToArray(file_get_contents($file1));
    $this->w2 = $this->ConvertRankedFileToArray(file_get_contents($file2));
    $this->w3 = $this->ConvertRankedFileToArray(file_get_contents($file3));

    $this->w4 = $this->ConvertRankedFileToArray(file_get_contents($file4));
    $this->w5 = $this->ConvertRankedFileToArray(file_get_contents($file5));
    $this->w6 = $this->ConvertRankedFileToArray(file_get_contents($file6));

    $this->w7 = $this->ConvertRankedFileToArray(file_get_contents($file7));
    $this->w8 = $this->ConvertRankedFileToArray(file_get_contents($file8));
    $this->w9 = $this->ConvertRankedFileToArray(file_get_contents($file9));
    
    $this->qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                          "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
                          "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
        
    $this->alphabet = array("Q","W","E","R","T","Y","U","I","O","P",
                            "A","S","D","F","G","H","J","K","L",
                            "Z","X","C","V","B","N","M");
  
    // $this->wordsRemaining = $this->w3;
  }

  function ConvertRankedFileToArray($file)
  {
    $one = explode("\n",$file);
    $w1 = array();
    foreach ($one as $item){
        $w1[] = explode(",",$item);
    }
    return $w1;
  }

  // PROCESS

  public function index()
  {
    return view('templates/header')
            . view('wordleplus/controls')

            . view('wordleplus/play')
            . view('wordleplus/clue')
            . view('wordleplus/name')

            . view('wordleplus/chart')
            . view('wordleplus/leaderboard')
            . view('wordleplus/solve')

            . view('wordleplus/dictionary')
            . view('wordleplus/info')
            . view('wordleplus/guessTable')

            . view('wordleplus/listTable')
            . view('wordleplus/keyboard')
            . view('wordleplus/guessTable')

            . view('templates/footer');
  }

  public function Solve()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $solveAttempt = (string)$this->request->getVar('solveAttempt');
    // $solveAttempt = (string)$request->solveAttempt;
    
    $arraySingle = call_user_func_array('array_merge', $this->wordsRemaining);

    $checkExists = in_array($solveAttempt, $arraySingle);
    
    if(!$checkExists)
    {
      return "-1";
    } 
    
    $guessList = array();
    $guessCount = 1;
    $this->wordsRemaining = $this->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    $wRLen = count($this->wordsRemaining);
    
    if($wRLen > 0)
    {
      while($guessCount <= 6)
      {
        $hasWon = 0;
        $wRLen = count($this->wordsRemaining);
        if($wRLen > 0)
        {
          $guess = $this->wordsRemaining[0][0];
          array_push($guessList, $guess);
          $result = $this->Evaluate($guess, $solveAttempt);
          
          $rCount = count($result);
          
          for($r = 0; $r < $rCount; $r++)
          {
            if($result[$r] == 2) $hasWon++;
          }
          
          if($hasWon >= 5)
          {
            break;
          }

          $output = $this->FilterList($this->wordsRemaining, $solveAttempt, $guessList);
          
          $this->wordsRemaining = $this->ScoreArray($output);
          usort($this->wordsRemaining, function($a, $b) {
            if ($a[1] == $b[1]) return 0;
            return $a[1] < $b[1] ? 1 : -1;
          });
        }
        $guessCount++;
        if($hasWon >= 5)
        {
          break;
        }
      }
    }
    $wRLen = count($this->wordsRemaining);
    $guessListCount = count($guessList);
    if($wRLen > 0 && $guessListCount > 0)
    {
      if($this->wordsRemaining[0][0] == $guessList[$guessListCount - 1])
      {
        $this->wordsRemaining[0] = null;
        $this->wordsRemaining = array_filter($this->wordsRemaining);
        $this->wordsRemaining = array_values($this->wordsRemaining);
      }
    }
    
    $this->wordsRemaining = $this->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    $guessResultArray = array();
    $gCount = count($guessList);
    for($g = 0; $g < $gCount; $g++)
    {
      $r = $this->Evaluate($guessList[$g], $solveAttempt);
      array_push($guessResultArray, $r);
    }
    
    $finalOutput = array();

    array_push($finalOutput, $guessList);
    array_push($finalOutput, $this->wordsRemaining);
    array_push($finalOutput, $guessResultArray);
    
    return json_encode($finalOutput, JSON_UNESCAPED_UNICODE);
  }

  public function ChangeDictionary()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);
    return json_encode($this->wordsRemaining, JSON_UNESCAPED_UNICODE);
  }

  public function FilterByInput()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $guessedWords = (array)$this->request->getVar('guessedWords');
    $excludedLetters = (array)$this->request->getVar('excludedLetters');
    $knownLetters = (array)$this->request->getVar('knownLetters');
    $knownLettersByPosition = (array)$this->request->getVar('knownLettersByPosition');

    if(isset($guessedWords))
    {
      $gLen = count($guessedWords);
    }
    
    if(isset($excludedLetters))
    {
      $eLen = count($excludedLetters);
    }
    
    if(isset($knownLetters))
    {
      $knownLetters = $knownLetters;
      $kLen = count($knownLetters);
    }
    
    if(isset($knownLettersByPosition))
    {
      $knownLettersByPosition = $knownLettersByPosition;
      $pLen = count($knownLettersByPosition);
    }
    
    $wordOutput = array();
    
    $wLen = count($this->wordsRemaining);
    
    for($i = 0; $i < $wLen; $i++)
    {
      $wordToCheck = str_split($this->wordsRemaining[$i][0]);
      $hide = false;
      if(isset($knownLetters))
      {
        for($a = 0; $a < $kLen; $a++)
        {
          if($knownLetters[$a] != "-1")
          {
            if($wordToCheck[$a] != $knownLetters[$a]) $hide = true;
          }
        }
      }
      
      if(isset($excludedLetters))
      {
        for($a = 0; $a < $eLen; $a++)
        {
          if(in_array($excludedLetters[$a], $wordToCheck))
          {
            $key = array_keys($knownLetters, $excludedLetters[$a]);
            $keyLen = count($key);
            
            $check = array_keys($wordToCheck, $excludedLetters[$a]);
            $checkLen = count($check);
            if($keyLen < $checkLen)
            {
              $hide = true;
            }
          }
        }
      }
      
      // check the letter does appear
      // check the letter does not appear at a logged position
      // check the letter does not appear in wordToCheck more times than in the guessed word
      if(isset($knownLettersByPosition))
      {
        // for each entry in known letters by position
        for($a = 0; $a < $pLen; $a++)
        {
          // is the letter in the word at all, if not then hide
          if(in_array($knownLettersByPosition[$a]["letter"], $wordToCheck))
          {
            // get the position/s of where the letter is in the word and get positions count
            $positionsCount = count($knownLettersByPosition[$a]["positions"]);
            $indexL = array_keys($wordToCheck, $knownLettersByPosition[$a]["letter"]);
            $cCount = count($indexL);
            
            // if the letter is in the word, if it is at a voided position then hide
            for($p = 0; $p < $cCount; $p++)
            {
              for($m = 0; $m < $positionsCount; $m++)
              {
                if($knownLettersByPosition[$a]["positions"][$m] == $indexL[$p])
                {
                  $hide = true;
                }
              }
            }
          }
          else
          {
            $hide = true;
          }
          
          // count how many times letter appears in wordsToCheck?
        }
      }
      
      if(!$hide)
      {
        $el = array($wordToCheck, 0);
        array_push($wordOutput, $el);
      }
    }
    
    $this->wordsRemaining = $this->ScoreArray($wordOutput);
  
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    echo json_encode($this->wordsRemaining, JSON_UNESCAPED_UNICODE);
  }

  public function FilterByKeys()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $excludedLetters = (string)$this->request->getVar('excludedLetters');

    $this->Boot($dictionary);

    if(isset($excludedLetters))
    {
      $excludedLetters = $excludedLetters;
      $eLen = count($excludedLetters);
    }
    
    $wordOutput = array();
    
    $wLen = count($this->wordsRemaining);
    
    for($i = 0; $i < $wLen; $i++)
    {
      
      $wordToCheck = str_split($this->wordsRemaining[$i][0]);
      
      $hide = false;
      
      if(isset($excludedLetters))
      {
        for($a = 0; $a < $eLen; $a++)
        {
          if(in_array($excludedLetters[$a], $wordToCheck))
          {
            $hide = true;
          }
        }
      }
      
      if(!$hide)
      {
        $el = array($wordToCheck, 0);
        array_push($wordOutput, $el);
      }
    }
    
    $this->wordsRemaining = $this->ScoreArray($wordOutput);
    
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    echo json_encode($this->wordsRemaining, JSON_UNESCAPED_UNICODE);
  }

  public function RandomSolve()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $gameLen = count($this->wordsRemaining);
    $pick = array_rand($this->wordsRemaining);
    $randomWord = $this->wordsRemaining[$pick][0];
   
    return $randomWord;
  }

  public function NewGame()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $pick = array_rand($this->wordsRemaining);

    $session->set('wordToGuess', $this->wordsRemaining[$pick][0]);

    return (string)$session->get('wordToGuess');
  }

  public function NewArcade()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $gameLen = count($this->w3);
    $pick = array_rand($this->w3);

    $session->set('wordToArcade', $this->w3[$pick][0]);
    // session(['wordToArcade' => $this->w3[$pick][0]]);
    return $session->get('wordToArcade');
  }

  public function GetArcadeClue()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);
    $wordToArcade = $session->get('wordToArcade');

    $clue = "";
    $clue = (string)$this->request->getVar('clue');
    
    $clueToArray = str_split($clue);
    $answerToArray = str_split($wordToArcade);
    
    $ungotten = array();
    $position = array();
    $thisLength = count($answerToArray);
    
    for($i = 0; $i < $thisLength; $i++)
    {
      if($clueToArray[$i] != $answerToArray[$i])
      {
        array_push($ungotten, $answerToArray[$i]);
        array_push($position, $i);
      }
    }

    if(count($ungotten) === 0) return "5ERROR";
    
    $pick = array_rand($ungotten);
    $returnWord = $ungotten[$pick];
    $returnLocation = $position[$pick];
    
    $returnArray = array();
    array_push($returnArray, $returnWord);
    array_push($returnArray, $returnLocation);
    
    return json_encode($returnArray, JSON_UNESCAPED_UNICODE);
  }

  public function SaveArcade()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $userName = (string)$this->request->getVar('userName');
    $count = (int)$this->request->getVar('count');
    
    if($count == 0)
    {
      return;
    }

    DB::table('wordle_leaderboard')->insert([
      'count' => $count,
      'username' => $userName
    ]);
  }

  public function SubmitGuess()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $gameState = (string)$this->request->getVar('gameState');
    $allGuesses = (string)$this->request->getVar('allGuesses');
    $guess = (string)$this->request->getVar('guess');
    $guessFromAnswers = (string)$this->request->getVar('guessFromAnswers');
    $flag = (string)$this->request->getVar('flag');
  
    // get gameState to check if doing a random or daily game
    if(isset($gameState))
    {
      $gameState = strtoupper($gameState);
      
      if($gameState === "DAILY")
      {
        // check daily answer is set
        if(!$session->has('dailyWord'))
        {
          return "No Daily Word is set.";
        }
      }
    }
    else
    {
      return "No game state submitted.";
    }
  
    // get string of all previous guesses
    if(isset($allGuesses))
    {
      $allGuesses = strtoupper($allGuesses);
    }
    else
    {
      return "No Guess Record.";
    }
    
    // get this guess
    if(isset($guess))
    {
      $guess = strtoupper($guess);
    }
    else
    {
      return "No Guess.";
    }
  
    // get whether, if game mode random, guess should be drawn from words remaining(true)
    // or largest dictionary, w7 (false)
    // if arcade or daily mode, guesses always matched against w7
    if(isset($guessFromAnswers))
    {
      // TRUE or FALSE
      $guessFrom = $guessFromAnswers;
    }
    
    $resultArray = array(-1, -1, -1, -1, -1);
    
    $guessToArray = str_split($guess);
    $guessToArrayCount = count($guessToArray);
    
    $answerToArray = array();
    
    if($gameState === "RANDOM")
    {
      $answerToArray = str_split($session->has('wordToGuess'));
    }
    else if($gameState === "DAILY")
    {
      $answerToArray = str_split($session->has('dailyWord'));
    }
    else if($gameState === "ARCADE")
    {
      $answerToArray = str_split($session->has('wordToArcade'));
    }
    
    if($guessToArrayCount < 5)
    {
      return "LessThanFive";
    }
    
    // validate word against word list if guessing from dictionary
    $searchForWord = true;
    if($guessFrom === "TRUE")
    {
      $searchForWord = array_search($guess, array_column($this->wordsRemaining, '0'));
    }
    
    if($searchForWord === false)
    {
      return "NotInArray";
    }
    
    /*
    
    goal = return -1 for wrong position letters if they are excess of how many letters there are in answer
    result = 5 number array, either -1 (excluded, 1 (wrong position) 2(known letter)
    
    test case - answer = SALAD
    guess SALLY
    
    only issue is with yellow letters
    if there is a yellow letter, find if it is repeated in the word. if not then continue.
    if it is then count how many times letter is in answer and guess
    if it is in guess more times than answer, return the excess letters as -1 instead of 1
    
    */
  
    if($gameState === "RANDOM")
    {
      $resultArray = $this->Evaluate($guess, $session->get('wordToGuess'));
    }
    else if($gameState === "DAILY")
    {
      $resultArray = $this->Evaluate($guess, $session->get('dailyWord'));
    }
    else if($gameState === "ARCADE")
    {
      $resultArray = $this->Evaluate($guess, $session->get('wordToArcade'));
    }
    
    $usedAllLetters = true;
    
    // convert all guesses to array and loop through vs answer to array
    // check each letter against answer, if match then check guess also matches else fail
    // if doesn't match but is in_array then fail if guess doesn't also in_array = true
    
    $allGuessesArray = str_split($allGuesses);
    $allCount = count($allGuessesArray);
    
    // for each word in the guess list excluding the last guess
    
    /*
    for($i = 0; $i < ($allCount - 5); $i += 5)
    {
      // for each letter in the word
      for($p = 0; $p < 5; $p++)
      {
        // does the letter in the word match with the letter in the answer
        if($allGuessesArray[$p] == $answerToArray[$p])
        {
          //print_r($allGuessesArray[$p] . "\n");
          //array_push($debug, ($allGuessesArray[$p]));
          //print_r($answerToArray[$p] . "\n");
          //array_push($debug, ($answerToArray[$p]));
          //print_r($guessToArray[$p] . "\n");
          //array_push($debug, ($guessToArray[$p]));
          // if it does (so known letter)
          // if the guess doesn't contain that letter then fail
          if($guessToArray[$p] != $answerToArray[$p])
          {
            //print_r("invalidated by " . $guessToArray[$p] . "\n");
            $usedAllLetters = false;
          }
        }
        else if(in_array($allGuessesArray[$p], $answerToArray))
        {
          if(!in_array($allGuessesArray[$p], $guessToArray))
          {
            $usedAllLetters = false;
          }
        }
      }
    }
    */
  
    // return keyboard update
    $guessResultArray1 = array();
    $guessList2 = array();
    $gCount = count($allGuessesArray);
    
    for($g = 0; $g < $gCount; $g+= 5)
    {
      $guessToEval = $allGuessesArray[$g] .
      $allGuessesArray[$g + 1] .
      $allGuessesArray[$g + 2] .
      $allGuessesArray[$g + 3] .
      $allGuessesArray[$g + 4];
      
      if($gameState === "RANDOM")
      {
        $r = $this->Evaluate($guessToEval, $session->get('wordToGuess'));
      }
      else if($gameState === "DAILY")
      {
        $r = $this->Evaluate($guessToEval, $session->get('dailyWord'));
      }
      else if($gameState === "ARCADE")
      {
        $r = $this->Evaluate($guessToEval, $session->get('wordToArcade'));
      }
      
      array_push($guessResultArray1, $r);
      array_push($guessList2, $guessToEval);
    }
    
    /*
      allGuessArray - list of letters in all previous guesses
    
      answerToArray = list of letters in the answer - 5 long
      guessToArray = list of letters in the guess - 5 long
      resultArray = -1 / 1 / 2 by guess
      
      used all letters - does the guess have all green in position
                      - all yellow in the word somewhere
                      
      guessResultArray1 - combined evalutions of all guesses to date
      loop through in 5's, if eval was 2 check guess is the same letter
      if eval was 1 then check the guess contains the letter
    */
    
    $g1Count = count($guessResultArray1);
    
    // for each evaluations except the last one (most recent guess)
    if($gameState === "DAILY")
    {
      if($session->has('flag'))
      {
        if(!$session->get('flag') === "process")
        {
          for($g = 0; $g < $g1Count - 1; $g++)
          {
            // for each letter evaluation
            for($i = 0; $i < 5; $i++)
            {
              if($guessResultArray1[$g][$i] == 2)
              {
                if($guessToArray[$i] != $answerToArray[$i])
                {
                  $usedAllLetters = false;
                }
              }
              else if($guessResultArray1[$g][$i] == 1)
              {
                $searchForLetter = array_search($guessList2[$g][$i], $guessToArray);
                if($searchForLetter === false)
                {
                  $usedAllLetters = false;
                }
              }
            }
          }
        }
      }
    }
    else
    {
      for($g = 0; $g < ($g1Count - 1); $g++)
      {
        // for each letter evaluation
        for($i = 0; $i < 5; $i++)
        {
          //echo $i;
          if($guessResultArray1[$g][$i] == 2)
          {
            //print_r('green letter is at g:' . $g . 'and i: ' . $i);
            if($guessToArray[$i] != $answerToArray[$i])
            {
              //print_r('green out of place' . '\n');
              //print_r('guess green ' . $guessToArray[$i] . '\n');
              //print_r('answer green ' . $answerToArray[$i] . '\n');
              $usedAllLetters = false;
            }
          }
          else if($guessResultArray1[$g][$i] == 1)
          {
            //print_r($guessResultArray1[$g][$i] . "\n");
            //print_r($guessList2[$g][$i] . "\n");
            $searchForLetter = array_search($guessList2[$g][$i], $guessToArray);
      
            if($searchForLetter === false)
            {
              //print_r('yellow out of place ' . ' \n');
              $usedAllLetters = false;
            }
          }
        }
      }
    }

    if(!$usedAllLetters)
    {
      return "NoGood";
    }
    
    $finalOutput = array();

    array_push($finalOutput, $resultArray);
    array_push($finalOutput, $guessResultArray1);
    
    return json_encode($finalOutput, JSON_UNESCAPED_UNICODE);
  }

  public function PostGame()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $gameState = (string)$this->request->getVar('gameState');

    // get gameState to check if doing a random or daily game
    if(isset($gameState))
    {
      $gameState = strtoupper($gameState);
      
      if($gameState === "DAILY")
      {
        // check daily answer is set
        if(!$session->has('dailyWord'))
        {
          return "No Daily Word is set.";
        }
        else
        {
          return $session->get('dailyWord');
        }
      }
    }
    if($gameState === "RANDOM")
    {
      return $session->get('wordToGuess');
    }
  }

  public function FillLeaderboard()
  {
    $data = DB::table('wordle_leaderboard')
    ->select('count', 'username')
    ->orderBy('count', 'desc')
    ->limit(100)
    ->get();

    return json_encode($data, JSON_UNESCAPED_UNICODE);
  }

  public function TEST()
  {
    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);

    $wRLength = count($this->wordsRemaining);
  
    $searchForWord = array_search("XXUUP", $this->wordsRemaining);
    print_r("XXUUP" . $searchForWord . "\n");
    
    for($wR = 0; $wR < 10; $wR++)
    {
      $searchForWord = array_search($this->wordsRemaining[$wR], $this->wordsRemaining);
      
      print_r($this->wordsRemaining[$wR][0] . $searchForWord . "\n");
    }
  }

  public function startDaily()
  {
    $session = \Config\Services::session();

    $dictionary = (int)$this->request->getVar('dictionary');
    $this->Boot($dictionary);
    
    try
    {
      date_default_timezone_set('UTC');
      $today = date("Y-m-d");

      $result = DB::table('wordle_dailyLog')
      ->select('word')
      ->where('date', $today)
      ->orderBy('word', 'asc')
      ->get();
      
      $resultLength = count($result);
      
      // if more than 1 word obtained, cull all but one and delete the excess from the record
      if($resultLength > 1)
      {
        // if so then randomly pick a word to be saved
        $pickSave = array_rand($result);
        $session->set('dailyWord', $result[$pickSave]);
        
        // cull the rest from the database
        for($i = 0; $i < $resultLength; $i++)
        {
          if($result[$i] != $session->get('dailyWord'))
          {
            $deleted = DB::table('wordle_dailyLog')->where('word', '=', $result[$i])->delete();
          }
        }
      }
      else if($resultLength === 1)
      {
        // if only 1 result then that is the global daily word
        $session->set('dailyWord', $result[0]->word);
      }
      else if($resultLength === 0)
      {
        // if there was no result then pick a word and save it
        $arrayLength = count($this->w3);
        $pickDailyWord = array_rand($this->w3);
        $session->set('dailyWord', $this->w3[$pickDailyWord][0]);

        DB::table('wordle_dailyLog')->insert([
            'date' => $today,
            'word' => $session->get('dailyWord')
        ]);
      }
    }
    catch(exception $e)
    {
      return "Connection failed.";
    }
  }

  // MAIN
  
  private function ConvertRawNewLineWordFileToRankedScoreArray($sourceName, $fileName)
  {
    return $myfile1 = file_get_contents($sourceName);
    $fileArray = explode("\n",$myfile1);
    $fileArray = preg_replace("/[^A-Za-z0-9 ]/", '', $fileArray);
    $fileArray = array_unique($fileArray);
    
    $aLen = count($fileArray);
    $resultArray = array();
    
    for($i = 0; $i < $aLen; $i++)
    {
      $wordLength = strlen($fileArray[$i]);
      if($wordLength == 5)
      {
        if(ctype_alpha($fileArray[$i]))
        {
          $result = array(strtoupper($fileArray[$i]), 0);
          array_push($resultArray, $result);
        }
      }
    }
  
    $resultArray = ScoreArray($resultArray);
    usort($resultArray, 'cmpScore');
    
    $returnFile = fopen($fileName, "w");
    $str1 = create_string($resultArray);
    fwrite($returnFile, $str1);
  }
  
  function ConvertJSONToRankedScoreArray($sourceName, $fileName)
  {
    $wordleList = file_get_contents($sourceName);
    $wordleList = json_decode($wordleList, true);
    $wordleList = array_unique($wordleList);
    
    $aLen = count($wordleList);
    $w0192 = array();
    
    for($i = 0; $i < $aLen; $i++)
    {
      $wordLength = strlen($wordleList[$i]);
      if($wordLength == 5)
      {
        if(ctype_alpha($wordleList[$i])){
            $result = array(strtoupper($wordleList[$i]), 0);
            array_push($w0192, $result);
        }
      }
    }
    
    $resultArray = ScoreArray($w0192);
    usort($resultArray, 'cmpScore');
    
    $newWordleList = fopen($fileName, "w");
    $strWordle = create_string($resultArray);
    fwrite($newWordleList, $strWordle);
  }
  
  function create_string($arr){
    $str = '';
    for($i = 0; $i < count($arr); $i++)
    {
      $str .= $arr[$i][0];
      $str .= ",";
      $str .= $arr[$i][1];
      if($i < (count($arr) -1))
      {
        $str .= "\n";
      }
    }
    return $str;
  }
  
  function WriteArrayToFile($fileName, $resultArray)
  {
    $returnFile = fopen($fileName, "w");
    $str1 = create_string($resultArray);
    fwrite($returnFile, $str1);
  }
  
  function CleanseDuplicates($array)
  {
    $len = count($array);
    
    for($i = 0; $i < $len; $i++)
    {
      
    }
  }
  
  private function ScoreArray($rankArray)
  {  
    $wordResult = array();
    
    $letterCount = array();
    
    $twoLetterScore1 = array();
    $twoLetterScore2 = array();
    $twoLetterScore3 = array();
    $twoLetterScore4 = array();
    
    $threeLetterScore1 = array();
    $threeLetterScore2 = array();
    $threeLetterScore3 = array();
    
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
          if($thisLetter == $this->alphabet[$a])
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
        if($twoLetterScore1[$f]->get_fragment() == $oneTwo)
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
        if($twoLetterScore2[$f]->get_fragment() == $twoThree)
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
        if($twoLetterScore3[$f]->get_fragment() == $threeFour)
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
        if($twoLetterScore4[$f]->get_fragment() == $fourFive)
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
        if($threeLetterScore1[$f]->get_fragment() == $oneTwoThree)
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
        if($threeLetterScore2[$f]->get_fragment() == $twoThreeFour)
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
        if($threeLetterScore3[$f]->get_fragment() == $threeFourFive)
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
      $used = array();
      
      for($t = 0; $t < 5; $t++)
      {
        $thisLetter = $rankArray[$i][0][$t];
        $duplicate = false;
        $uLen = count($used);
        if($uLen > 0)
        {
          for($u = 0; $u < $uLen; $u++)
          {
            if($thisLetter == $used[$u])
            {
              $duplicate = true;
            }
          }
        }
        if($duplicate) continue;
        for($a = 0; $a < $aLen; $a++)
        {
          if($thisLetter == $this->alphabet[$a])
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
        if($oneTwoT == $twoLetterScore1[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore1[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore2);
      for($f = 0; $f < $len; $f++)
      {
        if($twoThreeT == $twoLetterScore2[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore2[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore3);
      for($f = 0; $f < $len; $f++)
      {
        if($threeFourT == $twoLetterScore3[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore3[$f]->get_total();
          break;
        }
      }
      
      $len = count($twoLetterScore4);
      for($f = 0; $f < $len; $f++)
      {
        if($fourFiveT == $twoLetterScore4[$f]->get_fragment())
        {
          $wordScore = $wordScore + $twoLetterScore4[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore1);
      for($f = 0; $f < $len; $f++)
      {
        if($oneTwoThreeT == $threeLetterScore1[$f]->get_fragment())
        {
          $wordScore = $wordScore + $threeLetterScore1[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore2);
      for($f = 0; $f < $len; $f++)
      {
        if($twoThreeFourT == $threeLetterScore2[$f]->get_fragment())
        {
          $wordScore = $wordScore + $threeLetterScore2[$f]->get_total();
          break;
        }
      }
      
      $len = count($threeLetterScore3);
      for($f = 0; $f < $len; $f++)
      {
        if($threeFourFiveT == $threeLetterScore3[$f]->get_fragment())
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
  
  private function cmpScore($a, $b)
  {
    if ($a[1] == $b[1])
      return 0;
    return $a[1] < $b[1] ? 1 : -1;
  }
  
  private function cmpAZ($a, $b)
  {
    if ($a[0] == $b[0])
      return 0;
    return $a[0] < $b[0] ? -1 : 1;
  }

  private function Evaluate($guess, $answer)
  {
    $guessToArray = str_split($guess);
    $answerToArray = str_split($answer);
    $resultArray = array(-1, -1, -1, -1, -1);
    
    for($i = 0; $i < 5; $i++)
    {
      // if known position
      if($answerToArray[$i] == $guessToArray[$i])
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
              
              if($guessToArray[$numOfLetterInGuess[$g]] == $answerToArray[$numOfLetterInGuess[$g]])
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

  private function FilterList($wordArray, $answer, $guessList)
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
    if($wLength == 0) return;
    
    // number of guesses to date
    $gLength = count($guessList);
    if($gLength == 0) return;
    
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
        if($aArray[$v] == $guessArray[$v])
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
              if($returnKeys[$r] == $knownLettersByPosition[$e][1])
              {
                $eliminate = true;
              }
            }
          }
        }
      }
      
      if($eliminate == true)
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