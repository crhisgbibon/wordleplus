<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use CodeIgniter\Files\File;

use App\Models\WordlePlusModel;
use App\Models\WordleProcessModel;
use App\Models\WordlePlusFragmentsModel;

class WordlePlusController1 extends BaseController
{

  function __construct()
  {
    $this->session = \Config\Services::session();
    $this->qwerty = [];
    $this->alphabet = [];
    $this->w = [];
    $this->file = '';
    $this->wordsRemaining = [];
    if(!$this->session->has('dictionary')) $this->session->set('dictionary', '2');
  }

  private function Boot(int $dictionary)
  {
    $this->wordsRemaining = [];

    $this->file = WRITEPATH . 'words/1000F.txt';
    if($dictionary === 1) $this->file = WRITEPATH . 'words/10000F.txt';
    if($dictionary === 2) $this->file = WRITEPATH . 'words/20000F.txt';

    if($dictionary === 3) $this->file = WRITEPATH . 'words/english1F.txt';
    if($dictionary === 4) $this->file = WRITEPATH . 'words/english2F.txt';
    if($dictionary === 5) $this->file = WRITEPATH . 'words/wordsF.txt';

    if($dictionary === 6) $this->file = WRITEPATH . 'words/allwordsF.txt';

    $this->w = $this->ConvertRankedFileToArray(file_get_contents($this->file));
    $this->qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","A", "S", "D", "F", "G", "H", "J", "K", "L", "?","Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
    $this->alphabet = array("Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M");

    $this->wordsRemaining = $this->w;
  }

  function ConvertRankedFileToArray($file)
  {
    $one = explode("\n", $file);
    $w = array();
    foreach ($one as $item) $w[] = explode(",", $item);
    return $w;
  }

  // ROUTE CONTROLLERS

  public function index()
  {
    return view('templates/header1')

          .view('new/controls')

          .view('new/play')
          .view('new/guess')
          .view('new/list')
          .view('new/solve')
          .view('new/dictionary')
          .view('new/info')

          .view('new/chart')

          .view('new/keyboard')

          .view('templates/footer1');
  }

  public function RandomSolve()
  {
    $this->Boot((int)$this->session->get('dictionary'));
    $gameLen = count($this->wordsRemaining);
    $pick = array_rand($this->wordsRemaining);
    $randomWord = $this->wordsRemaining[$pick][0];
    return $randomWord;
  }

  public function Solve()
  {
    $process = new WordleProcessModel();

    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));
    $solveAttempt = $data->solveString;
    
    $arraySingle = call_user_func_array('array_merge', $this->wordsRemaining);
    $checkExists = in_array($solveAttempt, $arraySingle);
    
    if(!$checkExists) return json_encode("-1");
    
    $guessList = [];
    $guessCount = 1;
    $this->wordsRemaining = $process->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] === $b[1]) return 0;
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
          $result = $process->Evaluate($guess, $solveAttempt);
          
          $rCount = count($result);
          
          for($r = 0; $r < $rCount; $r++)
          {
            if($result[$r] === 2) $hasWon++;
          }
          
          if($hasWon >= 5)
          {
            break;
          }

          $output = $process->FilterList($this->wordsRemaining, $solveAttempt, $guessList);
          
          $this->wordsRemaining = $process->ScoreArray($output);
          usort($this->wordsRemaining, function($a, $b) {
            if ($a[1] === $b[1]) return 0;
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
      if($this->wordsRemaining[0][0] === $guessList[$guessListCount - 1])
      {
        $this->wordsRemaining[0] = null;
        $this->wordsRemaining = array_filter($this->wordsRemaining);
        $this->wordsRemaining = array_values($this->wordsRemaining);
      }
    }
    
    $this->wordsRemaining = $process->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] === $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    $guessResultArray = array();
    $inputStringCount = count($guessList);
    for($g = 0; $g < $inputStringCount; $g++)
    {
      $r = $process->Evaluate($guessList[$g], $solveAttempt);
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
    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));
    $newDictionary = (string)$data->newDictionary;
    $this->session->set('dictionary', $newDictionary);
    return json_encode((string)$this->session->get('dictionary'), JSON_UNESCAPED_UNICODE);
  }

  public function FilterByInput()
  {
    $process = new WordleProcessModel();

    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));

    $guessedWords = (array)$data->guessedWords;
    $excludedLetters = (array)$data->excludedLetters;
    $knownLetters = (array)$data->knownLetters;
    $knownLettersByPosition = (array)$data->knownLettersByPosition;

    $gLen = count($guessedWords);
    $eLen = count($excludedLetters);
    $kLen = count($knownLetters);
    $pLen = count($knownLettersByPosition);
    
    $wordOutput = [];
    
    $wLen = count($this->wordsRemaining);
    
    for($i = 0; $i < $wLen; $i++)
    {
      $wordToCheck = str_split($this->wordsRemaining[$i][0]);
      $hide = false;



      if(isset($knownLetters))
      {
        for($a = 0; $a < $kLen; $a++)
        {
          if($knownLetters[$a] !== "-1")
          {
            if($wordToCheck[$a] !== $knownLetters[$a]) $hide = true;
          }
        }
      }
      


      if(isset($excludedLetters) && !$hide)
      {
        // for each excluded letter
        for($a = 0; $a < $eLen; $a++)
        {
          // check if the word has the letter
          if(in_array($excludedLetters[$a], $wordToCheck))
          {
            // get the positions where the excluded letter appears in the known letters, if any
            $key = array_keys($knownLetters, $excludedLetters[$a]);
            $keyLen = count($key);
            
            // get the positions where the excluded letter appears in the target word, if any
            $check = array_keys($wordToCheck, $excludedLetters[$a]);
            $checkLen = count($check);
            // if the letter appears less times in the known letters than the target word, pass on this word
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
      if(isset($knownLettersByPosition) && !$hide)
      {
        // for each entry in known letters by position
        for($a = 0; $a < $pLen; $a++)
        {
          // is the letter in the word at all, if not then hide
          if(in_array($knownLettersByPosition[$a]->letter, $wordToCheck))
          {
            // get the position/s of where the letter is in the word and get positions count
            $positionsCount = count($knownLettersByPosition[$a]->positions);
            $indexL = array_keys($wordToCheck, $knownLettersByPosition[$a]->letter);
            $cCount = count($indexL);
            
            // if the letter is in the word, if it is at a voided position then hide
            for($p = 0; $p < $cCount; $p++)
            {
              for($m = 0; $m < $positionsCount; $m++)
              {
                if($knownLettersByPosition[$a]->positions[$m] == $indexL[$p])
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
    
    $this->wordsRemaining = $process->ScoreArray($wordOutput);
  
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    echo json_encode($this->wordsRemaining, JSON_UNESCAPED_UNICODE);
  }

  public function FilterByKeys()
  {
    $process = new WordleProcessModel();

    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));

    $excludedLetters = str_split((string)$data->excludedLetters);
    $eLen = count($excludedLetters);
    $wordOutput = [];
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
        $el = [$wordToCheck, 0];
        array_push($wordOutput, $el);
      }
    }
    
    $this->wordsRemaining = $process->ScoreArray($wordOutput);
    
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    echo json_encode($this->wordsRemaining, JSON_UNESCAPED_UNICODE);
  }

  public function NewGame()
  {
    $this->Boot((int)$this->session->get('dictionary'));
    $pick = array_rand($this->wordsRemaining);
    $this->session->set('wordToGuess', $this->wordsRemaining[$pick][0]);
    return (string)$this->session->get('wordToGuess');
  }

  public function SubmitGuess()
  {
    $process = new WordleProcessModel();

    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));

    $inputString = strtoupper((string)$data->inputString);
    $guess = strtoupper((string)$data->guess);
    $playing = strtoupper((string)$data->playing);

    if($playing === 'R') $answer = $this->session->get('wordToGuess');
    else if($playing === 'D') $answer = $this->session->get('dailyWord');
    else return json_encode("NoWord");
    
    $resultArray = array(-1, -1, -1, -1, -1);
    $guessToArray = str_split($guess);
    $guessToArrayCount = count($guessToArray);
    $answerToArray = str_split($answer);
    
    if($guessToArrayCount < 5) return json_encode("LessThanFive");
    
    $searchForWord = array_search($guess, array_column($this->wordsRemaining, 0));
    if($searchForWord === false) return json_encode("NotInArray");
    
    $usedAllLetters = true;
    
    
    $inputStringArray = str_split($inputString);
    $inputStringCount = count($inputStringArray);
  
    $guessResultArray = [];
    $guessList = [];
    
    for($g = 0; $g < $inputStringCount; $g+= 5)
    {
      $guessToEval = $inputStringArray[$g] .
      $inputStringArray[$g + 1] .
      $inputStringArray[$g + 2] .
      $inputStringArray[$g + 3] .
      $inputStringArray[$g + 4];
      
      $r = $process->Evaluate($guessToEval, $answer);
      
      array_push($guessResultArray, $r);
      array_push($guessList, $guessToEval);
    }
    
    $gCount = count($guessResultArray);
    
    for($g = 0; $g < $gCount; $g++)
    {
      for($i = 0; $i < 5; $i++)
      {
        if($guessResultArray[$g][$i] == 2)
        {
          if($guessToArray[$i] != $answerToArray[$i])
          {
            $usedAllLetters = false;
          }
        }
        else if($guessResultArray[$g][$i] == 1)
        {
          $searchForLetter = array_search($guessList[$g][$i], $guessToArray);
    
          if($searchForLetter === false)
          {
            $usedAllLetters = false;
          }
        }
      }
    }

    if(!$usedAllLetters)
    {
      return json_encode("NoGood");
    }
    
    return json_encode($guessResultArray, JSON_UNESCAPED_UNICODE);
  }

  public function PostGame()
  {
    $this->Boot((int)$this->session->get('dictionary'));
    $data = json_decode($this->request->getVar('data'));

    $gameState = strtoupper((string)$data->gameState);

    if(isset($gameState))
    {      
      if($gameState === "D")
      {
        if(!$this->session->has('dailyWord')) return json_encode("NoWord");
        else return json_encode($this->session->get('dailyWord'));
      }
      else if($gameState === "R") return json_encode($this->session->get('wordToGuess'));
    }
  }
}